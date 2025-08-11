import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import WorkInProgress from '../views/WorkInProgress.vue';
import AdminPage from '../views/AdminPage.vue';
import SignUp from '../views/SignUp.vue';

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
    path: '/login',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/work-in-progress',
    //component: AdminPage,
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
