# Feature Specification: Game Mô Tả Thành Ngữ

**Feature Branch**: `002-idiom-game`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "Tạo game mô tả thành ngữ tục ngữ bằng tiếng Anh. Hiển thị ngẫu nhiên một câu thành ngữ/tục ngữ từ file JSON. Có nút bỏ qua (next câu khác), cộng 10đ cho đội xanh, cộng 10đ cho đội đỏ. Khi cộng điểm thì cũng next sang câu khác."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Hiển Thị Thành Ngữ Ngẫu Nhiên (Priority: P1) 🎯 MVP

Người chơi cần xem được một câu thành ngữ/tục ngữ tiếng Việt được chọn ngẫu nhiên từ bộ dữ liệu để có thể mô tả bằng tiếng Anh cho đội của mình đoán.

**Why this priority**: Đây là chức năng cốt lõi của game. Không có việc hiển thị thành ngữ thì game không thể chơi được. Feature này có thể hoạt động độc lập và đã mang lại giá trị (người dùng có thể xem thành ngữ ngay cả khi chưa có chức năng chấm điểm).

**Independent Test**: Có thể test độc lập bằng cách vào trang game, xác nhận rằng một câu thành ngữ tiếng Việt hiển thị trên màn hình, và mỗi lần refresh hoặc reload thì câu thành ngữ thay đổi ngẫu nhiên.

**Acceptance Scenarios**:

1. **Given** người dùng vào trang game lần đầu, **When** trang load xong, **Then** hiển thị một câu thành ngữ/tục ngữ tiếng Việt được chọn ngẫu nhiên từ dữ liệu
2. **Given** đang hiển thị một câu thành ngữ, **When** người dùng reload trang, **Then** hiển thị một câu thành ngữ khác (có thể trùng nhưng được chọn ngẫu nhiên)
3. **Given** bộ dữ liệu có 500 câu thành ngữ, **When** trang load, **Then** bất kỳ câu nào trong 500 câu đều có khả năng được hiển thị
4. **Given** dữ liệu thành ngữ hợp lệ, **When** trang load, **Then** text thành ngữ hiển thị rõ ràng, dễ đọc với font chữ Google Sans

---

### User Story 2 - Bỏ Qua Câu Hiện Tại (Priority: P2)

Người chơi cần có khả năng bỏ qua câu thành ngữ hiện tại để chuyển sang câu khác mà không cần cộng điểm, phục vụ trường hợp câu quá khó hoặc đội không đoán được.

**Why this priority**: Tăng tính linh hoạt trong gameplay, tránh tình trạng bị "kẹt" ở một câu khó. Tuy nhiên, game vẫn chơi được mà không cần nút này (có thể cộng điểm để next), nên ưu tiên thấp hơn P1.

**Independent Test**: Có thể test độc lập bằng cách vào game, xem câu thành ngữ hiện tại, click nút "Bỏ qua", xác nhận câu thành ngữ mới xuất hiện và điểm số không thay đổi.

**Acceptance Scenarios**:

1. **Given** đang hiển thị một câu thành ngữ, **When** click nút "Bỏ qua", **Then** hiển thị một câu thành ngữ khác ngẫu nhiên
2. **Given** điểm Đội Xanh là 10, Đội Đỏ là 20, **When** click "Bỏ qua", **Then** điểm số không thay đổi (vẫn 10-20)
3. **Given** câu thành ngữ hiện tại có id=5, **When** click "Bỏ qua", **Then** câu mới có id khác 5 (không trùng câu cũ liền kề)
4. **Given** nút "Bỏ qua" hiển thị, **When** người dùng hover, **Then** có hiệu ứng hover rõ ràng (border/shadow change)

---

### User Story 3 - Cộng Điểm Cho Đội (Priority: P1) 🎯 MVP

Người chơi cần cộng 10 điểm cho đội (Xanh hoặc Đỏ) khi đội đó đoán đúng thành ngữ, đồng thời tự động chuyển sang câu mới để tiếp tục chơi.

**Why this priority**: Đây là cơ chế chấm điểm cốt lõi của game, kết nối game với hệ thống điểm số toàn cục. Không có chức năng này thì game chỉ là xem thành ngữ mà không có tính thi đấu. Ưu tiên P1 vì nó cần thiết cho MVP hoàn chỉnh.

**Independent Test**: Có thể test độc lập bằng cách vào game, xem điểm ban đầu (ví dụ 0-0), click "+10 Đội Xanh", xác nhận điểm Đội Xanh tăng lên 10, header score display cập nhật, và câu thành ngữ mới xuất hiện.

**Acceptance Scenarios**:

