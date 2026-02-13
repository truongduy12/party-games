# Data Model: Ticking Bomb

## Entities

### GameState
Tracks the current status of the game session.

| Field | Type | Description |
|---|---|---|
| `phase` | `Enum` | `WAITING` (start screen), `PLAYING` (timer running), `EXPLODED` (game over) |
| `currentQuestion` | `String` | The prompt currently displayed to the player |
| `duration` | `number` | Total duration for this round (15-60s) |
| `remainingTime` | `number` | *Internal state, not displayed numerically* |
| `isExploding` | `boolean` | Trigger for explosion animation |

### Question
Data structure for content.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier (optional, index/text can serve) |
| `text` | `string` | The challenge text, e.g., "Kể tên 3..." |
| `category` | `string` | (Optional) Category tag if needed later |

## State Transitions

1. **Start Game**: `WAITING` -> `PLAYING`
   - Action: Initialize `duration` (random 30-90s), select first `currentQuestion`.
   - Side Effect: Start Audio context, vibration.

2. **Pass Question**: `PLAYING` -> `PLAYING`
   - Action: Select new `currentQuestion` from pool (ensure no immediate repeat).
   - Validation: Timer must be > 0.

3. **Timer Expiry**: `PLAYING` -> `EXPLODED`
   - Action: Stop timer, trigger sound/vibration.

4. **Reset**: `EXPLODED` -> `WAITING`
   - Action: Reset state to initial.

## Persistence
- **Local Storage**: Not strictly required for this rapid-fire game, but saving `high scores` (longest run?) could be a future feature. For MVP, ephemeral state is sufficient.
