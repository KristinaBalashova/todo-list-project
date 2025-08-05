import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Project from '../views/ProjectPage.vue';
import WorkInProgress from '../views/WorkInProgress.vue';
import AdminPage from '../views/AdminPage.vue';

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
      {
        path: 'task/edit/:id',
        name: 'task-edit',
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
    component: Auth,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    //meta: { requiresAuth: true },
  },
  {
    path: '/project/:id',
    redirect: '/work-in-progress',
    //name: 'Project',
    //component: Project,
  },
  {
    path: '/work-in-progress',
    name: 'WorkInProgress',
    component: WorkInProgress,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/work-in-progress',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
