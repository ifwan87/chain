'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import EnergyOverview from '../components/dashboard/EnergyOverview'
import TradingMetrics from '../components/dashboard/TradingMetrics'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import QuickActions from '../components/dashboard/QuickActions'
import CarbonCredits from '../components/dashboard/CarbonCredits'

export default function DashboardPage() {
  const { isConnected, user, isInitializing } = useWallet() // NEW: Use isInitializing
  const router = useRouter()

  useEffect(() => {
    // FIXED: Only redirect if initialization is complete AND not connected
    if (!isInitializing && !isConnected) {
      console.log('🔄 Wallet not connected after initialization, redirecting to home...')
      router.push('/')
    }
  }, [isConnected, isInitializing, router]) // Include isInitializing in dependencies

  // IMPROVED: Show loading while initializing or not connected
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Restoring wallet connection...</p>
        </div>
      </div>
    )
  }

  if (!isConnected || !user) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-hero rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.name}! {user.avatar}
              </h1>
              <p className="text-white text-opacity-90">
                {user.role === 'producer' && 'Monitor your solar production and energy sales'}
                {user.role === 'consumer' && 'Track your energy consumption and purchases'}
                {user.role === 'trader' && 'Manage your energy trading portfolio'}
                {user.role === 'dao_member' && 'Participate in community governance'}
                {user.role === 'hub_operator' && 'Manage community energy pooling and grid operations'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white text-opacity-80">Your Balance</div>
              <div className="text-xl font-bold">{user.energyCredits} EC</div>
              <div className="text-xs text-white text-opacity-60">Energy Credits</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions userRole={user.role} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Energy Overview */}
          <div className="lg:col-span-2 space-y-6">
            <EnergyOverview userRole={user.role} />
            <TradingMetrics userId={user.id} />
            <RecentTransactions userId={user.id} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <CarbonCredits userId={user.id} />
            
            {/* Market Status */}
            <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-gray900 mb-4">Market Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">Current Price</span>
                  <span className="font-semibold text-neutral-gray900">RM 0.19/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">24h Volume</span>
                  <span className="font-semibold text-neutral-gray900">2,845 kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">Active Offers</span>
                  <span className="font-semibold text-neutral-gray900">127</span>
                </div>
                <div className="pt-3 border-t border-neutral-gray200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-emerald">Market Trend</span>
                    <span className="text-accent-emerald">+2.3% ↗</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-gray900 mb-4">Network Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">MasChain Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full"></div>
                    <span className="text-sm font-medium text-accent-emerald">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">Smart Contracts</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full"></div>
                    <span className="text-sm font-medium text-accent-emerald">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-gray600">IoT Devices</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full"></div>
                    <span className="text-sm font-medium text-accent-emerald">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
