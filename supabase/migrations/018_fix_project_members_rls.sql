-- 018_fix_project_members_rls.sql
-- Fix infinite recursion in project_members policy

-- Drop the recursive ALL policy
drop policy if exists "Admins can manage members" on public.project_members;

-- Recreate policies for specific actions to prevent triggering during SELECT
create policy "Admins can insert members" on public.project_members for insert with check (
  exists (select 1 from public.project_members where project_id = project_members.project_id and user_id = auth.uid() and role = 'admin')
);

create policy "Admins can update members" on public.project_members for update using (
  exists (select 1 from public.project_members where project_id = project_members.project_id and user_id = auth.uid() and role = 'admin')
);

create policy "Admins can delete members" on public.project_members for delete using (
  exists (select 1 from public.project_members where project_id = project_members.project_id and user_id = auth.uid() and role = 'admin')
);
