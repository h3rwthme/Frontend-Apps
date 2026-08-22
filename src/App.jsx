import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailReact from './pages/DetailReact'
import Dashboard from './pages/Dashboard'
import MobileBelajar from './pages/MobileBelajar'
import DetailUIUX from './pages/DetailUIUX'
import Pencapaian from './pages/Pencapaian'
import ModulPembelajaran from './pages/ModulPembelajaran'
import LatihanSoal from './pages/LatihanSoal'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import BottomNav from './components/BottomNav'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function AppLayout({ children }) {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden md:ml-60 flex flex-col min-h-screen pb-20 md:pb-0 relative">
        <MobileHeader />
        <div className="flex-1">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout><Beranda /></AppLayout>} />
        <Route path="/modul" element={<AppLayout><ModulPembelajaran /></AppLayout>} />
        <Route path="/latihan-soal" element={<AppLayout><LatihanSoal /></AppLayout>} />
        <Route path="/detail-react" element={<AppLayout><DetailReact /></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/belajar" element={<MobileBelajar />} />
        <Route path="/detail-uiux" element={<AppLayout><DetailUIUX /></AppLayout>} />
        <Route path="/pencapaian" element={<AppLayout><Pencapaian /></AppLayout>} />
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
