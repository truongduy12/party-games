# Data Model: King's Cup

## Key Entities

### Card
Represents a standard playing card.
- **suit**: string ('H', 'D', 'C', 'S')
- **rank**: string ('A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K')
- **code**: string (e.g., 'AH', '10D') - used for rule lookup

### Rule
Mapping of card value to game action.
- **title**: string (e.g., "The King's Wheel")
- **action**: string (Instruction text)
- **type**: 'NORMAL' | 'WHEEL'

### GameState
Serialized object in `localStorage`.
- **deck**: Card[] (remaining cards)
- **drawnCards**: Card[] (history)
- **currentCard**: Card | null
- **isWheelActive**: boolean
- **modifier**: 'NONE' | 'DOUBLE' (for "Double Next Card" effect)

## State Transitions

### Draw Card
1. Check `deck.length > 0`.
2. Pop `card` from `deck`.
3. Push `card` to `drawnCards`.
4. Set `currentCard` = `card`.
5. Apply modifier if present.
6. If `card.rank === 'K'`, set `isWheelActive = true`.

### Reset Game
1. Generate new 52-card deck.
2. Shuffle deck.
3. Clear `drawnCards`.
4. Set `currentCard = null`.
5. Set `modifier = 'NONE'`.
6. Save to `localStorage`.
