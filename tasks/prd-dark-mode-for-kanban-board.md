# PRD: Dark Mode for Kanban Board

## Overview
Implement a dark mode theme for the Kanban board application using Fluent UI's built-in theming capabilities. The feature will allow users to toggle between light and dark modes via the header, with preferences persisted in local storage to ensure a consistent experience across sessions.

## Goals
- Provide a visually comfortable dark theme for low-light usage.
- seamless switching between light and dark modes using Fluent UI providers.
- Persist user preference across browser sessions.
- Ensure all UI components (columns, cards, dialogs) maintain readability and accessibility standards in both modes.

## Quality Gates

These commands must pass for every user story:
- `npm run typecheck` - Type checking
- `npm run lint` - Linting

For UI stories, also include:
- Verify in browser using dev-browser skill to ensure visual correctness

## User Stories

### US-001: Theme State Management
As a developer, I want a centralized way to manage the active theme so that the preference can be toggled and persisted.

**Acceptance Criteria:**
- [ ] Create a React Context or Hook (e.g., `useTheme`) to manage theme state (`light` | `dark`).
- [ ] Initialize state by reading from `localStorage` (key: `app-theme`).
- [ ] Default to 'light' if no key is found.
- [ ] Provide a function to toggle the theme.
- [ ] Update `localStorage` whenever the theme changes.

### US-002: Apply Fluent UI Dark Theme
As a user, I want the application to visually change when dark mode is active so that the interface matches my preference.

**Acceptance Criteria:**
- [ ] Import `webDarkTheme` and `webLightTheme` from Fluent UI.
- [ ] Wrap the main application component (e.g., `App.tsx` or `index.tsx`) in `FluentProvider`.
- [ ] Pass the correct theme object to `FluentProvider` based on the current state.
- [ ] Ensure the background color of the `body` or main container updates to match the theme background.

### US-003: Header Theme Toggle
As a user, I want a visible control in the application header so that I can easily switch between light and dark modes.

**Acceptance Criteria:**
- [ ] Add a Toggle or Switch component to the `KanbanHeader` (or main navigation bar).
- [ ] Bind the toggle state to the theme context.
- [ ] Include an appropriate icon (e.g., Sun/Moon) or label for clarity.
- [ ] Ensure the toggle is accessible (aria-labels).

### US-004: Visual Verification & Component Tweaks
As a user, I want to ensure that all board elements are legible in dark mode so that I can continue working without visual bugs.

**Acceptance Criteria:**
- [ ] Verify Kanban Columns have distinct backgrounds from the main board background if necessary.
- [ ] Verify Task Cards have correct background and text colors (high contrast).
- [ ] Verify "Add Task" and other dialogs render correctly in dark mode.
- [ ] Verify text inputs and buttons remain visible and usable.

## Functional Requirements
- FR-1: The application must default to Light Mode if no preference is saved.
- FR-2: Clicking the theme toggle must instantly switch the UI theme without a page reload.
- FR-3: The user's selection must remain saved after closing and reopening the browser tab.
- FR-4: Standard Fluent UI tokens must be used to ensure consistency.

## Non-Goals
- System theme auto-detection (MVP is manual toggle only).
- Custom color palettes beyond standard Fluent UI Light/Dark themes.
- Per-component theme overrides.

## Technical Considerations
- **Library:** `@fluentui/react-components` (v9) is the primary UI library.
- **State:** React Context API recommended for avoiding prop drilling.
- **Persistence:** `localStorage` is sufficient for this scope; no backend storage required.

## Success Metrics
- Toggle switches theme instantly (<200ms).
- Preference persists after page refresh.
- Zero accessibility contrast violations in dark mode.