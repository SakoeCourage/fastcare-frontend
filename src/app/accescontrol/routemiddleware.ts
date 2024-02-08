import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const applyRoleProtectionMiddleWare = (request: NextRequest) => {

}

export const logRequest = (request: NextRequest) => {
    if (request.cookies.get('role')) {
        console.log(JSON.parse(request.cookies.get('role').value))
    }
}

export const authOnly = (request: NextRequest) => {
    const currentAuthToken = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;
    if (currentAuthToken === undefined) {
        if (!request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        return NextResponse.next()
    }
}

export const guestOnly = (request: NextRequest) => {
    const currentAuthToken = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (currentAuthToken === undefined) {
        if (!request.url.endsWith("/login")) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        return NextResponse.next()
    }
}

export const hasResetPassword = (request: NextRequest) => {
    const passwordResetRequired = request.cookies.get("passwordResetRequired");
    if (passwordResetRequired != null && passwordResetRequired.value === "true") {
        if (!request.url.endsWith("/myaccount?view=pass_reset")) {
            return NextResponse.redirect(new URL('/portal/myaccount?view=pass_reset', request.url));
        }
    } else {
        return NextResponse.next()
    }
}


