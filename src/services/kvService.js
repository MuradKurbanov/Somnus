export async function list(env) {
  const result = await env.MY_KV.list();

  return result.keys.map((k) => k.name);
}

export async function get(env, key) {
  return env.MY_KV.get(key);
}

export async function put(env, key, value) {
  return env.MY_KV.put(key, value);
}

export async function remove(env, key) {
  return env.MY_KV.delete(key);
}
