import { motion } from "motion/react";
import { Store, Receipt, PackageCheck, Users, TrendingUp, Shield } from "lucide-react";

export default function WelcomeScreen({
  onGetStarted,
  onSkipDemo = onGetStarted,
}: {
  onGetStarted: () => void;
  onSkipDemo?: () => void;
}) {
  const features = [
    { icon: Receipt, text: "Fast Billing" },
    { icon: PackageCheck, text: "Inventory" },
    { icon: Users, text: "Customer Khata" },
    { icon: TrendingUp, text: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 text-white px-6 py-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl mb-6">
          <Store className="w-16 h-16" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl mb-3">Welcome to Kirana</h1>
        <p className="text-white/80 text-lg mb-12 max-w-sm">
          Transform your shop with smart billing, inventory management, and powerful analytics
        </p>

        <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-sm">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2"
            >
              <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              <span className="text-sm">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
          <Shield className="w-4 h-4" />
          <span>Secure & Trusted by 10,000+ Shops</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onGetStarted}
        className="w-full bg-white text-primary py-4 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-shadow"
      >
        Get Started
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onSkipDemo}
        className="text-white/40 text-xs mt-3 hover:text-white/60 transition-colors"
      >
        Skip to Demo →
      </motion.button>
    </div>
  );
}
