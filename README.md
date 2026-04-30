# Trip Companion

A live trip companion app for a 56-day Sydney → Sydney trip.
Single-page React app with four views: Timeline, Travel, Map, and Plans.
All progress (ticked boxes, theme) saves to `localStorage` per device.

## Tech stack

- Vite + React 18
- Tailwind CSS 3 (class-based dark mode)
- lucide-react icons
- Geist + Instrument Serif (Google Fonts)
- No backend — all data is hard-coded in `src/App.jsx`

---

## Run it locally

You need [Node.js](https://nodejs.org) 18 or later installed.

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (hot reload at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

The `npm run build` command outputs everything to a `dist/` folder. That's
the folder that gets deployed.

---

## Deploy to Vercel

There are two ways. Pick whichever feels easier.

### Option A — GitHub + Vercel dashboard (recommended)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in (you can use your
   GitHub account).
3. Click **Add New → Project**.
4. Import the repository. Vercel will auto-detect Vite — leave all the
   default settings as they are:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click **Deploy**. First deploy takes ~30 seconds.

You get a free `*.vercel.app` URL. Every git push to `main` will trigger
an auto-deploy.

### Option B — Vercel CLI

```bash
# Install the CLI once
npm install -g vercel

# In this folder, run:
vercel

# It will ask a few questions (project name, scope). Defaults are fine.
# First run links the project; subsequent runs deploy a new version.

# To deploy straight to production:
vercel --prod
```

---

## Other hosting options

The build output (`dist/`) is plain static HTML/JS/CSS — it works on
anything that serves static files:

- **Netlify** — drag-and-drop the `dist/` folder onto netlify.com
- **Cloudflare Pages** — same flow as Vercel, framework auto-detected
- **GitHub Pages** — push the `dist/` folder to a `gh-pages` branch
- **Your own server / S3 / etc.** — copy `dist/` contents to web root

---

## Customising the trip data

Everything is in **`src/App.jsx`**. The data lives at the top of the file:

| What | Where to edit |
| --- | --- |
| Cities, dates, accommodation, addresses | `STOPS` array (around line 35) |
| Flights, trains, buses, terminals, addresses | `TRANSPORT` object (around line 280) |
| City day-plans (Rio etc.) | `DAY_PLANS` object (around line 525) |
| Day-of travel checklist items | `TRAVEL_CHECKLIST` array (around line 1715) |
| Long-haul extras | `LONGHAUL_EXTRAS` array (around line 1725) |

The dev server (`npm run dev`) hot-reloads on save, so you can edit, save,
and see changes immediately.

---

## Storage

Tick states, theme, and notes save to `window.localStorage` under the key
`trip:state`. This is per-device and per-browser. To reset:

```js
// In your browser dev tools console:
localStorage.removeItem("trip:state");
```

If you and Luke both want to use the app, each of you opens it on your own
device — each has its own ticks. There's no sync between you (would need a
backend for that, e.g. Supabase or Firebase).

---

## Credits

Built with Claude. Trip data: Ethan Sanders' big 2026 trip. Designed
shadcn-minimal with Geist sans-serif and Instrument Serif italic display
type.
