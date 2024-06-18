const Redis = require('ioredis');

let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
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

const clearCache = async ({keyName, isRegex, redisClient}) => {
  try {
    if (isRegex) {
      const pattern = `*${keyName}*`;

      const matchedKeys = await redisClient.keys(pattern);

      if (matchedKeys?.length > 0) {
        for (const key of matchedKeys) {
          await redisClient.del(key);
        }
      }
    } else {
      await redisClient.del(keyName)
    }
  } catch (error) {
    console.error("Error deleting redis cache:", error);
  }
};

module.exports = {getRedisClient, clearCache};
