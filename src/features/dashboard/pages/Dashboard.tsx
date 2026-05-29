import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Receipt,
  IndianRupee,
  AlertCircle,
  Package,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{display.toLocaleString("en-IN")}{suffix}</span>;
}

// ── Card stagger variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 28 } },
};

export default function Dashboard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const salesData = [
    { day: "Mon", sales: 4200 },
    { day: "Tue", sales: 5100 },
    { day: "Wed", sales: 3800 },
    { day: "Thu", sales: 6200 },
    { day: "Fri", sales: 5500 },
    { day: "Sat", sales: 8100 },
    { day: "Sun", sales: 7200 },
  ];

  const categoryData = [
    { name: "Groceries", value: 42, color: "#0EA5E9" },
    { name: "Snacks", value: 28, color: "#10B981" },
    { name: "Beverages", value: 18, color: "#f59e0b" },
    { name: "Others", value: 12, color: "#8b5cf6" },
  ];

  const topProducts = [
    { name: "Tata Salt 1kg", sold: 156, revenue: 3120 },
    { name: "Parle-G Biscuit", sold: 243, revenue: 2430 },
    { name: "Fortune Oil 1L", sold: 89, revenue: 7120 },
  ];

  const stats = [
    { label: "Today's Sales", numValue: 7240, prefix: "₹", change: "+12%", icon: TrendingUp, color: "bg-accent", positive: true },
    { label: "Total Bills",    numValue: 48,   prefix: "",  change: "+8",   icon: Receipt,    color: "bg-secondary", positive: true },
    { label: "Profit",         numValue: 2180, prefix: "₹", change: "+15%", icon: IndianRupee,color: "bg-accent", positive: true },
    { label: "Credit Due",     numValue: 12450,prefix: "₹", change: "5 customers", icon: AlertCircle, color: "bg-orange-500", positive: false },
  ];

  return (
    <div
      className="scroll-area scroll-touch bg-background"
      style={{ height: "100dvh", paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h2 className="text-2xl">Sharma Kirana Store</h2>
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-white/80 text-sm mb-1">Total Revenue (This Month)</p>
          <h3 className="text-3xl mb-2">₹1,86,450</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>18% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Quick Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(34,57,96,0.10)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 440, damping: 28 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border"
              style={{ cursor: "pointer" }}
            >
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
              <p className="text-xl text-foreground mb-1">
                <AnimatedCounter value={stat.numValue} prefix={stat.prefix} />
              </p>
              <p className="text-xs text-accent">{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-border mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground">Weekly Sales</h3>
              <p className="text-xs text-muted-foreground">Last 7 days performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#0EA5E9"
                strokeWidth={3}
                dot={{ fill: "#0EA5E9", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-border mb-4"
        >
          <h3 className="text-foreground mb-4">Sales by Category</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-border mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">Top Selling Products</h3>
            <button
              onClick={() => onNavigate("inventory")}
              className="text-secondary text-sm flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sold} units sold</p>
                  </div>
                </div>
                <p className="text-sm text-foreground">₹{product.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-5 text-white mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1">Low Stock Alert</h3>
              <p className="text-sm text-white/80">8 products running low</p>
            </div>
            <button
              onClick={() => onNavigate("inventory")}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors"
            >
              View
            </button>
          </div>
        </motion.div>

        {/* View Reports */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => onNavigate("reports")}
          className="w-full bg-white border border-border rounded-2xl p-5 text-left mb-4 hover:border-primary transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground">View Detailed Reports</h3>
                <p className="text-sm text-muted-foreground">Analytics & insights</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
