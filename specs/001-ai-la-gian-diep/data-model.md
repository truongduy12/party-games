# Data Model: Ai là gián điệp

**Feature**: `001-ai-la-gian-diep` | **Date**: 2026-02-12

## Entities

### `GameSession`
Represents the state of a single game round.
- **Attributes**:
  - `players`: List of `Player` objects participating in the round.
  - `keywordPair`: The `KeywordPair` selected for this round.
  - `currentTurnIndex`: Index of the player currently acting (setup phase).
  - `phase`: Current game phase (`SETUP`, `REVEAL`, `DISCUSSION`).

### `Player`
Represents a participant in the game.
- **Attributes**:
  - `id`: Unique identifier (1-based index or UUID).
  - `role`: Role assigned for this round (`CIVILIAN` or `SPY`).
  - `word`: The keyword assigned to this player based on their role.
  - `hasViewedWord`: Boolean flag tracking if player has seen their secret word.

### `KeywordPair`
A pair of similar words used for the game logic.
- **Attributes**:
  - `id`: Unique identifier from data source.
  - `wordA`: The word assigned to Civilians (Dân thường).
  - `wordB`: The word assigned to the Spy (Gián điệp).

### `GamePhase` (Enum)
- `SETUP`: Selecting player count.
- `REVEAL`: Pass-and-play phase where players view words.
- `DISCUSSION`: All roles revealed, discussion begins.

## Relationships

- A `GameSession` has diverse `Player`s (many-to-one).
- A `GameSession` uses exactly one `KeywordPair`.
- Each `Player` is assigned one `Role` and one `word`.
