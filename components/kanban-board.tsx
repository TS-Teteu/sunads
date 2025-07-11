"use client"

import type { Task } from "@/types/task"
import { KanbanColumn } from "@/components/kanban-column"

interface KanbanBoardProps {
  tasks: Task[]
  onUpdateTaskStatus: (taskId: string, newStatus: Task["status"]) => void
  onDeleteTask: (taskId: string) => void
}

const columns = [
  { id: "entrada", title: "Entrada", color: "bg-gray-100" },
  { id: "fazendo", title: "Fazendo", color: "bg-blue-100" },
  { id: "aguardando", title: "Aguardando Aprovação", color: "bg-yellow-100" },
  { id: "feito", title: "Feito", color: "bg-green-100" },
] as const

export function KanbanBoard({ tasks, onUpdateTaskStatus, onDeleteTask }: KanbanBoardProps) {
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          color={column.color}
          tasks={getTasksByStatus(column.id as Task["status"])}
          status={column.id as Task["status"]}
          onUpdateTaskStatus={onUpdateTaskStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}
