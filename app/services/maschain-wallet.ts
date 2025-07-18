'use client'

// MasChain Wallet Integration Service
export interface MasChainAccount {
  address: string
  balance: {
    EC: number  // Energy Credits
    GT: number  // Governance Tokens
    CC: number  // Carbon Credits
    native: string // Native MAS tokens
  }
  publicKey: string
  isConnected: boolean
}

export interface EnergyTransaction {
  id: string
  from: string
  to: string
  amount: number // kWh
  price: number // RM per kWh
  total: number // Total RM
  timestamp: Date
  status: 'pending' | 'confirmed' | 'failed'
  blockHash?: string
  gasUsed?: string
}

export interface TransactionRequest {
  to: string
  amount: number
  energyAmount: number
  price: number
  metadata?: {
    energyType: 'solar' | 'wind' | 'storage'
    sellerName: string
    location: string
  }
}

declare global {
  interface Window {
    maschain?: {
      isConnected: boolean
      connect: () => Promise<string[]>
      disconnect: () => Promise<void>
      getAccounts: () => Promise<string[]>
      getBalance: (address: string) => Promise<any>
      signTransaction: (tx: any) => Promise<string>
      sendTransaction: (tx: any) => Promise<string>
      on: (event: string, callback: (data: any) => void) => void
      off: (event: string, callback: (data: any) => void) => void
    }
  }
}

