'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import { X, Wallet, Shield, Loader2 } from 'lucide-react'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { connectWallet, isLoading } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const router = useRouter()

  if (!isOpen) return null

  const walletOptions = [
    {
      id: 'maschain',
      name: 'MasChain Wallet',
      description: 'Connect with your MasChain wallet',
      icon: (
        <div className="w-8 h-8">
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <defs>
              <linearGradient id="maschainGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
              <linearGradient id="maschainGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="maschainGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>
            
            {/* 3D Cube Structure */}
            {/* Top face - diamond shape */}
            <path d="M16 4 L26 10 L16 16 L6 10 Z" fill="url(#maschainGradient1)" />
            
            {/* Left face */}
            <path d="M6 10 L16 16 L16 28 L6 22 Z" fill="url(#maschainGradient2)" />
            
            {/* Right face */}
            <path d="M16 16 L26 10 L26 22 L16 28 Z" fill="url(#maschainGradient3)" />
            
            {/* Inner geometric M pattern - overlapping rectangles */}
            <g opacity="0.9">
              <rect x="10" y="12" width="3" height="8" fill="white" transform="skewY(-15)" />
              <rect x="19" y="12" width="3" height="8" fill="white" transform="skewY(15)" />
              <polygon points="13,14 16,12 19,14 19,16 16,18 13,16" fill="white" opacity="0.8" />
            </g>
            
            {/* Edge highlights for 3D effect */}
            <path d="M16 4 L26 10 L16 16 L6 10 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
            <path d="M6 10 L6 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            <path d="M26 10 L26 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            <path d="M16 16 L16 28" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </svg>
        </div>
      ),
      recommended: true
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect using MetaMask',
      icon: '🦊',
      recommended: false
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Scan with WalletConnect',
      icon: '📱',
      recommended: false
    }
  ]

  const handleConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    try {
      await connectWallet()
      onClose()
      // Redirect to dashboard after successful connection
      router.push('/dashboard')
    } catch (error) {
      console.error('Connection failed:', error)
    } finally {
      setSelectedWallet(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-main p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-gray900">Connect Wallet</h2>
              <p className="text-sm text-neutral-gray500">Choose your preferred wallet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-gray400 hover:text-neutral-gray600 p-2"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3 mb-6">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              disabled={isLoading}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedWallet === wallet.id
                  ? 'border-primary-main bg-primary-main bg-opacity-5'
                  : 'border-neutral-gray200 hover:border-neutral-gray300 hover:bg-neutral-gray50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center">
                    {typeof wallet.icon === 'string' ? (
                      <span className="text-2xl">{wallet.icon}</span>
                    ) : (
                      wallet.icon
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-neutral-gray900">{wallet.name}</span>
                      {wallet.recommended && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary-main text-white rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-gray500">{wallet.description}</p>
                  </div>
                </div>
                {selectedWallet === wallet.id && isLoading ? (
                  <Loader2 className="h-5 w-5 text-primary-main animate-spin" />
                ) : (
                  <div className="text-neutral-gray400">
                    →
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Security Notice */}
        <div className="bg-neutral-gray50 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-accent-emerald mt-0.5" />
            <div>
              <h4 className="font-medium text-neutral-gray900 mb-1">Secure Connection</h4>
              <p className="text-sm text-neutral-gray600">
                Your wallet connection is encrypted and secure. PowerChain never stores your private keys.
              </p>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="border-t border-neutral-gray200 pt-4">
          <p className="text-sm text-neutral-gray600 mb-3">After connecting, you'll be able to:</p>
          <div className="space-y-2">
            {[
              'Trade renewable energy in real-time',
              'Earn carbon credits automatically',
              'Participate in community governance',
              'Access Virtual Power Plant features'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-primary-main">⚡</span>
                <span className="text-sm text-neutral-gray700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-neutral-gray200">
          <p className="text-xs text-neutral-gray500">
            By connecting a wallet, you agree to our{' '}
            <a href="#" className="text-primary-main hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-primary-main hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
} 