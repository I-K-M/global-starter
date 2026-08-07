# Global Starter

A simple starter for building client websites with Next.js, Payload, and PostgreSQL.

## Included

- Next.js App Router, React, strict TypeScript, and Tailwind CSS
- Payload Admin at `/admin`
- `users`, `media`, `pages`, and `posts` collections
- drafts and version history for content
- local PostgreSQL with Docker Compose
- Payload REST, GraphQL, and Local APIs
- linting, type checking, production builds, and GitHub Actions CI
- Vitest unit tests and Playwright desktop/mobile journeys
- specification, ticket, and proof pack templates
- Git worktrees for isolated parallel tickets
- optional Vercel preview deployments for pull requests

No e-commerce module is included.

## Getting started

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Health endpoint: http://localhost:3000/api/health

The first visit to `/admin` lets you create the initial administrator account.

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm check
pnpm payload:generate
pnpm db:migrate:create
pnpm db:migrate
```

## Database

Local development uses PostgreSQL through `docker-compose.yml`. Replace `DATABASE_URL` to use Neon, Supabase, Railway, or another compatible PostgreSQL provider.

Payload synchronizes the schema during development. For production, create and commit a migration before deployment.

Payload types are generated with `pnpm payload:generate` and are not committed, preventing stale types when collections change.

## Starting a client project

1. Mark this repository as a template, then duplicate it with **Use this template**.
2. Replace the metadata and demo content.
3. Adapt the Payload collections to the actual requirements.
4. Add the environment variables to the hosting provider.
5. Run `pnpm check` before every delivery.

See [docs/architecture.md](docs/architecture.md) for the architecture and evolution rules.

## Delivery loop

1. Start from a brief and complete `specs/_template.md`.
2. Split the work using `tickets/_template.md`.
3. Isolate a ticket with `scripts/create-worktree.sh ticket-slug`.
4. Implement the ticket, then run `pnpm check`.
5. Run Playwright for every user-facing change.
6. Perform a cold review of the diff.
7. Generate `pnpm proof -- ticket-slug` and complete the evidence.
8. Open a pull request. Production deployment still requires human approval.

For Vercel previews, configure the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` GitHub secrets.
