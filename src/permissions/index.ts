import { Permission, UserRole } from '@/enums';

/**
 * Role-based permission matrix.
 * Defines which permissions each role has.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.OWNER]: Object.values(Permission),

  [UserRole.MANAGER]: [
    Permission.VIEW_BILLING,
    Permission.CREATE_BILL,
    Permission.VIEW_INVENTORY,
    Permission.MANAGE_INVENTORY,
    Permission.VIEW_REPORTS,
    Permission.VIEW_KHATA,
    Permission.MANAGE_KHATA,
  ],

  [UserRole.STAFF]: [
    Permission.VIEW_BILLING,
    Permission.CREATE_BILL,
    Permission.VIEW_INVENTORY,
    Permission.VIEW_KHATA,
  ],

  [UserRole.GUEST]: [
    Permission.VIEW_BILLING,
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if a role has all of the given permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if a role has any of the given permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
