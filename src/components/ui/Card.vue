<script setup>

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <v-card
    :loading="loading"
    class="ui-card"
    elevation="3"
  >
    <v-card-title class="card-title">
      {{ title }}
    </v-card-title>

    <v-card-subtitle v-if="subtitle" class="card-subtitle">
      {{ subtitle }}
    </v-card-subtitle>

    <v-card-text class="card-content">
      <slot name="content" />
    </v-card-text>

    <v-divider v-if="$slots['action-button']" class="devider" />

    <v-card-actions class="card-actions" v-if="$slots['action-button']">
      <slot name="action-button" />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.ui-card {
  width: 100%;
  border-radius: 12px;
  background-color: #ffffff;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.ui-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e1e1e;
  padding-bottom: 0;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #777;
  padding-top: 0;
}

.card-content {
  font-size: 0.95rem;
  padding-top: 4px;
  color: #333;
}

.card-actions {
  justify-content: flex-end;
}

.devider {
  margin: 0px 2px;
}
</style>
