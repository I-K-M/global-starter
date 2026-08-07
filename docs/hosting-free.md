# Free test hosting

The recommended test stack is Vercel Hobby for the Next.js/Payload app, Neon Free for PostgreSQL, and Vercel Blob for persistent media. Free-plan limits and availability can change; verify them before a client launch.

## Environment variables

Copy every key from `.env.example` into Vercel. Use the pooled Neon connection string for `DATABASE_URL`, generate independent random values for `PAYLOAD_SECRET` and `PREVIEW_SECRET`, and let Vercel create `BLOB_READ_WRITE_TOKEN` when Blob is attached.

## First deployment

1. Create a Neon database and copy its pooled connection string.
2. Import this GitHub repository into Vercel.
3. Add the required environment variables for Development, Preview, and Production.
4. Attach a Vercel Blob store.
5. Deploy, run database migrations, then create the first account at `/admin`. The first account becomes an administrator.
6. Seed demo content only in a disposable database.

## Backups and rollback

Neon is the database system of record. Before a schema migration, create a Neon branch or restore point. Deploy migrations before application code when they are backward-compatible. To roll back application code, redeploy the previous Vercel deployment. Never assume Blob deletion can be rolled back; retain source assets separately.
