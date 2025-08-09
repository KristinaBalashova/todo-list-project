import { defineStore } from 'pinia';
import { supabase } from '../supabaseClient';
import { User } from '../types/users';
import { useUsers } from './users';
import { createUser } from '../api/usersApi';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useAuth = defineStore('auth', {
  state: () => ({
    currentUser: null as User | null,
    token: null as string | null,
  }),

  actions: {
    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      this.token = data.session?.access_token || null;
      this.currentUser = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('userId', data.user?.id || '');
    },

    async signUp(email: string, password: string, name: string) {
      console.log('Signing up with:', { email, password, name });
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (data) {
        await createUser({ id: data.user?.id || null, email, name: name, role: 'guest' });
      }
      if (error) throw error;

      this.token = data.session?.access_token || null;
      this.currentUser = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('userId', data.user?.id || '');
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      this.currentUser = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },

    async getUserFromSession() {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      this.currentUser = data.user;
    },

    async tryAutoLogin() {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        this.signOut();
        return;
      }

      this.token = data.session.access_token;
      this.currentUser = data.session.user;

      const usersStore = useUsers();
      await usersStore.getUserById(this.currentUser.id);
    },

    listenToAuthChanges() {
      supabase.auth.onAuthStateChange((_event, session) => {
        this.currentUser = session?.user || null;
        this.token = session?.access_token || null;

        if (session?.user) {
          localStorage.setItem('token', this.token!);
          localStorage.setItem('userId', session.user.id);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }
      });
    },
  },
});
