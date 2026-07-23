-- 015_triggers.sql
-- Triggers for automation and constraints

-- Updated At trigger function
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger set_projects_updated_at before update on public.projects for each row execute procedure public.set_updated_at();
create trigger set_samples_updated_at before update on public.samples for each row execute procedure public.set_updated_at();
create trigger set_identifications_updated_at before update on public.identifications for each row execute procedure public.set_updated_at();

-- Profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Ensure the trigger is only created once
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update user stats on upload
create or replace function public.increment_user_stats()
returns trigger as $$
begin
  update public.profiles
  set total_uploads = total_uploads + 1
  where id = new.uploader_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_sample_uploaded
  after insert on public.samples
  for each row execute procedure public.increment_user_stats();

-- Activity Logging for project creation
create or replace function public.log_project_creation()
returns trigger as $$
begin
  insert into public.activity_logs (user_id, action, entity_type, entity_id)
  values (new.created_by, 'created_project', 'project', new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_project_created
  after insert on public.projects
  for each row execute procedure public.log_project_creation();
