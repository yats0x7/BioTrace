-- 016_seed.sql
-- Insert realistic demo data

-- Species Cache
insert into public.species_cache (scientific_name, common_name, description, habitat, threats, protection_status)
values 
('Ursus arctos', 'Brown Bear', 'Large bear species found across Eurasia and North America.', 'Forests, mountains, and tundra.', 'Habitat loss, hunting', 'Least Concern'),
('Panthera tigris', 'Tiger', 'The largest living cat species.', 'Forests, grasslands, and swamps.', 'Poaching, habitat fragmentation', 'Endangered'),
('Haliaeetus leucocephalus', 'Bald Eagle', 'A bird of prey found in North America.', 'Near large bodies of open water with an abundant food supply.', 'Habitat destruction', 'Least Concern')
on conflict (scientific_name) do nothing;

-- Projects (Without created_by since we do not have guaranteed auth.users IDs in seed)
insert into public.projects (id, name, description, visibility)
values 
(uuid_generate_v4(), 'Global eDNA River Survey', 'Mapping biodiversity across major river systems to track aquatic health and invasive species.', 'public'),
(uuid_generate_v4(), 'Urban Canopy Assessment', 'Tracking species in metropolitan areas to understand urban adaptation.', 'public');

-- Alerts
insert into public.alerts (alert_type, title, message)
values 
('system', 'System Maintenance', 'Scheduled maintenance on Saturday 2AM UTC. Uploads will be paused.'),
('rare_species', 'Rare species detected', 'A snow leopard was detected in the Himalayas survey project.');

-- Note: We do not seed notifications or samples because they require valid foreign keys to profiles (which depend on auth.users).
