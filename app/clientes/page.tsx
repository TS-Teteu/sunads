import type { Metadata } from "next"
import { ClientsView } from "@/components/clients-view"

export const metadata: Metadata = {
  title: "Clientes",
  description: "Gerenciamento de clientes por etapa",
}

export default function ClientsPage() {
  return <ClientsView />
}
