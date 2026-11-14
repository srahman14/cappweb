-- Run once in the Supabase SQL editor, BEFORE deploying the code that reads it.
-- Lets admins pin events to the landing page (pinned events show first, the rest
-- of the 3 slots fill automatically with the soonest upcoming events).
alter table public.events
  add column if not exists is_landing_pinned boolean not null default false;
