'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useWallet } from '../providers/WalletProvider'
import { X, Wallet, Shield, Loader2 } from 'lucide-react'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
  const { connectWallet, isLoading, isConnected, account } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  // Handle redirect when wallet connects
  useEffect(() => {
    if (isConnected && account && isConnecting) {
      console.log('✅ Wallet connected successfully, redirecting to dashboard...')
      setIsConnecting(false)
      onClose()
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 200)
    }
  }, [isConnected, account, isConnecting, onClose])

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
            <path d="M16 4 L26 10 L16 16 L6 10 Z" fill="url(#maschainGradient1)" />
            <path d="M6 10 L16 16 L16 28 L6 22 Z" fill="url(#maschainGradient2)" />
            <path d="M26 10 L16 16 L16 28 L26 22 Z" fill="url(#maschainGradient3)" />
            
            {/* Inner "M" pattern */}
            <g fill="white" opacity="0.8">
              <rect x="10" y="12" width="2" height="8" />
              <rect x="20" y="12" width="2" height="8" />
              <rect x="12" y="14" width="8" height="1.5" />
              <rect x="14" y="16" width="4" height="1.5" />
            </g>
            
            {/* Edge highlights */}
            <path d="M16 4 L26 10 L16 16 L6 10 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <path d="M6 10 L16 16" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <path d="M26 10 L16 16" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      ),
      recommended: true
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect using MetaMask',
      icon: (
        <div className="w-8 h-8 relative">
          <Image
            src="/mm.png"
            alt="MetaMask"
            width={32}
            height={32}
            className="rounded-lg"
          />
        </div>
      ),
      recommended: false
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Scan with WalletConnect',
      icon: (
        <div className="w-8 h-8 relative">
          <Image
            src="/WalletConnect-logo.png"
            alt="WalletConnect"
            width={32}
            height={32}
            className="rounded-lg"
          />
        </div>
      ),
      recommended: false
    }
  ]

  const handleConnect = async (walletId: string) => {
    console.log('🔄 Starting wallet connection for:', walletId)
    setSelectedWallet(walletId)
    setIsConnecting(true)
    
    try {
      console.log('🔄 Calling connectWallet()...')
      await connectWallet()
      console.log('✅ connectWallet() completed')
      
      // Don't handle redirect here - let useEffect handle it
    } catch (error) {
      console.error('❌ Connection failed:', error)
      setIsConnecting(false)
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
            disabled={isLoading || isConnecting}
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
              disabled={isLoading || isConnecting}
              className={`w-full p-4 border rounded-xl text-left transition-all duration-200 ${
                selectedWallet === wallet.id
                  ? 'border-primary-main bg-primary-main bg-opacity-5'
                  : 'border-neutral-gray200 hover:border-primary-main hover:bg-primary-main hover:bg-opacity-5'
              } ${(isLoading || isConnecting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {wallet.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-neutral-gray900">{wallet.name}</h3>
                    {wallet.recommended && (
                      <span className="bg-primary-main text-white text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-gray500">{wallet.description}</p>
                </div>
                {selectedWallet === wallet.id && (isLoading || isConnecting) && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary-main" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Connection Status */}
        {isConnecting && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Connecting wallet...</p>
                <p className="text-xs text-blue-600">Please confirm the connection in your wallet</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isConnected && account && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Wallet connected successfully!</p>
                <p className="text-xs text-green-600">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="bg-neutral-gray50 rounded-lg p-4 border border-neutral-gray200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-accent-emerald mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-gray900">Secure Connection</p>
              <p className="text-xs text-neutral-gray600 mt-1">
                Your wallet connection is secured by blockchain technology. We never store your private keys.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-gray500">
            By connecting, you agree to PowerChain's{' '}
            <a href="#" className="text-primary-main hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary-main hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
