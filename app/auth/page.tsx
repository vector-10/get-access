'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Ticket, Shield, Zap } from 'lucide-react'

function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
 
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
 
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
             
      grid.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(234, 88, 12, 0.4) 0%, transparent 35%),
        linear-gradient(rgba(234, 88, 12, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(234, 88, 12, 0.08) 1px, transparent 1px)
        `
        
      grid.style.backgroundSize = `100% 100%, 12px 12px, 12px 12px`
    }
 
    document.addEventListener('mousemove', handleMouseMove)
         
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
 
  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{
        background: `
          linear-gradient(rgba(234, 88, 12, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(234, 88, 12, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '16px 16px',
        }}
    />
  )
}

export default function AuthPage() {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  useEffect(() => {
    if (connected) {
      // Add slight delay for smooth transition
      setTimeout(() => {
        router.push('/dashboard/create-events')
      }, 1000)
    }
  }, [connected, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Interactive Grid Background */}
      <InteractiveGrid />
      
      {/* Floating dots */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 animate-slide-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Ticket className="h-8 w-8 text-orange-600 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">getAccess</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign in to getAccess</h2>
              <p className="text-gray-600">An onchain wallet will be created Automatically, Just for You</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Identity verification Powered by civic Auth</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Auto-generated Web3 wallet</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <Ticket className="h-5 w-5 text-orange-500" />
                <span>NFT-based event tickets</span>
              </div>
            </div>

            {/* Wallet Connect Button */}
            {!connected ? (
                <button 
                    onClick={() => setVisible(true)}
                    className="w-full bg-orange-600 hover:bg-orange-700 rounded-lg py-3 text-white font-semibold transition-all duration-200 transform hover:scale-105"
                >
                    Sign In
                </button>
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
