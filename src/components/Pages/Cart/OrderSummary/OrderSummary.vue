<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { ref, toRef } from 'vue'
import Confetti from '@/components/Core/Confetti/Confetti.vue'

const cartStore = useCartStore()

const subtotal = toRef(cartStore, 'subtotal')
const totalDiscountAmount = toRef(cartStore, 'totalDiscountAmount')
const totalCostAfterDiscounts = toRef(cartStore, 'totalCostAfterDiscounts')

const confettiVisible = ref(false)

const showConfetti = () => {
  confettiVisible.value = true
  setTimeout(() => {
    confettiVisible.value = false
  }, 3000) // Hide confetti after 3 seconds
}
</script>

<template>
  <div class="lg:sticky lg:top-20 static">
    <div class="bg-gray-50 rounded-md p-8 text-sm space-y-6 w-full">
      <h2 class="text-lg font-medium">
        {{ $t('Order summary') }}
      </h2>
      <div class="grid grid-cols-1 divide-y">
        <div class="flex items-center justify-between gap-3 pb-4">
          <span class="text-gray-700">{{ $t('Total Before Discount') }}</span>
          <span class="text-gray-900">
          ${{ subtotal }}
        </span>
        </div>
        <div class="flex items-center justify-between gap-3 py-4">
          <span class="text-gray-700">{{ $t('Savings') }}</span>
          <span class="text-gray-900">
          ${{ totalDiscountAmount }}
        </span>
        </div>
        <div class="flex items-center justify-between gap-3 pt-4 text-base font-medium">
          <span class="text-gray-900">{{ $t('Total After Savings') }}</span>
          <span class="text-gray-900">
          ${{ totalCostAfterDiscounts }}
        </span>
        </div>
      </div>
      <button @click="showConfetti" class="w-full text-white py-3 bg-indigo-600 rounded-md font-medium">
        {{ $t('Checkout') }}
      </button>
    </div>
    <Confetti v-if="confettiVisible"/>
  </div>
</template>
