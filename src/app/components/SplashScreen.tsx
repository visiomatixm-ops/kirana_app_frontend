import { motion } from "motion/react";
import { Store } from "lucide-react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-primary via-primary to-secondary flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1500);
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl mb-6">
          <Store className="w-20 h-20 text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl text-white mb-2">Kirana</h1>
        <p className="text-white/80 text-lg">Smart Billing System</p>
      </motion.div>

      <motion.div
        className="absolute bottom-12 text-white/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Powering Local Businesses
      </motion.div>
    </motion.div>
  );
}
