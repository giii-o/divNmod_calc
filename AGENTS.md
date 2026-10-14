# Repository Guidelines

## Project Structure & Module Organization

This is a small React 18 app built with Vite. The root `index.html` provides the page shell, and the main interface and React mount currently live in `@app.jsx`. Put reusable UI in `@components/` and static files in `@assets/`; both folders are currently placeholders. Keep changes focused and avoid adding a new directory structure without a need.

## Build, Test, and Development Commands

Run commands from the repository root:

- `npm install` installs the dependencies declared in `package.json`.
- `npm run dev` starts the Vite development server for local work.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle locally; run it after `npm run build`.
- `npm run test:e2e` runs the Playwright UI checks.

There is no test or lint script configured yet. If you add one, document it in `package.json` and here.

## Coding Style & Naming Conventions

Use JavaScript ES modules and React function components. Follow the existing two-space indentation, single quotes in JavaScript, and semicolons. Name components and component files in `PascalCase`; use `camelCase` for functions, variables, and props. Keep styles consistent with the current component-scoped approach, and extract reusable components or shared assets into their respective folders.

## Testing Guidelines

No testing framework or coverage requirement is configured. For UI changes, run `npm run build` to catch compilation errors and manually check the affected flow in `npm run dev`. Add focused automated tests when introducing nontrivial behavior, and state how to run them in the PR.

## Commit & Pull Request Guidelines

The Git history currently contains only an initial commit, so no established commit message convention is available. Use a short imperative summary, such as `Add remainder input handling`. Pull requests should explain the user-visible change, note relevant verification (for example, `npm run build`), and include screenshots for visual changes. Link related issues when applicable.

## Security & Configuration Tips

Do not commit credentials or local environment files. `.gitignore` already excludes `.env` files, dependencies, build output, and common local artifacts; keep secrets in local environment configuration.

## Operational Skills & Workflows
When executing specific tasks, refer to the dedicated skill guides located in `.codex/skills/`
- **UI Implementation:** Follow [./.codex/skills/design.md](./.codex/skills/design.md)
