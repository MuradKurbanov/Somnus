import { isAuthorized } from './isAuthorized';
import { isAllowedTime } from './isAllowedTime';

export default {
  async fetch(request, env) {
    const limiter = env.MY_RATE_LIMITER;

    if (limiter && typeof limiter.limit === 'function') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await limiter.limit({ key: `rate:${ip}` });

      if (!success) {
        return new Response('Too Many Requests', { status: 429 });
      }
    }

    if (!isAuthorized(request, env)) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!isAllowedTime()) {
      return new Response('Access denied. Available from 04:00 to 05:00 (Lisbon time)', {
        headers: { 'content-type': 'text/plain' },
      });
    }

    const data = {
      mail1: env.MAIL_PASS_1,
      mail2: env.MAIL_PASS_2,
      cloudflare: env.CF_PASSWORD,
      screen: env.SCREEN_CODE,
    };

    return new Response(JSON.stringify(data, null, 2), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
