import { supabase } from '../supabaseClient';
interface TodoType {
  title: string;
  description: string;
  status: boolean;
  priority: string;
  project_id: string;
}

export async function fetchTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
}

export async function fetchTasksByProjectId(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createNewTodo(newTodo: TodoType) {

  const { data, error } = await supabase
  .from('tasks')
  .insert([
    newTodo,
  ])
  .select()

  if (error) throw error;
  return data;
}

