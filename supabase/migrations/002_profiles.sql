-- 002_profiles.sql
-- User profile table

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  contributor_level integer default 1,
  total_uploads integer default 0,
  total_identifications integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.profiles is 'User profiles linked to Supabase Auth.';
