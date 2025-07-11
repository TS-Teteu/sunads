import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "@/lib/session"

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(request.cookies, sessionOptions)
  const { isLoggedIn } = session
  const { pathname } = request.nextUrl

  // Se o usuário não está logado e não está na página de login, redireciona para /login
  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se o usuário está logado e tenta acessar a página de login, redireciona para a home
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Executa o middleware em todas as rotas, exceto as de assets e da API do Next.js
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
