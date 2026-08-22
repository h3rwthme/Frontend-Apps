import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function MobileHeader() {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="md:hidden sticky top-0 w-full z-40 flex justify-between items-center px-5 h-14 bg-surface/95 backdrop-blur-md border-b border-surface-container-highest/60">
      <NavLink to="/" className="flex items-center gap-2 text-[17px] font-extrabold text-primary tracking-tight">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-on-primary">F</span>
        FrontEnd Academy
      </NavLink>
      <div className="relative flex gap-1">
        <button
          type="button"
          onClick={() => navigate('/pencapaian')}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Lihat pencapaian terbaru"
        >
          <Icon name="notifications" size={21} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-surface bg-error" />
        </button>
        <button
          type="button"
          onClick={() => setShowProfile((current) => !current)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
          aria-label="Buka menu profil"
          aria-expanded={showProfile}
        >
          <Icon name="account_circle" size={23} />
        </button>

        {showProfile && (
          <div className="absolute right-0 top-11 w-64 rounded-2xl border border-surface-variant bg-surface-container-lowest p-3 shadow-xl">
            <div className="border-b border-surface-variant/70 px-2 pb-3">
              <p className="text-sm font-extrabold text-on-surface">Halo, Pelajar!</p>
              <p className="mt-1 text-xs text-on-surface-variant">Level 4 · Frontend Explorer</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowProfile(false)
                navigate('/dashboard')
              }}
              className="mt-2 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-bold text-on-surface-variant hover:bg-surface-container-low"
            >
              <Icon name="monitoring" size={20} />
              Lihat progres belajar
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
