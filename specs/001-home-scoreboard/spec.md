# Feature Specification: Home Page with Team Scoreboard

**Feature Branch**: `001-home-scoreboard`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "Hãy tạo trang home, gồm các games nhỏ, tạm thời để placeholder, hiển thị dưới dạng các cards. Cung cấp sẵn một số method có thể dùng global: bao gồm get điểm team xanh, get điểm team đỏ, cộng điểm team xanh/đỏ, reset điểm. Các thông tin điểm đội xanh và đội đỏ luôn được hiển thị ở trên màn hình, (hãy sáng tạo, bạn có thể hiển thị như header bar hoặc status bar, tuỳ bạn). Chỉ ở màn hình home mới reset được thông tin điểm này. Thông tin điểm sẽ được lưu ở thiết bị của người dùng (localstorage chẳng hạn)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display Home Page with Game Cards (Priority: P1) 🎯 MVP

Users need a central hub to browse and select available games from a visually appealing card-based layout.

**Why this priority**: This is the core entry point of the application. Without the home page displaying available games, users cannot navigate to or discover any games. This forms the foundation for all other features.

**Independent Test**: Can be fully tested by loading the application and verifying that the home page displays multiple game placeholder cards in a grid layout with consistent minimalist styling.

**Acceptance Scenarios**:

1. **Given** the user opens the application, **When** the home page loads, **Then** the page displays exactly 6 game cards in a grid using the black/white minimalist design system
2. **Given** the home page is displayed, **When** the user views the page, **Then** each game card shows a game title in Vietnamese (e.g., "Trò chơi 1"), placeholder icon/image, and "Sắp ra mắt" text
3. **Given** multiple game cards are shown, **When** the user views the page on mobile, **Then** the cards reflow responsively to fit the screen width
4. **Given** the user views the home page, **When** the page renders, **Then** all cards maintain consistent spacing, sizing, and visual hierarchy

---

### User Story 2 - Persistent Team Score Tracking (Priority: P2)

Users need to track scores for Blue Team and Red Team across multiple games, with scores persisting even when the browser is closed and reopened.

**Why this priority**: Enables competitive team-based gameplay where scores accumulate across multiple mini-games. This is essential for party game scenarios where teams compete over a session. Must be implemented after the home page exists but before individual games need scoring.

**Independent Test**: Can be tested by manually incrementing team scores, closing the browser, reopening the application, and verifying that scores are restored to their previous values.

**Acceptance Scenarios**:

1. **Given** the application loads for the first time, **When** the home page displays, **Then** Blue Team score shows 0 and Red Team score shows 0
2. **Given** team scores exist in localStorage, **When** the application loads, **Then** scores are restored and displayed correctly
3. **Given** Blue Team score is incremented, **When** the page is refreshed, **Then** Blue Team score persists at the incremented value
4. **Given** Red Team score is incremented, **When** the page is refreshed, **Then** Red Team score persists at the incremented value
5. **Given** scores are at any value, **When** user clicks reset on the home page, **Then** both team scores return to 0 and persist in localStorage

---

### User Story 3 - Always-Visible Score Display (Priority: P2)

Users need to see the current team scores at all times, regardless of which page or game they are viewing.

**Why this priority**: Provides constant awareness of the competition status without requiring users to navigate back to the home page. This enhances the party game experience by maintaining competitive tension throughout gameplay.

**Independent Test**: Can be tested by navigating through different pages/games and verifying that the score display remains visible and shows the correct scores throughout the session.

**Acceptance Scenarios**:

1. **Given** the user is on the home page, **When** viewing the page, **Then** Blue Team and Red Team scores are prominently displayed in a header or status bar
2. **Given** the user navigates to any game page, **When** the game loads, **Then** team scores remain visible in the same location
3. **Given** team scores change during a game, **When** the scores update, **Then** the score display updates in real-time across all pages
4. **Given** the score display is visible, **When** viewed on mobile, **Then** scores remain readable without overlapping game content

---

### User Story 4 - Global Score Management API (Priority: P3)

Games need a consistent interface to read and modify team scores without directly accessing storage mechanisms.

**Why this priority**: Provides the infrastructure for games to interact with team scores, but doesn't deliver direct user value until actual games are implemented. This is preparatory work for future game development.

**Independent Test**: Can be tested by calling the global methods from browser console or a test game component and verifying that scores update correctly both in memory and in persistent storage.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** a game calls the "get Blue Team score" method, **Then** the current Blue Team score is returned
2. **Given** the application is running, **When** a game calls the "get Red Team score" method, **Then** the current Red Team score is returned
3. **Given** Blue Team has 10 points, **When** a game calls "add Blue Team points" with value 5, **Then** Blue Team score increases to 15 and persists to localStorage
4. **Given** Red Team has 8 points, **When** a game calls "add Red Team points" with value 3, **Then** Red Team score increases to 11 and persists to localStorage
5. **Given** scores are at any value, **When** "reset scores" is called from the home page, **Then** both teams return to 0 points

