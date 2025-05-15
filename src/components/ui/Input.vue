<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
});

const modelValue = defineModel();
</script>

<template>
  <v-text-field
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="modelValue = $event"
    :placeholder="placeholder"
    class="custom-input"
  />
</template>

<style scoped></style>
