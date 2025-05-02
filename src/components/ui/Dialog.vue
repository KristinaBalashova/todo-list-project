<script setup>
import { computed } from 'vue';
import Card from './Card.vue';
import Button from './Button.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="60%">
    <Card :title="title">
      <template #content>
        <slot name="content" />
      </template>
      <template #action-button>
        <slot name="action-button" />
        <Button color="primary" @click="dialogVisible = false">Закрыть</Button>
      </template>
    </Card>
  </v-dialog>
</template>
