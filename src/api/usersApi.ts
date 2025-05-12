import { supabase } from "../supabaseClient";

export async function fetchUsers() {
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return data
  }