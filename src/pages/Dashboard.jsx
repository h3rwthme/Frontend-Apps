import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedNode, setSelectedNode] = useState('react')

  return (
    <div className="flex-1 w-full max-w-[960px] mx-auto px-5 md:px-8 flex flex-col gap-8 pt-4 pb-24 md:pb-8">
      {/* Greeting */}
      <section>
        <h1 className="text-[28px] md:text-[36px] leading-[1.15] tracking-tight font-extrabold text-on-surface">
          Halo, Pelajar!
        </h1>
        <p className="text-[16px] leading-[1.5] font-medium text-on-surface-variant mt-1">
          Lanjutkan perjalanan belajarmu hari ini.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Progress + Active Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Overall Progress */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl card-tactile flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 mb-3">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
                  />
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeWidth="3.5" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18px] font-extrabold text-on-surface">75%</span>
                </div>
              </div>
              <h3 className="text-[16px] font-bold text-on-surface">Progres Keseluruhan</h3>
              <p className="text-[13px] font-medium text-on-surface-variant mt-0.5">3 Kursus Aktif</p>
            </div>

            {/* Active Course Card */}
            <div className="bg-secondary-container text-on-secondary-container p-5 rounded-2xl border-b-4 border-on-secondary-fixed-variant flex flex-col justify-between">
              <div>
                <span className="inline-block bg-surface-container-lowest text-secondary text-[12px] font-bold px-2.5 py-1 rounded-full mb-3">
                  Sedang Berjalan
                </span>
                <h3 className="text-[20px] md:text-[22px] leading-[1.2] tracking-tight font-extrabold mb-1.5">
                  Membangun UI yang Tangguh
                </h3>
                <p className="text-[13px] font-medium opacity-90 mb-4">
                  Modul 4: State Management Dasar
                </p>
              </div>
              <button
                onClick={() => navigate('/detail-react')}
                className="bg-surface-container-lowest text-secondary text-[14px] font-bold py-2.5 px-5 rounded-xl border-b-3 border-surface-container-highest hover:scale-[1.01] active:translate-y-[1px] transition-all w-fit"
              >
                Lanjutkan Belajar
              </button>
            </div>
          </div>

          {/* Curriculum Map */}
          <section className="bg-surface-container-lowest p-5 rounded-2xl card-tactile">
            <h3 className="text-[16px] font-bold text-on-surface mb-6 text-center md:text-left">Peta Kurikulum</h3>
            <div className="flex flex-col items-center gap-4 relative py-2">
              <div className="absolute top-0 bottom-0 w-1.5 bg-surface-container-highest rounded-full left-1/2 -translate-x-1/2 z-0" />

              {/* Node 1 — HTML (Completed) */}
              <button
                onClick={() => setSelectedNode('html')}
                className={`z-10 w-12 h-12 rounded-full flex items-center justify-center border-b-3 transition-all duration-200 ${
                  selectedNode === 'html'
                    ? 'bg-primary border-on-primary-fixed-variant scale-110 shadow-md'
                    : 'bg-primary/80 border-on-primary-fixed-variant hover:scale-105'
                }`}
                aria-label="Modul HTML/CSS (Selesai)"
              >
                <Icon name="check" size={20} className="text-on-primary" />
              </button>

              {/* Node 2 — React (Current) */}
              <button
                onClick={() => setSelectedNode('react')}
                className={`z-10 w-14 h-14 rounded-full flex items-center justify-center border-b-3 transition-all duration-200 ${
                  selectedNode === 'react'
                    ? 'bg-primary-container border-on-primary-fixed-variant scale-110 shadow-md'
                    : 'bg-primary-container/80 border-on-primary-fixed-variant hover:scale-105'
                }`}
                aria-label="Modul React (Saat Ini)"
              >
                <Icon name="star" size={24} className="text-on-primary-container" />
              </button>

              {/* Node 3 — Locked */}
              <button
                onClick={() => setSelectedNode('locked')}
                className={`z-10 w-12 h-12 rounded-full flex items-center justify-center border-b-3 transition-all duration-200 ${
                  selectedNode === 'locked'
                    ? 'bg-surface-variant border-surface-dim scale-110'
                    : 'bg-surface-variant/80 border-surface-dim hover:scale-105'
                }`}
                aria-label="Modul Terkunci"
              >
                <Icon name="lock" size={20} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Label */}
            <div className="text-center mt-4 mb-2">
              <span className="inline-block bg-surface-container text-on-surface text-[12px] font-bold px-3 py-1 rounded-full border border-surface-variant/60">
                {selectedNode === 'react' ? '⭐ Modul Saat Ini — React' : selectedNode === 'html' ? '✅ Dasar HTML/CSS — Selesai' : '🔒 Modul Terkunci'}
              </span>
            </div>

            <div className="text-center mt-4">
              {selectedNode === 'html' && (
                <button
                  onClick={() => navigate('/detail-uiux')}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-[14px] font-bold btn-tactile border-b-4 border-on-primary-fixed-variant"
                >
                  Buka Modul HTML/CSS
                </button>
              )}
              {selectedNode === 'react' && (
                <button
                  onClick={() => navigate('/detail-react')}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-[14px] font-bold btn-tactile border-b-4 border-on-primary-fixed-variant"
                >
                  Buka Modul React
                </button>
              )}
              {selectedNode === 'locked' && (
                <p className="text-on-surface-variant font-bold text-[13px]">
                  Selesaikan modul React terlebih dahulu!
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Achievement Badge */}
          <section className="bg-tertiary-fixed/30 text-on-tertiary-container p-5 rounded-2xl border border-tertiary-fixed/50 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-3 bg-surface-container-lowest rounded-full flex items-center justify-center border-2 border-tertiary-fixed shrink-0">
              <Icon name="military_tech" size={30} className="text-tertiary" />
            </div>
            <h3 className="text-[16px] font-bold">State Master</h3>
            <p className="text-[13px] font-medium opacity-80 mt-0.5">Lencana terbaru diperoleh!</p>
          </section>

          {/* Daily Stats */}
          <section className="bg-surface-container-lowest p-5 rounded-2xl card-tactile">
            <h3 className="text-[16px] font-bold text-on-surface mb-3">Statistik Harian</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-surface-container-highest/60">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Icon name="local_fire_department" size={20} />
                  <span className="text-[14px] font-medium">Streak Belajar</span>
                </div>
                <span className="text-[15px] font-bold text-primary">5 Hari</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Icon name="timer" size={20} />
                  <span className="text-[14px] font-medium">Waktu Hari Ini</span>
                </div>
                <span className="text-[15px] font-bold text-on-surface">45 Menit</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
