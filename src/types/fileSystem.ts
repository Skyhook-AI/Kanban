export interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  queryPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

export interface FileSystemFileHandle extends FileSystemHandle {
  kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
}

export interface FileSystemDirectoryHandle extends FileSystemHandle {
  kind: 'directory';
  // Add directory methods if needed in future
}

export interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}

export interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string | WriteParams): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

export type WriteParams =
  | { type: 'write'; position?: number; data: BufferSource | Blob | string }
  | { type: 'seek'; position: number }
  | { type: 'truncate'; size: number };

export interface OpenFilePickerOptions {
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
  types?: FilePickerAcceptType[];
  id?: string;
  startIn?: FileSystemHandle | WellKnownDirectory;
}

export type WellKnownDirectory = 
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos';

export interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

export interface FileSystemHandlePermissionDescriptor {
  mode?: 'read' | 'readwrite';
}
