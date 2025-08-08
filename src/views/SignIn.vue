<script setup>
import { computed } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuth();
const toast = useToast();

const isSessionActive = computed(() => authStore.currentUser !== null);

const handleLogin = async ({ email, password }) => {
  try {
    await authStore.signIn(email, password);
    await router.push('/');
  } catch (error) {
    toast.error(t('login.error') + ': ' + error.message);
  }
};
const signOut = async () => {
  try {
    await authStore.signOut();
    menu.value = false;
  } catch (error) {
    console.error('Sign out error:', error);
  }
};
const switchToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div>
    <AuthForm
      v-if="!isSessionActive"
      mode="login"
      @submit="handleLogin"
      @switchMode="switchToRegister"
    />

    <div v-else class="logout-container">
      {{ t('login.alreadyLoggedIn') }}
      <v-btn variant="outlined" @click="signOut" class="logout-btn">{{ t('login.logout') }}</v-btn>
    </div>
  </div>
</template>

<style scoped>
.logout-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: #f0f4f8;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  color: #334155;
  font-size: 16px;
  font-weight: 500;
}

.logout-btn {
  padding: 6px 14px;
  font-weight: 600;
}
</style>
