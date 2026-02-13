# Feature Specification: Ticking Bomb (Bom hẹn giờ)

**Feature Branch**: `003-ticking-bomb`
**Created**: 2026-02-13
**Status**: Draft
**Input**: User description: "Phát triển trò chơi ticking bomb (Bom hẹn giờ)..."

## User Scenarios & Testing

### User Story 1 - Start Game & Timer (Priority: P1)

As a player, I want to start a new round with a ticking bomb so that the pressure begins immediately.

**Why this priority**: Core game mechanic. Without the timer/bomb, there is no game.

**Independent Test**: Can start a game and see/hear the bomb "ticking" without yet seeing questions (if separated) or effectively playing a round where the timer works.

**Acceptance Scenarios**:

1. **Given** the user is on the Ticking Bomb home screen, **When** they tap "Start Game", **Then** the game screen appears with a bomb visualization and the timer starts silently in the background (15-60s).
2. **Given** the game has started, **When** the random time limit is reached, **Then** the "Explosion" screen triggers.

---

### User Story 2 - Answer & Pass (Priority: P1)

As a player, I want to see a random challenge so I can answer it and pass the device to the next person before the bomb explodes.

**Why this priority**: Correct gameplay loop. Players need content to interact with.

**Independent Test**: Verify questions are loaded from JSON and displayed randomly.

**Acceptance Scenarios**:

1. **Given** the game has started, **When** the screen loads, **Then** a random question from `src/data/ticking-bomb.json` is displayed clearly.
2. **Given** a question is displayed, **When** the player answers (verbally) and passes the phone, **Then** a button "Next Question" / "Pass" (or simply the next player looks at the *same* question if the rule is 1 question per round? The prompt says "Trả lời xong mới được chuyền máy". It doesn't explicitly say "Next Question" appears. However, "Ví dụ yêu cầu: 'Kể tên 3 món ăn...'" implies the *task* is the constraint. Usually in this game, the task stays the same for the group or changes?
   *Clarification*: "Web sẽ hiển thị một yêu cầu ngẫu nhiên. Người cầm máy phải trả lời xong mới được chuyền máy cho người bên cạnh." -> Interpretation: The request is for the *current holder*. Does it change for the next person?
   *Standard Ticking Bomb*: Usually the category stays the same (e.g. "Name animals") until someone fails or bomb explodes. OR it changes every time.
   *User prompt*: "Kể tên 3 món..." implies a specific task. If everyone does the *same* task (e.g. "Name 3 red things"), the first person names 3, passes. Second person names 3 NEW ones? Hard.
   *Alternative*: New prompt for every player? "Web sẽ hiển thị *một* yêu cầu ngẫu nhiên." -> "A random request".
   * Assumption*: To keep it fast and fun, we will implement a "Pass / Next" button that the player taps after answering, which resets the timer? NO, timer is for the *whole round* usually? Or timer is for the *turn*?
   * "Quả bom sẽ nổ ngẫu nhiên trong khoảng 15-45 giây." -> This sounds like a *total round* timer (Hot Potato style). The bomb is passed around. The game ends when it explodes.
   * So, does the question change? If I have to "Name 3 spicy dishes", and I do, then pass... does the next person have to "Name 3 spicy dishes"? Or do they get a new question?
   * *Decision*: To avoid "running out of answers" for narrow topics, and to keep it fresh, we will add a "Done/Pass" button that switches the question for the next player, *OR* we keep the question if the game mode is "List items in category".
   * Let's look at the data: `src/data/ticking-bomb.json` contains "Kể tên 3...".
   * If I say "Kể tên 3 món ăn sáng", I name 3. Next person names 3. It gets hard fast.
   * *Better UX*: Tap "Done" -> New Question appears -> Pass phone. This prevents "I can't think of any more red things" stalling the fun too early, or repetition. ALSO, passing the phone takes time. 
   * *Refined Requirement*: The screen shows a question. Player answers -> Taps "Next" (getting new question) -> Passes phone. Timer continues running globally.
   
   *Wait*, the prompt says: "Người cầm máy phải trả lời xong mới được chuyền máy". It doesn't explicitly mention a "Next" button. But a web app needs interaction.
   *If* the question is static for the round, the app doesn't need touch.
   *If* the question changes, we need a tap.
   *Given the data is specific ("Name 3 X"), changing it per player is safer for casual play.* 
   *Let's assume*: Player taps "Done/Next" after answering, getting a fresh prompt for the *password* (next player).

   **Revised Scenarios**:
   1. **Given** a question is displayed, **When** the current player answers correctly (self-verified), **Then** they tap "Pass/Next" button.
   2. **Given** "Pass/Next" is tapped, **When** the timer hasn't expired, **Then** a new random question appears immediately.

---

### User Story 3 - Explosion (Priority: P1)

As a player, I want the bomb to explode if the timer runs out so that we know who lost.

**Why this priority**: Determining the loser is the win condition.

**Independent Test**: Verify the "Game Over / Explosion" screen triggers at the end of the random duration.

**Acceptance Scenarios**:

1. **Given** the hidden timer reaches 0, **When** the user is viewing a question, **Then** the screen immediately transitions to an "EXPLOSION" state (sound + visual).
2. **Given** the explosion screen, **When** the user taps "Play Again", **Then** the game resets with a new random timer and question.

## Functional Requirements

- **FR-001**: System MUST load questions from `src/data/ticking-bomb.json`.
- **FR-002**: System MUST select a random duration between 15 and 60 seconds at the start of each round.
- **FR-003**: System MUST NOT display the countdown timer digits (to maintain suspense), but MAY show a visual "burning fuse" or "ticking" animation speed change (optional polish).
- **FR-004**: System MUST allow the user to cycle to the next question by tapping a "Pass" button (maintaining the same timer).
- **FR-005**: System MUST trigger a "Boom" state when time expires, overriding any current question.
- **FR-006**: System SHOULD play sound effects (ticking, explosion) if browser policy allows (Audio API).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Game sessions successfully end with an explosion between 15-60 seconds 100% of the time.
- **SC-002**: Questions are loaded randomly and displayed clearly without lag.
- **SC-003**: Users can "Pass" (change question) in under 1 second (instant UI reaction).

## Key Entities

- **Question**: String (from JSON).
- **GameDuration**: Integer (15-60s).
- **GameState**: `WAITING` | `PLAYING` | `EXPLODED`.

## Edge Cases

- **Timer Expiry during Pass**: If the user taps "Pass" exactly as the timer expires -> Explosion takes precedence.
- **Empty Data**: If JSON is empty (unlikely given file exists) -> Show error or fallback.
- **Browser Audio**: If audio is blocked -> Game must still be playable visually (visual explosion is critical).
