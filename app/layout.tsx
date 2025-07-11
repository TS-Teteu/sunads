import "@/styles/globals.css"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import type React from "react"

import { auth } from "auth" // ✅ origem correta do helper de sessão
import { AuthProvider } from "@/components/auth-provider"
import { ResponsiveSidebar } from "@/components/responsive-sidebar"
import { LogoutButton } from "@/components/logout-button" // novo componente

export const metadata: Metadata = {
  title: {
    default: "Sistema de Monitoramento",
    template: "%s | Sistema Monitor",
  },
  description: "Sistema completo de monitoramento empresarial",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth() // ✅ obtém a sessão no servidor

  // Redireciona quem não está autenticado (exceto na página /login)
  const isLoginRoute = typeof children === "string" && children.includes("/login")
  if (!session && !isLoginRoute) {
    redirect("/login")
  }

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider session={session}>
          <div className="flex h-screen overflow-hidden bg-background">
            {session && <ResponsiveSidebar />}
            <main className="flex-1 overflow-y-auto bg-background ml-16">
              {children}
              {session && (
                <div className="fixed bottom-4 right-4">
                  <LogoutButton />
                </div>
              )}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
