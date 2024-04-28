export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  photo: string;
  category: string;
  price: number;
  _id: string;
  stock: number;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, 'stock'> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  tax: number;
  total: number;
  discount: number;
  shippingCharges: number;
  subtotal: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};
type LatestTranstaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};
export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  counts: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTranstaction[];
};
export type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};
export type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

export type UserAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type AdminCustomer = {
  admin: number;
  customer: number;
};
export type StockAvailability = {
  inStock: number;
  outOfStock: number;
};
export type PIE = {
  orderFullfillment: OrderFullfillment;
  productsCategories: Record<string, number>[];
  stockAvailability: StockAvailability;
  revenueDistribution: RevenueDistribution;
  adminCustomer: AdminCustomer;
  usersAgeGroup: UserAgeGroup;
};

export type BAR = {
  users: number[];
  products: number[];
  orders: number[];
};

export type LINE = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
