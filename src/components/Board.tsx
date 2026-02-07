import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { BoardColumn } from './BoardColumn';
import { StorageService } from '../services/StorageService';
import type { Board as BoardType, Task, Column } from '../types/kanban';
import type { Prd } from '../types/prd';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { TaskDetailDialog } from './TaskDetailDialog';
import { ProgressDashboard } from './ProgressDashboard';

const useStyles = makeStyles({
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    gap: '20px',
  },
  columnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    height: '100%',
    overflowX: 'auto',
    alignItems: 'flex-start',
  },
});

const mapPrdToBoard = (prd: Prd): BoardType => {
  const newColumns: Column[] = [
    { id: 'todo', title: 'To Do', tasks: [], readonly: true },
    { id: 'in_progress', title: 'In Progress', tasks: [], readonly: true },
    { id: 'done', title: 'Done', tasks: [], readonly: true },
    { id: 'backlog', title: 'Backlog', tasks: [], readonly: true },
  ];

  prd.userStories.forEach((story) => {
    const task: Task = {
      id: story.id,
      title: story.title,
      description: story.description,
      readonly: true,
    };

    const status = story.status?.toLowerCase();
    if (status === 'todo') {
      newColumns[0].tasks.push(task);
    } else if (status === 'in_progress') {
      newColumns[1].tasks.push(task);
    } else if (status === 'done') {
      newColumns[2].tasks.push(task);
    } else {
      newColumns[3].tasks.push(task);
    }
  });

  return { columns: newColumns };
};

interface BoardProps {
  prd: Prd | null;
}

export const Board = ({ prd }: BoardProps) => {
  const styles = useStyles();
  const [boardData, setBoardData] = useState<BoardType>(() => {
    if (prd) {
      return mapPrdToBoard(prd);
    }
    return StorageService.loadData();
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [startContainer, setStartContainer] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!boardData) {
    return <div>Loading...</div>;
  }

  const findContainer = (id: string) => {
    if (boardData.columns.find((col) => col.id === id)) {
      return id;
    }
    return boardData.columns.find((col) => col.tasks.some((task) => task.id === id))?.id;
  };

  const handleAddTask = (columnId: string, title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
    };

    const newColumns = boardData.columns.map((col) => {
      if (col.id === columnId) {
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    });

    const newBoardData = { ...boardData, columns: newColumns };
    setBoardData(newBoardData);
    StorageService.saveData(newBoardData);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setBoardData((prev) => {
      const newColumns = prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      }));
      const newBoard = { ...prev, columns: newColumns };
      StorageService.saveData(newBoard);
      return newBoard;
    });
    setEditingTask(null);
  };

  const triggerWebhook = async (task: Task) => {
    const settings = StorageService.loadSettings();
    if (!settings.webhookUrl) return;

    try {
      await fetch(settings.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: task.id,
          title: task.title,
          status: 'Done',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to trigger webhook:', error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = boardData.columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    setActiveTask(task || null);
    
    const container = findContainer(active.id as string);
    setStartContainer(container || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setBoardData((prev) => {
      const activeColumn = prev.columns.find((col) => col.id === activeContainer)!;
      const overColumn = prev.columns.find((col) => col.id === overContainer)!;

      const activeTaskIndex = activeColumn.tasks.findIndex((t) => t.id === active.id);
      const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);

      let newIndex: number;
      if (prev.columns.some((c) => c.id === overId)) {
        newIndex = overColumn.tasks.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overTaskIndex >= 0 ? overTaskIndex + modifier : overColumn.tasks.length + 1;
      }

      return {
        ...prev,
        columns: prev.columns.map((col) => {
          if (col.id === activeContainer) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== active.id),
            };
          }
          if (col.id === overContainer) {
            const taskToMove = activeColumn.tasks[activeTaskIndex];
            const newTasks = [...col.tasks];
            // Ensure we don't insert out of bounds or duplicate if logic is slightly off
            // But here we are creating a new array.
            
            // Adjust newIndex if it's too large
            if (newIndex > newTasks.length) newIndex = newTasks.length;
            
            newTasks.splice(newIndex, 0, taskToMove);
            return {
              ...col,
              tasks: newTasks,
            };
          }
          return col;
        }),
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (overContainer === 'done' && startContainer !== 'done' && activeTask) {
      void triggerWebhook(activeTask);
    }

    if (
      activeContainer &&
      overContainer &&
      activeContainer === overContainer
    ) {
      const activeIndex = boardData.columns.find((c) => c.id === activeContainer)!.tasks.findIndex((t) => t.id === active.id);
      const overIndex = boardData.columns.find((c) => c.id === activeContainer)!.tasks.findIndex((t) => t.id === over?.id);

      if (activeIndex !== overIndex) {
        setBoardData((prev) => {
          const newColumns = prev.columns.map((col) => {
            if (col.id === activeContainer) {
              return {
                ...col,
                tasks: arrayMove(col.tasks, activeIndex, overIndex),
              };
            }
            return col;
          });
          const newBoard = { ...prev, columns: newColumns };
          StorageService.saveData(newBoard);
          return newBoard;
        });
      } else {
          // Save anyway to ensure consistency if moved between columns but index didn't change (rare but safer)
          StorageService.saveData(boardData);
      }
    } else {
        // If containers are different (should have been handled by dragOver, but explicit save is good)
        StorageService.saveData(boardData);
    }
    setActiveTask(null);
    setStartContainer(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.boardContainer}>
        <ProgressDashboard columns={boardData.columns} />
        <div className={styles.columnsContainer}>
          {boardData.columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onTaskClick={setEditingTask}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
      <TaskDetailDialog
        key={editingTask ? editingTask.id : 'closed'}
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onSave={handleUpdateTask}
      />
    </DndContext>
  );
};
