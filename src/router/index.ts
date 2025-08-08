import router from './routes';
import { useAuth } from '../store/auth';

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth();
  
  next();
});

export default router;