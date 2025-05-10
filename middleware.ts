import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First handle the i18n routing
  const response = handleI18nRouting(request);
  
  // Then update the authentication session
  return await updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
