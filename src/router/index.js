import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';         
import Board from '../views/Board.vue';
import Project from '../views/Project.vue'; 
import Task from '../views/Task.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project,
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: Task,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;