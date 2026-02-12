# Feature Specification: King's Cup (Thử Thách Thần Rượu)

**Feature Branch**: `002-kings-cup`
**Created**: 2026-02-12
**Status**: Draft
**Input**: Implement "King's Cup" drinking game with deck management, persistence, and King's Wheel modal.

## User Scenarios & Testing

### User Story 1 - Start Game & Draw Cards (Priority: P1)

As a player, I want to start a new game with a shuffled deck and draw cards one by one so that I can play the game with my friends without bringing a physical deck.

**Why this priority**: Core gameplay loop. Without drawing cards, there is no game.

**Independent Test**: Verify deck initializes, shuffles, and cards can be drawn until empty.

**Acceptance Scenarios**:

1. **Given** a new game session, **When** I click "Start Game", **Then** a full 52-card deck is shuffled and ready.
2. **Given** an active game, **When** I click the deck/card, **Then** a card is revealed with its associated rule displayed.
3. **Given** the deck is empty, **When** I try to draw, **Then** a "Game Over" screen appears with a "Play Again" button to reset the game.

---

### User Story 2 - King's Wheel (Priority: P1)

As a player, I want a special interaction when drawing a King so that the "King's Wheel" rule is enforced with a random outcome.

**Why this priority**: Defines the unique feature of this digital version compared to a standard deck.

**Independent Test**: Force draw a King and verify the modal and spinner behavior.

**Acceptance Scenarios**:

1. **Given** I draw a King (K) of any suit, **When** the card is revealed, **Then** a "King's Wheel" modal automatically appears.
2. **Given** the modal is open, **When** I click the "SPIN" button, **Then** the wheel spins and lands on one of 5 outcomes.
3. **Given** a result is shown, **When** I close the modal, **Then** I return to the main game screen to continue drawing.

---

### User Story 3 - Persistence & Recovery (Priority: P2)

As a player, I want my game state to be saved automatically so that if I accidentally refresh the page (or am drunk), I don't lose the progress and card count.

**Why this priority**: Critical for user experience in a drinking environment where accidents happen.

**Independent Test**: Draw cards, refresh page, verify same card is on top and remaining deck count is correct.

**Acceptance Scenarios**:

1. **Given** a game in progress with 40 cards left, **When** I refresh the browser, **Then** the game restores with 40 cards left and the last drawn card visible.
2. **Given** a game in progress, **When** I click "Reset Game", **Then** the deck is reshuffled and state is cleared from storage.

## Requirements

### Functional Requirements

- **FR-001**: System MUST render a standard 52-card deck using `@heruka_urgyen/react-playing-cards`.
- **FR-002**: System MUST shuffle the deck using the Fisher-Yates algorithm upon game start or reset.
- **FR-003**: System MUST display the specific rule for each card drawn based on `src/data/kings-cup.json`.
- **FR-004**: System MUST trigger a "King's Wheel" modal immediately upon drawing any King (K).
- **FR-005**: The King's Wheel MUST include 5 equal-probability segments: "Drink 1 Shot", "Pick a Partner", "Everyone Else Drinks", "Double Next Card", "Lucky Escape".
- **FR-006**: System MUST persist the current deck state (remaining cards, current card, history) to `localStorage`.
- **FR-007**: System MUST recover the game state from `localStorage` on page load if a valid session exists.
- **FR-008**: System MUST provide a "Reset Game" button to clear state and start over.
- **FR-009**: The "Double Next Card" effect MUST apply a visual indicator and modify the rule of the *immediate next* card drawn (e.g., drink count x2).
- **FR-010**: This game MUST NOT track scores (No Scoring mode).

### Key Entities

- **Card**: { suit: string, rank: string, code: string }
- **GameState**: { deck: Card[], drawnCards: Card[], currentCard: Card | null, isWheelActive: boolean, modifier: 'NONE' | 'DOUBLE' }
- **Rule**: { title: string, action: string, type: 'NORMAL' | 'WHEEL' }

## Success Criteria

### Measurable Outcomes

- **SC-001**: Game state (deck order) is preserved 100% of the time after page refresh.
- **SC-002**: King's Wheel modal appears within 500ms of drawing a King.
- **SC-003**: Users can reset the game and get a new shuffled deck structure (verified by different first card in 95% of cases).

## Clarifications

### Session 2026-02-12
- Q: Empty Deck Behavior? → A: Show "Game Over" screen with "Play Again" button.
- Q: King's Wheel Interaction? → A: Manual "SPIN" button triggers the wheel.
