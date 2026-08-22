import { NavLink } from 'react-router-dom'
import Icon from './Icon'

const bottomNavItems = [
  { icon: 'dashboard', label: 'Beranda', to: '/' },
  { icon: 'menu_book', label: 'Belajar', to: '/modul' },
  { icon: 'quiz', label: 'Latihan', to: '/latihan-soal' },
  { icon: 'code', label: 'Lab', to: '/dashboard' },
  { icon: 'emoji_events', label: 'Pencapaian', to: '/pencapaian' },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-surface/95 backdrop-blur-md border-t border-surface-container-highest/60">
      {bottomNavItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 min-w-[56px] ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} size={23} className={`transition-all duration-150 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
