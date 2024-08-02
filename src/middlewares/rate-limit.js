import { slowDown } from 'express-slow-down';

export const rateLimiter = slowDown({
    windowMs: 60 * 1000, // 1 minute
    delayAfter: 10, // allow 20 requests per `windowMs` without slowing them down
    delayMs: (hits) => hits * 200, // add 200 ms of delay to every request after 'delayAfter'
    maxDelayMs: 5000, // max global delay of 5 seconds
  });