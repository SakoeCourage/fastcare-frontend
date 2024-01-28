import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPahts = ["/login"];

export async function middleware(request: NextRequest) {
    const verified = true;
    if (verified) {
        console.log(request.nextUrl.pathname);
        if (authPahts.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        const requestHeaders = new Headers(request.headers);
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } else {
        if (authPahts.includes(request.nextUrl.pathname)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }
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
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};