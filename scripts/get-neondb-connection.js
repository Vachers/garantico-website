#!/usr/bin/env node

/**
 * Get NeonDB Connection String from Existing Project
 * 
 * Usage:
 *   NEON_API_KEY=key node scripts/get-neondb-connection.js
 */

const { makeRequest } = require('./neondb-setup');

async function getProjectConnection(apiKey, projectId) {
  try {
    console.log(`Fetching project details for: ${projectId}...`);
    
    // Get project details
    const project = await makeRequest('GET', `/projects/${projectId}`, null, apiKey);
    const proj = project.project || project;
    
    console.log(`✓ Project: ${proj.name} (${proj.id})`);
    
    // Get branches
    const branches = await makeRequest('GET', `/projects/${projectId}/branches`, null, apiKey);
    const branchList = branches.branches || branches || [];
    
    if (branchList.length === 0) {
      throw new Error('No branches found in project');
    }
    
    const branch = branchList[0];
    console.log(`✓ Using branch: ${branch.name || branch.id}`);
    
    // Get connection string - try different endpoints
    const endpoints = [
      `/projects/${projectId}/branches/${branch.id}/connection_strings`,
      `/projects/${projectId}/connection_strings`,
      `/projects/${projectId}/endpoints`,
    ];
    
    let connectionString = null;
    
    for (const endpoint of endpoints) {
      try {
        const response = await makeRequest('GET', endpoint, null, apiKey);
        connectionString = response.connection_strings?.transaction 
          || response.connection_strings?.session
          || response.connection_string
          || response.endpoints?.[0]?.connection_string;
        
        if (connectionString) {
          break;
        }
      } catch (e) {
        // Try next endpoint
        continue;
      }
    }
    
    // If still no connection string, construct it from project/branch info
    if (!connectionString) {
      console.log('⚠ Could not get connection string from API');
      console.log('   Please get it manually from NeonDB dashboard:');
      console.log('   1. Go to your project page');
      console.log('   2. Click "Connect" or "Connection Details"');
      console.log('   3. Copy the connection string');
      throw new Error('Connection string not available via API. Please get it from dashboard.');
    }
    
    return connectionString;
  } catch (error) {
    console.error('✗ Failed to get connection string:', error.message);
    throw error;
  }
}

async function main() {
  const apiKey = process.env.NEON_API_KEY;
  const projectId = process.env.NEON_PROJECT_ID || 'holy-forest-32751101';
  
  if (!apiKey) {
    console.error('✗ NEON_API_KEY environment variable is required');
    process.exit(1);
  }

  try {
    console.log('🔍 Getting NeonDB Connection String...\n');
    const connectionString = await getProjectConnection(apiKey, projectId);
    
    console.log('\n✅ Connection String:');
    console.log(connectionString);
    console.log('\n📋 Next steps:');
    console.log('1. Add to Vercel:');
    console.log(`   export DATABASE_URL="${connectionString}"`);
    console.log('   export VERCEL_TOKEN=UjW5UH68XaRb9UGKdmT0J6JP');
    console.log('   node scripts/add-database-url.js');
    console.log('\n2. Or add manually in Vercel dashboard');
    
    return connectionString;
  } catch (error) {
    console.error('\n✗ Failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { getProjectConnection };

