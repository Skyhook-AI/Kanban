import {
  makeStyles,
  tokens,
  Text,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Input,
  Label,
} from '@fluentui/react-components';
import { Add24Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import type { Column as ColumnType } from '../types/kanban';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
    minWidth: '280px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
  },
  header: {
    padding: '5px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
    overflowY: 'auto',
  },
  taskCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '10px',
    borderRadius: tokens.borderRadiusSmall,
    boxShadow: tokens.shadow2,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
});

interface BoardColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string, title: string) => void;
}

export const BoardColumn = ({ column, onAddTask }: BoardColumnProps) => {
  const styles = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle);
      setNewTaskTitle('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text weight="bold" size={400}>{column.title}</Text>
        {column.id === 'backlog' && (
          <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
              <Button icon={<Add24Regular />} appearance="subtle" aria-label="Add Task" />
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent className={styles.dialogContent}>
                  <Label htmlFor="task-title">Title</Label>
                  <Input
                    id="task-title"
                    value={newTaskTitle}
                    onChange={(_, data) => setNewTaskTitle(data.value)}
                    placeholder="Enter task title..."
                  />
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Cancel</Button>
                  </DialogTrigger>
                  <Button appearance="primary" onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
                    Add Task
                  </Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        )}
      </div>
      <div className={styles.taskList}>
        {column.tasks.map((task) => (
          <div key={task.id} className={styles.taskCard}>
            <Text weight="semibold" block>{task.title}</Text>
            {task.description && <Text size={200}>{task.description}</Text>}
          </div>
        ))}
      </div>
    </div>
  );
};
