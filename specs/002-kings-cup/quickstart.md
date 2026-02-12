# Quickstart: King's Cup

## Prerequisites
- Node.js 18+
- `npm install @heruka_urgyen/react-playing-cards`

## Running the Game
1. Ensure you are in the project root.
2. Run `npm run dev`.
3. Navigate to `/kings-cup`.

## Key Components
- `src/games/kings-cup/KingsCup.tsx`: Main game container.
- `src/games/kings-cup/components/CardDeck.tsx`: Handles drawing.
- `src/games/kings-cup/components/KingsWheel.tsx`: The modal spinner.

## Debugging
- Clear `localStorage.removeItem('kings-cup-state')` to force reset.
- Check console for "Wheel Option Selected: [Option]" logs.
