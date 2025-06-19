import { defineStore } from 'pinia';
import { supabase } from '../supabaseClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email, password
        })
        if(error) throw error;

        this.user = data.user;
        this.token = data.session?.access_token || null;

    },
    async logout() {
        await supabase.auth.signOut()
        this.user = null;
        this.token = null;

    },
    async getUser() {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser();
        
        if(error) {
            console.error('Вы не вошли в аккаунт')
        }
        return user;
    }
  }
});
