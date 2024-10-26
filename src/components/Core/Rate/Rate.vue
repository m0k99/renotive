<script setup lang="ts">
import type { IRateProps } from '@/components/Core/Rate/Rate.d'
import { StarIcon as EmptyStar } from '@heroicons/vue/24/outline'
import { StarIcon as FillStar } from '@heroicons/vue/24/solid'

import { computed } from 'vue'

const props = withDefaults(defineProps<IRateProps>(), {
  value: 0
})

const computedRate = computed(() => Math.ceil(props.value))

</script>

<template>
  <div class="mx-0.2 flex items-center justify-between">
    <template v-for="i in 5" :key="i">
      <component
        :is="i <= computedRate ? FillStar : EmptyStar"
        class="h-4 w-4 text-yellow-400"
      />
    </template>
  </div>
</template>
