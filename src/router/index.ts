import router from './routes';
import { useAuthStore } from '../store/auth';

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.user) {
    await auth.getUser();
    if (!auth.user) return next('/login');
  }

  next();
});

export default router;