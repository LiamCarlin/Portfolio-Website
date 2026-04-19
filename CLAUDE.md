# Liam Carlin — Portfolio · CLAUDE.md

This file tells Claude Code exactly how the portfolio is structured so you can add, edit, or remove content by prompting naturally. Read this before touching any file.

---

## File structure

```
Mechanical_Engineering_PF/
├── index.html              ← homepage shell (HTML only, no content logic)
├── CLAUDE.md               ← this file
│
├── css/
│   └── styles.css          ← all shared styles (home + project pages)
│
├── js/
│   ├── data.js             ← ALL content: projects, experience, hobbies ← EDIT HERE
│   ├── home.js             ← homepage rendering logic (cards, archive, exp, hobbies)
│   ├── project.js          ← project detail page rendering logic
│   └── tweaks.js           ← appearance panel (persists to localStorage)
│
├── projects/
│   ├── _template.html      ← copy this to add a new project page
│   ├── baja.html           ← Olin Baja SAE
│   ├── cart.html           ← Electric Golf Push Cart
│   ├── fpv.html            ← FPV Drone
│   ├── tvc.html            ← TVC Rocket
│   ├── barbell.html        ← Barbell Clip
│   ├── hub.html            ← Baja Wheel Hub
│   ├── dpa.html            ← Digital Poker Assistant
│   ├── cyclone.html        ← Cyclone Battlebot
│   ├── stocks.html         ← Stock Analysis
│   └── burbles.html        ← TheBurbles Agency
│
└── assets/
    ├── portrait.jpg         ← hero portrait (3:4 ratio)
    ├── resume.pdf           ← résumé PDF
    ├── baja-hero.jpg        ← project hero images (16:9+)
    ├── baja-01.jpg          ← gallery images (4:3)
    └── ...                  ← see naming convention below
```

**The only files you need to edit for content changes are `js/data.js` and (for new projects) `projects/_template.html` → copied to `projects/<id>.html`.**

---

## How to add a new project

**Step 1 — Add data to `js/data.js`**

Open `js/data.js` and add a new object to the `PROJECTS` array (before the closing `]`):

```js
{
  id:        "my-project",          // URL slug — lowercase-hyphen, must be unique
  num:       "PR-011",              // next sequential number
  title:     "My Project Name",     // plain text (used in archive table + <title> tag)
  titleHtml: "My <em>Project</em>", // HTML for cards and detail page (italicise one word)
  cat:       "Mechanical Design",   // category shown in archive column
  role:      "Lead designer",       // your role
  year:      "2025",                // year or range e.g. "2024 — 2025"
  tools:     "Onshape · FEA · CNC", // dot-separated tool list
  tags:      ["CAD", "Fabrication"],// 2–4 chip labels on the card
  sum:       "One-sentence summary shown on the project card.",
  lede:      "Punchy subtitle at top of detail page.",
  heroLabel: "PROJECT · LABEL",     // overlay text on the media block (CAPS)
  heroImage: "",                    // path like "../assets/my-project-hero.jpg", or "" for placeholder
  featured:  true,                  // true = appears in Featured Works section on homepage
  feat:      false,                 // true = full-width card (use for one flagship project only)
  kpis: [                           // 4–6 spec rows under the hero on the detail page
    { k: "Metric", v: "Value" },
  ],
  body: [                           // sections on the detail page
    { h: "Section heading", t: "Paragraph text." },
  ],
  gallery: [],                      // image paths; leave [] for striped placeholders
                                    // e.g. ["../assets/my-project-01.jpg"]
},
```

**Step 2 — Create the project page**

Copy `projects/_template.html` to `projects/my-project.html` and change exactly two lines:
```html
<title>My Project Name · Liam Carlin</title>
...
<script>const PROJECT_ID = 'my-project';</script>
```

That's it — `project.js` reads the data and renders the full page automatically.

