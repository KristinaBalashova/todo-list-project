import { defineStore } from 'pinia';
import { fetchTasks, deleteTodo } from '../api/tasksApi';
import { useToast } from 'vue-toastification';
import { Todo, Todos } from '../types/todos';
import { LoadingState, STATE, FilterType} from '../types/common';

const toast = useToast();

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: [] as Todos,
    filter: FilterType.ALL,
    todosState: STATE.IDLE as LoadingState,
  }),

  getters: {
    activeTodos: (state) => state.todos.filter((t: Todo) => t.status === 'todo'),
    completedTodos: (state) => state.todos.filter((t: Todo) => t.status === 'done'),
    todosInProgress: (state) => state.todos.filter((t: Todo) => t.status === 'in_progress'),
    todosByProject: (state) => (projectId: string) => state.todos.filter((t: Todo) => t.projectId === projectId),
    todoById: (state) => (todoId: string) => state.todos.find((t: Todo) => t.id === todoId),
  },

  actions: {
    setTodos(todos: Todos) {
      if (Array.isArray(todos)) {
        this.todos = todos;
      }
    },

    addTodo(todo) {
      this.todos.unshift(todo);
    },
    async deleteTodo(id: string) {
      this.setTodosState(STATE.LOADING);
      try {
        const response = await deleteTodo(id);
        this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
        this.setTodosState(STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(STATE.ERROR);
        toast.error('Ошибка при удалении.');
      }
    },

    editTodo({ id, updates }: { id: string; updates: Partial<Todo> }) {
      const index = this.todos.findIndex((todo: Todo) => todo.id === id);
      if (index !== -1) {
        Object.assign(this.todos[index], updates);
      }
    },

    removeCompletedTodos() {
      this.todos = this.todos.filter((todo) => todo.status !== 'done');
    },

    clearCompleted() {
      this.removeCompletedTodos();
    },

    setFilter(filter: string) {
      this.filter = filter;
    },

    setTodosState(newState: LoadingState) {
      this.todosState = newState;
    },
    updateTodoInStore(updatedTodo: Todo) {
      const index = this.todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...updatedTodo };
      }
    },
    async fetchTodos() {
      this.setTodosState(STATE.LOADING);
      try {
        const response = await fetchTasks();
        this.setTodos(response);
        this.setTodosState(STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(STATE.ERROR);
        toast.error('Ошибка при загрузке данных.');
      }
    },
  },
});
