# Gittensor Miners

A dashboard for miners on **Bittensor Subnet 74 (SN74)** — the subnet that rewards merged GitHub PRs in whitelisted open-source repos.

It reads cached subnet data from the companion backend over REST and WebSocket, and surfaces live miner rankings, whitelisted repositories, recent pull requests, and a personal **My Board** after GitHub sign-in.

Built with React 18, TypeScript, Vite 6, Tailwind CSS, and Socket.io.

![Gittensor Miners home page](./public/first%20page.png)

## Main views

- `/` is the home page — hero, live snapshot panels, and how-it-works.
- `/miners` shows the miner leaderboard sorted by daily earnings.
- `/miners/:githubId` is the miner detail view.
- `/repositories` lists whitelisted repos in list or tile view.
- `/repositories/:owner/:repoName` is the repo detail view.
- `/prs/:owner/:repoName/:prNumber` is the pull request detail view.
- `/my-board` is the signed-in personal dashboard (requires GitHub login).
- `/help` links to in-app help and resources.

Live data updates automatically after each backend sync — no manual refresh needed.

## Quick start

```bash
git clone https://github.com/kiannidev/gittensorminers-ui.git
cd gittensorminers-ui
npm install
cp .env.example .env
npm run dev                    # http://localhost:5173
```

Requires Node.js 20+ and a running `gittensorminers-back` instance (see backend README).

## Development checks

```bash
npm run build
npm run preview
```

Run `npm run build` before submitting changes — it type-checks and produces the production bundle.

## GitHub setup

Sign-in is handled by the backend via a **GitHub OAuth App**.

**OAuth App** — https://github.com/settings/developers → New OAuth App

- Homepage URL: `http://localhost:5173` (or your public URL in prod)
- Callback URL: `http://localhost:4000/auth/github/callback`
- Copy the client ID and secret into `gittensorminers-back/.env`.

After login, **My Board** appears in the nav.

## Access

Anyone with a GitHub account can sign in through the backend OAuth flow. The frontend stores no credentials — session state comes from the backend.

## Environment variables

| Var | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend REST API base URL (default `http://localhost:4000`) |
| `VITE_WS_URL` | Socket.io server URL (default `http://localhost:4000`) |

> In dev, Vite proxies `/api`, `/auth`, and `/socket.io` to the backend. Setting explicit URLs connects directly to port 4000 (recommended).

## Production

```bash
npm run build
npm run preview                # local smoke test of the production build
```

Serve the `dist/` folder with nginx, Caddy, or any static host. Point `VITE_API_URL` and `VITE_WS_URL` at your deployed backend.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
