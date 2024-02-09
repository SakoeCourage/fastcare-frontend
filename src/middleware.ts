import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPermissionPerRoute } from './app/accescontrol/routemiddleware';
import { roleDTO } from './app/types/entitiesDTO';

function removeAnyQueryParam(url: string): string {
    if (url.includes('?')) {
        const [baseUrl] = url.split('?');
        return baseUrl;
    } else {
        return url;
    }
}

export function middleware(request: NextRequest) {
    const currentAuthToken = request.cookies.get("next-auth.session-token")?.value || request.cookies.get("__Secure-next-auth.session-token")?.value;
    const passwordResetRequired = request.cookies.get("passwordResetRequired");
    const routePermissions = getPermissionPerRoute()
    let role: roleDTO = {} as roleDTO;

    if (request.cookies.get('role')) {
        role = JSON.parse(request.cookies.get('role')?.value)
    }

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
        } else if (request.url.includes('/portal') && !request.url.endsWith('/portal/dashboard')) {
            if (role?.permissions && (Boolean(role?.permissions.length) == true)) {
                try {
                    var currentRouteTo = routePermissions.find((r) => removeAnyQueryParam(request.url).trim().endsWith(r.route.trim()))
                    var canAccessRoute = currentRouteTo?.permisssions.some(permission => role.permissions.includes(permission));
                    if (canAccessRoute == false) {
                        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                return NextResponse.redirect(new URL('/portal/dashboard', request.url));
            }
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
