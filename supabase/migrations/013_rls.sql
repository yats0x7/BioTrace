-- 013_rls.sql
-- Enable Row Level Security and create policies

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.samples enable row level security;
alter table public.identifications enable row level security;
alter table public.species_cache enable row level security;
alter table public.observations enable row level security;
alter table public.alerts enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

-- Profiles: viewable by all, updatable by self
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Projects: viewable by all (public) or members (private), insertable by auth, updatable by admins
create policy "Public projects viewable by everyone" on public.projects for select using (visibility = 'public');
create policy "Private projects viewable by members" on public.projects for select using (
  visibility = 'private' and exists (select 1 from public.project_members where project_id = id and user_id = auth.uid())
);
create policy "Users can insert projects" on public.projects for insert with check (auth.uid() = created_by);
create policy "Project admins can update" on public.projects for update using (
  exists (select 1 from public.project_members where project_id = id and user_id = auth.uid() and role = 'admin')
);

-- Project Members: viewable by everyone, insert/update by admins
create policy "Project members viewable" on public.project_members for select using (true);
create policy "Admins can manage members" on public.project_members for all using (
  exists (select 1 from public.project_members where project_id = project_members.project_id and user_id = auth.uid() and role = 'admin')
);

-- Samples: public viewable, private viewable by uploader/project members, updatable by uploader
create policy "Public samples viewable" on public.samples for select using (visibility = 'public');
create policy "Uploader can view own samples" on public.samples for select using (uploader_id = auth.uid());
create policy "Project members can view samples" on public.samples for select using (
  exists (select 1 from public.project_members where project_id = samples.project_id and user_id = auth.uid())
);
create policy "Users can upload samples" on public.samples for insert with check (auth.uid() = uploader_id);
create policy "Uploaders can update samples" on public.samples for update using (auth.uid() = uploader_id);

-- Identifications: viewable if sample is viewable
create policy "Identifications viewable if sample is viewable" on public.identifications for select using (
  exists (select 1 from public.samples where id = sample_id)
);
create policy "Authenticated can insert identifications" on public.identifications for insert with check (auth.role() = 'authenticated');

-- Species Cache: viewable by all, insertable by backend (auth for now)
create policy "Species cache viewable by everyone" on public.species_cache for select using (true);
create policy "Authenticated can insert species" on public.species_cache for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update species" on public.species_cache for update using (auth.role() = 'authenticated');

-- Observations: viewable by all
create policy "Observations viewable by everyone" on public.observations for select using (true);
create policy "Users can create observations" on public.observations for insert with check (auth.role() = 'authenticated');
create policy "Users can update own observations" on public.observations for update using (user_id = auth.uid());

-- Alerts: viewable by all
create policy "Alerts viewable by everyone" on public.alerts for select using (true);

-- Notifications: viewable/updatable by owner
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- Activity Logs: viewable by all (for transparency)
create policy "Activity logs viewable by everyone" on public.activity_logs for select using (true);
