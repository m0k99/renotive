<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/16/solid'
</script>

<template>
  <div class="flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-lg">
    <ShoppingCartIcon class="w-16 h-16 text-gray-400 mb-4" />
    <h2 class="text-2xl font-semibold text-gray-700">{{ $t('No Items in Cart' )}}</h2>
    <p class="mt-2 text-gray-500">
      {{ $t('You haven’t added any items to your cart yet. Start shopping to add items here.')}}
    </p>
    <button class="mt-6 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">
      {{$t('Start Shopping')}}
    </button>
  </div>
</template>

