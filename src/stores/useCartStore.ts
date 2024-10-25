import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProductDTO } from '@/types/DTOs/IProductsDTO'
import type { ICartDTO } from '@/types/DTOs/ICartDTO'

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<ICartDTO[]>([])

  const addToCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id)
    if (index === -1) {
      cartProducts.value.push({ ...product, count: 1 })
      return
    }
    cartProducts.value[index].count++
  }
  const removeFromCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id)
    if (cartProducts.value[index].count === 1) {
      cartProducts.value.splice(index, 1)
      return
    }
    cartProducts.value[index].count--
  }

  return {
    cartProducts,
    addToCart,
    removeFromCart
  }
})
