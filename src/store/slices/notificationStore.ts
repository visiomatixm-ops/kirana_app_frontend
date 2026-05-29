/**
 * Notification Store - manages toast/notification queue.
 */

import { NotificationType } from '@/enums';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
}

interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

type NotificationStore = NotificationState & NotificationActions;

const notifState: NotificationState = { notifications: [] };

let _notifListeners: Array<() => void> = [];

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export const useNotificationStore = (): NotificationStore => {
  const addNotification = (notif: Omit<Notification, 'id'>) => {
    const id = generateId();
    notifState.notifications.push({ ...notif, id });
    _notifListeners.forEach((fn) => fn());
    // Auto-remove after duration
    const duration = notif.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
  };

  const removeNotification = (id: string) => {
    notifState.notifications = notifState.notifications.filter((n) => n.id !== id);
    _notifListeners.forEach((fn) => fn());
  };

  const clearAll = () => {
    notifState.notifications = [];
    _notifListeners.forEach((fn) => fn());
  };

  return {
    ...notifState,
    addNotification,
    removeNotification,
    clearAll,
    success: (message) => addNotification({ type: NotificationType.SUCCESS, message }),
    error: (message) => addNotification({ type: NotificationType.ERROR, message }),
    warning: (message) => addNotification({ type: NotificationType.WARNING, message }),
    info: (message) => addNotification({ type: NotificationType.INFO, message }),
  };
};
