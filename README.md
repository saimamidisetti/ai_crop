# CropCare AI – Smart Crop Advisory Assistant

CropCare AI is a full-stack web application designed to provide instant, AI-powered agricultural advisory for farmers based on their crop symptoms, growth stage, and location.

## Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router, React Hook Form, Zod
- **Backend**: Node.js, Express.js, Zod
- **Database & Authentication**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **AI Integration**: Google Gemini (`@google/genai`)

## Features

- User Authentication (Signup, Login, Logout)
- Protected routes
- Row Level Security (RLS) for data privacy
- AI-powered crop advisory generation
- Advisory history and detailed views
- Deleting advisories

## Folder Structure

```
cropcare-ai/
├── client/          # React Frontend (Vite)
├── server/          # Express Backend
└── supabase/        # Database Migrations
```

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [database.new](https://database.new)
2. Go to the SQL Editor and run the migration script located in `supabase/migrations/001_initial_schema.sql`
3. Get your Supabase URL, Anon Key, and Service Role Key from Project Settings > API.

### 2. Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Get an API key.

### 3. Environment Variables

Create a `.env` file in the `server` directory based on `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Create a `.env` file in the `client` directory based on `client/.env.example`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_or_anon_key
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Running the Application

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

## Deployment Preparation

- **Frontend**: Can be deployed to Vercel. Make sure to set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_BASE_URL` (pointing to the deployed backend).
- **Backend**: Can be deployed to Render. Make sure to configure CORS with the production frontend URL and set all required environment variables securely. Do not expose `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to the frontend.
