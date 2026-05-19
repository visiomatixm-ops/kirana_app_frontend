import { motion } from "motion/react";
import { Printer, Share2, Plus } from "lucide-react";
import type { InvoiceData } from "./CreateInvoice";

interface InvoiceOutputProps {
  invoice: InvoiceData;
  shopName?: string;
  shopAddress?: string;
  shopPhone?: string;
  gstin?: string;
  onNewBill: () => void;
  onClose: () => void;
}

/** Convert number to words (Indian style, simplified) */
function numberToWords(n: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const toWords = (num: number): string => {
    if (num === 0) return "Zero";
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " and " + toWords(num % 100) : "");
    if (num < 100000) return toWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + toWords(num % 1000) : "");
    return toWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + toWords(num % 100000) : "");
  };
  const paisa = Math.round((n % 1) * 100);
  const rupees = Math.floor(n);
  return toWords(rupees) + " Rupees" + (paisa > 0 ? " and " + toWords(paisa) + " Paisa" : "") + " only";
}

export default function InvoiceOutput({
  invoice,
  shopName = "Sharma Kirana Store",
  shopAddress = "12, Gandhi Nagar, Mumbai - 400001",
  shopPhone = "+91 71935 19765",
  gstin = "GTS:22AAAAA0000A1Z5",
  onNewBill,
  onClose,
}: InvoiceOutputProps) {
  const profit = invoice.subtotal * 0.2; // estimated 20% margin
  const discountValue = parseFloat(invoice.discountAmt) || (invoice.subtotal * (parseFloat(invoice.discountPct) / 100)) || 0;

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-print-area");
    if (!printContent) return;
    const w = window.open("", "_blank", "width=500,height=800");
    if (!w) return;
    w.document.write(`<html><head><style>
      body { font-family: Lato, sans-serif; margin: 0; padding: 16px; color: #223960; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #223960; color: white; font-size: 8px; padding: 4px 6px; text-align: left; }
      td { font-size: 8px; padding: 3px 6px; border-bottom: 0.5px solid #ddd; }
      .total-row { background: #223960; color: white; }
    </style></head><body>${printContent.innerHTML}</body></html>`);
    w.document.close();
    w.print();
    w.close();
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
      <div style={{ padding: "30px 26px 120px" }}>

        {/* ── Title ── */}
        <h2
          style={{
            fontWeight: 700,
            fontSize: 32,
            lineHeight: "38px",
            color: "#223960",
            marginBottom: 8,
          }}
        >
          Bill's
        </h2>

        {/* ── Invoice printable area ── */}
        <div
          id="invoice-print-area"
          style={{
            background: "#fff",
            border: "0.5px solid #ddd",
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 16,
          }}
        >
          {/* Invoice header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <div>
              <p style={{ fontWeight: 600, fontSize: 11, lineHeight: "16px", color: "#223960", margin: 0 }}>
                {shopName}
              </p>
              <p style={{ fontSize: 10, color: "#223960", margin: "2px 0 0" }}>
                Name: {shopName}
              </p>
              <p style={{ fontSize: 10, color: "#223960", margin: "1px 0 0" }}>
                Phone no.: {shopPhone}
              </p>
            </div>

            {/* Shop logo box */}
            <div
              style={{
                width: 43,
                height: 43,
                background: "#223960",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 600, textAlign: "center", lineHeight: "13px" }}>
                Shop<br />Logo
              </span>
            </div>
          </div>

          {/* Blue divider */}
          <div style={{ height: 1, background: "#223960", marginBottom: 6 }} />

          {/* Bill to / Invoice details */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <p style={{ fontSize: 8, color: "#223960", margin: 0, fontWeight: 400 }}>
                Bill To
              </p>
              <p style={{ fontSize: 8, color: "#223960", margin: "1px 0 0" }}>
                {invoice.customer || "Walk-in Customer"}
              </p>
              {invoice.phone && (
                <p style={{ fontSize: 8, color: "#223960", margin: "1px 0 0" }}>
                  Phone no: {invoice.phone}
                </p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 8, color: "#223960", margin: 0, fontWeight: 800 }}>
                Invoice Details
              </p>
              <p style={{ fontSize: 8, color: "#223960", margin: "1px 0 0" }}>
                Invoice No: #{invoice.invoiceNo}
              </p>
              <p style={{ fontSize: 8, color: "#223960", margin: "1px 0 0" }}>
                Date: {invoice.date}
              </p>
              <p style={{ fontSize: 8, color: "#223960", margin: "1px 0 0", fontWeight: 600 }}>
                Invoice
              </p>
            </div>
          </div>

          {/* Items table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 6 }}>
            <thead>
              <tr style={{ background: "#223960" }}>
                {["#", "Item Name", "HSN/SAC", "Qty", "Unit", "Price/Unit", "Discount", "Amount"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "4px 4px",
                        fontSize: 8,
                        color: "#FFFFFF",
                        fontWeight: 400,
                        textAlign: "left",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {invoice.items
                .filter((item) => item.name)
                .map((item, idx) => {
                  const qty = parseFloat(item.quantity) || 0;
                  const rate = parseFloat(item.rate) || 0;
                  const itemTotal = qty * rate;
                  return (
                    <tr key={item.id} style={{ borderBottom: "0.5px solid #E4E3E3" }}>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>{idx + 1}</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>{item.name}</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>—</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>{item.quantity}</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>{item.unit}</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>₹{rate.toFixed(2)}</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>—</td>
                      <td style={{ fontSize: 8, padding: "4px", color: "#223960" }}>₹{itemTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* ── Divider ── */}
          <div style={{ height: "0.5px", background: "#8A8080", marginBottom: 6 }} />

          {/* Totals + invoice summary */}
          <div style={{ display: "flex", gap: 20 }}>
            {/* Left: amount in words */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 8, color: "#223960", marginBottom: 2, fontWeight: 400 }}>
                Invoice Amount In Words
              </p>
              <p style={{ fontSize: 6, color: "#223960", marginBottom: 8, lineHeight: "9px" }}>
                {numberToWords(invoice.total)}
              </p>
              <p style={{ fontSize: 8, color: "#223960", marginBottom: 2 }}>Terms And Conditions</p>
              <p style={{ fontSize: 6, color: "#223960", lineHeight: "9px" }}>
                Thank you for doing business with us.
              </p>
            </div>

            {/* Right: summary table */}
            <div style={{ minWidth: 160 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: "#223960" }}>Sub Total</span>
                <span style={{ fontSize: 8, color: "#223960" }}>₹{invoice.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: "#223960" }}>Discount</span>
                <span style={{ fontSize: 8, color: "#223960" }}>₹{discountValue.toFixed(2)}</span>
              </div>

              {/* Total row - dark background */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#223960",
                  padding: "3px 6px",
                  marginBottom: 3,
                  borderRadius: 2,
                }}
              >
                <span style={{ fontSize: 8, color: "#FFFFFF" }}>Total</span>
                <span style={{ fontSize: 8, color: "#FFFFFF" }}>₹{invoice.total.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: "#223960" }}>Received</span>
                <span style={{ fontSize: 8, color: "#223960" }}>₹{invoice.total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: "#223960" }}>Balance</span>
                <span style={{ fontSize: 8, color: "#223960" }}>₹0.00</span>
              </div>
              <div style={{ height: "0.5px", background: "#8A8080", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: "#223960" }}>You Saved</span>
                <span style={{ fontSize: 8, color: "#223960" }}>₹{discountValue.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: 8, color: "#223960", marginTop: 4 }}>
                For: {shopName}
              </p>
              <div
                style={{
                  height: "0.5px",
                  background: "#8A8080",
                  margin: "6px 0 4px",
                  width: "60%",
                  marginLeft: "auto",
                }}
              />
              <p style={{ fontSize: 8, color: "#223960", textAlign: "right" }}>
                Authorized Signatory
              </p>
            </div>
          </div>
        </div>

        {/* ── Bill Ready label ── */}
        <p
          style={{
            fontWeight: 500,
            fontSize: 16,
            color: "#223960",
            fontFamily: "'Mozilla Headline', 'Lato', sans-serif",
            marginBottom: 6,
          }}
        >
          Invoice #{invoice.invoiceNo} Ready!
        </p>

        {/* Shop name */}
        <p
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "#223960",
            fontFamily: "'Mozilla Headline', 'Lato', sans-serif",
            marginBottom: 4,
          }}
        >
          {shopName}
        </p>
        <p style={{ fontSize: 10, color: "#8A8080", marginBottom: 2 }}>{gstin}</p>
        <p style={{ fontSize: 10, color: "#8A8080", marginBottom: 2 }}>
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p style={{ fontSize: 10, color: "#8A8080", marginBottom: 20 }}>
          Bill No: #{invoice.invoiceNo}
        </p>

        {/* ── Profit banner ── */}
        {profit > 0 && (
          <div
            style={{
              background: "#E5FFF5",
              border: "1px solid #00C479",
              borderRadius: 20,
              padding: "14px 20px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#00C479",
                lineHeight: "18px",
                margin: 0,
              }}
            >
              Profit of ₹{profit.toFixed(2)} was earned from this bill.
            </p>
          </div>
        )}
      </div>

      {/* ── Sticky bottom action buttons ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 26px 24px",
          background: "#fff",
          borderTop: "0.5px solid #E4E3E3",
          display: "flex",
          gap: 16,
        }}
      >
        {/* Print / Download */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePrint}
          style={{
            flex: 1,
            height: 62,
            background: "linear-gradient(97.64deg, #223960 0.23%, #0EA5E9 99.77%)",
            borderRadius: 11,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <Printer size={18} color="#fff" />
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#FFFFFF",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            Print / Download
          </span>
        </motion.button>

        {/* Share via WhatsApp */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const msg = `Invoice #${invoice.invoiceNo} | ${shopName} | Total: ₹${invoice.total.toFixed(2)} | Payment: ${invoice.paymentType}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
          }}
          style={{
            width: 62,
            height: 62,
            background: "#F1F1F1",
            border: "1px solid #ACACAC",
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Share2 size={20} color="#223960" />
        </motion.button>

        {/* New Bill */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNewBill}
          style={{
            width: 62,
            height: 62,
            background: "#F1F1F1",
            border: "1px solid #ACACAC",
            borderRadius: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            cursor: "pointer",
          }}
        >
          <Plus size={16} color="#223960" />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#223960",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            New Bill
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
