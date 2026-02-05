# Implementation Plan: Home Page with Team Scoreboard

**Branch**: `001-home-scoreboard` | **Date**: 2026-02-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-home-scoreboard/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the application's home page with a grid of 6 placeholder game cards (3 columns on desktop, 2 on tablet, 1 on mobile) displaying "coming soon" text. Implement a persistent team scoreboard for Blue Team and Red Team with scores stored in localStorage, visible across all pages via a header/status bar. Provide global score management methods (get, add, reset) accessible from React Context. Use Tailwind CSS for all styling with soft black/white minimalist design (avoiding pure colors for eye comfort) and Google Sans font. No server dependencies - fully static deployment.

## Technical Context

**Language/Version**: TypeScript 5+ with React 18+
**Build Tool**: Vite 5+
**Primary Dependencies**: React Router 6+ (for home page routing), Tailwind CSS 3+
**Storage**: localStorage for team scores persistence
**Testing**: Manual testing (no automated tests requested)
**Target Platform**: Modern browsers (Chrome 90+, Safari 14+, Firefox 88+), Mobile responsive (320px minimum width)
**Design System**: Soft black (#1A1A1A)/Soft white (#FAFAFA)/Grayscale only (no pure colors for eye comfort), Google Sans font via Google Fonts
**Performance Goals**: <3s initial load on 3G, 60fps rendering, <500KB initial bundle
**Constraints**: Static hosting only, client-side only, no server dependencies, no inline styles (Tailwind CSS enforced)
**Scale/Scope**: Foundation feature - home page UI + global score management infrastructure for future games

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| **Game-First Architecture** | Game/feature is self-contained module with clear entry/exit points | ✅ PASS |
| **Visual Consistency** | Design uses only black/white/grayscale + Google Sans | ✅ PASS |
| **Static-First Deployment** | No server-side dependencies, client-side only | ✅ PASS |
| **Component Reusability** | Shared components have TypeScript interfaces, independently testable | ✅ PASS |
| **Performance & Accessibility** | Targets <3s load, 60fps, WCAG AA compliance | ✅ PASS |
| **Styling Architecture** | No inline styles, uses shared components, CSS separation enforced | ✅ PASS |

**Constitution Compliance**: ✅ **PASS** - All principles satisfied

**Details**:
- **Game-First**: Home page is foundation infrastructure, score management isolated in `src/lib/`
- **Visual Consistency**: Spec explicitly requires black/white/grayscale palette (FR-015) and Google Sans (FR-016)
- **Static-First**: No server dependencies, localStorage only, static deployment confirmed
- **Component Reusability**: Shared components planned (GameCard, ScoreDisplay) with TypeScript interfaces
- **Performance & Accessibility**: Spec defines SC-001 (<3s load), SC-004 (60fps), SC-008 (keyboard/screen reader)
- **Styling Architecture**: Tailwind CSS locked, no inline styles permitted, shared component library planned

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# React + Vite Frontend (Party Games standard structure)
src/
├── components/          # Shared UI components
│   ├── GameCard.tsx    # Reusable game card with "coming soon" state
│   └── ScoreDisplay.tsx # Always-visible team scores header/bar
├── lib/                # Shared utilities
│   └── scoreManager.ts # Global score management (Context + localStorage)
├── pages/              # Page components
│   └── Home.tsx        # Home page with 6 game cards grid
├── App.tsx             # Root component with ScoreDisplay + routing
├── main.tsx            # Vite entry point
└── index.css           # Tailwind imports + Google Sans font

tailwind.config.js      # Tailwind theme (black/white/grayscale palette)
vite.config.ts          # Vite configuration
tsconfig.json           # TypeScript strict mode config
package.json            # Dependencies (React, Vite, Tailwind, React Router)

public/                 # Static assets
└── placeholder-game-icon.svg  # Generic icon for "coming soon" cards
```

**Structure Decision**: Foundation feature establishing core infrastructure. Using standard Party Games structure with `src/components/` for shared UI (GameCard, ScoreDisplay), `src/lib/` for score management logic, and `src/pages/` for page-level components. This is the first feature, so we're initializing the entire project structure including Vite + React + TypeScript + Tailwind CSS setup. No games folder yet - that comes with actual game features.

---

## Phase 0: Research

**Status**: ✅ COMPLETE

All technical unknowns resolved. See [research.md](research.md) for detailed decisions on:
- Vite + React + TypeScript + Tailwind CSS project setup
- localStorage persistence patterns with error handling
- React Context for global score management
- Tailwind theme configuration for soft black/white design (eye comfort)
- Google Sans font integration via Google Fonts CDN
- Responsive grid layout with Tailwind utilities
- ESLint configuration for inline style prevention
- Bundle size monitoring strategy
- Soft color palette (#1A1A1A/#FAFAFA) instead of pure values

**Key Decisions**:
1. Tailwind CSS locked as project-wide styling standard
2. React Context + custom hook for score management API
3. Fixed header placement for always-visible scores
4. 3-column/2-column/1-column responsive breakpoints
5. Graceful localStorage fallback to in-memory state
6. Soft black/white palette for eye comfort (no pure #000/#FFF)

---

## Phase 1: Design & Contracts

**Status**: ✅ COMPLETE

### Data Model

See [data-model.md](data-model.md) for complete entity definitions.

**Entities**:
1. **TeamScores**: `{ blue: number, red: number }` - Persistent score state
2. **GameCardData**: Metadata for 6 placeholder cards with "coming soon" status
3. **ScoreDisplayState**: UI state for score display header (always visible)

**Storage**: localStorage key `party-games-scores` with JSON format

### API Contracts

See [contracts/score-management-api.md](contracts/score-management-api.md) for complete API reference.

**Score Management API** (React Context):
- `getBlueScore(): number` - Retrieve Blue Team score
- `getRedScore(): number` - Retrieve Red Team score
- `addBlueScore(points: number): void` - Add points to Blue Team
- `addRedScore(points: number): void` - Add points to Red Team
- `resetScores(): void` - Reset both scores to 0 (home page only)
- `canReset: boolean` - Authorization flag for reset operation

### Developer Quickstart

See [quickstart.md](quickstart.md) for implementation guide.

**Project Structure Created**:
```
src/
├── components/
│   ├── GameCard.tsx
│   └── ScoreDisplay.tsx
├── lib/
│   └── scoreManager.tsx
├── pages/
│   └── Home.tsx
├── App.tsx
├── main.tsx
└── index.css

tailwind.config.js
vite.config.ts
package.json
```

---

## Constitution Re-Check (Post-Design)

*Re-evaluating all principles after Phase 1 design completion*

| Principle | Gate | Status |
|-----------|------|--------|
| **Game-First Architecture** | Game/feature is self-contained module with clear entry/exit points | ✅ PASS |
| **Visual Consistency** | Design uses only black/white/grayscale + Google Sans | ✅ PASS |
| **Static-First Deployment** | No server-side dependencies, client-side only | ✅ PASS |
| **Component Reusability** | Shared components have TypeScript interfaces, independently testable | ✅ PASS |
| **Performance & Accessibility** | Targets <3s load, 60fps, WCAG AA compliance | ✅ PASS |
| **Styling Architecture** | No inline styles, uses shared components, CSS separation enforced | ✅ PASS |

**Final Constitution Compliance**: ✅ **PASS** - All principles maintained through design phase

**Design Validation**:
- Components are reusable (GameCard, ScoreDisplay) with TypeScript props interfaces
- Tailwind CSS ensures no inline styles (ESLint rule configured)
- Score management encapsulated in `src/lib/` following separation of concerns
- No server dependencies, all localStorage-based persistence
- Responsive design via Tailwind breakpoints (mobile-first)
- Google Sans font loaded via CDN, soft black/white palette (#1A1A1A/#FAFAFA) in tailwind.config.js for eye comfort

---

## Planning Complete

**Status**: ✅ READY FOR TASK BREAKDOWN

All planning phases complete:
- ✅ Phase 0: Research (11 technical decisions documented)
- ✅ Phase 1: Design & Contracts (data model, API, quickstart guide)
- ✅ Constitution compliance verified (pre-design and post-design)
- ✅ Agent context updated (Copilot instructions file)

**Next Command**: `/speckit.tasks` to generate task breakdown

**Artifacts Generated**:
1. [plan.md](plan.md) - This file
2. [research.md](research.md) - 11 technical decisions with rationale
3. [data-model.md](data-model.md) - 3 entities with validation rules
4. [contracts/score-management-api.md](contracts/score-management-api.md) - Score management API contract
5. [quickstart.md](quickstart.md) - Developer implementation guide
6. `.github/agents/copilot-instructions.md` - Updated agent context
