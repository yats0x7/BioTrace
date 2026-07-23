-- 004_project_members.sql
-- Relationship between users and projects

create table if not exists public.project_members (
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('admin', 'member')) default 'member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (project_id, user_id)
);

comment on table public.project_members is 'Relationship linking users to community projects.';
