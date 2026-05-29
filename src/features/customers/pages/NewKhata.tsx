import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, User, Phone, IndianRupee, MapPin, FileText, CheckCircle } from "lucide-react";

interface NewKhataProps {
  onClose: () => void;
  onSave?: (customer: NewCustomerData) => void;
}

export interface NewCustomerData {
  name: string;
  phone: string;
  khataAmount: string;
  address: string;
  note: string;
}

export default function NewKhata({ onClose, onSave }: NewKhataProps) {
  const [form, setForm] = useState<NewCustomerData>({
    name: "",
    phone: "",
    khataAmount: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<NewCustomerData>>({});
  const [saved, setSaved] = useState(false);

  const set = (field: keyof NewCustomerData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<NewCustomerData> = {};
    if (!form.name.trim()) newErrors.name = "Customer name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit mobile number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaved(true);
    setTimeout(() => {
      onSave?.(form);
      onClose();
    }, 900);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-0 bg-white z-50 flex flex-col"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center px-6 pt-10 pb-4">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#223960]" strokeWidth={2.5} />
        </button>
        <h1
          className="text-xl font-bold ml-2"
          style={{ color: "#FF6901" }}
        >
          New Khata
        </h1>
      </div>

      {/* ── Orange Divider ── */}
      <div className="mx-6 h-px bg-[#FF6901] mb-5" />

      {/* ── Form ── */}
      <div className="flex-1 overflow-y-auto scroll-hidden scroll-touch px-6 pb-safe space-y-4"
        style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom, 0px))" }}
      >

        {/* Customer Name */}
        <div>
          <div
            className="flex items-center gap-3 px-4 h-[42px] rounded-[7px] border"
            style={{
              background: "#F0F0F0",
              borderColor: errors.name ? "#FF4444" : "#CAC7C7",
            }}
          >
            <User className="w-4 h-4 text-[#CAC7C7] shrink-0" />
            <input
              type="text"
              placeholder="Customer Name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-[#223960] placeholder-[#CAC7C7] outline-none"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <div
            className="flex items-center gap-3 px-4 h-[42px] rounded-[7px] border"
            style={{
              background: "#F0F0F0",
              borderColor: errors.phone ? "#FF4444" : "#E4E3E3",
            }}
          >
            <Phone className="w-4 h-4 text-[#CAC7C7] shrink-0" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              maxLength={10}
              onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
              className="flex-1 bg-transparent text-[13px] text-[#223960] placeholder-[#CAC7C7] outline-none"
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>
          )}
        </div>

        {/* Khata Amount + Address (side by side) */}
        <div className="flex gap-3">
          {/* Khata Amount */}
          <div
            className="flex items-center gap-2 px-4 h-[42px] rounded-[7px] border flex-1"
            style={{ background: "#F0F0F0", borderColor: "#E4E3E3" }}
          >
            <IndianRupee className="w-4 h-4 text-[#CAC7C7] shrink-0" />
            <input
              type="number"
              placeholder="Khata (e.g ₹2000)"
              value={form.khataAmount}
              onChange={(e) => set("khataAmount", e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-[#223960] placeholder-[#CAC7C7] outline-none min-w-0"
            />
          </div>

          {/* Address */}
          <div
            className="flex items-center gap-2 px-4 h-[42px] rounded-[7px] border flex-1"
            style={{ background: "#F0F0F0", borderColor: "#E4E3E3" }}
          >
            <MapPin className="w-4 h-4 text-[#CAC7C7] shrink-0" />
            <input
              type="text"
              placeholder="Address (Optional)"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-[#223960] placeholder-[#CAC7C7] outline-none min-w-0"
            />
          </div>
        </div>

        {/* Note */}
        <div
          className="flex gap-3 px-4 py-3 rounded-[7px] border"
          style={{ background: "#F0F0F0", borderColor: "#E4E3E3" }}
        >
          <FileText className="w-4 h-4 text-[#CAC7C7] shrink-0 mt-0.5" />
          <textarea
            placeholder="Note (Optional)"
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            rows={3}
            className="flex-1 bg-transparent text-[13px] text-[#223960] placeholder-[#CAC7C7] outline-none resize-none"
          />
        </div>
      </div>

      {/* ── Save Button ── */}
      <div className="absolute bottom-8 left-6 right-6">
        <motion.button
          onClick={handleSave}
          whileTap={{ scale: 0.97 }}
          disabled={saved}
          className="w-full h-[42px] rounded-[7px] flex items-center justify-center gap-2 font-bold text-base text-white transition-all"
          style={{
            background: saved ? "#00a865" : "#00C479",
            boxShadow: "0 4px 16px rgba(0, 196, 121, 0.35)",
          }}
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
