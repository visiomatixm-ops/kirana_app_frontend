import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "./BottomNav";

interface NotificationSettingsProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

interface NotificationPreferences {
  allowAll: boolean;
  outOfStock: boolean;
  lowStock: boolean;
  customerKhata: boolean;
  allInventory: boolean;
  khataDayAlerts: boolean;
  whatsapp: boolean;
  textMessage: boolean;
}

export default function NotificationSettings({ onClose, activeScreen, onNavigate }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    allowAll: true,
    outOfStock: true,
    lowStock: true,
    customerKhata: true,
    allInventory: true,
    khataDayAlerts: true,
    whatsapp: true,
    textMessage: true,
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Saving notification preferences:", preferences);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-[42px] h-5 rounded-lg transition-colors ${
        enabled ? "bg-[#223960]" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-[1px] w-7 h-[18px] bg-white rounded-lg transition-transform ${
          enabled ? "right-[1px]" : "left-[1px]"
        }`}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="bg-white border-b border-[#DBDBDB]/72 px-4 sm:px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#223960]" />
          </button>
          <h2 className="text-base font-semibold text-[#223960]">Notifications</h2>
        </div>
      </div>

      {/* Notification Options */}
      <div className="px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Allow All */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Allow All</span>
            <ToggleSwitch enabled={preferences.allowAll} onToggle={() => handleToggle("allowAll")} />
          </div>

          {/* Out Of Stock Alert */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Out Of Stock Alert</span>
            <ToggleSwitch enabled={preferences.outOfStock} onToggle={() => handleToggle("outOfStock")} />
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Low Stock Alert</span>
            <ToggleSwitch enabled={preferences.lowStock} onToggle={() => handleToggle("lowStock")} />
          </div>

          {/* Customer Khata */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Customer Khata</span>
            <ToggleSwitch enabled={preferences.customerKhata} onToggle={() => handleToggle("customerKhata")} />
          </div>

          {/* All Inventory */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">All Inventory</span>
            <ToggleSwitch enabled={preferences.allInventory} onToggle={() => handleToggle("allInventory")} />
          </div>

          {/* Customer Khata Par 2 Day Alerts */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Customer Khata Par 2 Day Alerts</span>
            <ToggleSwitch enabled={preferences.khataDayAlerts} onToggle={() => handleToggle("khataDayAlerts")} />
          </div>

          {/* Whatsapp Alerts */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Whatsapp Alerts</span>
            <ToggleSwitch enabled={preferences.whatsapp} onToggle={() => handleToggle("whatsapp")} />
          </div>

          {/* Text Message Alerts */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm text-[#223960]">Text Message Alerts</span>
            <ToggleSwitch enabled={preferences.textMessage} onToggle={() => handleToggle("textMessage")} />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#DBDBDB]/72 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-3 justify-center">
          <button
            onClick={handleCancel}
            className="px-8 py-2 bg-[#E7F7FF] rounded-[11px] text-sm text-[#1FABEA]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-[#1C3458] rounded-[11px] text-sm text-white"
          >
            Save
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
