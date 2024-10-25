<script setup lang="ts">
import type { IProductCard } from '@/components/Pages/ProductsList/ProductCard/ProductCard.d'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { toRef } from 'vue'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'

const props = defineProps<IProductCard>()

const product = toRef(props, 'value')

const computePrice = (p: IProductDTO) => (p.price - (p.price * (p.discountPercentage / 100))).toFixed(2)

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
              <span class="absolute inset-0" />
              {{ product.title }}
            </span>
          </h3>
          <p class="mt-1 text-sm text-gray-500 line-clamp-2	">{{ product.description }}</p>
        </div>
      </div>
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
      <div>
        <button v-if="true" class="bg-gray-100 text-gray-900 rounded-md block w-full py-2 text-sm font-medium">
          {{ $t('Add To Cart') }}
        </button>
        <div v-else class="flex items-center justify-between">
          <button class="border p-2 rounded-md">
            <MinusIcon class="h-4 w-4" />
            <TrashIcon v-if="false" class="h-4 w-4"></TrashIcon>
          </Button>
          <span class="text-lg font-semibold">5</span>
          <button class="border p-2 rounded-md">
            <PlusIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

