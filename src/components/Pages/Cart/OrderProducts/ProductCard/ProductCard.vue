<script setup lang="ts">
import type { IProductCard } from '@/components/Pages/Cart/OrderProducts/ProductCard/ProductCard'
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon, XMarkIcon, EqualsIcon } from '@heroicons/vue/24/outline'
import { toRef } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'

const props = defineProps<IProductCard>()

const product = toRef(props, 'value')

const cartStore = useCartStore()
const addToCart = () => cartStore.addToCart(product.value)
const removeFromCart = () => cartStore.removeFromCart(product.value)

const computePrice = (p: IProductDTO) =>
  parseFloat((p.price - (p.price * (p.discountPercentage / 100))).toFixed(2))


</script>

<template>
  <div class="py-10 border-b">
    <div class="flex justify-start gap-3 flex-col lg:flex-row">
      <div class="aspect-square lg:max-w-48 w-full overflow-hidden bg-gray-200 lg:h-48 rounded-md">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="object-cover object-center h-full w-full"
        />
      </div>
      <div class="flex-1 flex flex-col gap-4">
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
        <div class="w-full flex items-end justify-between">
          <div class="flex items-center gap-2">
            <div class="flex flex-col items-center justify-start gap-1">
              <span
                :class="{
                  'line-through text-red-600': product.discountPercentage > 0
                }"
              >
                ${{ product.price }}
              </span>
              <span v-if="product.discountPercentage > 0">${{ computePrice(product) }}</span>
            </div>
            <XMarkIcon class="w-5 h-5 text-indigo-600" />
            <span>
              {{ product.count }}
            </span>
            <EqualsIcon class="w-5 h-5 text-indigo-600"></EqualsIcon>
            <div class="flex flex-col items-center justify-start gap-1">
              <span
                :class="{
                  'line-through text-red-600': product.discountPercentage > 0
                }"
              >
                ${{ (product.price*product.count).toFixed(2) }}
              </span>
              <span v-if="product.discountPercentage > 0">${{ (computePrice(product)*product.count).toFixed(2) }}</span>
            </div>
          </div>
          <div class="flex items-center  justify-end">
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
              <PlusIcon v-if="product.stock > product.count" class="h-4 w-4" />
              <span v-else class="text-xs h-4 block">
                MAX
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

