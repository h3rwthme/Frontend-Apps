import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth, useUserProfile } from '../data/userState'
import { playPixelSFX } from '../data/soundEffects'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [profile, saveProfile] = useUserProfile()
  
  const [activeTab, setActiveTab] = useState('login') // 'login' | 'register'
  
  // Login Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Register Form state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [regError, setRegError] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [socialProvider, setSocialProvider] = useState(null)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    playPixelSFX('click')
    setIsSubmitting(true)

    setTimeout(() => {
      saveProfile({
        ...profile,
        name: email ? email.split('@')[0] : 'Pelajar Frontend',
        handle: email ? `@${email.split('@')[0]}` : '@pelajar.dev',
      })
      login()
      playPixelSFX('powerup')
      setIsSubmitting(false)
      navigate('/modul')
    }, 900)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    playPixelSFX('click')

    if (regPassword !== regConfirmPassword) {
      setRegError('Konfirmasi kata sandi tidak cocok.')
      return
    }
    setRegError('')
    setIsSubmitting(true)

    setTimeout(() => {
      saveProfile({
        name: regName.trim() || 'Pelajar Baru',
        handle: regEmail ? `@${regEmail.split('@')[0]}` : '@pelajar.dev',
        level: 'Level 1 · Frontend Explorer',
        avatarUrl: '/avatar.png',
      })
      login()
      playPixelSFX('powerup')
      setIsSubmitting(false)
      navigate('/modul')
    }, 1000)
  }

  const handleSocialAuth = (provider) => {
    playPixelSFX('coin')
    setSocialProvider(provider)
    setIsSubmitting(true)

    setTimeout(() => {
      saveProfile({
        name: `${provider} Dev`,
        handle: `@${provider.toLowerCase()}.dev`,
        level: 'Level 1 · Frontend Explorer',
        avatarUrl: '/avatar.png',
      })
      login()
      playPixelSFX('powerup')
      setIsSubmitting(false)
      navigate('/modul')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#121C28] flex flex-col justify-center items-center p-4 relative overflow-hidden font-mono select-none">
      {/* Crisp 8-Bit Pixel Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />

      {/* Main Pixel Card (Clean White Box with Sharp 8-bit Borders) */}
      <div className="w-full max-w-lg bg-white border-4 border-[#121C28] p-6 sm:p-8 shadow-[12px_12px_0px_0px_#121C28] relative z-10 animate-fadeIn">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 pb-3">
          <div className="w-16 h-16 mx-auto bg-[#121C28] text-white border-3 border-[#121C28] shadow-[4px_4px_0px_0px_#006E2F] flex items-center justify-center font-black text-xl">
            FA
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-[#121C28] uppercase">
              FRONTEND ACADEMY
            </h1>
            <p className="text-xs font-bold text-[#59645B] mt-1">
              PORTAL AUTENTIKASI PENGEMBANG FRONTEND
            </p>
          </div>
        </div>

        {/* Tab Switch: Login vs Register */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-[#F1F5F9] border-3 border-[#121C28]">
          <button
            type="button"
            onClick={() => {
              playPixelSFX('click')
              setActiveTab('login')
            }}
            className={`py-2.5 text-xs font-black uppercase tracking-wider transition ${
              activeTab === 'login'
                ? 'bg-[#121C28] text-white border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#006E2F]'
                : 'text-[#121C28] hover:bg-white'
            }`}
          >
            MASUK (LOGIN)
          </button>
          <button
            type="button"
            onClick={() => {
              playPixelSFX('click')
              setActiveTab('register')
            }}
            className={`py-2.5 text-xs font-black uppercase tracking-wider transition ${
              activeTab === 'register'
                ? 'bg-[#121C28] text-white border-2 border-[#121C28] shadow-[2px_2px_0px_0px_#006E2F]'
                : 'text-[#121C28] hover:bg-white'
            }`}
          >
            DAFTAR AKUN
          </button>
        </div>

        {/* Social OAuth Integration */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-black text-[#64748B] uppercase block text-center">
            AKSES CEPAT VIA OAUTH
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              className="py-2.5 px-2 bg-white hover:bg-[#F8FAFC] text-[#121C28] font-black text-[11px] border-3 border-[#121C28] shadow-[3px_3px_0px_0px_#121C28] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition flex items-center justify-center gap-1.5"
            >
              <Icon name="search" size={15} className="text-[#DB4437]" /> GOOGLE
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth('Facebook')}
              className="py-2.5 px-2 bg-white hover:bg-[#F8FAFC] text-[#121C28] font-black text-[11px] border-3 border-[#121C28] shadow-[3px_3px_0px_0px_#121C28] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition flex items-center justify-center gap-1.5"
            >
              <Icon name="share" size={15} className="text-[#4267B2]" /> FACEBOOK
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth('GitHub')}
              className="py-2.5 px-2 bg-white hover:bg-[#F8FAFC] text-[#121C28] font-black text-[11px] border-3 border-[#121C28] shadow-[3px_3px_0px_0px_#121C28] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition flex items-center justify-center gap-1.5"
            >
              <Icon name="code" size={15} className="text-[#24292e]" /> GITHUB
            </button>
          </div>
        </div>

        <div className="my-4 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-[#121C28]" />
          <span className="text-[10px] font-black text-[#64748B] uppercase">ATAU FORMULIR PIXEL</span>
          <div className="h-0.5 flex-1 bg-[#121C28]" />
        </div>

        {/* Tab 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase flex justify-between">
                <span>EMAIL / USERNAME</span>
                <span className="text-[#006E2F]">DIWAKILKAN</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@domain.com"
                className="w-full h-11 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase flex justify-between">
                <span>KATA SANDI</span>
                <span className="text-[#64748B]">RAHASIA</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●●●"
                className="w-full h-11 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-3 bg-[#121C28] hover:bg-[#006E2F] text-white font-black text-xs tracking-widest border-3 border-[#121C28] shadow-[5px_5px_0px_0px_#006E2F] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-pulse">MEMPROSES AUTENTIKASI...</span>
              ) : (
                'MASUK SEKARANG'
              )}
            </button>
          </form>
        )}

        {/* Tab 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            {regError && (
              <div className="p-2 bg-[#FEE2E2] border-2 border-[#991B1B] text-[#991B1B] text-[11px] font-bold">
                {regError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase">NAMA LENGKAP</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Contoh: Alex Rivera"
                className="w-full h-10 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase">ALAMAT EMAIL</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="alex@domain.com"
                className="w-full h-10 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase">KATA SANDI</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Minimal 8 Karakter"
                className="w-full h-10 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-[#121C28] uppercase">KONFIRMASI KATA SANDI</label>
              <input
                type="password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Ulangi Kata Sandi"
                className="w-full h-10 px-3 text-xs font-bold border-3 border-[#121C28] bg-white text-[#121C28] outline-none shadow-[3px_3px_0px_0px_#121C28] focus:bg-[#F1F5F9]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 bg-[#006E2F] hover:bg-[#121C28] text-white font-black text-xs tracking-widest border-3 border-[#121C28] shadow-[5px_5px_0px_0px_#121C28] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-pulse">MEMBUAT AKUN BARU...</span>
              ) : (
                'BUAT AKUN BARU'
              )}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t-2 border-dashed border-[#121C28] flex items-center justify-between text-[10px] font-black text-[#64748B]">
          <span>VERSI 2.5.0 SYSTEM</span>
          <span className="text-[#006E2F]">ENKRIPSI AMAN</span>
        </div>
      </div>
    </div>
  )
}
