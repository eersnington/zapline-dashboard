import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
export default function middleware(req: NextResponse<unknown>) {
  return withAuth(req);
}
export const config = { matcher: ["/dashboard/:path*"] };
