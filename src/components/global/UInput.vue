<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const { modelValue } = defineProps({
    modelValue: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text',
        validator: (val) =>
        ['text',
        'password',
        'email',
        'tel',
        'search',
        'textarea'
      ].includes(val)
    }
})

const value = ref(modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<template>
      <input
        v-if="type !== 'textarea'"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
      />

      <textarea
      v-else
      v-model="value"
      :placeholder="placeholder"
      rows="3"
      ></textarea>
</template>