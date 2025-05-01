<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary', // primary, secondary, success, error, warning, info
  },
  variant: {
    type: String,
    default: 'outlined', // options: outlined, plain, text, elevated
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <v-btn 
    v-bind="$attrs" 
    :variant="variant" 
    class="btn"
    :class="[`btn--${color}`, variant]"
    :disabled="disabled"
  >
    <slot />
  </v-btn>
</template>

<style scoped>
.btn {
  font-weight: 600;
  font-size: 14px;
  border-radius: 6px;
  text-transform: none;
}

/* Primary */
.btn--primary {
  background-color: var(--color-primary);
  color: white;
}
.btn--primary:hover {
  background-color: var(--color-primary-dark);
}

/* Secondary */
.btn--secondary {
  background-color: var(--color-secondary);
  color: white;
}
.btn--secondary:hover {
  background-color: var(--color-secondary-dark);
}

/* Success */
.btn--success {
  background-color: var(--color-success);
  color: white;
}
.btn--success:hover {
  background-color: var(--color-success-dark);
}

/* Error */
.btn--error {
  background-color: var(--color-error);
  color: white;
}
.btn--error:hover {
  background-color: var(--color-error-dark);
}

/* Warning */
.btn--warning {
  background-color: var(--color-warning);
  color: black;
}
.btn--warning:hover {
  background-color: var(--color-warning-dark);
}

/* Info */
.btn--info {
  background-color: var(--color-info);
  color: white;
}
.btn--info:hover {
  background-color: var(--color-info-dark);
}
</style>
