'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Ticket, Shield, Zap } from 'lucide-react'

export default function AuthPage() {
  const { connected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (connected) {
      setTimeout(() => {
        router.push('/dashboard/create-events')
      }, 1000)
    }
  }, [connected, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Floating dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
        
        {/* Network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ea580c" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Ticket className="h-8 w-8 text-orange-600 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">getAccess</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h2>
              <p className="text-gray-600">Secure authentication powered by Civic Auth</p>
            </div>

            {/* Features */}
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

            {/* Wallet Connect Button */}
            <div className="space-y-4">
              {!connected ? (
                <WalletMultiButton className="!w-full !bg-orange-600 hover:!bg-orange-700 !rounded-lg !py-3 !text-white !font-semibold !transition-all !duration-200 !transform hover:!scale-105" />
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Wallet Connected!</span>
                  </div>
                  <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button 
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-orange-600 transition-colors text-sm underline"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}