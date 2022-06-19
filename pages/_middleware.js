import { fontSize } from "@mui/system";
import { getToken } from "next-auth/jwt";
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export  async function middleware(req) {
    if (req.nextUrl.pathname === "/") {
        const session = await getToken({
          req,
          secret: process.env.JWT_SECRET,
          secureCookie: process.env.NODE_ENV === "production",
        });

        if (!session) return NextResponse.rewrite(new URL('/', req.url))
}
}

