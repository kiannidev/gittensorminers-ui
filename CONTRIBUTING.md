## Gittensor Miners Contributor Guide

### Project direction

Gittensor Miners is a **miner decision platform** — not just an explorer. The goal is to help miners analyze repositories and PRs, compare opportunities, monitor status, and eventually choose subnets across all of Bittensor.

**Today:** SN74 (Gittensor) — live leaderboard, repos, PRs, My Board.

**Next:** analytics that official tools do not surface well — merge rate, maintainer reaction time, active miners per repo, average score per PR, effective reward after maintainer cut, competition density.

**Later:** all Bittensor subnets — registration fee vs reward, miner/validator stats, mining type, subnet comparison, guided mining entry.

When contributing, prefer changes that move toward **actionable miner intelligence** and stay **extensible for multi-subnet** support.

### Getting Started

Before contributing, please:

1. Read the [README](./README.md) — especially **Why this exists** and **Roadmap**
2. Familiarize yourself with the tech stack (React 18, TypeScript, Vite 6, Tailwind CSS, Socket.io)
3. Check existing issues and PRs to avoid duplicate work

### Local Development

1. Ensure you have Node.js 20+ installed
2. Clone the repo and run `npm install`
3. Copy `.env.example` to `.env` and fill in the values (see the [GitHub setup section in the README](./README.md#github-setup))
4. Start the backend in a separate terminal:

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

For feature ideas, describe **which miner decision** the change supports (e.g. "avoid repos with slow maintainers", "compare net reward after maintainer cut").

For security vulnerabilities, **do not create a public issue**. Report them privately to the repository maintainer.

### Lifecycle of a Pull Request

#### 1. Create Your Branch

- Fork the repository, then branch off of `main` and target `main` with your PR
- Use a descriptive branch name (e.g. `feat/repo-merge-rate-column`, `fix/home-tooltip-overflow`)
- Ensure there are no conflicts with `main` before submitting

#### 2. Make Your Changes

- Write clean, well-documented code
- Follow existing code patterns and architecture
- Update documentation if applicable
- Do NOT add comments that are over-explanatory or redundant
- When making your changes, ask yourself: will this help a miner make a better decision?
- Ensure `npm run build` passes before submitting

**Frontend-specific guidance:**

- Keep pages in `src/pages/` and reusable UI in `src/components/`
- Put derived analytics in `src/utils/` — keep components focused on display
- Use the `@/` path alias for imports
- Read live data from `useOutletContext` — do not poll when WebSocket updates cover the use case
- Use `lastSyncedAt` in `useMemo` dependencies when deriving lists from cached data
- Design UI so future **multi-subnet** views can reuse layout patterns (avoid hardcoding "SN74 only" through every component)
- Follow the existing dark theme (`gt-*` Tailwind colors in `tailwind.config.js`)
- Test responsive layouts at mobile and desktop widths

```tsx
const { data, lastSyncedAt } = useOutletContext<{
  data: CacheData;
  lastSyncedAt: string | null;
}>();
```

#### 3. Submit Pull Request

1. Push your branch to your fork
2. Open a PR targeting the `main` branch
3. Fill in the PR description with:
   - **Summary** — Clear description of changes
   - **Miner value** — What decision or insight this improves
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

- `bug` — Bug fixes
- `feature` — New feature additions
- `enhancement` — Improvements to existing features
- `analytics` — Miner decision metrics, comparisons, or signals
- `refactor` — Code refactoring without functionality changes
- `documentation` — Documentation updates

### What We Accept

Focused contributions are welcome for:

- Repo/PR analysis UI — merge rate, reaction time, competition, reward estimates
- Comparison and filtering to help miners shortlist repos
- Watchlists and monitoring views for selected repos
- Live data display via WebSocket outlet context
- **My Board** and GitHub login UX
- Accessibility, tooltips, loading/error/empty states
- Multi-subnet-ready layout and routing patterns (even if SN74 is the only subnet today)
- Documentation and developer experience improvements

### What We Do Not Accept

Do not open PRs for:

- Raw leaderboard clones with no decision value over existing explorers
- Hardcoded or mock production data when the backend is available
- Polling-based refresh where WebSocket updates already cover the use case
- SN74 logic baked into shared components that will block other subnets later
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

Thank you for contributing to Gittensor Miners and helping miners make smarter decisions.
