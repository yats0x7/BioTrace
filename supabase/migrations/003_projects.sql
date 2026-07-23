-- 003_projects.sql
-- Community projects

create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  cover_image_url text,
  visibility text check (visibility in ('public', 'private')) default 'public',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.projects is 'Community biodiversity projects.';