class MasChainWalletService {
  public account: MasChainAccount | null = null // Made public for access
  private listeners: { [key: string]: Function[] } = {}
  private storedBalance: { [address: string]: MasChainAccount['balance'] } = {}

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeEventListeners()
      // Load stored balance from localStorage
      this.loadStoredBalance()
    }
  }

  private loadStoredBalance() {
    try {
      const stored = localStorage.getItem('maschain_balances')
      if (stored) {
        this.storedBalance = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load stored balance:', error)
    }
  }

  private saveStoredBalance() {
    try {
      localStorage.setItem('maschain_balances', JSON.stringify(this.storedBalance))
    } catch (error) {
      console.error('Failed to save stored balance:', error)
    }
  }

  private initializeEventListeners() {
    if (window.maschain) {
      window.maschain.on('accountsChanged', this.handleAccountsChanged.bind(this))
      window.maschain.on('disconnect', this.handleDisconnect.bind(this))
    }
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      this.handleDisconnect()
    } else {
      this.emit('accountChanged', accounts[0])
    }
  }

  private handleDisconnect() {
    this.account = null
    this.emit('disconnect', null)
  }

  private emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }

  public on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  public off(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  public async isWalletAvailable(): Promise<boolean> {
    // Check if MasChain wallet is installed
    if (typeof window !== 'undefined' && window.maschain) {
      return true
    }
    
    // For demo purposes, simulate wallet availability
    return typeof window !== 'undefined'
  }

  public async connect(): Promise<MasChainAccount> {
    try {
      if (!await this.isWalletAvailable()) {
        throw new Error('MasChain wallet not found. Please install MasChain wallet extension.')
      }

      let accounts: string[]

      if (window.maschain) {
        // Real MasChain wallet integration
        accounts = await window.maschain.connect()
      } else {
        // Demo mode - simulate wallet connection
        await new Promise(resolve => setTimeout(resolve, 1500))
        accounts = [`0x${Math.random().toString(16).substr(2, 40)}`]
      }

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please create or import an account in your MasChain wallet.')
      }

      const address = accounts[0]
      const balance = await this.getBalance(address)

      this.account = {
        address,
        balance,
        publicKey: `0x${Math.random().toString(16).substr(2, 64)}`, // Simulated for demo
        isConnected: true
      }

      this.emit('connect', this.account)
      return this.account

    } catch (error) {
      console.error('MasChain wallet connection failed:', error)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    if (window.maschain) {
      await window.maschain.disconnect()
    }
    
    this.account = null
    this.emit('disconnect', null)
  }

  public async getBalance(address: string): Promise<MasChainAccount['balance']> {
    try {
      if (window.maschain) {
        // Real wallet balance
        const balance = await window.maschain.getBalance(address)
        return {
          EC: balance.energyCredits || 0,
          GT: balance.governanceTokens || 0,
          CC: balance.carbonCredits || 0,
          native: balance.native || '0'
        }
      } else {
        // Demo balance - Fixed persistent balance instead of random!
        if (!this.storedBalance[address]) {
          // Initialize balance only once for new addresses
          this.storedBalance[address] = {
            EC: 500, // Starting balance
            GT: 100,
            CC: 25,
            native: `${(Math.random() * 10).toFixed(2)} MAS`
          }
          this.saveStoredBalance()
        }
        return { ...this.storedBalance[address] }
      }
    } catch (error) {
      console.error('Failed to get balance:', error)
      throw new Error('Failed to retrieve balance')
    }
  }

  public async createEnergyTransaction(request: TransactionRequest): Promise<EnergyTransaction> {
    if (!this.account) {
      throw new Error('Wallet not connected')
    }

    // Check if user has sufficient balance
    const totalCost = request.amount
    if (this.account.balance.EC < totalCost) {
      throw new Error(`Insufficient Energy Credits. You have ${this.account.balance.EC} EC, but need ${totalCost} EC`)
    }

    const transaction: EnergyTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      from: this.account.address,
      to: request.to,
      amount: request.energyAmount,
      price: request.price,
      total: request.amount,
      timestamp: new Date(),
      status: 'pending'
    }

    try {
      // Prepare blockchain transaction
      const blockchainTx = {
        to: request.to,
        value: totalCost.toString(),
        data: JSON.stringify({
          type: 'energy_purchase',
          energyAmount: request.energyAmount,
          pricePerKwh: request.price,
          metadata: request.metadata
        }),
        gasLimit: '21000',
        gasPrice: '20000000000' // 20 Gwei
      }

      if (window.maschain) {
        // Real blockchain transaction
        const txHash = await window.maschain.sendTransaction(blockchainTx)
        transaction.blockHash = txHash
        transaction.status = 'confirmed'
      } else {
        // Demo transaction - simulate blockchain delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        transaction.blockHash = `0x${Math.random().toString(16).substr(2, 64)}`
        transaction.status = 'confirmed'
      }

      // Update local balance - FIXED: Properly deduct cost and add carbon credits
      const previousEC = this.account.balance.EC
      this.account.balance.EC -= totalCost
      
      if (request.metadata?.energyType === 'solar') {
        // Add carbon credits for renewable energy purchase
        this.account.balance.CC += Math.floor(request.energyAmount * 0.05) // 0.05 CC per kWh
      }
      
      console.log(`💰 Balance update: EC ${previousEC} -> ${this.account.balance.EC} (${-totalCost})`)
      
      // Update stored balance
      this.storedBalance[this.account.address] = { ...this.account.balance }
      this.saveStoredBalance()
      
      this.emit('balanceChanged', this.account.balance)
      this.emit('transactionComplete', transaction)

      return transaction

    } catch (error) {
      transaction.status = 'failed'
      console.error('Transaction failed:', error)
      throw new Error(`Transaction failed: ${error.message}`)
    }
  }

  public getAccount(): MasChainAccount | null {
    return this.account
  }

  public isConnected(): boolean {
    return this.account?.isConnected || false
  }

  // Set account - for external updates
  public setAccount(account: MasChainAccount | null): void {
    this.account = account
    if (account) {
      this.storedBalance[account.address] = { ...account.balance }
      this.saveStoredBalance()
    }
  }

  // Generate transaction notification for seller
  public async notifySeller(transaction: EnergyTransaction): Promise<void> {
    // In a real app, this would send a push notification or websocket message
    // For demo, we'll simulate the notification
    console.log(`🔔 Notification sent to seller ${transaction.to}`)
    console.log(`New energy purchase request: ${transaction.amount} kWh for RM ${transaction.total}`)
    
    // Simulate seller receiving notification after a delay
    setTimeout(() => {
      this.emit('sellerNotification', {
        type: 'energy_purchase_request',
        transaction,
        message: `You have a new energy purchase request for ${transaction.amount} kWh`
      })
    }, 1000)
  }

  // Simulate seller approval process
  public async simulateSellerApproval(transactionId: string, approve: boolean = true): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.emit('sellerResponse', {
          transactionId,
          approved: approve,
          message: approve 
            ? 'Seller approved the energy transaction' 
            : 'Seller declined the energy transaction'
        })
        resolve(approve)
      }, 3000) // Simulate 3 second approval process
    })
  }

  // Manual balance refresh method
  public async refreshBalance(): Promise<void> {
    if (this.account) {
      const newBalance = await this.getBalance(this.account.address)
      this.account.balance = newBalance
      this.emit('balanceChanged', this.account.balance)
    }
  }
}

// Export singleton instance
export const masChainWallet = new MasChainWalletService()
export default masChainWallet
