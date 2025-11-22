# Deployment Guide

## Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel:
   - `DATABASE_URL`: Your NeonDB connection string
   - `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., https://garantico.com)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp Business number

## NeonDB Setup

1. Create a NeonDB account at https://neon.tech
2. Create a new project
3. Copy your connection string
4. Run migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Environment Variables

Create a `.env.local` file for local development:

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+905551234567
```

## Build and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database Migrations

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

