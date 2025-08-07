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

    <div v-else>
      {{ t('login.alreadyLoggedIn') }}
      <v-btn variant="outlined" @click="signOut">{{ t('login.logout') }}</v-btn>
    </div>
  </div>
</template>
