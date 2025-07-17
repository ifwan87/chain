'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWallet } from '../providers/WalletProvider'
import { 
  Menu, 
  X, 
  TrendingUp, 
  Settings, 
  LogOut,
  User,
  Wallet
} from 'lucide-react'

interface NavigationProps {
  onMarketplaceClick: () => void
  onConnectWallet: () => void
}

export default function Navigation({ onMarketplaceClick, onConnectWallet }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected, user, disconnectWallet } = useWallet()

  const navigationItems = [
    { name: 'Home', href: '/', current: true },
    { name: 'Marketplace', href: '#', onClick: onMarketplaceClick },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ]

  const userMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: TrendingUp },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 nav-backdrop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-neutral-gray900">PowerChain</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                className={`text-sm font-medium transition-colors duration-200 ${
                  item.current 
                    ? 'text-primary-main' 
                    : 'text-neutral-gray600 hover:text-neutral-gray900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* User Menu / Connect Wallet */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected && user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-neutral-gray50 hover:bg-neutral-gray100 px-3 py-2 rounded-lg transition-colors duration-200">
                  <span className="text-lg">{user.avatar}</span>
                  <span className="text-sm font-medium text-neutral-gray700">{user.name}</span>
                  <div className="flex flex-col text-xs text-neutral-gray500">
                    <span>{user.energyCredits} EC</span>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-gray200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-gray700 hover:bg-neutral-gray50"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <hr className="my-2 border-neutral-gray200" />
                    <button
                      onClick={disconnectWallet}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="btn-primary flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-gray600 hover:text-neutral-gray900 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-gray200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.onClick?.()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-gray600 hover:text-neutral-gray900 hover:bg-neutral-gray50 rounded-md"
                >
                  {item.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-neutral-gray200">
                {isConnected && user ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <span className="text-lg">{user.avatar}</span>
                      <div>
                        <div className="text-sm font-medium text-neutral-gray900">{user.name}</div>
                        <div className="text-xs text-neutral-gray500">{user.energyCredits} Energy Credits</div>
                      </div>
                    </div>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-neutral-gray600 hover:text-neutral-gray900 hover:bg-neutral-gray50 rounded-md"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                    <button
                      onClick={disconnectWallet}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onConnectWallet()
                      setIsMenuOpen(false)
                    }}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 