-- 010_notifications.sql
-- User notifications

create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  link_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.notifications is 'User-specific notifications.';
