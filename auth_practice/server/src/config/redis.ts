import { createClient } from "redis";
import { env } from "./env";

export const redisClient = createClient({
    url: env.REDIS_URL,
});

redisClient.on("error", (err) => console.log(`Redis:error ${err}`));
redisClient.on("connect", () => console.log(`Redis connected successfully`));

export const connectRedis = async () => {
    await redisClient.connect();
}