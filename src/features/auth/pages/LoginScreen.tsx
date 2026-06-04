import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Store, Mail, Phone, ArrowLeft } from "lucide-react";





import { env } from '@/app/config/env';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginScreen({ onLogin, onBack }: { onLogin: (user: any, token: string) => void; onBack: () => void }) {
  const [method, setMethod] = useState<"phone" | "email" | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] =
  useState<any>(null);
  const otpInputRef = useRef<HTMLInputElement | null>(null);


  // const loginWithGoogle = useGoogleLogin({
  //   prompt: 'select_account',
  //   // We need an id_token for POST http://localhost:3000/api/auth/google (backend verifies it)
  //   flow: 'implicit',
  //   onSuccess: async (codeResponse) => {
  //     try {
  //       const idToken =
          
  //         (codeResponse as any)?.id_token ||
  //         (codeResponse as any)?.idToken ||
  //         (codeResponse as any)?.credential ||
  //         (codeResponse as any)?.code;

  //       if (!idToken || typeof idToken !== 'string') {
  //         alert('Google login failed: missing id token');
  //         return;
  //       }

  //       const res = await fetch('http://localhost:3000/api/auth/google', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ idToken }),
  //       });

  //       const data = await res.json().catch(() => ({}));

  //       if (!res.ok) {
  //         alert(data?.message || 'Google login failed');
  //         return;
  //       }

  //       onLogin();
  //     } catch (err) {
  //       console.error(err);
  //       alert('Google login failed');
  //     }
  //   },
  //   onError: () => {
  //     console.log('Google Login Failed');
  //   },
  // });

  const loginWithGoogle = useGoogleLogin({
    flow: 'implicit',
    prompt: 'select_account',
    onSuccess: async (codeResponse) => {
      console.log('[Google] onSuccess response:', codeResponse);
      try {
        const idToken =
          (codeResponse as any)?.id_token ||
          (codeResponse as any)?.idToken ||
          (codeResponse as any)?.credential ||
          (codeResponse as any)?.code;

        if (!idToken || typeof idToken !== 'string') {
          alert('Google login failed: missing id token');
          return;
        }

        const res = await fetch(`${env.apiBaseUrl}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        let data: any = {};
        try {
          const text = await res.text();
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (!res.ok) {
          alert(data?.message || 'Google login failed');
          return;
        }

        onLogin(data.user, data.token);
      } catch (err) {
        console.error(err);
        alert('Google login failed');
      }
    },
    onError: () => {
      alert('Google Login Failed');
    },
  });

console.log("AUTH =", auth);
console.log("AUTH TYPE =", typeof auth);
console.log("AUTH APP =", auth?.app);
const handleSendOtp = async () => {
  try {

    if (method === "email") {
      const res = await fetch(
        `${env.apiBaseUrl}/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to send OTP");
        return;
      }

      setShowOtp(true);
      return;
    }

    // Phone OTP validation
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (!auth) {
      alert("Firebase is not properly configured. Please check your environment variables.");
      return;
    }

    const phoneNumber = `+91${phone}`;
    console.log("Sending OTP to:", phoneNumber);

    try {
      // No client-side captcha used — skip any Recaptcha cleanup

      // Use a minimal mock ApplicationVerifier to bypass client-side captcha entirely.
      // This relies on server-side or emulator protections; DO NOT use in production.
      // Minimal ApplicationVerifier compatible mock for local/dev only.
      // Implements methods the Firebase SDK calls (e.g. _reset).
      const appVerifier = {
        type: 'recaptcha',
        verify: async () => 'mock-token',
        _reset: () => {},
        clear: () => {},
        render: () => Promise.resolve(),
        getResponse: () => null,
        execute: () => {},
      };

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowOtp(true);
    } catch (recaptchaErr) {
      console.error("OTP send error (client verifier):", recaptchaErr);
      console.error("Auth object at error:", auth);
      throw recaptchaErr;
    }
    
  } catch (err) {
    console.error("OTP send error:", err);
    alert("Failed to send OTP: " + (err as any).message);
  }
};

const handleVerifyOtp = async () => {

  try {

    if (
      method === "phone"
    ) {

      const result =
        await confirmationResult.confirm(
          otp
        );

      const idToken =
        await result.user.getIdToken();

      const res =
        await fetch(
          `${env.apiBaseUrl}/auth/firebase-phone`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              idToken,
            }),
          }
        );

      const data =
        await res.json();

      const authData =
        data.data || data;

      onLogin(
        authData.user,
        authData.token
      );

      return;
    }

    // email OTP

    const res =
      await fetch(
        `${env.apiBaseUrl}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

    const data =
      await res.json();

    const authData =
      data.data || data;

    onLogin(
      authData.user,
      authData.token
    );

  } catch (err) {

    console.error(err);

    alert(
      "OTP verification failed"
    );

  }
};



  useEffect(() => {
    if (showOtp && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showOtp]);



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

            {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
              <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {

      const idToken =
        credentialResponse.credential;

      const res = await fetch(
        `${env.apiBaseUrl}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data?.message ||
          "Google login failed"
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.data.user
        )
      );

      onLogin(
        data.data.user,
        data.data.token
      );

    } catch (err) {
      console.error(err);
      alert(
        "Google login failed"
      );
    }
  }}
  onError={() => {
    alert("Google Login Failed");
  }}
/>
            ) : null}
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
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
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

            <button
              onClick={handleSendOtp}
              className="w-full bg-[#243F6B] text-white py-3 rounded-xl mt-2 font-medium hover:bg-[#1D3458] transition-colors"
            >
              Send OTP
            </button>
             <div id="recaptchacontainer"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-foreground mb-2">Enter OTP</label>
              <input
                type="text"
                ref={otpInputRef}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6 digit OTP"
                className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 text-foreground text-center text-2xl tracking-widest focus:border-primary outline-none transition-colors"
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-[#243F6B] text-white py-4 rounded-xl font-medium hover:bg-[#1D3458] transition-colors"
            >
              Verify & Continue
            </button>

            <button onClick={handleSendOtp} className="w-full text-[#0ea5e9] text-sm">Resend OTP</button>
          </div>
        )}
      </div>
     
    </div>
  );
}

