-- 012_indexes.sql
-- Indexes for foreign keys and frequently queried columns

-- Profiles
create index if not exists idx_profiles_created_at on public.profiles(created_at);

-- Projects
create index if not exists idx_projects_created_by on public.projects(created_by);

-- Project Members
create index if not exists idx_project_members_user on public.project_members(user_id);

-- Samples
create index if not exists idx_samples_uploader on public.samples(uploader_id);
create index if not exists idx_samples_project on public.samples(project_id);
create index if not exists idx_samples_coordinates on public.samples using gist (coordinates);

-- Identifications
create index if not exists idx_identifications_sample on public.identifications(sample_id);
create index if not exists idx_identifications_name on public.identifications(scientific_name);

-- Observations
create index if not exists idx_observations_project on public.observations(project_id);
create index if not exists idx_observations_user on public.observations(user_id);
create index if not exists idx_observations_sample on public.observations(sample_id);
create index if not exists idx_observations_name on public.observations(scientific_name);

-- Alerts
create index if not exists idx_alerts_type on public.alerts(alert_type);

-- Notifications
create index if not exists idx_notifications_user on public.notifications(user_id);
create index if not exists idx_notifications_unread on public.notifications(user_id) where not is_read;

-- Activity Logs
create index if not exists idx_activity_logs_user on public.activity_logs(user_id);
