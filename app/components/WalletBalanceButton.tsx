'use client'

import { useState } from 'react'
import { useWallet } from '../providers/WalletProvider'
import { Wallet, X, RefreshCw } from 'lucide-react'

export default function WalletBalanceButton() {
  const { account, isConnected, refreshBalance } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (!isConnected || !account) return null

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshBalance()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <>
      {/* Wallet Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-primary-main hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <Wallet className="h-4 w-4" />
        <span className="font-medium">Wallet</span>
        <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
          {account.balance.EC} EC
        </div>
      </button>

      {/* Balance Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-main p-2 rounded-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-gray900">MasChain Wallet</h2>
                  <p className="text-sm text-neutral-gray500">Balance Overview</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-gray400 hover:text-neutral-gray600 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Wallet Address */}
            <div className="mb-6 p-4 bg-neutral-gray50 rounded-xl">
              <h4 className="font-medium text-neutral-gray900 mb-2">Wallet Address</h4>
              <div className="font-mono text-sm text-neutral-gray600 bg-white p-2 rounded border">
                {account.address}
              </div>
            </div>

            {/* Token Balances */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-neutral-gray900">Token Balances</h4>
              
              {/* Energy Credits */}
              <div className="flex items-center justify-between p-4 bg-primary-main bg-opacity-10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h5 className="font-medium text-neutral-gray900">Energy Credits</h5>
                    <p className="text-sm text-neutral-gray500">Used for energy trading</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-main">{account.balance.EC}</div>
                  <div className="text-xs text-neutral-gray500">EC</div>
                </div>
              </div>

              {/* Governance Tokens */}
              <div className="flex items-center justify-between p-4 bg-secondary-main bg-opacity-10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗳️</span>
                  <div>
                    <h5 className="font-medium text-neutral-gray900">Governance Tokens</h5>
                    <p className="text-sm text-neutral-gray500">DAO voting power</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary-main">{account.balance.GT}</div>
                  <div className="text-xs text-neutral-gray500">GT</div>
                </div>
              </div>

              {/* Carbon Credits */}
              <div className="flex items-center justify-between p-4 bg-accent-emerald bg-opacity-10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h5 className="font-medium text-neutral-gray900">Carbon Credits</h5>
                    <p className="text-sm text-neutral-gray500">Environmental impact</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-emerald">{account.balance.CC}</div>
                  <div className="text-xs text-neutral-gray500">CC</div>
                </div>
              </div>

              {/* Native MAS */}
              <div className="flex items-center justify-between p-4 bg-neutral-gray100 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💎</span>
                  <div>
                    <h5 className="font-medium text-neutral-gray900">Native MAS</h5>
                    <p className="text-sm text-neutral-gray500">Gas fees and staking</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-neutral-gray900">{account.balance.native}</div>
                  <div className="text-xs text-neutral-gray500">MAS</div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
                isRefreshing
                  ? 'bg-neutral-gray200 text-neutral-gray500 cursor-not-allowed'
                  : 'bg-primary-main text-white hover:bg-primary-600'
              }`}
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Balance'}</span>
            </button>

            {/* Info */}
            <div className="mt-4 p-3 bg-neutral-gray50 rounded-xl">
              <p className="text-xs text-neutral-gray600">
                💡 Your balance updates automatically after transactions. Use refresh if balances seem outdated.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
