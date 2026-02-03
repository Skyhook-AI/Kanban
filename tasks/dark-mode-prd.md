---
# PRD: Dark Mode Toggle for Kanban

## Overview
Introduce a three-state theme toggle (system, light, dark) for the Kanban board, providing easier adaptability in varying conditions and environments.

## Goals
- Seamless switching support for light, dark, and system preferences.
- Ensure a visually comfortable experience regardless of theme.
- Integration compatibility across all board components.

## Quality Gates

These commands must pass for every user story:
- `pnpm typecheck` - Lint and typechecks
- `pnpm lint` - Review code quality

For UI-specific tasks include:
- `dev-browser` - To visually validate for browsers.

## User Stories

### US-001: Implement Theme Toggle
**Description:** As a user, I want ability toggle between chosen [light, dark! night ] user-story-switch-clean between-light dark .