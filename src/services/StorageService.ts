import type { Board } from '../types/kanban';

const STORAGE_KEY = 'kanban-board-data';

const DEFAULT_DATA: Board = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Welcome to Kanban', description: 'This is a sample task.' },
        { id: '2', title: 'Try moving this task', description: 'Drag and drop is coming soon!' },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
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
}
