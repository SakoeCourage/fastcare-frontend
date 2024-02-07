import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from 'next-auth/react'
import { sidebarRoutes } from './app/portal/portalayoutpartials/sideBarRoutes';



export function middleware(request: NextRequest) {
    const currentAuthToken = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;
    const passwordResetRequired = request.cookies.get("passwordResetRequired");
    // console.log(sidebarRoutes)
    if (currentAuthToken === undefined) {
        if (!request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        if (passwordResetRequired != null && passwordResetRequired.value === "true") {
            if (!request.url.endsWith("/myaccount?view=pass_reset")) {
                return NextResponse.redirect(new URL('/portal/myaccount?view=pass_reset', request.url));
            }
        }
         else if (request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/portal/dashboard', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
