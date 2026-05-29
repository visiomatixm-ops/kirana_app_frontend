import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Plus, Search, AlertTriangle, Edit2, Trash2, X, History, ChevronDown, ChevronUp } from "lucide-react";
import InventoryHistory from "./InventoryHistory";

interface Product {
  id: string;
  name: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  purchasePrice: number;
  stock: number;
  lowStockAlert: number;
  unit: string;
}

interface InventoryScreenProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function InventoryScreen({ activeScreen = "inventory", onNavigate = () => {} }: InventoryScreenProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Tata Salt 1kg",
      barcode: "8901234567890",
      mrp: 22,
      sellingPrice: 22,
      purchasePrice: 18,
      stock: 100,
      lowStockAlert: 10,
      unit: "Packet",
    },
    {
      id: "2",
      name: "Parle-G Biscuit",
      barcode: "8901234567891",
      mrp: 12,
      sellingPrice: 12,
      purchasePrice: 8,
      stock: 5,
      lowStockAlert: 20,
      unit: "Packet",
    },
    {
      id: "3",
      name: "Fortune Oil 1L",
      barcode: "8901234567892",
      mrp: 185,
      sellingPrice: 185,
      purchasePrice: 165,
      stock: 28,
      lowStockAlert: 15,
      unit: "Litre",
    },
    {
      id: "4",
      name: "Balaji Chips",
      barcode: "8901234567893",
      mrp: 5,
      sellingPrice: 5,
      purchasePrice: 3,
      stock: 98,
      lowStockAlert: 10,
      unit: "Packet",
    },
    {
      id: "5",
      name: "Maggi Noodles",
      barcode: "8901234567894",
      mrp: 15,
      sellingPrice: 15,
      purchasePrice: 12,
      stock: 0,
      lowStockAlert: 10,
      unit: "Packet",
    },
    {
      id: "6",
      name: "Surf Excel",
      barcode: "8901234567895",
      mrp: 60,
      sellingPrice: 60,
      purchasePrice: 30,
      stock: 76,
      lowStockAlert: 10,
      unit: "Packet",
    },
  ]);

  const [showHistory, setShowHistory] = useState(false);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    barcode: "",
    mrp: 0,
    sellingPrice: 0,
    purchasePrice: 0,
    stock: 0,
    lowStockAlert: 10,
    unit: "pcs",
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockAlert);

  // Calculate summary statistics
  const totalItems = products.length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.stock * p.sellingPrice), 0);
  const totalProfit = products.reduce((sum, p) => sum + (p.stock * (p.sellingPrice - p.purchasePrice)), 0);

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return "out";
    if (product.stock <= product.lowStockAlert) return "low";
    return "good";
  };

  const getStockColor = (status: string) => {
    if (status === "out") return "border-red-500";
    if (status === "low") return "border-orange-500";
    return "border-green-500";
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.barcode) {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          ...newProduct,
        },
      ]);
      setNewProduct({
        name: "",
        barcode: "",
        mrp: 0,
        sellingPrice: 0,
        purchasePrice: 0,
        stock: 0,
        lowStockAlert: 10,
        unit: "pcs",
      });
      setShowAddProduct(false);
    }
  };

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[32px] font-bold text-[#223960]">Inventory</h2>
            <p className="text-sm text-[#8A8080]">{products.length} products</p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-[#D9D9D9]/24 text-[#8A8080] px-4 py-2 rounded-md flex items-center gap-2 border border-transparent hover:border-[#223960]"
          >
            <span className="text-sm">History</span>
            <History className="w-3 h-3" />
          </button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8080]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products......"
            className="w-full bg-[#D9D9D9]/24 rounded-xl pl-10 pr-4 py-3 text-[#223960] placeholder:text-[#8A8080] outline-none"
          />
        </div>

        {/* Summary Cards */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 bg-[#CEDFFD]/24 border border-[#223960] rounded-md px-3 py-2">
            <p className="text-[10px] font-medium text-[#223960] text-center leading-tight">
              Total items: {totalItems}.00
            </p>
          </div>
          <div className="flex-1 bg-[#FFAE75]/24 border border-[#FF6900] rounded-md px-3 py-2">
            <p className="text-[10px] font-medium text-[#223960] text-center leading-tight">
              Value of stock: {totalStockValue.toLocaleString()}
            </p>
          </div>
          <div className="flex-1 bg-[#E5FFF5]/24 border border-[#00C479] rounded-md px-3 py-2">
            <p className="text-[10px] font-medium text-[#223960] text-center leading-tight">
              Profit of stock: {totalProfit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Add Product Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-[#223960] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <span className="text-sm font-bold">+Add</span>
          </button>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => {
            const status = getStockStatus(product);
            const borderColor = getStockColor(status);

            return (
              <motion.div
                key={product.id}
                layout
                className={`bg-white rounded-2xl p-4 border-2 ${borderColor}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-[20px] font-semibold text-[#223960] mb-1">{product.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="text-[#1FABEA] p-1">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-[#D43500] p-1">
                      <Trash2 className="w-3 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-3">
                  <button className="bg-[#00C479] text-white px-5 py-2 rounded-lg text-sm font-bold">
                    Sell
                  </button>
                  <button className="bg-[#F6F6F6] text-[#8A8080] px-5 py-2 rounded-lg text-sm flex items-center gap-2">
                    <span>Qty</span>
                    <div className="flex flex-col">
                      <ChevronUp className="w-3 h-3 -mb-1" />
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>
                  {status === "out" ? (
                    <div className="bg-[#F42018] text-white px-4 py-2 rounded-lg text-xs font-bold">
                      OUT OF STOCK
                    </div>
                  ) : status === "low" ? (
                    <div className="bg-[#FFD6BA] text-[#FF6900] px-5 py-2 rounded-lg text-sm font-bold">
                      Low
                    </div>
                  ) : (
                    <button className="bg-[#FF6900] text-white px-5 py-2 rounded-lg text-sm font-bold">
                      + Stock
                    </button>
                  )}
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-4 gap-2 text-sm text-[#8A8080]">
                  <div>
                    <p className="leading-tight">MRP ₹{product.mrp}</p>
                  </div>
                  <div>
                    <p className="leading-tight">Purchase ₹{product.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="leading-tight">Profit/unit ₹{product.sellingPrice - product.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="leading-tight">Stock {product.stock} {product.unit}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inventory History Modal */}
      <AnimatePresence>
        {showHistory && (
          <InventoryHistory
            onClose={() => setShowHistory(false)}
            activeScreen={activeScreen}
            onNavigate={onNavigate}
          />
        )}
      </AnimatePresence>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
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
              className="bg-white rounded-t-3xl p-6 w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-foreground">Add New Product</h3>
                <button onClick={() => setShowAddProduct(false)} className="text-muted-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g., Tata Salt 1kg"
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Barcode Number *</label>
                  <input
                    type="text"
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                    placeholder="8901234567890"
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">MRP</label>
                    <input
                      type="number"
                      value={newProduct.mrp || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, mrp: Number(e.target.value) })}
                      placeholder="0"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Selling Price</label>
                    <input
                      type="number"
                      value={newProduct.sellingPrice || ""}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, sellingPrice: Number(e.target.value) })
                      }
                      placeholder="0"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Purchase Price</label>
                    <input
                      type="number"
                      value={newProduct.purchasePrice || ""}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, purchasePrice: Number(e.target.value) })
                      }
                      placeholder="0"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct.stock || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      placeholder="0"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Unit</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilogram</option>
                      <option value="litre">Litre</option>
                      <option value="gm">Gram</option>
                      <option value="ml">Millilitre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Low Stock Alert</label>
                    <input
                      type="number"
                      value={newProduct.lowStockAlert}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, lowStockAlert: Number(e.target.value) })
                      }
                      placeholder="10"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.barcode}
                  className="w-full bg-primary text-white py-4 rounded-xl font-medium disabled:opacity-50"
                >
                  Add Product
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
