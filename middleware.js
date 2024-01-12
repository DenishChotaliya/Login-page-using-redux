import { NextResponse } from 'next/server'

export const middleware = (request) => {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/Login' || path === '/Register'
    const isAdminPath = path.startsWith('/Admin')

    const decodedRole = request.cookies.get('rol')?.value || ''
    const rol = atob(decodedRole)

    if (isPublicPath && rol !== "") {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (isAdminPath) {
        if (rol === '') {
            return NextResponse.redirect(new URL('/Login', request.nextUrl))
        } else if (rol !== '1') {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }
    }
    if (path === '/Profile' && rol =="" ) {
        return NextResponse.redirect(new URL('/Login', request.nextUrl))
    }

}
