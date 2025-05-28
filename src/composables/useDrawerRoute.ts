import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

export function useDrawerRoute() {
  const router = useRouter();
  const route = useRoute();

  const isDrawerVisible = computed(() => route.meta.drawer);

  function closeDrawer() {
    router.push({ name: 'home' });
  }

  const drawerMode = computed(() => {
    if (route.name === 'task-create') return 'create';
    if (route.name === 'task-edit') return 'edit';
    return 'view';
  });


  return {
    isDrawerVisible,
    closeDrawer,
    drawerMode,
    route
  };
}
