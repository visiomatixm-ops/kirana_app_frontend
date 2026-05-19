import type { Bill, Shop } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { formatDateWithTime } from '@/utils/date';

/**
 * Generates a standalone HTML string for a printable bill.
 * Opens in a new window for the browser's print dialog.
 */
export function generatePrintableBill(bill: Bill, shop: Shop): string {
  const itemRows = bill.items
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0">${item.name}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;text-align:center">${item.quantity}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;text-align:right">${formatCurrency(item.price)}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;text-align:right">${formatCurrency(item.price * item.quantity)}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bill #${bill.billNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 13px; color: #222; background: #fff; padding: 24px; max-width: 400px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 16px; }
    .shop-name { font-size: 18px; font-weight: 700; }
    .shop-meta { font-size: 11px; color: #666; margin-top: 2px; }
    .divider { border: none; border-top: 1px dashed #ccc; margin: 12px 0; }
    .bill-meta { font-size: 11px; color: #555; margin-bottom: 12px; display: flex; justify-content: space-between; }
    table { width: 100%; border-collapse: collapse; }
    th { font-size: 11px; text-transform: uppercase; color: #888; padding: 4px 8px; border-bottom: 2px solid #eee; text-align: left; }
    th:last-child, th:nth-child(3), th:nth-child(2) { text-align: right; }
    .summary-row { display: flex; justify-content: space-between; padding: 3px 0; font-size: 13px; }
    .total-row { font-weight: 700; font-size: 15px; border-top: 2px solid #222; padding-top: 8px; margin-top: 4px; }
    .footer { text-align: center; font-size: 11px; color: #888; margin-top: 20px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="shop-name">${shop.name}</div>
    <div class="shop-meta">${shop.address}</div>
    <div class="shop-meta">${shop.phone}${shop.gstin ? ` | GSTIN: ${shop.gstin}` : ''}</div>
  </div>

  <hr class="divider">

  <div class="bill-meta">
    <span>Bill #${bill.billNumber}</span>
    <span>${formatDateWithTime(bill.createdAt)}</span>
  </div>
  ${bill.customerName ? `<div style="font-size:12px;margin-bottom:8px">Customer: <strong>${bill.customerName}</strong></div>` : ''}

  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th style="text-align:center">Qty</th>
        <th style="text-align:right">Rate</th>
        <th style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <hr class="divider">

  <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(bill.subtotal)}</span></div>
  ${bill.discount > 0 ? `<div class="summary-row"><span>Discount</span><span>-${formatCurrency(bill.discount)}</span></div>` : ''}
  <div class="summary-row total-row"><span>TOTAL</span><span>${formatCurrency(bill.total)}</span></div>
  <div style="font-size:12px;margin-top:6px;color:#555">Payment: ${bill.paymentMethod.toUpperCase()}</div>

  <div class="footer">
    <p>Thank you for shopping with us!</p>
    <p>Powered by Kirana Billing App</p>
  </div>
</body>
</html>`;
}

/**
 * Opens the printable bill HTML in a new window and triggers print.
 */
export function printBill(bill: Bill, shop: Shop): void {
  const html = generatePrintableBill(bill, shop);
  const win = window.open('', '_blank', 'width=480,height=700');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
    win.close();
  }, 300);
}
