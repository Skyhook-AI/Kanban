# PRD: Local PRD Loader & Rich Card Visualization

## Overview
Enhance the Kanban board to allow users to select and visualize a local `prd.json` file directly from their file system. The system will use the File System Access API to maintain a connection to the selected file, watching for changes to update the board in real-time. Additionally, the task cards will be upgraded to display rich metadata (priority, status, dependencies) available in the PRD schema, and board columns will be derived from the `passes` property.

## Goals
- Enable loading of local `prd.json` files via File System Access API
- Reflect external file changes on the board in real-time (polling/watching)
- Visualise critical task metadata: Priority, Dependencies, and Validation Status
- Map binary validation state (`passes`) to board columns (Todo/Done)

## Quality Gates

These commands must pass for every user story:
- `npm run typecheck` - Type checking
- `npm run lint` - Linting

For UI stories, also include:
- Verify in browser using dev-browser skill

## User Stories

### US-001: Implement File System Access Service
**Description:** As a developer, I want a robust service to handle the File System Access API interactions so that the app can read and watch local files safely.

**Acceptance Criteria:**
- [ ] Implement `openFilePicker` wrapper for `window.showOpenFilePicker`
- [ ] Create method to read content from the file handle
- [ ] Implement robust error handling (permissions denied, file not found)
- [ ] Ensure types are correctly defined for the File System Access API

### US-002: Add File Picker to Settings
**Description:** As a user, I want to select my `prd.json` file from the Settings dialog so that I can visualize my specific project.

**Acceptance Criteria:**
- [ ] Add "Load PRD" button/section in the Settings dialog
- [ ] On click, trigger the File System Access picker
- [ ] Display the name of the currently selected file
- [ ] Persist the file handle (in IndexedDB or memory) to survive hot-reloads if possible, or gracefully handle reset

### US-003: Real-time File Watcher
**Description:** As a user, I want the board to update automatically when I save changes to my local `prd.json` file.

**Acceptance Criteria:**
- [ ] Implement polling/checking mechanism on the active file handle (e.g., check `lastModified` every 1-2s)
- [ ] Automatically re-parse and update application state when a change is detected
- [ ] Show a subtle "Synced" or "Updated" indicator when new data loads

### US-004: Enhance Kanban Card Visualization
**Description:** As a user, I want to see priority, dependencies, and status directly on the card so that I can make informed decisions without opening details.

**Acceptance Criteria:**
- [ ] Display `priority` using a visual badge/icon (e.g., color-coded)
- [ ] Display a "Passes/Fails" status icon based on the `passes` boolean
- [ ] Display `dependsOn` count or list in the card footer
- [ ] Ensure layout handles missing optional fields gracefully

### US-005: Column Mapping Logic
**Description:** As a user, I want tasks to sort into "Todo" and "Done" columns based on their validation status.

**Acceptance Criteria:**
- [ ] Map `passes: false` items to the **Todo** column
- [ ] Map `passes: true` items to the **Done** column
- [ ] Maintain an **In Progress** column (empty by default, but available)
- [ ] Ensure cards move columns automatically if the `passes` value changes in the file

## Functional Requirements
- FR-1: Must use browser native File System Access API.
- FR-2: Application must poll the file handle to simulate "watch" functionality (as web apps cannot receive OS file events directly).
- FR-3: Cards must strictly adhere to the `UserStory` interface defined in `src/types/prd.ts`.
- FR-4: UI must remain responsive during file polling.

## Non-Goals
- Server-side file watching or specific backend integrations.
- Editing the PRD file from the UI (Read-only visualization for this iteration).
- Managing "In Progress" state persistence (since it doesn't exist in the JSON schema yet).

## Technical Considerations
- The File System Access API requires a secure context (HTTPS) or localhost.
- Polling interval should be balanced (e.g., 1000ms) to avoid performance impact while maintaining "real-time" feel.
- `dependsOn` contains IDs; consider how to resolve these to readable titles if space permits, otherwise show IDs.

## Success Metrics
- Users can load a local file and see it appear on the board.
- Changing `passes` to `true` in the local JSON moves the card to "Done" automatically within 2 seconds.
- No console errors during polling loops.

## Open Questions
- How do we handle large PRD files with hundreds of stories? (Performance)