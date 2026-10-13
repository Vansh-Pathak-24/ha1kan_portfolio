
export const site = {
  name: 'ha1kan',
  title: 'ha1kan',
  year: 2026,

  email: 'hello@ha1kan.dev',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Twitter / X', href: 'https://x.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
  ],

  nav: [
    { label: 'Home', to: '/', key: 'h' },
    { label: 'Work', to: '/#work', key: 'w' },
    { label: 'Contact', to: '/#contact', key: 'c' },
  ],
  menu: { open: 'Menu', close: 'Close' },

  hero: {
    lines: ['I design & build', 'immersive digital', 'experiences.'],
    intro: 'Independent designer & developer. Interfaces that are minimal on purpose, with motion that earns its place.',
  },

  about: {
    text: "I'm ha1kan — a designer and developer who treats the browser as a stage. I keep interfaces minimal on purpose: design that cuts down to what matters, development in React, GSAP and WebGL, and motion with intent.",
    highlight: ['design', 'development', 'motion'],
  },

  band: { words: ['Design', 'Build', 'Motion', 'WebGL'] },

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
    ],
  },

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
    back: { title: 'Back home', label: 'Home', meta: 'Landing', cursor: 'Go' },
  },

  contact: {
    label: 'Contact',
    prompt: 'Have a project or an idea? Send me an email.',
    cursor: 'Write',
  },

  sections: [
    { id: 'top', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ],
  footer: { left: '© 2026' },
  labels: {
    view: 'View',
    close: 'Close',
    visit: 'Visit site',
    open: 'Open page',
    inProgress: 'In progress',
    top: 'Top',
  },
}
