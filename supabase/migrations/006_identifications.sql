-- 006_identifications.sql
-- ML prediction results

create table if not exists public.identifications (
  id uuid default uuid_generate_v4() primary key,
  sample_id uuid references public.samples(id) on delete cascade not null,
  scientific_name text not null,
  confidence double precision check (confidence >= 0 and confidence <= 1),
  processing_status text check (processing_status in ('pending', 'completed', 'failed')) default 'pending',
  identified_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.identifications is 'ML prediction results for species in eDNA samples.';
