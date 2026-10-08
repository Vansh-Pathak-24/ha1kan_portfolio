// ─────────────────────────────────────────────────────────────────────────────
//  site.js  -  ALL the content of the site lives here.
//  Edit text, links and placeholders in this one file; no other file needs to change.
//  (Structure, routes and section ids stay in the components.)
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // ── identity ───────────────────────────────────────────────────────────────
  name: 'ha1kan', //            logo, preloader, giant footer wordmark
  title: 'ha1kan', //           browser tab title
  year: 2026,

  // ── contact ────────────────────────────────────────────────────────────────
  email: 'hello@ha1kan.dev', // big email on Contact + menu footer
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Twitter / X', href: 'https://x.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
  ],

  // ── navigation (menu). `key` = keyboard shortcut. `to` = route or /#section ──
  nav: [
    { label: 'Home', to: '/', key: 'h' },
    { label: 'Work', to: '/#work', key: 'w' },
    { label: 'Features', to: '/features', key: 'f' },
    { label: 'Contact', to: '/#contact', key: 'c' },
  ],
  menu: { open: 'Menu', close: 'Close' },

  // ── hero (landing) ─────────────────────────────────────────────────────────
  hero: {
    lines: ['I design & build', 'immersive digital', 'experiences.'], // one entry per line
    intro: 'Independent designer & developer. Interfaces that are minimal on purpose, with motion that earns its place.',
  },

  // ── about paragraph. Words listed in `highlight` get underlined ─────────────
  about: {
    text: "I'm ha1kan — a designer and developer who treats the browser as a stage. I keep interfaces minimal on purpose: design that cuts down to what matters, development in React, GSAP and WebGL, and motion with intent.",
    highlight: ['design', 'development', 'motion'],
  },

  // ── the giant sliding type band ────────────────────────────────────────────
  band: { words: ['Design', 'Build', 'Motion', 'WebGL'] },

  // ── selected work. Click a row to open it ──────────────────────────────────
  //  title / meta (small label) / year · desc (1-2 sentences) · skills (list)
  //  href (live site, opens in a new tab)
  work: {
    label: 'Selected work',
    items: [
      {
        title: 'Project One',
        meta: 'WebGL / Design',
        year: '2026',
        desc: 'An immersive launch site for a studio. Real-time type, a custom cursor and a scroll story built to feel physical.',
        skills: ['Art direction', 'React', 'GSAP', 'WebGL'],
        href: 'https://example.com',
      },
      {
        title: 'Project Two',
        meta: 'Creative dev',
        year: '2026',
        desc: 'An interactive product page where every section reacts to the pointer, kept fast and accessible.',
        skills: ['Interaction design', 'React', 'Lenis'],
        href: 'https://example.com',
      },
      {
        title: 'Project Three',
        meta: 'Brand / Web',
        year: '2025',
        desc: 'Identity and website for a small label. One typeface, two colours, strict grid.',
        skills: ['Identity', 'Typography', 'Front-end'],
        href: 'https://example.com',
      },
      {
        title: 'Project Four',
        meta: 'Experiment',
        year: '2025',
        desc: 'A motion study: ink, grids and hard type reacting to touch.',
        skills: ['Canvas', 'Motion', 'Prototyping'],
        href: 'https://example.com',
      },
    ],
  },

  // ── features page. Same row format as work. When a study has its own page,
  //    add  to: '/features/slug'  (and a <Route> in App.jsx) → "Open page" button ──
  features: {
    title: 'Features',
    intro: 'Small studies in interaction and motion. Open one to see what is in it.',
    items: [
      {
        title: 'Background parallax',
        meta: 'Scroll',
        year: 'Soon',
        desc: 'Layered backgrounds that drift at different speeds under the content, to give flat pages real depth.',
        skills: ['GSAP', 'ScrollTrigger', 'Lenis'],
      },
      {
        title: 'Cursor warp',
        meta: 'Interaction',
        year: 'Soon',
        desc: 'A lens that bends the page under the pointer: an SVG displacement filter first, a WebGL shader next.',
        skills: ['SVG filters', 'WebGL', 'GLSL'],
      },
      {
        title: 'Text reveal',
        meta: 'Type',
        year: 'Soon',
        desc: 'Line-by-line and letter-by-letter type reveals, driven by scroll or by time.',
        skills: ['GSAP', 'Split text', 'Easing'],
      },
      {
        title: 'Page transition',
        meta: 'Routing',
        year: 'Soon',
        desc: 'Route changes covered by hard black bars while the old page tilts away and the next one unfolds.',
        skills: ['React Router', 'GSAP', 'Perspective'],
      },
    ],
    back: { title: 'Back home', label: 'Home', meta: 'Landing', cursor: 'Go' }, // last row
  },

  // ── small labels used around the site ──────────────────────────────────────
  contact: {
    label: 'Contact',
    prompt: 'Have a project or an idea? Send me an email.', // set to '' to hide
    cursor: 'Write', //                                    label inside the cursor ring
  },

  // ── landing-page sections the scroll navigation follows (ids live in the components)
  sections: [
    { id: 'top', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ],
  footer: { left: '© 2026' },
  labels: {
    view: 'View', //           cursor label over a closed row
    close: 'Close', //         cursor label over an open row
    visit: 'Visit site', //    button inside an open work row
    open: 'Open page', //      button when a feature has its own page
    inProgress: 'In progress', // shown when a feature has no page yet
    next: 'Next', //           scroll-navigation button
    top: 'Top', //             ...on the last section
  },
}
