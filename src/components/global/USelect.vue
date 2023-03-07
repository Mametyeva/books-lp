<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const { modelValue } = defineProps({
    modelValue: String,
    class: String,
})

const value = ref(modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<template>
  <div class="collaps-search">
      <ul
      class="collaps-search-items"
      :class="class"
      >
        <slot></slot>
      </ul>
    </div>
</template>