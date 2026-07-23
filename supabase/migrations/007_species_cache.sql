-- 007_species_cache.sql
-- Cached external biodiversity information

create table if not exists public.species_cache (
  scientific_name text primary key,
  common_name text,
  description text,
  ai_summary text,
  habitat text,
  threats text,
  protection_status text,
  taxonomy_json jsonb,
  image_url text,
  wikipedia_url text,
  gbif_json jsonb,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.species_cache is 'Cached external biodiversity information.';
