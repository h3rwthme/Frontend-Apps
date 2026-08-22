import { useState } from 'react'
import Logo from './Logo'
import { NavLink } from "react-router-dom"
import Icon from './Icon'
import ProfileModal from './ProfileModal'
import SettingsModal from './SettingsModal'
import { useUserProfile, useAdminMode, useAuth } from '../data/userState'

const navItems = [
  { icon: 'dashboard', label: 'Beranda', to: '/' },
  { icon: 'menu_book', label: 'Belajar Komponen', to: '/modul' },
  { icon: 'quiz', label: 'Latihan Soal', to: '/latihan-soal' },
  { icon: 'menu_book', label: 'Kursus Saya', to: '/detail-react' },
  { icon: 'code', label: 'Lab Coding', to: '/dashboard' },
  { icon: 'emoji_events', label: 'Pencapaian', to: '/pencapaian' },
]

function SidebarNavItem({ icon, label, to }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === '/'}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-150 group hover:-translate-x-0.5 ${
            isActive
              ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name={icon} size={20} className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
            <span className="truncate">{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  const [profile] = useUserProfile()
  const [adminMode, toggleAdminMode] = useAdminMode()
  const { isLoggedIn } = useAuth()
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  return (
    <>
      <nav className="bg-surface h-screen w-60 hidden md:flex flex-col border-r border-surface-container-highest/60 fixed left-0 top-0 px-4 py-6 z-40">
        {/* Brand Header */}
        <div className="mb-5 px-2">
          <Logo variant="full" size="md" />
        </div>

        {/* Auth / User Profile Card */}
        {isLoggedIn ? (
          <div className="mb-4 space-y-2">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full group flex items-center gap-3 px-3 py-2.5 bg-surface-container-lowest rounded-2xl border border-surface-variant/60 shadow-xs hover:border-primary/40 hover:bg-primary/5 transition text-left cursor-pointer relative overflow-hidden"
              title="Klik untuk edit profil"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="overflow-hidden min-w-0 flex-1">
                <h3 className="text-[13px] font-bold text-on-surface truncate flex items-center gap-1">
                  {profile.name}
                  <Icon name="edit" size={13} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-[10px] font-semibold text-primary truncate">{profile.handle}</p>
              </div>
            </button>

            {/* Settings Quick Bar */}
            <div className="flex items-center gap-2 px-1">
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl bg-surface-container-low border border-surface-variant/50 text-xs font-bold text-on-surface-variant hover:bg-surface-container transition"
              >
                <span className="flex items-center gap-1.5">
                  <Icon name="tune" size={15} className="text-primary" /> Pengaturan
                </span>
                <Icon name="chevron_right" size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-surface-container-low rounded-2xl border border-surface-variant text-center space-y-2">
            <p className="text-xs font-bold text-on-surface">Belum Autentikasi</p>
            <NavLink
              to="/login"
              className="w-full py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs block text-center"
            >
              Masuk / Daftar
            </NavLink>
          </div>
        )}

        {/* Admin Mode Toggle */}
        <div className="mb-4 px-3 py-2 rounded-xl bg-surface-container-low border border-surface-variant/50 flex items-center justify-between text-xs">
          <span className="font-bold text-on-surface-variant flex items-center gap-1 text-[11px]">
            <Icon name="verified_user" size={15} className="text-primary" /> Mode Admin
          </span>
          <button
            type="button"
            onClick={() => toggleAdminMode()}
            className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
              adminMode ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
            } flex items-center`}
            title={adminMode ? 'Mode Admin Aktif' : 'Aktifkan Mode Admin'}
          >
            <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
          </button>
        </div>

        {/* Main Navigation Links */}
        <ul className="flex flex-col gap-1 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {navItems.map((item) => (
            <SidebarNavItem key={item.label} {...item} />
          ))}
        </ul>

        {/* Bottom CTA Button */}
        <NavLink
          to="/modul"
          className="mt-3 w-full py-3 bg-primary text-on-primary rounded-2xl text-[14px] font-semibold btn-tactile border-b-4 border-on-primary-fixed-variant text-center block transition-all hover:bg-surface-tint hover:scale-[1.01] active:scale-95"
        >
          Buka Perpustakaan
        </NavLink>
      </nav>

      {/* Modals */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </>
  )
}
