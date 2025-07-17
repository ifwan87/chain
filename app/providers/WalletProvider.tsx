'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface User {
  id: string
  address: string
  role: 'producer' | 'consumer' | 'trader' | 'dao_member' | 'vpp_operator'
  name: string
  avatar?: string
  energyCredits: number
  governanceTokens: number
  carbonCredits: number
}

interface WalletContextType {
  isConnected: boolean
  user: User | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: 'user_1',
    address: '0x1234...5678',
    role: 'producer',
    name: 'Alice Chen',
    avatar: '👩‍💼',
    energyCredits: 450,
    governanceTokens: 100,
    carbonCredits: 25
  },
  {
    id: 'user_2',
    address: '0x8765...4321',
    role: 'consumer',
    name: 'Bob Smith',
    avatar: '👨‍🔧',
    energyCredits: 150,
    governanceTokens: 50,
    carbonCredits: 12
  },
  {
    id: 'user_3',
    address: '0xabcd...efgh',
    role: 'trader',
    name: 'Carol Wang',
    avatar: '👩‍💻',
    energyCredits: 850,
    governanceTokens: 200,
    carbonCredits: 45
  }
]

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user was previously connected
    const savedUser = localStorage.getItem('powerchain_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsConnected(true)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('powerchain_user')
      }
    }
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real implementation, this would integrate with MasChain wallet
      // For demo purposes, we'll randomly select a mock user
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
      
      setUser(randomUser)
      setIsConnected(true)
      
      // Save to localStorage for persistence
      localStorage.setItem('powerchain_user', JSON.stringify(randomUser))
      
      toast.success(`Connected as ${randomUser.name}! Welcome to PowerChain.`)
    } catch (error) {
      console.error('Wallet connection failed:', error)
      toast.error('Failed to connect wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setUser(null)
    setIsConnected(false)
    localStorage.removeItem('powerchain_user')
    toast.success('Wallet disconnected successfully.')
  }

  const value = {
    isConnected,
    user,
    connectWallet,
    disconnectWallet,
    isLoading
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
} 