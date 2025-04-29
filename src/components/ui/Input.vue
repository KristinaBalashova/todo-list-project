<template>
    <input
      class="ui-input"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </template>
  
  <script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
  </script>
  
  <style scoped>
  .ui-input {
    width: 100%;
    padding: 10px 14px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background-color: white;
    color: #333;
  }
  
  .ui-input:focus {
    border-color: #7e3f52;
    box-shadow: 0 0 0 3px rgba(158, 58, 94, 0.2);
    outline: none;
  }
  </style>
  