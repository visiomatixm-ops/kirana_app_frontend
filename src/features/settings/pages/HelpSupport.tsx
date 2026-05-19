import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

interface HelpSupportProps {
  onClose: () => void;
}

export default function HelpSupport({ onClose }: HelpSupportProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay-page z-50"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-[#DBDBDB]/70 px-4 sm:px-6 py-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-[#223960]" strokeWidth={2} />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-[#223960] font-['Lato'] absolute left-1/2 transform -translate-x-1/2">
            Help & Support
          </h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="overlay-scroll">
      <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        <div className="prose prose-sm sm:prose max-w-none">
          <p className="text-[#535353] text-sm sm:text-base leading-relaxed font-['Lato'] mb-6">
            We're here to help you with every step of your journey. If you need any assistance regarding orders, payments, subscriptions, delivery, account issues, or technical support, our team is ready to assist you.
          </p>

          <h3 className="text-[#223960] text-base sm:text-lg font-semibold mb-4 font-['Lato']">
            Customer Support Services
          </h3>
          <ul className="space-y-2 mb-6">
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Order Related Support</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Payment & Refund Assistance</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Subscription & Plan Help</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Account Login Issues</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Technical Support</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Business Setup Assistance</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Product Queries</li>
            <li className="text-[#535353] text-sm sm:text-base font-['Lato']">Complaint Resolution</li>
          </ul>

          <h3 className="text-[#223960] text-base sm:text-lg font-semibold mb-4 font-['Lato']">
            Contact Us
          </h3>
          <div className="space-y-3 mb-6">
            <p className="text-[#535353] text-sm sm:text-base font-['Lato']">
              📧 Email: <a href="mailto:info@visiomatix.in" className="text-[#1FABEA] underline">info@visiomatix.in</a>
            </p>
            <p className="text-[#535353] text-sm sm:text-base font-['Lato']">
              📱 WhatsApp Support: <a href="https://wa.me/919270271916" className="text-[#1FABEA] underline">+91 9270271916</a>
            </p>
          </div>

          <h3 className="text-[#223960] text-base sm:text-lg font-semibold mb-4 font-['Lato']">
            Support Hours
          </h3>
          <p className="text-[#535353] text-sm sm:text-base font-['Lato'] mb-6">
            🕒 Monday to Saturday: 9:00 AM to 6:00 PM
          </p>

          <h3 className="text-[#223960] text-base sm:text-lg font-semibold mb-4 font-['Lato']">
            Quick Response Promise
          </h3>
          <p className="text-[#535353] text-sm sm:text-base font-['Lato'] mb-6">
            We aim to respond to all queries as quickly as possible and provide the best customer experience.
          </p>

          <p className="text-[#535353] text-sm sm:text-base font-['Lato'] italic">
            Thank you for choosing us. We value your trust and support.
          </p>
        </div>
      </div>
      </div>{/* end overlay-scroll */}
    </motion.div>
  );
}
