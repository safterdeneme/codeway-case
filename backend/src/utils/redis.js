const Redis = require('ioredis');

let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    console.log("REDIS_URL", process.env.REDIS_URL)
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    redisClient = new Redis(redisUrl);

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    redisClient.on('ready', () => {
      console.log('Redis client is ready');
    });

    redisClient.on('end', () => {
      console.log('Redis connection closed');
    });
  }
  return redisClient;
}

module.exports = getRedisClient;
