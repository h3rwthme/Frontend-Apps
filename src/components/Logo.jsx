import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Professional SVG Logo Component for FrontEnd Academy
 * Concept: Code Prism & Hex Shield combining Code Brackets (< />), Layered UI stack, and Academy Emblem
 */
export function LogoIcon({ size = 40, className = '' }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="fa-brand-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#006E2F" />
            <stop offset="50%" stopColor="#008D3C" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          
          <linearGradient id="fa-accent-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="fa-inner-shine" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <filter id="fa-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#006E2F" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Tech Shield / Polygon Hexagon Base */}
        <path
          d="M24 4L42 12V32L24 44L6 32V12L24 4Z"
          fill="url(#fa-brand-grad)"
          filter="url(#fa-glow)"
        />

        {/* Top Metallic Shine Overlay */}
        <path
          d="M24 4L42 12V32L24 44L6 32V12L24 4Z"
          fill="url(#fa-inner-shine)"
        />

        {/* Layered UI / Grid Platform Lines */}
        <path
          d="M24 13L35 18L24 23L13 18L24 13Z"
          fill="#FFFFFF"
          fillOpacity="0.2"
        />
        <path
          d="M13 23.5L24 28.5L35 23.5"
          stroke="#34D399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.6"
        />

        {/* Central Modern Code Brackets Cutout (< />) */}
        {/* Left Bracket '<' */}
        <path
          d="M18 20L13 24L18 28"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Bracket '>' */}
        <path
          d="M30 20L35 24L30 28"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Forward Slash '/' */}
        <path
          d="M26 18L22 30"
          stroke="#34D399"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function Logo({ 
  variant = 'full', // 'full' | 'icon' | 'compact'
  size = 'md',      // 'sm' | 'md' | 'lg'
  to = '/',
  className = ''
}) {
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const currentSize = iconSizes[size] || 40

  const content = (
    <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
      <LogoIcon size={currentSize} />
      
      {variant !== 'icon' && (
        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-extrabold tracking-tight text-on-surface group-hover:text-primary transition-colors flex items-center gap-1">
            FrontEnd
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </span>
          <span className="text-[11px] font-bold tracking-widest text-primary uppercase">
            Academy
          </span>
        </div>
      )}
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none rounded-xl">
        {content}
      </Link>
    )
  }

  return content
}
