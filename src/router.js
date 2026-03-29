import { isAllowedTime } from './time';
import { renderPage } from './template';

export async function handleRequest(request, env) {
  const allowed = isAllowedTime();

  if (!allowed) {
    return new Response(renderPage({ allowed: false }), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }

  const data = {
    mail1: env.MAIL_PASS_1,
    mail2: env.MAIL_PASS_2,
    cloudflare: env.CF_PASSWORD,
    screen: Number(env.SCREEN_CODE),
  };

  return new Response(renderPage({ allowed: true, data }), {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  });
}
