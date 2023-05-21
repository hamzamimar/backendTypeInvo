require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1d',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10
};
