import type { Product, Customer, Bill, User, Shop } from '@/types';
import { UserRole, BillStatus, PaymentMethod, SubscriptionPlan } from '@/enums';

// ─── Mock User ────────────────────────────────────────────────────────────────
export const mockUser: User = {
  id: 'user-001',
  name: 'Rajesh Sharma',
  phone: '9876543210',
  email: 'rajesh@sharma.com',
  role: UserRole.OWNER,
  shopId: 'shop-001',
};

// ─── Mock Shop ────────────────────────────────────────────────────────────────
export const mockShop: Shop = {
  id: 'shop-001',
  name: 'Sharma Kirana Store',
  ownerName: 'Rajesh Sharma',
  phone: '9876543210',
  address: '12, Gandhi Nagar, Mumbai - 400001',
  gstin: '27AAPFU0939F1ZV',
  plan: SubscriptionPlan.STARTER,
};

// ─── Mock Products ────────────────────────────────────────────────────────────
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Tata Salt 1kg',
    barcode: '8901234567890',
    mrp: 22,
    sellingPrice: 22,
    purchasePrice: 18,
    stock: 45,
    lowStockAlert: 10,
    unit: 'pcs',
    category: 'Staples',
  },
  {
    id: 'p2',
    name: 'Parle-G Biscuit',
    barcode: '8901234567891',
    mrp: 10,
    sellingPrice: 10,
    purchasePrice: 8,
    stock: 120,
    lowStockAlert: 20,
    unit: 'pcs',
    category: 'Snacks',
  },
  {
    id: 'p3',
    name: 'Fortune Oil 1L',
    barcode: '8901234567892',
    mrp: 180,
    sellingPrice: 175,
    purchasePrice: 160,
    stock: 8,
    lowStockAlert: 10,
    unit: 'pcs',
    category: 'Cooking Oil',
  },
  {
    id: 'p4',
    name: 'Amul Milk 500ml',
    barcode: '8901234567893',
    mrp: 28,
    sellingPrice: 28,
    purchasePrice: 24,
    stock: 60,
    lowStockAlert: 15,
    unit: 'pcs',
    category: 'Dairy',
  },
  {
    id: 'p5',
    name: 'Maggi Noodles',
    barcode: '8901234567894',
    mrp: 14,
    sellingPrice: 14,
    purchasePrice: 11,
    stock: 3,
    lowStockAlert: 10,
    unit: 'pcs',
    category: 'Instant Food',
  },
];

// ─── Mock Customers ───────────────────────────────────────────────────────────
export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Suresh Kumar',
    phone: '9876501234',
    address: 'Flat 3A, Sai Nagar',
    balance: -450,
    lastTransactionDate: '2025-01-10',
  },
  {
    id: 'c2',
    name: 'Priya Patel',
    phone: '9876502345',
    balance: 200,
    lastTransactionDate: '2025-01-09',
  },
  {
    id: 'c3',
    name: 'Mohan Lal',
    phone: '9876503456',
    balance: -1200,
    lastTransactionDate: '2025-01-08',
  },
];

// ─── Mock Bills ───────────────────────────────────────────────────────────────
export const mockBills: Bill[] = [
  {
    id: 'b1',
    billNumber: 'KS-0892',
    customerName: 'Walk-in Customer',
    items: [
      { id: 'p1', name: 'Tata Salt 1kg', price: 22, quantity: 2, mrp: 22 },
      { id: 'p2', name: 'Parle-G Biscuit', price: 10, quantity: 5, mrp: 10 },
    ],
    subtotal: 94,
    discount: 0,
    total: 94,
    paymentMethod: PaymentMethod.CASH,
    createdAt: '2025-01-12T10:30:00',
    status: BillStatus.PAID,
  },
  {
    id: 'b2',
    billNumber: 'KS-0891',
    customerId: 'c1',
    customerName: 'Suresh Kumar',
    items: [
      { id: 'p4', name: 'Amul Milk 500ml', price: 28, quantity: 4, mrp: 28 },
    ],
    subtotal: 112,
    discount: 12,
    total: 100,
    paymentMethod: PaymentMethod.UPI,
    createdAt: '2025-01-12T09:15:00',
    status: BillStatus.PAID,
  },
];
