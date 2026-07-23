-- 021_seed_projects.sql
-- Mock Projects for Phase 7 MVP

-- We use hardcoded UUIDs so the application can safely reference them in frontend mocks
-- Global eDNA River Survey
INSERT INTO public.projects (id, name, description, visibility, created_at, updated_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Global eDNA River Survey',
  'Mapping biodiversity across major river systems to monitor aquatic ecosystem health, invasive species, and conservation priorities using environmental DNA.',
  'public',
  timezone('utc'::text, now()) - interval '2 hours',
  timezone('utc'::text, now()) - interval '2 hours'
) ON CONFLICT (id) DO NOTHING;

-- Urban Canopy Assessment
INSERT INTO public.projects (id, name, description, visibility, created_at, updated_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Urban Canopy Assessment',
  'Monitoring urban biodiversity by collecting eDNA from parks, lakes, and green spaces to understand ecological adaptation in metropolitan environments.',
  'public',
  timezone('utc'::text, now()) - interval '2 hours',
  timezone('utc'::text, now()) - interval '2 hours'
) ON CONFLICT (id) DO NOTHING;
