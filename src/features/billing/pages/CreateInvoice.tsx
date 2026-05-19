import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Plus, Trash2, Printer } from "lucide-react";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  rate: string;
  tax: string;
}

interface CreateInvoiceProps {
  onClose: () => void;
  onGenerate: (invoice: InvoiceData) => void;
  invoiceNo?: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  customer: string;
  phone: string;
  email: string;
  items: InvoiceItem[];
  discountPct: string;
  discountAmt: string;
  taxPct: string;
  taxAmt: string;
  paymentType: string;
  total: number;
  subtotal: number;
}

const PAYMENT_TYPES = ["Cash", "UPI", "Card", "Credit"];
const UNITS = ["pcs", "kg", "g", "litre", "ml", "dozen", "packet", "box"];
const TAX_OPTIONS = ["None", "5%", "12%", "18%", "28%"];

function genId() {
  return Math.random().toString(36).slice(2, 8);
}

export default function CreateInvoice({
  onClose,
  onGenerate,
  invoiceNo = "1003",
}: CreateInvoiceProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: genId(), name: "", quantity: "", unit: "pcs", rate: "", tax: "None" },
  ]);
  const [discountPct, setDiscountPct] = useState("0.00");
  const [discountAmt, setDiscountAmt] = useState("0.00");
  const [taxPct, setTaxPct] = useState("0.00");
  const [taxAmt, setTaxAmt] = useState("0.00");
  const [paymentType, setPaymentType] = useState("UPI");
  const [showPaymentDrop, setShowPaymentDrop] = useState(false);
  const [showTaxDrop, setShowTaxDrop] = useState(false);

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: genId(), name: "", quantity: "", unit: "pcs", rate: "", tax: "None" },
    ]);

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setItemField = (id: string, field: keyof InvoiceItem, value: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const discountValue = parseFloat(discountAmt) || (subtotal * (parseFloat(discountPct) / 100)) || 0;
  const taxValue = parseFloat(taxAmt) || (subtotal * (parseFloat(taxPct) / 100)) || 0;
  const total = Math.max(0, subtotal - discountValue + taxValue);

  const handleGenerate = () => {
    onGenerate({
      invoiceNo,
      date: today,
      customer,
      phone,
      email,
      items,
      discountPct,
      discountAmt,
      taxPct,
      taxAmt,
      paymentType,
      total,
      subtotal,
    });
  };

  // ─── Shared input style ───────────────────────────────────────────────────
  const inputStyle = (hasValue: boolean): React.CSSProperties => ({
    background: "#FFFFFF",
    border: "0.5px solid #8A8080",
    borderRadius: 3,
    height: 29,
    padding: "0 10px",
    fontSize: 10,
    fontFamily: "'Lato', sans-serif",
    color: hasValue ? "#223960" : "#8A8080",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    color: "#8A8080",
    fontFamily: "'Lato', sans-serif",
    marginBottom: 2,
    display: "block",
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 10,
    color: "#223960",
    fontFamily: "'Lato', sans-serif",
    marginBottom: 8,
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#FFFFFF",
        zIndex: 100,
        overflowY: "auto",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      {/* ── Top Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 14px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={18} color="#223960" strokeWidth={2.5} />
          </button>
          <span style={{ fontSize: 14, color: "#223960" }}>Create Invoice</span>
        </div>
      </div>

      {/* ── Top border ── */}
      <div style={{ height: 1, background: "#8A8080", margin: "10px 0 0" }} />

      {/* ── Invoice meta bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 25px",
          borderBottom: "1px solid #8A8080",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: "#8A8080" }}>Invoice No: #{invoiceNo}</span>
          <div style={{ width: 1, height: 16, background: "#8A8080", margin: "0 8px" }} />
        </div>
        <span style={{ fontSize: 10, color: "#8A8080" }}>Date: {today}</span>
      </div>

      {/* ── Blue accent band ── */}
      <div style={{ height: 6, background: "#D4F4FF" }} />

      {/* ── Form body ── */}
      <div style={{ padding: "14px 25px 120px" }}>

        {/* Customer Details */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Customer</label>
            <input
              type="text"
              placeholder="Customer name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              style={inputStyle(!!customer)}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle(!!phone)}
            />
          </div>
          <div>
            <label style={labelStyle}>Email id (Optional)</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle(!!email)}
            />
          </div>
        </div>

        {/* ── Blue accent band ── */}
        <div style={{ height: 6, background: "#D4F4FF", margin: "0 -25px 14px" }} />

        {/* Items */}
        <p style={sectionLabel}>Add Items details</p>
        {items.map((item, idx) => (
          <div
            key={item.id}
            style={{
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: idx < items.length - 1 ? "0.5px solid #E4E3E3" : "none",
            }}
          >
            {/* Item Name */}
            <div style={{ marginBottom: 6 }}>
              <label style={labelStyle}>Items Name</label>
              <input
                type="text"
                placeholder="e.g. Tata Salt 1kg"
                value={item.name}
                onChange={(e) => setItemField(item.id, "name", e.target.value)}
                style={inputStyle(!!item.name)}
              />
            </div>

            {/* Qty + Unit row */}
            <div style={{ display: "flex", gap: 22, marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  value={item.quantity}
                  onChange={(e) => setItemField(item.id, "quantity", e.target.value)}
                  style={{ ...inputStyle(!!item.quantity) }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Unit</label>
                <select
                  value={item.unit}
                  onChange={(e) => setItemField(item.id, "unit", e.target.value)}
                  style={{
                    ...inputStyle(true),
                    appearance: "none",
                    paddingRight: 24,
                    cursor: "pointer",
                  }}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate + Tax row */}
            <div style={{ display: "flex", gap: 22, marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Rate (Price/Unit)</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 10,
                      color: "#8A8080",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={item.rate}
                    onChange={(e) => setItemField(item.id, "rate", e.target.value)}
                    style={{ ...inputStyle(!!item.rate), paddingLeft: 18 }}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Tax</label>
                <select
                  value={item.tax}
                  onChange={(e) => setItemField(item.id, "tax", e.target.value)}
                  style={{ ...inputStyle(true), cursor: "pointer" }}
                >
                  {TAX_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Remove button (not for first item) */}
            {idx > 0 && (
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#FF6900",
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 0,
                }}
              >
                <Trash2 size={12} />
                Remove item
              </button>
            )}
          </div>
        ))}

        {/* Add Item button */}
        <button
          onClick={addItem}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "1px dashed #223960",
            borderRadius: 3,
            padding: "5px 14px",
            fontSize: 10,
            color: "#223960",
            cursor: "pointer",
            marginBottom: 14,
          }}
        >
          <Plus size={12} />
          Add Item
        </button>

        {/* ── Blue accent band ── */}
        <div style={{ height: 6, background: "#D4F4FF", margin: "0 -25px 14px" }} />

        {/* Totals & Taxes */}
        <p style={sectionLabel}>Totals & Taxes (Optional)</p>

        {/* Subtotal row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <label style={{ ...labelStyle, color: "#8A8080", marginBottom: 0 }}>
            Subtotal (Rate × Qty)
          </label>
          <span style={{ fontSize: 10, color: "#8A8080" }}>
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0, minWidth: 50 }}>Discount</label>
          <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
            {/* % field */}
            <div style={{ position: "relative", width: 77 }}>
              <input
                type="number"
                value={discountPct}
                onChange={(e) => { setDiscountPct(e.target.value); setDiscountAmt(""); }}
                style={{
                  ...inputStyle(true),
                  height: 21,
                  paddingRight: 22,
                  fontSize: 10,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  right: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 10,
                  color: "#FF6900",
                  pointerEvents: "none",
                }}
              >
                %
              </span>
            </div>
            {/* ₹ field */}
            <div style={{ position: "relative", width: 77 }}>
              <span
                style={{
                  position: "absolute",
                  left: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 10,
                  color: "#223960",
                  pointerEvents: "none",
                }}
              >
                ₹
              </span>
              <input
                type="number"
                value={discountAmt}
                onChange={(e) => { setDiscountAmt(e.target.value); setDiscountPct(""); }}
                style={{
                  ...inputStyle(true),
                  height: 21,
                  paddingLeft: 16,
                  fontSize: 10,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tax row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0, minWidth: 50 }}>Tax %</label>
          <div style={{ display: "flex", gap: 4, marginLeft: "auto", alignItems: "center" }}>
            {/* Tax dropdown */}
            <div style={{ position: "relative", width: 77 }}>
              <select
                value={taxPct}
                onChange={(e) => setTaxPct(e.target.value)}
                style={{
                  ...inputStyle(true),
                  height: 21,
                  appearance: "none",
                  cursor: "pointer",
                  fontSize: 10,
                }}
              >
                <option value="0">None</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
            {/* Tax ₹ amount */}
            <div style={{ position: "relative", width: 77 }}>
              <span
                style={{
                  position: "absolute",
                  left: 6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 10,
                  color: "#223960",
                  pointerEvents: "none",
                }}
              >
                ₹
              </span>
              <input
                type="number"
                value={taxAmt}
                onChange={(e) => setTaxAmt(e.target.value)}
                style={{
                  ...inputStyle(true),
                  height: 21,
                  paddingLeft: 16,
                  fontSize: 10,
                }}
              />
            </div>
          </div>
        </div>

        {/* Payment Type row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0, flex: 1 }}>Payment Type</label>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowPaymentDrop((v) => !v)}
              style={{
                width: 60,
                height: 21,
                background: "#F1F5F9",
                borderRadius: 3,
                border: "none",
                fontSize: 10,
                color: "#223960",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              <span>{paymentType}</span>
              <span style={{ fontSize: 7, color: "#223960" }}>▼</span>
            </button>
            {showPaymentDrop && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 23,
                  background: "#fff",
                  border: "0.5px solid #8A8080",
                  borderRadius: 4,
                  zIndex: 10,
                  minWidth: 80,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                {PAYMENT_TYPES.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => { setPaymentType(pt); setShowPaymentDrop(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "7px 10px",
                      fontSize: 10,
                      color: pt === paymentType ? "#FF6900" : "#223960",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: pt === paymentType ? 700 : 400,
                    }}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Total Amount band ── */}
        <div
          style={{
            background: "#F1F5F9",
            margin: "0 -25px",
            padding: "5px 25px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 10, color: "#223960" }}>Total Amount</span>
          <span style={{ fontSize: 10, color: "#223960" }}>
            ₹{total.toFixed(2)}
          </span>
        </div>

        {/* ── Line before action buttons ── */}
        <div
          style={{
            height: "0.5px",
            background: "#8A8080",
            margin: "0 -25px 14px",
          }}
        />

        {/* Action buttons: New | Save | Print icon */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={onClose}
            style={{
              height: 21,
              padding: "0 12px",
              background: "#F1F5F9",
              borderRadius: 3,
              border: "none",
              fontSize: 10,
              color: "#223960",
              cursor: "pointer",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            New
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleGenerate}
            style={{
              height: 21,
              padding: "0 12px",
              background: "#223960",
              borderRadius: 3,
              border: "none",
              fontSize: 10,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
            }}
          >
            Save
          </motion.button>
          <button
            style={{
              height: 21,
              width: 28,
              background: "#FFE8D7",
              borderRadius: 3,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Printer size={13} color="#FF6900" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
