import { STATE } from '../constants/contants';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { fetchUsers } from '../api/usersApi';

const toast = useToast();

export const useUsers = defineStore('users', {
  state: () => ({
    users: [],
    usersState: STATE.IDLE,
  }),
  getters: {
    userById: (state) => (userId) => state.users.find((u) => u.id === userId),
  },

  actions: {
    setUsers(users) {
      this.users = users;
    },
    editUser({ id, updates }) {
      const index = this.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        Object.assign(this.users[index], updates);
      }
    },
    setUsersState(newState) {
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
