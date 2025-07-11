"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"
import { initialTasks } from "@/lib/mock-data" // Usando os dados mockados

export default function AlertsPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks) // Usando os dados mockados
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time for date comparison

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const isToday = (dateString: string) => {
    const taskDate = new Date(dateString)
    taskDate.setHours(0, 0, 0, 0)
    return taskDate.getTime() === today.getTime()
  }

  const isOverdue = (task: Task) => {
    const taskDueDate = new Date(task.dueDate)
    taskDueDate.setHours(0, 0, 0, 0)
    return taskDueDate < today && task.status !== "feito"
  }

  const todayTasks = tasks.filter((task) => isToday(task.dueDate) && task.status !== "feito")
  const overdueTasks = tasks.filter((task) => isOverdue(task))

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Avisos e Alertas</h2>
          <p className="text-muted-foreground">Fique por dentro das suas tarefas importantes</p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas para Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tarefas com vencimento hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Tarefas não finalizadas e vencidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alertas</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{todayTasks.length + overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Total de itens que requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Tarefas do Dia e Atrasadas */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes dos Avisos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Data de Vencimento</TableHead>
                  <TableHead>Título da Tarefa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Prioridade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayTasks.length === 0 && overdueTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum aviso ou tarefa pendente para hoje.
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {todayTasks.map((task) => (
                      <TableRow key={task.id} className="bg-blue-50/50">
                        <TableCell className="font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          {getFormattedDate(task.dueDate)}
                          <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                            Hoje
                          </Badge>
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{task.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className={cn(
                              task.priority === "alta" && "bg-red-100 text-red-800",
                              task.priority === "media" && "bg-yellow-100 text-yellow-800",
                              task.priority === "baixa" && "bg-green-100 text-green-800",
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {overdueTasks.map((task) => (
                      <TableRow key={task.id} className="bg-red-50/50">
                        <TableCell className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-600" />
                          {getFormattedDate(task.dueDate)}
                          <Badge variant="destructive">Atrasado</Badge>
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{task.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className={cn(
                              task.priority === "alta" && "bg-red-100 text-red-800",
                              task.priority === "media" && "bg-yellow-100 text-yellow-800",
                              task.priority === "baixa" && "bg-green-100 text-green-800",
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
