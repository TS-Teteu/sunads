import type { Metadata } from "next"
import TasksPage from "@/components/tasks-page"

export const metadata: Metadata = {
  title: "Tarefas",
  description: "Gestão de tarefas com sistema Kanban",
}

export default function Tasks() {
  return <TasksPage />
}
