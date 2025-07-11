import type { Metadata } from "next"
import ConversationsPage from "@/components/conversations-page"

export const metadata: Metadata = {
  title: "Conversas",
  description: "Central de conversas integrada com Chatwoot",
}

export default function Conversations() {
  return <ConversationsPage />
}
