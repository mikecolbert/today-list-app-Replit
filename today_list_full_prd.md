# Today List — Product Requirements Document (PRD)

---

# Section 1: Product Overview

## App Name
Today List

## One-Sentence Description
A lightweight daily logging app that helps busy professionals capture what actually happened each day and turn it into a searchable, emotional timeline of their life.

## Problem It Solves
People often struggle to remember when meaningful events happened—finishing a major work project, taking a family trip, or even small but memorable moments from daily life. This information is rarely captured in one place and is difficult to reconstruct later from calendars, emails, or memory alone.

## Target Users
Busy professionals with families who:
- Reflect on their day in the evening
- Want a low-effort logging habit
- Need to recall past events
- Value both productivity and meaningful life moments

## Core Value Proposition
Today List enables a nightly habit of capturing the day in 1–2 sentences and transforms entries into a searchable, structured life timeline.

## Key Differentiator
Captures what actually happened—not what was planned.

## Product Philosophy
- Nightly ritual
- Low friction
- Searchable timeline
- Emotionally meaningful

---

# Section 2: Objectives & Metrics

## Primary Objective
Establish a daily logging habit.

## Success Metrics
- 20+ logs in first 30 days
- Daily logging rate
- Day 7 and Day 30 retention

---

# Section 4: MVP Features

## Core Features
1. Daily Entry Logging
2. Category Tagging
3. Keyword Search
4. Timeline View
5. Category Filter

## Non-Goals
- No auth
- No editing/deleting
- No AI features

---

# Section 5: User Flow

## Core Flows
- First-time entry
- Daily logging
- Review timeline
- Search entries
- Filter by category

---

# Section 6: UI / UX Wireframes

## Design Principles
- Fast
- Calm
- Minimal
- Single-screen

## Key Elements
- Search bar
- Entry composer
- Filters
- Timeline

---

# Section 7: Build Plan

## Tech Stack
- Next.js
- TypeScript
- Tailwind
- LocalStorage

## Data Model
Entry:
- id
- text
- categories
- createdAt

## Components
- EntryComposer
- SearchBar
- Timeline
- Filters

## Filtering Pipeline
1. Time
2. Category
3. Search
4. Sort

---

# Section 8: Build Script

See separate build script file for step-by-step implementation.

---

# Final Insight

Today List is a habit-first product:
Log → Accumulate → Recall → Reflect → Repeat

Success depends on:
- Fast logging
- Emotional payoff
- Consistent usage

---

# Definition of MVP Success

User can:
- Log entries quickly
- Retrieve entries easily
- Build a daily habit

If these are achieved, the product is successful.
