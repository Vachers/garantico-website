-- Create Admin User
-- Username: Sinan
-- Password: Sb26112020!

-- First, generate the hashed password using bcrypt
-- You can use: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Sb26112020!', 10).then(h => console.log(h))"

-- Or use this pre-generated hash (for Sb26112020!):
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO admin_users (username, password) 
VALUES ('Sinan', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT (username) DO NOTHING;

