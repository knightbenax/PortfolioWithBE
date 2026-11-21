const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5186/api');

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('portfolio-session'));
  } catch {
    return null;
  }
}

export function saveSession(session) {
  if (session) localStorage.setItem('portfolio-session', JSON.stringify(session));
  else localStorage.removeItem('portfolio-session');
}

export async function api(path, { method = 'GET', body, token, ...options } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || payload.message || `Request failed (${response.status})`);
  return payload;
}
