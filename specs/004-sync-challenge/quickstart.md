# Quickstart: Sync Challenge

## Overview
A cooperative team game where players try to perform the same action simultaneously based on a keyword.

## Running the Game
1. Navigate to `http://localhost:5173/#/sync-challenge`.
2. **Setup**: Two teams (Blue/Red) or a group and a judge.
3. **Gameplay**:
   - Read the Keyword aloud.
   - Count "1-2-3!" manually.
   - Perform the action.
4. **Scoring**:
   - If sync is successful for Blue Team: Tap **+1 Blue**.
   - If sync is successful for Red Team: Tap **+1 Red**.
   - If failed/skip: Tap **Pass**.

## Key Components
- `SyncChallenge.tsx`: Main game screen.
- `useSyncChallenge.ts`: Logic hook.
