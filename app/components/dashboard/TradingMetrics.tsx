'use client'

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface TradingMetricsProps {
  userId: string
}

export default function TradingMetrics({ userId }: TradingMetricsProps) {
  const tradingData = {
    totalProfit: 245.67,
    profitTrend: '+15.2%',
    volumeTraded: 1245,
    avgPrice: 0.19,
    successRate: 87,
    activeTrades: 3
  }

  const metrics = [
    {
      title: 'Total Profit',
      value: `RM ${tradingData.totalProfit}`,
      change: tradingData.profitTrend,
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Volume Traded',
      value: `${tradingData.volumeTraded} kWh`,
      change: '+8.5%',
      changeType: 'positive',
      icon: null,
      customIcon: '⚡',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Avg. Price',
      value: `RM ${tradingData.avgPrice}`,
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Success Rate',
      value: `${tradingData.successRate}%`,
      change: '+3.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-gray900">Trading Performance</h2>
          <p className="text-sm text-neutral-gray500">Your energy trading metrics and performance</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-neutral-gray500">Active Trades</div>
          <div className="text-xl font-bold text-primary-main">{tradingData.activeTrades}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-neutral-gray50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                {'customIcon' in metric ? (
                  <span className={`text-lg ${metric.color}`}>{metric.customIcon}</span>
                ) : metric.icon ? (
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                ) : null}
              </div>
              <div className={`flex items-center text-xs ${
                metric.changeType === 'positive' 
                  ? 'text-accent-emerald' 
                  : 'text-red-500'
              }`}>
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-lg font-bold text-neutral-gray900 mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-neutral-gray500">
              {metric.title}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h3 className="text-sm font-medium text-neutral-gray700 mb-3">7-Day Performance</h3>
        <div className="flex items-end justify-between h-16 space-x-1">
          {[45, 62, 58, 78, 85, 72, 90].map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-primary-main to-secondary-main rounded-t flex-1"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-neutral-gray500 mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  )
} 