# Feature Specification: Ai là gián điệp (Who is the Spy)

**Feature Branch**: `001-ai-la-gian-diep`  
**Created**: 2026-02-12  
**Status**: Draft  
**Input**: User description: "Hãy viết một game chơi nhóm có tên là 'Ai là gián điệp'. Game cho phép chọn số người chơi (ví dụ 5 người). Game sẽ bí mật gán 4 người là 'Dân thường' nhận từ khóa 'Hà Nội' và 1 người là 'Gián điệp' nhận từ khóa 'TP.HCM'. Người chơi sẽ lần lượt bấm vào màn hình để xem từ khóa của mình rồi ẩn đi trước khi chuyền cho người bên cạnh. Sau khi tất cả đã xem, hiện màn hình thông báo 'Bắt đầu thảo luận'. Hãy sử dụng một mảng các cặp từ khóa tương đồng để game phong phú." + "Thêm một flag vào game này để không hiện score, do game này không chia đội, flag này cũng sẽ ẩn điểm và nút reset điểm. Data sẽ được lấy từ @[data/ai-la-gian-diep.json]"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Game Setup (Priority: P1)

As a game host, I want to select the number of players and start the game so that we can begin playing "Ai là gián điệp".

**Why this priority**: Essential for initializing the game with the correct number of participants.

**Independent Test**: Can be tested by launching the game, inputting a number of players (e.g., 5), and verifying the game transitions to the first player's turn.

**Acceptance Scenarios**:

1. **Given** the game main menu, **When** I select "Ai là gián điệp", **Then** I should see a screen to input the number of players.
2. **Given** the player count input screen, **When** I enter a valid number (e.g., 5) and confirm, **Then** the game should initialize and proceed to the first player's instruction screen.

---

### User Story 2 - Role & Keyword Reveal (Priority: P1)

As a player, I want to secretly view my assigned keyword so that I know my role without revealing it to others.

**Why this priority**: Core gameplay mechanism. Players need to know their secret word to participate.

**Independent Test**: Can be tested by simulating a full round of passing the device. Verify that each player sees a word, the words match the logic (1 Spy, N-1 Civilians), and the word is hidden between turns.

**Acceptance Scenarios**:

1. **Given** it is Player 1's turn, **When** Player 1 taps "Xem từ khóa" (View Keyword), **Then** their secret keyword is displayed.
2. **Given** Player 1 is viewing their keyword, **When** they tap to hide/continue, **Then** the keyword is hidden, and the screen prompts to pass the device to the next player.
3. **Given** a 5-player game, **When** all players have viewed their words, **Then** exactly 1 player should have received the "Spy" word (Word B) and 4 players should have received the "Civilian" word (Word A) from the selected data pair.

---

### User Story 3 - Discussion Phase (Priority: P1)

As a group, we want to be notified when everyone has received their keyword so that we can start the discussion and deduction phase.

**Why this priority**: Marks the transition from the setup phase to the main social deduction phase of the game.

**Independent Test**: Play through the keyword reveal phase for all N players and verify the transition to the "Bắt đầu thảo luận" screen.

**Acceptance Scenarios**:

1. **Given** the last player has viewed and hidden their keyword, **When** the turn ends, **Then** the screen should display "Bắt đầu thảo luận" (Start Discussion).

---

### User Story 4 - No Scoring Mode (Priority: P2)

As a player, I want the game interface to be free of scoring elements typically found in other games, as this game is not team-based or point-based in the standard way.

**Why this priority**: Enhances user experience by removing irrelevant UI elements (score, reset button) that could confuse players.

**Independent Test**: Inspect the UI during the "Ai là gián điệp" game and confirm the absence of score counters and the reset score button.

**Acceptance Scenarios**:

1. **Given** the "Ai là gián điệp" game is active, **When** I inspect the header or game controls, **Then** I should NOT see any score display.
2. **Given** the "Ai là gián điệp" game is active, **When** I inspect the game controls, **Then** I should NOT see a "Reset Score" button.

---

### Edge Cases

- What happens when the player inputs a number of players smaller than the minimum required (e.g., 1 or 2)?
  - *Assumption*: Minimum players should be 3 (1 spy, 2 civilians). System should enforce this minimum.
- What happens if we run out of unique keyword pairs?
  - *Assumption*: The system should reshuffle or allow reuse of pairs, or the dataset is large enough (500 pairs) that this is unlikely in a single session.
- What happens if the JSON data fails to load?
  - *Error Handling*: Show an error message and return to menu.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow the user to input the number of players (Minimum 3).
- **FR-002**: The system MUST load distinct keyword pairs from `data/ai-la-gian-diep.json`.
- **FR-003**: The system MUST randomly assign 1 player as "Gián điệp" (Spy) and the rest as "Dân thường" (Civilian) for each game round.
- **FR-004**: The system MUST assign Word A to all Civilians and Word B to the Spy from the selected keyword pair.
- **FR-005**: The system MUST provide a "Pass and Play" interface where distinct steps exist for: "Pass to Player X", "Player X View Word", "Hide Word".
- **FR-006**: The system MUST display "Bắt đầu thảo luận" after the last player has viewed their word.
- **FR-007**: The system MUST support a "No Score" configuration flag that hides the score display and the reset score button for this specific game mode.
- **FR-008**: The UI MUST be visually consistent with the "Party Games" aesthetic (responsive, modern).

### Key Entities *(include if feature involves data)*

- **GameSession**: Manages the state of the current game (number of players, current player turn, roles, keywords).
- **KeywordPair**: Data structure containing `id`, `wordA` (Civilian), and `wordB` (Spy).
- **Player**: Represents a participant with a specific `id` and assigned `Role` (Civilian/Spy).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully start a game with a specified number of players (3-10+) in under 15 seconds.
- **SC-002**: 100% of game sessions correctly assign exactly 1 Spy role per round.
- **SC-003**: The "No Score" UI state is correctly applied when entering the "Ai là gián điệp" game mode (score hidden).
- **SC-004**: Players can complete the role distribution phase (viewing words) without accidentally revealing their word to the next player (due to the "Hide" step).
