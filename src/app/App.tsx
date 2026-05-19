import { useState } from "react";
import { AnimatePresence } from "motion/react";

// Onboarding
import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import LoginScreen from "./components/LoginScreen";
import ShopSetup from "./components/ShopSetup";

// Main App
import Dashboard from "./components/Dashboard";
import BillingScreen from "./components/BillingScreen";
import InventoryScreen from "./components/InventoryScreen";
import KhataScreen from "./components/KhataScreen";
import ReportsScreen from "./components/ReportsScreen";
import SettingsScreen from "./components/SettingsScreen";
import BottomNav from "./components/BottomNav";

type AppState = "splash" | "welcome" | "login" | "setup" | "main";
type MainScreen = "dashboard" | "billing" | "inventory" | "khata" | "reports" | "settings";

export default function App() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [activeScreen, setActiveScreen] = useState<MainScreen>("dashboard");

  // Render based on app state
  if (appState === "splash") {
    return <SplashScreen onComplete={() => setAppState("welcome")} />;
  }

  if (appState === "welcome") {
    return <WelcomeScreen onGetStarted={() => setAppState("login")} />;
  }

  if (appState === "login") {
    return (
      <LoginScreen
        onLogin={() => setAppState("setup")}
        onBack={() => setAppState("welcome")}
      />
    );
  }

  if (appState === "setup") {
    return <ShopSetup onComplete={() => setAppState("main")} />;
  }

  // Main App
  const handleNavigate = (screen: string) => {
    setActiveScreen(screen as MainScreen);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeScreen === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
        {activeScreen === "billing" && <BillingScreen activeScreen={activeScreen} onNavigate={handleNavigate} />}
        {activeScreen === "inventory" && <InventoryScreen activeScreen={activeScreen} onNavigate={handleNavigate} />}
        {activeScreen === "khata" && <KhataScreen activeScreen={activeScreen} onNavigate={handleNavigate} />}
        {activeScreen === "reports" && <ReportsScreen />}
        {activeScreen === "settings" && <SettingsScreen activeScreen={activeScreen} onNavigate={handleNavigate} />}
      </AnimatePresence>

      <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />
    </div>
  );
}