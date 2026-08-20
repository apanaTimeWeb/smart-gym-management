// RESPONSIBILITY: Next.js Edge Middleware. Enforces authentication guards across the application. Redirects unauthenticated users to login and prevents role-based crossover between ERP and Superadmin routes.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/lib/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('gymsmart_token')?.value;

  const userCookie = request.cookies.get('gymsmart_user')?.value;
  let role = '';
  try {
    if (userCookie) {
      const user = JSON.parse(decodeURIComponent(userCookie));
      role = user?.role || '';
    }
  } catch (e) {}

  const isAdmin = ROUTES.ADMIN_PREFIXES.some(p => pathname.startsWith(p));
  const isManager = ROUTES.MANAGER_PREFIXES.some(p => pathname.startsWith(p));
  const isTrainer = ROUTES.TRAINER_PREFIXES.some(p => pathname.startsWith(p));
  const isSuperadmin = pathname.startsWith('/superadmin');

  // Redirect unauthenticated users away from protected routes
  if ((isAdmin || isManager || isTrainer || isSuperadmin) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Role-based Access Control
  if (token) {
    if (isAdmin && role !== 'ADMIN') {
      const fallback = role === 'SUPERADMIN' ? ROUTES.SUPERADMIN_DASHBOARD : (role === 'MANAGER' ? ROUTES.MANAGER_DASHBOARD : ROUTES.TRAINER_DASHBOARD);
      return NextResponse.redirect(new URL(fallback, request.url));
    }
    if (isManager && role !== 'MANAGER') {
      const fallback = role === 'SUPERADMIN' ? ROUTES.SUPERADMIN_DASHBOARD : (role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.TRAINER_DASHBOARD);
      return NextResponse.redirect(new URL(fallback, request.url));
    }
    if (isTrainer && role !== 'TRAINER') {
      const fallback = role === 'SUPERADMIN' ? ROUTES.SUPERADMIN_DASHBOARD : (role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.MANAGER_DASHBOARD);
      return NextResponse.redirect(new URL(fallback, request.url));
    }
    if (isSuperadmin && role !== 'SUPERADMIN') {
      const fallback = role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : (role === 'MANAGER' ? ROUTES.MANAGER_DASHBOARD : ROUTES.TRAINER_DASHBOARD);
      return NextResponse.redirect(new URL(fallback, request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === ROUTES.LOGIN && token) {
    if (role === 'SUPERADMIN') {
      return NextResponse.redirect(new URL(ROUTES.SUPERADMIN_DASHBOARD, request.url));
    }
    if (role === 'ADMIN') {
      return NextResponse.redirect(new URL(ROUTES.ADMIN_DASHBOARD, request.url));
    }
    if (role === 'MANAGER') {
      return NextResponse.redirect(new URL(ROUTES.MANAGER_DASHBOARD, request.url));
    }
    return NextResponse.redirect(new URL(ROUTES.TRAINER_DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)'],
};

