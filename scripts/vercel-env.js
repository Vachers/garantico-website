#!/usr/bin/env node

/**
 * Vercel Environment Variables Management Script
 * 
 * This script helps manage environment variables in Vercel projects
 * Usage: node scripts/vercel-env.js
 */

const { execSync } = require('child_process');

const ENV_VARS = {
  DATABASE_URL: {
    description: 'NeonDB PostgreSQL connection string',
    required: true,
  },
  NEXT_PUBLIC_APP_URL: {
    description: 'Public application URL',
    required: true,
  },
  NEXT_PUBLIC_WHATSAPP_NUMBER: {
    description: 'WhatsApp Business number',
    required: false,
    default: '+905551234567',
  },
};

function setEnvVar(key, value, environment = 'production') {
  try {
    const cmd = `vercel env add ${key} ${environment} <<< "${value}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✓ Set ${key} for ${environment}`);
  } catch (error) {
    console.error(`✗ Failed to set ${key}:`, error.message);
  }
}

function listEnvVars() {
  try {
    execSync('vercel env ls', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to list environment variables:', error.message);
  }
}

console.log('Vercel Environment Variables Manager');
console.log('=====================================\n');
console.log('Available commands:');
console.log('  - List: vercel env ls');
console.log('  - Add: vercel env add <key> <environment>');
console.log('  - Remove: vercel env rm <key> <environment>');
console.log('\nRequired environment variables:');
Object.entries(ENV_VARS).forEach(([key, config]) => {
  console.log(`  - ${key}: ${config.description} ${config.required ? '(required)' : '(optional)'}`);
});

