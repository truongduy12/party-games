# Research: Ticking Bomb

## Technical Context
- **Timer Logic**: Needs to handle random duration (30-90s) securely? No, client-side is fine for party game.
- **Audio**: "Explosion" sound. Browser autoplay policies might block audio. Need to research how to handle user interaction to unlock audio context.
- **Animations**: "Burning fuse" or "Expanding bomb". CSS vs Canvas?
- **Vibration**: `navigator.vibrate` for tactile feedback? (Mobile friendly)

## Decisions

### 1. Audio Handling
- **Decision**: Use `Howler.js` or native `Audio` API. Initialize audio context on the first user interaction ("Start Game" button).
- **Rationale**: Browsers block autoplay. We need a user gesture to start audio. The "Start Game" button is the perfect place.
- **Alternatives**: Preload silent audio? Unreliable.

### 2. Animation Strategy
- **Decision**: CSS Animations for the bomb (pulsing, shaking) and fuse.
- **Rationale**: Lightweight, performant, easy to implement with Tailwind. Canvas is overkill.
- **Alternatives**: Lottie/Rive (too heavy for this simple need).

### 3. Vibration
- **Decision**: Implement `navigator.vibrate()` patterns.
- **Rationale**: Adds immersion for the person holding the phone.
- **Fallback**: Graceful degradation if not supported.

### 4. Timer Logic
- **Decision**: `setTimeout` or `requestAnimationFrame` for the game loop.
- **Rationale**: Simple. Precision isn't critical (it's a party game), but `requestAnimationFrame` is better for smooth animations (fuse).

## Unknowns Resolution
- **Browser Audio Policy**: Solved by "Start Game" button trigger.
- **Mobile Sleep**: Will the phone sleep if they don't touch it while thinking?
  - **Research**: `NoSleep.js` or `navigator.wakeLock`.
  - **Decision**: Use `navigator.wakeLock` API if available to prevent screen dimming during the round.

