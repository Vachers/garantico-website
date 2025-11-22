#!/usr/bin/env node

/**
 * Complete Deployment Setup Script
 * 
 * This script automates:
 * 1. NeonDB database creation via API
 * 2. Vercel project setup
 * 3. Environment variables configuration
 */

const { execSync } = require('child_process');
const { createProject, createBranch, getConnectionString } = require('./neondb-setup');
const { getOrCreateProject, setEnvironmentVariable } = require('./vercel-setup');

async function setupNeonDB() {
  const apiKey = process.env.NEON_API_KEY;
  
  if (!apiKey) {
    console.log('⚠ NEON_API_KEY not found. Skipping NeonDB setup.');
    console.log('You can set it up manually at https://console.neon.tech');
    return null;
  }

  try {
    console.log('\n📦 Setting up NeonDB...\n');
    const project = await createProject(apiKey, 'garantico-db');
    const branch = await createBranch(apiKey, project.id);
    const connectionString = await getConnectionString(apiKey, project.id, branch.id);
    
    console.log('\n✓ NeonDB setup complete!\n');
    return connectionString;
  } catch (error) {
    console.error('✗ NeonDB setup failed:', error.message);
    return null;
  }
}

async function setupVercel(connectionString) {
  console.log('\n🚀 Setting up Vercel...\n');

  const token = process.env.VERCEL_TOKEN;
  
  if (token) {
    // Use API token method
    try {
      const project = await getOrCreateProject(token, 'garantico-website');
      
      const envVars = {
        DATABASE_URL: connectionString || process.env.DATABASE_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://garantico-website.vercel.app',
        NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905551234567',
      };

      console.log('\n📝 Setting environment variables via API...\n');

      for (const [key, value] of Object.entries(envVars)) {
        if (value) {
          await setEnvironmentVariable(token, project.id, key, value);
        } else {
          console.log(`⚠ Skipping ${key} (no value provided)`);
        }
      }

      console.log('\n✓ Vercel setup complete via API!\n');
      return;
    } catch (error) {
      console.error('✗ API setup failed, falling back to CLI:', error.message);
    }
  }

  // Fallback to CLI method
  try {
    console.log('Using Vercel CLI method...');
    
    // Check if already linked
    let projectId;
    try {
      const linkOutput = execSync('vercel ls --json', { encoding: 'utf-8', stdio: 'pipe' });
      const projects = JSON.parse(linkOutput);
      projectId = projects.find(p => p.name === 'garantico-website')?.id;
    } catch (e) {
      // Not linked yet
    }

    if (!projectId) {
      console.log('Linking project to Vercel...');
      execSync('vercel link --yes --name garantico-website', { stdio: 'inherit' });
    }

    // Set environment variables
    const envVars = {
      DATABASE_URL: connectionString || process.env.DATABASE_URL || 'your_neondb_connection_string',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://garantico-website.vercel.app',
      NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905551234567',
    };

    console.log('\n📝 Setting environment variables...\n');

    for (const [key, value] of Object.entries(envVars)) {
      if (value && value !== 'your_neondb_connection_string') {
        try {
          // Set for production
          execSync(`echo "${value}" | vercel env add ${key} production`, { stdio: 'pipe' });
          console.log(`✓ Set ${key} for production`);
          
          // Set for preview
          execSync(`echo "${value}" | vercel env add ${key} preview`, { stdio: 'pipe' });
          console.log(`✓ Set ${key} for preview`);
          
          // Set for development
          execSync(`echo "${value}" | vercel env add ${key} development`, { stdio: 'pipe' });
          console.log(`✓ Set ${key} for development`);
        } catch (error) {
          console.log(`⚠ Could not set ${key} (may already exist)`);
        }
      } else {
        console.log(`⚠ Skipping ${key} (no value provided)`);
      }
    }

    console.log('\n✓ Vercel setup complete!\n');
  } catch (error) {
    console.error('✗ Vercel setup failed:', error.message);
    console.log('\nMake sure you are logged in: vercel login');
    console.log('Or set VERCEL_TOKEN environment variable');
  }
}

async function main() {
  console.log('🎯 GarantiCo Deployment Setup');
  console.log('============================\n');

  // Step 1: Setup NeonDB
  const connectionString = await setupNeonDB();

  // Step 2: Setup Vercel
  await setupVercel(connectionString);

  console.log('\n✅ Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run database migrations: npm run db:push');
  console.log('2. Deploy to Vercel: vercel --prod');
  console.log('\nOr push to GitHub and Vercel will auto-deploy!');
}

if (require.main === module) {
  main();
}

module.exports = { setupNeonDB, setupVercel };

