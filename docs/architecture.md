# Architecture

## Frontières

- `src/app/(frontend)` contient le site public.
- `src/app/(payload)` contient l'administration et les API Payload.
- `src/collections` contient le modèle de contenu et les règles d'accès.
- `src/payload.config.ts` assemble Payload, PostgreSQL et les collections.

Le frontend ne doit pas importer de composants de l'administration. Il peut utiliser la Local API de Payload depuis les Server Components.

## Principes

1. Ajouter uniquement les collections nécessaires au projet client.
2. Préférer les Server Components et limiter `use client` aux interactions réelles.
3. Garder les secrets côté serveur et ne jamais exposer `DATABASE_URL` ou `PAYLOAD_SECRET`.
4. Autoriser explicitement les lectures publiques collection par collection.
5. Créer une migration Payload pour chaque changement de schéma destiné à la production.
6. Une fonctionnalité n'est terminée que lorsque lint, typecheck et build passent.

## Évolutions prévues

Les formulaires, emails, analytics, recherche, authentification frontend et blocs de pages doivent rester optionnels. Aucun moteur e-commerce n'est prévu dans ce starter.
