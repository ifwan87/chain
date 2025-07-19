'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { 
  Sun, 
  Users, 
  Leaf,
  ArrowRight,
  Sparkles,
  Heart,
  Globe,
  Zap
} from 'lucide-react'

export default function ImageSections() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('image-sections')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="image-sections" className="py-20 bg-gradient-to-b from-white to-neutral-gray50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Solar Energy Section */}
        <div className={`mb-24 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Sun className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-gray900">
                  Harness Solar Power
                </h2>
              </div>
              <p className="text-lg text-neutral-gray600 leading-relaxed">
                Transform your rooftop into a clean energy powerhouse. Our advanced solar solutions 
                help you generate sustainable electricity while earning from excess energy sales. 
                Join thousands of households already benefiting from solar energy trading.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Clean Energy Generation</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Smart Grid Integration</span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/solarhos.jpg"
                  alt="Solar energy installation and monitoring"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Community & Neighborhood Section */}
        <div className={`mb-24 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-gray900">
                  Build Energy Communities
                </h2>
              </div>
              <p className="text-lg text-neutral-gray600 leading-relaxed">
                Connect with neighbors to create resilient energy communities. Pool resources, 
                share excess energy, and build stronger, more sustainable neighborhoods. 
                Together, we can achieve energy independence and reduce carbon footprints.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-purple-600">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Community Bonding</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Local Sustainability</span>
                </div>
              </div>
            </div>
            <div className="lg:order-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/neighbour.png"
                  alt="Community energy sharing and neighborhood collaboration"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Credits Section */}
        <div className={`transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-gray900">
                  Earn Carbon Credits
                </h2>
              </div>
              <p className="text-lg text-neutral-gray600 leading-relaxed">
                Turn your environmental impact into rewards. Every clean energy transaction 
                generates carbon credits that you can trade, sell, or use for gamified 
                achievements. Make sustainability profitable while saving the planet.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Gamified Rewards</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Leaf className="h-5 w-5" />
                  <span className="font-medium">Environmental Impact</span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/purple.png"
                  alt="Carbon credit trading and environmental impact tracking"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-primary-main to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join the Energy Revolution?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Connect your wallet and start trading clean energy with your community
            </p>
            <button className="bg-white text-primary-main px-8 py-3 rounded-xl font-semibold hover:bg-neutral-gray50 transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 