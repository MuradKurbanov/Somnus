export async function isRateAllowed(request, env) {
  const limiter = env.MY_RATE_LIMITER;
  if (!limiter) return true;

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const { success } = await limiter.limit({ key: `rate:${ip}` });

  return success;
}
