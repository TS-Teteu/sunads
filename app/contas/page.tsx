import type { Metadata } from "next"
import AccountsPage from "@/components/accounts-page"

export const metadata: Metadata = {
  title: "Contas",
  description: "Gerenciamento de contas de anúncios e integrações",
}

export default function Accounts() {
  return <AccountsPage />
}
