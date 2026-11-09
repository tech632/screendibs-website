import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, pickLocale } from "@/lib/i18n";

/* Every page lives under /fr or /en. A URL without one (/, /about, /privacy …) is redirected
   to the visitor's browser language, French by default. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const locale = pickLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and anything with a file extension (icon.svg, images, fonts).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
