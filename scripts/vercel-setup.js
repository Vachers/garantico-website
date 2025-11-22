#!/usr/bin/env node

/**
 * Vercel Setup Script with Token Authentication
 * 
 * This script sets up Vercel project and environment variables using API token
 */

const { execSync } = require('child_process');
const https = require('https');

const VERCEL_API_BASE = 'https://api.vercel.com';

function makeVercelRequest(method, path, data = null, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(new Error(`Parse Error: ${body}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function getOrCreateProject(token, projectName = 'garantico-website') {
  try {
    // Try to find existing project
    const projects = await makeVercelRequest('GET', '/v9/projects', null, token);
    const existing = projects.projects?.find(p => p.name === projectName);
    
    if (existing) {
      console.log(`✓ Found existing project: ${projectName}`);
      return existing;
    }

    // Create new project
    console.log(`Creating new project: ${projectName}...`);
    const project = await makeVercelRequest('POST', '/v9/projects', {
      name: projectName,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: 'Vachers/garantico-website',
      },
    }, token);

    console.log(`✓ Project created: ${project.name}`);
    return project;
  } catch (error) {
    console.error('✗ Failed to get/create project:', error.message);
    throw error;
  }
}

async function setEnvironmentVariable(token, projectId, key, value, environments = ['production', 'preview', 'development']) {
  try {
    // First, check if variable exists
    const envVars = await makeVercelRequest('GET', `/v9/projects/${projectId}/env`, null, token);
    const existing = envVars.envs?.find(e => e.key === key);
    
    if (existing) {
      // Update existing variable
      console.log(`⚠ ${key} already exists, updating...`);
      for (const env of environments) {
        try {
          // Delete existing
          await makeVercelRequest('DELETE', `/v9/projects/${projectId}/env/${existing.id}`, null, token);
        } catch (e) {
          // Ignore if already deleted
        }
      }
    }
    
    // Create new variable for each environment
    for (const env of environments) {
      await makeVercelRequest('POST', `/v9/projects/${projectId}/env`, {
        key,
        value,
        type: 'encrypted',
        target: [env],
      }, token);
      console.log(`✓ Set ${key} for ${env}`);
    }
    return true;
  } catch (error) {
    if (error.message.includes('ENV_ALREADY_EXISTS') || error.message.includes('409')) {
      console.log(`⚠ ${key} already exists for some environments, skipping...`);
      return true; // Not a critical error
    } else {
      console.error(`✗ Failed to set ${key}:`, error.message);
      return false;
    }
  }
}

async function main() {
  const token = process.env.VERCEL_TOKEN;
  
  if (!token) {
    console.error('✗ VERCEL_TOKEN environment variable is required');
    console.log('\nTo get your Vercel token:');
    console.log('1. Go to https://vercel.com/account/tokens');
    console.log('2. Create a new token');
    console.log('3. Set it as: export VERCEL_TOKEN=your_token_here');
    console.log('\nOr use: vercel login (for interactive setup)');
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://garantico-website.vercel.app';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+905551234567';

  try {
    console.log('\n🚀 Setting up Vercel project...\n');

    // Get or create project
    const project = await getOrCreateProject(token);

    // Set environment variables
    console.log('\n📝 Setting environment variables...\n');

    if (connectionString) {
      await setEnvironmentVariable(token, project.id, 'DATABASE_URL', connectionString);
    } else {
      console.log('⚠ DATABASE_URL not provided, skipping...');
    }

    await setEnvironmentVariable(token, project.id, 'NEXT_PUBLIC_APP_URL', appUrl);
    await setEnvironmentVariable(token, project.id, 'NEXT_PUBLIC_WHATSAPP_NUMBER', whatsappNumber);

    console.log('\n✅ Vercel setup complete!');
    console.log(`\nProject: ${project.name}`);
    console.log(`URL: https://${project.name}.vercel.app`);
    console.log('\nNext steps:');
    console.log('1. Push to GitHub to trigger auto-deployment');
    console.log('2. Or deploy manually: vercel --prod');

  } catch (error) {
    console.error('\n✗ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { getOrCreateProject, setEnvironmentVariable };

