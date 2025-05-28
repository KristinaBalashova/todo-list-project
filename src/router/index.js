import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Board from '../views/Board.vue';
import Project from '../views/ProjectPage.vue';
import TaskPage from '../views/TaskPage.vue';
import Reports from '../views/Reports.vue';
import WorkInProgress from '../views/WorkInProgress.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'task/:id?',
        name: 'task-view',
        component: Home,
        meta: {
          drawer: true,
        },
      },
      {
        path: 'task/new',
        name: 'task-create',
        component: Home,
        meta: {
          drawer: true,
        },
      },
    ],
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
