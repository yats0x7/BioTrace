-- 005_samples.sql
-- Uploaded eDNA samples

create table if not exists public.samples (
  id uuid default uuid_generate_v4() primary key,
  uploader_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade,
  file_name text not null,
  storage_url text not null,
  coordinates geography(point, 4326),
  ecosystem text,
  upload_status text check (upload_status in ('pending', 'processing', 'completed', 'failed')) default 'pending',
  visibility text check (visibility in ('public', 'private')) default 'public',
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.samples is 'Uploaded eDNA samples and their metadata.';
