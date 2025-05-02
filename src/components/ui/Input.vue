<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <v-text-field
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event)"
    :placeholder="placeholder"
    class="ui-input"

  />
</template>

<style scoped>
.ui-input {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #333;
  background-color: white;
  border-radius: 8px;
}

.v-input__control {
  border-radius: 8px;
}

.v-text-field__slot {
  padding: 10px 14px;
}

.v-text-field--outlined .v-input__control {
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.v-text-field--outlined:focus-within .v-input__control {
  border-color: #7e3f52;
  box-shadow: 0 0 0 3px rgba(158, 58, 94, 0.2);
}
</style>
