# Kanban Board App

A fast, modern Kanban board built with React, TypeScript, Vite, and Fluent UI. 

## Getting Started: Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version >= 18 recommended)
- [pnpm](https://pnpm.io/) (recommended), [npm](https://www.npmjs.com/), or [Yarn](https://yarnpkg.com/)

### Clone the repository
```sh
git clone https://github.com/your-username/kanban.git
cd kanban
```

### Install dependencies
- Using **pnpm** (recommended):
  ```sh
  pnpm install
  ```
- Using **npm**:
  ```sh
  npm install
  ```
- Using **yarn**:
  ```sh
  yarn install
  ```

## Running the App Locally

### Start the development server
- Using **pnpm**:
  ```sh
  pnpm dev
  ```
- Using **npm**:
  ```sh
  npm run dev
  ```
- Using **yarn**:
  ```sh
  yarn dev
  ```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as noted in the terminal).

#### Platform notes:
- **macOS/Linux:** The commands above are terminal-ready.
- **Windows:** Use PowerShell or Git Bash for best compatibility; separate commands with `&&` may not work in Command Prompt.

## Building for Production
```sh
pnpm build
```
Or use your package manager's equivalent:
```sh
npm run build
yarn build
```

## Running Tests & Quality Checks

### Type Checking
```sh
pnpm typecheck
```
- Checks for TypeScript errors (runs `tsc -b`).

### Linting (Code Quality)
```sh
pnpm lint
```
- Runs ESLint across the codebase for style and error checking.

