<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const { modelValue } = defineProps({
    modelValue: String,
    src: String,
    alt: String,
    title: String,
    description: String,
    price: Number,
    cost: Number,
})

const value = ref(modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<template>
      <div class="card col-between">
        <div class="card-img">
          <img
            :src="src"
            :alt="alt"
          />
        </div>
        <p class="card-name subtitle">{{ title }}</p>
        <p class="card-autor caption">{{ description }}</p>
        <div class="price line">
          <p class="old-price caption">{{ cost }}</p>
          <p class="value-price">{{ price }}</p>
        </div>
        <button class="card-btn">Купить</button>
      </div>
</template>