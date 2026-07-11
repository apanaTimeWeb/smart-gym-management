import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/lib/routes';

export function middleware(request: NextRequest) {
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

  const isErp = ROUTES.ERP_PREFIXES.some(p => pathname.startsWith(p));
  const isSuperadmin = pathname.startsWith('/superadmin');

  // Redirect unauthenticated users away from protected routes
  if ((isErp || isSuperadmin) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Prevent SUPERADMIN from accessing ERP routes (they don't have tenantId)
  if (isErp && role === 'SUPERADMIN') {
    return NextResponse.redirect(new URL(ROUTES.SUPERADMIN_DASHBOARD, request.url));
  }

  // Prevent normal users from accessing Superadmin routes
  if (isSuperadmin && role !== 'SUPERADMIN' && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // Redirect authenticated users away from login page
  if (pathname === ROUTES.LOGIN && token) {
    if (role === 'SUPERADMIN') {
      return NextResponse.redirect(new URL(ROUTES.SUPERADMIN_DASHBOARD, request.url));
    }
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)'],
};

