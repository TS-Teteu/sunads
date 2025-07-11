import type { Metadata } from "next"
import AlertsPage from "@/components/alerts-page"

export const metadata: Metadata = {
  title: "Avisos",
  description: "Tarefas do dia e alertas importantes",
}

export default function Alerts() {
  return <AlertsPage />
}
