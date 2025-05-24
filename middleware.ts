import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // If the user is not logged in, redirect to the login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the user needs to complete setup
  // We'll do this by calling our API endpoint
  const path = request.nextUrl.pathname;

  // Only check for dashboard access, allow access to setup path
  if (path === '/dashboard') {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/check-setup?email=${encodeURIComponent(token.email as string)}`);
      const { needsSetup } = await res.json();

      // If the user needs setup and is trying to access dashboard, redirect to setup
      if (needsSetup) {
        const setupUrl = new URL('/setup', request.url);
        return NextResponse.redirect(setupUrl);
      }
    } catch (error) {
      console.error('Error checking setup status:', error);
      // On error, allow access rather than breaking the flow
    }
  }

  return NextResponse.next();
}

// Only run this middleware on the dashboard and setup routes
export const config = {
  matcher: ['/dashboard/:path*', '/setup/:path*'],
};
