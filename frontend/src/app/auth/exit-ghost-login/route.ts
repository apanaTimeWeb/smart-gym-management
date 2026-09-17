import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });

  // In a production environment, this endpoint would securely validate the current session
  // and restore the original superadmin token that was safely stashed in a separate secure cookie.
  // For the mock environment, we reset to the default superadmin mock session.
  const token = 'mock_superadmin_token_123';
  
  res.cookies.set('gymsmart_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15,
    path: '/',
  });

  res.cookies.set('gymsmart_refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  res.cookies.set('gymsmart_user', JSON.stringify({ name: 'Demo Superadmin', email: 'demo_admin@gym.com', role: 'SUPERADMIN', id: 'u1' }), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return res;
}
