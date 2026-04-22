# Today List — Vibe Coding Build Script

This document contains a step-by-step build script for creating the Today List MVP using Next.js, TypeScript, and Tailwind CSS.

## How to Use
- Paste one step at a time into Cursor
- Run and verify after each step
- Proceed incrementally

---

## Step 1 — Create the project
Create a new Next.js app called "today-list" using the App Router, TypeScript, ESLint, and Tailwind CSS.

---

## Step 2 — Create structure and types
Set up components and lib folders with placeholder files and define types:
- Category = "work" | "family" | "personal"
- Entry = { id, text, categories, createdAt }

---

## Step 3 — Build main layout
Create a clean, centered single-screen layout with:
- title
- search bar
- entry composer
- filters
- timeline

---

## Step 4 — EntryComposer
Add textarea, category selector, and Save button.

---

## Step 5 — CategorySelector
Implement pill toggles for categories.

---

## Step 6 — Page state + save logic
Add React state and save functionality with UUID and timestamp.

---

## Step 7 — LocalStorage
Persist entries using localStorage.

---

## Step 8 — SearchBar
Add search input with placeholder "Search your life..."

---

## Step 9 — TimeFilter
Buttons for 7d, 30d, all.

---

## Step 10 — CategoryFilter
Reuse CategorySelector for filtering.

---

## Step 11 — Timeline + EntryCard
Display entries with date, text, and category tags.

---

## Step 12 — Filtering utilities
Implement filtering pipeline:
time → category → search → sort

---

## Step 13 — Connect filters
Wire UI to filtering logic.

---

## Step 14 — Autofocus + feedback
Autofocus textarea and show "Day captured."

---

## Step 15 — Polish
Improve spacing, typography, and visual calmness.

---

## Step 16 — Empty states
Handle:
- no entries
- no search results

---

## Step 17 — Refactor
Clean up code without changing behavior.

---

## Step 18 — Mobile
Ensure responsive layout.

---

## Step 19 — QA
Fix bugs and validate functionality.

---

## Step 20 — Future Supabase plan
Outline migration strategy.

---

## Optional One-Shot Prompt
Build the full app in one go using the defined requirements:
- logging
- tagging
- search
- filters
- localStorage
- single-screen UI
