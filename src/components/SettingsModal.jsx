import { useState } from 'react'
import Icon from './Icon'
import { useAppSettings, useAdminMode, useAuth } from '../data/userState'
import { playPixelSFX } from '../data/soundEffects'

export default function SettingsModal({ isOpen, onClose }) {
  const [settings, saveSettings] = useAppSettings()
  const [adminMode, toggleAdminMode] = useAdminMode()
  const { isLoggedIn, logout } = useAuth()
  const [toastMsg, setToastMsg] = useState('')

  if (!isOpen) return null

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled }
    saveSettings(updated)
    playPixelSFX('click')
    setToastMsg(updated.soundEnabled ? 'Efek suara diaktifkan' : 'Efek suara dinonaktifkan')
    setTimeout(() => setToastMsg(''), 2000)
  }

  const handleToggleBGM = () => {
    const updated = { ...settings, bgmEnabled: !settings.bgmEnabled }
    saveSettings(updated)
    playPixelSFX('click')
    setToastMsg(updated.bgmEnabled ? 'Musik BGM 8-Bit Pixel Aktif' : 'Musik BGM Matikan')
    setTimeout(() => setToastMsg(''), 2000)
  }

  const handleToggleNotif = () => {
    const updated = { ...settings, notificationsEnabled: !settings.notificationsEnabled }
    saveSettings(updated)
    playPixelSFX('click')
    setToastMsg(updated.notificationsEnabled ? 'Pengingat harian aktif' : 'Notifikasi dimatikan')
    setTimeout(() => setToastMsg(''), 2000)
  }

  const handleToggleAnim = () => {
    const updated = { ...settings, animationsEnabled: !settings.animationsEnabled }
    saveSettings(updated)
    playPixelSFX('click')
    setToastMsg(updated.animationsEnabled ? 'Animasi gerakan diaktifkan' : 'Mode animasi ringan aktif')
    setTimeout(() => setToastMsg(''), 2000)
  }

  const handleSetTheme = (themeName) => {
    const updated = { ...settings, theme: themeName }
    saveSettings(updated)
    playPixelSFX('click')
    setToastMsg(`Tema diganti ke ${themeName.toUpperCase()}`)
    setTimeout(() => setToastMsg(''), 2000)
  }

  const handleLogoutAction = () => {
    playPixelSFX('click')
    logout()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-surface rounded-3xl border border-surface-variant p-6 shadow-2xl space-y-5 relative select-none">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Icon name="tune" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-on-surface">Pengaturan Aplikasi</h3>
            <p className="text-xs text-on-surface-variant">Kustomisasi tema, animasi, suara, dan autentikasi.</p>
          </div>
        </div>

        <div className="space-y-4 pt-1">
          {/* Theme Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface block">Pilih Tema Visual</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSetTheme('light')}
                className={`p-3 rounded-2xl border text-center transition ${
                  settings.theme === 'light'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-surface-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                <Icon name="light_mode" size={20} className="mx-auto mb-1 text-amber-500" />
                <div className="text-xs font-bold">Light Emerald</div>
              </button>

              <button
                type="button"
                onClick={() => handleSetTheme('dark')}
                className={`p-3 rounded-2xl border text-center transition ${
                  settings.theme === 'dark'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-surface-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                <Icon name="dark_mode" size={20} className="mx-auto mb-1 text-indigo-400" />
                <div className="text-xs font-bold">Slate Dark</div>
              </button>

              <button
                type="button"
                onClick={() => handleSetTheme('pixel')}
                className={`p-3 rounded-2xl border text-center transition ${
                  settings.theme === 'pixel'
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                    : 'border-surface-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                <Icon name="grid_view" size={20} className="mx-auto mb-1 text-emerald-500" />
                <div className="text-xs font-bold">Pixel 8-Bit</div>
              </button>
            </div>
          </div>

          {/* Toggles List */}
          <div className="space-y-2 pt-1">
            {/* Suara SFX Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant/60">
              <div className="flex items-center gap-3">
                <Icon name="volume_up" size={20} className="text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Efek Suara Interaksi (SFX)</h4>
                  <p className="text-[10px] text-on-surface-variant">Suara umpan balik klik untuk seluruh tombol di browser.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleSound}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.soundEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                } flex items-center`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Backsound Pixel BGM Music Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant/60">
              <div className="flex items-center gap-3">
                <Icon name="music_note" size={20} className="text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Musik Backsound 8-Bit Pixel (BGM)</h4>
                  <p className="text-[10px] text-on-surface-variant">Melodi retro arcade santai saat belajar.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleBGM}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.bgmEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                } flex items-center`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Animasi Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant/60">
              <div className="flex items-center gap-3">
                <Icon name="animation" size={20} className="text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Animasi & Transisi Gerak</h4>
                  <p className="text-[10px] text-on-surface-variant">Efek gerak interaktif & pendaran glow.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleAnim}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.animationsEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                } flex items-center`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Mode Admin Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-2xl border border-surface-variant/60">
              <div className="flex items-center gap-3">
                <Icon name="verified_user" size={20} className="text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Mode Admin (Buka Semua Modul)</h4>
                  <p className="text-[10px] text-on-surface-variant">Membuka seluruh kurikulum tanpa terkunci.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleAdminMode()}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  adminMode ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                } flex items-center`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* LOGOUT OPTION (Door Exit Icon) */}
            {isLoggedIn && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogoutAction}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-error/10 border border-error/20 text-error hover:bg-error hover:text-white transition font-bold text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="logout" size={20} />
                    Keluar dari Sesi (Logout)
                  </span>
                  <Icon name="door_back" size={20} />
                </button>
              </div>
            )}
          </div>
        </div>


        {toastMsg && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-inverse-surface text-inverse-on-surface text-xs font-bold rounded-xl shadow-xl animate-bounce">
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  )
}
