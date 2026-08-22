import { useState } from 'react'
import Icon from './Icon'
import { useUserProfile, PRESET_AVATARS } from '../data/userState'

export default function ProfileModal({ isOpen, onClose }) {
  const [profile, saveProfile] = useUserProfile()
  const [name, setName] = useState(profile.name)
  const [handle, setHandle] = useState(profile.handle)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl)
  const [customUrl, setCustomUrl] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!isOpen) return null

  const handleSave = (e) => {
    e.preventDefault()
    saveProfile({
      ...profile,
      name: name.trim() || 'Alex Rivera',
      handle: handle.trim() || '@alex.dev',
      avatarUrl: customUrl.trim() || avatarUrl || '/avatar.png',
    })
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
      onClose()
    }, 1000)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
        setCustomUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl border border-surface-variant p-6 shadow-2xl space-y-5 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Icon name="account_circle" size={26} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-on-surface">Edit Profil Pelajar</h3>
            <p className="text-xs text-on-surface-variant">Ubah foto profil & username sesuai keinginanmu.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface block">Foto Profil</label>
            <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-2xl border border-surface-variant">
              <img
                src={customUrl || avatarUrl}
                alt="Preview Avatar"
                className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/20 shrink-0"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer hover:bg-primary/90 transition">
                  <Icon name="cloud_upload" size={16} />
                  Unggah Foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
                <p className="text-[10px] text-on-surface-variant truncate">PNG, JPG, atau WebP</p>
              </div>
            </div>

            {/* Preset Avatars */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-on-surface-variant">Pilih Avatar Preset:</span>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAvatarUrl(url)
                      setCustomUrl('')
                    }}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                      avatarUrl === url && !customUrl ? 'border-primary scale-110 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface block">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Alex Rivera"
              className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-surface-variant bg-surface-bright outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Handle Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface block">Username / Handle</label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="Contoh: @alex.dev"
              className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-surface-variant bg-surface-bright outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-surface-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary/90 transition flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Icon name="check" size={16} /> Tersimpan!
                </>
              ) : (
                'Simpan Profil'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
