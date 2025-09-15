const Redis = require('ioredis')

const redis = new Redis();

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const path = req.path 
  const method = req.method 

  const currentTime = Date.now();
  const key = `rate-limit:${ip}:${method}:${path}`;

  const limit = 5; 
  const windowTime = 1 * 60; 

  const requests = await redis.incr(key);

  if (requests === 1) {
    // Set the expiration of the key to the time window on first request
    await redis.expire(key, windowTime);
  }

  if (requests > limit) {
    return res.status(429).json({ message: 'Too many requests, try again later.' });
  }

  next();
};




export default rateLimiter