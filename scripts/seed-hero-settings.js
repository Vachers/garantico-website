#!/usr/bin/env node

/**
 * Seed Default Hero Settings
 * 
 * Creates default hero section settings (image path and overlay opacity)
 */

const { neon } = require('@neondatabase/serverless');

async function seedHeroSettings() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🌱 Seeding hero settings...\n');

    // Check if hero settings already exist
    const existing = await sql`
      SELECT COUNT(*) as count FROM site_settings WHERE key = 'hero_image_url' OR key = 'hero_overlay_opacity'
    `;

    if (existing[0].count > 0) {
      console.log('✓ Hero settings already exist, skipping seed');
      return;
    }

    // Insert default hero settings
    await sql`
      INSERT INTO site_settings (key, value, type)
      VALUES 
        ('hero_image_url', '/hero-image.png', 'text'),
        ('hero_overlay_opacity', '30', 'text')
      ON CONFLICT (key) DO NOTHING
    `;

    console.log('✅ Hero settings seeded successfully!');
    console.log('   - Hero image: /hero-image.png');
    console.log('   - Overlay opacity: 30%');
  } catch (error) {
    console.error('✗ Error seeding hero settings:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedHeroSettings();
}

module.exports = { seedHeroSettings };

