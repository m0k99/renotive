<script setup lang="ts">

</script>

<template>
  <div class="bg-gray-50 rounded-md p-8 text-sm space-y-6">
    <h2 class="text-lg font-medium">
      {{ $t('Order summary') }}
    </h2>
    <div class="grid grid-cols-1 divide-y">
      <div class="flex items-center justify-between gap-3 pb-4">
        <span class="text-gray-700">{{ $t('Total Before Discount') }}</span>
        <span class="text-gray-900">
          $99
        </span>
      </div>
      <div class="flex items-center justify-between gap-3 py-4">
        <span class="text-gray-700">{{ $t('Savings') }}</span>
        <span class="text-gray-900">
          $99
        </span>
      </div>
      <div class="flex items-center justify-between gap-3 pt-4 text-base font-medium">
        <span class="text-gray-900">{{ $t('Total After Savings') }}</span>
        <span class="text-gray-900">
          $99
        </span>
      </div>
    </div>
    <button class="w-full text-white py-3 bg-indigo-600 rounded-md font-medium">
      {{ $t('Checkout') }}
    </button>
  </div>
</template>
