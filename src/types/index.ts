export interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}
