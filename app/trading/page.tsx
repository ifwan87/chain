'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  DollarSign,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  Target,
  Award,
  Zap,
  Leaf
} from 'lucide-react'

export default function TradingPage() {
  const { isConnected, user, isInitializing } = useWallet()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('portfolio')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [tradingData, setTradingData] = useState({
    totalTrades: 156,
    successfulTrades: 142,
    totalVolume: 2847.5, // MWh
    totalRevenue: 512450.75, // RM
    averagePrice: 0.18, // RM per kWh
    profitLoss: 45680.25, // RM
    carbonCreditsEarned: 142.3,
    tradingEfficiency: 0.91, // %
    monthlyGrowth: 12.5, // %
    activeOrders: 8
  })

  const [transactions, setTransactions] = useState([
    {
      id: 'tx_001',
      type: 'buy',
      energyType: 'solar',
      quantity: 25.5, // kWh
      price: 0.18, // RM per kWh
      total: 459.00, // RM
      counterparty: 'Sarah Chen',
      timestamp: '2024-01-25T14:30:00Z',
      status: 'completed',
      blockHash: '0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c2d3e4f5a6b7c8d9e0f1a2',
      carbonCredits: 1.28,
      location: 'Kuala Lumpur'
    },
    {
      id: 'tx_002',
      type: 'sell',
      energyType: 'solar',
      quantity: 18.2, // kWh
      price: 0.22, // RM per kWh
      total: 400.40, // RM
      counterparty: 'Marketplace',
      timestamp: '2024-01-25T12:15:00Z',
      status: 'completed',
      blockHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
      carbonCredits: 0.91,
      location: 'Selangor'
    },
    {
      id: 'tx_003',
      type: 'buy',
      energyType: 'wind',
      quantity: 32.8, // kWh
      price: 0.16, // RM per kWh
      total: 524.80, // RM
      counterparty: 'Wind Farm KL',
      timestamp: '2024-01-25T10:45:00Z',
      status: 'pending',
      blockHash: null,
      carbonCredits: 1.64,
      location: 'Kuala Lumpur'
    },
    {
      id: 'tx_004',
      type: 'sell',
      energyType: 'storage',
      quantity: 45.0, // kWh
      price: 0.24, // RM per kWh
      total: 1080.00, // RM
      counterparty: 'Grid Operator',
      timestamp: '2024-01-25T08:20:00Z',
      status: 'completed',
      blockHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
      carbonCredits: 2.25,
      location: 'Johor'
    },
    {
      id: 'tx_005',
      type: 'buy',
      energyType: 'solar',
      quantity: 15.3, // kWh
      price: 0.19, // RM per kWh
      total: 290.70, // RM
      counterparty: 'Solar Collective',
      timestamp: '2024-01-24T16:30:00Z',
      status: 'failed',
      blockHash: null,
      carbonCredits: 0.77,
      location: 'Penang'
    }
  ])

  const [portfolioMetrics, setPortfolioMetrics] = useState({
    totalValue: 28450.75, // RM
    dailyChange: 1250.50, // RM
    weeklyChange: 5670.25, // RM
    monthlyChange: 18920.50, // RM
    energyHoldings: 125.8, // kWh
    carbonCredits: 78.5,
    tradingStreak: 15, // days
    bestTrade: 1080.00, // RM
    averageTradeSize: 456.25 // RM
  })

  const [marketData, setMarketData] = useState({
    currentPrice: 0.19, // RM per kWh
    priceChange: 0.02, // RM
    priceChangePercent: 11.8, // %
    volume24h: 2847.5, // MWh
    marketCap: 12500000, // RM
    topGainers: [
      { name: 'Solar Energy', change: '+15.2%', price: 0.22 },
      { name: 'Wind Energy', change: '+8.7%', price: 0.18 },
      { name: 'Storage Energy', change: '+12.3%', price: 0.24 }
    ],
    topLosers: [
      { name: 'Grid Energy', change: '-3.1%', price: 0.16 },
      { name: 'Peak Energy', change: '-1.8%', price: 0.20 }
    ]
  })

  useEffect(() => {
    if (!isInitializing && !isConnected) {
      router.push('/')
    }
  }, [isConnected, isInitializing, router])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading Trading Dashboard...</p>
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

  const tabs = [
    { id: 'portfolio', name: 'Portfolio', icon: BarChart3 },
    { id: 'transactions', name: 'Transactions', icon: TrendingUp },
    { id: 'market', name: 'Market', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: Target },
    { id: 'orders', name: 'Orders', icon: Clock }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return renderPortfolioTab()
      case 'transactions':
        return renderTransactionsTab()
      case 'market':
        return renderMarketTab()
      case 'analytics':
        return renderAnalyticsTab()
      case 'orders':
        return renderOrdersTab()
      default:
        return renderPortfolioTab()
    }
  }

  const renderPortfolioTab = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+{portfolioMetrics.dailyChange > 0 ? '+' : ''}{portfolioMetrics.dailyChange} RM</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">RM {portfolioMetrics.totalValue.toLocaleString()}</h3>
          <p className="text-neutral-gray600">Portfolio Value</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">{portfolioMetrics.energyHoldings} kWh</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{portfolioMetrics.energyHoldings}</h3>
          <p className="text-neutral-gray600">Energy Holdings</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+{portfolioMetrics.carbonCredits}</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{portfolioMetrics.carbonCredits}</h3>
          <p className="text-neutral-gray600">Carbon Credits</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">{tradingData.tradingStreak} days</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{tradingData.tradingStreak}</h3>
          <p className="text-neutral-gray600">Trading Streak</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Portfolio Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
            <TrendingUp className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-2">+{portfolioMetrics.dailyChange} RM</div>
            <div className="text-green-100">Daily Change</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white">
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-2">+{portfolioMetrics.weeklyChange} RM</div>
            <div className="text-blue-100">Weekly Change</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
            <Target className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold mb-2">+{portfolioMetrics.monthlyChange} RM</div>
            <div className="text-purple-100">Monthly Change</div>
          </div>
        </div>
      </div>

      {/* Trading Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Trading Statistics</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Total Trades</span>
              <span className="font-semibold text-neutral-gray900">{tradingData.totalTrades}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Success Rate</span>
              <span className="font-semibold text-green-600">{((tradingData.successfulTrades / tradingData.totalTrades) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Total Volume</span>
              <span className="font-semibold text-neutral-gray900">{tradingData.totalVolume} MWh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Average Trade Size</span>
              <span className="font-semibold text-neutral-gray900">RM {portfolioMetrics.averageTradeSize}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Best Trade</span>
              <span className="font-semibold text-green-600">RM {portfolioMetrics.bestTrade}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Trading Efficiency</span>
              <span className="font-semibold text-emerald-600">{(tradingData.tradingEfficiency * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-neutral-gray50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.type === 'buy' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'buy' ? (
                      <ArrowDownRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-gray900">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.energyType}
                    </div>
                    <div className="text-sm text-neutral-gray600">{tx.quantity} kWh</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neutral-gray900">RM {tx.total}</div>
                  <div className="text-sm text-neutral-gray600">{new Date(tx.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransactionsTab = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-gray300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-neutral-gray300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-neutral-gray300 rounded-lg hover:bg-neutral-gray50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-neutral-gray200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-gray50 border-b border-neutral-gray200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Type</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Energy</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Quantity</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Price</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Total</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Counterparty</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Date</th>
                <th className="text-left py-4 px-6 font-medium text-neutral-gray700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(tx => 
                  (filterStatus === 'all' || tx.status === filterStatus) &&
                  (searchTerm === '' || 
                   tx.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   tx.energyType.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((tx) => (
                <tr key={tx.id} className="border-b border-neutral-gray100 hover:bg-neutral-gray50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.type === 'buy' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {tx.type === 'buy' ? (
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <span className="font-medium text-neutral-gray900 capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        tx.energyType === 'solar' ? 'bg-yellow-100' :
                        tx.energyType === 'wind' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        {tx.energyType === 'solar' ? '☀️' : tx.energyType === 'wind' ? '💨' : '🔋'}
                      </div>
                      <span className="capitalize">{tx.energyType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-neutral-gray900">{tx.quantity} kWh</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-neutral-gray900">RM {tx.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-neutral-gray900">RM {tx.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-neutral-gray700">{tx.counterparty}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-neutral-gray600 text-sm">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-neutral-gray400 hover:text-neutral-gray600">
                        <Eye className="h-4 w-4" />
                      </button>
                      {tx.blockHash && (
                        <button className="p-1 text-neutral-gray400 hover:text-neutral-gray600">
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMarketTab = () => (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className={`text-sm font-medium ${
              marketData.priceChangePercent > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketData.priceChangePercent > 0 ? '+' : ''}{marketData.priceChangePercent}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">RM {marketData.currentPrice}</h3>
          <p className="text-neutral-gray600">Current Market Price</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">24h</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{marketData.volume24h} MWh</h3>
          <p className="text-neutral-gray600">24h Volume</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">Market Cap</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">RM {(marketData.marketCap / 1000000).toFixed(1)}M</h3>
          <p className="text-neutral-gray600">Total Market Value</p>
        </div>
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Top Gainers</h3>
          <div className="space-y-4">
            {marketData.topGainers.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <div className="font-medium text-neutral-gray900">{item.name}</div>
                  <div className="text-sm text-neutral-gray600">Energy Type</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{item.change}</div>
                  <div className="text-sm text-neutral-gray600">RM {item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Top Losers</h3>
          <div className="space-y-4">
            {marketData.topLosers.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <div className="font-medium text-neutral-gray900">{item.name}</div>
                  <div className="text-sm text-neutral-gray600">Energy Type</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">{item.change}</div>
                  <div className="text-sm text-neutral-gray600">RM {item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Trading Analytics</h3>
        
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="h-12 w-12 text-primary-main" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-gray900 mb-4">Advanced Analytics Coming Soon</h3>
          <p className="text-neutral-gray600 max-w-md mx-auto mb-6">
            We're building comprehensive trading analytics including performance metrics, 
            risk analysis, and predictive modeling for optimal trading strategies.
          </p>
          <button className="bg-primary-main text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
            Get Notified When Available
          </button>
        </div>
      </div>
    </div>
  )

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Active Orders</h3>
        
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-12 w-12 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-gray900 mb-4">Order Management Coming Soon</h3>
          <p className="text-neutral-gray600 max-w-md mx-auto mb-6">
            We're building advanced order management including limit orders, 
            stop-loss orders, and automated trading strategies.
          </p>
          <button className="bg-primary-main text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
            Get Notified When Available
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Trading Dashboard 📈
              </h1>
              <p className="text-purple-100">
                Monitor your energy trading portfolio, transactions, and market performance
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-100">Portfolio Value</div>
              <div className="text-2xl font-bold">RM {portfolioMetrics.totalValue.toLocaleString()}</div>
              <div className="text-xs text-purple-200">+{portfolioMetrics.dailyChange} today</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 border border-neutral-gray200 shadow-sm">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-main text-white'
                    : 'text-neutral-gray600 hover:text-neutral-gray900 hover:bg-neutral-gray50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </DashboardLayout>
  )
} 