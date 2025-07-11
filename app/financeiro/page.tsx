import type { Metadata } from "next"
import FinancialPage from "@/components/financial-page"

export const metadata: Metadata = {
  title: "Financeiro",
  description: "Dashboard financeiro com saldos e movimentações",
}

export default function Financial() {
  return <FinancialPage />
}
