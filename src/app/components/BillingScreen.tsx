import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scan,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  QrCode,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle,
  Printer,
  Share2,
  History,
} from "lucide-react";
import BillOutput from "./BillOutput";
import BillHistory from "./BillHistory";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  mrp: number;
}

interface BillingScreenProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function BillingScreen({ activeScreen = "billing", onNavigate = () => {} }: BillingScreenProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [generatedBill, setGeneratedBill] = useState<any>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const products = [
    { id: "1", name: "Tata Salt 1kg", price: 20, mrp: 22 },
    { id: "2", name: "Parle-G Biscuit", price: 10, mrp: 12 },
    { id: "3", name: "Fortune Oil 1L", price: 180, mrp: 185 },
    { id: "4", name: "Amul Milk 500ml", price: 28, mrp: 30 },
    { id: "5", name: "Maggi Noodles", price: 14, mrp: 15 },
  ];

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowSearch(false);
    setSearchQuery("");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst - discount;

  const handlePayment = (method: string) => {
    // Generate bill
    const billData = {
      billNumber: "#" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString(),
      shopName: "Sharma Kirana Store",
      gst: "22AAAAA0000A1Z5",
      customerName: customerName || "Customer",
      customerPhone: customerPhone || "+91 XXXXX XXXXX",
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unit: "packet",
        rate: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      total,
      profit: cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.15), 0), // Assuming 15% profit
    };

    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPayment(false);
      setGeneratedBill(billData);
    }, 1500);
  };

  const handleNewBill = () => {
    setGeneratedBill(null);
    setCart([]);
    setDiscount(0);
    setCustomerName("");
    setCustomerPhone("");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 bg-background min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#223960]">Bill's</h2>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="bg-[#D9D9D9]/24 text-[#8A8080] px-3 sm:px-4 py-2 rounded-md flex items-center gap-2"
          >
            <span className="text-xs sm:text-sm">History</span>
            <History className="w-3 h-3" />
          </button>
        </div>
        {!generatedBill && (
          <div className="flex gap-2 sm:gap-3 mt-3">
            <button className="flex-1 bg-[#F6F6F6] text-[#223960] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium">
              Create Invoice
            </button>
            <button className="p-2 text-[#FF6900]">
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Product Selection */}
      {!generatedBill && (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
            {/* Product Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setShowSearch(true)}
                className="w-full bg-[#D9D9D9]/24 rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <span className="text-sm text-[#8A8080]">Select your product......</span>
                <svg
                  className="w-3 h-3 text-[#8A8080]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="bg-[#D9D9D9]/24 rounded-xl px-3 py-2 flex items-center gap-2">
              <button className="text-[#8A8080]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className="text-[#8A8080] text-sm w-4 text-center">0</span>
              <button className="text-[#8A8080]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Add Button */}
            <button className="text-[#223960] text-sm font-bold">+ Add</button>
          </div>
        </div>
      )}

      {/* Cart Items */}
      {!generatedBill && (
        <div className="px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Cart is empty</p>
              <p className="text-sm text-muted-foreground">Search products to add</p>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              {/* Cart Items List */}
              {cart.map((item, index) => (
                <div key={item.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex items-start justify-between py-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#223960] font-['Lato']">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#223960] font-['Lato']">
                        {item.quantity} packet × ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-[#223960]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-5 bg-[#F25955]/24 rounded flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-[#F42018]" />
                      </button>
                    </div>
                  </motion.div>
                  {index < cart.length - 1 && (
                    <div className="border-t border-[#8A8080]/30 my-2"></div>
                  )}
                </div>
              ))}

              {/* Customer Details Card */}
              <div className="bg-gradient-to-r from-[#223960] to-[#0EA5E9] rounded-2xl p-6 mt-6">
                {/* Customer Name Input */}
                <div className="mb-4">
                  <label className="text-sm text-white mb-2 block font-['Lato']">
                    Customer Name:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder:text-white/60 outline-none font-['Lato']"
                  />
                </div>

                {/* Contact Input */}
                <div className="mb-6">
                  <label className="text-sm text-white mb-2 block font-['Lato']">
                    Contact:
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder:text-white/60 outline-none font-['Lato']"
                  />
                </div>

                <div className="border-t border-white/30 mb-4"></div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-white font-['Lato']">Subtotal</span>
                  <span className="text-sm font-bold text-white font-['Lato']">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Profit */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-white font-['Lato']">Profit</span>
                  <span className="text-sm font-bold text-[#00C479] font-['Lato']">
                    ₹{(cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.15), 0)).toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-white/30 mb-4"></div>

                {/* Total */}
                <div className="bg-white/20 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-base font-bold text-white font-['Lato']">Total</span>
                  <span className="text-base font-bold text-white font-['Lato']">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Generate Bill Button */}
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-gradient-to-r from-[#223960] to-[#0EA5E9] text-white py-4 rounded-xl font-bold font-['Lato'] mt-4"
              >
                Generate Bill & Print
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50"
          >
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowSearch(false)} className="text-muted-foreground">
                  <X className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="px-6 py-4 space-y-2">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <div className="text-left">
                    <p className="text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">₹{product.price}</p>
                  </div>
                  <Plus className="w-5 h-5 text-primary" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl p-6 w-full"
            >
              {!paymentSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl text-foreground">Select Payment</h3>
                      <p className="text-2xl text-primary mt-1">₹{total.toFixed(2)}</p>
                    </div>
                    <button onClick={() => setShowPayment(false)} className="text-muted-foreground">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handlePayment("cash")}
                      className="w-full flex items-center gap-4 bg-muted rounded-xl p-4 hover:bg-primary hover:text-white transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-white/20">
                        <Wallet className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-lg">Cash</span>
                    </button>
                    <button
                      onClick={() => handlePayment("upi")}
                      className="w-full flex items-center gap-4 bg-muted rounded-xl p-4 hover:bg-primary hover:text-white transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-white/20">
                        <Smartphone className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-lg">UPI</span>
                    </button>
                    <button
                      onClick={() => handlePayment("card")}
                      className="w-full flex items-center gap-4 bg-muted rounded-xl p-4 hover:bg-primary hover:text-white transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-white/20">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg">Card</span>
                    </button>
                    <button
                      onClick={() => handlePayment("credit")}
                      className="w-full flex items-center gap-4 bg-orange-50 border-2 border-orange-200 rounded-xl p-4 hover:bg-orange-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-orange-500" />
                      </div>
                      <span className="text-lg text-orange-900">Credit / Khata</span>
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl text-foreground mb-2">Payment Successful!</h3>
                  <p className="text-muted-foreground mb-6">₹{total.toFixed(2)} received</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-muted text-foreground py-3 rounded-xl">
                      <Printer className="w-5 h-5" />
                      <span>Print</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white py-3 rounded-xl">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bill History Modal */}
      <AnimatePresence>
        {showHistory && (
          <BillHistory
            onClose={() => setShowHistory(false)}
            activeScreen={activeScreen}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>

      {/* Generated Bill Display */}
      <AnimatePresence>
        {generatedBill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 overflow-y-auto pb-32"
          >
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-base font-medium text-[#223960]">Bill #{generatedBill.billNumber.slice(1)} Ready!</h3>
              <p className="text-sm text-[#8A8080]">{generatedBill.shopName}</p>
            </div>

            <BillOutput
              billNumber={generatedBill.billNumber}
              date={generatedBill.date}
              shopName={generatedBill.shopName}
              gst={generatedBill.gst}
              items={generatedBill.items}
              subtotal={generatedBill.subtotal}
              total={generatedBill.total}
            />

            {/* Profit Summary */}
            <div className="mx-6 mb-4 bg-[#E5FFF5] border border-[#00C479] rounded-2xl p-4">
              <p className="text-[15px] font-bold text-[#00C479] leading-tight">
                Profit of ₹{generatedBill.profit.toFixed(2)} was earned from this bill.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-24 left-0 right-0 px-6 flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-[#223960] to-[#0EA5E9] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                <Printer className="w-5 h-5" />
                <span>Print / Download</span>
              </button>
              <button
                onClick={handleNewBill}
                className="flex-1 bg-[#F1F1F1] border border-[#ACACAC] text-[#223960] py-4 rounded-xl font-bold"
              >
                + New Bill
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
