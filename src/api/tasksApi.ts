import { supabase } from '../supabaseClient';

export async function fetchTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
}

export async function fetchTasksByProjectId(id) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}