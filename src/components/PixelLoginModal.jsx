import { useState } from 'react'
import Icon from './Icon'
import { useAuth, useUserProfile } from '../data/userState'

export default function PixelLoginModal({ isOpen, onClose }) {
  const { login } = useAuth()
  const [profile, saveProfile] = useUserProfile()
  const [username, setUsername] = useState(profile.name)
  const [password, setPassword] = useState('●●●●●●●●')
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsSuccess(true)
    setTimeout(() => {
      saveProfile({
        ...profile,
        name: username.trim() || 'Alex Rivera',
      })
      login()
      setIsSuccess(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/75 backdrop-blur-md animate-fadeIn">
      {/* 8-Bit Pixel Container */}
      <div className="w-full max-w-md bg-[#F8F9FF] border-4 border-[#121C28] p-6 shadow-[10px_10px_0px_0px_#121C28] relative font-mono select-none">
        
        {/* Pixel Corner Accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#121C28]" />
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-container border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#121C28]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-error text-white font-bold border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#121C28] hover:translate-y-0.5 active:translate-y-1 transition-transform flex items-center justify-center"
        >
          ✕
        </button>

        {/* Pixel Header & Animated Character */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto rounded-none border-4 border-[#121C28] bg-primary/10 overflow-hidden shadow-[4px_4px_0px_0px_#006E2F]">
              <img
                src={profile.avatarUrl}
                alt="Pixel Dev Avatar"
                className="w-full h-full object-cover image-rendering-pixelated animate-bounce"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-[#22C55E] text-[#002109] font-extrabold text-[10px] px-2 py-0.5 border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#121C28]">
              LVL 4
            </span>
          </div>

          <div>
            <h2 className="text-lg font-black tracking-widest text-[#006E2F] uppercase drop-shadow-[1px_1px_0px_#121C28]">
              ★ GAME START ★
            </h2>
            <p className="text-[11px] font-bold text-[#121C28] mt-1 tracking-tight">
              MASUK KE FRONTEND ACADEMY
            </p>
          </div>
        </div>

        {/* Pixel Login Form */}
        <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-[#121C28] uppercase flex items-center justify-between">
              <span>USER NAME / HERO:</span>
              <span className="text-[9px] text-[#006E2F]">PLAYER 1</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="NAMA PAHLAWAN"
                className="w-full h-11 px-3 text-xs font-extrabold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#E3F5EA]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-[#121C28] uppercase flex items-center justify-between">
              <span>PASSCODE:</span>
              <span className="text-[9px] text-outline">SECRET</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 text-xs font-extrabold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#E3F5EA]"
              required
            />
          </div>

          {/* Press Start Submit Button */}
          <button
            type="submit"
            disabled={isSuccess}
            className="w-full py-3.5 mt-2 bg-[#006E2F] hover:bg-[#22C55E] text-white font-black text-xs tracking-widest border-3 border-[#121C28] shadow-[5px_5px_0px_0px_#121C28] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase flex items-center justify-center gap-2"
          >
            {isSuccess ? (
              <span className="animate-pulse text-[#FFDEA0]">▶ LOADING... [READY]</span>
            ) : (
              <>
                <Icon name="play_arrow" size={18} /> PRESS START TO LOGIN
              </>
            )}
          </button>
        </form>

        {/* Pixel Footer Badge */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#121C28] flex items-center justify-between text-[10px] font-bold text-[#59645B]">
          <span>THEME: EMERALD PIXEL</span>
          <span className="text-[#006E2F]">SCORE: 99999</span>
        </div>
      </div>
    </div>
  )
}
