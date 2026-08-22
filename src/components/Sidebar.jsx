import { NavLink } from 'react-router-dom'
import Icon from './Icon'

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
          `flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-150 ${
            isActive
              ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name={icon} size={21} className={isActive ? 'text-primary' : ''} />
            <span className="truncate">{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  return (
    <nav className="bg-surface h-screen w-60 hidden md:flex flex-col border-r border-surface-container-highest/60 fixed left-0 top-0 px-4 py-6 z-40">
      <div className="mb-6 px-2">
        <NavLink to="/" className="flex items-center gap-3 text-[19px] font-bold text-primary tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-on-primary shadow-[0_3px_0_0_#005321]">F</span>
          <span>FrontEnd<br />Academy</span>
        </NavLink>
      </div>

      <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-surface-container-lowest rounded-2xl border border-surface-variant/60">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-[16px] font-bold shrink-0">
          P
        </div>
        <div className="overflow-hidden">
          <h3 className="text-[14px] font-semibold text-on-surface truncate">Halo, Pelajar!</h3>
          <p className="text-[12px] font-medium text-on-surface-variant truncate">Siap coding hari ini?</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <SidebarNavItem key={item.label} {...item} />
        ))}
      </ul>

      <NavLink
        to="/modul"
        className="mt-4 w-full py-3 bg-primary text-on-primary rounded-2xl text-[15px] font-semibold btn-tactile border-b-4 border-on-primary-fixed-variant text-center block transition-colors hover:bg-surface-tint"
      >
        Buka Perpustakaan
      </NavLink>
    </nav>
  )
}
