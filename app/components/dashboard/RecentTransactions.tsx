'use client'

import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react'

interface Transaction {
  id: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  timestamp: string
  status: 'completed' | 'pending'
  counterparty: string
}

interface RecentTransactionsProps {
  userId: string
}

export default function RecentTransactions({ userId }: RecentTransactionsProps) {
  const transactions: Transaction[] = [
    {
      id: 'tx_001',
      type: 'sell',
      amount: 25,
      price: 0.18,
      timestamp: '2 hours ago',
      status: 'completed',
      counterparty: 'Bob Smith'
    },
    {
      id: 'tx_002',
      type: 'buy',
      amount: 50,
      price: 0.19,
      timestamp: '4 hours ago',
      status: 'completed',
      counterparty: 'Alice Chen'
    },
    {
      id: 'tx_003',
      type: 'sell',
      amount: 30,
      price: 0.175,
      timestamp: '6 hours ago',
      status: 'pending',
      counterparty: 'Carol Wang'
    },
    {
      id: 'tx_004',
      type: 'buy',
      amount: 75,
      price: 0.20,
      timestamp: '1 day ago',
      status: 'completed',
      counterparty: 'David Lee'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-neutral-gray900">Recent Transactions</h2>
        <a href="/trading" className="text-sm text-primary-main hover:text-primary-dark">
          View all
        </a>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-neutral-gray50 rounded-xl hover:bg-neutral-gray100 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'buy' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {transaction.type === 'buy' ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>
              
              <div>
                <div className="font-medium text-neutral-gray900">
                  {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.amount} kWh
                </div>
                <div className="text-sm text-neutral-gray500">
                  {transaction.type === 'buy' ? 'from' : 'to'} {transaction.counterparty}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-neutral-gray900">
                                    RM {(transaction.amount * transaction.price).toFixed(2)}
              </div>
              <div className="text-sm text-neutral-gray500">
                                  RM {transaction.price}/kWh
              </div>
              <div className="flex items-center justify-end space-x-1 mt-1">
                {transaction.status === 'completed' ? (
                  <CheckCircle className="h-3 w-3 text-accent-emerald" />
                ) : (
                  <Clock className="h-3 w-3 text-accent-orange" />
                )}
                <span className={`text-xs ${
                  transaction.status === 'completed' 
                    ? 'text-accent-emerald' 
                    : 'text-accent-orange'
                }`}>
                  {transaction.status}
                </span>
                <span className="text-xs text-neutral-gray400">• {transaction.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-primary-main to-secondary-main rounded-xl">
        <div className="text-white text-sm">
          <div className="flex items-center justify-between">
            <span>Total Volume This Week</span>
            <span className="font-semibold">180 kWh</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span>Net Profit</span>
                          <span className="font-semibold">RM 34.50</span>
          </div>
        </div>
      </div>
    </div>
  )
} 