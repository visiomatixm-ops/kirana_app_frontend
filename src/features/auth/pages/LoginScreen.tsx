import { useState } from "react";
import { motion } from "motion/react";
import { Store, Mail, Phone, ArrowLeft } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginScreen({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [method, setMethod] = useState<"phone" | "email" | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    prompt: 'select_account',
    onSuccess: (codeResponse) => {
      console.log("Google Login Success:", codeResponse);
      onLogin(); // Trigger original login callback
    },
    onError: () => {
      console.log("Google Login Failed");
    }
  });

  const handleSendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('Generated OTP (for testing):', otp);
    setShowOtp(true);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      onLogin();
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleEmailLogin = () => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    // Direct login without OTP for email
    onLogin();
  };



  if (method === null) {
    return (
      <div className="min-h-screen bg-background px-6 py-12 flex flex-col">
        <button onClick={onBack} className="self-start mb-8 text-muted-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <Store className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Choose your login method</p>
          </div>

          <div className="space-y-3 max-w-sm mx-auto w-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setMethod("phone")}
              className="w-full flex items-center gap-4 bg-white border-2 border-border rounded-2xl px-6 py-4 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Phone Number</div>
                <div className="text-sm text-muted-foreground">Login with OTP</div>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setMethod("email")}
              className="w-full flex items-center gap-4 bg-white border-2 border-border rounded-2xl px-6 py-4 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Email Address</div>
                <div className="text-sm text-muted-foreground">Login with email</div>
              </div>
            </motion.button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">or continue with</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-border rounded-2xl px-6 py-4 hover:border-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-medium text-foreground">Continue with Google</span>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12 flex flex-col">
      <button onClick={() => setMethod(null)} className="self-start mb-8 text-muted-foreground">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-foreground mb-2">
            {method === "phone" ? "Enter Phone Number" : "Enter Email"}
          </h2>
          <p className="text-muted-foreground">
            {showOtp ? "Enter the OTP sent to your number" : "We'll send you a verification code"}
          </p>
        </div>

        {!showOtp ? (
          <div className="space-y-6">
            {method === "phone" ? (
              <div>
                <label className="block text-foreground mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <div className="bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10 digit number"
                    className="flex-1 bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors"
                    maxLength={10}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none transition-colors"
                />
              </div>
            )}


            {method === "email" && (
              <button
                onClick={handleEmailLogin}
                className="w-full bg-secondary text-white py-3 rounded-xl mt-2 font-medium hover:bg-secondary/90 transition-colors"
              >
                Login with Email
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-foreground mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 digit OTP"
                className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground text-center text-2xl tracking-widest focus:border-primary outline-none transition-colors"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Verify & Continue
            </button>

            <button className="w-full text-secondary text-sm">Resend OTP</button>
          </div>
        )}
      </div>
    </div>
  );
}
