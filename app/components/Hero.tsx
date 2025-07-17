'use client'

import { ArrowRight, TrendingUp, Leaf, Shield } from 'lucide-react'
import { ChromeGrid } from './ChromeGrid'

interface HeroProps {
  onExploreMarketplace: () => void
  onConnectWallet: () => void
}

export default function Hero({ onExploreMarketplace, onConnectWallet }: HeroProps) {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 bg-gradient-hero overflow-hidden">
      {/* Chrome Grid Background */}
      <ChromeGrid />
      
              {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-primary-main to-secondary-main opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-tr from-secondary-main to-primary-main opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 bg-opacity-5 rounded-full blur-2xl animate-ping"></div>
        </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 3 }}>
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <span className="text-white mr-2 animate-pulse">⚡</span>
            <span className="text-white text-sm font-medium">Powered by MasChain Blockchain</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            Trade Solar Energy
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
              Directly with Neighbors
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            Join the decentralized energy revolution. Buy and sell renewable energy using blockchain technology, 
            earn carbon credits, and create a sustainable future together.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <div className="glass rounded-xl p-4 hover:bg-white hover:bg-opacity-20 transition-all duration-300 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-white animate-glow" />
              </div>
              <div className="text-2xl font-bold text-white">RM 0.18</div>
              <div className="text-sm text-white text-opacity-80">per kWh</div>
            </div>
            <div className="glass rounded-xl p-4 hover:bg-white hover:bg-opacity-20 transition-all duration-300 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-center mb-2">
                <Leaf className="h-6 w-6 text-white animate-glow" />
              </div>
              <div className="text-2xl font-bold text-white">1,250+</div>
              <div className="text-sm text-white text-opacity-80">Active Traders</div>
            </div>
            <div className="glass rounded-xl p-4 hover:bg-white hover:bg-opacity-20 transition-all duration-300 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-white animate-glow" />
              </div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-white text-opacity-80">kWh Traded</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
            <button
              onClick={onExploreMarketplace}
              className="btn-cta group flex items-center space-x-2 hover:scale-105 transform transition-all duration-300"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              onClick={onConnectWallet}
              className="btn-secondary bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-opacity-30 hover:scale-105 transform transition-all duration-300"
            >
              Connect Wallet to Start Trading
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-white text-opacity-70 text-sm mb-4">Trusted by renewable energy leaders</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MS</span>
                </div>
                <span className="text-white text-sm">MasChain</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SE</span>
                </div>
                <span className="text-white text-sm">Solar Energy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GC</span>
                </div>
                <span className="text-white text-sm">Green Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Energy Particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-primary-main to-secondary-main rounded-full opacity-80 animate-ping shadow-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-secondary-main rounded-full opacity-60 animate-pulse shadow-md"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-primary-main rounded-full opacity-70 animate-bounce shadow-md"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-primary-main rounded-full opacity-50 animate-ping shadow-sm"></div>
        <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-gradient-to-r from-secondary-main to-yellow-400 rounded-full opacity-60 animate-pulse shadow-md"></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-gradient-to-r from-primary-main to-purple-400 rounded-full opacity-70 animate-bounce shadow-sm"></div>
        <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-accent-emerald rounded-full opacity-50 animate-ping shadow-sm"></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-gradient-to-r from-primary-main to-secondary-main rounded-full opacity-60 animate-pulse shadow-sm"></div>
      </div>
    </section>
  )
} 