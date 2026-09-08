import { apiRequest } from '../apiClient';

export interface ProductDto {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  condition?: string;
  businessId?: string;
}

export const marketplaceApi = {
  listProducts: async (params?: Record<string, any>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest('/marketplace/products' + query, { method: 'GET' });
  },

  createProduct: async (product: ProductDto) => {
    return apiRequest('/marketplace/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    return apiRequest('/marketplace/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  checkout: async (shippingAddress: string) => {
    return apiRequest('/marketplace/checkout', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  },
};
