import { AuthService } from './utils/auth';
import { PageController } from './controllers/pageController';

export default {
  async fetch(request, env) {
    const isAuthorized = AuthService.check(request, env);

    if (request.method === 'POST') {
      const formData = await request.formData();
      const pass = formData.get('password');

      if (pass === env.AUTH_PASSWORD) {
        return new Response(null, {
          status: 302,
          headers: { Location: '/', ...AuthService.createSessionHeader(pass) },
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return PageController.renderLogin(true);
    }

    if (!isAuthorized) {
      return PageController.renderLogin();
    }

    return PageController.renderDashboard(env);
  },
};
