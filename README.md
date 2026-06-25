# Gittensor Miners

A miner intelligence dashboard for **Bittensor Subnet 74 (SN74 / Gittensor)** — built to help miners **analyze repositories and PRs, compare opportunities, monitor live status, and make better mining decisions**.

Today the project focuses on SN74. The long-term goal is to extend the same approach across **all Bittensor subnets** — covering miners, validators, registration economics, and subnet-specific mining workflows so users can **choose a subnet and start mining with clearer data**.

Built with React 18, TypeScript, Vite 6, Tailwind CSS, and Socket.io.

![Gittensor Miners home page](./public/first%20page.png)

## Why this exists

Official explorers show rankings and raw activity, but miners often need **decision statistics** that are hard to infer at a glance — for example:

| Gittensor (SN74) | Bittensor (planned) |
| --- | --- |
| Merge rate and maintainer reaction time | Registration fee vs expected reward |
| Active miners per repo and their scores | Share of miners that actually earn |
| Reward amount and average score per PR | Reward distribution and mining type |
| Competition density in a repo | Subnet comparison and entry cost |
| Effective reward after **maintainer cut** | Validator/miner landscape per subnet |

A high-weight repo is not always the best target. Maintainer cuts, inactive maintainers, and crowded repos can produce **lower returns than a lower-weight alternative**. This dashboard is being built to surface those signals.

## Current scope (SN74)

- Live miner leaderboard, whitelisted repositories, and recent PRs
- Repo and PR detail views with search
- Personal **My Board** after GitHub sign-in
- Real-time updates from the companion backend (no manual refresh)

## Roadmap

**Near term — Gittensor analytics**

- Repo comparison: merge rate, maintainer response time, active miner count, average score per PR
- Reward modeling: emission share, maintainer cut, and estimated net reward per repo
- Competition signals: flag repos with slow maintainers or high incumbent miner scores
- Watchlists and status monitoring for selected repos

**Long term — all Bittensor subnets**

- Subnet browser: registration cost, reward rate, miner count, mining type
- Cross-subnet comparison to help pick where to mine
- Validator and miner stats per subnet
- Guided flows to evaluate a subnet and start mining

Architecture is being kept **subnet-agnostic** where possible so new subnets can plug in without rewriting the core app.

## Main views

- `/` — home page with live snapshot panels and how-it-works
- `/miners` — miner leaderboard sorted by daily earnings
- `/miners/:githubId` — miner detail
- `/repositories` — whitelisted repos (list / tile)
- `/repositories/:owner/:repoName` — repo detail
- `/prs/:owner/:repoName/:prNumber` — PR detail
- `/my-board` — personal dashboard (GitHub login required)
- `/help` — help and resources

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
