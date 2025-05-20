<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'solo-filled', // default outlined undelined solo-filled solo-iverted
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
    :variant="variant"
    clearable
  />
</template>

<style scoped></style>
