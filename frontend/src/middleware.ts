import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ERP_PREFIX = ['/dashboard', '/members', '/plans', '/finance', '/hr', '/attendance', '/store', '/workout', '/inquiries', '/settings'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('gymsmart_token')?.value;


  const isErp = ERP_PREFIX.some(p => pathname.startsWith(p));

  // Redirect unauthenticated users away from ERP routes
  if (isErp && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login page
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)'],
};
