'use client'

import { 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Leaf, 
  Users, 
  BarChart3,
  Award
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Energy Trading',
      description: 'Buy and sell renewable energy instantly with live market pricing and automated smart contracts on MasChain.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: null,
      title: 'Virtual Power Plant (VPP)',
      description: 'Pool your solar panels and storage with others to sell excess energy to the grid and maximize returns.',
      gradient: 'from-yellow-500 to-orange-600',
      customIcon: '⚡'
    },
    {
      icon: Leaf,
      title: 'Carbon Credit Rewards',
      description: 'Earn carbon credits automatically for every kWh of renewable energy you export. Trade or redeem as NFT certificates.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'DAO Governance',
      description: 'Participate in decentralized governance. Vote on energy rates, platform upgrades, and community policies.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'AI-Powered Pricing',
      description: 'Dynamic pricing based on real-time supply and demand with predictive analytics for optimal trading.',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Gamified Experience',
      description: 'Earn badges, compete on leaderboards, and complete green energy missions. Make sustainability fun and social.',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'All transactions recorded immutably on MasChain with transparent pricing and secure digital wallets.',
      gradient: 'from-gray-700 to-gray-900'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Access your energy dashboard anywhere. Real-time monitoring, IoT integration, and seamless mobile trading.',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ]

  return (
    <section id="features" className="py-20 bg-neutral-gray50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-main bg-opacity-10 text-primary-main text-sm font-medium mb-4">
            <span className="mr-2">⚡</span>
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-gray900 mb-6">
            Everything You Need for
            <span className="block text-primary-main">Smart Energy Trading</span>
          </h2>
          <p className="text-xl text-neutral-gray600 max-w-3xl mx-auto">
            PowerChain combines blockchain technology, AI-driven insights, and gamification 
            to create the most advanced renewable energy trading platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-feature group cursor-pointer">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {feature.customIcon ? (
                  <span className="text-2xl">{feature.customIcon}</span>
                ) : feature.icon ? (
                  <feature.icon className="h-6 w-6 text-white" />
                ) : null}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-neutral-gray900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-gray600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-primary-main text-sm font-medium flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg border border-neutral-gray200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-gray900 mb-4">Built on Modern Technology</h3>
            <p className="text-neutral-gray600">
              PowerChain leverages cutting-edge blockchain and web technologies for optimal performance and security.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'MasChain L1', description: 'Blockchain Layer', icon: '⛓️' },
              { name: 'Next.js 14', description: 'Frontend Framework', icon: '⚛️' },
              { name: 'Smart Contracts', description: 'Automated Trading', icon: '📜' },
              { name: 'IoT Integration', description: 'Real-time Data', icon: '📊' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-main to-secondary-main rounded-xl flex items-center justify-center text-2xl">
                  {tech.icon}
                </div>
                <h4 className="font-semibold text-neutral-gray900 mb-1">{tech.name}</h4>
                <p className="text-sm text-neutral-gray500">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Trading Clean Energy?</h3>
            <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already earning from their renewable energy 
              production while contributing to a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-cta bg-white text-primary-main hover:bg-gray-100">
                Get Started Today
              </button>
              <button className="btn-secondary bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-opacity-30">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 