'use client'

import { Leaf, Award, TrendingUp, Download } from 'lucide-react'

interface CarbonCreditsProps {
  userId: string
}

export default function CarbonCredits({ userId }: CarbonCreditsProps) {
  const carbonData = {
    totalCredits: 25.5,
    thisMonth: 8.2,
    certificates: 3,
    co2Offset: 12.8,
    treeEquivalent: 156
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-gray900">Carbon Credits</h2>
          <p className="text-sm text-neutral-gray500">Your environmental impact</p>
        </div>
        <div className="p-3 rounded-xl bg-green-100">
          <Leaf className="h-6 w-6 text-green-600" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {carbonData.totalCredits}
          </div>
          <div className="text-sm text-green-700">Total Carbon Credits</div>
          <div className="text-xs text-green-600 flex items-center justify-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{carbonData.thisMonth} this month
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-neutral-gray50 rounded-xl">
            <div className="text-lg font-bold text-neutral-gray900">
              {carbonData.co2Offset}
            </div>
            <div className="text-xs text-neutral-gray500">Tons CO₂ Offset</div>
          </div>
          <div className="text-center p-3 bg-neutral-gray50 rounded-xl">
            <div className="text-lg font-bold text-neutral-gray900">
              {carbonData.treeEquivalent}
            </div>
            <div className="text-xs text-neutral-gray500">Trees Planted*</div>
          </div>
        </div>

        <div className="border border-neutral-gray200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-neutral-gray900">NFT Certificates</h3>
            <Award className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-sm text-neutral-gray600 mb-3">
            You have {carbonData.certificates} carbon offset NFT certificates
          </div>
          <button className="w-full btn-secondary text-sm flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Certificates</span>
          </button>
        </div>

        <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
          <div className="text-sm text-green-800">
            <div className="font-medium mb-1">Environmental Impact</div>
            <div className="text-xs">
              Your renewable energy contribution is equivalent to removing a car from the road for 3.2 days this month.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 