const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Слишком много запросов с этого IP-адреса!',
});

module.exports = { limiter };
