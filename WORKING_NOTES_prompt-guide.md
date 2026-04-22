# Generating and Maintaining a WORKING_NOTES.md File

## BAIS:3300 — Digital Product Management

Every AI-assisted coding project should include a `WORKING_NOTES.md` file in the
root of your repository. This file serves two purposes: it's a running developer
journal for yourself, and it's a briefing document for AI assistants so they can
pick up your project mid-stream without you having to re-explain everything from
scratch.

This guide gives you the prompts to generate it the first time and keep it
updated as your project evolves.

---

## What Is WORKING_NOTES.md?

`WORKING_NOTES.md` is an internal working notes file. It is not for a public audience — it is for you and for AI assistants. It documents:

- The current state of your project (what works, what doesn't)
- The decisions you made and why
- The approaches you tried and abandoned
- The exact spot where you left off
- The conventions your code follows so an AI doesn't invent new ones

Think of it as the note you leave for yourself — and for your AI — at the end of
every work session.

---

## Step 1 — What to Upload or Share

Before using either prompt below, give the AI context about your project using
one of these methods:

### Option A — Create in Replit

If you are working in Replit, you can have the AI create this file as you are wrapping up your coding session.

### Option B — Share Your GitHub Repository Link (Recommended)

If your repository is **public**, paste the URL into the chat:

`Here is my GitHub repository: https://github.com/your-username/your-repo-name. Please let me know if you can read the files.`

If the LLM can read your files it can use them to write accurate, specific content for each section.

### Option B — Upload Your Key Files

If your repository is **private** or if the LLM can't read your repository, upload the files that best describe your project:

1. Upload your
   - index.html & stylesheet.css
   - PRD.md
   - STANDARDS.md
   - README.md
   - Any existing WORKING_NOTES.md file

---

## Prompt — Generate WORKING_NOTES.md for the First Time

Use this prompt at the **start of your project**, after your initial code is
written and committed.

Copy everything inside the box and paste it into the chat.

```
I need you to generate a WORKING_NOTES.md file for my project. This file is an
internal working notes document intended for developer and AI assistant
reference. It is not a public-facing document.

I have [shared my GitHub repository link / uploaded my project files] above.
Please review the project before writing anything.

Generate a complete WORKING_NOTES.md using the sections below. Write in Markdown.
Be specific — use the actual details of my project, not generic placeholder text.

---

## Sections to Include

### 1. Title and Header Notice
- Title: "Working Notes — [Project Name]"
- A blockquote notice that this is an internal document not intended for
  public audiences, and should be updated at the end of every working session

### 2. How to Use This File (For AI Assistants)
A numbered instruction list telling any AI assistant to:
- Read this entire file before suggesting changes or writing code
- Read README.md for the public-facing project description
- Not change the folder structure or conventions without discussion
- Follow all conventions listed exactly
- Not suggest approaches listed in "What Was Tried and Rejected"
- Ask clarifying questions before making large structural changes
- Note whether this project was vibe coded or AI-assisted, and if so,
  to refactor conservatively

### 3. Current State
- Last Updated date (today's date)
- A brief honest description of the project's current state
- Three checklists:
  - What Is Working (checked boxes for completed features)
  - What Is Partially Built (unchecked, with a note on what's missing)
  - What Is Not Started (unchecked)

### 4. Current Task
- "What I was working on when I last stopped" — a 2–3 sentence description
  specific enough for an AI to pick up immediately
- "The very next step is" — the single next action needed

### 5. Architecture and Tech Stack
A markdown table with columns: Technology, Version, Why It Was Chosen.
List every language, library, framework, and tool. Include WHY each was chosen,
not just what it is.

### 6. Project Structure Notes
- A code-formatted file tree of the project
- Bullet points explaining any non-obvious folder or file decisions
- Note any files or folders that must not be changed without discussion

### 7. Data / Database
If the project uses a database: document every table and field in a markdown
table with columns: Field, Type, Required, Notes.
If the project uses flat files (CSV, JSON, etc.): document the schema of each
data file instead.
If the project has no persistent data: note that explicitly.

### 8. Conventions
Subsections for each of the following that apply to this project:
- Naming conventions (files, variables, routes, etc.)
- Code style rules being followed
- Any framework-specific patterns in use
- Git commit message style

### 9. Decisions and Tradeoffs
Bullet points for every significant design or technology decision, formatted as:
- **Decision made:** Explanation of why. Do not suggest reversing this.

### 10. What Was Tried and Rejected
Bullet points for every approach that was attempted and abandoned, with a brief
reason. The AI must not suggest these again.

### 11. Known Issues and Workarounds
Bullet points for every known bug. For each one, note:
- What the problem is
- Whether a workaround is in place
- If so, what the workaround does and that it must not be removed

### 12. Browser / Environment Compatibility
(For front-end projects) Note which browsers were tested, which are expected
to work, and any known incompatibilities.
(For back-end projects) Note the OS, Python/Node version, and any environment
dependencies.

### 13. Open Questions
A bullet list of decisions that have not been made yet. These should be
revisited before building the affected features.

### 14. Session Log
A single entry for today's session formatted as:
### YYYY-MM-DD
- What was accomplished
- What was left incomplete
- Any decisions or tradeoffs made
- Next step when resuming

### 15. Useful References
A bullet list of links to documentation, tutorials, or resources specific
to this project. Include a note if AI tools were used and how.

---

Format requirements:
- Output only the Markdown content, ready to save as WORKING_NOTES.md
- No explanations or commentary before or after the file content
- Use ATX-style headings (# not underlines)
- Use fenced code blocks for all code and file trees
- Do not include placeholder text — every section should reflect the
  actual state of my project
```

---

## Prompt 2 — Update WORKING_NOTES.md After a Working Session

Use this prompt at the **end of every work session**, after you have made
changes to your project. This keeps the file current so it's useful the next
time you (or an AI) pick the project back up.

You must upload (or share) both your **current project files** and your
**existing WORKING_NOTES.md** before using this prompt.

```
I have just finished a working session on my project and need to update my
WORKING_NOTES.md file.

I have [shared my GitHub repository link / uploaded my updated project files
and my current WORKING_NOTES.md] above.

Please update the WORKING_NOTES.md file based on the current state of the project.
Make the following changes:

1. CURRENT STATE — Update the three checklists (What Is Working, What Is
   Partially Built, What Is Not Started) to reflect the actual current state
   of the code. Check off anything that is now complete.

2. CURRENT TASK — Replace the previous task description with what I was
   working on at the end of this session and what the very next step is.

3. LAST UPDATED DATE — Update to today's date.

4. SESSION LOG — Add a new entry at the TOP of the Session Log (newest first)
   for today's session. The entry should include:
   - What was accomplished
   - What was left incomplete
   - Any new decisions or tradeoffs made this session
   - The next step when resuming

5. KNOWN ISSUES AND WORKAROUNDS — Add any new bugs discovered. Remove any
   issues that have been fully resolved. Do not remove workarounds that are
   still in place.

6. DECISIONS AND TRADEOFFS — Add any new decisions made this session.
   Do not remove or change existing entries.

7. WHAT WAS TRIED AND REJECTED — Add anything new that was attempted and
   abandoned this session.

8. OPEN QUESTIONS — Add any new unresolved questions. Remove questions that
   have been answered.

9. ARCHITECTURE AND TECH STACK — Add any new technologies introduced.
   Do not remove existing entries.

10. CONVENTIONS — Add any new patterns established. Do not change or remove
    existing conventions.

Do not change any other sections unless the project structure has
fundamentally changed, in which case flag the change explicitly.

Output the complete updated WORKING_NOTES.md file, ready to replace the existing one.
No explanations before or after — just the file content.
```

---

## Tips for Getting Better Results

- **Be honest about what's broken.** The Known Issues section is only useful
  if it's accurate. An AI that doesn't know about a bug will happily write
  code that makes it worse.

- **Update after every session, not just at milestones.** The Session Log
  is most useful when it's granular. "Fixed the nav" is less useful than
  "Fixed the mobile nav breakpoint at 768px — desktop nav is unchanged."

- **Don't edit WORKING_NOTES.md by hand after the first session.** Use Prompt 2
  to regenerate it so the formatting stays consistent and nothing gets
  accidentally removed.

- **Keep it honest about AI usage.** The Useful References section should
  note which parts of the code were AI-generated. This is good academic
  practice and makes the file more useful to a future AI assistant.

- **If you switch AI tools mid-project,** the file is still valuable —
  just paste it at the start of your session and say "please read this
  before we begin."
