# Production Payload foundation

## Outcome

Provide a reusable, commerce-free Payload website starter that can be deployed for real tests on Vercel with Neon and persistent media.

## Users

Administrators manage users, publish, and delete. Editors create and update draft content. Public visitors see published content only.

## Scope

Payload/Next integration, PostgreSQL schema and migration, content blocks, pages, posts, forms, media, navigation, SEO, redirects, search, preview, roles, environment validation, seed data, tests, CI and hosting documentation.

## Exclusions

Commerce, payments, client-specific design, paid infrastructure, DNS changes and production deployment.

## Architecture and data

One Next.js application embeds Payload. PostgreSQL is the source of truth; Vercel Blob is optional persistent object storage and Resend is optional transactional email. Runtime configuration is validated with Zod.

## Risks

Free-tier quotas can change. Migrations and seed operations can affect data. Media deletion is not assumed recoverable.

## Acceptance criteria

- The first user can register as an administrator.
- Editors can author drafts but cannot publish or delete content.
- Unauthenticated readers cannot retrieve drafts.
- The initial migration represents the full schema.
- CI validates against PostgreSQL and runs lint, types, integration, build and browser tests.
- English setup and free-hosting documentation is present.

## Verification, rollout and rollback

Run `pnpm check` with PostgreSQL, then deploy a preview using disposable Neon data. Apply migrations before opening `/admin`. Roll back code with the prior Vercel deployment and data with a Neon branch or restore point.
