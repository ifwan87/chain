'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import CelebrationModal from '../components/CelebrationModal'
import { 
  Leaf, 
  Trophy, 
  Award,
  TrendingUp,
  Users,
  Star,
  Zap,
  Sun,
  Wind,
  Battery,
  Target,
  Calendar,
  Gift,
  Share2,
  Download,
  Eye,
  Crown,
  Medal,
  Sparkles,
  TreePine,
  Globe,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Settings
} from 'lucide-react'

export default function CarbonPage() {
  const { isConnected, user, isInitializing } = useWallet()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState({
    isOpen: false,
    title: '',
    description: '',
    reward: '',
    icon: '',
    type: 'badge' as 'badge' | 'achievement' | 'nft' | 'level'
  })

  const [carbonData, setCarbonData] = useState({
    totalOffset: 156.8, // kg CO2
    thisMonth: 23.5, // kg CO2
    thisWeek: 8.2, // kg CO2
    today: 2.1, // kg CO2
    level: 8,
    experience: 1250,
    experienceToNext: 2000,
    rank: 42,
    totalUsers: 1247,
    streak: 15, // days
    badges: 12,
    nfts: 8,
    challenges: 3,
    leaderboardPosition: 156
  })

  const [badges, setBadges] = useState([
    {
      id: 'badge_1',
      name: 'Green Pioneer',
      description: 'First 10kg CO₂ offset',
      icon: '🌱',
      rarity: 'common',
      earned: true,
      earnedDate: '2024-01-15',
      progress: 100
    },
    {
      id: 'badge_2',
      name: 'Carbon Warrior',
      description: '100kg CO₂ milestone',
      icon: '⚔️',
      rarity: 'rare',
      earned: true,
      earnedDate: '2024-01-20',
      progress: 100
    },
    {
      id: 'badge_3',
      name: 'Solar Master',
      description: '50 solar energy trades',
      icon: '☀️',
      rarity: 'epic',
      earned: true,
      earnedDate: '2024-01-22',
      progress: 100
    },
    {
      id: 'badge_4',
      name: 'Climate Hero',
      description: '1000kg CO₂ milestone',
      icon: '🦸',
      rarity: 'legendary',
      earned: false,
      earnedDate: null,
      progress: 15.7
    },
    {
      id: 'badge_5',
      name: 'Streak Master',
      description: '30-day trading streak',
      icon: '🔥',
      rarity: 'epic',
      earned: false,
      earnedDate: null,
      progress: 50
    },
    {
      id: 'badge_6',
      name: 'Community Leader',
      description: 'Top 10% in community challenges',
      icon: '👑',
      rarity: 'legendary',
      earned: false,
      earnedDate: null,
      progress: 75
    }
  ])

  const [nfts, setNfts] = useState([
    {
      id: 'nft_1',
      name: 'Solar Energy Certificate',
      description: '25 kWh solar energy offset',
      carbonOffset: 12.5, // kg CO2
      rarity: 'rare',
      image: '🌞',
      mintedDate: '2024-01-20',
      value: 125.50, // RM
      isAnimated: true
    },
    {
      id: 'nft_2',
      name: 'Wind Power Certificate',
      description: '18 kWh wind energy offset',
      carbonOffset: 9.0, // kg CO2
      rarity: 'common',
      image: '💨',
      mintedDate: '2024-01-18',
      value: 90.00, // RM
      isAnimated: false
    },
    {
      id: 'nft_3',
      name: 'Battery Storage Certificate',
      description: '32 kWh storage energy offset',
      carbonOffset: 16.0, // kg CO2
      rarity: 'epic',
      image: '🔋',
      mintedDate: '2024-01-22',
      value: 160.00, // RM
      isAnimated: true
    }
  ])

  const [leaderboard, setLeaderboard] = useState([
    {
      rank: 1,
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      carbonOffset: 2847.5,
      level: 25,
      badge: 'Crown',
      change: '+2'
    },
    {
      rank: 2,
      name: 'Ahmad Rahman',
      avatar: '👨‍💼',
      carbonOffset: 2156.8,
      level: 22,
      badge: 'Medal',
      change: '+1'
    },
    {
      rank: 3,
      name: 'Lisa Wong',
      avatar: '👩‍🔬',
      carbonOffset: 1892.3,
      level: 20,
      badge: 'Trophy',
      change: '-1'
    },
    {
      rank: 4,
      name: 'Rajesh Kumar',
      avatar: '👨‍💻',
      carbonOffset: 1756.4,
      level: 19,
      badge: 'Trophy',
      change: '+3'
    },
    {
      rank: 5,
      name: 'Nurul Huda',
      avatar: '👩‍🏫',
      carbonOffset: 1642.7,
      level: 18,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 6,
      name: 'David Tan',
      avatar: '👨‍🔧',
      carbonOffset: 1523.9,
      level: 17,
      badge: 'Star',
      change: '+4'
    },
    {
      rank: 7,
      name: 'Priya Patel',
      avatar: '👩‍⚕️',
      carbonOffset: 1438.2,
      level: 16,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 8,
      name: 'Mohammed Ali',
      avatar: '👨‍🎓',
      carbonOffset: 1356.8,
      level: 15,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 9,
      name: 'Emily Lim',
      avatar: '👩‍🎨',
      carbonOffset: 1287.5,
      level: 14,
      badge: 'Star',
      change: '+3'
    },
    {
      rank: 10,
      name: 'Arun Singh',
      avatar: '👨‍🏭',
      carbonOffset: 1215.3,
      level: 13,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 11,
      name: 'Fatimah Ibrahim',
      avatar: '👩‍🌾',
      carbonOffset: 1156.7,
      level: 12,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 12,
      name: 'Kevin Ooi',
      avatar: '👨‍💼',
      carbonOffset: 1089.4,
      level: 11,
      badge: 'Star',
      change: '+4'
    },
    {
      rank: 13,
      name: 'Deepa Sharma',
      avatar: '👩‍🔬',
      carbonOffset: 1023.8,
      level: 10,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 14,
      name: 'Zainal Abidin',
      avatar: '👨‍🚀',
      carbonOffset: 956.2,
      level: 9,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 15,
      name: 'Grace Chong',
      avatar: '👩‍🏫',
      carbonOffset: 892.5,
      level: 8,
      badge: 'Star',
      change: '+3'
    },
    {
      rank: 16,
      name: 'Vikram Malhotra',
      avatar: '👨‍💻',
      carbonOffset: 823.7,
      level: 8,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 17,
      name: 'Aisha Abdullah',
      avatar: '👩‍🎓',
      carbonOffset: 756.9,
      level: 7,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 18,
      name: 'Daniel Lee',
      avatar: '👨‍🔧',
      carbonOffset: 689.3,
      level: 7,
      badge: 'Star',
      change: '+4'
    },
    {
      rank: 19,
      name: 'Meera Reddy',
      avatar: '👩‍⚕️',
      carbonOffset: 623.8,
      level: 6,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 20,
      name: 'Hassan Omar',
      avatar: '👨‍🎨',
      carbonOffset: 556.4,
      level: 6,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 21,
      name: 'Sophie Ng',
      avatar: '👩‍🌾',
      carbonOffset: 489.7,
      level: 5,
      badge: 'Star',
      change: '+3'
    },
    {
      rank: 22,
      name: 'Ravi Menon',
      avatar: '👨‍🏭',
      carbonOffset: 423.2,
      level: 5,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 23,
      name: 'Nurul Ain',
      avatar: '👩‍🚀',
      carbonOffset: 356.8,
      level: 4,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 24,
      name: 'Marcus Wong',
      avatar: '👨‍💼',
      carbonOffset: 289.5,
      level: 4,
      badge: 'Star',
      change: '+4'
    },
    {
      rank: 25,
      name: 'Anjali Gupta',
      avatar: '👩‍🔬',
      carbonOffset: 223.1,
      level: 3,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 26,
      name: 'Ismail Yusof',
      avatar: '👨‍🎓',
      carbonOffset: 156.8,
      level: 3,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 27,
      name: 'Rachel Tan',
      avatar: '👩‍🏫',
      carbonOffset: 89.4,
      level: 2,
      badge: 'Star',
      change: '+3'
    },
    {
      rank: 28,
      name: 'Arjun Patel',
      avatar: '👨‍🔧',
      carbonOffset: 56.2,
      level: 2,
      badge: 'Star',
      change: '+2'
    },
    {
      rank: 29,
      name: 'Siti Aminah',
      avatar: '👩‍🎨',
      carbonOffset: 23.8,
      level: 1,
      badge: 'Star',
      change: '+1'
    },
    {
      rank: 30,
      name: 'Jason Lim',
      avatar: '👨‍💻',
      carbonOffset: 12.5,
      level: 1,
      badge: 'Star',
      change: '+4'
    },
    {
      rank: 42,
      name: 'Rafizi',
      avatar: '⚡',
      carbonOffset: 156.8,
      level: 8,
      badge: 'Star',
      change: '+5'
    }
  ])

  const [challenges, setChallenges] = useState([
    {
      id: 'challenge_1',
      title: 'Daily Carbon Warrior',
      description: 'Offset 5kg CO₂ today',
      reward: { type: 'experience', amount: 100 },
      progress: 42, // %
      deadline: 'Today',
      status: 'active',
      icon: '⚔️'
    },
    {
      id: 'challenge_2',
      title: 'Solar Energy Master',
      description: 'Complete 3 solar trades this week',
      reward: { type: 'badge', name: 'Solar Master' },
      progress: 67, // %
      deadline: '3 days left',
      status: 'active',
      icon: '☀️'
    },
    {
      id: 'challenge_3',
      title: 'Streak Champion',
      description: 'Maintain 7-day trading streak',
      reward: { type: 'nft', name: 'Streak Certificate' },
      progress: 71, // %
      deadline: '2 days left',
      status: 'active',
      icon: '🔥'
    }
  ])

  const [achievements, setAchievements] = useState([
    {
      id: 'achievement_1',
      title: 'First Carbon Credit',
      description: 'Earned your first carbon credit',
      timestamp: '2 hours ago',
      reward: '+50 XP',
      icon: '🌱'
    },
    {
      id: 'achievement_2',
      title: 'Solar Pioneer',
      description: 'Completed 10 solar energy trades',
      timestamp: '1 day ago',
      reward: '+100 XP + Badge',
      icon: '☀️'
    },
    {
      id: 'achievement_3',
      title: 'Week Warrior',
      description: 'Maintained 7-day trading streak',
      timestamp: '3 days ago',
      reward: '+200 XP + NFT',
      icon: '🔥'
    }
  ])

  useEffect(() => {
    if (!isInitializing && !isConnected) {
      router.push('/')
    }
  }, [isConnected, isInitializing, router])

  // Simulate real-time carbon offset updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonData(prev => {
        const newToday = Math.round((prev.today + (Math.random() * 0.1)) * 100) / 100
        const newTotalOffset = Math.round((prev.totalOffset + (Math.random() * 0.05)) * 100) / 100
        
        // Check for level up
        if (prev.experience + 10 >= prev.experienceToNext) {
          setCelebrationData({
            isOpen: true,
            title: 'Level Up!',
            description: `Congratulations! You've reached level ${prev.level + 1}`,
            reward: '+100 XP + New Badge',
            icon: '⭐',
            type: 'level'
          })
          return {
            ...prev,
            level: prev.level + 1,
            experience: 0,
            experienceToNext: prev.experienceToNext + 500,
            today: newToday,
            totalOffset: newTotalOffset
          }
        }
        
        return {
          ...prev,
          today: newToday,
          totalOffset: newTotalOffset,
          experience: prev.experience + 10
        }
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading Carbon Credits...</p>
        </div>
      </div>
    )
  }

  if (!isConnected || !user) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Leaf },
    { id: 'badges', name: 'Badges', icon: Trophy },
    { id: 'nfts', name: 'NFTs', icon: Award },
    { id: 'leaderboard', name: 'Leaderboard', icon: Users },
    { id: 'challenges', name: 'Challenges', icon: Target },
    { id: 'achievements', name: 'Achievements', icon: Star }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'badges':
        return renderBadgesTab()
      case 'nfts':
        return renderNFTsTab()
      case 'leaderboard':
        return renderLeaderboardTab()
      case 'challenges':
        return renderChallengesTab()
      case 'achievements':
        return renderAchievementsTab()
      default:
        return renderOverviewTab()
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Carbon Offset Progress */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Carbon Hero Level {carbonData.level}</h2>
              <p className="text-green-100">Fighting climate change, one trade at a time</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{carbonData.totalOffset} kg</div>
              <div className="text-green-100">CO₂ Offset</div>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Experience</span>
              <span>{carbonData.experience} / {carbonData.experienceToNext} XP</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(carbonData.experience / carbonData.experienceToNext) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{carbonData.today} kg</div>
              <div className="text-sm text-green-100">Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{carbonData.thisWeek} kg</div>
              <div className="text-sm text-green-100">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{carbonData.thisMonth} kg</div>
              <div className="text-sm text-green-100">This Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">#{carbonData.rank}</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{carbonData.rank}</h3>
          <p className="text-neutral-gray600">Global Rank</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">{carbonData.badges}</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{carbonData.badges}</h3>
          <p className="text-neutral-gray600">Badges Earned</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">{carbonData.nfts}</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{carbonData.nfts}</h3>
          <p className="text-neutral-gray600">NFTs Collected</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm text-red-600 font-medium">{carbonData.streak} days</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{carbonData.streak}</h3>
          <p className="text-neutral-gray600">Day Streak</p>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Environmental Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{Math.round(carbonData.totalOffset / 22)}</div>
            <div className="text-sm text-green-600">Trees Planted Equivalent</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{Math.round(carbonData.totalOffset * 0.001)}</div>
            <div className="text-sm text-blue-600">Tons CO₂ Saved</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{Math.round(carbonData.totalOffset * 0.5)}</div>
            <div className="text-sm text-purple-600">Lives Impacted</div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Recent Achievements</h3>
        <div className="space-y-4">
          {achievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-gray900">{achievement.title}</div>
                <div className="text-sm text-neutral-gray600">{achievement.description}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-gray500">{achievement.timestamp}</div>
                <div className="text-sm font-medium text-green-600">{achievement.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBadgesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Badge Collection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              badge.earned 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg' 
                : 'bg-neutral-gray50 border-neutral-gray200'
            }`}>
              {badge.earned && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              )}
              
              <div className="text-center">
                <div className={`text-4xl mb-3 ${badge.earned ? 'animate-pulse' : 'opacity-50'}`}>
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-neutral-gray900 mb-2">{badge.name}</h4>
                <p className="text-sm text-neutral-gray600 mb-4">{badge.description}</p>
                
                {badge.earned ? (
                  <div className="text-sm text-green-600 font-medium">
                    Earned {badge.earnedDate}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full bg-neutral-gray200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-neutral-gray600">
                      {badge.progress}% Complete
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNFTsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Carbon Credit NFTs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="group relative p-6 rounded-xl border border-neutral-gray200 hover:border-primary-main transition-all duration-300 hover:shadow-lg">
              <div className="text-center">
                <div className={`text-6xl mb-4 ${nft.isAnimated ? 'animate-bounce' : ''}`}>
                  {nft.image}
                </div>
                <h4 className="font-semibold text-neutral-gray900 mb-2">{nft.name}</h4>
                <p className="text-sm text-neutral-gray600 mb-4">{nft.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-gray600">Carbon Offset:</span>
                    <span className="font-medium text-green-600">{nft.carbonOffset} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-gray600">Value:</span>
                    <span className="font-medium text-purple-600">RM {nft.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-gray600">Minted:</span>
                    <span className="font-medium text-neutral-gray900">{new Date(nft.mintedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-primary-main text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-neutral-gray300 text-neutral-gray700 py-2 px-4 rounded-lg font-medium hover:bg-neutral-gray50 transition-colors">
                    Trade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLeaderboardTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Global Leaderboard</h3>
        
        <div className="space-y-4">
          {leaderboard.map((player) => (
            <div key={player.rank} className={`flex items-center justify-between p-4 rounded-xl ${
              player.rank === 42 ? 'bg-gradient-to-r from-primary-main to-purple-600 text-white' : 'bg-neutral-gray50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {player.rank <= 3 ? (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-gray200 flex items-center justify-center text-sm font-medium">
                      #{player.rank}
                    </div>
                  )}
                  <div className="text-2xl">{player.avatar}</div>
                </div>
                <div>
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm opacity-70">Level {player.level}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold">{player.carbonOffset} kg CO₂</div>
                <div className="text-sm opacity-70">{player.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderChallengesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Active Challenges</h3>
        
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div>
                    <h4 className="font-semibold text-neutral-gray900">{challenge.title}</h4>
                    <p className="text-sm text-neutral-gray600">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-gray600">{challenge.deadline}</div>
                  <div className="text-sm font-medium text-blue-600">
                    {challenge.reward.type === 'experience' ? `+${challenge.reward.amount} XP` :
                     challenge.reward.type === 'badge' ? challenge.reward.name :
                     challenge.reward.name}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="w-full bg-neutral-gray200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Achievement History</h3>
        
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-gray900">{achievement.title}</div>
                <div className="text-sm text-neutral-gray600">{achievement.description}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-gray500">{achievement.timestamp}</div>
                <div className="text-sm font-medium text-green-600">{achievement.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Carbon Credits 🌱
              </h1>
              <p className="text-green-100">
                Earn badges, collect NFTs, and compete on leaderboards while saving the planet
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100">Total Offset</div>
              <div className="text-2xl font-bold">{carbonData.totalOffset} kg CO₂</div>
              <div className="text-xs text-green-200">Level {carbonData.level} Hero</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 border border-neutral-gray200 shadow-sm">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-main text-white'
                    : 'text-neutral-gray600 hover:text-neutral-gray900 hover:bg-neutral-gray50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={celebrationData.isOpen}
        onClose={() => setCelebrationData(prev => ({ ...prev, isOpen: false }))}
        title={celebrationData.title}
        description={celebrationData.description}
        reward={celebrationData.reward}
        icon={celebrationData.icon}
        type={celebrationData.type}
      />
    </DashboardLayout>
  )
} 