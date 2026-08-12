# APM Relocation — Website (React)

A full multi-page React website for **APM Relocation Packers & Movers**, built from the
brochure content and reference design, in a yellow / white / charcoal colour system with
motion throughout (Framer Motion) and a fully structured, componentised codebase —
every component and page has its own `.jsx` and its own `.css` file.

## Tech Stack
- React 19 + Vite
- React Router (multi-page navigation: Home, About, Services, Branches, Gallery, Contact)
- Framer Motion (scroll reveals, animated counters, page transitions, the signature
  "animated route path" element)
- lucide-react (icons)

## Folder Structure
```
src/
  components/        Reusable UI pieces, each in its own folder with matching .css
    Navbar/
    Footer/
    ServiceCard/ BranchCard/ GalleryGrid/ Testimonials/
    Stats/ AnimatedCounter/ RoutePath/ (signature element) PageHero/
    WhatsAppButton/ ScrollToTop/ PageTransition/
  pages/             One folder per route, each with its own .jsx + .css
    Home/ About/ Services/ Branches/ Gallery/ Contact/
  data/
    content.js       All copy & structured content (services, branches, cities,
                      testimonials, stats, journey/timeline) in one place — edit
                      this file to update site content without touching components.
  App.jsx            Routes + shared layout (Navbar, Footer, WhatsApp button)
  main.jsx           App entry point
  index.css          Design tokens (CSS variables), resets, shared button classes
```

## Getting Started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Editing Content
Almost everything text-based (company info, services, cities, branches, testimonials,
stats, timeline) lives in `src/data/content.js`. Update it there and it flows through
every page automatically.

## Design Notes
- Colours, fonts and spacing are defined as CSS variables in `src/index.css`
  (`--yellow`, `--ink`, `--cream`, `--clay`, etc.) — change them once, they apply
  everywhere.
- The "route path" (dashed line with a travelling truck) is the site's signature
  motif, used on the homepage process section and at the top of every inner page —
  see `src/components/RoutePath`.
- All images/photos are represented with icon-based visual placeholders (gradients +
  lucide icons) instead of stock photography, so the whole thing is dependency-free
  and safe to deploy anywhere without licensing concerns. Swap them for real photos
  by dropping files into `src/assets` and replacing the relevant visual block.

## Deploying
`npm run build` outputs a static site in `dist/` — deploy it to Vercel, Netlify,
GitHub Pages, or any static host.
