---
name: project-continuity
description: Fast context recovery and post-task state synchronization. Use when completing a task, switching sessions, resuming work, or needing instant project orientation without scanning files.
---

# Project Continuity

Eliminate whole-codebase rescanning across agent turns and sessions by maintaining a compact, living snapshot file (`CONTINUITY.md`) at project root.

## Core Principle

- **Write once on completion**: Never end a feature/bugfix turn without updating `CONTINUITY.md`.
- **Read first on startup**: When asked about the codebase, check `CONTINUITY.md` before invoking `find`, `grep`, or tree exploration.
- **Zero bloat**: Keep snapshot under 100 lines. Focus on architecture, active routes, dev commands, known quirks, and recent diffs.

---

## Instructions

### Step 1: Read Snapshot at Task Start

When session starts or new request arrives:
1. Check if `CONTINUITY.md` exists at workspace root.
2. Read it to immediately acquire:
   - Subsystem folders & dev ports
   - Run commands & working directories
   - Active database & env connections
   - Recent changes & known gotchas
3. Jump straight to target files without discovery scans.

### Step 2: Perform the Requested Work

- Make targeted edits to the relevant subsystem.
- Verify changes with fast targeted checks (e.g. `npx tsc --noEmit`).

### Step 3: Update `CONTINUITY.md` at Task Completion

Before closing the turn, synchronize `CONTINUITY.md`:

```markdown
# Project Continuity Snapshot

**Last Updated**: [ISO timestamp]  
**Last Task**: [Short summary of what was done]

## Architecture & Subsystems
- `client/` — Next.js (App Router, Tailwind v4, Port 3000)
- `backend/` — Express API (PostgreSQL/Neon, Port 4000)
- `admin/` — Next.js Admin Dashboard (Port 3002)

## Dev Run Commands
- Client: `cd client && npm run dev` (or `npm run dev --prefix client`)
- Backend: `cd backend && npm run dev`
- Admin: `cd admin && npm run dev`
*Note: No package.json at workspace root.*

## Key Architectural Quirks & Gotchas
- Tailwind v4 inline theme requires `--breakpoint-xs` in `globals.css` if `xs:` utilities are used.
- Next.js images with `fill` must specify responsive `sizes` (e.g. `(max-width: 768px) 100vw, 0vw` when element is `md:hidden`).

## Recent Changes & Touchpoints
- [List recent files touched and rationale]

## Active / Pending Next Steps
- [Pending items or user requests]
```

### Step 4: Keep It Minimal

- Overwrite or update in-place.
- Do not let file grow indefinitely; prune obsolete history, retain active architecture & recent touchpoints.
