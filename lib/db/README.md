# Database Setup

## NeonDB Connection

This project uses NeonDB (PostgreSQL) with Drizzle ORM.

### Setup Steps

1. Create a NeonDB account at https://neon.tech
2. Create a new project and database
3. Copy your connection string
4. Add it to `.env.local`:

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

### Running Migrations

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### Database Studio

```bash
npm run db:studio
```

