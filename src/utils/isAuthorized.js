export function isAuthorized(request, env) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) return false;

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) return false;

  return token === env.AUTH_PASSWORD;
}
