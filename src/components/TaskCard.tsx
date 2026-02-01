import {
  makeStyles,
  tokens,
  Text,
  Card,
  CardHeader,
  CardFooter,
} from '@fluentui/react-components';
import ReactMarkdown from 'react-markdown';
import { CalendarLtr24Regular } from '@fluentui/react-icons';
import type { Task } from '../types/kanban';

const useStyles = makeStyles({
  card: {
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content',
  },
  description: {
    margin: '10px 0',
    color: tokens.colorNeutralForeground1,
    '& p': {
        margin: 0,
    },
    '& ul, & ol': {
        paddingInlineStart: '20px',
        margin: '4px 0',
    },
    '& a': {
        color: tokens.colorBrandForeground1,
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
        }
    }
  },
  id: {
      color: tokens.colorNeutralForeground4,
      fontFamily: tokens.fontFamilyMonospace,
  },
  footer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: tokens.colorNeutralForeground3,
      paddingTop: '8px',
  },
  title: {
      wordBreak: 'break-word',
  }
});

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<Text weight="semibold" className={styles.title}>{task.title}</Text>}
        description={<Text className={styles.id} size={200}>#{task.id}</Text>}
      />
      {task.description && (
        <div className={styles.description}>
            <ReactMarkdown>{task.description}</ReactMarkdown>
        </div>
      )}
      {task.dueDate && (
        <CardFooter className={styles.footer}>
            <CalendarLtr24Regular fontSize={16} />
            <Text size={200}>{new Date(task.dueDate).toLocaleDateString()}</Text>
        </CardFooter>
      )}
    </Card>
  );
};
