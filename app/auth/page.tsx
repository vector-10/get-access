"use client";

import { UserButton, useUser } from "@civic/auth-web3/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Ticket, Shield, Zap } from "lucide-react";

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

export default function AuthPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleAuth = async () => {
      if (!user) return;
  
      try {
        const res = await fetch("/api/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            did: user.id, 
            name: user.displayName || "Anonymous",
          }),
        });
  
        const data = await res.json();
  
        if (data.user.role === "organizer") {
          router.push("/dashboard");
        } else {
          router.push("/events");
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
  
    handleAuth();
  }, [user, router]);


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
