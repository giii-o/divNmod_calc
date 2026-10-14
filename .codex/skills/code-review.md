---
name: code-review
description: Review and verify application changes with unit tests, Playwright UI tests, and ESLint.
---

# Code Review Workflow

Use this checklist when reviewing or handing off code changes.

## 1. Understand the change

- Read the repository's `AGENTS.md` files before editing or evaluating code.
- Inspect the changed files and their callers before judging an implementation.
- Confirm the behavior is covered at the smallest useful level, then verify the user-visible flow.
- Check error states, boundary values, accessibility labels, and responsive behavior when the change affects UI.

## 2. Write and run Vitest tests

- Add focused Vitest tests next to the relevant unit or in the repository's existing test directory.
- Cover normal cases, boundary cases, invalid input, and important error paths.
- Prefer testing pure functions directly instead of testing implementation details through React.
- Run the narrow test file first, then run the complete unit suite with:

```sh
npx vitest run
```

- If Vitest is not available, ask for permission before installing the development dependency and explain that it provides the unit-test runner used by these tests:

```sh
npm install --save-dev vitest
```

## 3. Run Playwright UI tests

- Add or update a Playwright test for each user-visible behavior changed.
- Interact through accessible roles, labels, and visible text rather than internal React state.
- Verify the primary flow and at least one failure or recovery path where applicable.
- Run the configured UI suite with:

```sh
npm run test:e2e
```

- If Playwright or its browser binaries are unavailable, ask for permission before installing them and explain that they provide browser-level verification:

```sh
npm install --save-dev @playwright/test
npx playwright install
```

## 4. Run ESLint

- Check whether ESLint is available before reviewing JavaScript or JSX changes:

```sh
npx eslint --version
```

- If that check fails, ask for permission before installing ESLint and explain that it statically checks JavaScript and JSX for correctness and maintainability:

```sh
npm install --save-dev eslint
```

- Run ESLint from the repository root after confirming the project has an ESLint configuration:

```sh
npx eslint .
```

- Treat new lint errors as review findings. Do not hide warnings by disabling rules without documenting the reason.

## 5. Report findings

- Separate correctness issues from style suggestions.
- Include the command run, whether it passed, and any environment limitation.
- Point to the relevant file and line when reporting a finding.
- Do not call a change verified when a required test or lint command was skipped; state the reason.
