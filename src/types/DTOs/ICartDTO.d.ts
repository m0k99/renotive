import type { IProductDTO } from '@/types/DTOs/IProductsDTO'

// Interface representing a cart item that extends the product data
export interface ICartDTO extends IProductDTO {
  count: number; // Quantity of the product in the cart
}
