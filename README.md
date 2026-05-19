# Kirana Billing App

A premium Progressive Web App (PWA) for Indian kirana stores, grocery shops, and local retailers. Transform any smartphone into a smart billing POS system.

## Features

### ✨ Core Functionality

- **Smart Billing System**
  - Barcode & QR code scanning
  - Manual product search
  - Multiple payment modes (Cash, UPI, Card, Credit/Khata)
  - Auto GST calculation
  - Receipt generation & WhatsApp sharing

- **Inventory Management**
  - Product catalog with barcode tracking
  - Stock quantity monitoring
  - Low stock alerts
  - Auto stock reduction after billing
  - Purchase price, MRP, and selling price tracking

- **Customer Khata Ledger**
  - Credit tracking
  - Payment history
  - WhatsApp reminders
  - Outstanding balance management

- **Analytics & Reports**
  - Daily/Weekly/Monthly/Yearly reports
  - Sales trends with charts
  - Top selling products
  - Profit tracking
  - Category-wise breakdown

- **Premium Dashboard**
  - Real-time sales metrics
  - Interactive charts (Line, Bar, Pie)
  - Quick action buttons
  - Low stock notifications

### 🎯 Subscription Plans

- **Free**: 100 bills/month, basic features
- **Pro (₹199/month)**: Unlimited billing, reports, WhatsApp integration
- **Premium (₹499/month)**: Staff login, GST invoices, advanced analytics

## Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## Getting Started

This is a mobile-first Progressive Web App. It works best on mobile devices but is fully responsive.

### Connecting Supabase Backend

To enable full backend functionality:

1. Open the **Make settings page**
2. Connect your Supabase project
3. Add these environment secrets:
   - `RAZORPAY_KEY_ID` - Your Razorpay API key
   - `RAZORPAY_KEY_SECRET` - Your Razorpay secret

Once connected, you'll get:
- User authentication (OTP, Email, Google)
- Real-time data sync
- Cloud storage for shop logos & product images
- Multi-device support
- Backup & restore

### Current Features (Frontend-Only)

Without Supabase, the app works with:
- Mock data for demonstration
- Full UI/UX experience
- All screens and navigation
- Animations and interactions

Perfect for prototyping, investor demos, or user testing!

## App Structure

```
src/app/
├── App.tsx                    # Main app with routing
├── components/
│   ├── SplashScreen.tsx       # Startup animation
│   ├── WelcomeScreen.tsx      # Onboarding intro
│   ├── LoginScreen.tsx        # Authentication
│   ├── ShopSetup.tsx          # Shop profile setup
│   ├── Dashboard.tsx          # Main analytics dashboard
│   ├── BillingScreen.tsx      # POS billing interface
│   ├── InventoryScreen.tsx    # Product management
│   ├── KhataScreen.tsx        # Customer credit ledger
│   ├── ReportsScreen.tsx      # Analytics & insights
│   ├── SettingsScreen.tsx     # App settings & plans
│   └── BottomNav.tsx          # Mobile navigation
```

## Design System

**Premium Color Palette:**
- Primary: `#1D3458` (Deep Blue)
- Secondary: `#0EA5E9` (Sky Blue)
- Accent: `#10B981` (Emerald Green)
- Background: `#F8FAFC` (Light Gray)

**Typography:**
- Clean, modern sans-serif
- Optimized for readability on small screens

**UI Principles:**
- Mobile-first responsive design
- Smooth 60fps animations
- Generous touch targets (44px minimum)
- High contrast for outdoor visibility
- Skeleton screens for fast perceived loading

## Key Features Highlights

### Barcode Scanner (Simulated)
The app includes UI for barcode/QR scanning. In production with device camera access, integrate with:
- ZXing library
- QuaggaJS
- Or native device camera APIs

### Offline-First Architecture
When Supabase is connected, the app supports:
- Offline billing mode
- Auto-sync when internet returns
- Local data persistence

### PWA Capabilities
The app can be installed on home screen and works like a native app with:
- App-like experience
- Fast loading
- Works offline (with Supabase)

## Future Enhancements

- [ ] Multi-language support (Hindi, Marathi, Gujarati)
- [ ] Voice product search
- [ ] AI reorder suggestions
- [ ] Thermal printer integration (Bluetooth ESC/POS)
- [ ] Staff role management
- [ ] Advanced GST invoice generation
- [ ] Automated backup & restore
- [ ] Dark mode

## Browser Support

- Chrome/Edge (recommended)
- Safari (iOS/macOS)
- Firefox
- Samsung Internet

## License

Proprietary - Built for Indian retail businesses

---

**Made with ❤️ for Indian Retailers**

*Empowering local businesses with smart technology*
