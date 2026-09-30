# Notes for coding agents

This is a marketing site built with [Facade UI](https://facadeui.dev): sections and page templates installed with the shadcn CLI. The source of every section is in `components/`, and it is yours to edit.

- `app/page.tsx` renders the `SaasLanding` template with the content in `content/sample.tsx`. Replace the content first; change the sections second.
- Add a section: `npx shadcn@latest add @facade/<name>` (search with `npx shadcn@latest search @facade -q <word>`; read `https://facadeui.dev/components/<name>.md` before using it).
- Keep one `h1` per page. Heroes default to `headingLevel={1}`, other sections to `2`.
- Sections import nothing from `next/*`: pass `link={Link}` and `image={Image}`.
- Icons come from `lucide-react`. A page that passes icons to a template or a `-motion` section must be a client component.
- `styles/facade-tokens.css` is imported in `app/globals.css` and must stay. Change colours by overriding the shadcn variables below that import, or generate a theme at https://facadeui.dev/docs/customise.
- The full guide for agents: https://facadeui.dev/docs/agents.
