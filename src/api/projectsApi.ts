import { supabase } from '../supabaseClient';
import { Project, Projects } from '../types/projects';

export async function fetchProjects(): Promise<Projects> {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) throw error;
  return data;
}

export async function fetchProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}