1. **Given** Đội Xanh có 0 điểm, **When** click nút "+10 Đội Xanh", **Then** điểm Đội Xanh tăng lên 10 điểm
2. **Given** Đội Đỏ có 20 điểm, **When** click nút "+10 Đội Đỏ", **Then** điểm Đội Đỏ tăng lên 30 điểm
3. **Given** đang hiển thị câu thành ngữ id=10, **When** click "+10 Đội Xanh", **Then** hiển thị câu thành ngữ mới với id khác 10
4. **Given** click "+10 Đội Xanh", **When** cộng điểm thành công, **Then** điểm được lưu vào localStorage (persist sau khi refresh)
5. **Given** click "+10 Đội Đỏ", **When** chuyển câu, **Then** điểm hiển thị ở header score bar cập nhật realtime
6. **Given** 2 nút cộng điểm hiển thị, **When** người dùng nhìn, **Then** nút Đội Xanh có màu blue accent, nút Đội Đỏ có màu red accent để phân biệt

---

### User Story 4 - Truy Cập Game Từ Home Page (Priority: P2)

Người dùng cần có thể click vào game card trên trang chủ để vào trang chơi game mô tả thành ngữ.

**Why this priority**: Cần thiết để tích hợp game vào hệ thống tổng thể, nhưng có thể test game riêng lẻ bằng cách truy cập trực tiếp URL trong quá trình phát triển. Ưu tiên P2 vì không block việc phát triển game logic.

