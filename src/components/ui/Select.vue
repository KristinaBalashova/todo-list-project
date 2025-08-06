<script setup>
const props = defineProps({
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
    item-title="label"
    item-value="value"
    v-bind="$attrs"
    variant="underlined"
    class="select"
  />
</template>

<style scoped>  
.select {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
