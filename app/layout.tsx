import "@/styles/globals.css"
import type { Metadata } from "next"
import type React from "react"
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"

import { ResponsiveSidebar } from "@/components/responsive-sidebar"
import { LogoutButton } from "@/components/logout-button"
import type { SessionData } from "@/lib/session"
import { sessionOptions } from "@/lib/session"

export const metadata: Metadata = {
  title: {
    default: "Sistema de Monitoramento",
    template: "%s | Sistema Monitor",
  },
  description: "Sistema completo de monitoramento empresarial",
    generator: 'v0.dev'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  const isLoggedIn = session.isLoggedIn ?? false

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-background">
          {isLoggedIn && <ResponsiveSidebar />}
          <main className={`flex-1 overflow-y-auto bg-background ${isLoggedIn ? "ml-16" : ""}`}>
            {children}
            {isLoggedIn && (
              <div className="fixed bottom-4 right-4">
                <LogoutButton />
              </div>
            )}
          </main>
        </div>
      </body>
    </html>
  )
}
