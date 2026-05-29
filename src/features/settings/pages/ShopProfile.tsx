import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Camera } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import UploadSignatureModal from "../components/UploadSignatureModal";
import UploadLogoModal from "../components/UploadLogoModal";

interface ShopProfileProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function ShopProfile({ onClose, activeScreen, onNavigate }: ShopProfileProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    gstin: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    pincode: "",
    description: "",
  });

  const [hasSignature, setHasSignature] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving shop profile:", formData);
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
      {/* ── Sticky Header ── */}
      <div className="flex-shrink-0 bg-white border-b border-[#DBDBDB]/72 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#223960]" />
          </button>
          <h2 className="text-base font-semibold text-[#223960]">Shop Profile</h2>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="overlay-scroll">
        <div className="px-4 sm:px-6 py-6">
          <div className="max-w-4xl mx-auto">
          {/* Profile Image and Completion */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <div className="w-[68px] h-[68px] sm:w-20 sm:h-20 rounded-full bg-gray-200 border border-[#1FABEA] flex items-center justify-center overflow-hidden">
                <span className="text-2xl text-gray-400">🏪</span>
              </div>
              <button
                onClick={() => setShowLogoModal(true)}
                className="absolute bottom-0 right-0 w-[18px] h-[19px] sm:w-5 sm:h-5 bg-white rounded-full border border-[#1FABEA] flex items-center justify-center"
              >
                <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1FABEA]" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-[#1C3458]">Profile 83% Completed</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Business Name */}
            <div>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Business Name"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>

            {/* GSTIN */}
            <div>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => handleInputChange("gstin", e.target.value)}
                placeholder="GSTIN"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>

            {/* Phone Number 1 */}
            <div>
              <input
                type="tel"
                value={formData.phone1}
                onChange={(e) => handleInputChange("phone1", e.target.value)}
                placeholder="Phone Number 1"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>

            {/* Phone Number 2 (Optional) */}
            <div>
              <input
                type="tel"
                value={formData.phone2}
                onChange={(e) => handleInputChange("phone2", e.target.value)}
                placeholder="Phone Number 2 (Optional)"
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

            {/* Business Address */}
            <div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Business Address"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>

            {/* Pincode */}
            <div>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                placeholder="Pincode"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>

            {/* Business Description (Optional) */}
            <div>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Business Description (Optional)"
                className="w-full bg-white border border-[#DBDBDB] rounded-xl px-4 py-2.5 text-sm text-[#223960] placeholder:text-[#CAC7C7] outline-none focus:border-[#1FABEA]"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm text-[#223960] mb-3">Signature</h3>
            <div className="border border-dashed border-[#DBDBDB] rounded-xl p-6 sm:p-8 min-h-[237px] flex flex-col items-center justify-center">
              {hasSignature ? (
                <div className="text-center">
                  <div className="w-[154px] h-[53px] bg-gray-100 rounded mb-4 flex items-center justify-center">
                    <span className="text-xs text-gray-400">Signature Preview</span>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button className="px-3 py-1.5 bg-[#E7F7FF] rounded text-[10px] text-[#1FABEA]">
                      Save
                    </button>
                    <button className="px-3 py-1.5 bg-[#E7F7FF] rounded text-[10px] text-[#1FABEA]">
                      Upload
                    </button>
                    <button
                      onClick={() => setHasSignature(false)}
                      className="px-3 py-1.5 bg-[#E7F7FF] rounded text-[10px] text-[#1FABEA]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-[#8A8080] mb-4">No signature uploaded</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="px-3 py-1.5 bg-[#E7F7FF] rounded text-[10px] text-[#1FABEA]"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ── end overlay-scroll ── */}
      </div>

      {/* ── Bottom Action Buttons (inside overlay, above BottomNav) ── */}
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

      {/* ── Upload Signature Modal ── */}
      <UploadSignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onCamera={() => {
          setHasSignature(true);
          setShowSignatureModal(false);
        }}
        onGallery={() => {
          setHasSignature(true);
          setShowSignatureModal(false);
        }}
      />

      {/* ── Upload Logo Modal ── */}
      <UploadLogoModal
        isOpen={showLogoModal}
        onClose={() => setShowLogoModal(false)}
        onCamera={() => setShowLogoModal(false)}
        onGallery={() => setShowLogoModal(false)}
      />
    </motion.div>
  );
}
