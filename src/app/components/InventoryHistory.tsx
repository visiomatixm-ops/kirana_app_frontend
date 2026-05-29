import { useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import BottomNav from "./BottomNav";

interface Transaction {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  type: "sell" | "stock";
  mrp: number;
  total: number;
  profit: number;
  time: string;
  date: string;
}

interface InventoryHistoryProps {
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export default function InventoryHistory({ onClose, activeScreen, onNavigate }: InventoryHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const transactions: Transaction[] = [
    {
      id: "1",
      productName: "Balaji Chips",
      quantity: 1,
      unit: "Packet",
      type: "sell",
      mrp: 5,
      total: 5,
      profit: 2,
      time: "2:13Pm",
      date: "Today - Thursday, 23 April 2026",
    },
    {
      id: "2",
      productName: "Sunflower Oil",
      quantity: 3,
      unit: "liter",
      type: "sell",
      mrp: 350,
      total: 1050,
      profit: 150,
      time: "8:05Am",
      date: "Today - Thursday, 23 April 2026",
    },
    {
      id: "3",
      productName: "Tata Salt",
      quantity: 5,
      unit: "kg",
      type: "sell",
      mrp: 22,
      total: 110,
      profit: 10,
      time: "7:19Am",
      date: "Today - Thursday, 23 April 2026",
    },
    {
      id: "4",
      productName: "Parle-G Biscuit",
      quantity: 6,
      unit: "Packet",
      type: "sell",
      mrp: 5,
      total: 30,
      profit: 12,
      time: "7:03Am",
      date: "Today - Thursday, 23 April 2026",
    },
    {
      id: "5",
      productName: "Surf Excel",
      quantity: 2,
      unit: "Packet",
      type: "sell",
      mrp: 100,
      total: 200,
      profit: 20,
      time: "2:13Pm",
      date: "Tuesday, 23 April 2026",
    },
    {
      id: "6",
      productName: "Mustard Oil",
      quantity: 3,
      unit: "liter",
      type: "sell",
      mrp: 118,
      total: 354,
      profit: 36,
      time: "2:13Pm",
      date: "Tuesday, 23 April 2026",
    },
    {
      id: "7",
      productName: "Maggi Noodles",
      quantity: 5,
      unit: "Packet",
      type: "sell",
      mrp: 22,
      total: 110,
      profit: 2,
      time: "2:13Pm",
      date: "Tuesday, 23 April 2026",
    },
    {
      id: "8",
      productName: "kaju",
      quantity: 500,
      unit: "Gm",
      type: "sell",
      mrp: 350,
      total: 350,
      profit: 15,
      time: "2:13Pm",
      date: "Tuesday, 23 April 2026",
    },
    {
      id: "9",
      productName: "Jim Jam Biscuit",
      quantity: 5,
      unit: "Packet",
      type: "sell",
      mrp: 10,
      total: 50,
      profit: 2,
      time: "2:13Pm",
      date: "Sunday, 23 April 2026",
    },
    {
      id: "10",
      productName: "Sugar",
      quantity: 15,
      unit: "Kg",
      type: "sell",
      mrp: 56,
      total: 840,
      profit: 150,
      time: "2:13Pm",
      date: "Sunday, 23 April 2026",
    },
  ];

  const filteredTransactions = transactions.filter((t) =>
    t.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = [];
    }
    acc[transaction.date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#F1F1F1] z-50 overflow-y-auto pb-24"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[32px] font-bold text-[#223960]">History</h2>
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

      {/* Transaction History */}
      <div className="px-6 py-4 space-y-6">
        {Object.entries(groupedTransactions).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-sm font-bold text-[#223960] mb-3">{date}</h3>
            <div className="bg-white rounded-xl divide-y divide-gray-200">
              {items.map((transaction, index) => (
                <div key={transaction.id} className="px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-[#223960] mb-1">{transaction.productName}</p>
                      <p className="text-xs text-[#8A8080]">
                        {transaction.quantity} {transaction.unit} {transaction.type === "sell" ? "Sell" : "Stock"} | MRP ₹
                        {transaction.mrp} | Total ₹{transaction.total} | Profit ₹{transaction.profit}+
                      </p>
                    </div>
                    <span className="text-xs text-[#8A8080]">{transaction.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </motion.div>
  );
}
