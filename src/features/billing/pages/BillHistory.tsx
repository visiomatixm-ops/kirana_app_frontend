import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";

interface BillData {
  billNumber: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    rate: number;
    total: number;
  }>;
  total: number;
  dateGroup: string;
}

interface BillHistoryProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function BillHistory({ onClose, activeScreen, onNavigate }: BillHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState<BillData | null>(null);

  const bills: BillData[] = [
    {
      billNumber: "#1001",
      date: "22 Apr 2026 01:26 pm",
      dateGroup: "Today - Thursday, 23 April 2026",
      items: [
        { name: "Balaji Chips", quantity: 2, unit: "packet", rate: 5, total: 10 },
        { name: "Sunflower Oil", quantity: 3, unit: "liter", rate: 350, total: 1050 },
        { name: "Tata Salt", quantity: 1, unit: "kg", rate: 25, total: 25 },
        { name: "Parle-G Biscuit", quantity: 3, unit: "packet", rate: 5, total: 15 },
        { name: "Surf Excel", quantity: 2, unit: "packet", rate: 382, total: 764 },
        { name: "Mustard Oil", quantity: 1, unit: "liter", rate: 165, total: 165 },
        { name: "Maggi Noodles", quantity: 1, unit: "packet", rate: 19, total: 19 },
      ],
      total: 2048,
    },
    {
      billNumber: "#1002",
      date: "22 Apr 2026 01:26 pm",
      dateGroup: "Sunday, 23 April 2026",
      items: [
        { name: "Balaji Chips", quantity: 2, unit: "packet", rate: 5, total: 10 },
        { name: "Sunflower Oil", quantity: 3, unit: "liter", rate: 350, total: 1050 },
        { name: "Tata Salt", quantity: 1, unit: "kg", rate: 25, total: 25 },
        { name: "Parle-G Biscuit", quantity: 3, unit: "packet", rate: 5, total: 15 },
        { name: "Surf Excel", quantity: 2, unit: "packet", rate: 382, total: 764 },
        { name: "Mustard Oil", quantity: 1, unit: "liter", rate: 165, total: 165 },
        { name: "Maggi Noodles", quantity: 1, unit: "packet", rate: 19, total: 19 },
      ],
      total: 2048,
    },
  ];

  const filteredBills = bills.filter(
    (b) =>
      b.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group bills by date
  const groupedBills = filteredBills.reduce((acc, bill) => {
    if (!acc[bill.dateGroup]) {
      acc[bill.dateGroup] = [];
    }
    acc[bill.dateGroup].push(bill);
    return acc;
  }, {} as Record<string, BillData[]>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay-page bg-[#F1F1F1] z-50"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[32px] font-bold text-[#223960]">Bill's History</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300"
          >
            <X className="w-6 h-6 text-[#223960]" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8080]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-[#223960] placeholder:text-[#8A8080] outline-none"
          />
        </div>
      </div>

      {/* Bills History */}
      <div className="overlay-scroll">
      <div className="px-4 py-4 space-y-6">
        {Object.entries(groupedBills).map(([dateGroup, groupBills]) => (
          <div key={dateGroup}>
            <h3 className="text-sm font-bold text-[#223960] mb-3">{dateGroup}</h3>
            <div className="space-y-4">
              {groupBills.map((bill, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedBill(bill)}
                >
                  {/* Bill Preview */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-[#223960] font-['Mozilla_Headline']">
                        Sharma Kirana Store
                      </h4>
                      <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline'] mt-1">
                        GTS:22AAAAA0000A1Z5
                      </p>
                      <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">{bill.date}</p>
                      <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">
                        Bill No: {bill.billNumber}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-[#223960] rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                      Shop Logo
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-[#8A8080] my-2"></div>

                  {/* Item Headers */}
                  <div className="grid grid-cols-12 gap-2 mb-2 text-[10px] text-[#8A8080] font-['Mozilla_Headline']">
                    <div className="col-span-5">ITEM</div>
                    <div className="col-span-2">QTY</div>
                    <div className="col-span-2">RATE</div>
                    <div className="col-span-3 text-right">TOTAL</div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#8A8080] mb-2"></div>

                  {/* Items Preview (first 3 items) */}
                  <div className="space-y-1 mb-2">
                    {bill.items.slice(0, 3).map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <div className="grid grid-cols-12 gap-2 text-sm text-[#223960] font-light font-['Mozilla_Headline']">
                          <div className="col-span-5">{item.name}</div>
                          <div className="col-span-2">
                            {item.quantity} {item.unit}
                          </div>
                          <div className="col-span-2">₹{item.rate}</div>
                          <div className="col-span-3 text-right">₹{item.total.toFixed(2)}</div>
                        </div>
                        {itemIndex < Math.min(2, bill.items.length - 1) && (
                          <div className="border-t border-dashed border-[#8A8080]/40 my-1"></div>
                        )}
                      </div>
                    ))}
                    {bill.items.length > 3 && (
                      <p className="text-xs text-[#8A8080] text-center">+ {bill.items.length - 3} more items</p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-[#8A8080] my-2"></div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#223960] font-semibold font-['Lato']">
                      TOTAL: ₹{bill.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-[#8A8080] my-2"></div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">
                      Thank you ! Please visit again.
                    </p>
                    <p className="text-[10px] text-[#223960] font-light font-['Mozilla_Headline']">Signature</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>{/* end overlay-scroll */}

      {/* Full Bill Modal */}
      <AnimatePresence>
        {selectedBill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-6"
            onClick={() => setSelectedBill(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setSelectedBill(null)}
                  className="text-[#8A8080] hover:text-[#223960]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Full Bill Content */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-base font-semibold text-[#223960] font-['Mozilla_Headline']">
                    Sharma Kirana Store
                  </h4>
                  <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline'] mt-1">
                    GTS:22AAAAA0000A1Z5
                  </p>
                  <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">{selectedBill.date}</p>
                  <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">
                    Bill No: {selectedBill.billNumber}
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#223960] rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                  Shop Logo
                </div>
              </div>

              <div className="border-t border-dashed border-[#8A8080] my-3"></div>

              <div className="grid grid-cols-12 gap-2 mb-2 text-[10px] text-[#8A8080] font-['Mozilla_Headline']">
                <div className="col-span-5">ITEM</div>
                <div className="col-span-2">QTY</div>
                <div className="col-span-2">RATE</div>
                <div className="col-span-3 text-right">TOTAL</div>
              </div>

              <div className="border-t border-[#8A8080] mb-2"></div>

              <div className="space-y-1 mb-2">
                {selectedBill.items.map((item, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-12 gap-2 text-sm text-[#223960] font-light font-['Mozilla_Headline']">
                      <div className="col-span-5">{item.name}</div>
                      <div className="col-span-2">
                        {item.quantity} {item.unit}
                      </div>
                      <div className="col-span-2">₹{item.rate}</div>
                      <div className="col-span-3 text-right">₹{item.total.toFixed(2)}</div>
                    </div>
                    {index < selectedBill.items.length - 1 && (
                      <div className="border-t border-dashed border-[#8A8080]/40 my-1"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#8A8080] my-2"></div>

              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-[#223960] font-semibold font-['Lato']">
                  TOTAL: ₹{selectedBill.total.toFixed(2)}
                </p>
              </div>

              <div className="border-t border-dashed border-[#8A8080] my-3"></div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">
                  Thank you ! Please visit again.
                </p>
                <p className="text-[10px] text-[#223960] font-light font-['Mozilla_Headline']">Signature</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
