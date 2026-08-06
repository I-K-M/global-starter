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
pnpm build
pnpm check
pnpm payload:generate
pnpm db:migrate:create
pnpm db:migrate
```

## Base de données

Le développement local utilise PostgreSQL via `docker-compose.yml`. Remplace `DATABASE_URL` pour utiliser Neon, Supabase, Railway ou un autre PostgreSQL compatible.

Payload synchronise le schéma en développement. Pour la production, crée et versionne une migration avant le déploiement.

## Nouveau projet client

1. Duplique le dépôt avec **Use this template** une fois le dépôt marqué comme template.
2. Remplace les métadonnées et le contenu de démonstration.
3. Adapte les collections Payload au besoin réel.
4. Ajoute les variables d'environnement à l'hébergeur.
5. Exécute `pnpm check` avant chaque livraison.

Voir [docs/architecture.md](docs/architecture.md) pour les règles d'évolution.
