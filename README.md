<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/be9fc2f2-d8b9-47ea-95b2-c73f3c31afe5

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local` to your own login credentials. Keep these variables server-only; do not add the `VITE_` prefix. Leave the `VITE_SUPABASE_*` values blank for local login.
4. Start the app with `npm run dev` and open `http://localhost:3000`.
5. Choose **Admin Dashboard** and sign in with the credentials from `.env.local`. Use the sign-out icon in the dashboard header to log out.

Local admin sessions are validated by the Vite development server and expire after eight hours. Restaurant data is stored in this browser's local storage when Supabase is not configured.

## Supabase Deployment

For a shared, persistent database, add the Supabase URL and publishable key to `.env.local`, then run [supabase/schema.sql](supabase/schema.sql) in the Supabase SQL Editor. Enable email/password authentication, create an administrator user, and assign its server-managed role with:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@example.com';
```

The first authorized admin sign-in seeds the initial menu and restaurant settings. Public visitors can submit reservations and inquiries, but only users with the server-managed `admin` role can read private records or change/delete database records. Never place a Supabase service-role key in this frontend.
