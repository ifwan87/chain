'use client'

import { ArrowRight, TrendingUp, Leaf, Shield, Zap } from 'lucide-react'

interface HeroProps {
  onExploreMarketplace: () => void
  onConnectWallet: () => void
}

// Network Dots Animation Component
const NetworkDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating dots */}
      <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-white opacity-70 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white opacity-50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white opacity-30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-white opacity-60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-2/3 w-2.5 h-2.5 bg-white opacity-40 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <line x1="16%" y1="25%" x2="33%" y2="66%" stroke="white" strokeWidth="1" strokeDasharray="2,4" />
        <line x1="75%" y1="33%" x2="66%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="2,4" />
        <line x1="33%" y1="66%" x2="66%" y2="33%" stroke="white" strokeWidth="1" strokeDasharray="2,4" />
      </svg>
    </div>
  )
}

export default function Hero({ onExploreMarketplace, onConnectWallet }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 30%, #4C1D95 70%, #7C3AED 100%)'
    }}>
      {/* Network Dots Background */}
      <NetworkDots />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen">
          
          {/* Left Content - Hero Text */}
          <div className="lg:col-span-7 text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full mb-8 transform hover:scale-105 transition-all duration-300" style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
              boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
            }}>
              <Zap className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm font-semibold">Powered by MasChain Blockchain</span>
            </div>

            {/* Main Title - Helium Style */}
            <h1 className="text-white mb-6" style={{
              fontSize: '3.75rem',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.02em'
            }}>
              Trade Solar Energy
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Directly with Neighbors
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 mb-8 max-w-2xl" style={{
              fontSize: '1.125rem',
              fontWeight: 400,
              lineHeight: 1.75
            }}>
              Join the decentralized energy revolution. Buy and sell renewable energy using blockchain technology, 
              earn carbon credits, and create a sustainable future together.
            </p>

            {/* CTA Buttons - Helium Style */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onExploreMarketplace}
                className="group px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center helium-button-primary"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button
                onClick={onConnectWallet}
                className="px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 helium-button-secondary"
              >
                Connect Wallet to Start Trading
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 opacity-70">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <span className="text-white font-bold text-sm">MS</span>
                </div>
                <span className="text-white text-sm">MasChain</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <span className="text-white font-bold text-sm">BC</span>
                </div>
                <span className="text-white text-sm">Blockchain Secured</span>
              </div>
            </div>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            
            {/* Energy Trading Card */}
            <div className="rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 helium-card-hover" style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{
                background: 'rgba(255, 255, 255, 0.1)'
              }}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2 leading-tight">
                Real-time Trading
              </h3>
              <p className="text-white/90 text-lg font-normal leading-relaxed">
                Live energy marketplace with AI-powered pricing
              </p>
            </div>

            {/* Two smaller cards side by side */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Carbon Credits Card */}
              <div className="rounded-3xl p-6 transform hover:scale-105 transition-all duration-300 helium-card-hover" style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white text-lg font-bold mb-1">
                  Carbon Credits
                </h3>
                <p className="text-white/90 text-sm">
                  Earn rewards for every kWh
                </p>
              </div>

              {/* Security Card */}
              <div className="rounded-3xl p-6 transform hover:scale-105 transition-all duration-300 helium-card-hover" style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'rgba(255, 255, 255, 0.1)'
                }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white text-lg font-bold mb-1">
                  Secure Trading
                </h3>
                <p className="text-white/90 text-sm">
                  Blockchain guaranteed
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 helium-card-hover" style={{
              background: '#FFFFFF',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900">RM 0.18</div>
                  <div className="text-sm text-slate-600">per kWh</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">1,250+</div>
                  <div className="text-sm text-slate-600">Active Traders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">50K+</div>
                  <div className="text-sm text-slate-600">kWh Traded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}