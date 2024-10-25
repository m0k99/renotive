import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { IProductDTO } from '@/types/DTOs/IProductsDTO';
import type { ICartDTO } from '@/types/DTOs/ICartDTO';

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<ICartDTO[]>([]); // Stores the list of products in the cart

  /**
   * Adds a product to the cart. If the product already exists, it increments the count.
   * The product to add to the cart.
   */
  const addToCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id);
    if (index === -1) {
      // If the product is not already in the cart, add it with a count of 1
      cartProducts.value.push({ ...product, count: 1 });
      return;
    }
    // If the product is already in the cart, increment its count
    cartProducts.value[index].count++;
  };

  /**
   * Removes a product from the cart. If the product's count reaches zero, it removes the product from the cart.
   * The product to remove from the cart.
   */
  const removeFromCart = (product: IProductDTO) => {
    const index = cartProducts.value.findIndex(p => p.id === product.id);
    if (cartProducts.value[index].count === 1) {
      // If the count is 1, remove the product from the cart
      cartProducts.value.splice(index, 1);
      return;
    }
    // Otherwise, decrement the product's count
    cartProducts.value[index].count--;
  };

  /**
   * Calculates the subtotal of all products in the cart.
   * The subtotal formatted to two decimal places.
   */
  const subtotal = computed(() => {
    let total = 0;

    cartProducts.value.forEach(item => {
      total += item.count * item.price; // Accumulate the total based on count and price
    });

    return total.toFixed(2); // Return the total formatted to two decimal places
  });

  /**
   * Calculates the total discount amount from all products in the cart.
   * The total discount amount formatted to two decimal places.
   */
  const totalDiscountAmount = computed(() => {
    let totalSaving = 0;

    cartProducts.value.forEach(item => {
      // Calculate the discount amount based on the product's discount percentage
      const discountAmount = item.discountPercentage ? (item.price * item.discountPercentage / 100) * item.count : 0;
      totalSaving += discountAmount; // Accumulate the total savings
    });

    return totalSaving.toFixed(2); // Return the total savings formatted to two decimal places
  });

  /**
   * Calculates the total cost after applying discounts.
   * The total cost after discounts formatted to two decimal places.
   */
  const totalCostAfterDiscounts = computed(() => {
    const totalBeforeDiscount = cartProducts.value.reduce((total, item) => {
      return total + (item.count * item.price); // Calculate the total cost before discounts
    }, 0);

    const totalSaving = cartProducts.value.reduce((total, item) => {
      // Calculate total savings based on discount percentages
      const discountAmount = item.discountPercentage ? (item.price * item.discountPercentage / 100) * item.count : 0;
      return total + discountAmount;
    }, 0);

    return (totalBeforeDiscount - totalSaving).toFixed(2); // Return the total cost after discounts formatted to two decimal places
  });

  return {
    cartProducts, // The list of products in the cart
    addToCart, // Function to add products to the cart
    removeFromCart, // Function to remove products from the cart
    subtotal: readonly(subtotal), // Read-only computed subtotal value
    totalDiscountAmount: readonly(totalDiscountAmount), // Read-only computed total discount amount
    totalCostAfterDiscounts: readonly(totalCostAfterDiscounts), // Read-only computed total cost after discounts
  };
});
