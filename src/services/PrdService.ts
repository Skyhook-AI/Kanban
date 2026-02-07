import type { Prd } from '../types/prd';

export class PrdService {
  // In a real/production environment, this might be configured via environment variables
  // or served from a specific API endpoint. For this local-first/TUI-mate app,
  // we expect prd.json to be available at the web root (e.g. in public/ folder).
  private static readonly PRD_PATH = '/prd.json';

  static async loadPrd(bustCache = false): Promise<Prd> {
    try {
      const url = bustCache ? `${this.PRD_PATH}?t=${Date.now()}` : this.PRD_PATH;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to load PRD: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Basic validation could go here, but for now we trust the JSON matches the interface mostly
      // or at least has userStories
      if (!data || !Array.isArray(data.userStories)) {
        throw new Error('Invalid PRD format: missing userStories array');
      }

      return data as Prd;
    } catch (error) {
      console.error('Error loading PRD:', error);
      throw error;
    }
  }
}
