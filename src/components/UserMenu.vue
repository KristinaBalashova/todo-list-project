<script setup>
import { ref } from 'vue';

const menu = ref(false);
const mode = ref(false);
</script>

<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <img src="/user.png" alt="user-menu" class="user-menu-icon" v-bind="props"/> 
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="/cat-avatar.png"
            subtitle="User role or description"
            title="User Name"
          >
          </v-list-item>
        </v-list>
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="menu = false">Скрыть</v-btn>
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
</style>
