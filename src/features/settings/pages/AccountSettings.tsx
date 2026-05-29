import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, LogOut, Store, User, Bell, Globe, CreditCard, Users, HelpCircle, Sparkles, Star } from "lucide-react";
import HelpSupport from "./HelpSupport";
import ShopProfile from "./ShopProfile";
import OwnerDetails from "./OwnerDetails";
import NotificationSettings from "./NotificationSettings";
import PaymentMethods from "./PaymentMethods";
import LanguageSelector from "./LanguageSelector";
import StaffAccess from "./StaffAccess";
import WhatsNew from "./WhatsNew";
import BottomNav from "@/components/layout/BottomNav";

interface AccountSettingsProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function AccountSettings({ activeScreen = "settings", onNavigate = () => {} }: AccountSettingsProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [showShopProfile, setShowShopProfile] = useState(false);
  const [showOwnerDetails, setShowOwnerDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showStaffAccess, setShowStaffAccess] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");

  const settingItems = [
    { icon: Store, label: "Shop Profile", subtitle: "Sharma Kirana Store", action: () => setShowShopProfile(true) },
    { icon: User, label: "Owner Details", subtitle: "Rajesh sharma", action: () => setShowOwnerDetails(true) },
    { icon: Bell, label: "Notifications", subtitle: "Enabled", action: () => setShowNotifications(true) },
    { icon: Globe, label: "Language", subtitle: "English", action: () => setShowLanguage(true) },
  ];

  const businessItems = [
    { icon: CreditCard, label: "Payment Methods", subtitle: "3 actives", action: () => setShowPaymentMethods(true) },
    { icon: Users, label: "Staff access", subtitle: "Upgrade to enable", action: () => setShowStaffAccess(true) },
  ];

  const supportItems = [
    { icon: HelpCircle, label: "Help & Support", action: () => setShowHelp(true) },
    { icon: Sparkles, label: "What's New", action: () => setShowWhatsNew(true) },
  ];

  return (
    <>
      <div
        className="scroll-area scroll-touch bg-white"
        style={{ height: "100dvh", paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#223960] font-['Lato']">Account</h1>
        </div>

        {/* Settings Sections */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          {/* Profile Settings */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden">
            {settingItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#E7E5E5] rounded-md flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#223960]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-[#223960] font-['Lato']">{item.label}</p>
                      <p className="text-xs text-[#8A8080] font-['Lato']">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#8A8080]" />
                </button>
                {index < settingItems.length - 1 && <div className="border-t border-[#DBDBDB] mx-4" />}
              </div>
            ))}
          </div>

          {/* Business Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#223960] font-['Lato'] mb-4">Business</h2>
            <div className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden">
              {businessItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#E7E5E5] rounded-md flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#223960]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-[#223960] font-['Lato']">{item.label}</p>
                        <p className="text-xs text-[#8A8080] font-['Lato']">{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8080]" />
                  </button>
                  {index < businessItems.length - 1 && <div className="border-t border-[#DBDBDB] mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-gradient-to-r from-[#223960] to-[#0EA5E9] rounded-xl p-6">
            <p className="text-sm font-semibold text-white font-['Lato'] mb-2">Current Plan: Starter Plan</p>
            <p className="text-xs text-white font-['Lato'] mb-4">67 / 100 bills used this month</p>
            <div className="relative mb-4">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <button className="w-full bg-white text-[#223B63] py-3 rounded-lg text-sm font-semibold font-['Lato'] flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Upgrade to Pro
            </button>
          </div>

          {/* Choose Your Plan */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#223960] font-['Lato'] mb-4">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Starter Plan */}
              <div className="border border-[#DBDBDB] rounded-xl p-4 relative">
                {selectedPlan === "starter" && (
                  <div className="absolute top-4 right-4 bg-[#D9D9D9] rounded-full px-3 py-1">
                    <span className="text-xs font-normal text-[#223960] font-['Lato']">Current</span>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-[#223B63] font-['Lato'] mb-1">Starter Plan</h3>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-2">AutoPay / Subscription Mandates</p>
                <p className="text-sm font-semibold text-[#223B63] font-['Lato'] mb-3">₹99/month</p>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-4 whitespace-pre-line">
                  ✓ 100 bills/month{'\n'}✓ Basic inventory{'\n'}✓ Customer khata
                </p>
              </div>

              {/* Pro Plan */}
              <div className="bg-[#E7F7FF] border border-[#1FABEA] rounded-xl p-4 relative">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-[#223B63] font-['Lato']">Pro Plan</h3>
                  <div className="bg-[#1FABEA] rounded-full px-2 py-0.5">
                    <span className="text-[8px] font-normal text-white font-['Lato']">Popular</span>
                  </div>
                </div>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-2">AutoPay / Subscription Mandates</p>
                <p className="text-sm font-semibold text-[#223B63] font-['Lato'] mb-3">₹299/month</p>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-4 whitespace-pre-line">
                  ✓ Unlimited billing{'\n'}✓ Advanced reports{'\n'}✓ Priority support{'\n'}✓ WhatsApp integration
                </p>
                <button className="w-full bg-[#1FABEA] text-white py-2 rounded-lg text-sm font-semibold font-['Lato']">
                  Upgrade Now
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-[#E5FFF5] border border-[#00C479] rounded-xl p-4 relative">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-[#223B63] font-['Lato']">Premium Plan</h3>
                  <Star className="w-4 h-4 text-[#FFCC00]" fill="#FFCC00" />
                </div>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-2">AutoPay / Subscription Mandates</p>
                <p className="text-sm font-semibold text-[#223B63] font-['Lato'] mb-3">₹499/month</p>
                <p className="text-xs text-[#9B9B9B] font-['Lato'] mb-4 whitespace-pre-line">
                  ✓ Everything in Pro{'\n'}✓ Staff login (5 users){'\n'}✓ GST invoices{'\n'}✓ Advanced analytics{'\n'}✓ API access
                </p>
                <button className="w-full bg-[#00C479] text-white py-2 rounded-lg text-sm font-semibold font-['Lato']">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#223960] font-['Lato'] mb-4">Support</h2>
            <div className="bg-white border border-[#DBDBDB] rounded-xl overflow-hidden">
              {supportItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#E7E5E5] rounded-md flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#223960]" />
                      </div>
                      <p className="text-sm font-semibold text-[#223960] font-['Lato']">{item.label}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8080]" />
                  </button>
                  {index < supportItems.length - 1 && <div className="border-t border-[#DBDBDB] mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white border border-[#DBDBDB] rounded-xl p-4">
            <button className="w-full flex items-center justify-center gap-2 text-[#F42018]">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold font-['Lato']">Logout</span>
            </button>
          </div>

          {/* Version */}
          <p className="text-xs text-[#9B9B9B] text-center font-['Lato'] py-4">
            Version 1.0.0 • Made with ❤️ for Indian Retailers
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />

      {/* Modals */}
      {showHelp && <HelpSupport onClose={() => setShowHelp(false)} />}
      {showShopProfile && (
        <ShopProfile
          onClose={() => setShowShopProfile(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showOwnerDetails && (
        <OwnerDetails
          onClose={() => setShowOwnerDetails(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showNotifications && (
        <NotificationSettings
          onClose={() => setShowNotifications(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showPaymentMethods && (
        <PaymentMethods
          onClose={() => setShowPaymentMethods(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showLanguage && (
        <LanguageSelector
          onClose={() => setShowLanguage(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showStaffAccess && (
        <StaffAccess
          onClose={() => setShowStaffAccess(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
      {showWhatsNew && (
        <WhatsNew
          onClose={() => setShowWhatsNew(false)}
          activeScreen={activeScreen}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
}
