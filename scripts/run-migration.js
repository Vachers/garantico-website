#!/usr/bin/env node

/**
 * Run Database Migration
 * 
 * This script runs database migrations using Drizzle Kit
 */

const { execSync } = require('child_process');

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is not set');
    console.log('\nPlease set DATABASE_URL:');
    console.log('  $env:DATABASE_URL="your-connection-string"');
    console.log('  npm run db:push');
    process.exit(1);
  }

  try {
    console.log('🔄 Running database migration...\n');
    execSync('npm run db:push', { stdio: 'inherit' });
    console.log('\n✅ Database migration completed successfully!');
  } catch (error) {
    console.error('\n✗ Migration failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };

