import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/constants';

export type AppScreen  = 'splash' | 'welcome' | 'login' | 'setup' | 'main';
export type MainScreen = 'dashboard' | 'billing' | 'inventory' | 'khata' | 'reports' | 'settings';

interface AppStateContextValue {
  /** @deprecated — use React Router's useNavigate instead */
  appScreen: AppScreen;
  /** @deprecated — use React Router's useNavigate instead */
  setAppScreen: (screen: AppScreen) => void;
  /** Derived from URL pathname for backward-compat with existing pages */
  activeMainScreen: MainScreen;
  /** @deprecated — use React Router's useNavigate instead */
  navigateTo: (screen: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

/** Derive AppScreen from URL pathname */
function pathnameToAppScreen(pathname: string): AppScreen {
  if (pathname === '/')            return 'splash';
  if (pathname === '/welcome')     return 'welcome';
  if (pathname === '/login')       return 'login';
  if (pathname === '/setup')       return 'setup';
  if (pathname.startsWith('/app')) return 'main';
  return 'splash';
}

/** Derive MainScreen from URL pathname */
function pathnameToMainScreen(pathname: string): MainScreen {
  const screens: MainScreen[] = ['dashboard','billing','inventory','khata','reports','settings'];
  const seg = pathname.split('/').pop() ?? '';
  return screens.includes(seg as MainScreen) ? (seg as MainScreen) : 'dashboard';
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  // Read current URL (works in both browser + test)
  const initPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const [appScreen, setAppScreenInternal]   = useState<AppScreen>(pathnameToAppScreen(initPath));
  const [activeMainScreen, setActiveMain]   = useState<MainScreen>(pathnameToMainScreen(initPath));

  // Sync context whenever the browser URL changes (popstate / pushstate)
  useEffect(() => {
    const sync = () => {
      const p = window.location.pathname;
      setAppScreenInternal(pathnameToAppScreen(p));
      setActiveMain(pathnameToMainScreen(p));
    };
    window.addEventListener('popstate', sync);
    // Also listen for programmatic navigation via history.pushState
    const origPush = history.pushState.bind(history);
    history.pushState = function (...args) {
      origPush(...args);
      sync();
    };
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const setAppScreen = (screen: AppScreen) => {
    setAppScreenInternal(screen);
    try { localStorage.setItem(STORAGE_KEYS.APP_STATE, screen); } catch {}
  };

  /** @deprecated — legacy compat; prefer useNavigate from react-router */
  const navigateTo = (screen: string) => {
    setActiveMain(screen as MainScreen);
  };

  return (
    <AppStateContext.Provider
      value={{ appScreen, setAppScreen, activeMainScreen, navigateTo }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
