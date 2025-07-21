'use client'

import { 
  ShoppingCart, 
  TrendingUp, 
  Plus,
  Eye,
  Users,
  Settings,
  BarChart3,
  Leaf
} from 'lucide-react'

interface QuickActionsProps {
  userRole: 'producer' | 'consumer' | 'trader' | 'dao_member' | 'hub_operator'
}

export default function QuickActions({ userRole }: QuickActionsProps) {
  const getActionsForRole = () => {
    const baseActions = [
      { name: 'View Marketplace', icon: Eye, href: '/marketplace', color: 'bg-blue-500' },
      { name: 'Buy Energy', icon: ShoppingCart, href: '/marketplace?action=buy', color: 'bg-green-500' },
      { name: 'Carbon Credits', icon: Leaf, href: '/carbon', color: 'bg-emerald-500' },
    ]

    switch (userRole) {
      case 'producer':
        return [
          ...baseActions,
          { name: 'Sell Energy', icon: TrendingUp, href: '/marketplace?action=sell', color: 'bg-purple-500' },
          { name: 'Monitor Production', icon: null, href: '/energy', color: 'bg-yellow-500', customIcon: '⚡' },
          { name: 'Join Energy Hub', icon: Users, href: '/energy-hub', color: 'bg-indigo-500' },
        ]
      case 'consumer':
        return [
          ...baseActions,
          { name: 'Energy Usage', icon: BarChart3, href: '/energy', color: 'bg-orange-500' },
          { name: 'Smart Settings', icon: Settings, href: '/settings', color: 'bg-gray-500' },
        ]
      case 'trader':
        return [
          ...baseActions,
          { name: 'Sell Energy', icon: TrendingUp, href: '/marketplace?action=sell', color: 'bg-purple-500' },
          { name: 'Trading Analytics', icon: BarChart3, href: '/analytics', color: 'bg-red-500' },
          { name: 'Portfolio', icon: Eye, href: '/trading', color: 'bg-pink-500' },
        ]
      case 'dao_member':
        return [
          ...baseActions,
          { name: 'Governance', icon: Users, href: '/governance', color: 'bg-cyan-500' },
          { name: 'Vote on Proposals', icon: Plus, href: '/governance?tab=voting', color: 'bg-teal-500' },
        ]
      case 'hub_operator':
        return [
          ...baseActions,
          { name: 'Manage Energy Hub', icon: Users, href: '/energy-hub', color: 'bg-indigo-500' },
          { name: 'Grid Analytics', icon: BarChart3, href: '/analytics', color: 'bg-red-500' },
          { name: 'Community Pool', icon: null, href: '/energy-hub?tab=pooling', color: 'bg-emerald-500', customIcon: '🏘️' },
        ]
      default:
        return baseActions
    }
  }

  const actions = getActionsForRole()

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-gray900 mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="group flex flex-col items-center p-3 rounded-xl border border-neutral-gray200 hover:border-neutral-gray300 hover:shadow-md transition-all duration-200 min-w-[120px] flex-shrink-0"
          >
            <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              {'customIcon' in action ? (
                <span className="text-2xl">{action.customIcon}</span>
              ) : action.icon ? (
                <action.icon className="h-6 w-6 text-white" />
              ) : null}
            </div>
            <span className="text-sm font-medium text-neutral-gray700 text-center">
              {action.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
} 