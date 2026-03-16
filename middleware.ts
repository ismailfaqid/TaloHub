import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value

    // Define routes that require authentication
    const protectedRoutes = ['/ask', '/settings', '/notifications', '/expert-application']
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Define routes that should not be accessed if already authenticated
    const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
    const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))

    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|avatars|favicon.ico).*)'],
}
