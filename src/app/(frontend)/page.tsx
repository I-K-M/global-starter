import Link from 'next/link'

const features = [
  ['Frontend moderne', 'Next.js App Router, React Server Components, TypeScript strict et Tailwind CSS.'],
  ['CMS intégré', 'Payload fournit l’administration, les médias, les pages, le blog et les brouillons.'],
  ['PostgreSQL prêt', 'Base locale avec Docker et adaptateur officiel Payload basé sur Drizzle.'],
  ['Livraison contrôlée', 'Lint, typecheck et build sont regroupés dans une commande et exécutés en CI.'],
]

export default function Home() {
  return (
    <main>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-semibold tracking-tight">Global Starter</span>
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-950" href="/admin">Payload Admin</Link>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Agency foundation</p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
            Un socle simple pour construire des sites solides.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Duplique le dépôt, configure le contenu dans Payload et conserve une architecture prévisible d’un projet client à l’autre.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="/admin">Ouvrir le CMS</Link>
            <a className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800" href="https://github.com/I-K-M/global-starter">Voir le dépôt</a>
          </div>
        </div>
      </section>
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          {features.map(([title, description]) => (
            <article className="border-l-2 border-blue-600 py-3 pl-5" key={title}>
              <h2 className="font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 max-w-md leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
