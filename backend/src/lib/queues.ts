import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export const enrichmentQueue = new Queue("enrichment", { connection: redisConnection });
export const geoMatchQueue = new Queue("geo-match", { connection: redisConnection });
export const notifyScheduleQueue = new Queue("notify-schedule", { connection: redisConnection });
export const notifyDispatchQueue = new Queue("notify-dispatch", { connection: redisConnection });