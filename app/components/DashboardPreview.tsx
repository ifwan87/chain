'use client'

import { TrendingUp, Users, Leaf, BarChart3, Eye } from 'lucide-react'

interface DashboardPreviewProps {
  onConnectWallet: () => void
}

export default function DashboardPreview({ onConnectWallet }: DashboardPreviewProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-gray50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-gray900 mb-4">
            Your Energy Trading Dashboard
          </h2>
          <p className="text-xl text-neutral-gray600 max-w-3xl mx-auto">
            Get complete control over your energy trading with our comprehensive dashboard. 
            Monitor, trade, and earn from renewable energy in real-time.
          </p>
        </div>

        {/* Dashboard Preview Image/Mockup */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-gray200 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gradient-hero p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xl">⚡</span>
                  <span className="text-white font-bold text-lg">PowerChain Dashboard</span>
                </div>
                <div className="text-white text-right">
                  <div className="text-sm opacity-80">Your Balance</div>
                  <div className="text-xl font-bold">150 EC</div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Preview */}
            <div className="p-6 bg-neutral-gray50">
              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-neutral-gray200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-neutral-gray900">View Marketplace</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-neutral-gray200">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-neutral-gray900">Buy Energy</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-neutral-gray200">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-neutral-gray900">Energy Usage</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-neutral-gray200">
                  <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-sm font-medium text-neutral-gray900">Smart Settings</div>
                </div>
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Energy Overview */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-neutral-gray200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-gray900">Energy Consumption Overview</h3>
                    <span className="text-primary-main">⚡</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-gray900">10.4</div>
                      <div className="text-sm text-neutral-gray600">Current Usage</div>
                      <div className="text-xs text-neutral-gray500">kW</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-gray900">45.2</div>
                      <div className="text-sm text-neutral-gray600">Today's Consumption</div>
                      <div className="text-xs text-green-600">↗ +12%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-gray900">1,250</div>
                      <div className="text-sm text-neutral-gray600">This Month</div>
                      <div className="text-xs text-neutral-gray500">kWh</div>
                    </div>
                  </div>
                  
                  {/* Energy Flow Visualization */}
                  <div className="mt-6">
                    <div className="text-sm text-neutral-gray600 mb-2">Energy Flow</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-neutral-gray600">Grid → Home</span>
                      <div className="flex-1 bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                      </div>
                      <span className="text-sm font-medium text-neutral-gray900">10.4 kW</span>
                    </div>
                  </div>
                </div>

                {/* Carbon Credits */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-gray900">Carbon Credits</h3>
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600 mb-1">25.5</div>
                    <div className="text-sm text-neutral-gray600">Total Carbon Credits</div>
                    <div className="text-xs text-green-600">↗ +8.2 this month</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-gray600">CO₂ Offset</span>
                      <span className="font-medium">12.8 Tons</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-gray600">Trees Planted*</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-800 font-medium mb-1">Environmental Impact</div>
                    <div className="text-xs text-green-700">
                      Your renewable energy contribution is equivalent to removing a car from the road for 3.2 days this month.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Performance */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-neutral-gray200">
                <h3 className="text-lg font-semibold text-neutral-gray900 mb-4">Trading Performance</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">RM 245.67</div>
                    <div className="text-sm text-neutral-gray600">Total Profit</div>
                    <div className="text-xs text-green-600">↗ +15.2%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-main">1245 kWh</div>
                    <div className="text-sm text-neutral-gray600">Volume Traded</div>
                    <div className="text-xs text-primary-main">↗ +8.5%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-neutral-gray900">RM 0.19</div>
                    <div className="text-sm text-neutral-gray600">Avg. Price</div>
                    <div className="text-xs text-red-600">↘ -2.1%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-neutral-gray600">Success Rate</div>
                    <div className="text-xs text-green-600">↗ +3.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Call-to-Action */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
            <div className="text-center">
              <button
                onClick={onConnectWallet}
                className="btn-cta px-8 py-4 text-lg font-semibold"
              >
                Connect Wallet to Access Dashboard
              </button>
              <p className="text-white text-sm mt-2 opacity-90">
                Start trading renewable energy in seconds
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-main bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-primary-main" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-gray900 mb-2">Real-Time Trading</h3>
            <p className="text-neutral-gray600">
              Monitor energy prices and execute trades instantly with our advanced trading interface.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-secondary-main bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-secondary-main" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-gray900 mb-2">Carbon Credit Rewards</h3>
            <p className="text-neutral-gray600">
              Earn carbon credits automatically for using renewable energy and contributing to sustainability.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-accent-emerald bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-accent-emerald" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-gray900 mb-2">Advanced Analytics</h3>
            <p className="text-neutral-gray600">
              Get insights into your energy consumption patterns and optimize your trading strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 