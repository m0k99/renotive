<script setup lang="ts">
import ProductCard from '@/components/Pages/Cart/OrderProducts/ProductCard/ProductCard.vue'
import { useCartStore } from '@/stores/useCartStore'
import { toRef } from 'vue'

const cartStore = useCartStore()

const cartProducts = toRef(cartStore, 'cartProducts')
</script>

<template>
  <div class="border-t">
    <ProductCard v-for="(product, index) in cartProducts" :key="index" :value="product" />
  </div>
</template>

