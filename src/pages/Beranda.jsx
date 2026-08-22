import { useNavigate } from 'react-router-dom'
import heroLayers from '../assets/hero.png'
import Icon from '../components/Icon'
import { LEARNING_MODULES, QUIZ_QUESTIONS } from '../data/learningContent'

const courses = [
  {
    icon: 'html',
    title: 'Dasar Web',
    desc: 'Pahami struktur dan gaya dasar dengan HTML & CSS.',
    bg: 'bg-error-container',
    text: 'text-on-error-container',
    progress: 33,
    path: '/detail-uiux',
  },
  {
    icon: 'javascript',
    title: 'Logika JS',
    desc: 'Buat website interaktif dengan JavaScript modern.',
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed-variant',
    progress: 0,
    path: '/belajar',
  },
  {
    icon: 'data_object',
    title: 'Arsitektur React',
    desc: 'Bangun UI kompleks dengan komponen modular.',
    bg: 'bg-secondary-fixed',
    text: 'text-on-secondary-fixed',
    progress: 0,
    path: '/detail-react',
  },
  {
    icon: 'hub',
    title: 'Ekosistem Modern',
    desc: 'Kuasai alat build, Git, dan deployment.',
    bg: 'bg-primary-container',
    text: 'text-on-primary-container',
    progress: 0,
    path: '/dashboard',
  },
]

