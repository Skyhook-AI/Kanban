# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **Type Imports:** Use `import type` for type definitions as `verbatimModuleSyntax` is enabled.
- **Services:** Implement services as static classes (e.g., `FileSystemService`, `StorageService`).
- **File System:** Use `FileSystemService` for file interactions; types are defined in `src/types/fileSystem.ts`.

---

## 2026-02-07 - US-001
- Implemented `FileSystemService` wrapping `window.showOpenFilePicker` and file reading.
- Created `src/types/fileSystem.ts` to define File System Access API types.
- Files changed:
  - `src/services/FileSystemService.ts`
  - `src/types/fileSystem.ts`
- **Learnings:**
  - The project uses `verbatimModuleSyntax`, requiring explicit `import type`.
  - File System Access API types were manually defined to ensure type safety without relying on unstable global definitions.
  - Implemented robust error handling for user cancellation and permission denial.
---

## 2026-02-07 - US-002
- Implemented file picker in Settings dialog using `FileSystemService`.
- Updated `PrdService` to support loading from a `FileSystemFileHandle` stored in memory.
- Added event-based communication (`prd-local-load`) to trigger data reload in `App` when a file is selected.
- Files changed:
  - `src/components/SettingsDialog.tsx`
  - `src/services/PrdService.ts`
  - `src/App.tsx`
- **Learnings:**
  - Used `window.dispatchEvent` as a lightweight mechanism to trigger global data reloads from nested components without complex Context/State lifting for this specific action.
  - Persisting `FileSystemFileHandle` in memory (static class property) survives component unmounts but resets on page reload, which meets the "gracefully handle reset" criteria.
---

## 2026-02-07 - US-003
- Implemented real-time file watcher in `PrdService` using `setInterval` polling (every 2s).
- Added `lastSynced` state to `App` and passed it to `Layout` for UI feedback.
- Files changed:
  - `src/services/PrdService.ts`: Added `startWatching`/`stopWatching` logic.
  - `src/App.tsx`: Added `lastSynced` state and update logic.
  - `src/Layout.tsx`: Added "Synced: [time]" indicator.
- **Learnings:**
  - `FileSystemFileHandle.getFile()` provides a fresh `File` object with updated `lastModified` timestamp, making polling effective for detecting external changes.
  - Reused `window.dispatchEvent` ('prd-local-load') to trigger updates from the service layer to the UI.
---

## 2026-02-07 - US-004
- Updated `Task` interface to include `priority`, `passes`, and `dependsOn`.
- Updated `Board.tsx` to map PRD fields to `Task` properties.
- Updated `TaskCard.tsx` to display:
  - Priority badge (color-coded P1-P5).
  - Pass/Fail status icon.
  - Dependency count with link icon.
- Files changed:
  - `src/types/kanban.ts`
  - `src/components/Board.tsx`
  - `src/components/TaskCard.tsx`
- **Learnings:**
  - `Task` objects in Kanban were missing fields present in the PRD source (`UserStory`).
  - Used `@fluentui/react-components` `Badge` and `@fluentui/react-icons` for visual indicators.
  - Flexbox in `CardFooter` handles variable content width and wrapping gracefully.
---

## 2026-02-07 - US-005
- Implemented column mapping logic based on validation status.
- `passes: false` maps to **To Do**.
- `passes: true` maps to **Done**.
- Fallback to existing `status` field if `passes` is undefined.
- Files changed:
  - `src/components/Board.tsx`
- **Learnings:**
  - `Board` component re-initializes `boardData` when `prd` prop changes, enabling automatic column moves when the file is updated.
  - Used explicit boolean check (`typeof story.passes === 'boolean'`) to ensure `false` is handled correctly as "To Do", distinguishing it from `undefined`.
---
