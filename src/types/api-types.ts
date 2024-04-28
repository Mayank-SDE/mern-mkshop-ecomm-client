import {
  CartItem,
  Order,
  Product,
  ShippingInfo,
  User,
  Stats,
  PIE,
  BAR,
  LINE,
} from './types';

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllProductResponse = {
  success: boolean;
  products: Product[];
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = AllProductResponse & {
  totalPage: number;
};

export type SearchProductsRequest = {
  search: string;
  price: number;
  page: number;
  category: string;
  sort: string;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  userId: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: PIE;
};

export type BarResponse = {
  success: boolean;
  charts: BAR;
};

export type LineResponse = {
  success: boolean;
  charts: LINE;
};
