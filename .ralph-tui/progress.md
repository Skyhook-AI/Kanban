# Ralph Progress Log

This file tracks progress across iterations. Agents update this file
after each iteration and it's included in prompts for context.

## Codebase Patterns (Study These First)

*Add reusable patterns discovered during development here.*
- Troubleshooting sections should distinguish platform-specific issues, add command-line fixes, and link to authoritative resources (Vite, pnpm, Discord, GitHub).
- FAQ format optimizes onboarding: cover pseudo-delete/archive, fixed column workflow, and UI interaction patterns.

---

## Sun Mar 08 2026 - US-001
- What was implemented
  - README.md entirely rewritten with detailed setup, run, and test instructions for pnpm, npm, yarn
  - Commands and platform notes for macOS, Windows, Linux
  - Quick reference command table
  - Troubleshooting advice and contributing notes
- Files changed
  - README.md
- **Learnings:**
  - Default templates rarely provide full onboarding clarity – always expand for team/project needs
  - Command and script nomenclature usually matches across pnpm, npm, yarn for modern JS projects
  - Platform-specific troubleshooting (Windows shell quirks) should be noted prominently
  - No markdown lint or CI config present; make sure to flag this in onboarding docs
---

## Sun Mar 08 2026 - US-002
- What was implemented
  - README.md updated with step-by-step workflows for board creation, task addition, editing, deleting/archiving, drag-and-drop, and UI element descriptions
  - Mockup image placeholders added under each major feature for easy screenshot insertion
- Files changed
  - README.md
- **Learnings:**
  - Fluent UI Dialogs and Button patterns are consistent across actions, enabling reusable docs/screenshots
  - 'Delete' is not implemented; archive/backlog serves as pseudo-delete, so docs must clarify this to users
  - External screenshot fetching can fail; use local asset placeholders and instruct users to replace with real screenshots once app visuals are ready
  - UI workflow is easily mapped to README with minimal code inspection thanks to semantic naming and consistent handlers
---

## Sun Mar 08 2026 - US-003
- What was implemented
  - Expanded Troubleshooting section with actionable installation, environment, and running error solutions; platform-specific advice; dependency/environment tips
  - Comprehensive FAQ covering board/task management, pseudo-delete/archiving, column workflow, drag-and-drop, and missing features
  - Added multiple authoritative support links for further help
- Files changed
  - README.md
- **Learnings:**
  - Vite/pnpm troubleshooting guides provide reusable platform-specific tips for JS onboarding
  - Linking to official community resources (Discord, Discussions) accelerates self-service support
  - FAQ sections should clarify “pseudo-delete”, fixed columns, and onboarding questions to minimize external support requests
  - Markdown lint and CI are not always configured; keep docs CommonMark compliant for future-proofing
---
