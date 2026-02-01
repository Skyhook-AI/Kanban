import type { Board, AppSettings } from '../types/kanban';

const STORAGE_KEY = 'kanban-board-data';
const SETTINGS_KEY = 'kanban-settings';

const DEFAULT_DATA: Board = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: [
        {
          id: '1',
          title: 'Welcome to Kanban',
          description: 'This is a **sample** task with [Markdown](https://commonmark.org).',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
        },
      ],
    },
    {
      id: 'ready',
      title: 'Ready',
      tasks: [],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '2', title: 'Try moving this task', description: 'Drag and drop is coming soon!' },
      ],
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
  ],
};

export class StorageService {
  static loadData(): Board {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as Board;
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
    return DEFAULT_DATA;
  }

  static saveData(board: Board): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    } catch (error) {
      console.error('Failed to save data to storage:', error);
    }
  }

  static loadSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) {
        return JSON.parse(data) as AppSettings;
      }
    } catch (error) {
      console.error('Failed to load settings from storage:', error);
    }
    return { webhookUrl: '' };
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings to storage:', error);
    }
  }
}
