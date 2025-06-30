import { FILTER_OPTIONS, STATE } from '../constants/contants';
import { defineStore } from 'pinia';
import { fetchTasks, deleteTodo } from '../api/tasksApi';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: FILTER_OPTIONS.ALL,
    todosState: STATE.IDLE,
  }),

  getters: {
    activeTodos: (state) => state.todos.filter((t) => t.status === 'todo'),
    completedTodos: (state) => state.todos.filter((t) => t.status === 'done'),
    todosInProgress: (state) => state.todos.filter((t) => t.status === 'in_progress'),
    todosByProject: (state) => (projectId) => state.todos.filter((t) => t.project_id === projectId),
    todoById: (state) => (todoId) => state.todos.find((t) => t.id === todoId),
  },

  actions: {
    setTodos(todos) {
      if (Array.isArray(todos)) {
        this.todos = todos;
      }
    },

    addTodo(todo) {
      this.todos.unshift(todo);
    },
    async deleteTodo(id) {
      this.setTodosState(STATE.LOADING);
      try {
        const response = await deleteTodo(id);
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.setTodosState(STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(STATE.ERROR);
        toast.error('Ошибка при удалении.');
      }
    },

    editTodo({ id, updates }) {
      const index = this.todos.findIndex((todo) => todo.id === id);
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

    setFilter(filter) {
      this.filter = filter;
    },

    setTodosState(newState) {
      this.todosState = newState;
    },
    updateTodoInStore(updatedTodo) {
      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
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

    /*

    async fetchTodosByProjectId(projectId) {
      this.setTodosState(STATE.LOADING);
      try {
        const response = await fetchTasksByProjectId(projectId);
        this.setTodos(response);
        this.setTodosState(STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(STATE.ERROR);
        toast.error('Ошибка при загрузке задач проекта.');
      }
    },

    */
  },
});
