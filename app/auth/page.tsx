"use client";

import { UserButton, useUser } from "@civic/auth-web3/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { Ticket, Shield, Zap, Check, Loader2 } from "lucide-react";

const userHasWallet = (user: any): boolean => {// eslint-disable-line @typescript-eslint/no-explicit-any
  return user && user.solana && user.solana.address;
};

function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      grid.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(234, 88, 12, 0.4) 0%, transparent 35%),
        linear-gradient(rgba(234, 88, 12, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(234, 88, 12, 0.08) 1px, transparent 1px)
      `;
      grid.style.backgroundSize = `100% 100%, 12px 12px, 12px 12px`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{
        background: `
          linear-gradient(rgba(234, 88, 12, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(234, 88, 12, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "16px 16px",
      }}
    />
  );
}

interface AuthStep {
  id: string;
  text: string;
  icon: React.ReactNode;
  status: 'pending' | 'loading' | 'completed';
}

// Separate component that uses useSearchParams
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [authSteps, setAuthSteps] = useState<AuthStep[]>([
    { id: 'auth', text: 'Authentication successful', icon: <Shield className="h-5 w-5" />, status: 'pending' },
    { id: 'verify', text: 'Identity verified with Civic', icon: <Check className="h-5 w-5" />, status: 'pending' },
    { id: 'wallet', text: 'Wallet created', icon: <Zap className="h-5 w-5" />, status: 'pending' },
    { id: 'redirect', text: 'Redirecting...', icon: <Ticket className="h-5 w-5" />, status: 'pending' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const returnUrl = searchParams.get('returnUrl');

  useEffect(() => {
    const handleAuth = async () => {
      if (!user || isProcessing) return;
  
      setIsProcessing(true);

      try {
        await updateStepStatus('auth', 'loading');
        await delay(800);
        await updateStepStatus('auth', 'completed');

        await updateStepStatus('verify', 'loading');
        await delay(1000);
        await updateStepStatus('verify', 'completed');

        const res = await fetch("/api/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            did: user.id, 
            name: user.displayName || "Anonymous",
          }),
        });

        const data = await res.json();
        setUserRole(data.user.role);

        if (data.user.role === "attendee" && !userHasWallet(user)) {
          await updateStepStatus('wallet', 'loading');
          
          if (user.createWallet && typeof user.createWallet === 'function') {
            await user.createWallet();
          }
          
          await delay(1200);
          await updateStepStatus('wallet', 'completed');
        } else {
          setAuthSteps(prev => prev.filter(step => step.id !== 'wallet'));
        }
        await updateStepStatus('redirect', 'loading');
        await delay(800);
        await updateStepStatus('redirect', 'completed');

        // Final redirect
        await delay(500);
        if (returnUrl) {
          router.push(returnUrl);
        } else if (data.user.role === "organizer") {
          router.push("/dashboard");
        } else {
          router.push("/events");
        }

      } catch (err) {
        console.error("Auth error:", err);
        setIsProcessing(false);
      }
    };

    handleAuth();
  }, [user, router, returnUrl, isProcessing]);

  const updateStepStatus = async (stepId: string, status: 'loading' | 'completed') => {
    setAuthSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getStepIcon = (step: AuthStep) => {
    if (step.status === 'loading') {
      return <Loader2 className="h-5 w-5 animate-spin text-orange-600" />;
    } else if (step.status === 'completed') {
      return <Check className="h-5 w-5 text-green-600" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getRedirectText = () => {
    if (userRole === 'organizer') return 'Redirecting to dashboard...';
    if (returnUrl) return 'Redirecting back to event...';
    return 'Redirecting to events...';
  };

  if (user && isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
        <InteractiveGrid />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Ticket className="h-8 w-8 text-orange-600 mr-2" />
                  <h1 className="text-3xl font-bold text-gray-900">getAccess</h1>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Setting up your account
                </h2>
                <p className="text-gray-600">
                  Please wait while we verify your identity
                </p>
              </div>

              <div className="space-y-4">
                {authSteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                      step.status === 'completed' ? 'bg-green-50' :
                      step.status === 'loading' ? 'bg-orange-50' : 'bg-gray-50'
                    }`}
                    style={{
                      opacity: step.status === 'pending' ? 0.5 : 1,
                      transform: step.status === 'pending' ? 'translateX(-10px)' : 'translateX(0)',
                    }}
                  >
                    {getStepIcon(step)}
                    <span className={`text-sm font-medium ${
                      step.status === 'completed' ? 'text-green-800' :
                      step.status === 'loading' ? 'text-orange-800' : 'text-gray-600'
                    }`}>
                      {step.id === 'redirect' ? getRedirectText() : step.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  This may take a few seconds...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      <InteractiveGrid />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 animate-slide-up">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Ticket className="h-8 w-8 text-orange-600 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">getAccess</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600">
                Secure authentication powered by Civic Auth
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Identity verification with Civic</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Auto-generated Solana wallet</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Ticket className="h-5 w-5 text-orange-500" />
                <span>NFT-based event tickets</span>
              </div>
            </div>

            <div className="space-y-4">
              <UserButton className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition" />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="text-gray-600 hover:text-orange-600 transition-colors text-sm underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}