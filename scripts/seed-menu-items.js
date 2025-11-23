#!/usr/bin/env node

/**
 * Seed Default Menu Items
 * 
 * Creates default menu items for top and main navigation
 */

const { neon } = require('@neondatabase/serverless');

async function seedMenuItems() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    console.log('🌱 Seeding menu items...\n');

    // Check if menu items already exist
    const existing = await sql`
      SELECT COUNT(*) as count FROM navigation_items
    `;

    if (existing[0].count > 0) {
      console.log('✓ Menu items already exist, skipping seed');
      return;
    }

    // Insert default menu items
    const menuItems = [
      // Top menu items
      {
        label_tr: 'Dünya İçin, Yaşam İçin',
        label_en: 'For Earth, For Life',
        href: '#',
        order: 0,
        menu_type: 'top',
        active: true,
      },
      // Main menu items
      {
        label_tr: 'Ana Sayfa',
        label_en: 'Home',
        href: '/tr',
        order: 0,
        menu_type: 'main',
        active: true,
      },
      {
        label_tr: 'Hakkımızda',
        label_en: 'About',
        href: '/tr/about',
        order: 1,
        menu_type: 'main',
        active: true,
      },
      {
        label_tr: 'Ürünlerimiz',
        label_en: 'Products',
        href: '/tr/products',
        order: 2,
        menu_type: 'main',
        active: true,
      },
      {
        label_tr: 'İletişim',
        label_en: 'Contact',
        href: '/tr/contact',
        order: 3,
        menu_type: 'main',
        active: true,
      },
    ];

    for (const item of menuItems) {
      await sql`
        INSERT INTO navigation_items (label_tr, label_en, href, "order", menu_type, active)
        VALUES (${item.label_tr}, ${item.label_en}, ${item.href}, ${item.order}, ${item.menu_type}, ${item.active})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log('✅ Menu items seeded successfully!');
    console.log(`   Added ${menuItems.length} menu items`);
  } catch (error) {
    console.error('✗ Error seeding menu items:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedMenuItems();
}

module.exports = { seedMenuItems };

