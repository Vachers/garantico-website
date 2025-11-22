#!/usr/bin/env node

/**
 * NeonDB API Integration Script
 * 
 * This script helps set up NeonDB database via API
 * Requires NEON_API_KEY environment variable
 */

const https = require('https');

const NEON_API_BASE = 'https://console.neon.tech/api/v2';

async function makeRequest(method, path, data = null, apiKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'console.neon.tech',
      path: `/api/v2${path}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

async function createProject(apiKey, projectName = 'garantico-db') {
  try {
    console.log('Creating NeonDB project...');
    const response = await makeRequest('POST', '/projects', {
      project: {
        name: projectName,
        region_id: 'aws-eu-central-1', // Default to EU region
      },
    }, apiKey);

    console.log('✓ Project created:', response.project.id);
    return response.project;
  } catch (error) {
    console.error('✗ Failed to create project:', error.message);
    throw error;
  }
}

async function createBranch(apiKey, projectId, branchName = 'main') {
  try {
    console.log('Creating database branch...');
    const response = await makeRequest('POST', `/projects/${projectId}/branches`, {
      branch: {
        name: branchName,
      },
    }, apiKey);

    console.log('✓ Branch created:', response.branch.id);
    return response.branch;
  } catch (error) {
    console.error('✗ Failed to create branch:', error.message);
    throw error;
  }
}

async function getConnectionString(apiKey, projectId, branchId) {
  try {
    console.log('Fetching connection string...');
    const response = await makeRequest('GET', `/projects/${projectId}/branches/${branchId}/connection_strings`, null, apiKey);
    
    const connectionString = response.connection_strings?.transaction || response.connection_strings?.session;
    console.log('✓ Connection string retrieved');
    return connectionString;
  } catch (error) {
    console.error('✗ Failed to get connection string:', error.message);
    throw error;
  }
}

async function main() {
  const apiKey = process.env.NEON_API_KEY;
  
  if (!apiKey) {
    console.error('✗ NEON_API_KEY environment variable is required');
    console.log('\nTo get your API key:');
    console.log('1. Go to https://console.neon.tech');
    console.log('2. Navigate to Account Settings > Developer Settings');
    console.log('3. Create a new API key');
    console.log('4. Set it as: export NEON_API_KEY=your_key_here');
    process.exit(1);
  }

  try {
    const project = await createProject(apiKey);
    const branch = await createBranch(apiKey, project.id);
    const connectionString = await getConnectionString(apiKey, project.id, branch.id);

    console.log('\n✓ NeonDB setup complete!');
    console.log('\nConnection String:');
    console.log(connectionString);
    console.log('\nAdd this to your .env.local file:');
    console.log(`DATABASE_URL="${connectionString}"`);
    console.log('\nOr set it in Vercel:');
    console.log(`vercel env add DATABASE_URL production <<< "${connectionString}"`);

    return connectionString;
  } catch (error) {
    console.error('\n✗ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createProject, createBranch, getConnectionString };

