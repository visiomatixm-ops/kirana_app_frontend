import type { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { hasPermission, hasAnyPermission } from '@/permissions';
import { Permission, UserRole } from '@/enums';

interface PermissionGuardProps {
  permission?: Permission;
  anyOf?: Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * PermissionGuard - conditionally renders children based on user role permissions.
 *
 * Usage:
 *   <PermissionGuard permission={Permission.MANAGE_STAFF}>
 *     <StaffPanel />
 *   </PermissionGuard>
 */
export default function PermissionGuard({
  permission,
  anyOf,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { user } = useAuthContext();

  if (!user) return <>{fallback}</>;

  const role = user.role as UserRole;

  if (permission && !hasPermission(role, permission)) {
    return <>{fallback}</>;
  }

  if (anyOf && !hasAnyPermission(role, anyOf)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
