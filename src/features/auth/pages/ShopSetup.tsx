import { useState } from "react";
import { useGstVerify } from "@/hooks";
import { motion } from "motion/react";
import { Store, Upload, Check } from "lucide-react";

export default function ShopSetup({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");
  const [phone, setPhone] = useState("");

  const { status: gstStatus, message: gstMessage } = useGstVerify(gst);

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-border text-muted-foreground'}`}>
            {step > 1 ? <Check className="w-5 h-5" /> : "1"}
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-border text-muted-foreground'}`}>
            2
          </div>
        </div>
        <h2 className="text-3xl text-foreground">
          {step === 1 ? "Shop Details" : "Upload Logo"}
        </h2>
        <p className="text-muted-foreground mt-2">
          {step === 1 ? "Let's set up your shop profile" : "Add your shop logo (optional)"}
        </p>
      </div>

      <div className="flex-1">
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <div>
              <label className="block text-foreground mb-2">Shop Name *</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g., Sharma Kirana Store"
                className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-foreground mb-2">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter contact number"
                className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-foreground mb-2">Address *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shop address"
                rows={3}
                className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-foreground mb-2">GST Number (Optional)</label>
              <input
                type="text"
                value={gst}
                onChange={(e) => setGst(e.target.value.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                style={{
                  borderColor:
                    gstStatus === 'valid' ? '#22c55e' :
                    gstStatus === 'invalid' ? '#ef4444' :
                    undefined,
                }}
                className="w-full bg-white border-2 rounded-xl px-4 py-3 text-foreground outline-none transition-colors"
              />
              {gstMessage && (
                <span
                  style={{
                    color:
                      gstStatus === 'valid' ? '#22c55e' :
                      gstStatus === 'checking' ? '#94a3b8' :
                      '#ef4444',
                    fontSize: 12,
                    marginTop: 4,
                    display: 'block',
                  }}
                >
                  {gstMessage}
                </span>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground mb-1">Click to upload logo</p>
              <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>

            <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{shopName || "Your Shop Name"}</div>
                <div className="text-sm text-muted-foreground">{address || "Address"}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={step === 1 && (!shopName || !phone || !address)}
        className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {step === 1 ? "Continue" : "Complete Setup"}
      </button>
    </div>
  );
}
