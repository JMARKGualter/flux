# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"3D Electronics Workbench" (electrop3dia.trioe.dev) — a Next.js App Router site that lets students explore ~52 electronic components as interactive 3D GLB models with per-part tooltips, guides, part info, and trivia. Stack: Next.js 16 / React 19, react-three-fiber + drei + three, Tailwind CSS 4. There are no tests.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # static export (next.config uses output: 'export')
npm run lint     # eslint
```

The app is a **static export** (`output: 'export'`, unoptimized images) — no server-side features (API routes, SSR-only APIs) can be added.

## Architecture

Three routes; the first two are only a viewport switch between a desktop and a mobile component (window resize listener, no SSR of the real UI — everything is `'use client'`):

- `src/app/page.tsx` → `components/home/Home.tsx` / `HomeMob.tsx` (breakpoint 768px) — landing page
- `src/app/learn/page.tsx` → `components/learn/MainPage.tsx` / `MainPageMob.tsx` (breakpoint 1024px) — the 3D workbench
- `src/app/simulate/page.tsx` → `components/simulate/SimWorkbench.tsx` (dynamic import, `ssr: false`) — 3D circuit simulation workbench. Place any registry component (drag on a snap grid), wire terminals in Wire mode, and Run a DC solve: `lib/sim/solver.ts` does nodal analysis with Norton stamps (batteries/resistors/LEDs/switches/buzzer/bulb — the simulatable subset is `SIM_SPECS` in `lib/sim/types.ts`; other components are placeable scenery). Layout persists to localStorage. Terminal port positions are a fixed local offset (`PORT_OFFSET_X` in `SimScene.tsx`) used by both the port meshes and the wire endpoint math — keep them in sync.
- `src/app/learn/vr/page.tsx` → `components/vr/VRExperience.tsx` (dynamic import, `ssr: false`) — WebXR workbench using `@react-three/xr` + `@react-three/uikit` + `@react-three/handle`. In-VR panels (`components/vr/panels/`) reuse the same URL-keyed lookup functions and `meshTooltips` as the 2D learn page; models come from `modelRegistry` and are bounding-box-normalized (1 unit = 1 meter in VR). The Canvas uses `events={noEvents}` + `<PointerEvents />` from `@react-three/xr` so mouse and controller-ray events share one code path. Grab/pinch interactions (`Handle`/`HandleTarget`) are rendered only inside an XR session — on desktop, OrbitControls owns the pointer instead. Panel text must go through `sanitizeVRText()` (`panels/theme.ts`): the uikit MSDF font lacks `−`/`±`/emoji glyphs.

**Desktop/mobile duplication is deliberate and pervasive**: `MainPage.tsx` and `MainPageMob.tsx` (and the home equivalents) are parallel implementations, not shared. A feature change to the learn page usually needs to be made in both files.

### The learn page data flow

`MainPage` owns `selectedModel` ({url, camera position, target, scale}). The sidebar renders nine category components from `components/learn/categories/` (breadboard, display, general, input, microcontroller, motor, output, power, powercontrol); each holds **its own hardcoded model config** (GLB url + tuned camera POV) and calls `onModelSelect(url, position, target, scale)`.

Everything downstream keys off the **model's GLB URL string**, matched with `url.includes(...)` heuristics:

- `ComponentGuideContainer` → `componentGuides.getGuideByUrl(url)` from `lib/constants/componentGuides.ts`
- `PartInfoDisplay` → `getPartInfoForComponent(url)` from `lib/constants/partInfo.ts`
- `TriviaDisplay` → `getTriviaForComponent(url)` from `lib/constants/trivia.ts`

Hover tooltips work differently: `ComponentModel` (defined inside `MainPage.tsx`/`MainPageMob.tsx`) raycasts the scene and looks up the hit **mesh name** in `meshTooltips` from `lib/constants/tooltips.ts`. Mesh names come from the GLB files themselves (e.g. `Cube010_1`, `LEDAnode`); hovering logs the name to the console, which is how new tooltips get authored.

### Adding a new component model

The model config is duplicated in several registries that must be kept in sync manually:

1. Put the GLB in `public/models/<category>/`
2. Add it to the category file in `components/learn/categories/<category>.tsx` (desktop sidebar, with camera POV) — check the mobile page's model list too
3. Add it to `modelRegistry` in `lib/3d/ModelLibrary.tsx` (used for preloading via `useGLTF.preload` in `app/layout.tsx` and by `ModelContext`)
4. Optionally add to `lib/constants/models.ts` (a third, partially-overlapping config table)
5. Add content keyed by URL substring: guide (`componentGuides.ts`), part info (`partInfo.ts`), trivia (`trivia.ts`), and mesh-name tooltips (`tooltips.ts`)

Beware near-duplicate filenames with typos (e.g. `LCD16x2_12C.glb` vs `LCD16x2_I2C.glb` appear in different registries) — verify the actual filename in `public/models/` before referencing it.

### Other conventions

- Path alias `@/*` → `src/*`
- Theming is a boolean `isDark` from `ThemeContext` (`src/contexts/ThemeContext.tsx`), persisted to localStorage and passed down as a prop; components branch on it with conditional Tailwind class strings rather than Tailwind's `dark:` variant
- Draco decoding is configured globally in the learn pages via `useGLTF.setDecoderPath` (Google CDN)
- `src/hooks/useTheme.ts` and `components/learn/ComponentModel.tsx` are empty files; the real `useTheme` lives in `ThemeContext.tsx` and `ComponentModel` is defined inline in the MainPage files
