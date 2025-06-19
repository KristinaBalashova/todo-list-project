<script setup>
import Input from '../components/ui/Input.vue';
import Select from '../components/ui/Select.vue';
import Button from '../components/ui/Button.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();

const form = ref({
  email: '',
  password: '',
  error: '',
});

const authStore = useAuthStore();

const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login(form.value.email, form.value.password);
    await router.push('/dashboard');
  } catch (error) {
    toast.error(error.message);
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="form">
    <h2>Добро пожаловать!</h2>
    <Input v-model="email" placeholder="Email" />
    <Input v-model="password" type="password" placeholder="Password" />
    <Button type="submit">Войти</Button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </form>
</template>

<style scoped>
.form {
  width: 60%;
  margin: 30px auto
}
</style>
