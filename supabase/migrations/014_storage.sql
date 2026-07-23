-- 014_storage.sql
-- Storage bucket creation and policies

-- Create buckets
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('edna-files', 'edna-files', false) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('species-images', 'species-images', true) on conflict do nothing;

-- Policies for avatars (public read, owner write)
create policy "Avatars are publicly accessible." on storage.objects for select using (bucket_id = 'avatars');
create policy "Users can upload their own avatar." on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid() = owner);
create policy "Users can update their own avatar." on storage.objects for update using (bucket_id = 'avatars' and auth.uid() = owner);

-- Policies for edna-files (owner read/write)
create policy "Users can read own edna files." on storage.objects for select using (bucket_id = 'edna-files' and auth.uid() = owner);
create policy "Users can upload own edna files." on storage.objects for insert with check (bucket_id = 'edna-files' and auth.uid() = owner);

-- Policies for project-images (public read, authenticated write)
create policy "Project images are publicly accessible." on storage.objects for select using (bucket_id = 'project-images');
create policy "Authenticated can upload project images." on storage.objects for insert with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

-- Policies for species-images (public read, authenticated write)
create policy "Species images are publicly accessible." on storage.objects for select using (bucket_id = 'species-images');
create policy "Authenticated can upload species images." on storage.objects for insert with check (bucket_id = 'species-images' and auth.role() = 'authenticated');
