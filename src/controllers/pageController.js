import { layout } from '../views/layout';
import { loginView } from '../views/login';
import { dashboardView } from '../views/dashboard';
import { isAllowedTime } from '../utils/time';

export const PageController = {
  renderLogin(error = false) {
    return new Response(layout(loginView(error)), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },

  renderDashboard(env) {
    const allowed = isAllowedTime();
    const data = allowed
      ? {
          mail1: env.MAIL_PASS_1,
          mail2: env.MAIL_PASS_2,
          cloudflare: env.CF_PASSWORD,
          screen: env.SCREEN_CODE,
        }
      : null;

    return new Response(layout(dashboardView(allowed, data)), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};
