# Implementation Plan: Ai là gián điệp (Who is the Spy)

**Branch**: `001-ai-la-gian-diep` | **Date**: 2026-02-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ai-la-gian-diep/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement the "Ai là gián điệp" (Who is the Spy) party game where players are secretly assigned roles (Civilian vs Spy) and keywords. The implementation uses a local pass-and-play mechanic with a specialized UI that hides standard scoring elements. Key features include dynamic player count setup, random role assignment using `data/ai-la-gian-diep.json`, and a guided turn-based flow.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the specific game/feature. The structure here reflects Party Games standards.
-->

**Language/Version**: TypeScript 5.9+ with React 19.2+
**Build Tool**: Vite 7.2+
**Primary Dependencies**: `react-router-dom`, `lucide-react`, Tailwind CSS
**Storage**: In-memory state for active game session (no persistence required across reloads for MVP)
**Testing**: Manual verification as per project standard
**Target Platform**: Modern mobile and desktop browsers
**Design System**: Black/white minimalist, Google Sans font, Tailwind tokens
**Performance Goals**: <3s initial load, 60fps animations
**Constraints**: Client-side only, no backend
**Scale/Scope**: New game module `src/games/ai-la-gian-diep` + `App.tsx` routing update

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| **Game-First Architecture** | Game/feature is self-contained module with clear entry/exit points | ✅ |
| **Visual Consistency** | Design uses only black/white/grayscale + Google Sans | ✅ |
| **Static-First Deployment** | No server-side dependencies, client-side only | ✅ |
| **Component Reusability** | Shared components have TypeScript interfaces, independently testable | ✅ |
| **Performance & Accessibility** | Targets <3s load, 60fps, WCAG AA compliance | ✅ |
| **Styling Architecture** | No inline styles, uses shared components, CSS separation enforced | ✅ |

**Constitution Compliance**: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-la-gian-diep/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., games/tic-tac-toe, components/Button). The delivered plan must
  not include Option labels.
-->

```text
# React + Vite Frontend (Party Games standard structure)
src/
├── games/
│   └── ai-la-gian-diep/    # New Game Module
│       ├── AiLaGianDiep.tsx    # Main game container
│       ├── SetupScreen.tsx     # Player count input
│       ├── RoleRevealScreen.tsx # Pass & Play logic
│       ├── GameContext.tsx     # Game state management
│       ├── types.ts            # Game-specific types
│       └── utils.ts            # Role randomization logic
├── App.tsx             # Routing update
├── components/         # Shared UI components
│   └── ScoreDisplay.tsx # Checked for conditional rendering
└── data/
    └── ai-la-gian-diep.json # Game data source
```

**Structure Decision**: Standard module structure within `src/games/`. Logic separated into `utils.ts` and `GameContext.tsx` for cleaner UI components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
