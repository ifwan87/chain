'use client'

import { useState } from 'react'
import { useWallet } from '../providers/WalletProvider'
import { X, Zap, User, MapPin, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface EnergyOffer {
  id: string
  sellerName: string
  sellerAvatar: string
  location: string
  energyType: 'solar' | 'wind' | 'storage'
  amount: number // kWh
  price: number // RM per kWh
  total: number
  carbonCredits: number
  distance: string
}

interface EnergyPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  offer: EnergyOffer | null
}

export default function EnergyPurchaseModal({ isOpen, onClose, offer }: EnergyPurchaseModalProps) {
  const { account, buyEnergy } = useWallet()
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  if (!isOpen || !offer) return null

  const handlePurchase = async () => {
    if (!account) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsPurchasing(true)
    try {
      await buyEnergy(offer.id, offer.total, offer.price, offer.amount)
      setPurchaseSuccess(true)
      
      // Auto close after success
      setTimeout(() => {
        onClose()
        setPurchaseSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsPurchasing(false)
    }
  }

  const energyTypeIcons = {
    solar: '☀️',
    wind: '💨',
    storage: '🔋'
  }

  const energyTypeColors = {
    solar: 'bg-yellow-100 text-yellow-800',
    wind: 'bg-blue-100 text-blue-800',
    storage: 'bg-green-100 text-green-800'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-gray900">Purchase Energy</h2>
          <button
            onClick={onClose}
            className="text-neutral-gray400 hover:text-neutral-gray600 p-2"
            disabled={isPurchasing}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {purchaseSuccess ? (
          // Success State
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-gray900 mb-2">
              Purchase Successful!
            </h3>
            <p className="text-neutral-gray600 mb-4">
              Your energy purchase has been submitted to the blockchain.
              Bob Smith will receive a notification to approve the transaction.
            </p>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-800">
                You'll receive {offer.carbonCredits} carbon credits when the transaction is complete.
              </p>
            </div>
          </div>
        ) : (
          // Purchase Form
          <>
            {/* Seller Info */}
            <div className="bg-neutral-gray50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{offer.sellerAvatar}</span>
                <div>
                  <h3 className="font-medium text-neutral-gray900">{offer.sellerName}</h3>
                  <div className="flex items-center text-sm text-neutral-gray500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {offer.location} • {offer.distance}
                  </div>
                </div>
              </div>
              
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${energyTypeColors[offer.energyType]}`}>
                <span className="mr-1">{energyTypeIcons[offer.energyType]}</span>
                {offer.energyType.charAt(0).toUpperCase() + offer.energyType.slice(1)} Energy
              </div>
            </div>

            {/* Purchase Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Energy Amount</span>
                <span className="font-semibold text-neutral-gray900">{offer.amount} kWh</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Price per kWh</span>
                <span className="font-semibold text-neutral-gray900">RM {offer.price}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Carbon Credits</span>
                <span className="font-semibold text-accent-emerald">+{offer.carbonCredits} CC</span>
              </div>
              
              <div className="border-t border-neutral-gray200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-neutral-gray900">Total Cost</span>
                  <span className="text-xl font-bold text-primary-main">RM {offer.total}</span>
                </div>
              </div>
            </div>

            {/* Wallet Balance */}
            {account && (
              <div className="bg-primary-main bg-opacity-10 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-neutral-gray900 mb-2">Your Balance</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-main">{account.balance.EC}</div>
                    <div className="text-xs text-neutral-gray500">EC</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary-main">{account.balance.GT}</div>
                    <div className="text-xs text-neutral-gray500">GT</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-emerald">{account.balance.CC}</div>
                    <div className="text-xs text-neutral-gray500">CC</div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              disabled={isPurchasing || !account || account.balance.EC < offer.total}
              className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
                isPurchasing || !account || account.balance.EC < offer.total
                  ? 'bg-neutral-gray200 text-neutral-gray500 cursor-not-allowed'
                  : 'bg-primary-main text-white hover:bg-primary-600'
              }`}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing Purchase...</span>
                </>
              ) : !account ? (
                <>
                  <span>Connect Wallet to Purchase</span>
                </>
              ) : account.balance.EC < offer.total ? (
                <>
                  <span>Insufficient Energy Credits</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>Purchase Energy</span>
                </>
              )}
            </button>

            {/* Transaction Info */}
            <div className="mt-4 p-3 bg-neutral-gray50 rounded-xl">
              <p className="text-xs text-neutral-gray600">
                🔐 This transaction will be signed with your MasChain wallet and recorded on the blockchain.
                Gas fees may apply.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
