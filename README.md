# PowerChain - Smart Solar Energy Trading Platform

A decentralized smart solar energy trading platform powered by MasChain blockchain technology. Trade renewable energy, earn carbon credits, and join the green energy revolution.

## 🌟 Features

### Core Platform Features
- **Real-time Energy Trading**: Live bidding and selling of renewable energy with dynamic pricing
- **Energy Hub Community Pooling**: Pool solar panels and storage with neighbors to sell excess energy to the national grid
- **Carbon Credit Rewards**: Earn carbon credits automatically for renewable energy exports
- **DAO Governance**: Participate in decentralized governance and vote on platform policies
- **AI-Powered Pricing**: Dynamic pricing based on real-time supply and demand
- **Gamification**: Badges, leaderboards, and green energy missions

### Technical Features
- **MasChain L1 Integration**: Secure smart contracts for automated energy trading
- **IoT Integration**: Real-time smart meter connectivity and energy monitoring
- **Mobile-First Design**: Responsive design optimized for all devices
- **Blockchain Security**: Immutable transaction records and transparent pricing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### For First-Time Users

1. **Explore the Landing Page**
   - View the hero section with platform statistics
   - Browse features and technology overview
   - Click "Explore Marketplace" to preview energy trading

2. **Connect Your Wallet**
   - Click "Connect Wallet" in the navigation
   - Choose from MasChain Wallet (recommended), MetaMask, or WalletConnect
   - The demo will randomly assign you a user role and balance

3. **Access the Dashboard**
   - After connecting, you'll be redirected to your personalized dashboard
   - View energy metrics, trading performance, and carbon credits
   - Access role-specific features and quick actions

### User Roles and Features

#### 🏭 **Energy Producer** (Solar Panel Owners)
- Monitor real-time solar production
- Sell excess energy in the marketplace
- Join Virtual Power Plant programs
- Earn carbon credits automatically
- Track revenue from energy sales

#### 🏠 **Energy Consumer** (Households/Businesses)
- Buy renewable energy from local producers
- Monitor energy consumption patterns
- Access energy efficiency insights
- Choose preferred energy sources
- Participate in demand response programs

#### 📈 **Energy Trader** (Energy Arbitrageurs)
- Advanced trading interface with analytics
- Portfolio management tools
- Bulk trading capabilities
- Real-time market data and forecasting
- API access for automated trading

#### 🗳️ **DAO Member** (Governance Token Holders)
- Vote on governance proposals
- Create new policy proposals
- Stake governance tokens
- Access exclusive features
- Shape platform development

#### ⚡ **Energy Hub Operator** (Community Energy Managers)
- Manage aggregated community energy resources
- Coordinate grid sales and competitive pricing
- Monitor distributed energy assets across neighborhoods
- Distribute revenue shares to community members
- Optimize energy pooling and distribution

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations

### Blockchain Integration
- **MasChain L1**: Primary blockchain for smart contracts
- **Smart Contracts**: Automated energy trading and payments
- **Wallet Integration**: MasChain, MetaMask, WalletConnect support

### Design System
Based on `pchain.json` configuration:
- **Primary Colors**: Indigo (#4F46E5) and Pink (#EC4899)
- **Typography**: Inter font family
- **Components**: Glassmorphism effects and gradient backgrounds
- **Responsive**: Mobile-first design principles

## 📁 Project Structure

```
powerchain/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── Navigation.tsx   # Main navigation
│   │   ├── Hero.tsx         # Landing page hero
│   │   ├── Marketplace.tsx  # Energy trading interface
│   │   └── ...
│   ├── providers/           # React context providers
│   │   └── WalletProvider.tsx
│   ├── dashboard/           # Dashboard pages
│   ├── globals.css          # Global styles and custom CSS
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── pchain.json              # Design system configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Key Files to Modify

1. **Design System**: Edit `pchain.json` to customize colors, typography, and styling
2. **Wallet Integration**: Modify `app/providers/WalletProvider.tsx` for real MasChain integration
3. **Mock Data**: Update data structures in components for real API integration
4. **Styling**: Customize `app/globals.css` and `tailwind.config.js`

## 🌐 MasChain Integration

This application is designed to integrate with MasChain blockchain:

- **Smart Contracts**: [MasChain Documentation](https://docs.maschain.com/portal/create-smart-contract)
- **Network Info**: [MasVerse Solutions](https://www.masverse.com/our-solutions/maschain)
- **Wallet Integration**: Connect to MasChain wallets for real energy trading

### Implementation Notes
- Current wallet connection is mockup for demo purposes
- Energy trading data is simulated with realistic values
- Smart contract integration points are prepared for MasChain deployment

## 🎨 Design Features

### Color Palette
- **Primary**: Indigo shades for main actions and branding
- **Secondary**: Pink accents for highlights and CTAs
- **Success**: Emerald green for positive actions and environmental themes
- **Neutral**: Comprehensive gray scale for content and backgrounds

### Interactive Elements
- **Glassmorphism**: Frosted glass effects on navigation and cards
- **Gradients**: Beautiful gradient backgrounds and button effects
- **Animations**: Smooth transitions and hover effects
- **Energy Flow**: Animated energy transfer visualizations

## 📱 Mobile Experience

The application is fully responsive with:
- Mobile-first navigation with collapsible sidebar
- Touch-friendly trading interface
- Optimized dashboard layout for small screens
- Progressive Web App capabilities

## 🔒 Security Features

- **Wallet Security**: Never stores private keys
- **Transaction Transparency**: All trades recorded on blockchain
- **Data Privacy**: Local storage for user preferences only
- **Audit Trails**: Complete transaction history

## 🌱 Environmental Impact

PowerChain promotes sustainability through:
- **Carbon Credit Tracking**: Automatic calculation and rewards
- **Renewable Energy Focus**: Prioritizes solar, wind, and storage
- **Environmental Metrics**: Track CO₂ offset and tree equivalents
- **NFT Certificates**: Blockchain-verified environmental impact

## 🤝 Contributing

This is a demo application showcasing MasChain integration capabilities. For production deployment:

1. Replace mock wallet with real MasChain integration
2. Implement actual smart contracts for energy trading
3. Connect IoT devices for real-time energy data
4. Add regulatory compliance features

## 📞 Support

For questions about MasChain integration or blockchain development:
- MasChain Documentation: https://docs.maschain.com/
- MasVerse Website: https://www.masverse.com/

---

**Powered by MasChain Blockchain** • Built for the future of renewable energy
