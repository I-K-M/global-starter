# Production foundation

Parent spec: `specs/002-production-payload-foundation.md`

Outcome: deliver the complete vertical foundation from CMS schema through deployment checks.

Allowed boundary: application source, migrations, tests, scripts, workflows and documentation. Depends on no other ticket.

Acceptance: all parent-spec criteria are represented and deterministic checks pass when PostgreSQL is available.

Required checks: lint, generated types/import map, typecheck, migration, integration tests, production build and Playwright.

Exclusions: production deployment, secrets, paid services and client-specific content.
