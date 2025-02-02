const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const CACHE_DURATION = 3600; // 1 hour in seconds

const cacheUtils = {
  async get(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },
  async set(key, value) {
    await redis.setex(key, CACHE_DURATION, JSON.stringify(value));
  },

  async invalidate(key) {
    await redis.del(key);
  }
};

module.exports = cacheUtils; 