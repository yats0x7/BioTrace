-- 019_fix_profiles_columns.sql
-- Ensure that the statistics columns exist on the profiles table
-- This is necessary if the profiles table was created prior to the statistics columns being added to 002_profiles.sql

alter table public.profiles
  add column if not exists total_uploads integer default 0,
  add column if not exists total_identifications integer default 0;
