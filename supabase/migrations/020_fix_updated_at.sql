-- 020_fix_updated_at.sql
-- Ensure updated_at exists on tables that have triggers

alter table public.profiles
  add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now()) not null;

alter table public.samples
  add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now()) not null;

alter table public.projects
  add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now()) not null;

alter table public.identifications
  add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
