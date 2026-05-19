import { Home, Receipt, Package, Users, Settings, BarChart2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  screen: string;
  requiredPlan?: 'pro' | 'enterprise';
}

export const bottomNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home, screen: 'dashboard' },
  { id: 'inventory', label: 'Inventory', icon: Package, screen: 'inventory' },
  { id: 'billing', label: 'Bill', icon: Receipt, screen: 'billing' },
  { id: 'khata', label: 'Khata', icon: Users, screen: 'khata' },
  { id: 'settings', label: 'Settings', icon: Settings, screen: 'settings' },
];

export const allNavItems: NavItem[] = [
  ...bottomNavItems,
  { id: 'reports', label: 'Reports', icon: BarChart2, screen: 'reports' },
];
