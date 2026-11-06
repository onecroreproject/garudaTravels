import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  if (host === 'garudatoursandtravels.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.garudatoursandtravels.com';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  
  // Enable bfcache by setting appropriate cache headers
  response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  // Add headers to allow bfcache
  response.headers.set('Vary', 'Accept-Encoding, Cookie');
  response.headers.set('x-middleware-cache', 'no-cache');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
