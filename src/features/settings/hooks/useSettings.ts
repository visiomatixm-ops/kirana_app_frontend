import { useState, useCallback } from 'react';
import apiClient from '@/services/api/apiClient';
import { SHOP_ENDPOINTS } from '@/services/endpoints';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/constants';
import type { Shop } from '@/types';
import { logger } from '@/utils/logger';

// ─── useShopSettings ──────────────────────────────────────────────────────────
interface UseShopSettingsReturn {
  shop: Shop | null;
  isSaving: boolean;
  updateShop: (updates: Partial<Shop>) => Promise<boolean>;
}

export function useShopSettings(): UseShopSettingsReturn {
  const [shop, setShop] = useLocalStorage<Shop | null>(STORAGE_KEYS.SHOP, null);
  const [isSaving, setIsSaving] = useState(false);

  const updateShop = useCallback(
    async (updates: Partial<Shop>): Promise<boolean> => {
      setIsSaving(true);
      try {
        const res = await apiClient.put<Shop>(SHOP_ENDPOINTS.UPDATE_SHOP, updates);
        setShop(res.data);
        return true;
      } catch (err) {
        logger.error('[useShopSettings] update failed', err);
        // Optimistic local update even if API fails (offline mode)
        if (shop) setShop({ ...shop, ...updates });
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [shop, setShop]
  );

  return { shop, isSaving, updateShop };
}

// ─── useNotificationPrefs ─────────────────────────────────────────────────────
interface NotificationPrefs {
  lowStockAlerts: boolean;
  dailySummary: boolean;
  paymentReminders: boolean;
  whatsappAlerts: boolean;
}

const DEFAULT_NOTIF_PREFS: NotificationPrefs = {
  lowStockAlerts: true,
  dailySummary: true,
  paymentReminders: true,
  whatsappAlerts: false,
};

export function useNotificationPrefs() {
  const [prefs, setPrefs] = useLocalStorage<NotificationPrefs>(
    'kirana_notif_prefs',
    DEFAULT_NOTIF_PREFS
  );

  const togglePref = useCallback(
    (key: keyof NotificationPrefs) => {
      setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [setPrefs]
  );

  return { prefs, togglePref };
}
