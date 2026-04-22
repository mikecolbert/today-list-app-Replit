# Working Notes — Today List

> **Internal Document** — This file is for developer and AI assistant use only. Not for public audiences. Update at the end of every working session.

---

## 1. How to Use This File (For AI Assistants)

1. Read this entire file before suggesting changes or writing code.
2. Read README.md (if present) for public-facing description.
3. Do not change folder structure or conventions without discussion.
4. Follow all conventions listed here exactly.
5. Do not suggest approaches listed in "What Was Tried and Rejected".
6. Ask clarifying questions before making large structural changes.
7. This project is **AI-assisted / vibe coded** — refactor conservatively.

---

## 2. Current State

**Last Updated:** 2026-04-21

### What Is Working
- [x] PRD complete (Sections 1–7)
- [x] MVP feature definition
- [x] User flows defined
- [x] Wireframes designed
- [x] Build plan defined
- [x] Step-by-step build script created

### What Is Partially Built
- [ ] Frontend app (Next.js) — scaffold not yet created
- [ ] Components — planned but not implemented
- [ ] LocalStorage persistence — designed, not implemented

### What Is Not Started
- [ ] Actual codebase implementation
- [ ] Deployment
- [ ] Testing / QA in real environment

---

## 3. Current Task

**What I was working on when I stopped:**
Preparing full implementation plan and build script for Today List MVP.

**The very next step is:**
Initialize Next.js project and begin Step 1 of build script.

---

## 4. Architecture and Tech Stack

| Technology | Version | Why It Was Chosen |
|----------|--------|------------------|
| Next.js | Latest | Fast setup, great for single-page apps |
| React | Latest | Component-based UI |
| TypeScript | Latest | Type safety and maintainability |
| Tailwind CSS | Latest | Fast UI development |
| LocalStorage | Browser API | Simplest persistence for MVP |

---

## 5. Project Structure Notes

```bash
/app
  page.tsx
/components
  EntryComposer.tsx
  SearchBar.tsx
  CategorySelector.tsx
  TimeFilter.tsx
  CategoryFilter.tsx
  EntryTimeline.tsx
  EntryCard.tsx
  EmptyState.tsx
/lib
  types.ts
  storage.ts
  filters.ts
```

- Single-page architecture
- No routing complexity
- Components intentionally small and reusable

---

## 6. Data / Database

### Entry Schema

| Field | Type | Required | Notes |
|------|------|----------|------|
| id | string | Yes | UUID |
| text | string | Yes | 1–2 sentence entry |
| categories | string[] | No | work/family/personal |
| createdAt | string | Yes | ISO timestamp |

Persistence:
- LocalStorage (MVP)

---

## 7. Conventions

### Naming
- camelCase for variables
- PascalCase for components
- lowercase for categories

### Code Style
- Simple, readable functions
- Avoid unnecessary abstraction

### Patterns
- Single-screen app
- State lifted to page level
- Pure utility functions in /lib

---

## 8. Decisions and Tradeoffs

- **Decision made:** No authentication. Simpler MVP, faster build.
- **Decision made:** Use LocalStorage. Avoid backend complexity.
- **Decision made:** Limit entries to 1–2 sentences. Encourages habit.
- **Decision made:** Single-page UI. Reduces friction.

---

## 9. What Was Tried and Rejected

- Full journaling features — too complex
- Calendar integration — unnecessary for MVP
- AI summarization — adds cost and complexity

---

## 10. Known Issues and Workarounds

- No current bugs (no code yet)

---

## 11. Environment Compatibility

- Target: modern browsers (Chrome, Safari, Edge)
- Node.js required for dev
- Next.js App Router environment

---

## 12. Open Questions

- Should categories default to previous selection?
- Should entries allow editing later?
- Should reminders be added?

---

## 13. Session Log

### 2026-04-21
- Completed full PRD
- Designed MVP and build plan
- Generated vibe coding script
- Next step: start implementation

---

## 14. Useful References

- Next.js Docs
- Tailwind Docs
- OpenAI / Cursor for code generation

AI usage:
- Majority of planning and scaffolding generated with AI
- Human-guided iteration and decisions
