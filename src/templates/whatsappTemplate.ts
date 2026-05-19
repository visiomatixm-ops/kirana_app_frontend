import type { Bill, Shop } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';

/**
 * Generates a WhatsApp-friendly plain text bill message.
 */
export function generateWhatsAppBillMessage(bill: Bill, shop: Shop): string {
  const itemLines = bill.items
    .map((item) => `• ${item.name} × ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`)
    .join('\n');

  const lines = [
    `🧾 *${shop.name}*`,
    shop.address,
    `📞 ${shop.phone}`,
    '',
    `Bill No: *${bill.billNumber}*`,
    `Date: ${formatDate(bill.createdAt)}`,
    '',
    '*Items:*',
    itemLines,
    '',
    `Subtotal: ${formatCurrency(bill.subtotal)}`,
    bill.discount > 0 ? `Discount: -${formatCurrency(bill.discount)}` : null,
    `*Total: ${formatCurrency(bill.total)}*`,
    `Payment: ${bill.paymentMethod.toUpperCase()}`,
    '',
    '_Thank you for shopping with us!_ 🙏',
  ]
    .filter((line) => line !== null)
    .join('\n');

  return lines;
}

/**
 * Opens WhatsApp with a pre-filled bill message for a customer's phone number.
 */
export function shareViaWhatsApp(bill: Bill, shop: Shop, phone?: string): void {
  const message = generateWhatsAppBillMessage(bill, shop);
  const encoded = encodeURIComponent(message);
  const url = phone
    ? `https://wa.me/91${phone}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
  window.open(url, '_blank');
}
