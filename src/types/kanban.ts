export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  tags?: string[];
  readonly?: boolean;
  priority?: number;
  passes?: boolean;
  dependsOn?: string[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  readonly?: boolean;
}

export interface Board {
  columns: Column[];
}

export interface AppSettings {
  webhookUrl: string;
}
