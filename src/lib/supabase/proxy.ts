import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function isProtectedAdminPath(pathname: string) {
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isLogin = pathname === '/admin/login' || pathname.startsWith('/admin/login/')
  const isForgot =
    pathname === '/admin/forgot-password' || pathname === '/admin/set-password'
  return isAdmin && !isLogin && !isForgot
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  let responseHeaders: Record<string, string> = {}

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })

          // No-store cache headers so auth cookies are never cached.
          responseHeaders = headers ?? {}
          Object.entries(responseHeaders).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  // Refresh and verify the authentication token.
  const { data } = await supabase.auth.getClaims()

  // Convenience only: send signed-out visitors straight to the login page.
  // The real access check is requireAdmin() in each admin page.
  if (!data?.claims && isProtectedAdminPath(request.nextUrl.pathname)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.search = ''
    loginUrl.searchParams.set(
      'next',
      request.nextUrl.pathname + request.nextUrl.search
    )

    const redirectResponse = NextResponse.redirect(loginUrl)

    // Keep any refreshed/cleared session cookies and cache headers.
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie)
    })
    Object.entries(responseHeaders).forEach(([key, value]) =>
      redirectResponse.headers.set(key, value)
    )

    return redirectResponse
  }

  return supabaseResponse
}
