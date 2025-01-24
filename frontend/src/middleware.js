import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/workspace')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/workspace/:path*'
};