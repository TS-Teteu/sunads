"use client"

import { logout } from "@/app/logout/actions"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline" className="flex items-center gap-2 bg-transparent">
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </form>
  )
}
