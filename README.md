# App Graph Builder

A visual infrastructure dashboard built as a frontend take-home assignment. Displays service topology graphs (Postgres, Redis, MongoDB) as interactive node cards on a canvas, with app switching, node inspection, and resource configuration.

![App Graph Builder](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

---

## Live Demo

https://react-frontend-assignment-three.vercel.app/

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/faizan841/React-Frontend-Assignment.git
cd react-frontend-assignment
```

**2. Install dependencies**

```bash
npm install
```

**3. Initialize MSW service worker**

```bash
npx msw init public/ --save
```

**4. Start development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Script    | Command             | Description                         |
| --------- | ------------------- | ----------------------------------- |
| dev       | `npm run dev`       | Start local development server      |
| build     | `npm run build`     | Type-check and build for production |
| preview   | `npm run preview`   | Preview production build locally    |
| lint      | `npm run lint`      | Lint all TypeScript files           |
| typecheck | `npm run typecheck` | Run TypeScript type checking        |

---

## Tech Stack

| Library                   | Version    | Purpose                    |
| ------------------------- | ---------- | -------------------------- |
| React                     | 18         | UI framework               |
| TypeScript                | 5 (strict) | Type safety                |
| Vite                      | 5          | Build tool                 |
| ReactFlow (@xyflow/react) | Latest     | Interactive node canvas    |
| Zustand                   | Latest     | UI state management        |
| TanStack Query            | Latest     | Server state + caching     |
| MSW                       | Latest     | Mock API (no real backend) |
| shadcn/ui                 | Latest     | Component library          |
| Tailwind CSS              | 3          | Styling                    |

---

## Features

- **Interactive canvas** — drag nodes, zoom, pan, fit view
- **Node selection** — click to select, highlights node and opens inspector
- **Node deletion** — select a node and press `Delete` or `Backspace`
- **App switching** — switch between 5 apps, graph refetches automatically
- **Node inspector** — tabs (Config / Runtime), synced slider + numeric input, editable name and description
- **Status indicators** — Success (green) / Error (red) badges per node
- **Dark / Light theme** — toggle via Moon / Sun buttons in top bar
- **Fully responsive** — works from 320px to 1920px
  - Mobile: bottom sheet drawer, LeftRail hidden
  - Tablet: side drawer from right
  - Desktop: always-visible right panel
- **Loading states** — spinner while graph fetches
- **Error states** — retry button on fetch failure

---

## Project Structure

src/

├── components/

│ ├── canvas/

│ │ ├── AppCanvas.tsx # ReactFlow canvas wrapper

│ │ └── nodes/

│ │ └── ServiceNode.tsx # Custom ReactFlow node card

│ ├── inspector/

│ │ └── NodeInspector.tsx # Right panel node inspector

│ └── layout/

│ ├── LeftRail.tsx # Icon sidebar

│ ├── RightPanel.tsx # App list + inspector panel

│ └── TopBar.tsx # Header with app selector + theme toggle

├── hooks/

│ ├── useAppGraph.ts # TanStack Query — fetch graph by appId

│ └── useApps.ts # TanStack Query — fetch app list

├── mocks/

│ ├── browser.ts # MSW worker setup

│ ├── data.ts # Mock data (apps + graphs)

│ └── handlers.ts # MSW request handlers

├── store/

│ └── useAppStore.ts # Zustand store

├── types/

│ └── index.ts # All TypeScript interfaces

└── main.tsx # App entry point + MSW bootstrap

---

## Key Decisions

### MSW over setTimeout mocks

MSW intercepts fetch calls at the Service Worker level — this means the browser DevTools Network tab shows real-looking API requests. It also makes swapping in a real backend trivial: just remove the MSW worker bootstrap in `main.tsx` and point the fetch URLs at a real server. No other code changes needed.

### Zustand for UI state, TanStack Query for server state

These two never overlap. Zustand holds only ephemeral UI state (`selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab`). TanStack Query owns all fetched data with automatic caching — switching back to a previously loaded app shows instantly from cache without a refetch.

### ReactFlow node data as source of truth for inspector

The Node Inspector reads directly from ReactFlow's node state via `getNode(id)` rather than duplicating data into Zustand. When the slider or name input changes, it calls `setNodes()` to update the node data in place — this keeps the canvas card and the inspector panel always in sync without any extra state layer.

### TypeScript strict mode

`strict: true` plus `noUnusedLocals` and `noUnusedParameters` enforced throughout. The only `as unknown as` casts are at the ReactFlow boundary where generic node data types require explicit casting — this is a known ReactFlow typing limitation.

### Responsive layout strategy

- **Mobile (<768px):** LeftRail hidden, RightPanel becomes a bottom sheet (slides up from bottom, `70svh` height)
- **Tablet (768–1023px):** LeftRail visible, RightPanel is a side drawer from the right
- **Desktop (1024px+):** Full layout — LeftRail + Canvas + RightPanel always visible in a flex row

---

## Known Limitations

- **No real backend** — all data is hardcoded in `src/mocks/data.ts`. MSW simulates the API with 600–800ms artificial delay.
- **Node positions not persisted** — dragging nodes to new positions resets when you switch apps and come back.
- **No add-node UI** — the bonus "Add Node" feature was not implemented within the time constraint.
- **MSW console warning in production** — MSW is designed for development. In the Vercel deployment it still runs (since there's no real backend), which logs a service worker registration message in the browser console.
- **ReactFlow node data typing** — `@xyflow/react` uses a generic `Record<string, unknown>` for node data, requiring `as unknown as ServiceNodeData` casts at the boundary. This is a library-level constraint, not a design choice.
- **Theme not persisted** — dark/light theme preference resets on page refresh (not saved to localStorage).
- **Mobile keyboard** — on very small screens, opening the numeric input in the Node Inspector may cause the bottom sheet to resize due to the virtual keyboard appearing.

---

## Screenshots

### Desktop — Dark Mode

Canvas with service nodes, left rail, and right inspector panel visible.

### Mobile — Bottom Sheet

Full-screen canvas with bottom sheet drawer for app list and node inspector.

---

## Author

**Mohammad Faizan**
Frontend Developer
https://github.com/faizan841
