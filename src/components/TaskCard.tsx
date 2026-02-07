import {
  makeStyles,
  tokens,
  Text,
  Card,
  CardHeader,
  CardFooter,
  Tag,
  Badge,
} from '@fluentui/react-components';
import ReactMarkdown from 'react-markdown';
import {
  CalendarLtr24Regular,
  LockClosed16Regular,
  Important16Regular,
  CheckmarkCircle16Regular,
  DismissCircle16Regular,
  Link16Regular,
} from '@fluentui/react-icons';
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
    backgroundColor: tokens.colorNeutralBackground1,
  },
  readOnlyCard: {
    cursor: 'default',
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
      gap: '8px',
      color: tokens.colorNeutralForeground3,
      paddingTop: '8px',
      flexWrap: 'wrap',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
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
  } = useSortable({ id: task.id, data: { type: 'Task', task }, disabled: task.readonly });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 1) return 'danger';
    if (priority <= 3) return 'warning';
    return 'success';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        className={`${styles.card} ${isDragging ? styles.dragging : ''} ${task.readonly ? styles.readOnlyCard : ''}`}
        onClick={onClick}
      >
        <CardHeader
          header={<Text weight="semibold" className={styles.title}>{task.title}</Text>}
          description={<Text className={styles.id} size={200}>#{task.id}</Text>}
          action={task.readonly ? <LockClosed16Regular /> : undefined}
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
        
        <CardFooter className={styles.footer}>
          {task.priority !== undefined && (
             <Badge 
               appearance="tint" 
               color={getPriorityColor(task.priority)} 
               icon={<Important16Regular />}
             >
                P{task.priority}
             </Badge>
          )}

          {task.passes !== undefined && (
             task.passes ?
               <Badge appearance="tint" color="success" icon={<CheckmarkCircle16Regular />}>Pass</Badge> :
               <Badge appearance="tint" color="danger" icon={<DismissCircle16Regular />}>Fail</Badge>
          )}

          {task.dependsOn && task.dependsOn.length > 0 && (
             <div className={styles.footerItem} title={`Depends on: ${task.dependsOn.join(', ')}`}>
                <Link16Regular />
                <Text size={200}>{task.dependsOn.length}</Text>
             </div>
          )}

          {task.dueDate && (
             <div className={styles.footerItem}>
               <CalendarLtr24Regular fontSize={16} />
               <Text size={200}>{new Date(task.dueDate).toLocaleDateString()}</Text>
             </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
