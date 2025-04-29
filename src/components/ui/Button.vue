<template>
    <button class="ui-button" v-bind="$attrs">
      <slot />
    </button>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .ui-button {
    padding: 10px 20px;
    background-color: #993955;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .ui-button:hover {
    background-color: #752d41;
  }
  
  .ui-button:disabled {
    background-color: #c4a4aa;
    cursor: not-allowed;
  }
  </style>
  