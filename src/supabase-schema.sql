-- Schema di riferimento per quando collegheremo Supabase.
-- Rispecchia esattamente i tipi in types/finance.ts.
-- Da eseguire nel SQL Editor di Supabase quando si fa il passaggio.

create table family_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null default '#736B58',
  created_at timestamptz default now()
);

create type transaction_type as enum ('expense', 'income');
create type recurrence_frequency as enum ('weekly', 'monthly', 'quarterly', 'yearly');

create table transactions (
  id uuid primary key default gen_random_uuid(),
  amount numeric(12, 2) not null check (amount > 0),
  type transaction_type not null,
  description text not null,
  date date not null,
  member_id uuid not null references family_members(id) on delete restrict,
  is_recurring boolean not null default false,
  frequency recurrence_frequency,
  created_at timestamptz default now()
);

create table wealth_snapshot (
  id uuid primary key default gen_random_uuid(),
  initial_amount numeric(12, 2) not null,
  initial_date date not null,
  updated_at timestamptz default now()
);

-- Riga unica: il patrimonio iniziale è un singolo valore per famiglia.
insert into wealth_snapshot (initial_amount, initial_date) values (10992, '2026-01-01');

-- Row Level Security: da configurare in base a come gestirai
-- l'autenticazione familiare (es. tutti i membri loggati possono leggere/scrivere).
alter table family_members enable row level security;
alter table transactions enable row level security;
alter table wealth_snapshot enable row level security;
