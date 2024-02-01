import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from 'next-auth/react'

export function middleware(request: NextRequest) {
    const currentAuthToken = request.cookies.get("next-auth.session-token")?.value
    // console.log(request.cookies)
    if (currentAuthToken === undefined) {
        if (!request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else if (currentAuthToken) {
        if (request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/portal/dashboard', request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
