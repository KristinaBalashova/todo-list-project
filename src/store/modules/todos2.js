const state = {
  todos: [],
  newTodo: '',
  error: null,
  filter: 'all',
  count: 0,
};

const mutations = {
  increment(state) {
    state.count++;
  },
  GET_TODO(state, todo) {
    state.newTodo = todo;
  },
  ADD_TODO(state) {
    if (state.newTodo.trim()) {
      state.todos.push({
        id: Date.now(),
        body: state.newTodo,
        completed: false,
      });
      state.newTodo = '';
    }
  },
  EDIT_TODO(state, updatedTodo) {
    const todo = state.todos.find((t) => t.id === updatedTodo.id);
    if (todo) {
      todo.body = updatedTodo.body;
    }
  },
  REMOVE_TODO(state, todo) {
    state.todos = state.todos.filter((t) => t.id !== todo.id);
  },
  COMPLETE_TODO(state, todo) {
    const foundTodo = state.todos.find((t) => t.id === todo.id);
    if (foundTodo) {
      foundTodo.completed = !foundTodo.completed;
    }
  },
  CLEAR_TODO(state) {
    state.newTodo = '';
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_FILTER(state, filter) {
    state.filter = filter; // обновляем состояние фильтра
  },
};

const actions = {
  getTodo({ commit }, todo) {
    commit('GET_TODO', todo);
  },
  addTodo({ commit }) {
    commit('ADD_TODO');
  },
  editTodo({ commit }, todo) {
    commit('EDIT_TODO', todo);
  },
  removeTodo({ commit }, todo) {
    commit('REMOVE_TODO', todo);
  },
  completeTodo({ commit }, todo) {
    commit('COMPLETE_TODO', todo);
  },
  clearTodo({ commit }) {
    commit('CLEAR_TODO');
  },
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  },
};

const getters = {
  newTodo: (state) => state.newTodo,
  filteredTodos: (state) => {
    if (state.filter === 'all') {
      return state.todos;
    } else if (state.filter === 'active') {
      return state.todos.filter((todo) => !todo.completed);
    } else if (state.filter === 'completed') {
      return state.todos.filter((todo) => todo.completed);
    }
    return state.todos;
  },
  currentFilter: (state) => state.filter,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
