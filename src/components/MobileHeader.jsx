import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import ProfileModal from './ProfileModal'
import SettingsModal from './SettingsModal'
import { useUserProfile, useAdminMode, useAuth } from '../data/userState'

export default function MobileHeader() {
  const navigate = useNavigate()
  const [profile] = useUserProfile()
  const [adminMode, toggleAdminMode] = useAdminMode()
  const { isLoggedIn } = useAuth()
  
  const [showProfile, setShowProfile] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  return (
    <>
      <header className="md:hidden sticky top-0 w-full z-40 flex justify-between items-center px-5 h-14 bg-surface/95 backdrop-blur-md border-b border-surface-container-highest/60">
        <Logo variant="full" size="sm" />
        <div className="relative flex gap-2 items-center">
          <button
            type="button"
            onClick={() => navigate('/pencapaian')}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
            aria-label="Lihat pencapaian terbaru"
          >
            <Icon name="notifications" size={21} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-surface bg-error" />
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setShowProfile((current) => !current)}
              className="w-9 h-9 flex items-center justify-center rounded-full ring-2 ring-primary/20 overflow-hidden shrink-0 transition-transform active:scale-95"
              aria-label="Buka menu profil"
              aria-expanded={showProfile}
            >
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-mono text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Icon name="login" size={16} /> Masuk
            </button>
          )}

          {showProfile && isLoggedIn && (
            <div className="absolute right-0 top-11 w-64 rounded-2xl border border-surface-variant bg-surface-container-lowest p-3 shadow-xl space-y-2 z-50 animate-fadeIn">
              <div className="flex items-center gap-3 border-b border-surface-variant/70 px-1 pb-3">
                <img src={profile.avatarUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0" />
                <div className="overflow-hidden min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-on-surface truncate">{profile.name}</p>
                  <p className="text-xs font-semibold text-primary truncate">{profile.handle}</p>
                </div>
              </div>

              {/* Edit Profile Action */}
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false)
                  setIsProfileModalOpen(true)
                }}
                className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-bold text-primary hover:bg-primary/10 transition"
              >
                <Icon name="edit" size={18} />
                Edit Foto & Username
              </button>

              {/* Settings Action */}
              <button
                type="button"
                onClick={() => {
                  setShowProfile(false)
                  setIsSettingsModalOpen(true)
                }}
                className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition"
              >
                <Icon name="tune" size={18} />
                Pengaturan Aplikasi
              </button>

              {/* Admin Mode Toggle Action */}
              <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-surface-container-low text-xs">
                <span className="font-bold text-on-surface-variant text-[11px] flex items-center gap-1">
                  <Icon name="verified_user" size={14} className="text-primary" /> Mode Admin
                </span>
                <button
                  type="button"
                  onClick={() => toggleAdminMode()}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                    adminMode ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                  } flex items-center`}
                >
                  <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </>
  )
}
