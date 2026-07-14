import { RateLimit } from "@/models/rate-limit.model";
import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { getClientIp } from "@/lib/getClientIp";
import { NextRequest } from "next/server";

type RateLimitConfig = {
  namespace: string;
  limit: number;
  windowMs: number;
};

export async function enforceRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<void> {
  const ip = getClientIp(request);
  const key = `${config.namespace}:${ip}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + config.windowMs);

  const incremented = await RateLimit.findOneAndUpdate(
    {
      key,
      expiresAt: { $gt: now },
      count: { $lt: config.limit },
    },
    { $inc: { count: 1 } },
    { new: true }
  );

  if (incremented) {
    return;
  }

  const blocked = await RateLimit.findOne({
    key,
    expiresAt: { $gt: now },
    count: { $gte: config.limit },
  });

  if (blocked) {
    throw apiError(429, API_ERROR_CODES.TOO_MANY_REQUESTS);
  }

  await RateLimit.findOneAndUpdate(
    { key },
    { count: 1, expiresAt },
    { upsert: true, new: true }
  );
}

export const RATE_LIMITS = {
  login: { namespace: "auth:login", limit: 10, windowMs: 15 * 60 * 1000 },
  signup: { namespace: "auth:signup", limit: 5, windowMs: 60 * 60 * 1000 },
  contact: { namespace: "contact:submit", limit: 5, windowMs: 60 * 60 * 1000 },
} as const;
