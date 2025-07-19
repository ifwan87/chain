'use client'

import { useEffect, useState } from 'react'
import { X, Trophy, Star, Sparkles } from 'lucide-react'

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  reward: string
  icon: string
  type: 'badge' | 'achievement' | 'nft' | 'level'
}

export default function CelebrationModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  reward, 
  icon, 
  type 
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                ['bg-yellow-400', 'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)]
              }`}></div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-bounce-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-gray400 hover:text-neutral-gray600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-4xl">{icon}</span>
              </div>
              
              {/* Achievement Type Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                type === 'badge' ? 'bg-purple-100 text-purple-700' :
                type === 'achievement' ? 'bg-yellow-100 text-yellow-700' :
                type === 'nft' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {type === 'badge' && <Trophy className="h-4 w-4 mr-1" />}
                {type === 'achievement' && <Star className="h-4 w-4 mr-1" />}
                {type === 'nft' && <Sparkles className="h-4 w-4 mr-1" />}
                {type === 'level' && <Sparkles className="h-4 w-4 mr-1" />}
                {type.charAt(0).toUpperCase() + type.slice(1)} Earned!
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-neutral-gray900 mb-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-neutral-gray600 mb-6">
              {description}
            </p>

            {/* Reward */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
              <div className="text-lg font-semibold text-green-700">
                Reward: {reward}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary-main to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-primary-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Awesome! 🎉
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </>
  )
} 