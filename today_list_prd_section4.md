# Section 4: Core Features (MVP)

## MVP Philosophy
The MVP is designed to:
- Maximize daily habit formation
- Minimize friction and complexity
- Deliver immediate and delayed value

If a feature doesn’t support logging daily or finding past moments, it is excluded.

---

## Core MVP Features

### 1. Daily Entry Logging (Core Feature)
**Description:**  
Users can quickly write a short summary of their day (1–2 sentences).

**User Story:**  
As a user, I want to quickly write what I did today so I can remember it later.

**Acceptance Criteria:**
- Single text input box
- Placeholder text: “What happened today?”
- Designed for 1–2 sentences (guided, not enforced)
- Save entry with one tap/click
- Entry is automatically timestamped (date)

---

### 2. Category Tagging (Work / Family / Personal)
**Description:**  
Users assign one or more categories to each entry.

**User Story:**  
As a user, I want to tag my entry so I can later filter my life by category.

**Acceptance Criteria:**
- 3 selectable categories: Work, Family, Personal
- Multiple categories can be selected
- Simple UI (checkboxes or toggles)
- Optional but encouraged

---

### 3. Keyword Search
**Description:**  
Users can search past entries using keywords.

**User Story:**  
As a user, I want to search for a keyword like “Disneyland” so I can find when it happened.

**Acceptance Criteria:**
- Search bar at top
- Returns entries containing keyword
- Results shown in reverse chronological order
- Fast response

---

### 4. Timeline View (Recent Entries)
**Description:**  
Users can browse past entries in a simple chronological list.

**User Story:**  
As a user, I want to scroll through my past days so I can reflect on what I’ve done.

**Acceptance Criteria:**
- Reverse chronological order
- Filters: Last 7 days, Last 30 days, All time
- Each entry shows date, text, and category tags

---

### 5. Category Filter
**Description:**  
Users can filter entries by category.

**User Story:**  
As a user, I want to see only my work entries so I can review what I’ve done professionally.

**Acceptance Criteria:**
- Filter options: Work, Family, Personal
- Can combine filters
- Works with timeline and search

---

## Non-Goals (MVP Guardrails)
- No user accounts or login
- No cloud sync
- No editing or deleting entries
- No notifications or reminders
- No AI features
- No rich text formatting
- No attachments

---

## MVP Outcome
This MVP enables users to:
- Log their day in under 60 seconds
- Build a daily habit
- Search and retrieve past entries
- Reflect on recent activity
- Filter by meaningful categories
