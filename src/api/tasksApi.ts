import { supabase } from '../supabaseClient';
import { Todo, Todos } from '../types/todos';

export async function fetchTasks(): Promise<Todos> {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
}

export async function fetchTasksByProjectId(id: string): Promise<Todos> {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function createNewTodo(newTodo: Todo) {
  const { data, error } = await supabase.from('tasks').insert([newTodo]).select();

  if (error) throw error;

  return data[0];
}

export async function updateTodo(todo: Todo) {
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
