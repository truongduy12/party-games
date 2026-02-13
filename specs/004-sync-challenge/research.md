# Research: Sync Challenge

**Feature Branch**: `004-sync-challenge`
**Created**: 2026-02-13

## Decisions

### 1. Game State Management
- **Decision**: Use `useSyncChallenge` hook with local reducer + global `ScoreContext`.
- **Rationale**: 
  - `ScoreContext` (existing) handles the Blue/Red team scores needed for the "Idiom Game" style scoring.
  - Local state is sufficient for transient round data (current keyword).
- **Alternatives**: Redux (overkill), Context for everything (unnecessary for simple local state).

### 2. UI/UX
- **Decision**: Clone "Idiom Game" layout.
- **Rationale**: User explicitly requested consistency.
- **Details**:
  - Horizontal score/control bar at bottom.
  - Large centered text.
  - No automatic countdown (Manual visual/audio cue removed per request).

### 3. Data Source
- **Decision**: Import JSON directly.
- **Rationale**: Simple, static data set. No async fetch needed.

## Clarifications Resolved
- **Scoring**: Manual Blue/Red scoring (Idiom style).
- **Countdown**: Manual (Players count themselves).
