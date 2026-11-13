# Global Starter

A production-oriented Payload CMS + Next.js starter for content-driven websites. It is intentionally commerce-free and designed to be copied as a GitHub template.

## Included

- Payload 3, Next.js 16, React 19, TypeScript and PostgreSQL
- Pages, posts, categories, media, navigation and global site settings
- Reusable layout blocks, forms, redirects, search, SEO and sitemap
- Drafts, versions, scheduled publishing, live preview and on-demand revalidation
- Administrator/editor roles: editors author drafts; administrators publish and delete
- Optional Vercel Blob storage and Resend email
- Demo seed, integration tests, Playwright tests, strict type checking and GitHub Actions
- Specs, vertical tickets, validation scripts and proof packs for the agency loop

## Local setup

Requirements: Node 22, pnpm and PostgreSQL (or Docker).

```bash
cp .env.example .env
# Generate three independent random secrets: openssl rand -hex 32
# Set POSTGRES_PASSWORD, and use its value in DATABASE_URL.
# Replace PAYLOAD_SECRET and PREVIEW_SECRET with the other two secrets.
docker compose up -d
pnpm install
pnpm db:migrate
pnpm dev
```

The bundled PostgreSQL port binds to 127.0.0.1 only. In production, remove `ports:` entirely and connect to PostgreSQL over a private network. The PostgreSQL password in `.env` must be URL-safe (the example command generates hexadecimal values). Updating `POSTGRES_USER` or `POSTGRES_PASSWORD` does **not** change users/passwords inside an existing `postgres_data` volume: rotate credentials in PostgreSQL and update application connection strings before restarting; do not delete a volume containing real data.

Open `http://localhost:3000/admin`. The first registered user becomes an administrator. Use `pnpm seed` only with a disposable database; it clears demo collections.

## Commands

```bash
pnpm dev                 # Development server
pnpm check               # Lint, types, integration tests and production build
pnpm test:e2e            # Browser tests
pnpm generate:types      # Regenerate Payload types
pnpm db:migrate:create   # Create a migration after schema changes
pnpm db:migrate          # Apply committed migrations
pnpm proof               # Build the delivery proof pack
```

## Use as a template

In GitHub repository settings, enable **Template repository**. For a new project, click **Use this template**, clone the new repository, update the package name and site metadata, copy `.env.example`, then create a migration for project-specific schema changes.

Keep generic capabilities in the starter. Put client-specific collections, branding and integrations only in the generated project.

## Free test deployment

The default test stack is Vercel Hobby + Neon Free + Vercel Blob. See [docs/hosting-free.md](docs/hosting-free.md) for setup, environment variables, backups and rollback.

## Delivery loop

Write the outcome in `specs/`, split it into independently verifiable tickets in `tickets/`, implement one bounded ticket, run `pnpm check`, review the diff cold, and attach the generated proof pack. Production deploys and destructive migrations always require human approval.

## License

MIT
