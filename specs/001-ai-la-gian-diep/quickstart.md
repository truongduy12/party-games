# Quickstart: Ai là gián điệp

**Feature**: `001-ai-la-gian-diep`

## Prerequisites

- Node.js 20+
- npm 10+
- Extension: `esbenp.prettier-vscode` (recommended)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`.

## Manual Verification

### 1. Feature Navigation
- Go to Home page.
- URL: `http://localhost:5173/#/`
- Action: Click on "Ai là gián điệp" game card (to be added).
- Expected: Navigate to `#/ai-la-gian-diep`.

### 2. Game Setup
- Input "5" players.
- Click "Bắt đầu".
- Expected: Transition to Player 1 screen.

### 3. Role Reveal (Pass & Play)
- **Player 1**: Click "Xem từ khóa" -> See word -> Click "Ẩn" -> Screen asks to pass.
- Repeat for 5 players.
- verify that exactly 1 player gets the distinct word (e.g., "TP.HCM" vs "Hà Nội").

### 4. No Score Check
- During the entire game flow, verify NO score is displayed in the header.
- Verify NO reset button is present.

## Code Quality

Run before commit:
```bash
npm run type-check # tsc -b
npm run lint       # eslint .
```
