'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Leaf,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

export default function AnalyticsPage() {
  const { isConnected, user, isInitializing } = useWallet()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 2847.50,
    totalEnergyTraded: 1256.8, // kWh
    totalCarbonOffset: 156.8, // kg CO2
    profitMargin: 23.5, // %
    tradingVolume: 89.2, // %
    efficiency: 94.7, // %
    activeUsers: 1247,
    marketShare: 12.3, // %
    growthRate: 15.8, // %
    carbonImpact: 78.4 // kg CO2 saved
  })

  const [tradingHistory, setTradingHistory] = useState([
    { date: '2024-01-22', energy: 45.2, revenue: 125.50, carbonOffset: 12.5, type: 'solar' },
    { date: '2024-01-21', energy: 38.7, revenue: 108.30, carbonOffset: 9.8, type: 'wind' },
    { date: '2024-01-20', energy: 52.1, revenue: 145.80, carbonOffset: 15.2, type: 'solar' },
    { date: '2024-01-19', energy: 29.4, revenue: 82.20, carbonOffset: 7.4, type: 'storage' },
    { date: '2024-01-18', energy: 41.8, revenue: 117.00, carbonOffset: 11.3, type: 'solar' },
    { date: '2024-01-17', energy: 33.5, revenue: 93.80, carbonOffset: 8.9, type: 'wind' },
    { date: '2024-01-16', energy: 48.9, revenue: 136.90, carbonOffset: 13.7, type: 'solar' }
  ])

  const [energyBreakdown, setEnergyBreakdown] = useState([
    { type: 'Solar', percentage: 45, value: 565.6, color: 'bg-yellow-500' },
    { type: 'Wind', percentage: 28, value: 351.9, color: 'bg-blue-500' },
    { type: 'Storage', percentage: 18, value: 226.2, color: 'bg-purple-500' },
    { type: 'Grid', percentage: 9, value: 113.1, color: 'bg-green-500' }
  ])

  const [performanceMetrics, setPerformanceMetrics] = useState([
    {
      name: 'Revenue Growth',
      value: '+15.8%',
      change: '+2.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      name: 'Energy Efficiency',
      value: '94.7%',
      change: '+1.2%',
      trend: 'up',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      name: 'Carbon Impact',
      value: '156.8 kg',
      change: '+12.5 kg',
      trend: 'up',
      icon: Leaf,
      color: 'text-emerald-600'
    },
    {
      name: 'Market Share',
      value: '12.3%',
      change: '+0.8%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    }
  ])

  useEffect(() => {
    if (!isInitializing && !isConnected) {
      router.push('/')
    }
  }, [isConnected, isInitializing, router])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        totalRevenue: Math.round((prev.totalRevenue + (Math.random() * 5)) * 100) / 100,
        totalEnergyTraded: Math.round((prev.totalEnergyTraded + (Math.random() * 2)) * 100) / 100,
        totalCarbonOffset: Math.round((prev.totalCarbonOffset + (Math.random() * 0.5)) * 100) / 100
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading Analytics...</p>
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
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'trading', name: 'Trading', icon: TrendingUp },
    { id: 'energy', name: 'Energy', icon: Zap },
    { id: 'carbon', name: 'Carbon Impact', icon: Leaf },
    { id: 'performance', name: 'Performance', icon: Eye }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'trading':
        return renderTradingTab()
      case 'energy':
        return renderEnergyTab()
      case 'carbon':
        return renderCarbonTab()
      case 'performance':
        return renderPerformanceTab()
      default:
        return renderOverviewTab()
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${metric.color.split('-')[1]}-100 rounded-xl flex items-center justify-center`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-gray900">{metric.value}</h3>
            <p className="text-neutral-gray600">{metric.name}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-gray900">Revenue Trend</h3>
          <div className="flex items-center space-x-2">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-neutral-gray300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="p-2 text-neutral-gray500 hover:text-neutral-gray700 rounded-lg hover:bg-neutral-gray100">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-gray600">Revenue chart visualization</p>
            <p className="text-sm text-neutral-gray500">Interactive chart showing revenue trends over time</p>
          </div>
        </div>
      </div>

      {/* Energy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Energy Source Breakdown</h3>
          <div className="space-y-4">
            {energyBreakdown.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${source.color} rounded-full`}></div>
                  <span className="font-medium text-neutral-gray900">{source.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-neutral-gray900">{source.percentage}%</div>
                  <div className="text-sm text-neutral-gray600">{source.value} kWh</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Recent Trading Activity</h3>
          <div className="space-y-4">
            {tradingHistory.slice(0, 5).map((trade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-gray50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trade.type === 'solar' ? 'bg-yellow-500' :
                    trade.type === 'wind' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-neutral-gray900">{trade.energy} kWh</div>
                    <div className="text-sm text-neutral-gray600">{new Date(trade.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-neutral-gray900">RM {trade.revenue}</div>
                  <div className="text-sm text-green-600">+{trade.carbonOffset} kg CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTradingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Trading Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-700">RM {analyticsData.totalRevenue}</div>
            <div className="text-sm text-green-600">Total Revenue</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-700">{analyticsData.totalEnergyTraded} kWh</div>
            <div className="text-sm text-blue-600">Energy Traded</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-700">{analyticsData.profitMargin}%</div>
            <div className="text-sm text-purple-600">Profit Margin</div>
          </div>
        </div>

        <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-gray600">Trading volume and price charts</p>
            <p className="text-sm text-neutral-gray500">Detailed trading analytics and market insights</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEnergyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Energy Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-3xl font-bold text-yellow-700">{analyticsData.efficiency}%</div>
            <div className="text-sm text-yellow-600">System Efficiency</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-700">{analyticsData.tradingVolume}%</div>
            <div className="text-sm text-blue-600">Trading Volume</div>
          </div>
        </div>

        <div className="h-64 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-neutral-gray600">Energy production and consumption analytics</p>
            <p className="text-sm text-neutral-gray500">Real-time energy flow and efficiency metrics</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCarbonTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Carbon Impact Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <div className="text-3xl font-bold text-emerald-700">{analyticsData.totalCarbonOffset} kg</div>
            <div className="text-sm text-emerald-600">Total CO₂ Offset</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-700">{analyticsData.carbonImpact} kg</div>
            <div className="text-sm text-green-600">This Month</div>
          </div>
        </div>

        <div className="h-64 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Leaf className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <p className="text-neutral-gray600">Carbon offset tracking and impact visualization</p>
            <p className="text-sm text-neutral-gray500">Environmental impact metrics and sustainability goals</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-700">{analyticsData.marketShare}%</div>
            <div className="text-sm text-purple-600">Market Share</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-700">{analyticsData.growthRate}%</div>
            <div className="text-sm text-blue-600">Growth Rate</div>
          </div>
        </div>

        <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Eye className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-neutral-gray600">Performance dashboard and KPI tracking</p>
            <p className="text-sm text-neutral-gray500">Comprehensive performance analytics and insights</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Analytics 📊
              </h1>
              <p className="text-blue-100">
                Comprehensive insights into your energy trading performance and carbon impact
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Total Revenue</div>
              <div className="text-2xl font-bold">RM {analyticsData.totalRevenue}</div>
              <div className="text-xs text-blue-200">+{analyticsData.growthRate}% this month</div>
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