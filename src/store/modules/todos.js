import axios from 'axios';

const state = () => ({
  todos: [],
  filter: 'all', // options: active, completed, all
});

const mutations = {
  setTodos(state, todo) {
    if (Array.isArray(todo)) {
      state.todos = [...todo, ...state.todos];
    } else {
      state.todos = [todo, ...state.todos];
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
};

const actions = {
  async fetchTodos({ commit }) {
    try {
      const response = await axios('https://jsonplaceholder.typicode.com/users/1/todos?_limit=5');
      commit('setTodos', response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
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
  updateTodoTitle({ commit }, { id, newTitle }) {
    commit('updateTodoTitle', { id, newTitle });
  },
  updateTodoStatus({ commit }, { id }) {
    commit('updateTodoStatus', { id });
  },
};

const getters = {
  todos: (state) => state.todos,
  activeTodos: (state) => state.todos.filter((todo) => !todo.completed),
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  filter: (state) => state.filter,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
