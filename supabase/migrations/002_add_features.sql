alter table public.advisories 
add column if not exists weather_condition text,
add column if not exists soil_type text;
