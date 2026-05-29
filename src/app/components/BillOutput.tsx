import { motion } from "motion/react";

interface BillItem {
  name: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

interface BillOutputProps {
  billNumber: string;
  date: string;
  shopName: string;
  gst: string;
  items: BillItem[];
  subtotal: number;
  total: number;
}

export default function BillOutput({
  billNumber,
  date,
  shopName,
  gst,
  items,
  subtotal,
  total,
}: BillOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 mx-6 my-4 shadow-lg max-w-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#223960] font-['Mozilla_Headline']">
            {shopName}
          </h3>
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline'] mt-1">GTS:{gst}</p>
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">{date}</p>
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">Bill No: {billNumber}</p>
        </div>
        <div className="w-14 h-14 bg-[#223960] rounded-lg flex items-center justify-center text-white font-semibold">
          Shop Logo
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#8A8080] my-3"></div>

      {/* Item Headers */}
      <div className="grid grid-cols-12 gap-2 mb-2">
        <div className="col-span-5">
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">ITEM</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">QTY</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">RATE</p>
        </div>
        <div className="col-span-3 text-right">
          <p className="text-[10px] text-[#8A8080] font-['Mozilla_Headline']">TOTAL</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#8A8080] mb-2"></div>

      {/* Items */}
      <div className="space-y-1 mb-2">
        {items.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 gap-2 items-start">
              <div className="col-span-5">
                <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">{item.name}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">
                  {item.quantity} {item.unit}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">₹{item.rate}</p>
              </div>
              <div className="col-span-3 text-right">
                <p className="text-sm text-[#223960] font-light font-['Mozilla_Headline']">₹{item.total.toFixed(2)}</p>
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="border-t border-dashed border-[#8A8080]/40 my-1"></div>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#8A8080] my-2"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-[#223960] font-semibold font-['Lato']">TOTAL: ₹{total.toFixed(2)}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-[#8A8080] my-3"></div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <p className="text-[15px] text-[#223960] font-light font-['Mozilla_Headline']">
          Thank you ! Please visit again.
        </p>
        <div className="text-right">
          <p className="text-[10px] text-[#223960] font-light font-['Mozilla_Headline']">Signature</p>
          <div className="w-16 h-6 mt-1">
            {/* Signature placeholder */}
            <div className="border-b border-[#223960]"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
