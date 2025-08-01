'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import masChainWallet, { MasChainAccount, EnergyTransaction } from '../services/maschain-wallet'

interface WalletContextType {
  isConnected: boolean
  account: MasChainAccount | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isLoading: boolean
  isInitializing: boolean // NEW: Track initial connection restoration
  buyEnergy: (sellerId: string, amount: number, price: number, energyAmount: number) => Promise<EnergyTransaction>
  refreshBalance: () => Promise<void>
  // Legacy user interface for backward compatibility
  user: any
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<MasChainAccount | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true) // NEW: Track initialization
  const [balanceUpdateCounter, setBalanceUpdateCounter] = useState(0)

  useEffect(() => {
    // Set up wallet event listeners
    masChainWallet.on('connect', handleWalletConnect)
    masChainWallet.on('disconnect', handleWalletDisconnect)
    masChainWallet.on('balanceChanged', handleBalanceChanged)
    masChainWallet.on('transactionComplete', handleTransactionComplete)
    masChainWallet.on('sellerNotification', handleSellerNotification)
    masChainWallet.on('sellerResponse', handleSellerResponse)

    // Check for persisted wallet connection
    initializeWalletConnection()

    return () => {
      masChainWallet.off('connect', handleWalletConnect)
      masChainWallet.off('disconnect', handleWalletDisconnect)
      masChainWallet.off('balanceChanged', handleBalanceChanged)
      masChainWallet.off('transactionComplete', handleTransactionComplete)
      masChainWallet.off('sellerNotification', handleSellerNotification)
      masChainWallet.off('sellerResponse', handleSellerResponse)
    }
  }, [])

  const initializeWalletConnection = async () => {
    try {
      console.log('🔄 Initializing wallet connection...')
      
      // Check if there's a persisted wallet connection
      const persistedConnection = localStorage.getItem('maschain_connected')
      const persistedAddress = localStorage.getItem('maschain_address')
      
      if (persistedConnection === 'true' && persistedAddress) {
        console.log('🔄 Restoring persisted wallet connection for:', persistedAddress)
        
        // Restore wallet connection with current balance
        const balance = await masChainWallet.getBalance(persistedAddress)
        const restoredAccount: MasChainAccount = {
          address: persistedAddress,
          balance,
          publicKey: `0x${Math.random().toString(16).substr(2, 64)}`,
          isConnected: true
        }
        
        // Restore account in masChainWallet
        masChainWallet['account'] = restoredAccount
        
        setAccount(restoredAccount)
        setIsConnected(true)
        
        console.log('✅ Wallet connection restored successfully with balance:', balance)
      } else {
        console.log('🔄 No persisted wallet connection found')
      }
    } catch (error) {
      console.error('❌ Failed to restore wallet connection:', error)
      // Clear invalid persisted data
      localStorage.removeItem('maschain_connected')
      localStorage.removeItem('maschain_address')
    } finally {
      setIsInitializing(false) // IMPORTANT: Mark initialization as complete
      console.log('✅ Wallet initialization complete')
    }
  }

  const handleWalletConnect = (account: MasChainAccount) => {
    console.log('💰 Wallet connected with balance:', account.balance)
    setAccount(account)
    setIsConnected(true)
    setBalanceUpdateCounter(prev => prev + 1)
    
    // Persist wallet connection
    localStorage.setItem('maschain_connected', 'true')
    localStorage.setItem('maschain_address', account.address)
    
    toast.success(`�� Wallet connected! Address: ${account.address.slice(0, 6)}...${account.address.slice(-4)}`)
  }

  const handleWalletDisconnect = () => {
    setAccount(null)
    setIsConnected(false)
    setBalanceUpdateCounter(0)
    
    // Clear persisted wallet connection
    localStorage.removeItem('maschain_connected')
    localStorage.removeItem('maschain_address')
    
    toast.success('Wallet disconnected')
  }

  const handleBalanceChanged = (newBalance: MasChainAccount['balance']) => {
    console.log('💰 Balance changed event received:', newBalance)
    
    // IMPROVED: Force immediate state update
    setAccount(prevAccount => {
      if (prevAccount) {
        const updatedAccount = { ...prevAccount, balance: newBalance }
        console.log('💰 Account state updated immediately:', updatedAccount)
        return updatedAccount
      }
      return prevAccount
    })
    
    // Force re-render
    setBalanceUpdateCounter(prev => prev + 1)
    
    // ALSO: Update stored balance to ensure persistence
    if (account?.address) {
      const storedBalances = JSON.parse(localStorage.getItem('maschain_balances') || '{}')
      storedBalances[account.address] = newBalance
      localStorage.setItem('maschain_balances', JSON.stringify(storedBalances))
    }
  }

  const handleTransactionComplete = (transaction: EnergyTransaction) => {
    toast.success(`✅ Transaction confirmed! TxHash: ${transaction.blockHash?.slice(0, 8)}...`)
    
    // IMPROVED: Immediate balance refresh after transaction
    setTimeout(async () => {
      console.log('🔄 Auto-refreshing balance after transaction...')
      await refreshBalance()
    }, 500) // Shorter delay for faster updates
  }

  const handleSellerNotification = (notification: any) => {
    toast(`🔔 ${notification.message}`, { duration: 4000 })
  }

  const handleSellerResponse = (response: any) => {
    if (response.approved) {
      toast.success(`✅ ${response.message}`)
    } else {
      toast.error(`❌ ${response.message}`)
    }
  }

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      await masChainWallet.connect()
    } catch (error) {
      console.error('Wallet connection failed:', error)
      toast.error('Failed to connect wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    masChainWallet.disconnect()
  }

  const buyEnergy = async (
    sellerId: string, 
    amount: number, 
    price: number, 
    energyAmount: number
  ): Promise<EnergyTransaction> => {
    if (!account) {
      throw new Error('Wallet not connected')
    }

    toast.loading('Preparing transaction...', { id: 'energy-purchase' })

    try {
      const transaction = await masChainWallet.createEnergyTransaction({
        to: sellerId,
        amount,
        energyAmount,
        price,
        metadata: {
          energyType: 'solar',
          sellerName: 'Bob Smith',
          location: 'Selangor'
        }
      })

      toast.success('Transaction submitted!', { id: 'energy-purchase' })
      
      // IMPROVED: Immediate balance update after transaction
      console.log('🔄 Updating balance immediately after transaction...')
      
      // Notify the seller
      await masChainWallet.notifySeller(transaction)
      
      // Simulate seller approval process
      masChainWallet.simulateSellerApproval(transaction.id, true)

      return transaction

    } catch (error: any) {
      toast.error(error.message, { id: 'energy-purchase' })
      throw error
    }
  }

  const refreshBalance = async () => {
    if (account) {
      try {
        console.log('💰 Refreshing balance for address:', account.address)
        const newBalance = await masChainWallet.getBalance(account.address)
        console.log('💰 New balance received:', newBalance)
        
        setAccount(prevAccount => {
          if (prevAccount) {
            const updatedAccount = { ...prevAccount, balance: newBalance }
            console.log('�� Balance refreshed successfully:', updatedAccount)
            return updatedAccount
          }
          return prevAccount
        })
        
        setBalanceUpdateCounter(prev => prev + 1)
        
        // Also update the masChainWallet's account
        if (masChainWallet['account']) {
          masChainWallet['account'].balance = newBalance
        }
        
        toast.success('Balance refreshed!')
      } catch (error) {
        console.error('Failed to refresh balance:', error)
        toast.error('Failed to refresh balance')
      }
    }
  }

  // Create legacy user object for backward compatibility
  const legacyUser = account ? {
    id: account.address,
    address: account.address,
    role: 'producer' as const,
    name: 'Energy Trader',
    avatar: '⚡',
    energyCredits: account.balance.EC,
    governanceTokens: account.balance.GT,
    carbonCredits: account.balance.CC,
    _balanceUpdateCounter: balanceUpdateCounter
  } : null

  const value = {
    isConnected,
    account,
    connectWallet,
    disconnectWallet,
    isLoading,
    isInitializing, // NEW: Expose initialization state
    buyEnergy,
    refreshBalance,
    user: legacyUser
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
