<script setup lang="ts">
import ProductCard from '@/components/Pages/ProductsList/ProductCard/ProductCard.vue'
import { onMounted, toRef } from 'vue'
import { useProductsStore } from '@/stores/useProductsStore'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/useCartStore'

onMounted(() => {
  productsStore.fetch()
})

const productsStore = useProductsStore()
const cartStore = useCartStore()

const products = toRef(productsStore, 'products')
const totalCostAfterDiscounts = toRef(cartStore, 'totalCostAfterDiscounts')

</script>


<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ $t('Perfect Products') }}</h2>
        <div class="flex items-center gap-2 ">
          <ShoppingCartIcon class="w-6 h-6 hidden sm:block"/>
          <span class="font-bold">
            {{ $t('Total:' ) }} ${{totalCostAfterDiscounts}}
          </span>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :value="product"
        />
      </div>
    </div>
  </div>
</template>

