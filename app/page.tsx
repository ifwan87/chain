'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import DashboardPreview from './components/DashboardPreview'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
import WalletConnectModal from './components/WalletConnectModal'

export default function HomePage() {
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

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
          <Features />
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
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
              <Marketplace isPreview={true} onConnectWallet={() => setShowWalletModal(true)} />
            </div>
          </div>
        </div>
      )}
      
      <WalletConnectModal 
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
      
      <Footer />
    </main>
  )
} 