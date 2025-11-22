import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function adminMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Protect admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session");
    
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

