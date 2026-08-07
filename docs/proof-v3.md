# V3 proof pack

## Summary

The starter now uses the official Payload website architecture plus production access, database, storage, email and delivery-loop safeguards. See `specs/002-production-payload-foundation.md` and its ticket.

## Changed behavior

Pages, posts, blocks, forms, media, redirects, search, SEO, previews and seed content are available. Administrators control publication and deletion; editors work in drafts. Vercel Blob and Resend activate only when their tokens are configured.

## Evidence

- `tsc --noEmit`: passed.
- `eslint .`: passed with four upstream unused-variable warnings and no errors.
- `next build`: compilation and TypeScript passed; page-data collection correctly failed because this execution environment has no PostgreSQL server.
- Initial migration generated at `src/migrations/20260807_070747_initial_schema.ts`.

No visual redesign was performed, so screenshots are not applicable.

## Environment and migration

New required variables: `DATABASE_URL`, `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_SITE_NAME`. Blob and Resend variables are optional. Apply committed migrations before serving production traffic.

## Review and limitations

Cold review resolved fragile `src/...` imports, first-user registration, editor publication boundaries and CI's missing database service. Full integration/build/e2e execution remains delegated to GitHub Actions because PostgreSQL and Docker are unavailable locally.

## Rollback and human checks

Redeploy the previous Vercel version and restore/branch Neon before destructive schema changes. A human must configure secrets, verify free-tier terms, approve migration execution, create the first admin and inspect the preview on mobile and desktop.
