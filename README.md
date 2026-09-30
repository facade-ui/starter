# Facade UI starter

A Next.js marketing site with one complete landing page, built from [Facade UI](https://facadeui.dev) sections. The sections are copied into `components/`, so there is no package to depend on: read them, change them, keep them.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffacade-ui%2Fstarter&project-name=my-site&repository-name=my-site)

## Start

```bash
npx create-next-app@latest my-site -e https://github.com/facade-ui/starter
cd my-site
npm run dev
```

Then:

1. Replace the copy in `content/sample.tsx`.
2. Edit `app/page.tsx` to add, remove or reorder sections.
3. Add more sections: `npx shadcn@latest add @facade/<name>`. See https://facadeui.dev/components.

## What is inside

- `app/page.tsx`: the `SaasLanding` template with sample content.
- `components/sections`, `components/templates`, `components/ui`: the Facade UI source, installed with the shadcn CLI.
- `styles/facade-tokens.css`: the design tokens, imported in `app/globals.css`. Override the shadcn colour variables below that import to change the theme, or generate one at https://facadeui.dev/docs/customise.
- `AGENTS.md`: notes for AI coding agents working in this repository.

Built with React 19, Next.js 16, Tailwind CSS v4 and Base UI. Every Facade section is tested against WCAG 2.2 AA.

## Licence

MIT.
