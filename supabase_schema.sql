-- =========================================================
-- ComboBite Supabase Database Schema
-- Run this in the Supabase SQL Editor: Dashboard -> SQL Editor
-- =========================================================

-- 1. Profiles Table (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  role text default 'Food Explorer 👀',
  favorite_foods text[] default '{}',
  personality text default 'Curious Explorer 🤠',
  badges text[] default '{"food_explorer"}',
  combos_added int default 0,
  combos_rated int default 0,
  favorites text[] default '{}',
  onboarding_completed boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

create policy "Users can insert their own profile." 
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile." 
  on public.profiles for update using (auth.uid() = id);

-- Trigger to automatically create a profile row whenever a new user signs up in auth.users
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url, role, onboarding_completed)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || new.id),
    'Food Explorer 👀',
    false
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Combinations Table
create table if not exists public.combinations (
  id text primary key,
  title text not null,
  main_food_name text not null,
  combo_food_name text not null,
  category text default 'Kerala Specials',
  image_url text,
  description text,
  why_like text,
  weirdness_score int default 1,
  rating_avg numeric(3,2) default 5.0,
  rating_count int default 1,
  reactions jsonb default '{"amazing": 1, "good": 0, "okay": 0, "weird": 0, "cursed": 0}'::jsonb,
  votes_normal int default 1,
  votes_cursed int default 0,
  is_kerala_special boolean default false,
  featured boolean default false,
  trending boolean default true,
  created_by text,
  user_id uuid references auth.users(id) on delete set null,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on combinations
alter table public.combinations enable row level security;

create policy "Combinations are viewable by everyone." 
  on public.combinations for select using (true);

create policy "Authenticated users can create combinations." 
  on public.combinations for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own combinations." 
  on public.combinations for update using (auth.uid() = user_id);

-- 3. Comments Table
create table if not exists public.comments (
  id text primary key,
  combo_id text references public.combinations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  user_name text not null,
  user_avatar text,
  content text not null,
  likes int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on comments
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone." 
  on public.comments for select using (true);

create policy "Authenticated users can create comments." 
  on public.comments for insert with check (auth.role() = 'authenticated');

