import type { Metadata } from "next"
import CommercialPage from "@/components/commercial-page"

export const metadata: Metadata = {
  title: "Comercial",
  description: "Dashboard comercial completo com métricas de vendas",
}

export default function Commercial() {
  return <CommercialPage />
}
