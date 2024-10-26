import { defineStore } from 'pinia'
import { getProducts } from '@/services/products'
import { readonly, ref } from 'vue'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'
export const useProductsStore = defineStore('products', () => {
  const products = ref<IProductDTO[]>([])
  const isLoading = ref(false)
  // Reactive state to track if the products have been initialized (fetched)
  const initialized = ref(false)

  // Function to fetch products from the API
  const fetch = async () => {
    // Prevent fetching if a request is already progressed
    if (isLoading.value) {
      return
    }
    try {
      isLoading.value = true // Set loading to true when starting the fetch
      const response = await getProducts // Call the service to get products

      // Check the response status to determine success
      if (response.status === 200) {
        products.value = response.data.products // Update products with fetched data
        initialized.value = true // Set initialized to true after successful fetch
      } else {
        console.error('Failed to fetch products:', response.status)
      }

      isLoading.value = false // Set loading to false after the fetch is complete
    } catch (error) {
      isLoading.value = false
      console.error('Error fetching products:', error)
    }
  }

  return {
    fetch,
    isLoading: readonly(isLoading), // Provide a readonly reference to loading state
    products: readonly(products) // Provide a readonly reference to the products list
  }
})
