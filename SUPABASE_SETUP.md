# Supabase Storage Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (2-3 minutes)

## 2. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Add them to your `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Create Storage Buckets

In your Supabase dashboard:

1. Go to **Storage** → **Buckets**
2. Create these buckets:
   - `properties` (for property images)
   - `profiles` (for user profile images)
   - `temp` (for temporary uploads)

## 4. Set Storage Policies

Go to **Storage** → **Policies** and add these policies:

### Properties Bucket Policy:
```sql
-- Allow authenticated users to upload to properties bucket
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Allow authenticated uploads to properties',
  'properties',
  'bucket_id = ''properties'' AND auth.role() = ''authenticated'''
);

-- Allow public read access to properties
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Allow public read access to properties',
  'properties',
  'bucket_id = ''properties'' AND true'
);
```

### Profiles Bucket Policy:
```sql
-- Allow users to upload their own profile images
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Allow users to upload own profile',
  'profiles',
  'bucket_id = ''profiles'' AND auth.uid()::text = (storage.foldername(name))[1]'
);

-- Allow public read access to profiles
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Allow public read access to profiles',
  'profiles',
  'bucket_id = ''profiles'' AND true'
);
```

## 5. Test the Setup

Run the development server and test image uploads:

```bash
npm run dev
```

The Supabase Storage service will handle:
- ✅ File uploads with progress
- ✅ Image optimization and resizing
- ✅ CDN delivery for fast loading
- ✅ Secure access controls
- ✅ Automatic cleanup and management
