import { makeStyles, tokens, Text } from '@fluentui/react-components';
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
});

interface BoardColumnProps {
  column: ColumnType;
}

export const BoardColumn = ({ column }: BoardColumnProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text weight="bold" size={400}>{column.title}</Text>
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
