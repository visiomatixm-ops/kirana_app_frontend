import { motion } from "motion/react";
import { ChevronLeft, CreditCard } from "lucide-react";
import BottomNav from "./BottomNav";

interface PaymentMethodsProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function PaymentMethods({ onClose, activeScreen, onNavigate }: PaymentMethodsProps) {
  const paymentOptions = [
    { id: "upi", label: "UPI", icon: "💳" },
    { id: "qr", label: "QR Code Payments", icon: "📱" },
    { id: "credit", label: "Credit Card", icon: "💳" },
    { id: "debit", label: "Debit Card", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
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
          <h2 className="text-base font-semibold text-[#223960]">Add Payment Method</h2>
        </div>
      </div>

      {/* Payment Options */}
      <div className="px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              className="w-full bg-white rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 bg-[#E7E5E5] rounded-md flex items-center justify-center">
                <span className="text-sm">{option.icon}</span>
              </div>
              <span className="text-sm sm:text-base font-semibold text-[#535353]">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Payment Gateway Image */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Secure Payment Gateway</p>
            </div>
          </div>
        </div>

        {/* Trust Message */}
        <div className="max-w-4xl mx-auto mt-6">
          <p className="text-[11px] font-semibold text-[#535353] text-center">
            Trusted by 1000+ Indian customers for secure and seamless payments.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
