'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '../providers/WalletProvider'
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Clock, 
  Leaf,
  ShoppingCart,
  Eye,
  Filter,
  Search
} from 'lucide-react'

interface EnergyOffer {
  id: string
  sellerId: string
  sellerName: string
  sellerAvatar: string
  energyType: 'solar' | 'wind' | 'storage'
  quantity: number
  price: number
  location: string
  timestamp: string
  carbonCredits: number
  renewable: boolean
  distance?: string
}

interface MarketplaceProps {
  isPreview?: boolean
  onConnectWallet?: () => void
}

export default function Marketplace({ isPreview = false, onConnectWallet }: MarketplaceProps) {
  const { isConnected, user } = useWallet()
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [sortBy, setSortBy] = useState<'price' | 'quantity' | 'distance'>('price')
  const [filterType, setFilterType] = useState<'all' | 'solar' | 'wind' | 'storage'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPrice, setCurrentPrice] = useState(0.19)

  // Mock data for energy offers
  const [energyOffers] = useState<EnergyOffer[]>([
    {
      id: 'offer_1',
      sellerId: 'user_1',
      sellerName: 'Alice Chen',
      sellerAvatar: '👩‍💼',
      energyType: 'solar',
      quantity: 50,
      price: 0.18,
      location: 'Kuala Lumpur',
      timestamp: '2 mins ago',
      carbonCredits: 2.5,
      renewable: true,
      distance: '1.2 km'
    },
    {
      id: 'offer_2',
      sellerId: 'user_2',
      sellerName: 'Bob Smith',
      sellerAvatar: '👨‍🔧',
      energyType: 'solar',
      quantity: 75,
      price: 0.17,
      location: 'Selangor',
      timestamp: '5 mins ago',
      carbonCredits: 3.8,
      renewable: true,
      distance: '2.8 km'
    },
    {
      id: 'offer_3',
      sellerId: 'user_3',
      sellerName: 'Carol Wang',
      sellerAvatar: '👩‍💻',
      energyType: 'storage',
      quantity: 100,
      price: 0.20,
      location: 'Petaling Jaya',
      timestamp: '8 mins ago',
      carbonCredits: 1.2,
      renewable: true,
      distance: '3.5 km'
    },
    {
      id: 'offer_4',
      sellerId: 'user_4',
      sellerName: 'David Lee',
      sellerAvatar: '👨‍💼',
      energyType: 'wind',
      quantity: 200,
      price: 0.16,
      location: 'Johor Bahru',
      timestamp: '12 mins ago',
      carbonCredits: 8.0,
      renewable: true,
      distance: '15.2 km'
    }
  ])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.01
        return Math.max(0.15, Math.min(0.25, prev + change))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredOffers = energyOffers
    .filter(offer => 
      filterType === 'all' || offer.energyType === filterType
    )
    .filter(offer =>
      searchTerm === '' || 
      offer.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'quantity':
          return b.quantity - a.quantity
        case 'distance':
          return parseFloat(a.distance || '0') - parseFloat(b.distance || '0')
        default:
          return 0
      }
    })

  const getEnergyTypeIcon = (type: string) => {
    switch (type) {
      case 'solar':
        return '☀️'
      case 'wind':
        return '💨'
      case 'storage':
        return '🔋'
      default:
        return '⚡'
    }
  }

  const getEnergyTypeColor = (type: string) => {
    switch (type) {
      case 'solar':
        return 'text-yellow-600 bg-yellow-100'
      case 'wind':
        return 'text-blue-600 bg-blue-100'
      case 'storage':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-purple-600 bg-purple-100'
    }
  }

  const handlePurchase = (offer: EnergyOffer) => {
    if (!isConnected) {
      onConnectWallet?.()
      return
    }
    
    // Simulate purchase
    alert(`Purchased ${offer.quantity} kWh from ${offer.sellerName} for RM ${(offer.quantity * offer.price).toFixed(2)}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Market Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-gray500">Current Price</p>
                <p className="text-2xl font-bold text-neutral-gray900">RM {currentPrice.toFixed(3)}</p>
                <p className="text-xs text-accent-emerald flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.3% from yesterday
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent-emerald" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-gray500">24h Volume</p>
                <p className="text-2xl font-bold text-neutral-gray900">2,845</p>
                <p className="text-xs text-neutral-gray500">kWh traded</p>
              </div>
              <span className="text-4xl text-primary-main">⚡</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-gray500">Active Offers</p>
                <p className="text-2xl font-bold text-neutral-gray900">{energyOffers.length}</p>
                <p className="text-xs text-neutral-gray500">available now</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-secondary-main" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-gray500">Carbon Credits</p>
                <p className="text-2xl font-bold text-neutral-gray900">156</p>
                <p className="text-xs text-accent-emerald">tons offset today</p>
              </div>
              <Leaf className="h-8 w-8 text-accent-emerald" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray400" />
            <input
              type="text"
              placeholder="Search by seller or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="input min-w-[120px]"
            >
              <option value="all">All Types</option>
              <option value="solar">Solar</option>
              <option value="wind">Wind</option>
              <option value="storage">Storage</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input min-w-[120px]"
            >
              <option value="price">Sort by Price</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="distance">Sort by Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="bg-white rounded-xl border border-neutral-gray200 shadow-sm">
        <div className="p-6 border-b border-neutral-gray200">
          <h3 className="text-lg font-semibold text-neutral-gray900">
            Available Energy Offers ({filteredOffers.length})
          </h3>
        </div>

        <div className="divide-y divide-neutral-gray200">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="p-6 hover:bg-neutral-gray50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  {/* Seller Info */}
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{offer.sellerAvatar}</span>
                    <div>
                      <h4 className="font-medium text-neutral-gray900">{offer.sellerName}</h4>
                      <div className="flex items-center space-x-2 text-sm text-neutral-gray500">
                        <MapPin className="h-3 w-3" />
                        <span>{offer.location}</span>
                        {offer.distance && (
                          <>
                            <span>•</span>
                            <span>{offer.distance}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Energy Type */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getEnergyTypeColor(offer.energyType)}`}>
                    <span className="mr-1">{getEnergyTypeIcon(offer.energyType)}</span>
                    {offer.energyType.charAt(0).toUpperCase() + offer.energyType.slice(1)}
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Quantity & Price */}
                  <div className="text-right">
                    <p className="font-semibold text-neutral-gray900">{offer.quantity} kWh</p>
                                      <p className="text-lg font-bold text-primary-main">RM {offer.price.toFixed(3)}/kWh</p>
                  <p className="text-xs text-neutral-gray500">Total: RM {(offer.quantity * offer.price).toFixed(2)}</p>
                  </div>

                  {/* Carbon Credits */}
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-accent-emerald">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm font-medium">{offer.carbonCredits}</span>
                    </div>
                    <p className="text-xs text-neutral-gray500">Credits</p>
                  </div>

                  {/* Time */}
                  <div className="text-center text-xs text-neutral-gray500">
                    <Clock className="h-3 w-3 mx-auto mb-1" />
                    <span>{offer.timestamp}</span>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isPreview ? (
                      <button
                        onClick={() => onConnectWallet?.()}
                        className="btn-primary text-sm"
                      >
                        Connect to Buy
                      </button>
                    ) : isConnected ? (
                      <button
                        onClick={() => handlePurchase(offer)}
                        className="btn-primary text-sm"
                      >
                        Buy Now
                      </button>
                    ) : (
                      <button
                        onClick={() => onConnectWallet?.()}
                        className="btn-secondary text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isPreview && (
        <div className="mt-6 text-center">
          <p className="text-neutral-gray600 mb-4">
            This is a preview of the energy marketplace. Connect your wallet to start trading!
          </p>
          <button
            onClick={() => onConnectWallet?.()}
            className="btn-cta"
          >
            Connect Wallet to Start Trading
          </button>
        </div>
      )}
    </div>
  )
} 