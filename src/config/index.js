const env = process.env.NODE_ENV || 'db';
const config = require(`./${env}`);

module.exports = config;

