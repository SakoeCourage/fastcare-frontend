import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["/login"];

export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get("userToken");
    const sessionUser = request.cookies.get("user");
    console.log(request.cookies)
    if (userToken || sessionUser) {
        console.log(request.nextUrl.pathname);
        if (authPaths.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        const requestHeaders = new Headers(request.headers);
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } else {
        if (authPaths.includes(request.nextUrl.pathname)) {
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
