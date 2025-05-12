
import { FILTER_OPTIONS, TODOS_STATE } from '../constants/contants';
import { defineStore } from 'pinia';
import { fetchTasks } from '../api/tasksApi';

export const useTodos = defineStore('todos', {
  state: () => {
    return {
      todos: [],
      filter: FILTER_OPTIONS.ALL,
      todosState: TODOS_STATE.IDLE,
    };
  },
  actions: {
    setTodos(todos) {
      if (Array.isArray(todos)) {
        this.todos = [...todos, ...this.todos];
      }
    },
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    setFilter(filter) {
      this.filter = filter;
    },
    removeCompletedTodos() {
      this.todos = this.todos.filter((todo) => todo.status !== 'done');
    },
    editTodo({ id, updates }) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        Object.assign(this.todos[index], updates);
      }
    },
    setTodosState(newState) {
      this.todosState = newState;
    },
    async fetchTodos() {
      this.setTodosState(TODOS_STATE.LOADING);
      try {
        const response = await fetchTasks();
        console.log('response', response);
        this.setTodos(response);
        this.setTodosState(TODOS_STATE.SUCCESS);
      } catch (error) {
        this.setTodosState(TODOS_STATE.ERROR);
        // todo обновить showToast здесь
      }
    },
    clearCompleted() {
      this.removeCompletedTodos();
    },
  },
  getters: {
    activeTodos: (state) => state.todos.filter((todo) => todo.status !== 'done'),
    completedTodos: (state) => state.todos.filter((todo) => todo.status === 'done' ),
  },    
});

