import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest, supabaseResponse: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the current path is already a login or auth path to prevent redirect loops
  const isLoginPath = request.nextUrl.pathname.includes("/dang-nhap") || request.nextUrl.pathname.includes("/login") || request.nextUrl.pathname.includes("/auth");

  if (!user && !isLoginPath) {
    // no user and not already on login page, redirect to login page with proper locale handling
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
