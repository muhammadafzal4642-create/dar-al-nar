# DAR AL NAR | دار النار — Luxury Omani Restaurant & Management Dashboard

A luxury Omani restaurant platform featuring modern culinary showcases, table reservations, private event inquiries, and an administrative management dashboard.

## Features

- **Luxury Guest Experience**: Bilingual (Arabic & English) presentation with smooth animations.
- **Reservation System**: Real-time table booking with authentic Omani reference numbering (`DAN-2026-XXXX`).
- **Private Dining & Event Inquiries**: Lead collection and event booking system.
- **Admin Management Dashboard**:
  - Live Overview & KPIs
  - Table Reservations Management
  - Culinary Menu Management
  - Private Event Inquiries
  - Restaurant Settings & Localization
- **Browser-Persisted Storage**: Standalone, persistent storage using `localStorage` — runs out of the box with zero database configuration required.

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## Administrator Access

- Click **Admin** in the navigation bar.
- **Default Username:** `admin`
- **Default Password:** `admin123456`

## Deploy to Vercel

1. Push your repository to GitHub.
2. In Vercel, import your repository.
3. The framework will automatically be detected as **Vite**.
4. Click **Deploy**.
