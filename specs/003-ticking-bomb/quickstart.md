# Quickstart: Ticking Bomb

## Prerequisites
- Node.js 18+
- Modern Browser (Chrome/Safari/Edge) for AudioContext support

## Running the Game
1. Navigate to `http://localhost:5173/#/ticking-bomb` (route to be created).
2. Click **Start Game** to initialize| `duration` | `number` | Total duration for this round (15-60s) |*Note*: You must interact with the page (click) for audio to work.
3. Read the question aloud, answer it.
4. Tap **Pass** to get a new question and pass the device.
5. When the bomb explodes, the current holder loses!

## Debugging
- **Audio Issues**: Check browser console for `Autoplay policy` errors. Ensure you clicked "Start".
- **Timer Testing**: The timer is hidden. To debug, check the console logs for "Time remaining: X".
- **Vibration**: Only works on mobile devices (Android mostly, iOS ignores `navigator.vibrate` in many contexts without user interaction).

## Key Components
- `TickingBombGame.tsx`: Main container.
- `BombAnimation.tsx`: Visual component.
- `useTickingBomb.ts`: Custom hook for logic (timer, audio, questions).
