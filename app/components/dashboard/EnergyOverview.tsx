'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Battery, Sun } from 'lucide-react'

interface EnergyOverviewProps {
  userRole: 'producer' | 'consumer' | 'trader' | 'dao_member' | 'hub_operator'
}

export default function EnergyOverview({ userRole }: EnergyOverviewProps) {
  const [energyData, setEnergyData] = useState({
    current: 8.5,
    today: 45.2,
    thisMonth: 1250,
    trend: '+12%'
  })

  // Simulate real-time energy data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prev => ({
        ...prev,
        current: Math.max(0, prev.current + (Math.random() - 0.5) * 2)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getOverviewData = () => {
    switch (userRole) {
      case 'producer':
        return {
          title: 'Solar Production Overview',
          subtitle: 'Real-time energy generation from your solar panels',
          currentLabel: 'Current Output',
          currentUnit: 'kW',
          todayLabel: 'Today\'s Production',
          monthLabel: 'This Month',
          monthUnit: 'kWh',
          icon: Sun,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        }
      case 'consumer':
        return {
          title: 'Energy Consumption Overview',
          subtitle: 'Track your energy usage and efficiency',
          currentLabel: 'Current Usage',
          currentUnit: 'kW',
          todayLabel: 'Today\'s Consumption',
          monthLabel: 'This Month',
          monthUnit: 'kWh',
          icon: null,
          customIcon: '⚡',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        }
      case 'trader':
        return {
          title: 'Trading Portfolio Overview',
          subtitle: 'Monitor your energy trading performance',
          currentLabel: 'Active Trades',
          currentUnit: 'kW',
          todayLabel: 'Today\'s Volume',
          monthLabel: 'This Month',
          monthUnit: 'kWh',
          icon: TrendingUp,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100'
        }
      case 'hub_operator':
        return {
          title: 'Energy Hub Management',
          subtitle: 'Community energy pooling and grid transactions',
          currentLabel: 'Total Pool Output',
          currentUnit: 'MW',
          todayLabel: 'Today\'s Grid Sales',
          monthLabel: 'This Month',
          monthUnit: 'MWh',
          icon: Battery,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-100'
        }
      default:
        return {
          title: 'Energy Overview',
          subtitle: 'Your energy metrics and performance',
          currentLabel: 'Current Activity',
          currentUnit: 'kW',
          todayLabel: 'Today\'s Activity',
          monthLabel: 'This Month',
          monthUnit: 'kWh',
          icon: null,
          customIcon: '⚡',
          color: 'text-primary-main',
          bgColor: 'bg-primary-main bg-opacity-10'
        }
    }
  }

  const overview = getOverviewData()

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-gray900">{overview.title}</h2>
          <p className="text-sm text-neutral-gray500">{overview.subtitle}</p>
        </div>
        <div className={`p-3 rounded-xl ${overview.bgColor}`}>
          {'customIcon' in overview ? (
            <span className={`text-2xl ${overview.color}`}>{overview.customIcon}</span>
          ) : overview.icon ? (
            <overview.icon className={`h-6 w-6 ${overview.color}`} />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Reading */}
        <div className="text-center p-4 bg-neutral-gray50 rounded-xl">
          <div className="text-2xl font-bold text-neutral-gray900 mb-1">
            {energyData.current.toFixed(1)}
          </div>
          <div className="text-sm text-neutral-gray500">{overview.currentLabel}</div>
          <div className="text-xs text-neutral-gray400">{overview.currentUnit}</div>
        </div>

        {/* Today's Data */}
        <div className="text-center p-4 bg-neutral-gray50 rounded-xl">
          <div className="text-2xl font-bold text-neutral-gray900 mb-1">
            {energyData.today}
          </div>
          <div className="text-sm text-neutral-gray500">{overview.todayLabel}</div>
          <div className="text-xs text-accent-emerald flex items-center justify-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            {energyData.trend}
          </div>
        </div>

        {/* Monthly Data */}
        <div className="text-center p-4 bg-neutral-gray50 rounded-xl">
          <div className="text-2xl font-bold text-neutral-gray900 mb-1">
            {energyData.thisMonth.toLocaleString()}
          </div>
          <div className="text-sm text-neutral-gray500">{overview.monthLabel}</div>
          <div className="text-xs text-neutral-gray400">{overview.monthUnit}</div>
        </div>
      </div>

      {/* Energy Flow Visualization */}
      <div className="mt-6 p-4 bg-gradient-to-r from-neutral-gray50 to-neutral-gray100 rounded-xl">
        <h3 className="text-sm font-medium text-neutral-gray700 mb-3">Energy Flow</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse"></div>
            <span className="text-sm text-neutral-gray600">
              {userRole === 'consumer' ? 'Grid → Home' : 'Solar → Grid'}
            </span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-neutral-gray200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-emerald to-primary-main energy-flow"></div>
          </div>
          <div className="text-sm font-medium text-neutral-gray700">
            {energyData.current.toFixed(1)} {overview.currentUnit}
          </div>
        </div>
      </div>
    </div>
  )
} 