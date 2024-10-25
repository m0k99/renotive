<script setup lang="ts">
import type { IProductCard } from '@/components/Pages/Cart/OrderProducts/ProductCard/ProductCard'
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { toRef } from 'vue'
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps<IProductCard>()

const product = toRef(props, 'value')

const cartStore = useCartStore()
const addToCart = () => cartStore.addToCart(product.value)
const removeFromCart = () => cartStore.removeFromCart(product.value)

</script>

<template>
  <div class="py-10 border-b">
    <div class="flex justify-start gap-3 flex-col sm:flex-row">
      <div class="aspect-square max-w-48 w-full overflow-hidden bg-gray-200 h-48 rounded-md">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="object-cover object-center h-full w-full"
        />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="flex flex-1 justify-between">
          <div class="flex justify-between flex-1 w-full">
            <div>
              <h3 class="text-md text-gray-800">
                {{ product.title }}
              </h3>
            </div>
            <div
              class="flex gap-2 text-sm"
              :class="product.availabilityStatus==='In Stock'?'text-green-600':'text-yellow-500'"
            >
              <CheckIcon class="w-5 h-5" />
              <span>
              {{ product.availabilityStatus }}
            </span>
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-end">
          <button
            @click="removeFromCart"
            class="border p-2 rounded-md cursor-pointer border-red-600 text-red-600"
          >
            <MinusIcon v-if="product.count>1" class="h-4 w-4" />
            <TrashIcon v-else class="h-4 w-4"></TrashIcon>
          </Button>
          <span class="text-lg font-semibold block w-10 text-center">{{ product.count }}</span>
          <button
            @click="addToCart"
            :disabled="product.stock === product.count"
            :class="{
                'border border-gray-600 p-2 rounded-md cursor-pointer': true,
                'opacity-50 cursor-not-allowed': product.stock === product.count
              }"
          >
            <PlusIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

