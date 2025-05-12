import { supabase } from "../supabaseClient";

export async function fetchTasks() {
  const { data, error } = await supabase.from('tasks').select('*')
  if (error) throw error
  return data
}
