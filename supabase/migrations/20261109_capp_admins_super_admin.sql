-- Run once in the Supabase SQL editor.
alter table public.capp_admins
  add column if not exists is_super_admin boolean not null default false;

-- Make yourself a super admin (replace the email), then re-run nothing else:
-- update public.capp_admins set is_super_admin = true
-- where user_id = (select id from auth.users where email = 'you@example.com');

-- capp_admins must only be written by the server (service role bypasses RLS).
-- Confirm there are no insert/update/delete policies for anon/authenticated:
-- select * from pg_policies where tablename = 'capp_admins';
