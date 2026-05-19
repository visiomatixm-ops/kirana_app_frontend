import { motion } from "motion/react";
import { ChevronLeft, UserPlus, Lock } from "lucide-react";
import BottomNav from "./BottomNav";

interface StaffAccessProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function StaffAccess({ onClose, activeScreen, onNavigate }: StaffAccessProps) {
  const staffMembers = [
    { id: 1, name: "Amit Kumar", role: "Cashier", phone: "+91 98765 43210", active: true },
    { id: 2, name: "Priya Sharma", role: "Manager", phone: "+91 98765 43211", active: true },
    { id: 3, name: "Rahul Verma", role: "Stock Keeper", phone: "+91 98765 43212", active: false },
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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-[#223960]" />
            </button>
            <h2 className="text-base font-semibold text-[#223960]">Staff Access</h2>
          </div>
          <button className="w-8 h-8 bg-[#1FABEA] rounded-full flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Upgrade Notice */}
      <div className="px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#FFB078] to-[#FF6900] rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-white mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Upgrade to Enable Staff Access</h3>
                <p className="text-xs text-white/90 mb-3">
                  Add up to 5 staff members with the Pro plan or unlimited staff with Premium
                </p>
                <button className="bg-white text-[#FF6900] px-4 py-1.5 rounded-lg text-xs font-semibold">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          {/* Staff List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#223960] mb-2">Staff Members</h3>
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className="bg-white border border-[#DBDBDB] rounded-xl p-4 opacity-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-[#223960]">{staff.name}</p>
                    <p className="text-xs text-[#8A8080]">{staff.role}</p>
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      staff.active ? "bg-[#E5FFF5] text-[#00C479]" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {staff.active ? "Active" : "Inactive"}
                  </div>
                </div>
                <p className="text-xs text-[#8A8080]">{staff.phone}</p>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="mt-6 bg-[#F9F9F9] rounded-xl p-4">
            <h4 className="text-xs font-semibold text-[#223960] mb-3">Staff Access Features</h4>
            <ul className="space-y-2 text-xs text-[#535353]">
              <li className="flex items-start gap-2">
                <span className="text-[#1FABEA] mt-0.5">✓</span>
                <span>Individual staff login credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1FABEA] mt-0.5">✓</span>
                <span>Role-based permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1FABEA] mt-0.5">✓</span>
                <span>Track staff activity and sales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1FABEA] mt-0.5">✓</span>
                <span>Secure access control</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
