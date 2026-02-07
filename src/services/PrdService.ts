import type { Prd } from '../types/prd';
import { FileSystemService } from './FileSystemService';
import type { FileSystemFileHandle } from '../types/fileSystem';

export class PrdService {
  // In a real/production environment, this might be configured via environment variables
  // or served from a specific API endpoint. For this local-first/TUI-mate app,
  // we expect prd.json to be available at the web root (e.g. in public/ folder).
  private static readonly PRD_PATH = '/prd.json';
  private static fileHandle: FileSystemFileHandle | null = null;
  private static watcherInterval: number | null = null;
  private static lastModified: number = 0;

  static async setHandle(handle: FileSystemFileHandle) {
    this.stopWatching();
    this.fileHandle = handle;
    
    try {
      // Initialize lastModified so we don't trigger an immediate update
      const file = await handle.getFile();
      this.lastModified = file.lastModified;
      this.startWatching();
    } catch (error) {
      console.error('Failed to initialize file watcher:', error);
    }
  }

  static getHandle(): FileSystemFileHandle | null {
    return this.fileHandle;
  }

  private static startWatching() {
    if (this.watcherInterval) return;

    this.watcherInterval = window.setInterval(async () => {
      if (!this.fileHandle) return;

      try {
        const file = await this.fileHandle.getFile();
        if (file.lastModified > this.lastModified) {
          console.log('File changed detected, triggering reload...');
          this.lastModified = file.lastModified;
          window.dispatchEvent(new CustomEvent('prd-local-load'));
        }
      } catch (error) {
        console.error('Error in file watcher:', error);
        this.stopWatching(); // Stop watching if we lose access
      }
    }, 2000); // Check every 2 seconds
  }

  private static stopWatching() {
    if (this.watcherInterval) {
      window.clearInterval(this.watcherInterval);
      this.watcherInterval = null;
    }
  }

  static async loadPrd(bustCache = false): Promise<Prd> {
    try {
      let data: unknown;

      if (this.fileHandle) {
        console.log('Loading PRD from local file handle:', this.fileHandle.name);
        const content = await FileSystemService.readFile(this.fileHandle);
        data = JSON.parse(content);
      } else {
        const url = bustCache ? `${this.PRD_PATH}?t=${Date.now()}` : this.PRD_PATH;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to load PRD: ${response.status} ${response.statusText}`);
        }
        data = await response.json();
      }
      
      // Basic validation could go here, but for now we trust the JSON matches the interface mostly
      // or at least has userStories
      const prdData = data as { userStories?: unknown[] };
      if (!prdData || !Array.isArray(prdData.userStories)) {
        throw new Error('Invalid PRD format: missing userStories array');
      }

      return data as Prd;
    } catch (error) {
      console.error('Error loading PRD:', error);
      throw error;
    }
  }
}
