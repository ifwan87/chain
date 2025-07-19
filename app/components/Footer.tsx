'use client'

import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Marketplace', href: '#marketplace' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Carbon Credits', href: '/carbon' },
        { name: 'Energy Hub', href: '/energy-hub' },
      ]
    },
    {
      title: 'Technology',
      links: [
        { name: 'MasChain Integration', href: '#maschain' },
        { name: 'Smart Contracts', href: '#contracts' },
        { name: 'API Documentation', href: '#api' },
        { name: 'Security', href: '#security' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'DAO Governance', href: '/governance' },
        { name: 'Forums', href: '#forums' },
        { name: 'Blog', href: '#blog' },
        { name: 'Events', href: '#events' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Tutorials', href: '#tutorials' },
      ]
    }
  ]

  return (
    <footer className="bg-neutral-gray900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold">PowerChain</span>
            </div>
            <p className="text-neutral-gray300 mb-6 leading-relaxed">
              Revolutionizing renewable energy trading through blockchain technology. 
              Join the decentralized energy revolution and earn from your solar production.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-neutral-gray300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-gray300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@powerchain.my</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-gray300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+60 3-1234 5678</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-neutral-gray300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-neutral-gray700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">2,500+</div>
            <div className="text-sm text-neutral-gray400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">150K+</div>
            <div className="text-sm text-neutral-gray400">kWh Traded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-neutral-gray400">Carbon Tons Offset</div>
          </div>
          <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">RM 2.5M+</div>
            <div className="text-sm text-neutral-gray400">Total Volume</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8">
          <div className="text-neutral-gray400 text-sm mb-4 md:mb-0">
            © 2024 PowerChain. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#privacy" className="text-neutral-gray400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="text-neutral-gray400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#cookies" className="text-neutral-gray400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* MasChain Attribution */}
        <div className="mt-8 pt-6 border-t border-neutral-gray700 text-center">
          <p className="text-neutral-gray400 text-sm">
            Powered by{' '}
            <a 
              href="https://docs.maschain.com/portal/create-smart-contract" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-light hover:text-white transition-colors duration-200 font-medium"
            >
              MasChain Blockchain
            </a>
            {' '}• Built for the future of renewable energy
          </p>
        </div>
      </div>
    </footer>
  )
} 