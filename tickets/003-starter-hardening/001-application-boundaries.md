# 003-001 — Secure application boundaries

Parent spec: `specs/003-starter-hardening.md`

## Outcome

Restrict destructive actions, uploads, secrets, origins, and HTTP responses with secure defaults.

## Allowed boundary

`src/env.ts`, `src/payload.config.ts`, `src/collections/Media.ts`, `src/app/(frontend)/next/seed/route.ts`, `next.config.ts`, and focused tests.

## Dependencies

None.

## Acceptance criteria

- [ ] Seed requires an administrator.
- [ ] Upload, secret, URL, CORS/CSRF, and security-header rules are explicit and tested where practical.

## Required checks

`pnpm lint`, `pnpm typecheck`, `pnpm test:int`, `pnpm build`.

## Exclusions

Authentication-provider or data-model changes.
