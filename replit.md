# Today List

## Overview

A personal daily diary app — "Today List" — where the user writes 1–2 sentences about each day, picks a mood, tags categories, and browses a searchable timeline. Built as a full-stack React + Express app backed by Supabase.

## Stack

- **Frontend**: React + Vite + Tailwind CSS (dark-mode first)
- **Backend**: Express 5 (Node 24)
- **Database**: Supabase (PostgreSQL via Supabase JS client)
- **API codegen**: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- **Monorepo tool**: pnpm workspaces
- **Build**: esbuild (CJS bundle for server)

## Artifacts

- `artifacts/today-list` — React frontend (serves at `/`)
- `artifacts/api-server` — Express API server (serves at `/api`)

## Environment

- `SUPABASE_URL` — Supabase project URL (set in `.env`)
- `SUPABASE_ANON_KEY` — Supabase anon/public key (set in `.env`)

## Database Setup

Run `supabase-setup.sql` in your Supabase dashboard (SQL Editor) to create the required tables:
- `categories` — stores diary categories (Personal, Family, Work + custom)
- `entries` — stores daily diary entries

## Key Commands

- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Features

- Daily entry logging (text, mood: great/good/okay/bad/awful, categories)
- Category management (rename, add, delete, custom colors)
- Timeline view with search and category filter
- Edit and delete entries
- Stats widget (streak, total entries, mood distribution)
- Dark mode (soothing midnight blue / mauve palette)
