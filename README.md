# Mohamed Benzarti — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run typecheck
```

## Before going live

1. **Site URL:** set `NEXT_PUBLIC_SITE_URL` (e.g. `https://mohamedbenzarti.dev`). On Vercel it falls back to the
   project's production domain automatically, so this is only required for a custom domain or another host.
   Contact details live in [`src/config/site.ts`](src/config/site.ts).
   While a value still contains a placeholder (`example.com`, `your-profile`, `your-username`, `your-domain`),
   it is shown as plain text with a "Placeholder" tag instead of a link, so nothing ships broken.
2. **Contact form delivery (Formspree):**
   1. Create a free account at [formspree.io](https://formspree.io) and a new form; confirm your email address.
   2. Copy the form ID (the part after `/f/` in the endpoint, e.g. `https://formspree.io/f/xyzabcd` → `xyzabcd`).
   3. Create `.env.local` with `FORMSPREE_FORM_ID=xyzabcd` (see [`.env.example`](.env.example)), and add the same variable on your hosting provider.
   - Messages are validated server-side, then emailed to you by Formspree; replying answers the visitor directly.
   - In development without the variable, messages are printed to the terminal.
   - In production without it, the form shows a clear error asking visitors to use email instead.
3. **Project links:** add `links.live` / `links.github` in [`src/data/projects.ts`](src/data/projects.ts).
   The GitHub and Live buttons only appear when a URL is set.

## Editing content

| What | File |
| --- | --- |
| Name, role, contact, domain | `src/config/site.ts` |
| Projects (and the template for project 03) | `src/data/projects.ts` |
| Skills and experience levels | `src/data/skills.ts` |
| About strengths, services, education timeline | `src/data/content.ts` |

### Adding a project

Copy the commented template at the bottom of `src/data/projects.ts` into the `projects` array.
That creates its homepage showcase and its case-study page at `/projects/<slug>`.
The "open slot" panel disappears automatically once there are 3 projects (`SHOWCASE_SLOTS`).

For a real screenshot, put the image in `public/projects/` and use
`cover: { kind: "image", src: "/projects/your-image.png", alt: "…" }` (16:10 works best).

## Structure

```
src/
  app/                 routes, metadata, OG image, sitemap, robots, contact API
  components/
    layout/            Header (nav, mobile menu, scroll progress), Footer
    sections/          Hero, About, Skills, Projects, Services, Journey, Contact
    projects/          Showcase, illustrated covers, open slot, links
    contact/           Form (validation + states), contact channels
    hero/              SignalField canvas visual
    ui/                Reveal, ButtonLink, SectionHeading, Em, icons, clock
  config/site.ts       global configuration
  data/                all editable content
  lib/                 shared validation and helpers
```

## Notes

- All animation respects `prefers-reduced-motion`. The hero canvas renders a single still frame and pauses when off-screen.
- Fonts (Bricolage Grotesque, Inter, Instrument Serif, JetBrains Mono) are self-hosted at build time by `next/font`.
