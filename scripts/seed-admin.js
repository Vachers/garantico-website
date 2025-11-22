#!/usr/bin/env node

/**
 * Seed Admin User
 * 
 * Creates the initial admin user
 */

const { hashPassword } = require('../lib/auth');

async function seedAdmin() {
  const bcrypt = require('bcryptjs');
  const password = 'Sb26112020!';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Admin credentials:');
  console.log('Username: Sinan');
  console.log('Password: Sb26112020!');
  console.log('\nHashed password (for database):');
  console.log(hashedPassword);
  console.log('\nRun this SQL in your database:');
  console.log(`
INSERT INTO admin_users (username, password) 
VALUES ('Sinan', '${hashedPassword}')
ON CONFLICT (username) DO NOTHING;
  `);
}

if (require.main === module) {
  seedAdmin();
}

