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

export async function createTodo(newTodo: Todo) {
  const { data, error } = await supabase.from('tasks').insert([newTodo]).select();

  if (error) throw error;

  return data[0];
}

export async function updateTodo(
  todo: Todo,
  fieldToUpdate?: { [key: string]: any }
) {
  const { id } = todo;

  const updateData = fieldToUpdate ?? { ...todo };

  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
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
