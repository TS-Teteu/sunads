import type { Metadata } from "next"
import CompaniesPage from "@/components/companies-page"

export const metadata: Metadata = {
  title: "Empresas",
  description: "Acompanhamento de receitas por empresa",
}

export default function Empresas() {
  return <CompaniesPage />
}
