import axios from 'axios';
import { TODOS_ENDPOINT } from '../../constants/apiUrls';
import { FILTER_OPTIONS, TODOS_STATE } from '../../constants/contants';

const state = () => ({
  todos: [],
  filter: FILTER_OPTIONS.ALL,
  todosState: TODOS_STATE.IDLE,
});

const mutations = {
  setTodos(state, todos) {
    if (Array.isArray(todos)) {
      state.todos = [...todos, ...state.todos];
    } else {
      state.todos = [todos, ...state.todos];
    }
  },
  setFilter(state, filter) {
    state.filter = filter;
  },
  removeCompletedTodos(state) {
    state.todos = state.todos.filter((todo) => !todo.completed);
  },
  editTodo(state, { id, updates }) {
    const index = state.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      Object.assign(state.todos[index], updates);
    }
  },
  setTodosState(state, newState) {
    state.todosState = newState;
  },
};

const actions = {
  async fetchTodos({ commit }, { showToast }) {
    commit('setTodosState', TODOS_STATE.LOADING);
    try {
      // эксперименты с отображением ошибок сервера

      //await new Promise((resolve, reject) => {
      //  setTimeout(() => {
      //    reject(new Error('Simulated error fetching todos'));
      //  }, 2000);
      //});

      const response = await axios(TODOS_ENDPOINT);
      commit('setTodos', response.data);
      commit('setTodosState', TODOS_STATE.SUCCESS);
    } catch (error) {
      commit('setTodosState', TODOS_STATE.ERROR);
      if (showToast) {
        showToast.error(error.message);
      }
    }
  },
  clearCompleted({ commit }) {
    commit('removeCompletedTodos');
  },
  setFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
  setTodos({ commit }, newTodo) {
    commit('setTodos', newTodo);
  },
  setTodosState({ commit }, newState) {
    commit('setTodosState', newState);
  },
  editTodo({ commit }, { id, updates }) {
    commit('editTodo', { id, updates });
  },
};

const getters = {
  todos: (state) => state.todos,
  filter: (state) => state.filter,
  todosState: (state) => state.todosState,
  activeTodos: (state) => state.todos.filter((todo) => !todo.completed),
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
