const env = process.env.NODE_ENV || 'development';
const config = {
  env,
  port: process.env.PORT || 5186,
  jwtSecret: process.env.JWT_SECRET || (env === 'production' ? undefined : 'local-development-secret-change-before-deploy'),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'
};

if (!config.jwtSecret) throw new Error('JWT_SECRET must be configured in production.');

module.exports = config;
