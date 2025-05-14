import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Board from '../views/Board.vue';
import Project from '../views/ProjectPage.vue';
import Task from '../views/Task.vue';
import Reports from '../views/Reports.vue';
import WorkInProgress from '../views/WorkInProgress.vue'; // Import the new component
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    //component: Auth,
    redirect: '/work-in-progress',
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
    //component: Task,
    redirect: '/work-in-progress',
  },
  {
    path: '/reports',
    name: 'Reports',
    //component: Reports,
    redirect: '/work-in-progress',
  },
  {
    path: '/work-in-progress',
    name: 'WorkInProgress',
    component: WorkInProgress,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/wip',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
