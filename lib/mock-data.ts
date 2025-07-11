import type { Task } from "@/types/task"

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Revisar proposta comercial",
    description: "Analisar e revisar a proposta para o cliente ABC Corp",
    priority: "alta",
    assignee: "João Silva",
    dueDate: "2024-07-11", // Exemplo de tarefa para hoje
    status: "entrada",
    createdAt: "2024-07-01",
  },
  {
    id: "2",
    title: "Desenvolver dashboard financeiro",
    description: "Criar interface para visualização de métricas financeiras",
    priority: "media",
    assignee: "Maria Santos",
    dueDate: "2024-07-05", // Exemplo de tarefa atrasada
    status: "fazendo",
    createdAt: "2024-07-01",
  },
  {
    id: "3",
    title: "Atualizar documentação do projeto",
    description: "Revisar e atualizar toda a documentação técnica",
    priority: "baixa",
    assignee: "Pedro Costa",
    dueDate: "2024-07-18",
    status: "aguardando",
    createdAt: "2024-07-05",
  },
  {
    id: "4",
    title: "Implementar sistema de login",
    description: "Desenvolver autenticação e autorização de usuários",
    priority: "alta",
    assignee: "Ana Lima",
    dueDate: "2024-07-01", // Exemplo de tarefa atrasada e feita
    status: "feito",
    createdAt: "2024-06-25",
  },
  {
    id: "5",
    title: "Configurar ambiente de produção",
    description: "Setup completo do servidor de produção",
    priority: "alta",
    assignee: "Carlos Mendes",
    dueDate: "2024-07-11", // Exemplo de tarefa para hoje
    status: "fazendo",
    createdAt: "2024-07-09",
  },
  {
    id: "6",
    title: "Testar integração com API",
    description: "Validar todas as integrações com APIs externas",
    priority: "media",
    assignee: "João Silva",
    dueDate: "2024-07-10", // Exemplo de tarefa atrasada
    status: "entrada",
    createdAt: "2024-07-08",
  },
]
