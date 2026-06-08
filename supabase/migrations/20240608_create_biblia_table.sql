create table if not exists public.biblia (
  id bigint generated always as identity primary key,
  email text not null,
  book text not null,
  chapter integer not null,
  verse integer not null,
  content text not null,
  version text,
  added_at timestamp with time zone default now()
);

-- Grant public read/write access for the anon role
grant select, insert, update, delete on public.biblia to anon;
