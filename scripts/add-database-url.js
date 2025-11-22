#!/usr/bin/env node

/**
 * Add DATABASE_URL to Vercel
 * 
 * Usage:
 *   VERCEL_TOKEN=token DATABASE_URL=connection_string node scripts/add-database-url.js
 */

const { getOrCreateProject, setEnvironmentVariable } = require('./vercel-setup');

async function main() {
  const token = process.env.VERCEL_TOKEN;
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!token) {
    console.error('✗ VERCEL_TOKEN environment variable is required');
    process.exit(1);
  }
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is required');
    console.log('\nTo get your NeonDB connection string:');
    console.log('1. Go to https://console.neon.tech');
    console.log('2. Select your project');
    console.log('3. Look for "Connection string" or "Connect" button');
    console.log('4. Copy the connection string');
    console.log('\nThen run:');
    console.log('  export DATABASE_URL="postgresql://..."');
    console.log('  node scripts/add-database-url.js');
    process.exit(1);
  }

  try {
    console.log('🚀 Adding DATABASE_URL to Vercel...\n');
    
    const project = await getOrCreateProject(token, 'garantico-website');
    await setEnvironmentVariable(token, project.id, 'DATABASE_URL', databaseUrl);
    
    console.log('\n✅ DATABASE_URL added successfully!');
    console.log(`\nProject: ${project.name}`);
    console.log(`URL: https://${project.name}.vercel.app`);
    
  } catch (error) {
    console.error('\n✗ Failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

