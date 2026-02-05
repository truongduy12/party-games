<!--
Sync Impact Report - Constitution v1.1.2
========================================
Version change: 1.1.1 → 1.1.2
Rationale: Refined color palette to soft black/white for eye comfort (UX improvement)

Modified principles:
  - II. Visual Consistency - Changed from pure #000/#FFF to soft #1A1A1A/#FAFAFA
  - Added explicit note: "pure #000/#FFF forbidden for eye comfort"

Added sections: None
Removed sections: None

Templates requiring updates:
  ✅ plan-template.md - no changes needed (uses placeholder values)
  ✅ spec-template.md - no changes needed
  ✅ tasks-template.md - no changes needed
  ✅ Feature 001-home-scoreboard - updated research, quickstart, plan

Follow-up TODOs:
  - Configure Tailwind CSS with soft black/white theme in tailwind.config.js (#1A1A1A, #FAFAFA)
  - Install Tailwind CSS dependencies during feature 001 implementation
  - Create shared Tailwind component patterns in src/components/
-->

# Party Games Constitution

## Core Principles

### I. Game-First Architecture

Every feature MUST be developed as a self-contained game or reusable game component:

- Each game exists as an independent module with its own route
- Games MUST be playable without dependencies on other games
- Shared utilities (scoring, timers, animations) extracted to common libraries
- Each game MUST have clear entry/exit points and self-contained state

**Rationale**: Enables independent development, testing, and potential extraction of individual games. Prevents coupling that makes games difficult to maintain or remove.

### II. Visual Consistency (NON-NEGOTIABLE)

All UI components and games MUST adhere to the minimalist design system:

- Color palette: Soft black (#1A1A1A), Soft white (#FAFAFA), and grayscale only (pure #000/#FFF forbidden for eye comfort)
- Typography: Google Sans font family exclusively
- Component styling MUST use shared design tokens from central theme file
- No colors outside the approved palette without constitutional amendment
- Responsive design for mobile and desktop browsers, prioritize vertical mobile first.

**Rationale**: Ensures professional, cohesive user experience across all games. Prevents visual fragmentation that degrades brand identity.

### III. Static-First Deployment

The project MUST remain deployable to any static hosting provider:

- No server-side runtime dependencies
- All game logic runs client-side in the browser
- Configuration via environment variables at build time only
- Asset optimization for fast CDN delivery (<500KB initial bundle)
- Hash-based cache busting for all assets

**Rationale**: Maximizes deployment flexibility, minimizes hosting costs, ensures fast global delivery via CDN.

### IV. Component Isolation & Reusability

UI components and game mechanics MUST be designed for reuse:

- Shared components in `src/components/` with clear props interface
- Game mechanics (scoring, timers, multiplayer logic) in `src/lib/`
- Each component independently testable via Storybook or Vitest
- TypeScript interfaces required for all component props and game state
- No direct DOM manipulation - React patterns only

**Rationale**: Accelerates new game development by leveraging proven components. Reduces bugs through shared, tested code.

### V. Performance & Accessibility

Games MUST be performant and accessible to all users:

- Initial load <3 seconds on 3G connection
- 60 FPS gameplay on mid-range devices (iPhone 12, equivalent Android)
- WCAG 2.1 AA compliance minimum (keyboard navigation, screen reader support)
- Semantic HTML with proper ARIA labels for game controls
- No flashing content exceeding WCAG seizure thresholds

**Rationale**: Ensures inclusive access and smooth gameplay experience across device capabilities.

### VI. Styling Architecture (NON-NEGOTIABLE)

All styling MUST follow strict separation and reuse patterns:

- **FORBIDDEN**: Inline styles (`style={{...}}`) are NEVER permitted
- **REQUIRED**: Use existing shared components from `src/components/` when available
- **Tailwind CSS**: All components styled with Tailwind utility classes (project standard)
- **No CSS Files**: Separate CSS/SCSS files are NOT used (Tailwind provides all styling)
- **Custom Theme**: Black/white/grayscale palette configured in tailwind.config.js
- **Consistency**: All future features MUST use Tailwind CSS (CSS Modules forbidden)

**Rationale**: Prevents inline style pollution that makes components unmaintainable and inconsistent. Enforces design system compliance through shared styling infrastructure. Enables global theme changes without component modifications.

## Technical Standards

### Technology Stack (LOCKED)

- **Framework**: React 18+ with TypeScript 5+
- **Build Tool**: Vite 5+
- **Font**: Google Sans (via Google Fonts CDN)
- **Testing**: Vitest for unit tests, Playwright for E2E (optional)
- **Styling**: Tailwind CSS (LOCKED - decided by feature 001-home-scoreboard)
- **State Management**: React Context + hooks (Zustand if complexity demands)
- **Inline Styles**: FORBIDDEN - see Principle VI

### Code Quality Gates

All code MUST pass before merge:

- TypeScript strict mode with zero errors
- ESLint with React + TypeScript recommended rules
- Prettier formatting enforced
- No inline styles detected (automated via ESLint rule if configured)
- Vite production build succeeds with no warnings
- Bundle size analysis shows <500KB gzipped initial load

## Development Workflow

### Feature Development Process

1. **Spec Creation**: New game or feature documented in `/specs/[###-game-name]/spec.md`
2. **Plan Review**: Implementation plan generated via `/speckit.plan`
3. **Task Breakdown**: Tasks created via `/speckit.tasks`, prioritized by user story
4. **Implementation**: Follow TDD if tests requested, otherwise build + manual test
5. **Visual Review**: Compare against design system for consistency
6. **Performance Check**: Lighthouse score >90 for performance and accessibility

### Branch Strategy

- `main` - production-ready code, always deployable
- `[###-game-name]` - feature branches per game or major feature
- All changes via pull request with constitution compliance verification

## Governance

### Amendment Process

Constitutional changes require:

1. Proposal documented in issue with rationale
2. Impact analysis on existing games and templates
3. Version bump following semantic versioning
4. Update to all dependent templates and documentation

### Version Policy

- **MAJOR**: Breaking changes to design system, tech stack replacement, principle removal
- **MINOR**: New principle added, expanded guidance, new mandatory practice
- **PATCH**: Clarifications, typo fixes, non-functional wording improvements

### Compliance Verification

- All pull requests MUST verify constitution compliance
- Design system violations block merge
- Performance regressions require justification or remediation
- Accessibility violations block merge unless temporary exception granted

### Runtime Guidance

For development best practices and code patterns, refer to `.specify/templates/agent-file-template.md` (auto-generated from feature plans).

**Version**: 1.1.2 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05
