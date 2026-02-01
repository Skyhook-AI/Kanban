import {
  makeStyles,
  tokens,
  Text,
  Card,
  CardHeader,
  CardFooter,
  Tag,
} from '@fluentui/react-components';
import ReactMarkdown from 'react-markdown';
import { CalendarLtr24Regular } from '@fluentui/react-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/kanban';

const useStyles = makeStyles({
  card: {
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content',
    cursor: 'grab',
    touchAction: 'none',
  },
  dragging: {
    opacity: 0.5,
    cursor: 'grabbing',
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
      flexWrap: 'wrap',
  },
  title: {
      wordBreak: 'break-word',
  },
  tags: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
    marginBottom: '8px',
  }
});

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const styles = useStyles();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
        onClick={onClick}
      >
        <CardHeader
          header={<Text weight="semibold" className={styles.title}>{task.title}</Text>}
          description={<Text className={styles.id} size={200}>#{task.id}</Text>}
        />
        {task.tags && task.tags.length > 0 && (
          <div className={styles.tags}>
            {task.tags.map((tag) => (
              <Tag key={tag} size="extra-small" shape="circular">
                {tag}
              </Tag>
            ))}
          </div>
        )}
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
    </div>
  );
};
