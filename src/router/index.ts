import router from './routes';
import { useAuth } from '../store/auth';

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth();
  
  console.log('AuthStore User:', authStore.currentUser);
  next();
});

export default router;