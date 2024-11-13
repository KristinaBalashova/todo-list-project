import axios from 'axios';

const state = () => ({
  todos: [],
  filter: 'all', // options: active, completed, all
  todosState: 'success', // idle, loading, error, success
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
  async fetchTodos({ commit }) {
    commit('setTodosState', 'loading');
    try {
      const response = await axios('https://jsonplaceholder.typicode.com/users/1/todos?_limit=5');
      commit('setTodos', response.data);
      commit('setTodosState', 'success');
    } catch (error) {
      commit('setTodosState', 'error');
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