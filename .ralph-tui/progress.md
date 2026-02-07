# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

- **Data Loading:** Configuration/Data files like `prd.json` are expected to be in `public/` to be accessible by the client-side application via `fetch`.
- **UI Structure:** `Layout.tsx` wraps the application and handles global UI elements like headers and themes. Data is often lifted to `App.tsx` to be shared.
- **Real-time Updates:** Use custom Vite plugins to watch external files (like `public/prd.json`) and trigger client-side updates via `import.meta.hot.on`.

---

## 2026-02-07 - US-001
- Implemented `PrdService` to fetch and parse `prd.json`.
- Defined TypeScript interfaces for PRD data in `src/types/prd.ts`.
- Updated `App.tsx` to load PRD data on startup.
- Updated `Layout.tsx` to display the task count in the header.
- Copied `tasks/PRD.json` to `public/prd.json` to seed the data.
- **Learnings:**
  - `prd.json` capitalization matters; the source was `PRD.json` but requirements asked for `prd.json`.
  - Fluent UI `tokens` are used for styling in `Layout`.
  - `verbatimModuleSyntax` requires `import type` for type-only imports.
---

## 2026-02-07 - US-002
- Implemented mapping of statuses from `prd.json` to Kanban columns.
- Updated `Prd` and `UserStory` types to include optional `status`.
- Updated `Board` component to accept `prd` data and initialize board columns based on it.
- Updated `App` component to pass `prd` data to `Board` and force remount on update using `key`.
- **Learnings:**
  - `prd.json` lacks a `status` field by default, had to add it to the type and the file for verification.
  - `Board` component state initialization needs to handle both local storage and PRD data sources.
  - Used `key` prop on `Board` to force re-initialization of state when `prd` data loads or updates.
---

## 2026-02-07 - US-003
- Implemented `fsWatcherPlugin` in `vite.config.ts` to watch `public/prd.json`.
- Added HMR event listener in `App.tsx` to reload data on `prd-update` event.
- Updated `PrdService` to support cache-busting timestamp for fresh data.
- **Learnings:**
  - Vite's `server.watcher` (chokidar) allows watching arbitrary files outside the module graph.
  - `import.meta.hot.on` is the mechanism to receive custom events in the client.
  - Debouncing is necessary for file watchers as editors often trigger multiple events on save.
---

## 2026-02-07 - US-004
- Implemented read-only mode for external tasks (loaded from PRD).
- Added `readonly` flag to `Task` and `Column` interfaces.
- Updated `Board.tsx` to set `readonly` flag for PRD items.
- Updated `TaskCard.tsx` to display lock icon and disable drag-and-drop for read-only tasks.
- Updated `BoardColumn.tsx` to hide "Add Item" button for read-only columns.
- Updated `TaskDetailDialog.tsx` to show read-only view for locked tasks.
- **Learnings:**
  - `dnd-kit`'s `useSortable` `disabled` prop is an easy way to disable dragging for specific items.
  - Fluent UI icons can be imported individually, but finding the exact name requires checking documentation or package contents if not obvious.
---
