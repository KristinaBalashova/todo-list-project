import { STATE, LoadingState } from '../types/common';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { fetchUsers, fetchUserById } from '../api/usersApi';
import { User, Users } from '../types/users';

const toast = useToast();

export const useUsers = defineStore('users', {
  state: () => ({
    users: [] as Users,
    currentUser: null as User | null,
    usersState: STATE.IDLE as LoadingState,
  }),

  getters: {
    userById: (state) => (userId: string) => state.users.find((u: User) => u.id === userId),
  },

  actions: {
    setUsers(users: Users) {
      this.users = users;
    },
    setCurrentUser(user: User) {
      this.currentUser = user;
    },
    async getUserById(userId: string): Promise<User | null> {
      this.setUsersState(STATE.LOADING);
      try {
        const response = await fetchUserById(userId);
        this.setCurrentUser(response);
        this.setUsersState(STATE.SUCCESS);
        return response;
      } catch (error) {
        this.setUsersState(STATE.ERROR);
        toast.error('Ошибка при загрузке данных.');
        return null;
      }
    },
    isAdmin(userId: string): boolean {
      const user = this.users.find((u: User) => u.id === userId);
      return user ? user.isAdmin : false;
    },
    editUser({ id, updates }: { id: string; updates: Partial<User> }) {
      const index = this.users.findIndex((user: User) => user.id === id);
      if (index !== -1) {
        Object.assign(this.users[index], updates);
      }
    },

    setUsersState(newState: LoadingState) {
      this.usersState = newState;
    },

    async fetchUsers() {
      this.setUsersState(STATE.LOADING);
      try {
        const response = await fetchUsers();
        this.setUsers(response);
        this.setUsersState(STATE.SUCCESS);
      } catch (error) {
        this.setUsersState(STATE.ERROR);
        toast.error('Ошибка при загрузке данных.');
      }
    },
  },
});
