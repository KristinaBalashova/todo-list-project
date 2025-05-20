import { FILTER_OPTIONS, TODOS_STATE } from '../constants/contants';
import { defineStore } from 'pinia';
import { fetchTasks } from '../api/tasksApi';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useTodos = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: FILTER_OPTIONS.ALL,
    todosState: TODOS_STATE.IDLE,
  }),

  getters: {
    activeTodos: (state) => state.todos.filter((t) => t.status !== 'done'),
    completedTodos: (state) => state.todos.filter((t) => t.status === 'done'),
    todosByProject: (state) => (projectId) => state.todos.filter((t) => t.project_id === projectId),
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

    async fetchTodos() {
      this.setTodosState(TODOS_STATE.LOADING);
      try {
        const response = await fetchTasks();
        this.setTodos(response);
        this.setTodosState(TODOS_STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(TODOS_STATE.ERROR);
        toast.error('Ошибка при загрузке данных.');
      }
    },

    /*

    async fetchTodosByProjectId(projectId) {
      this.setTodosState(TODOS_STATE.LOADING);
      try {
        const response = await fetchTasksByProjectId(projectId);
        this.setTodos(response);
        this.setTodosState(TODOS_STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(TODOS_STATE.ERROR);
        toast.error('Ошибка при загрузке задач проекта.');
      }
    },

    */
  },
});
