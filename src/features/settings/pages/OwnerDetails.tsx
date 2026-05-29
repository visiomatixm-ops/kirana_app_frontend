import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

interface OwnerDetailsProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function OwnerDetails({ onClose, activeScreen, onNavigate }: OwnerDetailsProps) {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    aadhaarNumber: "",
    panNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving owner details:", formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay-page z-50"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-[#DBDBDB]/72 px-4 sm:px-6 py-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#223960]" />
          </button>
          <h2 className="text-base font-semibold text-[#223960]">Owner Details</h2>
        </div>
      </div>

      {/* Form */}
      <div className="overlay-scroll">
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Owner Name */}
          <div>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
              placeholder="Owner Name"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Phone Number"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>

          {/* Email ID */}
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email ID"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>

          {/* Aadhaar Number */}
          <div>
            <input
              type="text"
              value={formData.aadhaarNumber}
              onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
              placeholder="Aadhaar Number (Optional)"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>

          {/* PAN Number */}
          <div>
            <input
              type="text"
              value={formData.panNumber}
              onChange={(e) => handleInputChange("panNumber", e.target.value)}
              placeholder="PAN Number (Optional)"
              className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
            />
          </div>
        </div>
      </div>
      </div>{/* end overlay-scroll */}

      {/* Bottom Buttons */}
      <div className="overlay-actions px-4 sm:px-6 py-4">
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
