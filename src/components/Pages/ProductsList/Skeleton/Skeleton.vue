<script setup lang="ts">
import VueSkeletonLoader from 'vue3-skeleton-loader'
import 'vue3-skeleton-loader/dist/style.css'
</script>

<template>
  <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
    <div v-for="i in 6" :key="i" class="border rounded-lg grid grid-cols-1">
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none lg:h-96">
        <VueSkeletonLoader
          type="image"
          class="h-full"
          skeleton-class-name="rounded-md !h-full"
        ></VueSkeletonLoader>
      </div>
      <div class="p-4 pb-0">
        <VueSkeletonLoader
          type="text"
          class="w-1/3"
        ></VueSkeletonLoader>
        <VueSkeletonLoader
          type="text@2"
        ></VueSkeletonLoader>
      </div>
      <div class="p-4 flex items-center justify-between">
        <VueSkeletonLoader
          type="text"
          class="w-1/3"
        ></VueSkeletonLoader>
        <VueSkeletonLoader
          type="text"
          class="w-1/3"
        ></VueSkeletonLoader>
      </div>
      <div class="px-4">
        <VueSkeletonLoader
          type="button"
          class="w-full"
          skeleton-class-name="!w-full"
        ></VueSkeletonLoader>
      </div>
    </div>
  </div>
</template>

