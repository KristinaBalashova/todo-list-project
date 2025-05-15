<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
});
</script>

<template>
  <v-card :loading="loading" :title="title" :subtitle="subtitle" class="ui-card">
    <v-card-actions>
      <slot name="action-button" />
    </v-card-actions>
    <slot name="content"> </slot>
  </v-card>
</template>

<style scoped>
.ui-card {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
