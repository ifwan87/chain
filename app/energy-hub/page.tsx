'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import { 
  Users, 
  Battery, 
  TrendingUp, 
  Zap,
  Home,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Plus,
  Eye,
  MapPin,
  Clock,
  Award,
  Shield
} from 'lucide-react'

function EnergyHubContent() {
  const { isConnected, user, isInitializing } = useWallet()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const [hubData, setHubData] = useState({
    totalPooledEnergy: 18.5, // MW
    totalCommunityMembers: 200,
    gridSalesPrice: 0.22, // RM per kWh
    marketPrice: 0.19, // RM per kWh
    todayRevenue: 4250.80, // RM
    monthlyRevenue: 125000.00, // RM
    carbonCreditsEarned: 78.5,
    gridConnectionStatus: 'online'
  })

  const [communityPools, setCommunityPools] = useState([
    {
      id: 'pool_1',
      name: 'Selangor Solar Collective',
      location: 'Petaling Jaya, Selangor',
      members: 65,
      totalCapacity: 6.5, // MW
      currentOutput: 3.8, // MW
      efficiency: 0.87,
      monthlyRevenue: 42500.00,
      carbonCredits: 26.3,
      status: 'active',
      priceToGrid: 0.225
    },
    {
      id: 'pool_2',
      name: 'KL Green Energy Hub',
      location: 'Kuala Lumpur',
      members: 85,
      totalCapacity: 8.5, // MW
      currentOutput: 5.2, // MW
      efficiency: 0.82,
      monthlyRevenue: 55250.00,
      carbonCredits: 34.8,
      status: 'active',
      priceToGrid: 0.218
    },
    {
      id: 'pool_3',
      name: 'Johor Battery Storage Network',
      location: 'Johor Bahru, Johor',
      members: 50,
      totalCapacity: 12.5, // MWh storage
      currentOutput: 3.5, // MW discharge
      efficiency: 0.91,
      monthlyRevenue: 27250.00,
      carbonCredits: 17.4,
      status: 'charging',
      priceToGrid: 0.235
    }
  ])

  const [gridTransactions, setGridTransactions] = useState([
    {
      id: 'tx_grid_001',
      poolName: 'Selangor Solar Collective',
      amount: 18.5, // MWh
      price: 0.225, // RM per kWh
      total: 4162.50, // RM
      timestamp: '2 hours ago',
      status: 'completed',
      buyer: 'TNB (National Grid)',
      carbonCredits: 0.93
    },
    {
      id: 'tx_grid_002',
      poolName: 'KL Green Energy Hub',
      amount: 24.8, // MWh
      price: 0.218, // RM per kWh
      total: 5406.40, // RM
      timestamp: '4 hours ago',
      status: 'completed',
      buyer: 'TNB (National Grid)',
      carbonCredits: 1.24
    },
    {
      id: 'tx_grid_003',
      poolName: 'Johor Battery Storage Network',
      amount: 14.2, // MWh
      price: 0.235, // RM per kWh
      total: 3337.00, // RM
      timestamp: '6 hours ago',
      status: 'pending',
      buyer: 'Sabah Electricity Sdn Bhd',
      carbonCredits: 0.71
    }
  ])

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
          <p className="text-neutral-gray600">Loading Energy Hub...</p>
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
    { id: 'overview', name: 'Hub Overview', icon: Home },
    { id: 'pooling', name: 'Community Pools', icon: Users },
    { id: 'grid-sales', name: 'Grid Trading', icon: TrendingUp },
    { id: 'pricing', name: 'Competitive Pricing', icon: DollarSign },
    { id: 'analytics', name: 'Performance Analytics', icon: Eye }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'pooling':
        return renderPoolingTab()
      case 'grid-sales':
        return renderGridSalesTab()
      case 'pricing':
        return renderPricingTab()
      case 'analytics':
        return renderAnalyticsTab()
      default:
        return renderOverviewTab()
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+12.5% vs last month</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{hubData.totalPooledEnergy} MW</h3>
          <p className="text-neutral-gray600">Total Pooled Energy</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">+28 this month</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{hubData.totalCommunityMembers.toLocaleString()}</h3>
          <p className="text-neutral-gray600">Community Members</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">RM {hubData.gridSalesPrice}/kWh</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">RM {hubData.monthlyRevenue.toLocaleString()}</h3>
          <p className="text-neutral-gray600">Monthly Grid Revenue</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+15.8% efficiency</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{hubData.carbonCreditsEarned}</h3>
          <p className="text-neutral-gray600">Carbon Credits Earned</p>
        </div>
      </div>

      {/* Grid Connection Status */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-gray900">National Grid Connection</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Online & Trading</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <ArrowUpRight className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{hubData.gridSalesPrice}</div>
            <div className="text-sm text-green-600">Current Grid Price (RM/kWh)</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{hubData.marketPrice}</div>
            <div className="text-sm text-blue-600">Market Average (RM/kWh)</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">+{((hubData.gridSalesPrice - hubData.marketPrice) / hubData.marketPrice * 100).toFixed(1)}%</div>
            <div className="text-sm text-purple-600">Premium vs Market</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Recent Grid Transactions</h3>
        <div className="space-y-4">
          {gridTransactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-neutral-gray50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <TrendingUp className={`h-5 w-5 ${
                    tx.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-neutral-gray900">{tx.poolName}</div>
                  <div className="text-sm text-neutral-gray600">{tx.amount} MWh → {tx.buyer}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-neutral-gray900">RM {tx.total.toLocaleString()}</div>
                <div className="text-sm text-neutral-gray600">{tx.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPoolingTab = () => (
    <div className="space-y-6">
      {/* Community Pools Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-gray900">Community Energy Pools</h2>
          <p className="text-neutral-gray600">Manage and monitor neighborhood energy pooling</p>
        </div>
        <button className="bg-primary-main text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create New Pool</span>
        </button>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {communityPools.map((pool) => (
          <div key={pool.id} className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-gray900">{pool.name}</h3>
                <div className="flex items-center space-x-2 text-neutral-gray600 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{pool.location}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                pool.status === 'active' ? 'bg-green-100 text-green-700' :
                pool.status === 'charging' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-neutral-gray50 rounded-xl">
                <div className="text-xl font-bold text-neutral-gray900">{pool.members}</div>
                <div className="text-sm text-neutral-gray600">Members</div>
              </div>
              <div className="text-center p-3 bg-neutral-gray50 rounded-xl">
                <div className="text-xl font-bold text-neutral-gray900">{pool.totalCapacity} MW</div>
                <div className="text-sm text-neutral-gray600">Total Capacity</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Current Output</span>
                <span className="font-semibold text-neutral-gray900">{pool.currentOutput} MW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Efficiency</span>
                <span className="font-semibold text-emerald-600">{(pool.efficiency * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Grid Price</span>
                <span className="font-semibold text-purple-600">RM {pool.priceToGrid}/kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-gray600">Monthly Revenue</span>
                <span className="font-semibold text-neutral-gray900">RM {pool.monthlyRevenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-primary-main text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                Manage Pool
              </button>
              <button className="flex-1 border border-neutral-gray300 text-neutral-gray700 py-2 px-4 rounded-lg font-medium hover:bg-neutral-gray50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderGridSalesTab = () => (
    <div className="space-y-6">
      {/* Grid Sales Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-gray900">Grid Trading Dashboard</h2>
          <p className="text-neutral-gray600">Monitor sales to national grid operators</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
            Grid Status: Online
          </div>
        </div>
      </div>

      {/* Today's Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8" />
            <span className="text-green-100">+18.5%</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">RM {hubData.todayRevenue.toLocaleString()}</h3>
          <p className="text-green-100">Today's Grid Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Battery className="h-8 w-8" />
            <span className="text-blue-100">Live</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">{hubData.totalPooledEnergy} MW</h3>
          <p className="text-blue-100">Current Pool Output</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8" />
            <span className="text-purple-100">Premium</span>
          </div>
          <h3 className="text-3xl font-bold mb-2">RM {hubData.gridSalesPrice}</h3>
          <p className="text-purple-100">Current Grid Price/kWh</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-gray900">Recent Grid Transactions</h3>
          <button className="text-primary-main hover:text-primary-600 font-medium">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-gray200">
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Pool</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Price</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Buyer</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-gray700">Time</th>
              </tr>
            </thead>
            <tbody>
              {gridTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-neutral-gray100 hover:bg-neutral-gray50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-neutral-gray900">{tx.poolName}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-neutral-gray900">{tx.amount} MWh</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-purple-600">RM {tx.price}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-green-600">RM {tx.total.toLocaleString()}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-neutral-gray700">{tx.buyer}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-neutral-gray600 text-sm">{tx.timestamp}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPricingTab = () => (
    <div className="space-y-6">
      {/* Pricing Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-gray900">Competitive Grid Pricing</h2>
        <p className="text-neutral-gray600">AI-powered pricing to maximize revenue from grid sales</p>
      </div>

      {/* Pricing Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-gray900 mb-2">Market Average</h3>
            <div className="text-3xl font-bold text-gray-700 mb-2">RM {hubData.marketPrice}</div>
            <div className="text-sm text-neutral-gray600">per kWh</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-main to-primary-600 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="text-center relative z-10">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Energy Hub Price</h3>
            <div className="text-3xl font-bold mb-2">RM {hubData.gridSalesPrice}</div>
            <div className="text-sm text-primary-100">per kWh</div>
            <div className="mt-3 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
              +{((hubData.gridSalesPrice - hubData.marketPrice) / hubData.marketPrice * 100).toFixed(1)}% Premium
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-gray900 mb-2">Guaranteed Floor</h3>
            <div className="text-3xl font-bold text-emerald-700 mb-2">RM 0.16</div>
            <div className="text-sm text-neutral-gray600">minimum per kWh</div>
          </div>
        </div>
      </div>

      {/* AI Pricing Insights */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">AI Pricing Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div>
                <div className="font-medium text-blue-900">Peak Demand Period</div>
                <div className="text-sm text-blue-700">6:00 PM - 9:00 PM</div>
              </div>
              <div className="text-xl font-bold text-blue-900">RM 0.28</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <div className="font-medium text-green-900">Optimal Selling Window</div>
                <div className="text-sm text-green-700">Next 2 hours</div>
              </div>
              <div className="text-xl font-bold text-green-900">RM 0.245</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div>
                <div className="font-medium text-yellow-900">Weekend Rate</div>
                <div className="text-sm text-yellow-700">Average pricing</div>
              </div>
              <div className="text-xl font-bold text-yellow-900">RM 0.185</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-neutral-gray200 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-5 w-5 text-primary-main" />
                <span className="font-medium text-neutral-gray900">Price Forecast</span>
              </div>
              <div className="text-sm text-neutral-gray600 space-y-2">
                <div className="flex justify-between">
                  <span>Next Hour:</span>
                  <span className="font-medium text-green-600">RM 0.235 (+6.8%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Next 4 Hours:</span>
                  <span className="font-medium text-blue-600">RM 0.225 (+2.3%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tomorrow:</span>
                  <span className="font-medium text-purple-600">RM 0.215 (-2.3%)</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Optimization Tip</span>
              </div>
              <p className="text-sm text-purple-700">
                Hold energy sales for the next 2 hours to capture peak demand pricing.
                Potential additional revenue: <span className="font-bold">RM 315</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-gray900">Performance Analytics</h2>
        <p className="text-neutral-gray600">Deep insights into Energy Hub performance and optimization</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-xl p-12 border border-neutral-gray200 shadow-sm text-center">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="h-12 w-12 text-primary-main" />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-gray900 mb-4">Advanced Analytics Coming Soon</h3>
        <p className="text-neutral-gray600 max-w-md mx-auto mb-6">
          We're building comprehensive analytics including community performance metrics, 
          revenue optimization insights, and predictive modeling for grid sales.
        </p>
        <button className="bg-primary-main text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
          Get Notified When Available
        </button>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Energy Hub Community Platform 🏘️
              </h1>
              <p className="text-emerald-100">
                Pool neighborhood solar & storage to sell excess energy to the national grid with competitive pricing
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-emerald-100">Total Hub Revenue</div>
              <div className="text-2xl font-bold">RM {hubData.monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-emerald-200">This month</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 border border-neutral-gray200 shadow-sm">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(`/energy-hub?tab=${tab.id}`)}
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

export default function EnergyHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading Energy Hub...</p>
        </div>
      </div>
    }>
      <EnergyHubContent />
    </Suspense>
  )
} 