function CourseCard({ course, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-surface-container-lowest rounded-[28px] p-6 text-left card-tactile flex flex-col gap-5 cursor-pointer transition-all hover:-translate-y-0.5"
    >
      <div className={`w-12 h-12 rounded-2xl ${course.bg} ${course.text} flex items-center justify-center shrink-0`}> 
        <Icon name={course.icon} size={24} />
      </div>
      <div className="space-y-2 flex-1">
        <h3 className="text-[17px] font-bold text-on-surface">{course.title}</h3>
        <p className="text-sm leading-6 font-medium text-on-surface-variant">{course.desc}</p>
      </div>
      <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${course.progress}%` }}
        />
      </div>
    </button>
  )
}

export default function Beranda() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 w-full max-w-[1180px] mx-auto px-5 md:px-8 py-8 flex flex-col gap-10">
      <section id="tentang" className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 w-fit">
            <Icon name="local_fire_department" size={18} />
            Tantangan Harian Tersedia!
          </div>

          <div className="space-y-4 max-w-2xl">
            <h1 className="text-[42px] md:text-[52px] leading-[1.05] tracking-tight font-extrabold text-on-background">
              Belajar Coding <br />
              <span className="text-primary">dengan Ceria</span>
            </h1>
            <p className="text-[17px] leading-8 font-medium text-on-surface-variant">
              Kuasai frontend engineering dengan cara yang seru dan mudah dipahami. Bangun proyek nyata, kumpulkan poin, dan raih mimpimu bersama FrontEnd Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={() => navigate('/belajar')}
              className="px-8 py-4 bg-primary text-on-primary rounded-full text-sm font-bold btn-tactile border-b-4 border-on-primary-fixed-variant hover:bg-surface-tint transition-colors"
            >
              Mulai Belajar
            </button>
            <a
              href="#kursus"
              className="px-8 py-4 rounded-full border border-surface-variant bg-surface-container-lowest text-on-surface font-bold transition hover:bg-surface-container"
            >
              Lihat Kursus
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[24px] border border-surface-variant/70 bg-surface-container-lowest p-4">
              <p className="text-[13px] uppercase font-bold tracking-[0.2em] text-primary/90">Kursus</p>
              <p className="mt-3 text-[22px] font-extrabold text-on-surface">4</p>
            </div>
            <div className="rounded-[24px] border border-surface-variant/70 bg-surface-container-lowest p-4">
              <p className="text-[13px] uppercase font-bold tracking-[0.2em] text-primary/90">Latihan</p>
              <p className="mt-3 text-[22px] font-extrabold text-on-surface">{QUIZ_QUESTIONS.length}</p>
            </div>
            <div className="rounded-[24px] border border-surface-variant/70 bg-surface-container-lowest p-4">
              <p className="text-[13px] uppercase font-bold tracking-[0.2em] text-primary/90">Kemajuan</p>
              <p className="mt-3 text-[22px] font-extrabold text-on-surface">75%</p>
            </div>
          </div>
        </div>

        <div className="learning-hero relative min-h-[420px] overflow-hidden rounded-[32px] border border-secondary/20 bg-inverse-surface p-5 text-inverse-on-surface shadow-[0_36px_90px_-50px_rgba(0,0,0,0.45)] sm:p-7">
          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111b27]/90 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-error-container" />
                <span className="h-2.5 w-2.5 rounded-full bg-tertiary-fixed" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary-fixed-dim" />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-inverse-on-surface/55">course-card.jsx</span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-xs leading-6 sm:text-sm">
              <p><span className="text-[#ffb4ab]">const</span> <span className="text-[#adc6ff]">belajar</span> = <span className="text-[#4ae176]">async</span> () =&gt; {'{'}</p>
              <p className="pl-5 text-white/55">// tumbuh satu langkah setiap hari</p>
              <p className="pl-5"><span className="text-[#ffdea0]">await</span> practice(<span className="text-[#b6f2c2]">'frontend'</span>)</p>
              <p className="pl-5"><span className="text-[#ffb4ab]">return</span> <span className="text-[#b6f2c2]">'Siap berkarya!'</span></p>
              <p>{'}'}</p>
            </div>
          </div>

          <img
            src={heroLayers}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-8 w-[260px] opacity-80 sm:w-[310px]"
          />

          <div className="absolute bottom-7 left-6 z-20 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fixed-dim text-on-primary-fixed"><Icon name="verified" size={19} /></span>
              <div>
                <p className="text-xs font-bold text-white/60">Proyek minggu ini</p>
                <p className="mt-0.5 text-sm font-extrabold text-white">Portfolio responsive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BANNER: HALAMAN BELAJAR & LATIHAN TERPISAH */}
      <section className="rounded-[32px] bg-white border border-surface-variant p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container/20 px-3.5 py-1 text-xs font-bold text-secondary border border-secondary/30">
            <Icon name="layers" size={16} />
            <span>Dokumentasi Komponen & Modul</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            Belajar dulu, uji pemahaman setelahnya
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Jelajahi {LEARNING_MODULES.length} materi komponen, UI/UX, HTML, CSS, dan Next.js di perpustakaan. Saat siap, buka halaman latihan terpisah dengan {QUIZ_QUESTIONS.length} soal dan pembahasan.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => navigate('/modul')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm btn-tactile border-b-4 border-on-primary-fixed-variant flex items-center justify-center gap-2"
          >
            <Icon name="grid_view" size={18} />
            <span>Buka Halaman Belajar</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/latihan-soal')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-surface-container-high hover:bg-surface-container text-on-surface font-bold text-sm border border-surface-variant transition flex items-center justify-center gap-2"
          >
            <Icon name="quiz" size={18} />
            <span>Kerjakan Soal</span>
          </button>
        </div>
      </section>

      <section id="kursus" className="scroll-mt-20 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[26px] md:text-[30px] font-extrabold text-on-background">Pilih Jalur Belajarmu</h2>
            <p className="mt-2 text-sm text-on-surface-variant max-w-2xl">
              Temukan materi yang cocok untuk levelmu dan lanjutkan dengan pelajaran yang paling relevan.
            </p>
          </div>
          <p className="text-sm text-on-surface-variant">Klik kartu kursus untuk melihat detail materi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.title}
              course={course}
              onClick={() => navigate(course.path)}
            />
          ))}
        </div>
      </section>

      <footer className="mt-auto w-full py-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-t border-surface-container-highest/60">
        <div className="text-sm font-bold text-primary">FrontEnd Academy</div>
        <div className="text-sm text-on-surface-variant text-center">© 2026 FrontEnd Academy. Belajar dengan ceria.</div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-on-surface-variant">
          <a className="hover:text-primary transition-colors" href="#tentang">Tentang</a>
          <button type="button" className="hover:text-primary transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button type="button" className="hover:text-primary transition-colors" onClick={() => navigate('/pencapaian')}>Pencapaian</button>
        </div>
      </footer>
    </div>
  )
}
