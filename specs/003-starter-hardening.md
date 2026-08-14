# 003 — Harden the production starter

## Outcome

Make the starter safer to deploy, more deterministic to build, and harder to misconfigure.

## Problem and users

Agency developers need secure defaults that remain safe when a project is cloned and deployed with minimal customization. The current starter permits any authenticated user to seed destructive demo data, accepts unrestricted media uploads, lacks baseline HTTP hardening, and has a Docker path that depends on an unset Next.js option.

## Scope

- Restrict destructive seed operations to administrators.
- Validate secrets, URLs, and optional integrations at startup.
- Constrain media uploads by type and size.
- Add production-safe HTTP headers and standalone output.
- Make Docker and CI builds deterministic and least-privileged.
- Remove conflicting duplicate tool configuration.

## Exclusions

- UI redesign, CMS schema redesign, dependency upgrades, deployment, database migration, or authentication-provider changes.

## Architecture and data

No persistent data shape changes. Security rules live at the HTTP/collection boundary; deployment hardening lives in Next.js, Docker, and GitHub Actions configuration.

## Content and visual requirements

None.

## Risks

- Existing uploads above the new limits remain readable but cannot be re-uploaded unchanged.
- Strict production URL checks can expose previously hidden environment mistakes during startup.

## Acceptance criteria

- [ ] Only administrators can invoke the seed route.
- [ ] Media uploads reject non-image types and files larger than 10 MB.
- [ ] Production secrets meet minimum entropy-oriented length requirements and public URLs use HTTPS.
- [ ] Responses include baseline security headers without breaking Payload admin requirements.
- [ ] The Dockerfile builds the Next.js standalone server using the locked package manager.
- [ ] CI uses explicit least-privilege permissions and deterministic installs.
- [ ] Lint, typecheck, integration tests, and production build pass.

## Verification plan

Run `pnpm install --frozen-lockfile`, focused tests, `pnpm lint`, `pnpm typecheck`, `pnpm test:int`, and `pnpm build`. Inspect the final diff against this spec.

## Rollout and rollback

Deploy first to preview with production-equivalent environment variables. Roll back the individual atomic commit if a compatibility issue appears.
