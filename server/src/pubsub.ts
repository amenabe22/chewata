import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
const options = {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (times: any) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
    // Your Redis Options. 
    // You can leave it blank if you're just using the redis server installed on your system.
};

// @ts-ignore
export const pubSub = new RedisPubSub({publisher: new Redis(options), subscriber: new Redis(options)});