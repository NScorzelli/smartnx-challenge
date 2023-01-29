import Redis from 'ioredis';
import { promisify } from 'util';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});

const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);

export { redis, getAsync, setAsync };
    