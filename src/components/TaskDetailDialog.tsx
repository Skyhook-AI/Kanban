import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Textarea,
  Label,
  makeStyles,
  Tag,
} from "@fluentui/react-components";
import { useState } from "react";
import type { Task } from "../types/kanban";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  tags: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
  },
});

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedTask: Task) => void;
}

export const TaskDetailDialog = ({
  task,
  open,
  onOpenChange,
  onSave,
}: TaskDetailDialogProps) => {
  const styles = useStyles();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.split("T")[0] : ""
  );
  const [tags, setTags] = useState<string[]>(task?.tags || []);
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    if (task) {
      onSave({
        ...task,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        tags,
      });
      onOpenChange(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent className={styles.content}>
            <div className={styles.field}>
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                value={title}
                onChange={(_, data) => setTitle(data.value)}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="task-desc">Description (Markdown)</Label>
              <Textarea
                id="task-desc"
                value={description}
                onChange={(_, data) => setDescription(data.value)}
                resize="vertical"
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="task-date">Due Date</Label>
              <Input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(_, data) => setDueDate(data.value)}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="task-tags">Tags</Label>
              <div style={{ display: "flex", gap: "5px" }}>
                <Input
                  id="task-tags"
                  value={newTag}
                  onChange={(_, data) => setNewTag(data.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag();
                    }
                  }}
                  placeholder="Type tag and press Enter"
                />
                <Button onClick={handleAddTag}>Add</Button>
              </div>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    dismissible
                    onClick={() => handleRemoveTag(tag)}
                    shape="circular"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
