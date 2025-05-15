<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary', // options: primary, secondary, success, error, warning, info
  },
  variant: {
    type: String,
    default: 'outlined', // options: outlined, plain, text, elevated
  },
});
</script>

<template>
  <v-chip :variant="variant" v-bind="$attrs" class="chip" :class="[variant, `chip--${color}`]">
    <slot />
  </v-chip>
</template>

<style scoped>
.chip {
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* Elevated chip background + text color */
.chip.elevated.chip--primary {
  background-color: var(--color-primary-light) !important;
  color: var(--color-primary-dark) !important;
}

.chip.elevated.chip--secondary {
  background-color: var(--color-secondary-light) !important;
  color: var(--color-secondary-dark) !important;
}

.chip.elevated.chip--success {
  background-color: var(--color-success-light) !important;
  color: var(--color-success-dark) !important;
}

.chip.elevated.chip--error {
  background-color: var(--color-error-light) !important;
  color: var(--color-error-dark) !important;
}

.chip.elevated.chip--warning {
  background-color: var(--color-warning-light) !important;
  color: var(--color-warning-dark) !important;
}

.chip.elevated.chip--info {
  background-color: var(--color-info-light) !important;
  color: var(--color-info-dark) !important;
}

/* Outlined or text style colors */
.chip--primary {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.chip--secondary {
  color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.chip--success {
  color: var(--color-success);
  border-color: var(--color-success);
}

.chip--error {
  color: var(--color-error);
  border-color: var(--color-error);
}

.chip--warning {
  color: var(--color-warning);
  border-color: var(--color-warning);
}

.chip--info {
  color: var(--color-info);
  border-color: var(--color-info);
}
</style>
