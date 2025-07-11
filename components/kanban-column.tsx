"use client"

import type React from "react"

import { useState } from "react"
import type { Task } from "@/components/tasks-page"
import { TaskCard } from "@/components/task-card"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  title: string
  color: string
  tasks: Task[]
  status: Task["status"]
  onUpdateTaskStatus: (taskId: string, newStatus: Task["status"]) => void
  onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({ title, color, tasks, status, onUpdateTaskStatus, onDeleteTask }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const taskId = e.dataTransfer.getData("text/plain")
    if (taskId) {
      onUpdateTaskStatus(taskId, status)
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-2 border-dashed border-gray-200 p-4 transition-all duration-200",
        color,
        isDragOver && "border-blue-400 bg-blue-50",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">{tasks.length}</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={() => onDeleteTask(task.id)} />
        ))}

        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Nenhuma tarefa</div>
        )}
      </div>
    </div>
  )
}
