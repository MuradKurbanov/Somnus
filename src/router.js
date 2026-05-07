import { getAllKeys, getValue, createValue, updateValue, deleteValue } from './controllers';
import { response } from './utils';

export async function router(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  if (pathname === '/kv' && method === 'GET') {
    return getAllKeys(env);
  }

  if (pathname === '/kv' && method === 'POST') {
    return createValue(request, env);
  }

  if (pathname.startsWith('/kv/') && method === 'GET') {
    const name = pathname.replace('/kv/', '');

    if (!name) return response({ error: 'Not Found' }, 404);

    return getValue(name, env);
  }

  if (pathname.startsWith('/kv/') && method === 'PUT') {
    const name = pathname.replace('/kv/', '');

    if (!name) return response({ error: 'Not Found' }, 404);

    return updateValue(name, request, env);
  }

  if (pathname.startsWith('/kv/') && method === 'DELETE') {
    const name = pathname.replace('/kv/', '');
    console.log(name, 'name');

    if (!name) return response({ error: 'Not Found' }, 404);

    return deleteValue(name, env);
  }

  return response({ error: 'Not Found' }, 404);
}
