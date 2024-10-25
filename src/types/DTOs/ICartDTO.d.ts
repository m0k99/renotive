import type { IProductDTO } from '@/types/DTOs/IProductsDTO'

export interface ICartDTO extends IProductDTO {
  count: number;
}
