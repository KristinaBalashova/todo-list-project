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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}
</script>

<template>
  <div class="auth-wrapper">
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2 class="form-title">
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

      <Button type="submit" class="primary-button">
        {{ mode === 'login' ? t('login.submit') : t('register.submit') }}
      </Button>

      <button type="button" class="switch-mode" @click="$emit('switchMode')">
        {{ mode === 'login' ? t('login.createAccount') : t('register.backToLogin') }}
      </button>

      <div class="credentials">
        <p class="label">Зайти как администратор:</p>
        <div class="credentials-box">
          <p @click="copyToClipboard('admainemail1222@gmail.com')" class="copyable">
            Email: admainemail1222@gmail.com 📋
          </p>
          <p @click="copyToClipboard('12345678')" class="copyable">
            Password: 12345678 📋
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: #f5f7fa;
  padding: 20px;
}

.auth-form {
  background: #fff;
  border-radius: 16px;
  padding: 30px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-title {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.primary-button {
  width: 100%;
  font-size: 15px;
  border-radius: 8px;
}

.switch-mode {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  margin-top: -8px;
  transition: color 0.2s;
}

.switch-mode:hover {
  color: #0056b3;
}

.credentials {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 10px;
}

.label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.credentials-box {
  background-color: #f0f0f0;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px dashed #ccc;
}

.copyable {
  margin: 4px 0;
  font-size: 13px;
  color: #444;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.copyable:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>
