'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '../providers/WalletProvider'
import DashboardLayout from '../components/DashboardLayout'
import { 
  Sun, 
  Zap, 
  Battery, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Clock,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Wifi,
  Shield,
  Leaf,
  Home,
  Building
} from 'lucide-react'

export default function EnergyPage() {
  const { isConnected, user, isInitializing } = useWallet()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const [energyData, setEnergyData] = useState({
    currentProduction: 8.5, // kW
    currentConsumption: 3.2, // kW
    todayProduction: 45.2, // kWh
    todayConsumption: 28.7, // kWh
    thisMonthProduction: 1250, // kWh
    thisMonthConsumption: 890, // kWh
    batteryLevel: 78, // %
    batteryStatus: 'charging', // charging, discharging, idle
    efficiency: 0.87, // %
    carbonOffset: 156.3, // kg CO2
    smartMeterStatus: 'connected',
    lastUpdate: '2 minutes ago'
  })

  const [devices, setDevices] = useState([
    {
      id: 'solar_panel_1',
      name: 'Solar Panel Array 1',
      type: 'solar',
      capacity: 5.0, // kW
      currentOutput: 4.2, // kW
      efficiency: 0.84,
      status: 'active',
      location: 'Roof Top',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 'solar_panel_2',
      name: 'Solar Panel Array 2',
      type: 'solar',
      capacity: 3.5, // kW
      currentOutput: 2.8, // kW
      efficiency: 0.80,
      status: 'active',
      location: 'Ground Mount',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20'
    },
    {
      id: 'battery_1',
      name: 'Tesla Powerwall',
      type: 'battery',
      capacity: 13.5, // kWh
      currentLevel: 78, // %
      status: 'charging',
      location: 'Garage',
      cycles: 1247,
      health: 0.95
    },
    {
      id: 'smart_meter_1',
      name: 'Smart Meter Main',
      type: 'meter',
      status: 'connected',
      location: 'Utility Room',
      lastReading: '2024-01-25T10:30:00Z',
      accuracy: 0.99
    }
  ])

  const [consumptionPatterns, setConsumptionPatterns] = useState([
    { hour: '00:00', usage: 1.2, production: 0 },
    { hour: '02:00', usage: 0.8, production: 0 },
    { hour: '04:00', usage: 0.6, production: 0 },
    { hour: '06:00', usage: 1.5, production: 0.5 },
    { hour: '08:00', usage: 2.8, production: 3.2 },
    { hour: '10:00', usage: 3.5, production: 6.8 },
    { hour: '12:00', usage: 4.2, production: 8.5 },
    { hour: '14:00', usage: 3.8, production: 7.2 },
    { hour: '16:00', usage: 4.5, production: 5.1 },
    { hour: '18:00', usage: 5.2, production: 2.3 },
    { hour: '20:00', usage: 4.8, production: 0 },
    { hour: '22:00', usage: 3.1, production: 0 }
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 'alert_1',
      type: 'warning',
      title: 'Battery Maintenance Due',
      message: 'Tesla Powerwall scheduled maintenance in 2 weeks',
      timestamp: '2 hours ago',
      priority: 'medium'
    },
    {
      id: 'alert_2',
      type: 'info',
      title: 'Peak Production Achieved',
      message: 'Solar Array 1 reached 95% efficiency today',
      timestamp: '4 hours ago',
      priority: 'low'
    },
    {
      id: 'alert_3',
      type: 'success',
      title: 'Carbon Offset Milestone',
      message: 'Reached 150kg CO2 offset this month',
      timestamp: '1 day ago',
      priority: 'low'
    }
  ])

  useEffect(() => {
    if (!isInitializing && !isConnected) {
      router.push('/')
    }
  }, [isConnected, isInitializing, router])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prev => ({
        ...prev,
        currentProduction: Math.max(0, Math.round((prev.currentProduction + (Math.random() - 0.5) * 0.5) * 100) / 100),
        currentConsumption: Math.max(0, Math.round((prev.currentConsumption + (Math.random() - 0.5) * 0.3) * 100) / 100),
        lastUpdate: 'Just now'
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-gray50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
          <p className="text-neutral-gray600">Loading Energy Management...</p>
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
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'production', name: 'Production', icon: Sun },
    { id: 'consumption', name: 'Consumption', icon: Zap },
    { id: 'storage', name: 'Storage', icon: Battery },
    { id: 'devices', name: 'Devices', icon: Settings },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'production':
        return renderProductionTab()
      case 'consumption':
        return renderConsumptionTab()
      case 'storage':
        return renderStorageTab()
      case 'devices':
        return renderDevicesTab()
      case 'analytics':
        return renderAnalyticsTab()
      default:
        return renderOverviewTab()
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">Live</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{energyData.currentProduction} kW</h3>
          <p className="text-neutral-gray600">Current Production</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">Live</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{energyData.currentConsumption} kW</h3>
          <p className="text-neutral-gray600">Current Consumption</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Battery className="h-6 w-6 text-green-600" />
            </div>
            <span className={`text-sm font-medium ${
              energyData.batteryStatus === 'charging' ? 'text-green-600' :
              energyData.batteryStatus === 'discharging' ? 'text-orange-600' :
              'text-gray-600'
            }`}>
              {energyData.batteryStatus}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{energyData.batteryLevel}%</h3>
          <p className="text-neutral-gray600">Battery Level</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-600 font-medium">+{energyData.carbonOffset}kg</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-gray900">{energyData.carbonOffset}</h3>
          <p className="text-neutral-gray600">CO₂ Offset (kg)</p>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Today's Energy Flow</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Sun className="h-6 w-6 text-yellow-600" />
                <div>
                  <div className="font-medium text-neutral-gray900">Production</div>
                  <div className="text-sm text-neutral-gray600">Solar generation</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-600">{energyData.todayProduction} kWh</div>
                <div className="text-sm text-neutral-gray600">Today</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="font-medium text-neutral-gray900">Consumption</div>
                  <div className="text-sm text-neutral-gray600">Energy used</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">{energyData.todayConsumption} kWh</div>
                <div className="text-sm text-neutral-gray600">Today</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-medium text-neutral-gray900">Net Export</div>
                  <div className="text-sm text-neutral-gray600">To grid</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{(energyData.todayProduction - energyData.todayConsumption).toFixed(1)} kWh</div>
                <div className="text-sm text-neutral-gray600">Surplus</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">This Month</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Production</span>
              <span className="font-semibold text-neutral-gray900">{energyData.thisMonthProduction} kWh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Consumption</span>
              <span className="font-semibold text-neutral-gray900">{energyData.thisMonthConsumption} kWh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Efficiency</span>
              <span className="font-semibold text-emerald-600">{(energyData.efficiency * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-gray600">Carbon Offset</span>
              <span className="font-semibold text-emerald-600">{energyData.carbonOffset} kg CO₂</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Monthly Goal</span>
            </div>
            <div className="text-sm text-purple-700">
              You're on track to exceed your monthly production target by 12.5%
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Recent Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center space-x-4 p-4 bg-neutral-gray50 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                alert.type === 'warning' ? 'bg-yellow-100' :
                alert.type === 'info' ? 'bg-blue-100' :
                alert.type === 'success' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                {alert.type === 'warning' ? (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                ) : alert.type === 'info' ? (
                  <Eye className="h-5 w-5 text-blue-600" />
                ) : alert.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-gray900">{alert.title}</div>
                <div className="text-sm text-neutral-gray600">{alert.message}</div>
              </div>
              <div className="text-sm text-neutral-gray500">{alert.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProductionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Solar Production Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <Sun className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">{energyData.currentProduction} kW</div>
            <div className="text-sm text-yellow-600">Current Output</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{energyData.todayProduction} kWh</div>
            <div className="text-sm text-orange-600">Today's Production</div>
          </div>
          
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <Target className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-700">{(energyData.efficiency * 100).toFixed(1)}%</div>
            <div className="text-sm text-emerald-600">Efficiency</div>
          </div>
        </div>

        <div className="bg-neutral-gray50 rounded-xl p-6">
          <h4 className="font-semibold text-neutral-gray900 mb-4">Daily Production Pattern</h4>
          <div className="grid grid-cols-12 gap-2">
            {consumptionPatterns.map((pattern, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-gray600 mb-1">{pattern.hour}</div>
                <div className="bg-yellow-200 rounded-t-sm" style={{ 
                  height: `${(pattern.production / 8.5) * 60}px` 
                }}></div>
                <div className="text-xs text-neutral-gray500 mt-1">{pattern.production} kW</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderConsumptionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Energy Consumption Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{energyData.currentConsumption} kW</div>
            <div className="text-sm text-blue-600">Current Usage</div>
          </div>
          
          <div className="text-center p-4 bg-cyan-50 rounded-xl">
            <Clock className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-700">{energyData.todayConsumption} kWh</div>
            <div className="text-sm text-cyan-600">Today's Usage</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{energyData.thisMonthConsumption} kWh</div>
            <div className="text-sm text-purple-600">This Month</div>
          </div>
        </div>

        <div className="bg-neutral-gray50 rounded-xl p-6">
          <h4 className="font-semibold text-neutral-gray900 mb-4">Daily Consumption Pattern</h4>
          <div className="grid grid-cols-12 gap-2">
            {consumptionPatterns.map((pattern, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-neutral-gray600 mb-1">{pattern.hour}</div>
                <div className="bg-blue-200 rounded-t-sm" style={{ 
                  height: `${(pattern.usage / 5.2) * 60}px` 
                }}></div>
                <div className="text-xs text-neutral-gray500 mt-1">{pattern.usage} kW</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStorageTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Battery Storage Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
              <Battery className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{energyData.batteryLevel}%</div>
              <div className="text-green-100">Battery Level</div>
              <div className="mt-4 text-sm text-green-200">
                Status: {energyData.batteryStatus.charAt(0).toUpperCase() + energyData.batteryStatus.slice(1)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-neutral-gray50 rounded-xl">
                <div className="text-xl font-bold text-neutral-gray900">13.5 kWh</div>
                <div className="text-sm text-neutral-gray600">Total Capacity</div>
              </div>
              <div className="text-center p-4 bg-neutral-gray50 rounded-xl">
                <div className="text-xl font-bold text-neutral-gray900">10.5 kWh</div>
                <div className="text-sm text-neutral-gray600">Available</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Charging Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Solar Charging:</span>
                  <span className="font-medium">6:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Grid Charging:</span>
                  <span className="font-medium">Off-peak hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Discharge:</span>
                  <span className="font-medium">Peak hours</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-900 mb-2">Battery Health</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Health Score:</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cycles:</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty:</span>
                  <span className="font-medium">8.5 years left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDevicesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-neutral-gray900">Connected Devices</h3>
        <button className="bg-primary-main text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Device</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  device.type === 'solar' ? 'bg-yellow-100' :
                  device.type === 'battery' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  {device.type === 'solar' ? (
                    <Sun className="h-6 w-6 text-yellow-600" />
                  ) : device.type === 'battery' ? (
                    <Battery className="h-6 w-6 text-green-600" />
                  ) : (
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-gray900">{device.name}</h4>
                  <p className="text-sm text-neutral-gray600">{device.location}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                device.status === 'active' ? 'bg-green-100 text-green-700' :
                device.status === 'connected' ? 'bg-blue-100 text-blue-700' :
                device.status === 'charging' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {device.type === 'solar' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Capacity</span>
                    <span className="font-semibold">{device.capacity} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Current Output</span>
                    <span className="font-semibold text-yellow-600">{device.currentOutput} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Efficiency</span>
                    <span className="font-semibold text-emerald-600">{((device.efficiency || 0) * 100).toFixed(1)}%</span>
                  </div>
                </>
              )}
              
              {device.type === 'battery' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Capacity</span>
                    <span className="font-semibold">{device.capacity} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Current Level</span>
                    <span className="font-semibold text-green-600">{device.currentLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Health</span>
                    <span className="font-semibold text-emerald-600">{((device.health || 0) * 100).toFixed(1)}%</span>
                  </div>
                </>
              )}
              
              {device.type === 'meter' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Accuracy</span>
                    <span className="font-semibold">{((device.accuracy || 0) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-gray600">Last Reading</span>
                    <span className="font-semibold">{device.lastReading ? new Date(device.lastReading).toLocaleString() : 'N/A'}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-primary-main text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                Configure
              </button>
              <button className="flex-1 border border-neutral-gray300 text-neutral-gray700 py-2 px-4 rounded-lg font-medium hover:bg-neutral-gray50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-neutral-gray200 shadow-sm">
        <h3 className="text-xl font-semibold text-neutral-gray900 mb-6">Energy Analytics</h3>
        
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-12 w-12 text-primary-main" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-gray900 mb-4">Advanced Analytics Coming Soon</h3>
          <p className="text-neutral-gray600 max-w-md mx-auto mb-6">
            We're building comprehensive energy analytics including efficiency optimization, 
            predictive maintenance, and performance benchmarking.
          </p>
          <button className="bg-primary-main text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
            Get Notified When Available
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Energy Management ⚡
              </h1>
              <p className="text-blue-100">
                Monitor your energy production, consumption, and storage in real-time
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Last Updated</div>
              <div className="text-lg font-semibold">{energyData.lastUpdate}</div>
              <div className="text-xs text-blue-200">Smart meter connected</div>
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
    </DashboardLayout>
  )
} 