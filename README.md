# Gittensor Miners — Frontend

React dashboard for [Gittensor](https://gittensor.io) (Bittensor Subnet 74). Displays live miner rankings, whitelisted repositories, recent pull requests, and a personal **My Board** after GitHub login.

![Gittensor Miners home page](./public/first%20page.png)

## Stack

- **Framework:** React 18, TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS
- **Routing:** React Router 7
- **Realtime:** Socket.io client
- **Icons:** Lucide React

## Prerequisites

- Node.js 20+
- Backend running locally (see `gittensorminers-back` setup in the monorepo)

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173**

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:4000` | Backend REST API base URL |
| `VITE_WS_URL` | `http://localhost:4000` | Socket.io server URL |

> In dev, Vite proxies `/api`, `/auth`, and `/socket.io` to the backend. Setting explicit URLs connects directly to port 4000 (recommended).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, live snapshot, how-it-works |
| `/repositories` | Whitelisted repos (list / tile views) |
| `/repositories/:owner/:repoName` | Repo detail |
| `/miners` | Miner leaderboard |
| `/miners/:githubId` | Miner detail |
| `/prs/:owner/:repoName/:prNumber` | PR detail |
| `/my-board` | Personal dashboard (requires GitHub login) |
| `/help` | Help and links |

## Realtime data

The app subscribes to backend WebSocket events via `useRealtimeData`:

1. On connect, receives `data:full`
2. After each backend sync, receives updated `data:full` + `data:updated`
3. All pages read from shared outlet context — no manual refresh needed

Home-page panels derive live lists from cached data in `src/utils/dashboardData.ts`.

## Project structure

```
src/
├── App.tsx                 # Routes
├── components/             # Layout, Header, Footer, avatars, tooltips
├── context/AuthContext.tsx # GitHub session state
├── hooks/useRealtimeData.ts
├── pages/                  # Route pages
├── services/
│   ├── api.ts              # REST client
│   └── socket.ts           # Socket.io client
├── types/                  # Shared TypeScript types
└── utils/                  # Formatting, PR status, dashboard helpers
```

## GitHub login

OAuth is handled by the backend. Configure the GitHub OAuth app in `gittensorminers-back/.env`. After login, **My Board** appears in the nav.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## References

- [Gittensor Docs](https://docs.gittensor.io/)
- [Gittensor API Swagger](https://api.gittensor.io/swagger#/)
