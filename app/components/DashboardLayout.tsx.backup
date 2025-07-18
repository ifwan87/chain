'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import { 
  Home,
  TrendingUp, 
  ShoppingCart,
  Leaf,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, disconnectWallet } = useWallet()

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
    { name: 'Energy', href: '/energy', icon: Home },
    { name: 'Trading', href: '/trading', icon: TrendingUp },
    { name: 'Carbon Credits', href: '/carbon', icon: Leaf },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ]

  // Add role-specific menu items
  if (user?.role === 'producer' || user?.role === 'vpp_operator') {
    navigationItems.splice(4, 0, { name: 'VPP', href: '/vpp', icon: Users })
  }

  if (user?.role === 'dao_member' || user?.role === 'trader') {
    navigationItems.push({ name: 'Governance', href: '/governance', icon: Users })
  }

  return (
    <div className="min-h-screen bg-neutral-gray50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-gray200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-gray200">
            <div className="flex items-center space-x-1">
              <span className="text-xl">⚡</span>
              <span className="text-lg font-bold text-neutral-gray900">PowerChain</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-gray500 hover:text-neutral-gray700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-neutral-gray200">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{user?.avatar}</span>
              <div>
                <h3 className="font-medium text-neutral-gray900">{user?.name}</h3>
                <p className="text-sm text-neutral-gray500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-primary-main">{user?.energyCredits}</div>
                <div className="text-xs text-neutral-gray500">EC</div>
              </div>
              <div>
                <div className="text-lg font-bold text-secondary-main">{user?.governanceTokens}</div>
                <div className="text-xs text-neutral-gray500">GT</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent-emerald">{user?.carbonCredits}</div>
                <div className="text-xs text-neutral-gray500">CC</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-main text-white'
                      : 'text-neutral-gray700 hover:bg-neutral-gray100'
                  }`}
                >
                  {item.name === 'Energy' ? (
                    <span className="text-lg mr-3">⚡</span>
                  ) : (
                    <item.icon className="h-5 w-5 mr-3" />
                  )}
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-neutral-gray200">
            <Link
              href="/settings"
              className="flex items-center px-3 py-2 text-sm font-medium text-neutral-gray700 hover:bg-neutral-gray100 rounded-lg transition-colors duration-200"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
            <button
              onClick={disconnectWallet}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white border-b border-neutral-gray200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-neutral-gray500 hover:text-neutral-gray700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-neutral-gray900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-neutral-gray500 hover:text-neutral-gray700 rounded-lg hover:bg-neutral-gray100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Market Status Indicator */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent-emerald bg-opacity-10 text-accent-emerald rounded-full text-sm">
                <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse"></div>
                <span className="font-medium">Market Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 