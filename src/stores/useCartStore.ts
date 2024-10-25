import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { IProductDTO } from '@/types/DTOs/IProductsDTO';
import type { ICartDTO } from '@/types/DTOs/ICartDTO';

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<ICartDTO[]>([]);

  const addToCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id);
    if (index === -1) {
      cartProducts.value.push({ ...product, count: 1 });
      return;
    }
    cartProducts.value[index].count++;
  };

  const removeFromCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id);
    if (cartProducts.value[index].count === 1) {
      cartProducts.value.splice(index, 1);
      return;
    }
    cartProducts.value[index].count--;
  };

  const subtotal = computed(() => {
    let total = 0;

    cartProducts.value.forEach(item => {
      total += item.count * item.price;
    });

    return total.toFixed(2);
  });

  const totalDiscountAmount = computed(() => {
    let totalSaving = 0;

    cartProducts.value.forEach(item => {
      const discountAmount = item.discountPercentage ? (item.price * item.discountPercentage / 100) * item.count : 0;
      totalSaving += discountAmount;
    });

    return totalSaving.toFixed(2);
  });

  const totalCostAfterDiscounts = computed(() => {
    const totalBeforeDiscount = cartProducts.value.reduce((total, item) => {
      return total + (item.count * item.price);
    }, 0);

    const totalSaving = cartProducts.value.reduce((total, item) => {
      const discountAmount = item.discountPercentage ? (item.price * item.discountPercentage / 100) * item.count : 0;
      return total + discountAmount;
    }, 0);

    return (totalBeforeDiscount - totalSaving).toFixed(2);
  });

  return {
    cartProducts,
    addToCart,
    removeFromCart,
    subtotal: readonly(subtotal),
    totalDiscountAmount: readonly(totalDiscountAmount),
    totalCostAfterDiscounts: readonly(totalCostAfterDiscounts),
  };
});
