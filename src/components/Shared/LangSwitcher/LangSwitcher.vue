<template>
  <div>
    <Popover v-slot="{ open }" class="relative items-stretch h-full">
      <PopoverButton
        class="px-3 py-2 h-full font-medium text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <LanguageIcon
          class="ml-2 h-6 w-6 transition duration-150 ease-in-out"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          v-slot="{close}"
          class="absolute -mt-3 z-10 max-w-sm w-32 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl"
        >
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div class="relative bg-white p-3 grid grid-cols-1 gap-3">
              <button
                v-for="(locale, index) in fullLanguageName"
                :key="`locale-${index}`"
                class="text-left"
                :class="locale.active?'text-indigo-500':''"
                @click="setLang(locale.lang,close)"
              >
                {{ locale.name }}
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { LanguageIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const languageMap: Record<string, string> = {
  en: 'English',
  fr: 'française'
}

const { availableLocales, locale } = useI18n()

const fullLanguageName = computed(() => {
  return availableLocales.map(lang => ({ lang, name: languageMap[lang] || lang, active: locale.value === lang }))
})

const setLang = (lang: string, close: () => void) => {
  locale.value = lang

  localStorage.setItem('language', lang);

  close()
}
</script>
