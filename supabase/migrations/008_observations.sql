-- 008_observations.sql
-- Finalized observations linking users, samples, and identifications

create table if not exists public.observations (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  sample_id uuid references public.samples(id) on delete cascade,
  identification_id uuid references public.identifications(id) on delete cascade,
  scientific_name text references public.species_cache(scientific_name) on delete set null,
  notes text,
  observed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.observations is 'Connects projects, users, samples, and identifications into finalized observations.';
