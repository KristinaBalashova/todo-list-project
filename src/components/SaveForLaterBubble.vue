<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-tooltip :text="item.title" location="top" class="tooltip-wrapper">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="container">
        🕒
      </div>
    </template>
  </v-tooltip>
</template>

<style scoped>
.container {
  padding: 12px 16px;
  background-color: #2d3748;
  color: #f7fafc;
  border-radius: 24px;
  cursor: pointer;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  user-select: none;
  transition: background-color 0.3s ease;
}

.container:hover {
  background-color: #4a5568;
}

.tooltip-wrapper .v-tooltip__content {
  background-color: #2d3748;
  color: #f7fafc;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  max-width: 220px;
  white-space: normal;
  text-align: center;
  transition: opacity 0.3s ease;
  line-height: 1.4;
}
</style>
