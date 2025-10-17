export interface CartResponse {
  id: number;
  userId: number;
  totalAmount: number;
  totalAmountFull: string;
  totalItems: number;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productCode: string;
  price: number;
  priceFull: string;
  quantity: number;
  totalPrice: number;
  totalPriceFull: string;
  productImage: string;
}

export interface CartAddRequest {
  productId: number;
  quantity: number;
}

export interface CartEditRequest {
  quantity: number;
}

export interface CartUpdateRequest {
  id: number;
  data: {
    quantity: number;
  };
}
