import { motion } from "motion/react";
import { ChevronLeft, Sparkles, Package, CreditCard, Bell, Smartphone } from "lucide-react";
import BottomNav from "./BottomNav";

interface WhatsNewProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function WhatsNew({ onClose, activeScreen, onNavigate }: WhatsNewProps) {
  const updates = [
    {
      id: 1,
      version: "Version 1.2.0",
      date: "May 1, 2026",
      icon: Sparkles,
      color: "#FFB078",
      features: [
        "Enhanced inventory management with low stock alerts",
        "New customer Khata tracking system",
        "Improved billing interface with faster checkout",
      ],
    },
    {
      id: 2,
      version: "Version 1.1.0",
      date: "April 15, 2026",
      icon: Package,
      color: "#1FABEA",
      features: [
        "Added barcode scanning for quick product lookup",
        "Export bills to PDF format",
        "Multi-language support for regional languages",
      ],
    },
    {
      id: 3,
      version: "Version 1.0.5",
      date: "April 1, 2026",
      icon: CreditCard,
      color: "#00C479",
      features: [
        "Integrated UPI payment methods",
        "Real-time payment status updates",
        "Digital receipt sharing via WhatsApp",
      ],
    },
    {
      id: 4,
      version: "Version 1.0.0",
      date: "March 20, 2026",
      icon: Bell,
      color: "#223960",
      features: [
        "Initial release with core features",
        "Basic inventory and billing system",
        "Customer management with Khata book",
      ],
    },
  ];

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
          <h2 className="text-base font-semibold text-[#223960]">What's New</h2>
        </div>
      </div>

      {/* Updates List */}
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {updates.map((update, index) => (
            <div key={update.id} className="relative">
              {/* Timeline line */}
              {index < updates.length - 1 && (
                <div className="absolute left-[19px] top-12 w-0.5 h-full bg-gradient-to-b from-[#DBDBDB] to-transparent" />
              )}

              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${update.color}20` }}
                >
                  <update.icon className="w-5 h-5" style={{ color: update.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-[#223960]">{update.version}</h3>
                    <span className="text-xs text-[#8A8080]">{update.date}</span>
                  </div>

                  <ul className="space-y-2">
                    {update.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#1FABEA] text-xs mt-0.5">•</span>
                        <span className="text-xs text-[#535353]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-[#E7F7FF] to-[#E5FFF5] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Smartphone className="w-6 h-6 text-[#1FABEA] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-[#223960] mb-2">Coming Soon</h3>
                <ul className="space-y-1.5 text-xs text-[#535353]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1FABEA]">✓</span>
                    <span>Advanced analytics and reports dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1FABEA]">✓</span>
                    <span>Automated GST invoice generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1FABEA]">✓</span>
                    <span>Integration with accounting software</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1FABEA]">✓</span>
                    <span>Mobile app for iOS and Android</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
