<script setup>

defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "Card title"
    },
    subtitle: {
        type: String,
        default: "Subtitle"
    },
    text: {
        type: String,
        default: "Subtitle"
    }
})
</script>

<template>
  <v-card :loading="loading" :title="title" :subtitle="subtitle" :text="text" class="ui-card">
    <v-card-actions>
      <slot name="action-button"/>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.ui-card {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