---

### Edge Cases

- What happens when localStorage is full or unavailable (private browsing, storage quota exceeded)?
- How does the system handle negative score increments (deducting points)?
- What happens if localStorage data is corrupted or manually edited to non-numeric values?
- How are very large scores (e.g., 999,999 points) displayed without breaking the UI layout?
- What happens when multiple browser tabs are open and scores are modified in one tab?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a home page with a grid layout of game cards
- **FR-002**: System MUST show 6 placeholder cards with "Sắp ra mắt" (coming soon) text in Vietnamese, using consistent card styling (title, icon/image area, coming soon indicator)
- **FR-003**: System MUST display Blue Team and Red Team scores in a persistent UI element visible on all pages
- **FR-004**: System MUST persist team scores to browser localStorage
- **FR-005**: System MUST restore team scores from localStorage when the application loads
- **FR-006**: System MUST provide a global method to retrieve the current Blue Team score
- **FR-007**: System MUST provide a global method to retrieve the current Red Team score
- **FR-008**: System MUST provide a global method to add points to the Blue Team score (accepts positive integer)
- **FR-009**: System MUST provide a global method to add points to the Red Team score (accepts positive integer)
- **FR-010**: System MUST provide a global method to reset both team scores to 0
- **FR-011**: System MUST only allow score reset from the home page (not from individual game pages)
- **FR-012**: Score display MUST update in real-time when scores change
- **FR-013**: System MUST initialize scores to 0 when no localStorage data exists
- **FR-014**: System MUST handle localStorage errors gracefully (fallback to in-memory storage if localStorage unavailable)
- **FR-015**: All UI components MUST use the black/white/grayscale color palette only
- **FR-016**: All typography MUST use Google Sans font
- **FR-017**: Game card layout MUST be responsive: 3 columns on desktop, 2 columns on tablet, 1 column on mobile
- **FR-018**: All UI text MUST be displayed in Vietnamese (tiếng Việt) as primary language, with natural mixing of common English technical terms where appropriate

### Key Entities

- **Team Score**: Represents the cumulative points for a team (Blue or Red), stored as an integer value, persisted across browser sessions
- **Game Card**: Represents a mini-game entry point, containing game metadata (title, icon, route) but not the game logic itself
- **Score Display**: UI component showing both team scores, always visible regardless of current page

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view the home page with game cards within 3 seconds of application load on a 3G connection
- **SC-002**: Team scores persist across browser restarts with 100% accuracy (no data loss)
- **SC-003**: Score updates reflect in the UI within 100 milliseconds of method call
- **SC-004**: Home page maintains 60fps performance when displaying up to 20 game cards
- **SC-005**: Score display remains readable and accessible on screens as small as 320px width (iPhone SE)
- **SC-006**: Users can successfully navigate from home page to game cards and back without UI layout shifts
- **SC-007**: System handles localStorage quota exceeded errors without crashing the application
- **SC-008**: All interactive elements (cards, reset button) are keyboard accessible and screen reader compatible

## Clarifications

### Session 2026-02-05

- Q: How many placeholder game cards should be displayed initially on the home page? → A: 6 placeholder cards arranged in a 3-column grid on desktop (2x3), responsive to 2 columns on tablet and 1 column on mobile. All cards should display "coming soon" text.
- Q: Should the project use Tailwind CSS or CSS Modules for styling (this decision locks project-wide per constitution)? → A: Tailwind CSS
- Q: What should be the primary display language for UI text? → A: Vietnamese (tiếng Việt) as primary language, with common English technical terms mixed in where natural (e.g., "reset", "team", "score" có thể giữ nguyên hoặc Việt hóa tùy ngữ cảnh)

## Assumptions

- UI text displayed in Vietnamese (tiếng Việt) as primary language, mixing common English terms naturally
- Project uses Tailwind CSS for all styling (locked project-wide per constitution)
- Users have modern browsers with localStorage support (fallback to in-memory storage if unavailable)
- The number of game cards on the home page will not exceed 50 (no pagination required initially)
- Score increments will be positive integers (deductions can be handled with negative values but are not explicitly required)
- A single browser instance is used at a time (multi-tab synchronization is an edge case, not a primary requirement)
- Team names are fixed as "Blue Team" and "Red Team" (no customization required)
- No user authentication is required (scores are per-device, not per-user account)
- Game cards are static placeholders initially (dynamic loading from a database is not required)

## Out of Scope

- Multiplayer synchronization across different devices or browsers
- Historical score tracking or statistics (only current session scores are tracked)
- User authentication or account management
- Custom team names or colors
- Score leaderboards or analytics
- Undo/redo functionality for score changes
- Admin panel for score management
- Real-time score updates across multiple browser tabs (nice-to-have, not required for MVP)
