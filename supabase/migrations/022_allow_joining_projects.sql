-- 022_allow_joining_projects.sql
-- Allow authenticated users to join projects

create policy "Users can join projects" on public.project_members 
for insert 
with check (auth.uid() = user_id);