### Markdown & CI checks
- Ensure your markdown files (README, documentation) are clean and follow [CommonMark](https://commonmark.org/) standards.
- If used, markdown lint can be run with tools like [`markdownlint`](https://github.com/DavidAnson/markdownlint) (`npx markdownlint README.md`).
- CI is not configured in this repo by default, but check with team for custom rules.

## Previewing Production Build
```sh
pnpm preview
```
- Serves the optimized build locally for validation.

## Troubleshooting
- Delete `node_modules` and `pnpm-lock.yaml` (or `package-lock.json`, `yarn.lock`) and reinstall dependencies if you have issues.
- For Windows-specific shell errors, try PowerShell or Git Bash, or consult [pnpm FAQ](https://pnpm.io/faq).

---

### Expanded Troubleshooting

**Common Installation & Running Errors:**
- If you see "Cannot find module" or ESM errors:
  - Make sure your Node.js is v18 or later.
  - If using Windows, avoid special characters (like `&`) in project folder name.
  - Delete and reinstall `node_modules` and lock file.
  - For ESM-only package errors, add `"type": "module"` to your `package.json` or rename config files to `.mjs`/`.mts`.
- Dev server stalls (Linux):
  - Increase file descriptor and inotify limits (`ulimit`, `sysctl`).
  - Check [Vite troubleshooting](https://vitejs.dev/guide/troubleshooting.html#dev-server).
- Network/stalled requests:
  - Check your browser for blocking extensions (disable ad blockers).
  - Use a trusted SSL certificate if using HTTPS.
- CORS errors after build:
  - Don’t open files over `file://`; use `pnpm preview` or `npm run preview`.
- If HMR (hot reloading) is not working:
  - Check for case sensitivity in import paths.
  - Fix circular dependency issues (see terminal logs).
  - WSL2 users: Check [`server.watch`](https://vitejs.dev/config/server-options.html#server-watch) settings.
- Missing dependencies:
  - Add the missing package directly to your `package.json`.
  - Use pnpm’s [`nodeLinker: hoisted`](https://pnpm.io/settings) or patch.
- Windows/Junctions/Drive issues:
  - pnpm works with junctions; ensure store is on the same drive as project.

**Dependency & Environment Tips:**
- Use [pnpm doctor](https://pnpm.io/cli/doctor) for environment checks.
- Always prefer Node.js >= 18 for best compatibility.
- If problems persist, run in a clean environment (fresh clone).
- Ask for help on [Vite Discord](https://chat.vite.dev) or [GitHub Discussions](https://github.com/your-username/kanban/discussions).

**More Resources:**
- [Vite Troubleshooting Guide](https://vitejs.dev/guide/troubleshooting.html)
- [pnpm FAQ & Help](https://pnpm.io/faq)
- [React Docs](https://react.dev)
- [pnpm Discussions](https://github.com/pnpm/pnpm/discussions)

---

## FAQ

**Q: What is a Kanban board?**
A: It's a workspace for visualizing, tracking, and organizing tasks in columns by status (To Do, In Progress, Done, Backlog).

**Q: How do I add, edit, or archive tasks?**
A: Add via the "Add Task" button in Backlog; edit tasks by clicking on cards; archive by moving tasks to Backlog.

**Q: Can I delete a task?**
A: Direct delete is not available. Move tasks to Backlog for archiving (serves as pseudo-delete).

**Q: Can I customize columns?**
A: Currently, columns are fixed to To Do, In Progress, Done, Backlog.

**Q: How do I use drag-and-drop?**
A: Drag task cards between columns to change their status.

**Q: My drag-and-drop isn’t working!**
A: Use a supported browser (Chrome, Edge, Firefox). Refresh the app if you experience UI glitches.

**Q: Can I attach files or comments?**
A: Not yet supported. See GitHub Discussions for feature requests.

**Q: How do I filter or tag tasks?**
A: Add tags when editing a task; no full text filtering yet.

**Q: How do I restore an archived task?**
A: Find it in the Backlog, click to edit, and assign to an active column.

**Q: Where can I get help or report bugs?**
A: See support links above or [open an issue](https://github.com/your-username/kanban/issues).

---

## Contributing
- Fork the repo, create a branch, open a PR.
- Run `pnpm lint` and `pnpm typecheck` before submitting code.
- Ensure documentation is clear and up to date!

## License
[MIT](LICENSE)


---

## Kanban Features

### Board Creation

Boards are automatically created when you launch the app. The board is structured into four columns: `To Do`, `In Progress`, `Done`, and `Backlog`. Each board is mapped from your requirements/user stories or previous saved work.

- **UI Element:** Boards appear as horizontal sets of columns on the main page.

![Board Layout Placeholder](./src/assets/react.svg)

### Adding Tasks

You can add tasks to any column, typically to `Backlog`. To add a task:
1. Locate the `Backlog` column
2. Click the **Add Task** button (plus icon)
3. Enter your task title in the dialog
4. Click **Add Task** to save

- **UI Element:** Add Task dialog powered by Fluent UI.

![Add Task Mockup](./src/assets/react.svg)

### Editing Tasks

To edit a task:
1. Click on any task card.
2. The **Task Detail Dialog** opens, allowing you to modify title, description (Markdown), due date, and tags.
3. Click **Save** to apply changes.

- **UI Element:** Task Detail Dialog; editable fields (Fluent UI Input/Textarea).

![Edit Task Mockup](./src/assets/react.svg)

### Deleting/Archiving Tasks

Direct delete is not available. To pseudo-delete:
- Move tasks to `Backlog` for archiving.
- Edit or update status to exclude from active workflow.

### Drag & Drop

Move tasks between columns by dragging for workflow transitions (e.g., `To Do` → `In Progress`).

- **UI Element:** Task cards are draggable between columns.

![Drag Task Mockup](./src/assets/react.svg)

---

## Quick Reference
| Command             | pnpm        | npm         | yarn       |
|---------------------|-------------|-------------|------------|
| Install deps        | pnpm install| npm install | yarn install|
| Dev server          | pnpm dev    | npm run dev | yarn dev   |
| Build               | pnpm build  | npm run build| yarn build |
| Typecheck           | pnpm typecheck| npm run typecheck| yarn typecheck |
| Lint                | pnpm lint   | npm run lint| yarn lint  |
| Preview build       | pnpm preview| npm run preview| yarn preview |

---
