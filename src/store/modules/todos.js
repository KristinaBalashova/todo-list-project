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
  updateTodoTitle(state, { id, newTitle }) {
    const todo = state.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = newTitle;
    }
  },
  updateTodoStatus(state, { id }) {
    const todo = state.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
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
  updateTodoTitle({ commit }, { id, newTitle }) {
    commit('updateTodoTitle', { id, newTitle });
  },
  updateTodoStatus({ commit }, { id }) {
    commit('updateTodoStatus', { id });
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
