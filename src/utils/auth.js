export const AuthService = {
  check(request, env) {
    const cookie = request.headers.get('Cookie') || '';
    return cookie.includes(`session=${env.AUTH_PASSWORD}`);
  },

  createSessionHeader(password) {
    return {
      'Set-Cookie': `session=${password}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`,
    };
  },
};
