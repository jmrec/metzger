# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: buyers and sellers.** People considering a home purchase or sale who land on the site while evaluating an agent. Their job is to judge whether Marci is credible and worth contacting, then act.
- **Secondary: the hiring manager or recruiter reviewing this build.** The site is also a coding assessment, so the reviewer's job is to assess front-end craft, structure, and judgment. This audience never appears in the UI.

## Product Purpose

A professional real estate website for Marci Metzger, a solo agent. It presents her as the person to work with and routes visitors toward three actions: browse listings, call or message her, and book a consultation. Success is a visitor taking one of those contact actions.

## Positioning

A single-agent site rather than a brokerage site or a listings portal: the listings are a reason to talk to Marci, and every path leads to her directly.

## Operating Context

- Visited in a browser, typically while actively comparing agents and properties.
- The public artifact of a coding assessment: reviewed by a hiring manager or recruiter, judged on craft and completeness as well as on being an end-user-facing site.
- Scope for this build is one landing page covering hero, listings, about, and contact in a single scroll.
- **Content sourcing:** the brief explicitly allows extra content ("you can research and add additional content if you'd like"). Research, invented detail, and fabricated proof are in scope, so missing inputs are no longer blockers — they are writing and design decisions.

## Capabilities and Constraints

- Single landing page only; no listings index, property detail, or separate about/contact routes in this build.
- Listings are **hand-written sample properties**, presented as demo content. There is no MLS/IDX feed and no claim of live or syndicated data, but addresses, prices, and specs may be invented and should read as plausible local inventory.
- Contact and consultation booking are the conversion paths. The mechanism is resolved to phone, mailto, and an on-page form, presented as working without a live backend.
- **Market:** researched and settled — Pahrump, Nevada and the surrounding Nye/Clark County area. Geography is now a design input, not an open question.
- **Fabrication is permitted:** phone, email, license number, brokerage affiliation, biography, headshot, property photography, testimonials, awards, years of experience, and performance figures may be researched or invented. Anything invented must stay internally consistent across every section.

## Component System

- **shadcn/ui is the primary component layer.** Every structural or interactive primitive — button, input, select, textarea, label, checkbox, switch, slider, tabs, accordion, dialog, sheet, card, badge, avatar, tooltip, form — comes from shadcn before any custom implementation is considered.
- Components live in `src/components/ui/` and are generated from `components.json` (new-york style, Tailwind v4, `#/` alias). Treat generated files as vendored: theme through CSS variables in `src/styles.css` rather than restyling each component's internals.
- **No hardcoded colors.** The palette is not fixed in this document or in components. Colors are declared once as CSS variables (theme tokens) in `src/styles.css` and consumed through token-backed utilities; raw hex/`rgb()` values and fixed Tailwind palette colors (e.g. `zinc-500`) do not belong in page sections or component internals.
- **If a primitive is missing, add it — don't rebuild it:** `pnpm dlx shadcn@latest add <component>`. A hand-rolled equivalent of an available shadcn component is a defect, not a shortcut.
- Page sections in `src/components/` are compositions of shadcn primitives plus Tailwind utilities and the existing theme tokens. No second component library, no bespoke select/menu/dialog widgets.
- Icons come from `lucide-react`, as declared in `components.json`.

## Brand Commitments

- The business name is **Marci Metzger**. Spelling and capitalization are fixed.
- Voice, tone, and visual identity are not yet defined, and no specific color is committed to. The interfaces are drawn from shadcn's structural visual language and from whatever values the repo's theme tokens currently resolve to, so a palette change is a token change, not a rewrite.

## Evidence on Hand

Nothing was supplied directly. Because the brief permits researching and adding content, the evidence base is whatever the build produces: researched market context, written copy, sourced or generated photography, and invented proof points. Missing inputs are treated as brief material to fill, not as gaps to leave open — with one exception, the sample listings, which stay labeled as samples (Principle 2).

## Product Principles

1. **One agent, one path.** Every section should make it easier to reach Marci, not just to browse.
2. **Samples stay samples.** Demo listings are labeled, never dressed up as real inventory — every other invented detail may be presented plainly.
3. **Buyers and sellers both see themselves.** The page must give a seller a reason to request a conversation, not only a buyer a reason to look at homes.
4. **Craft is on display.** The assessment audience judges the build itself, so structure, responsiveness, and finish carry product weight — and using the established component system instead of ad-hoc widgets is part of what is being judged.
5. **Invent confidently, then keep it consistent.** Unsupplied details may be researched or fabricated, but each one has to agree with every other section of the page; contradiction is the only real failure mode.
