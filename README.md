# GarantiCo - Balık Unu Corporate Website

Professional corporate website for fish meal and feed raw materials trading company.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Drizzle ORM
- **Deployment**: Vercel
- **i18n**: Next.js native i18n (TR/EN)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- NeonDB account (https://neon.tech)
- Vercel account (https://vercel.com)

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+905551234567
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Automated Setup

### NeonDB + Vercel Setup

For automated setup with NeonDB API and Vercel:

```bash
# Set your NeonDB API key
export NEON_API_KEY=your_neon_api_key

# Set your Vercel token (optional, will prompt for login)
export VERCEL_TOKEN=your_vercel_token

# Run automated setup
node scripts/setup-deployment.js
```

This script will:
1. Create a NeonDB project via API
2. Get the connection string
3. Link your project to Vercel
4. Set all environment variables in Vercel

### Manual Setup

#### NeonDB Setup

1. Get your API key from https://console.neon.tech
2. Run: `NEON_API_KEY=your_key node scripts/neondb-setup.js`
3. Copy the connection string to `.env.local`

#### Vercel Setup

1. Login: `vercel login`
2. Link project: `vercel link --name garantico-website`
3. Set environment variables:
   ```bash
   vercel env add DATABASE_URL production
   vercel env add NEXT_PUBLIC_APP_URL production
   vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
   ```

## Database

### Migrations

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Environment variables are automatically set (if using setup script)
4. Deploy!

Or use CLI:

```bash
vercel --prod
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── products/      # Products pages
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI primitives
│   └── ...               # Feature components
├── lib/                   # Utilities
│   ├── db/               # Database setup
│   └── i18n/             # i18n configuration
└── scripts/              # Setup scripts
```

## Features

- ✅ Multi-language support (TR/EN)
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Product inquiry forms
- ✅ WhatsApp integration
- ✅ Quality certificates showcase
- ✅ Product filtering and search

## License

Private - GarantiCo
