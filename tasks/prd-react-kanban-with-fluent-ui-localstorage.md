# PRD: React Kanban with Fluent UI & LocalStorage

## Overview
A lightweight, client-side Kanban board application built with React and Vite, styled using Microsoft Fluent UI. The application manages task workflows across five fixed stages (Backlog, Ready, In Progress, In Review, Done). Data is persisted in the browser's LocalStorage, making it a zero-setup tool. It supports Markdown for task descriptions and integrates with external communication tools via client-side webhooks.

## Goals
- Provide a visually professional Kanban interface using Microsoft Fluent UI.
- Enable smooth task management with drag-and-drop capabilities.
- Persist all data securely in the user's browser (LocalStorage).
- Allow rich text documentation for tasks using Markdown.
- Integrate with external tools (Slack/Discord) via webhooks for status updates.

## Quality Gates

These commands must pass for every user story:
- `npm run typecheck` - TypeScript compilation check
- `npm run lint` - Code linting

For UI stories, also include:
- Verify in browser using dev-browser skill

## User Stories

### US-001: Project Scaffolding & Fluent UI Setup
As a developer, I want to initialize the React application with Fluent UI so that I have a solid foundation for UI development.

**Acceptance Criteria:**
- [ ] Initialize React + Vite + TypeScript project
- [ ] Install and configure `@fluentui/react-components`
- [ ] Setup a basic layout shell (Header + Main Content area)
- [ ] Application builds without errors

### US-002: Implement Data Service (LocalStorage)
As a user, I want my data to be saved automatically so that I don't lose work when I refresh the page.

**Acceptance Criteria:**
- [ ] Create a `StorageService` to handle Read/Write operations
- [ ] Define TypeScript interfaces for `Task`, `Column`, and `Board`
- [ ] Implement `loadData()` to retrieve state from LocalStorage
- [ ] Implement `saveData()` to persist state changes
- [ ] Seed default data if storage is empty

### US-003: Board Layout & Columns
As a user, I want to see the five specific workflow columns so that I can visualize the process.

**Acceptance Criteria:**
- [ ] Render 5 fixed columns: **Backlog**, **Ready**, **In Progress**, **In Review**, **Done**
- [ ] Columns are arranged horizontally
- [ ] Each column displays its title
- [ ] Layout is responsive (scrollable on smaller screens)

### US-004: Create New Task
As a user, I want to add new tasks to the "Backlog" so that I can capture work items.

**Acceptance Criteria:**
- [ ] "Add Task" button present (global or top of Backlog column)
- [ ] Modal/Panel dialog opens for input
- [ ] Fields required: Title (text)
- [ ] New task appears immediately in the "Backlog" column
- [ ] Data is persisted to LocalStorage

### US-005: Task Card & Markdown Rendering
As a user, I want to view task details with formatting so that information is easy to read.

**Acceptance Criteria:**
- [ ] Task cards display Title, ID, and Due Date (if set)
- [ ] Task descriptions support Markdown rendering (bold, list, links)
- [ ] Use a secure Markdown library (e.g., `react-markdown`)
- [ ] Card styling matches Fluent UI design language

### US-006: Drag and Drop Implementation
As a user, I want to move tasks between columns by dragging so that I can update their status intuitively.

**Acceptance Criteria:**
- [ ] Integrate `@dnd-kit` for drag-and-drop interactions
- [ ] Tasks can be dragged from one column to another
- [ ] Visual feedback during drag (drop placeholder)
- [ ] Dropping a task updates its status/column
- [ ] Change is persisted to LocalStorage

### US-007: Task Details & Editing
As a user, I want to edit task details, including tags and due dates, so that I can keep information current.

**Acceptance Criteria:**
- [ ] Clicking a task opens a Detail Panel/Dialog
- [ ] User can edit Title and Description
- [ ] User can add/remove Tags (categories)
- [ ] User can select a Due Date via date picker
- [ ] "Save" updates the task on the board and in storage

### US-008: Settings & Webhook Configuration
As a user, I want to configure a webhook URL so that I can send notifications to my chat app.

**Acceptance Criteria:**
- [ ] Create a Settings page/modal
- [ ] Input field for "Webhook URL"
- [ ] "Test Webhook" button to send a dummy payload
- [ ] Save configuration to LocalStorage

### US-009: Webhook Triggers
As a user, I want notifications sent automatically when tasks are completed so that my team is aware.

**Acceptance Criteria:**
- [ ] System detects when a task is dropped into the "Done" column
- [ ] System sends a POST request to the configured Webhook URL
- [ ] Payload includes Task Title and Status
- [ ] Handle errors gracefully (e.g., if URL is invalid, don't crash app)

### US-010: Progress Dashboard
As a user, I want to see a summary of progress so that I know how the project is doing.

**Acceptance Criteria:**
- [ ] Display total count of tasks per column
- [ ] Show a simple progress bar (Ratio of "Done" tasks vs Total)
- [ ] Update metrics in real-time as tasks move

## Functional Requirements
- FR-1: The system must enforce the 5 fixed column stages: Backlog, Ready, In Progress, In Review, Done.
- FR-2: All data must be stored in the browser's `localStorage` under a specific key (e.g., `kanban-data`).
- FR-3: Dragging a task must strictly preserve its order within the new column.
- FR-4: Webhook notifications must trigger *only* on column changes (specifically to 'Done' or configurable), not on minor edits.

## Non-Goals
- Server-side persistence or multi-user sync (Real-time collaboration).
- User Authentication (Login/Signup).
- Customizing column names or adding new columns.
- Mobile native app (Responsive web only).
- File attachments for tasks.

## Technical Considerations
- **Fluent UI:** Ensure the `FluentProvider` wraps the app correctly.
- **CORS:** Client-side webhooks to services like Slack/Discord might encounter CORS issues. If this occurs, we may need to note that a browser extension or proxy is required, but for MVP, we will attempt direct `fetch` calls.
- **Performance:** LocalStorage is synchronous; keep the data payload reasonable.

## Success Metrics
- User can successfully create a task and move it to "Done".
- Page reload restores the board state exactly as left.
- Webhook receives a payload upon task completion.