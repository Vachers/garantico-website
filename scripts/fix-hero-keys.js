#!/usr/bin/env node

/**
 * Fix Hero Settings Keys
 * 
 * Updates existing hero_image keys to hero_image_url to match API and page usage
 */

const { neon } = require('@neondatabase/serverless');

async function fixHeroKeys() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🔧 Fixing hero settings keys...\n');

    // Check if old key exists
    const oldKey = await sql`
      SELECT * FROM site_settings WHERE key = 'hero_image' LIMIT 1
    `;

    if (oldKey.length > 0) {
      // Check if new key already exists
      const newKey = await sql`
        SELECT * FROM site_settings WHERE key = 'hero_image_url' LIMIT 1
      `;

      if (newKey.length === 0) {
        // Update old key to new key
        await sql`
          UPDATE site_settings 
          SET key = 'hero_image_url' 
          WHERE key = 'hero_image'
        `;
        console.log('✓ Updated hero_image to hero_image_url');
      } else {
        // Delete old key if new key exists
        await sql`
          DELETE FROM site_settings WHERE key = 'hero_image'
        `;
        console.log('✓ Deleted old hero_image key (hero_image_url already exists)');
      }
    } else {
      console.log('✓ No old hero_image key found');
    }

    console.log('\n✅ Hero settings keys fixed!');
  } catch (error) {
    console.error('✗ Error fixing hero keys:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  fixHeroKeys();
}

module.exports = { fixHeroKeys };

