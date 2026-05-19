import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ChevronRight, Users } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import NewKhata, { type NewCustomerData } from "./NewKhata";

interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
}

interface CustomerKhataProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function CustomerKhata({ activeScreen = "khata", onNavigate = () => {} }: CustomerKhataProps) {
  const [showNewKhata, setShowNewKhata] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "Rajesh Kumar",  phone: "+91 93765 28765", balance: 2450 },
    { id: "2", name: "Priya Sharma",  phone: "+91 09245 18761", balance: 1800 },
    { id: "3", name: "Rakesh Varma",  phone: "+91 45634 78567", balance: 200  },
    { id: "4", name: "Prasad Mane",   phone: "+91 98067 25769", balance: 500  },
    { id: "5", name: "Ajay Wanjule",  phone: "+91 87306 26597", balance: 1000 },
    { id: "6", name: "Anuja Hire",    phone: "+91 67298 20987", balance: 1600 },
  ]);

  const handleSaveKhata = (data: NewCustomerData) => {
    const newCustomer: Customer = {
      id: String(Date.now()),
      name: data.name,
      phone: data.phone,
      balance: data.khataAmount ? parseFloat(data.khataAmount) : 0,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setShowNewKhata(false);
  };

  const totalOutstanding = customers.reduce((sum, c) => sum + c.balance, 0);

  return (
    /* ── page-container: full viewport height, no page-level scroll ── */
    <div className="page-container bg-white" style={{ height: "100dvh" }}>

      {/* ── Gradient header — flex-shrink:0 so it never scrolls ── */}
      <div
        className="flex-shrink-0 relative"
        style={{
          background: "linear-gradient(to right, #FF6900, #FFB078)",
          borderRadius: "0 0 50px 50px",
        }}
      >
        {/* Top bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Lato']">
                Customer Khata
              </h1>
              <p className="text-sm text-white font-['Lato'] mt-1">
                {customers.length} customers
              </p>
            </div>
            <button
              onClick={() => setShowNewKhata(true)}
              className="w-10 h-10 bg-[#FF6900] rounded-xl flex items-center justify-center text-white shadow-lg"
            >
              <Plus className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Outstanding card — part of the header block */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-5 border border-[#FF6900]"
            style={{ background: "rgba(255,231,214,0.35)", backdropFilter: "blur(4px)" }}
          >
            <p className="text-sm text-white font-['Lato'] mb-1">Total Outstanding</p>
            <p className="text-2xl sm:text-3xl font-bold text-white font-['Lato']">
              ₹{totalOutstanding.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable customer list ── */}
      <div
        className="scroll-area scroll-touch flex-1"
        style={{ paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 space-y-4">
          {customers.map((customer) => (
            <motion.div
              key={customer.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-[#DBDBDB] rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#FFAD74]/50 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#FF6901]" />
                  </div>
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#223960] font-['Lato']">
                      {customer.name}
                    </h3>
                    <p className="text-sm text-[#8A8080] font-['Lato'] mt-0.5">
                      {customer.phone}
                    </p>
                    <p className="text-sm text-[#8A8080] font-['Lato'] mt-1">
                      Outstanding Balance
                    </p>
                  </div>
                </div>
                {/* Balance and Arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-base font-semibold text-[#FF6901] font-['Lato']">
                    ₹{customer.balance}
                  </p>
                  <ChevronRight className="w-5 h-5 text-[#8A8080]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BottomNav sits outside scroll-area */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />

      {/* New Khata slide-in */}
      <AnimatePresence>
        {showNewKhata && (
          <NewKhata
            onClose={() => setShowNewKhata(false)}
            onSave={handleSaveKhata}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
