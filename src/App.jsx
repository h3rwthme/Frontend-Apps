import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Beranda from './pages/Beranda'
import DetailReact from './pages/DetailReact'
import Dashboard from './pages/Dashboard'
import MobileBelajar from './pages/MobileBelajar'
import DetailUIUX from './pages/DetailUIUX'
import Pencapaian from './pages/Pencapaian'
import ModulPembelajaran from './pages/ModulPembelajaran'
import LatihanSoal from './pages/LatihanSoal'
import LoginPage from './pages/LoginPage'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import BottomNav from './components/BottomNav'
import NotFound from './pages/NotFound'
import { useAuth } from './data/userState'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
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
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes — Redirect to /login if not authenticated */}
        <Route path="/" element={<ProtectedRoute><AppLayout><Beranda /></AppLayout></ProtectedRoute>} />
        <Route path="/modul" element={<ProtectedRoute><AppLayout><ModulPembelajaran /></AppLayout></ProtectedRoute>} />
        <Route path="/latihan-soal" element={<ProtectedRoute><AppLayout><LatihanSoal /></AppLayout></ProtectedRoute>} />
        <Route path="/detail-react" element={<ProtectedRoute><AppLayout><DetailReact /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/belajar" element={<ProtectedRoute><MobileBelajar /></ProtectedRoute>} />
        <Route path="/detail-uiux" element={<ProtectedRoute><AppLayout><DetailUIUX /></AppLayout></ProtectedRoute>} />
        <Route path="/pencapaian" element={<ProtectedRoute><AppLayout><Pencapaian /></AppLayout></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><AppLayout><NotFound /></AppLayout></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  )
}
