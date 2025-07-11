"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { KanbanBoard } from "@/components/kanban-board"
import { AddTaskDialog } from "@/components/add-task-dialog"
import type { Task } from "@/types/task"
import { initialTasks } from "@/lib/mock-data"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tarefas</h2>
          <p className="text-muted-foreground">Gerencie suas tarefas com o sistema Kanban</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <KanbanBoard tasks={tasks} onUpdateTaskStatus={handleUpdateTaskStatus} onDeleteTask={handleDeleteTask} />

      <AddTaskDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddTask={handleAddTask} />
    </div>
  )
}
