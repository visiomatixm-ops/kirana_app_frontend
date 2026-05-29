import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Calendar, Download, FileText } from "lucide-react";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function ReportsScreen() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("weekly");

  const revenueData = [
    { label: "Week 1", revenue: 18500, profit: 4200 },
    { label: "Week 2", revenue: 22100, profit: 5100 },
    { label: "Week 3", revenue: 19800, profit: 4600 },
    { label: "Week 4", revenue: 26200, profit: 6100 },
  ];

  const topProducts = [
    { name: "Tata Salt 1kg", units: 456, revenue: 9120 },
    { name: "Parle-G Biscuit", units: 623, revenue: 6230 },
    { name: "Fortune Oil 1L", units: 189, revenue: 34020 },
    { name: "Amul Milk 500ml", units: 342, revenue: 9576 },
    { name: "Maggi Noodles", units: 298, revenue: 4172 },
  ];

  const stats = [
    { label: "Total Revenue", value: "₹1,86,450", period: "This Month" },
    { label: "Total Profit", value: "₹42,180", period: "This Month" },
    { label: "Total Bills", value: "892", period: "This Month" },
    { label: "Avg. Bill Value", value: "₹209", period: "This Month" },
  ];

  return (
    <div className="page-container bg-background" style={{ height: "100dvh" }}>
      {/* ── Sticky Header ── */}
      <div className="flex-shrink-0 bg-white border-b border-border px-6 py-4 z-10">
        <h2 className="text-xl text-foreground mb-3">Reports & Analytics</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scroll-hidden">
          {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                period === p
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div
        className="scroll-area scroll-touch flex-1"
        style={{ paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
      >
      <div className="px-6 py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-border"
            >
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-accent flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.period}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 border border-border mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground">Revenue & Profit</h3>
              <p className="text-xs text-muted-foreground">Weekly comparison</p>
            </div>
            <button className="text-secondary text-sm flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">Profit</span>
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 border border-border mb-4"
        >
          <h3 className="text-foreground mb-4">Best Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.units} units sold</p>
                </div>
                <p className="text-sm text-foreground font-medium">₹{product.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Customer Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 border border-border mb-4"
        >
          <h3 className="text-foreground mb-4">Customer Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <span className="text-sm text-foreground">Total Customers</span>
              <span className="text-lg text-foreground font-medium">234</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <span className="text-sm text-foreground">Repeat Customers</span>
              <span className="text-lg text-accent font-medium">156</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <span className="text-sm text-foreground">Credit Customers</span>
              <span className="text-lg text-orange-500 font-medium">18</span>
            </div>
          </div>
        </motion.div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-5 text-white"
        >
          <div className="flex items-start gap-3 mb-4">
            <FileText className="w-6 h-6" />
            <div className="flex-1">
              <h3 className="mb-1">Download Reports</h3>
              <p className="text-sm text-white/80">Export your data for tax filing and analysis</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm hover:bg-white/30 transition-colors">
              PDF Report
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm py-2 rounded-xl text-sm hover:bg-white/30 transition-colors">
              Excel Sheet
            </button>
          </div>
        </motion.div>
      </div>
      {/* ── end scroll-area ── */}
      </div>
    </div>
  );
}
