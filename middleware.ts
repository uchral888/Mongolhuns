import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Student routes protection
    if (pathname.startsWith('/student')) {
      if (!token || token.role !== 'student') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Dashboard redirect based on role
    if (pathname === '/dashboard') {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
      
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/student/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/auth/login', '/auth/register', '/courses', '/about', '/contact'];
        if (publicRoutes.includes(pathname)) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/student/:path*',
    '/courses/:path*',
    '/quiz/:path*',
  ],
};