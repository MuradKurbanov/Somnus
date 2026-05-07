import { list, get, put, remove } from '../services';
import { response } from '../utils';

export async function getAllKeys(env) {
  const data = await list(env);
  return response(data);
}

export async function getValue(name, env) {
  const value = await get(env, name);

  if (value === null) {
    return response({ error: 'Not Found' }, 404);
  }

  return response({ key: name, value });
}

export async function createValue(request, env) {
  const body = await request.json();

  if (!body?.key || body?.value === undefined) {
    return response({ error: 'Invalid body' }, 400);
  }

  await put(env, body.key, body.value);

  return response({ success: true }, 201);
}

export async function updateValue(name, request, env) {
  const body = await request.json();

  if (body?.value === undefined) {
    return response({ error: 'Invalid body' }, 400);
  }

  await put(env, name, body.value);

  return response({ success: true });
}

export async function deleteValue(name, env) {
  await remove(env, name);

  return response({ success: true });
}
