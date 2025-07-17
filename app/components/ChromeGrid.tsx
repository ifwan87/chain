'use client'

import React, { useState, useEffect, useRef } from 'react'

export function ChromeGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const gridSize = 10
  const totalBoxes = gridSize * gridSize

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const gridElement = gridRef.current
    if (gridElement) {
      gridElement.addEventListener('mousemove', handleMouseMove)
      return () => gridElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const getBoxStyle = (index: number) => {
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    
    // PowerChain gradient colors
    const normalizedX = col / (gridSize - 1)
    const normalizedY = row / (gridSize - 1)
    
    // Create gradient from indigo to pink
    const r = Math.floor(79 + (236 - 79) * normalizedX)
    const g = Math.floor(70 + (72 - 70) * normalizedY)
    const b = Math.floor(229 + (153 - 229) * (normalizedX + normalizedY) / 2)
    
    const baseColor = `rgb(${r}, ${g}, ${b})`
    
    // Hover effect calculations
    let scale = 1
    let brightness = 1
    let zIndex = 1
    
    if (hoveredIndex !== null) {
      const hoveredRow = Math.floor(hoveredIndex / gridSize)
      const hoveredCol = hoveredIndex % gridSize
      
      if (index === hoveredIndex) {
        scale = 2.5
        brightness = 1.5
        zIndex = 10
      } else {
        const distance = Math.sqrt(
          Math.pow(row - hoveredRow, 2) + Math.pow(col - hoveredCol, 2)
        )
        
        if (distance <= 2) {
          const rippleStrength = Math.max(0, 1 - (distance / 2))
          scale = 1 + (rippleStrength * 0.8)
          brightness = 1 + (rippleStrength * 0.3)
          zIndex = Math.floor(5 * rippleStrength)
        }
      }
    }

    return {
      background: `linear-gradient(135deg, ${baseColor}, ${baseColor}cc)`,
      transform: `scale(${scale}) translateZ(0)`,
      filter: `brightness(${brightness})`,
      zIndex,
      boxShadow: scale > 1 ? `0 ${scale * 4}px ${scale * 8}px rgba(${r}, ${g}, ${b}, 0.3)` : 'none',
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full opacity-20 overflow-hidden" style={{ zIndex: 1 }}>
      <div 
        ref={gridRef}
        className="relative w-full h-full grid grid-cols-10 gap-1 p-8 transform-gpu"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: totalBoxes }, (_, index) => (
          <div
            key={index}
            className="relative rounded-lg transition-all duration-300 ease-out transform-gpu"
            style={{
              ...getBoxStyle(index),
              aspectRatio: '1',
              backdropFilter: 'blur(1px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Inner glow effect */}
            <div 
              className="absolute inset-0 rounded-lg opacity-50 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
              }}
            />
            
            {/* Metallic shine effect */}
            <div 
              className="absolute inset-0 rounded-lg opacity-30 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)`,
                animation: hoveredIndex === index ? 'shine 0.6s ease-out' : 'none',
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Ambient lighting effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`,
        }}
      />
      
      
    </div>
  )
} 