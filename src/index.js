import { router } from './router';
import { response, isRateAllowed, isAllowedTime, isAuthorized } from './utils';

export default {
  async fetch(request, env, ctx) {
    if (!(await isRateAllowed(request, env))) {
      return response({ error: 'Too Many Requests' }, 429);
    }

    if (!isAuthorized(request, env)) {
      return response({ error: 'Unauthorized' }, 401);
    }

    if (!isAllowedTime()) {
      return response({ error: 'Access denied. Available from 04:00 to 05:00 (Lisbon time)' }, 403);
    }

    try {
      return await router(request, env, ctx);
    } catch (e) {
      return response({ error: 'Internal Server Error' }, 500);
    }
  },
};
