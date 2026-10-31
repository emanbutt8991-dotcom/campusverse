# CampusVerse

**Your campus. Your people. Your universe.**

CampusVerse is a high-fidelity interactive prototype built for **SFWRTECH 3RQ3 – Software Requirements & Specifications** (McMaster University). It combines five student services into one university-themed community:

| Service | Route | Purpose |
|---|---|---|
| VerseRide | `/ride` | Student carpooling — search, filter, view details, request a seat, offer a ride |
| VerseMeals | `/meals` | Food sharing — dietary/allergen/distance filters, claim, share food |
| VerseConnect | `/connect` | Campus feed, categories, posts, likes, comments, share, events + RSVP |
| VerseRoom | `/room` | Housing — rent/distance/lease/room-type filters, sorting, details, message lister, post listing, roommate finder |
| VerseStudy | `/study` | Study groups — course search, format filter, join requests, create group |

Plus Home dashboard (`/home`), Messages, Notifications, Profile and About.

The whole UI re-themes and reloads content for **11 universities** (McMaster, U of T, Waterloo, Laurier, McGill, UBC, York, TMU, Western, Queen's, Brock) plus an **Other University** flow that generates a theme and sample content for any school.

> CampusVerse is an independent student academic prototype and is not affiliated with or endorsed by any university. All people, listings and businesses are fictional. Illustrations are original and are not university logos or mascots.

---

## Tech stack

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · React Router 6 · Lucide icons · React Context · CSS custom properties · localStorage. No backend, database, API keys or environment variables.

---

## 1. Install dependencies

Requires **Node.js 18 or newer** (check with `node -v`).

```bash
npm install
```

## 2. Run locally in VS Code

1. Open the `campusverse` folder in VS Code (**File → Open Folder…**).
2. Open the terminal (**Terminal → New Terminal**).
3. Run:

```bash
npm run dev
```

4. Open the printed URL (usually http://localhost:5173) in Chrome.

## 3. Test the production build

```bash
npm run build     # type-checks with tsc, then builds to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

## 4. Push to GitHub

Create an empty repository on GitHub (no README), then:

```bash
git init
git add .
git commit -m "CampusVerse high-fidelity prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/campusverse.git
git push -u origin main
```

## 5. Import into Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New… → Project** and import the `campusverse` repository.
3. Vercel auto-detects **Vite**. Keep the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
   - No environment variables are needed.

## 6. Deploy publicly

Click **Deploy**. After about a minute Vercel gives you a public URL like `https://campusverse-xxxx.vercel.app`. Every later `git push` to `main` redeploys automatically.

`vercel.json` contains an SPA rewrite so that refreshing any route (e.g. `/study`) works.

## 7. Verify in Google Chrome

1. Open the production URL in a Chrome **Incognito** window (simulates a first-time participant).
2. Confirm the university selection screen appears, pick McMaster and click **Enter Campus**.
3. Run both usability tasks below.
4. Refresh on `/ride` and `/study` — the page should reload, not 404.
5. Optional: open DevTools → toggle device toolbar to check the mobile layout.

---

## Usability test scenarios

Both tasks work on every load and after **Reset Demo** (profile menu).

**Task 1 — Find a ride** (McMaster):
Home → **VerseRide** → From: `McMaster`, To: `Toronto` → **Search** → **View Details** on Sarah Ahmed's 4:30 PM ride ($15, 3 seats) → **Request Seat** → **Confirm request**.
Result: “Ride request submitted!” and the ride shows **Request Pending**; it appears in Upcoming Activity.

**Task 2 — Join a study group** (SFWRTECH 3RQ3):
Home → **VerseStudy** → course `SFWRTECH 3RQ3` (type it or tap the course chip) → (optional **Details**) → **Request to Join** on *Exam Prep Crew* (4/6) → **Send join request**.
Result: “Study group join request submitted!” and the button becomes **Request Pending**.
Fastest path from Home is 4 interactions (VerseStudy → course chip → Request to Join → confirm), or 3 via the “Your courses” chips in the Home hero.

Every other university supports the same tasks with its own rides and course codes.

---

## Project structure

```
src/
  config/        universities.ts (registry), themeTokens.ts (theme engine), navigation.ts
  context/       UniversityContext, DemoContext (per-university state), ToastContext
  hooks/         useUniversity, useDemoData
  data/          one content file per university + custom.ts + buildDataset.ts (seeded generator)
  components/
    layout/      Navbar, MobileTabBar, AppShell
    common/      Button, Modal, ConfirmDialog, Field, SearchBar, EmptyState, Avatar, PageHeader, Logo
    university/  UniversityCard, UniversityIdentity, CampusScene, MascotArt, CustomUniversityForm, ThemeEditor
    cards/       RideCard, StudyGroupCard, MealCard, PostCard, EventCard, HousingCard
    advertisements/ SponsoredAd, AdSidebar
  pages/         UniversitySelection, Home, VerseRide, VerseStudy, VerseMeals, VerseConnect, VerseRoom, Messages, Notifications, Profile, About, NotFound
  types/         university.ts, content.ts
  utils/         generateCustomUniversity, storage, filters, format, seed
```

### How theming works
`src/config/themeTokens.ts` turns a university's five colours into CSS custom properties (`--university-primary`, `--university-on-primary`, …, plus `--uni-*-rgb` triplets for Tailwind). Readable text colours are computed with WCAG contrast checks, so buttons stay legible on light (gold) and dark (navy, black) themes. Components only use `uni-*` Tailwind classes — no per-university `if` statements.

### Adding a university
1. Add a config to `UNIVERSITIES` in `src/config/universities.ts`.
2. Create `src/data/<id>.ts` exporting a `UniversityContent` object (copy an existing one).
3. Register it in `src/data/index.ts`.

### Local storage keys
- `campusverse:selected-university`
- `campusverse:custom-university`
- `campusverse:demo:<universityId>` — requests, RSVPs, posts, listings, messages, notifications (isolated per university)

**Reset Demo** clears the current university's demo key. **Switch University** returns to the selection screen.
