"use client"

import type React from "react"

import type { Task } from "@/types/task"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Trash2, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onDelete: () => void
}

const priorityColors = {
  baixa: "bg-green-100 text-green-800",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-red-100 text-red-800",
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id)
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "feito"

  return (
    <Card
      className="cursor-move hover:shadow-md transition-shadow duration-200 bg-white"
      draggable
      onDragStart={handleDragStart}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={cn("text-xs", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          {isOverdue && (
            <Badge variant="destructive" className="text-xs">
              Atrasado
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="h-3 w-3" />
            <span>{task.assignee}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span className={cn(isOverdue && "text-red-600 font-medium")}>
              {new Date(task.dueDate).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {task.assignee
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <span className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>
      </CardContent>
    </Card>
  )
}
