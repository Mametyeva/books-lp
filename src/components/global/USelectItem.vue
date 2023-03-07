<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const { modelValue } = defineProps({
    modelValue: String,
    a: String,
})

const value = ref(modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<template>
  <li>
    <a>
      {{ a }}
      <slot></slot>
    </a>
  </li>
</template>