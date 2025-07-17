'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import Marketplace from '../components/Marketplace'

export default function MarketplacePage() {
  const { isConnected, user } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

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
        {/* Page Header */}
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-gray900 mb-2">
                Energy Marketplace
              </h1>
              <p className="text-neutral-gray600">
                Buy and sell renewable energy with other PowerChain users
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-gray600">Your Balance</div>
              <div className="text-2xl font-bold text-neutral-gray900">{user.energyCredits} EC</div>
              <div className="text-xs text-neutral-gray500">Energy Credits</div>
            </div>
          </div>
        </div>

        {/* Marketplace Component */}
        <div className="bg-white rounded-xl border border-neutral-gray200 shadow-sm overflow-hidden">
          <Marketplace isPreview={false} />
        </div>
      </div>
    </DashboardLayout>
  )
} 