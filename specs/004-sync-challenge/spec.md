# Feature Specification: Đấu Trí Đồng Lòng (The Sync Challenge)

**Feature Branch**: `004-sync-challenge`
**Created**: 2026-02-13
**Status**: Draft
**Input**: User description from prompt.

## User Scenarios & Testing *(mandatory)*

### 1. Game Setup
**User Story**: As a player, I want to start a new game session so my team can begin the challenge.
**Acceptance Criteria**:
- "Sync Challenge" card appears on home screen.
- Clicking it opens the game introduction/lobby.
- "Start Game" button initiates the first round.

### 2. Gameplay Round
**User Story**: As a team, we want to see a keyword and hear a countdown so we can perform the action simultaneously.
**Acceptance Criteria**:
- Screen displays a random keyword from `src/data/sync-challenge.json`.
- A countdown (visual + audio) starts automatically or via button (e.g., "3... 2... 1... Go!").
- Audio cue plays on "Go!".

### 3. Scoring & Progression
**User Story**: As a judge/referee, I want to award points to the specific team that successfully synced.
**Acceptance Criteria**:
- UI displays "Blue Team (+1)" and "Red Team (+1)" buttons (similar to Idiom Game).
- Clicking a team button adds 1 point (or 10?) to that team and loads the next word.
- "Pass/Skip" button loads next word without scoring.

## Functional Requirements *(mandatory)*

### Game Mechanics
- **FR-001**: System MUST load keywords from `src/data/sync-challenge.json`.
- **FR-002**: System MUST display one random keyword at a time.
- **FR-003**: System MUST NOT provide an automatic countdown (players count manually 1-2-3).
- **FR-004**: System MUST allow awarding points explicitly to "Blue" or "Red" team.
- **FR-005**: Global score state (Blue/Red) MUST be preserved using `ScoreContext`.

### User Interface
- **FR-006**: Large, centered keyword display (matching Idiom Game aesthetic).
- **FR-007**: Bottom control bar with:
  - Left: Blue Team (+1)
  - Center: Pass / Next
  - Right: Red Team (+1)
- **FR-008**: Countdown trigger (e.g., tapping the card or a distinct button).

## Technical Constraints & Dependencies
- Use existing `GameContext` or local state.
- Use `lucide-react` for icons.
- Responsive design for mobile/tablet.

## Success Criteria *(mandatory)*
- **SC-001**: Players can complete a full round (Keyword -> Countdown -> Score) in under 15 seconds.
- **SC-002**: Audio cues are audible and synchronized with visual countdown.
- **SC-003**: No duplicate keywords in a single session (until all used).

## Assumptions
- The game is played by one team at a time, or teams take turns passing the device.
- Score is tracked for the current active session.
- No complex "Turn based" roster logic needed yet, just a simple counter.

## Needs Clarification
- None. Scoring model decided (Idiom Game style: Blue/Red explicit scoring).
