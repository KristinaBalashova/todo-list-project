<script setup>
import Input from './ui/Input.vue';
import Button from './ui/Button.vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  mode: {
    type: String,
    default: 'login', // 'login' или 'register'
  },
});

const emit = defineEmits(['submit', 'switchMode']);

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const handleSubmit = () => {
  emit('submit', { ...form.value });
};

watch(
  () => props.mode,
  () => {
    form.value = { email: '', password: '', confirmPassword: '' };
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>
      {{ mode === 'login' ? t('login.welcome') : t('register.title') }}
    </h2>

    <Input v-model="form.email" placeholder="Email" />
    <Input
      v-model="form.password"
      type="password"
      :placeholder="mode === 'login' ? t('login.password') : t('register.password')"
    />
    <Input
      v-if="mode === 'register'"
      v-model="form.confirmPassword"
      type="password"
      :placeholder="t('register.confirmPassword')"
    />

    <Button type="submit">
      {{ mode === 'login' ? t('login.submit') : t('register.submit') }}
    </Button>

    <Button type="button" @click="$emit('switchMode')">
      {{ mode === 'login' ? t('login.createAccount') : t('register.backToLogin') }}
    </Button>
  </form>
</template>

<style scoped>
.form {
  width: 60%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
