import Redis from "ioredis";

function createRedistConnection() {
  return new Redis({
    host: "localhost",
    port: 6379,
  });
}

//to publish something
export const publisher = createRedisConnection();

//to subcribe something
export const subscriber = createRedisConnection();
