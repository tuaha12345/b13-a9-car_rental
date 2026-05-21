import { NextResponse } from 'next/server'
import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })
    

    if(!session?.user) {
         return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
  matcher: ['/my-bookings', '/add-car', '/my-added-cars', '/edit-car/:path*'],
}

