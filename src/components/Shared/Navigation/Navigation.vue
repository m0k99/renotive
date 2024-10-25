<template>
  <Disclosure as="nav" class="shadow sticky top-0 left-0 z-50 backdrop-blur-md bg-gray-100/50 ">
    <template v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 justify-between">
          <div class="flex items-center sm:hidden pr-16">
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <span class="sr-only">Open main menu</span>
              <component :is="open ? XMarkIcon : Bars3Icon" class="block h-6 w-6" />
            </DisclosureButton>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                   alt="Your Company" />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                v-for="item in navigation"
                :key="item.name"
                :class="classNames(
                  item.current
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                )"
                @click="navigateTo(item.href)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
          <div class="flex items-stretch pr-2 sm:ml-6 sm:pr-0">
            <button
              type="button"
              class="p-1 text-gray-600 hover:text-gray-900 border-indigo-500 px-1 pt-1"
              :class="route.path==='/cart'?'border-b-2':''"
              @click="navigateTo('/cart')"
            >
              <span class="sr-only">Cart</span>
              <ShoppingBagIcon class="h-6 w-6" />
            </button>
            <LangSwitcher></LangSwitcher>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pb-4 pt-2">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            :as="'a'"
            @click="navigateTo(item.href)"
            :class="classNames(
              item.current
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium '
            )"
          >
            {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </template>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import LangSwitcher from '@/components/Shared/LangSwitcher/LangSwitcher.vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()

const navigation = computed(() => [
  { name: t('Products'), href: '/', current: route.path === '/' }
])

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

const navigateTo = (path: string) => {
  router.push(path)
}
</script>
