// RESPONSIBILITY: Provides server-side fetch wrappers to securely fetch data from the backend during Server Component rendering (SSR), automatically handling token injection.
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function ssrApiFetch<T = unknown>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('gymsmart_token')?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { headers });
  
  if (!res.ok) {
    if (res.status === StatusCodes.UNAUTHORIZED) {
      throw new Error('Unauthorized');
    }
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `API Error: ${res.status}`);
  }

  return res.json();
}
export { ssrApiFetch };
