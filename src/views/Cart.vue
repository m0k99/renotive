<script setup lang="ts">
import OrderSummary from '@/components/Pages/Cart/OrderSummary/OrderSummary.vue'
import OrderProducts from '@/components/Pages/Cart/OrderProducts/OrderProducts.vue'
import { useCartStore } from '@/stores/useCartStore'
import { toRef } from 'vue'
import EmptyState from '@/components/Pages/Cart/EmptyState/EmptyState.vue'

const cartStore = useCartStore()

const cartProducts = toRef(cartStore, 'cartProducts')

</script>

<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 space-y-12">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900">{{ $t('Shopping Cart') }}</h2>

      <div v-if="cartProducts.length" class="grid grid-cols-6 lg:grid-cols-12 gap-16">
        <div class="col-span-6 lg:col-span-7">
          <OrderProducts />
        </div>
        <div class="col-span-6 lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
      <div v-else>
        <EmptyState />
      </div>
    </div>
  </div>
</template>

