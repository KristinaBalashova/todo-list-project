interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done'; 
  priority: 'low' | 'medium' | 'high';  
  projectId: string;
  createdAt: string;
  updatedAt: string;  
  executor: string | null;  
}

type Todos = Todo[];

export { Todo, Todos };
