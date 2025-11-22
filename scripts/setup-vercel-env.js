#!/usr/bin/env node

/**
 * Quick Vercel Environment Variables Setup
 * 
 * Usage:
 *   VERCEL_TOKEN=your_token node scripts/setup-vercel-env.js
 * 
 * Or set environment variables:
 *   export VERCEL_TOKEN=your_token
 *   export DATABASE_URL=your_neondb_url
 *   node scripts/setup-vercel-env.js
 */

const { getOrCreateProject, setEnvironmentVariable } = require('./vercel-setup');

async function main() {
  const token = process.env.VERCEL_TOKEN;
  
  if (!token) {
    console.error('✗ VERCEL_TOKEN environment variable is required');
    console.log('\n📝 To get your Vercel token:');
    console.log('1. Go to https://vercel.com/account/tokens');
    console.log('2. Click "Create Token"');
    console.log('3. Give it a name (e.g., "GarantiCo Setup")');
    console.log('4. Copy the token');
    console.log('\nThen run:');
    console.log('  export VERCEL_TOKEN=your_token_here');
    console.log('  node scripts/setup-vercel-env.js');
    process.exit(1);
  }

  console.log('🚀 Setting up Vercel Environment Variables...\n');

  try {
    // Get or create project
    const project = await getOrCreateProject(token, 'garantico-website');
    console.log(`✓ Project: ${project.name} (${project.id})\n`);

    // Get values from environment or prompt
    const databaseUrl = process.env.DATABASE_URL;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${project.name}.vercel.app`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905551234567';

    console.log('📝 Setting environment variables...\n');

    if (databaseUrl) {
      await setEnvironmentVariable(token, project.id, 'DATABASE_URL', databaseUrl);
    } else {
      console.log('⚠ DATABASE_URL not provided. Skipping...');
      console.log('   Set it manually in Vercel dashboard or provide it as:');
      console.log('   export DATABASE_URL=your_neondb_connection_string');
    }

    await setEnvironmentVariable(token, project.id, 'NEXT_PUBLIC_APP_URL', appUrl);
    await setEnvironmentVariable(token, project.id, 'NEXT_PUBLIC_WHATSAPP_NUMBER', whatsappNumber);

    console.log('\n✅ Environment variables setup complete!');
    console.log(`\n🌐 Project URL: https://${project.name}.vercel.app`);
    console.log('\n📋 Summary:');
    console.log(`   - DATABASE_URL: ${databaseUrl ? '✓ Set' : '✗ Not set (set manually)'}`);
    console.log(`   - NEXT_PUBLIC_APP_URL: ${appUrl}`);
    console.log(`   - NEXT_PUBLIC_WHATSAPP_NUMBER: ${whatsappNumber}`);
    console.log('\n💡 Next steps:');
    console.log('   1. If DATABASE_URL is not set, add it manually in Vercel dashboard');
    console.log('   2. Push to GitHub to trigger deployment');
    console.log('   3. Or deploy manually: vercel --prod');

  } catch (error) {
    console.error('\n✗ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };

