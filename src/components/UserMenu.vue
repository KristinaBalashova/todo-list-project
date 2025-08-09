<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth, useUsers } from '../store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const authStore = useAuth();
const userStore = useUsers();

const menu = ref(false);
const mode = ref(false);

const isUserActive = computed(() => authStore.currentUser !== null);

const userId = computed(() => authStore.currentUser?.id || '');
const currentUser = computed(() => userStore.currentUser);

const userName = computed(() => {
  return currentUser.value ? currentUser.value.name : 'Guest';
});

const userRole = computed(() => {
  return currentUser.value ? currentUser.value.role : 'Guest';
});

onMounted(async () => {
  if (userId.value) {
    try {
      await userStore.getUserById(userId.value);
    } catch (e) {
      console.error('Ошибка загрузки данных пользователя:', e);
    }
  }
});

const signOut = async () => {
  try {
    await authStore.signOut();
    menu.value = false;
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

watch(
  () => authStore.currentUser?.id,
  async (id) => {
    if (id) {
      try {
        await userStore.getUserById(id);
      } catch (e) {
        console.error('Ошибка загрузки данных пользователя:', e);
      }
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <img
          src="/user.png"
          alt="user-menu"
          class="{{ this.isUserActive ? 'active' : '' }} user-menu-icon"
          v-bind="props"
        />
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item prepend-avatar="/cat-avatar.png" :subtitle="userRole" :title="userName">
          </v-list-item>
        </v-list>
        <!--

        <v-list>
          <v-list-item>
            <v-switch
              v-model="mode"
              color="purple"
              label="Сменить тему"
              hide-details
              disabled="true"
            ></v-switch>
          </v-list-item>
        </v-list>
        -->
        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="signOut" v-if="isUserActive">{{
            t('login.logout')
          }}</v-btn>
          <v-btn variant="text" @click="menu = false">{{ t('hideMenu') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.user-menu-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.active {
  background: #cae9f5;
}
</style>
