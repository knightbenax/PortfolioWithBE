const env = process.env.NODE_ENV || 'development';
const config = {
  env,
  port: process.env.PORT || 5186,
  jwtSecret: process.env.JWT_SECRET || (env === 'production' ? undefined : 'aET4G5vcKjSouMiqmZlUmfVvHBQt1EL8ST2xSSlM2Iy'),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://knightbenax_db_user:ex1V3nQnpWujYY76@comp229db.ruguvvo.mongodb.net/'
};

if (!config.jwtSecret) throw new Error('JWT_SECRET must be configured in production.');

module.exports = config;
