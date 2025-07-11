export interface Task {
  id: string
  title: string
  description: string
  priority: "baixa" | "media" | "alta"
  assignee: string
  dueDate: string
  status: "entrada" | "fazendo" | "aguardando" | "feito"
  createdAt: string
}
