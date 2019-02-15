const env = process.env.NODE_ENV || 'test';
const config = require(`./${env}`);

module.exports = config;

