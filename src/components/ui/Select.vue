<script setup>
defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: '',
  },
});

const modelValue = defineModel();
</script>

<template>
  <v-select
    v-model="modelValue"
    clearable
    :label="label"
    :items="options"
    v-bind="$attrs"
    variant="underlined"
  />
</template>
