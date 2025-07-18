'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from './providers/WalletProvider'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ImageSections from './components/ImageSections'
import Features from './components/Features'
import DashboardPreview from './components/DashboardPreview'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
import WalletConnectModal from './components/WalletConnectModal'

export default function HomePage() {
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { isConnected, isInitializing } = useWallet()
  const router = useRouter()

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (!isInitializing && isConnected) {
      console.log('✅ User already connected, redirecting to dashboard...')
      window.location.href = '/dashboard'
    }
  }, [isConnected, isInitializing])

  // Show loading while checking wallet connection
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading PowerChain...</p>
        </div>
      </div>
    )
  }

  // Show redirect message if connected
  if (isConnected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Redirecting to dashboard...</p>
          <p className="text-xs text-gray-500 mt-2">Wallet connected successfully</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="animate-fade-in">
        <Navigation 
          onMarketplaceClick={() => setShowMarketplace(true)}
          onConnectWallet={() => setShowWalletModal(true)}
        />
        
        <Hero 
          onExploreMarketplace={() => setShowMarketplace(true)}
          onConnectWallet={() => setShowWalletModal(true)}
        />
        
        <div className="animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
          <ImageSections />
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
          <Features />
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '1.6s', animationFillMode: 'both' }}>
          <DashboardPreview onConnectWallet={() => setShowWalletModal(true)} />
        </div>
      </div>
      
      {showMarketplace && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-neutral-gray200">
              <h2 className="text-2xl font-bold text-neutral-gray900">Energy Marketplace</h2>
              <button
                onClick={() => setShowMarketplace(false)}
                className="text-neutral-gray500 hover:text-neutral-gray700 text-2xl hover:scale-110 transition-transform duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <Marketplace 
                isPreview={true}
                onConnectWallet={() => {
                  setShowMarketplace(false)
                  setShowWalletModal(true)
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />

      <WalletConnectModal 
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </main>
  )
}
