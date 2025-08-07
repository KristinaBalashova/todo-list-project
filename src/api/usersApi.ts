import { supabase } from '../supabaseClient';
import { Users, User } from '../types/users';

export async function fetchUsers(): Promise<Users> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
}

export async function fetchUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