### Prompting examples
- *"Add a new project called 'Pneumatic Actuator Test Rig', 2025, mechanical design, sole designer, tools Onshape and LabVIEW. Featured. KPIs: Max pressure 120 PSI, Cycle rate 4 Hz, Material 6061 Al, Weight 2.1 kg."*
- *"Add a hero image to the Baja project: `../assets/baja-hero.jpg`"*
- *"Add three gallery images to the TVC project: tvc-01.jpg, tvc-02.jpg, tvc-03.jpg"*
- *"Write a full body section for the FPV project with sections Why, Design, and Build & tune."*

---

## How to edit an existing project

All project content is in `js/data.js`. Find the object with the matching `id` and edit any field. The project page re-renders from that data — no other files need changing.

---

## How to add an experience entry

In `js/data.js`, find the `EXPERIENCE` array. Each top-level object is a **group** (shown as a section header). Add a new item to an existing group, or add a new group object:

```js
{
  when:    "SUMMER 2026",
  role:    "Job Title",
  org:     "Company or Team",
  loc:     "City, ST",
  cats:    ["industry", "engineering"],  // subset of: engineering, industry, leadership, entrepreneurship
  rev:     "INT-03",                     // short reference tag displayed on the right side
  desc:    "One-paragraph description.",
  bullets: [
    "Accomplishment or responsibility.",
    "Another one.",
  ],
  stack: ["Skill", "Tool"],             // small chips below bullets
},
```

### Prompting example
- *"Add an experience entry: Mechanical Engineering Intern at Rivian, Summer 2026, Normal IL, engineering + industry."*

---

## How to edit the About section

The philosophy paragraph and capability grid are static HTML in `index.html`. Find `<section class="philo">` and edit the text directly.

---

## How to add a hobby

In `js/data.js`, find `HOBBIES` and add:

```js
{ t: "Hobby Name", em: "optional italic subtitle", d: "Short description.", meta: ["Left · value", "Right · value"] },
```

Cards repeat 4-per-row automatically.

---

## Image naming convention

```
assets/portrait.jpg            ← hero portrait (3:4 ratio)
assets/resume.pdf              ← résumé
assets/<id>-hero.jpg           ← project detail hero (wide, 16:9 or taller)
assets/<id>-01.jpg             ← gallery image 1 (4:3 ratio)
assets/<id>-02.jpg             ← gallery image 2
```

In `js/data.js`, paths for project pages must start with `../` since pages live inside `projects/`:
- `heroImage: "../assets/baja-hero.jpg"`
- `gallery: ["../assets/baja-01.jpg", "../assets/baja-02.jpg"]`

To activate the hero portrait, uncomment the block at the bottom of `js/home.js`:
```js
// const portrait = document.getElementById('hero-portrait');
// ...
```

---

## Quick text edits (index.html)

| What to change | Where in index.html |
|---|---|
| Availability status | `<span class="chip"><span class="dot"></span>Available · …` |
| Email / LinkedIn / GitHub / Resume | `<section class="contact">` near bottom |
| Spec card (hero right panel) | `<dl class="spec-list">` |
| Philosophy text | `<section class="philo">` → `.body` div |
| Revision date in meta strip | `.meta-strip` at top and `footer.titleblock` |

---

## Appearance tweaks

The **⊞ button** (bottom-right corner) opens a live panel. Choices persist to `localStorage` and carry across all pages.

| Control | Options |
|---|---|
| Grid    | Default / Dense / Off |
| Theme   | Paper (light) / Dark |
| Display | Newsreader (serif) / Grotesk (sans) |
| Accent  | Ink Blue / Oxide (red) / None |

To change the default values, edit `DEFAULTS` in `js/tweaks.js`.

---

## Deployment

Static files — no build step. Open `index.html` directly in any browser, or host on:

- **GitHub Pages**: push repo, enable Pages at Settings → Pages → `main` / root
- **Netlify / Vercel**: drag the folder into the dashboard, or connect the repo
- **Any static host**: upload everything preserving the folder structure

All internal links are relative, so the site works at any URL path.
