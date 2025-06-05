import { defineStore} from 'pinia';
import { useToast } from 'vue-toastification';

const toast = useToast();


export const useStash = defineStore('stash', {
  state: () => ({
    todos: [] as { id: string; [key: string]: any }[],
    possibleAmount: 2,
  }),

  getters: {
    shashedTodos: (state) => state.todos,
    stashedTodoById: (state) => (todoId: string) => state.todos.find((todo) => todo.id === todoId),
  },

  actions: {
    setStash(todo) {
      if (this.todos.length > this.possibleAmount) {
        toast.error('Можно хранить не более ' + this.possibleAmount + ' задач.');
      }

      this.todos.unshift(todo);
    },
    clearStash() {
      this.todos = [];
    },
  },
});