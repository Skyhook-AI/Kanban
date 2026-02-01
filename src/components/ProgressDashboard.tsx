import { makeStyles, tokens, Text } from '@fluentui/react-components';
import type { Column } from '../types/kanban';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: '20px',
    boxShadow: tokens.shadow4,
  },
  metricsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
  progressBarContainer: {
    width: '100%',
    height: '8px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusCircular,
    overflow: 'hidden',
    marginTop: '8px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusCircular,
    transition: 'width 0.3s ease-in-out',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
});

interface ProgressDashboardProps {
  columns: Column[];
}

export const ProgressDashboard = ({ columns }: ProgressDashboardProps) => {
  const styles = useStyles();

  const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);
  const doneColumn = columns.find((col) => col.id === 'done');
  const doneTasks = doneColumn ? doneColumn.tasks.length : 0;
  
  const progressRatio = totalTasks > 0 ? doneTasks / totalTasks : 0;
  const progressPercentage = Math.round(progressRatio * 100);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.progressLabel}>
          <Text weight="bold" size={400}>Project Progress</Text>
          <Text size={300}>{progressPercentage}% ({doneTasks}/{totalTasks} tasks)</Text>
        </div>
        <div className={styles.progressBarContainer} role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
      </div>

      <div className={styles.metricsContainer}>
        {columns.map((col) => (
          <div key={col.id} className={styles.metricItem}>
            <Text size={200} weight="semibold">{col.title}</Text>
            <Text size={500} weight="bold">{col.tasks.length}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
