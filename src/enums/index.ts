export enum UserRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  STAFF = 'staff',
  GUEST = 'guest',
}

export enum BillStatus {
  PAID = 'paid',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  UPI = 'upi',
  CARD = 'card',
  CREDIT = 'credit',
}

export enum SubscriptionPlan {
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum AppScreen {
  SPLASH = 'splash',
  WELCOME = 'welcome',
  LOGIN = 'login',
  SETUP = 'setup',
  MAIN = 'main',
}

export enum MainScreen {
  DASHBOARD = 'dashboard',
  BILLING = 'billing',
  INVENTORY = 'inventory',
  KHATA = 'khata',
  REPORTS = 'reports',
  SETTINGS = 'settings',
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum Permission {
  VIEW_BILLING = 'view:billing',
  CREATE_BILL = 'create:bill',
  VIEW_INVENTORY = 'view:inventory',
  MANAGE_INVENTORY = 'manage:inventory',
  VIEW_REPORTS = 'view:reports',
  MANAGE_SETTINGS = 'manage:settings',
  MANAGE_STAFF = 'manage:staff',
  VIEW_KHATA = 'view:khata',
  MANAGE_KHATA = 'manage:khata',
}
