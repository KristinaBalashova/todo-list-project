import { supabase } from '../supabaseClient';
import { Users } from '../types/users';

export async function fetchUsers(): Promise<Users> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
}
