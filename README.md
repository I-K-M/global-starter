# Global Starter

Starter simple pour produire des sites clients avec Next.js, Payload et PostgreSQL.

## Inclus

- Next.js App Router, React, TypeScript strict et Tailwind CSS
- Payload Admin sur `/admin`
- collections `users`, `media`, `pages` et `posts`
- brouillons et historique pour les contenus
- PostgreSQL local avec Docker Compose
- REST, GraphQL et Local API Payload
- lint, typecheck, build et CI GitHub Actions
- tests unitaires Vitest et parcours Playwright desktop/mobile
- templates de spécifications, tickets et proof packs
- worktrees Git pour isoler les tickets parallèles
- preview Vercel optionnelle sur les pull requests

Il n'y a aucun module e-commerce.

## Démarrage

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev
```

- site : http://localhost:3000
- administration : http://localhost:3000/admin
- santé : http://localhost:3000/api/health

Le premier accès à `/admin` permet de créer l'utilisateur administrateur.

## Commandes

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

## Base de données

Le développement local utilise PostgreSQL via `docker-compose.yml`. Remplace `DATABASE_URL` pour utiliser Neon, Supabase, Railway ou un autre PostgreSQL compatible.

Payload synchronise le schéma en développement. Pour la production, crée et versionne une migration avant le déploiement.

Les types Payload sont générés avec `pnpm payload:generate` et ne sont pas versionnés afin d'éviter des types obsolètes lorsque les collections changent.

## Nouveau projet client

1. Duplique le dépôt avec **Use this template** une fois le dépôt marqué comme template.
2. Remplace les métadonnées et le contenu de démonstration.
3. Adapte les collections Payload au besoin réel.
4. Ajoute les variables d'environnement à l'hébergeur.
5. Exécute `pnpm check` avant chaque livraison.

Voir [docs/architecture.md](docs/architecture.md) pour les règles d'évolution.

## Boucle de livraison

1. Partir d'un brief et remplir `specs/_template.md`.
2. Découper le travail avec `tickets/_template.md`.
3. Isoler un ticket avec `scripts/create-worktree.sh ticket-slug`.
4. Implémenter puis exécuter `pnpm check`.
5. Exécuter Playwright pour tout changement visible.
6. Faire une revue froide du diff.
7. Générer `pnpm proof -- ticket-slug` et compléter les preuves.
8. Ouvrir une PR ; la production reste soumise à une validation humaine.

Pour les previews Vercel, configurer les secrets GitHub `VERCEL_TOKEN`, `VERCEL_ORG_ID` et `VERCEL_PROJECT_ID`.
