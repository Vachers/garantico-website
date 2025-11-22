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
          if (!body || body.trim() === '') {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({});
            } else {
              reject(new Error(`API Error: ${res.statusCode} - Empty response`));
            }
            return;
          }
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(new Error(`Parse Error: ${body.substring(0, 200)}`));
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

async function getOrganizations(apiKey) {
  try {
    // Try different API endpoints
    const endpoints = [
      '/organizations',
      '/organization',
      '/me/organizations',
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await makeRequest('GET', endpoint, null, apiKey);
        const orgs = response.organizations || response.organization || response || [];
        if (Array.isArray(orgs) && orgs.length > 0) {
          return orgs;
        }
        if (orgs && !Array.isArray(orgs)) {
          return [orgs];
        }
      } catch (e) {
        // Try next endpoint
        continue;
      }
    }
    
    return [];
  } catch (error) {
    console.error('✗ Failed to get organizations:', error.message);
    return [];
  }
}

async function getProjects(apiKey) {
  try {
    const response = await makeRequest('GET', '/projects', null, apiKey);
    return response.projects || response || [];
  } catch (error) {
    console.error('✗ Failed to get projects:', error.message);
    return [];
  }
}

async function createProject(apiKey, projectName = 'garantico-db', orgId = null) {
  try {
    // First, check if project already exists
    console.log('Checking for existing projects...');
    const existingProjects = await getProjects(apiKey);
    const existing = Array.isArray(existingProjects) 
      ? existingProjects.find(p => p.name === projectName || p.project?.name === projectName)
      : null;
    
    if (existing) {
      const project = existing.project || existing;
      console.log(`✓ Found existing project: ${project.name} (${project.id})`);
      return project;
    }

    // If orgId not provided, try to get it
    if (!orgId) {
      // First, try environment variable
      orgId = process.env.NEON_ORG_ID;
      if (orgId) {
        console.log(`✓ Using organization ID from environment: ${orgId}`);
      } else {
        // Try to fetch from API
        console.log('Fetching organizations...');
        const orgs = await getOrganizations(apiKey);
        if (orgs.length > 0) {
          orgId = orgs[0].id || orgs[0].organization?.id || orgs[0].org_id;
          const orgName = orgs[0].name || orgs[0].organization?.name || orgs[0].name || 'Unknown';
          console.log(`✓ Using organization: ${orgName} (${orgId})`);
        } else {
          throw new Error(
            'No organizations found. Please:\n' +
            '1. Get your organization ID from NeonDB dashboard URL (org_id parameter)\n' +
            '2. Set it as: export NEON_ORG_ID=your_org_id\n' +
            '3. Or create an organization first in NeonDB dashboard.'
          );
        }
      }
    }

    console.log('Creating NeonDB project...');
    const response = await makeRequest('POST', '/projects', {
      project: {
        name: projectName,
        region_id: 'aws-eu-central-1', // Default to EU region
        org_id: orgId,
      },
    }, apiKey);

    const project = response.project || response;
    console.log('✓ Project created:', project.id);
    return project;
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
    if (error.message.includes('org_id')) {
      console.log('\n💡 Tip: Organization ID is required. The script will try to get it automatically.');
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createProject, createBranch, getConnectionString };

