-- 017_identifications_update.sql
-- Update identifications table to support the real ML API contract

alter table public.identifications
  add column if not exists sequence_id text,
  add column if not exists is_confident boolean default false,
  add column if not exists is_confused boolean default false,
  add column if not exists top_candidates jsonb,
  add column if not exists species_details jsonb,
  add column if not exists raw_response jsonb;

-- Ensure that a single sample can have multiple sequences, 
-- but normally if it's the same sequence_id for the same sample, it should be unique.
-- We will just allow multiple rows per sample_id.
