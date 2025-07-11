import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Dashboard Geral",
  description: "Visão geral do sistema de monitoramento",
}

export default function DashboardPage() {
  return <Dashboard />
}
