import { motion } from "motion/react";
import { Home, Receipt, Package, Users, Settings, Plus } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "inventory", icon: Package, label: "Inventory" },
    { id: "billing", icon: Receipt, label: "Bill" },
    { id: "khata", icon: Users, label: "Khata" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D0D0D0] px-2 sm:px-4 py-2 safe-area-inset-bottom z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-2 rounded-xl relative transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={`text-[10px] sm:text-xs relative z-10 transition-colors ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
