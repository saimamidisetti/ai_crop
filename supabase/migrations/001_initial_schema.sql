create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    created_at timestamptz default now()
);

create table if not exists public.advisories (
    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    crop_name text not null,
    growth_stage text not null,
    location text not null,
    problem_description text not null,
    additional_information text,

    analysis text not null,
    possible_causes jsonb default '[]'::jsonb,
    recommended_actions jsonb default '[]'::jsonb,
    prevention_tips jsonb default '[]'::jsonb,
    warning text,

    created_at timestamptz default now()
);

-- Indexes for better query performance
create index if not exists advisories_user_id_idx on public.advisories (user_id);
create index if not exists advisories_created_at_idx on public.advisories (created_at desc);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.advisories enable row level security;

-- Policies for profiles
create policy "Users can view own profile" 
    on public.profiles for select 
    using (auth.uid() = id);

create policy "Users can insert own profile" 
    on public.profiles for insert 
    with check (auth.uid() = id);

create policy "Users can update own profile" 
    on public.profiles for update 
    using (auth.uid() = id);

-- Policies for advisories
create policy "Users can view own advisories" 
    on public.advisories for select 
    using (auth.uid() = user_id);

create policy "Users can create own advisories" 
    on public.advisories for insert 
    with check (auth.uid() = user_id);

create policy "Users can update own advisories" 
    on public.advisories for update 
    using (auth.uid() = user_id);

create policy "Users can delete own advisories" 
    on public.advisories for delete 
    using (auth.uid() = user_id);
