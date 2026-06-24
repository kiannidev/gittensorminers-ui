## Gittensor Miners Contributor Guide

### Getting Started

Before contributing, please:

1. Read the [README](./README.md) to understand the project
2. Familiarize yourself with the tech stack (React 18, TypeScript, Vite 6, Tailwind CSS, Socket.io)
3. Check existing issues and PRs to avoid duplicate work

### Local Development

1. Ensure you have Node.js 20+ installed
2. Clone the repo and run `npm install`
3. Copy `.env.example` to `.env` and fill in the values (see the [GitHub setup section in the README](./README.md#github-setup))
4. Start the backend in a separate terminal — the UI depends on live API and WebSocket data:

   ```bash
   cd ../gittensorminers-back
   cp .env.example .env
   npm install
   npm run dev                    # http://localhost:4000
   ```

5. Run `npm run dev` to start the frontend on `http://localhost:5173`

> **Never point a local frontend at a production backend.** Each contributor should run their own backend locally so dev experiments do not affect shared services or live user sessions.

### Creating Issues

When opening an issue, include:

- Browser and OS
- Steps to reproduce
- Expected vs. actual behavior
- Screenshot if the issue is visual
- Whether `gittensorminers-back` is running and the socket is connected (check browser Network → WS)

For security vulnerabilities, **do not create a public issue**. Report them privately to the repository maintainer.

### Lifecycle of a Pull Request

#### 1. Create Your Branch

- Fork the repository, then branch off of `main` and target `main` with your PR
- Use a descriptive branch name (e.g. `fix/home-tooltip-overflow`, `feat/miner-search-filter`)
- Ensure there are no conflicts with `main` before submitting

#### 2. Make Your Changes

- Write clean, well-documented code
- Follow existing code patterns and architecture
- Update documentation if applicable
- Do NOT add comments that are over-explanatory or redundant
- When making your changes, ask yourself: will this raise the value of the repository?
- Ensure `npm run build` passes before submitting

**Frontend-specific guidance:**

- Keep pages in `src/pages/` and reusable UI in `src/components/`
- Use the `@/` path alias for imports
- Read live data from `useOutletContext` — do not poll dashboard aggregates on a timer when WebSocket updates already cover the use case
- Use `lastSyncedAt` in `useMemo` dependencies when deriving lists from cached data

```tsx
const { data, lastSyncedAt } = useOutletContext<{
  data: CacheData;
  lastSyncedAt: string | null;
}>();
```

- Follow the existing dark theme (`gt-*` Tailwind colors in `tailwind.config.js`)
- Test responsive layouts at mobile and desktop widths

#### 3. Submit Pull Request

1. Push your branch to your fork
2. Open a PR targeting the `main` branch
3. Fill in the PR description with:
   - **Summary** — Clear description of changes
   - **Related Issues** — Link issues using `Fixes #123` or `Closes #456`
   - **Type of Change** — Bug fix, new feature, refactor, documentation, or other
   - **Testing** — Confirm manual browser testing performed
   - **Screenshots** — Required for visible UI changes
   - **Checklist** — Self-review, no unrelated changes, docs updated if needed

Use draft PRs for work-in-progress changes.

#### 4. Code Review

- Maintainers will review and may request changes
- Address review comments by pushing additional commits to the same branch (no force-push during review unless asked)

### PR Labels

Apply appropriate labels to help categorize and track your contribution:

- `bug` — Bug fixes
- `feature` — New feature additions
- `enhancement` — Improvements to existing features
- `refactor` — Code refactoring without functionality changes
- `documentation` — Documentation updates

### What We Accept

Focused contributions are welcome for:

- Page layout, navigation, and responsive UI
- Live data display via WebSocket outlet context
- Search, filtering, and detail views for miners, repos, and PRs
- **My Board** and GitHub login UX (backed by backend OAuth)
- Accessibility, tooltips, loading/error/empty states
- Documentation and developer experience improvements

### What We Do Not Accept

Do not open PRs for:

- Hardcoded or mock production data when the backend is available
- Polling-based refresh where WebSocket updates already cover the use case
- Unrelated refactors bundled with feature work
- Large dependency or framework swaps without maintainer discussion

### Code Standards

#### Quality Expectations

- Follow repository conventions (commenting style, variable naming, file layout)
- Use sensible component decomposition to keep files manageable
- Write clean, readable, maintainable code
- Avoid modifying unrelated files
- Avoid adding unnecessary dependencies
- No hardcoded API URLs — use `import.meta.env` or relative paths

#### Pre-submission check

Make sure the project still builds and the UI behaves correctly with the backend running:

```bash
npm run build
npm run preview                # optional local smoke test
```

With the backend running, confirm:

1. Affected pages render correctly in the browser
2. Data updates without refresh after a backend sync (~1 min)
3. Tooltips, links, and overflow behave on home snapshot panels

### Branches

#### `main`

**Purpose**: Production-ready code — runs the live dashboard

**Restrictions**:

- Requires pull request
- Requires `npm run build` to pass
- Requires maintainer approval before merge

---

Thank you for contributing to Gittensor Miners and helping advance open source software development!
