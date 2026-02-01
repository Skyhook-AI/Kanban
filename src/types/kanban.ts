export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  columns: Column[];
}
