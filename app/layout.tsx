import "@/styles/globals.css"
import type { Metadata } from "next"
import type React from "react"

import { ResponsiveSidebar } from "@/components/responsive-sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isAuthenticated, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: {
    default: "Sistema de Monitoramento",
    template: "%s | Sistema Monitor",
  },
  description: "Sistema completo de monitoramento empresarial",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  // Verifica se o usuário está autenticado
  // Nota: Em um ambiente de produção, esta verificação seria feita de forma mais robusta,
  // possivelmente com um middleware ou um contexto de autenticação.
  const userIsAuthenticated = isAuthenticated()

  if (!userIsAuthenticated) {
    // Se não estiver autenticado e não estiver na página de login, redireciona
    // Isso evita um loop de redirecionamento se a página de login for a raiz
    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
      redirect("/login")
    }
  }

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-background">
          {userIsAuthenticated && <ResponsiveSidebar />}
          <main className="flex-1 overflow-y-auto bg-background ml-16">
            {children}
            {userIsAuthenticated && (
              <div className="fixed bottom-4 right-4">
                <form
                  action={async () => {
                    "use server"
                    logout()
                    redirect("/login")
                  }}
                >
                  <Button type="submit" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </form>
              </div>
            )}
          </main>
        </div>
      </body>
    </html>
  )
}
