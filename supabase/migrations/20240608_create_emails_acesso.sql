create table if not exists public.emails_acesso (
  id bigint generated always as identity primary key,
  email text not null,
  tipo_acesso text not null,
  expira_em timestamptz not null,
  device_id text,
  created_at timestamptz default now()
);

-- allow anon role to read/write access control data
grant select, insert, update, delete on public.emails_acesso to anon;
