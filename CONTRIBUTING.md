# Contributing to Gittensor Miners Frontend

Thank you for contributing to the dashboard UI. This guide explains how to set up, develop, and submit changes.

## Before you start

1. Read the [README](./README.md)
2. Run the backend locally (`gittensorminers-back`) — the UI depends on live API and WebSocket data
3. Copy `.env.example` to `.env`

## Development setup

```bash
# Terminal 1 — backend (from gittensorminers-back)
npm run dev

# Terminal 2 — frontend (this repo)
npm install
npm run dev
```

Open http://localhost:5173

## Code conventions

- **Language:** TypeScript, React function components
- **Imports:** Use `@/` path alias (maps to `src/`)
- **Styling:** Tailwind utility classes; shared styles in `src/index.css`
- **Components:** Keep pages in `src/pages/`, reusable UI in `src/components/`
- **Data:** Read live data from `useOutletContext` — do not fetch dashboard aggregates on a timer unless necessary

## Making changes

### Adding a page

1. Create the page in `src/pages/`
2. Register the route in `src/App.tsx`
3. Add nav link in `src/components/Layout.tsx` if needed

### Using realtime data

```tsx
const { data, lastSyncedAt } = useOutletContext<{
  data: CacheData;
  lastSyncedAt: string | null;
}>();
```

Use `lastSyncedAt` in `useMemo` dependencies when deriving lists from `data` so the UI updates after each sync.

### Adding API calls

1. Add the method to `src/services/api.ts`
2. Add or extend types in `src/types/index.ts`

### Styling

- Follow the existing dark theme (`gt-*` Tailwind colors in `tailwind.config.js`)
- Use existing component patterns: `.card`, `.btn-primary`, gradient text classes
- Keep responsive layouts — test at mobile and desktop widths

## Testing your changes

1. `npm run build` — must pass TypeScript and Vite build
2. Verify affected pages in the browser with backend running
3. Confirm data updates without refresh after a backend sync (~1 min)
4. Check tooltips, links, and overflow on the home snapshot panels

## Pull request checklist

- [ ] `npm run build` passes
- [ ] No hardcoded API URLs — use `import.meta.env` or relative paths
- [ ] New env vars added to `.env.example` and README
- [ ] UI works with the backend running locally
- [ ] No unrelated refactors mixed into the PR

## Reporting issues

Include:

- Browser and OS
- Steps to reproduce
- Screenshot if visual
- Whether backend is running and socket connected (check browser Network → WS)

## Questions

- [Gittensor Docs](https://docs.gittensor.io/)
- Backend setup: see `gittensorminers-back/README.md` in the monorepo
