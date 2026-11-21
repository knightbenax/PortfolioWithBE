const path = require('path');
const mongoose = require('mongoose');

try {
  process.loadEnvFile(path.resolve(__dirname, '../../.env'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const config = require('../../config/config');
const User = require('../models/user.model');

async function createAdmin() {
  const { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_NAME || !ADMIN_PASSWORD) {
    throw new Error('Set ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD before running this script.');
  }
  if (ADMIN_PASSWORD.length < 6) throw new Error('ADMIN_PASSWORD must be at least six characters.');

  await mongoose.connect(config.MONGODB_URI);
  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    existing.role = 'admin';
    await existing.save();
    console.log(`Promoted ${existing.email} to admin.`);
  } else {
    const admin = await new User({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' }).save();
    console.log(`Created admin account ${admin.email}.`);
  }
}

createAdmin().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
}).finally(() => mongoose.disconnect());
