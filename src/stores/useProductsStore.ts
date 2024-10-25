import { defineStore } from 'pinia'
import { getProducts } from '@/services/products'
import { readonly, ref } from 'vue'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProductDTO[]>([])
  const isLoading = ref(false)
  const initialized = ref(false)

  const fetch = async () => {
    if (isLoading.value) {
      return
    }
    try {
      isLoading.value = true
      const response = await getProducts

      if (response.status === 200) {
        products.value = response.data.products
        initialized.value = true
      } else {
        console.error('Failed to fetch products:', response.status)
      }

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      console.error('Error fetching products:', error)
    }
  }

  return {
    fetch,
    isLoading: readonly(isLoading),
    products: readonly(products)
  }
})
