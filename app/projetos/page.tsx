import type { Metadata } from "next"
import ProjectsPage from "@/components/projects-page"

export const metadata: Metadata = {
  title: "Projetos",
  description: "Acompanhamento de projetos por cliente",
}

export default function Projects() {
  return <ProjectsPage />
}
