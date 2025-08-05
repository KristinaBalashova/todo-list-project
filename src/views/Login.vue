<script setup>
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const handleLogin = async ({ email, password }) => {
  try {
    await authStore.login(email, password);
    await router.push('/dashboard');
  } catch (error) {
    toast.error(t('login.error') + ': ' + error.message);
  }
};

const switchToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <AuthForm mode="login" @submit="handleLogin" @switchMode="switchToRegister" />
</template>
