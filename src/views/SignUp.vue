<script setup>
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuth();
const toast = useToast();

const handleRegister = async ({ email, password, confirmPassword }) => {
  if (password !== confirmPassword) {
    toast.error(t('register.passwordMismatch'));
    return;
  }

  try {
    await authStore.register(email, password);
    toast.success(t('register.success'));
    await router.push('/dashboard');
  } catch (error) {
    toast.error(t('register.error') + ': ' + error.message);
  }
};

const switchToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <AuthForm mode="register" @submit="handleRegister" @switchMode="switchToLogin" />
</template>
