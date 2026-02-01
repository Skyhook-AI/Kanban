import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { BoardColumn } from './BoardColumn';
import { StorageService } from '../services/StorageService';
import type { Board as BoardType, Task } from '../types/kanban';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    height: '100%',
    overflowX: 'auto',
    padding: '10px',
    alignItems: 'flex-start',
  },
});

export const Board = () => {
  const styles = useStyles();
  const [boardData, setBoardData] = useState<BoardType>(() => StorageService.loadData());

  if (!boardData) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className={styles.root}>
      {boardData.columns.map((column) => (
        <BoardColumn key={column.id} column={column} onAddTask={handleAddTask} />
      ))}
    </div>
  );
};
