// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//     console.log('request', request)
//     const currentUser = request.cookies.get('currentUser')?.value

//     if (currentUser) {
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//     return NextResponse.redirect(new URL('/auth/login', request.url))
// }

export const config = {
    matcher: ['/auth/login','/login'],
}