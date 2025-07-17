import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from './providers/WalletProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PowerChain - Smart Solar Energy Trading Platform',
  description: 'Decentralized smart solar energy trading platform powered by MasChain blockchain technology. Trade renewable energy, earn carbon credits, and join the green energy revolution.',
  keywords: ['solar energy', 'blockchain', 'energy trading', 'MasChain', 'renewable energy', 'carbon credits'],
  authors: [{ name: 'PowerChain Team' }],
  openGraph: {
    title: 'PowerChain - Smart Solar Energy Trading Platform',
    description: 'Trade renewable energy on the blockchain with PowerChain',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PowerChain - Smart Solar Energy Trading Platform',
    description: 'Trade renewable energy on the blockchain with PowerChain',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-neutral-gray900`}>
        <WalletProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '0.75rem',
                padding: '1rem',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  )
} 