**Independent Test**: Có thể test độc lập bằng cách vào trang chủ (http://localhost:5173/), click vào game card "Mô Tả Thành Ngữ", xác nhận browser navigate đến /idiom-game và game hiển thị đúng.

**Acceptance Scenarios**:

1. **Given** đang ở trang chủ, **When** click vào game card có title "Mô Tả Thành Ngữ", **Then** navigate đến route /idiom-game
2. **Given** vào game từ home, **When** game page load, **Then** header score display vẫn hiển thị (persistent across pages)
3. **Given** game card trên home page, **When** status là "available", **Then** card không hiển thị text "Sắp ra mắt", có thể click được
4. **Given** game card, **When** hover, **Then** có hiệu ứng hover (border color change, shadow) để thể hiện clickable

---

### Edge Cases

- Điều gì xảy ra khi file JSON thành ngữ bị lỗi hoặc không load được? → Hiển thị thông báo lỗi thân thiện với nút "Thử lại" để reload dữ liệu mà không cần refresh toàn bộ trang
- Điều gì xảy ra khi click nút cộng điểm nhiều lần liên tục (spam)? → Throttle hoặc disable button trong lúc đang xử lý
- Điều gì xảy ra khi chỉ còn 1 câu thành ngữ trong data? → Vẫn hoạt động bình thường, có thể lặp lại câu đó
- Điều gì xảy ra khi click "Bỏ qua" liên tục 100 lần? → Vẫn random từ toàn bộ data, không giới hạn số lần bỏ qua
- Điều gì xảy ra khi điểm số rất lớn (ví dụ 9999 điểm)? → UI vẫn hiển thị đúng không bị vỡ layout
- Điều gì xảy ra khi refresh trang giữa chừng game? → Điểm số persist (localStorage), câu thành ngữ random lại (không lưu câu hiện tại)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST hiển thị một câu thành ngữ/tục ngữ tiếng Việt được chọn ngẫu nhiên từ file dữ liệu khi trang game load
- **FR-002**: System MUST load dữ liệu thành ngữ từ file JSON (thanh-ngu-tuc-ngu.json) chứa array các object với cấu trúc {id, content}
- **FR-003**: System MUST hiển thị nút "Bỏ qua" để chuyển sang câu thành ngữ khác mà không cộng điểm
- **FR-004**: System MUST hiển thị nút "+10 Đội Xanh" để cộng 10 điểm cho Đội Xanh
- **FR-005**: System MUST hiển thị nút "+10 Đội Đỏ" để cộng 10 điểm cho Đội Đỏ
- **FR-006**: System MUST tự động chuyển sang câu thành ngữ mới ngẫu nhiên sau khi click "+10 Đội Xanh" hoặc "+10 Đội Đỏ"
- **FR-007**: System MUST sử dụng global score management API (useScores hook) để cộng điểm
- **FR-008**: System MUST đảm bảo điểm số được persist vào localStorage ngay sau khi cộng điểm
- **FR-009**: System MUST đảm bảo câu thành ngữ mới được chọn random từ toàn bộ data, không theo thứ tự cố định
- **FR-010**: System MUST tránh hiển thị lại câu vừa mới bỏ qua hoặc vừa chấm điểm (không lặp lại câu liền kề)
- **FR-011**: Game page MUST hiển thị header score display (ScoreDisplay component) ở top của màn hình
- **FR-012**: Game card trên home page MUST có status "available" (không còn "coming-soon")
- **FR-013**: Game card trên home page MUST navigate đến route /idiom-game khi click
- **FR-014**: System MUST handle lỗi khi không load được file JSON (hiển thị fallback message)
- **FR-015**: System MUST sử dụng design system (soft black/white palette, Google Sans font)
- **FR-016**: All buttons MUST có keyboard accessibility (tab navigation, enter to activate)
- **FR-017**: Game page MUST responsive trên mobile (320px), tablet (768px), desktop (1024px+)
- **FR-018**: UI text MUST bằng tiếng Việt (ngoại trừ nội dung thành ngữ là tiếng Việt, button labels có thể mix English)
- **FR-019**: Action buttons ("Bỏ qua", "+10 Đội Xanh", "+10 Đội Đỏ") MUST được bố trí trong một hàng ngang với chiều rộng bằng nhau (horizontal row layout with equal width)
- **FR-020**: When JSON data fails to load, system MUST hiển thị error message với nút "Thử lại" cho phép user retry loading mà không cần refresh toàn bộ trang
- **FR-021**: System MUST sử dụng fade transition (opacity fade 100-150ms) khi thay đổi câu thành ngữ để cung cấp visual feedback rõ ràng

### Key Entities

- **Idiom (Thành Ngữ)**: Đại diện cho một câu thành ngữ/tục ngữ tiếng Việt, gồm id (số nguyên unique) và content (string tiếng Việt)
- **Game State**: Trạng thái hiện tại của game, bao gồm currentIdiom (thành ngữ đang hiển thị), previousIdiomId (để tránh lặp lại)
- **Score Update Event**: Sự kiện cộng điểm cho một team, trigger bởi button click, gọi addBlueScore(10) hoặc addRedScore(10) từ score context

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Người dùng có thể vào game và xem được câu thành ngữ trong vòng 2 giây kể từ khi click vào game card
- **SC-002**: Mỗi lần click "Bỏ qua" hoặc cộng điểm, câu mới xuất hiện trong vòng 200ms
- **SC-003**: 100% các lần cộng điểm đều được lưu vào localStorage và hiển thị đúng ở header score bar
- **SC-004**: Game hoạt động mượt mà (60fps) khi click nút liên tục 10 lần trong 3 giây
- **SC-005**: Câu thành ngữ hiển thị rõ ràng và dễ đọc trên màn hình mobile (320px width)
- **SC-006**: Người chơi có thể hoàn thành một vòng chơi (xem thành ngữ → cộng điểm → câu mới) trong vòng 5 giây
- **SC-007**: Game page tương thích với screen reader (VoiceOver/NVDA) - tất cả buttons và content có ARIA labels phù hợp
- **SC-008**: 0% crash rate khi load dữ liệu thành ngữ (có error handling graceful)

## Clarifications

### Session 2026-02-05

- Q: Game này nên đặt tên gì? → A: "Mô Tả Thành Ngữ" (English: Idiom Description Game)
- Q: File JSON nên đặt ở đâu trong project structure? → A: `src/data/thanh-ngu-tuc-ngu.json` (import trực tiếp vào component)
- Q: Có cần giới hạn số lần bỏ qua không? → A: Không, người chơi có thể bỏ qua không giới hạn
- Q: Khi cộng điểm thì có hiển thị animation/feedback gì không? → A: Sử dụng fade transition mượt (100-150ms opacity) khi đổi câu, không cần animation phức tạp khác
- Q: Có cần track lịch sử các câu đã chơi không? → A: Không, chỉ cần tránh lặp câu liền kề (previousIdiomId)
- Q: Button colors cho Đội Xanh và Đội Đỏ? → A: Đội Xanh dùng blue-500 accent, Đội Đỏ dùng red-500 accent (trong giới hạn design system grayscale, dùng accent color cho buttons)

### Session 2026-02-06

- Q: Button layout arrangement (three buttons: "Bỏ qua", "+10 Đội Xanh", "+10 Đội Đỏ")? → A: Horizontal row with all three buttons in one row with equal width
- Q: Error recovery when JSON fails to load? → A: Display error with retry button to attempt reload without full page refresh
- Q: Visual feedback when idiom text changes? → A: Fade transition with brief opacity fade (100-150ms) when idiom text changes
- Q: Có cần thêm timer/countdown cho mỗi lượt chơi không? → A: Không, game không sử dụng timer (đã confirm trong Out of Scope)

## Assumptions

- Dữ liệu thành ngữ từ file JSON có format hợp lệ: `[{id: number, content: string}, ...]`
- File JSON có ít nhất 10 câu thành ngữ (thực tế có 500 câu)
- Người chơi hiểu cách chơi: một người mô tả thành ngữ bằng tiếng Anh, đội còn lại đoán
- Game được chơi trong môi trường party với nhiều người, không phải single-player
- Score management API (useScores) đã được implement ở feature 001-home-scoreboard
- React Router đã được setup, có thể thêm route mới dễ dàng
- Design system với soft black/white palette và Google Sans font đã sẵn sàng

## Out of Scope

- Timer/countdown cho mỗi lượt (có thể thêm ở phiên bản sau)
- Lịch sử các câu đã chơi trong session
- Chức năng yêu thích/bookmark câu thành ngữ
- Multiplayer realtime synchronization
- Âm thanh/sound effects
- Animation phức tạp khi cộng điểm
- Chế độ chơi khác (ví dụ: multiple choice, fill in the blank)
- Leaderboard hoặc high score tracking
- Chức năng chia sẻ câu thành ngữ lên social media
- Localization sang ngôn ngữ khác (chỉ support tiếng Việt)
