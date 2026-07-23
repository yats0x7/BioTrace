-- 009_alerts.sql
-- Rare species, threat, and system alerts

create table if not exists public.alerts (
  id uuid default uuid_generate_v4() primary key,
  alert_type text check (alert_type in ('rare_species', 'threat', 'system')) not null,
  title text not null,
  message text not null,
  observation_id uuid references public.observations(id) on delete cascade,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.alerts is 'System-wide and ecological alerts.';
