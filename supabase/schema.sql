create table if not exists public.restaurant_records (
  id text primary key,
  kind text not null check (kind in ('menu', 'reservation', 'inquiry', 'settings', 'system')),
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.restaurant_records enable row level security;

create or replace function public.is_restaurant_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant select, insert on public.restaurant_records to anon, authenticated;
grant update, delete on public.restaurant_records to authenticated;

drop policy if exists "public reads menu and settings" on public.restaurant_records;
create policy "public reads menu and settings"
  on public.restaurant_records for select
  using (kind in ('menu', 'settings') or public.is_restaurant_admin());

drop policy if exists "public creates bookings and inquiries" on public.restaurant_records;
create policy "public creates bookings and inquiries"
  on public.restaurant_records for insert
  with check (
    public.is_restaurant_admin()
    or (kind = 'reservation' and id like 'res-%' and data ->> 'status' = 'pending')
    or (kind = 'inquiry' and id like 'inq-%' and data ->> 'status' = 'new')
  );

drop policy if exists "admins update restaurant records" on public.restaurant_records;
create policy "admins update restaurant records"
  on public.restaurant_records for update
  using (public.is_restaurant_admin())
  with check (public.is_restaurant_admin());

drop policy if exists "admins delete restaurant records" on public.restaurant_records;
create policy "admins delete restaurant records"
  on public.restaurant_records for delete
  using (public.is_restaurant_admin());