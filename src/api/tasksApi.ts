import { supabase } from '../supabaseClient';
interface TodoType {
  id?: string;
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
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function createNewTodo(newTodo: TodoType) {
  const { data, error } = await supabase.from('tasks').insert([newTodo]).select();

  if (error) throw error;
  return data;
}

export async function updateTodo(todo: TodoType) {
  const { id, ...rest } = todo;

  const { data, error } = await supabase
    .from('tasks')
    .update(rest)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) throw error;
  return;
}
