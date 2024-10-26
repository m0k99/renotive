
// Interface representing the dimensions of a product
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Interface representing a product review
export interface Review {
  reviewerName: string;
  rating: number;
  date: string;
  reviewerEmail: string;
  comment: string;
}

// Interface representing metadata associated with a product
export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// Interface representing a product data transfer object (DTO)
export interface IProductDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

