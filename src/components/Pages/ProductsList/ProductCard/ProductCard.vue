<script setup lang="ts">
import type { IProductCard } from '@/components/Pages/ProductsList/ProductCard/ProductCard.d'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed, toRef } from 'vue'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'
import { useCartStore } from '@/stores/useCartStore'
import Rate from '@/components/Core/Rate/Rate.vue'

const props = defineProps<IProductCard>()

const product = toRef(props, 'value')

const cartStore = useCartStore()

const cartProducts = toRef(cartStore, 'cartProducts')
const computePrice = (p: IProductDTO) => (p.price - (p.price * (p.discountPercentage / 100))).toFixed(2)

const addToCart = () => cartStore.addToCart(product.value)
const removeFromCart = () => cartStore.removeFromCart(product.value)

const productInCart = computed(() => cartProducts.value.find(i => i.id === product.value.id))
</script>

<template>
  <div class="group relative grid grid-cols-1 border rounded-lg">
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none lg:h-96">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-75"
      />
    </div>
    <div class="grid grid-cols-1 gap-4 p-4">
      <div class="flex justify-between">
        <div>
          <h3 class="text-sm text-gray-800">
            <span>
              {{ product.title }}
            </span>
          </h3>
          <p class="mt-1 text-sm text-gray-500 line-clamp-2	">{{ product.description }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2">
        <span
          :class="{
            'line-through text-red-600': product.discountPercentage > 0
          }"
        >
          ${{ product.price }}
        </span>
          <span v-if="product.discountPercentage > 0">${{ computePrice(product) }}</span>
        </div>
        <Rate :value="product.rating"/>
      </div>
      <div>
        <button
          @click="addToCart"
          v-if="!productInCart"
          class="bg-gray-100 text-gray-900 rounded-md block w-full py-2 text-sm font-medium cursor-pointer"
        >
          {{ $t('Add To Cart') }}
        </button>
        <div v-else class="flex items-center justify-between pb-0.5">
          <button
            @click="removeFromCart"
            class="border p-2 rounded-md cursor-pointer border-red-600 text-red-600"
          >
            <MinusIcon v-if="productInCart.count>1" class="h-4 w-4" />
            <TrashIcon v-else class="h-4 w-4"></TrashIcon>
          </Button>
          <span class="text-lg font-semibold">{{ productInCart.count }}</span>
          <button @click="addToCart" class="border p-2 rounded-md cursor-pointer">
            <PlusIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

