import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Skip static assets. Extensions are listed in both cases so uploads
    // like IMG_0070.JPG are skipped too; the matcher has no case-insensitive flag.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|SVG|PNG|JPG|JPEG|GIF|WEBP)$).*)',
  ],
}