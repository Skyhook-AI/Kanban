import type { 
  FileSystemFileHandle, 
  OpenFilePickerOptions,
  FileSystemHandlePermissionDescriptor 
} from '../types/fileSystem';

export class FileSystemService {
  /**
   * Opens a file picker dialog allowing the user to select one or more files.
   * Wraps window.showOpenFilePicker.
   * 
   * @throws Error if the API is not supported or if the user cancels.
   */
  static async openFilePicker(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]> {
    if (!('showOpenFilePicker' in window)) {
      throw new Error('File System Access API is not supported in this browser.');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handles = await (window as any).showOpenFilePicker(options);
      return handles as FileSystemFileHandle[];
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('User cancelled file selection.');
      }
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to open file picker: ${msg}`);
    }
  }

  /**
   * Reads the text content of a file from its handle.
   * Verifies permission before reading.
   */
  static async readFile(handle: FileSystemFileHandle): Promise<string> {
    try {
      const hasPermission = await this.verifyPermission(handle, false);
      if (!hasPermission) {
        throw new Error('Permission denied to read file.');
      }

      const file = await handle.getFile();
      return await file.text();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to read file: ${msg}`);
    }
  }

  /**
   * Verifies if the app has permission to read/write the file.
   * Requests permission if not granted.
   */
  static async verifyPermission(
    handle: FileSystemFileHandle, 
    withWrite: boolean = false
  ): Promise<boolean> {
    const opts: FileSystemHandlePermissionDescriptor = { 
      mode: withWrite ? 'readwrite' : 'read' 
    };

    try {
      // Check if permission was already granted.
      if ((await handle.queryPermission(opts)) === 'granted') {
        return true;
      }

      // Request permission.
      if ((await handle.requestPermission(opts)) === 'granted') {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error verifying permission:', error);
      return false;
    }
  }
}
