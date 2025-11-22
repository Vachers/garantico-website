#!/usr/bin/env node

/**
 * Create Admin User Script
 * 
 * This script creates the admin user in the database
 * Run: node scripts/create-admin-user.js
 */

const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

async function createAdminUser() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('✗ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const password = 'Sb26112020!';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if user already exists
    const existing = await sql`
      SELECT id FROM admin_users WHERE username = 'Sinan'
    `;

    if (existing.length > 0) {
      console.log('✓ Admin user already exists');
      return;
    }

    // Create admin user
    await sql`
      INSERT INTO admin_users (username, password) 
      VALUES ('Sinan', ${hashedPassword})
    `;

    console.log('✓ Admin user created successfully!');
    console.log('  Username: Sinan');
    console.log('  Password: Sb26112020!');
  } catch (error) {
    console.error('✗ Error creating admin user:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };

