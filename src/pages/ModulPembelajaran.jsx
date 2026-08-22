import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { LEARNING_CATEGORIES, LEARNING_MODULES, QUIZ_QUESTIONS } from '../data/learningContent'
import { useAdminMode, useUserProfile, getUnlockedModules, unlockModule } from '../data/userState'
import ProfileModal from '../components/ProfileModal'

const CATEGORY_NAMES = Object.fromEntries(LEARNING_CATEGORIES.map((category) => [category.id, category.label]))

// Level ordering for strict Basic -> Expert sorting
const LEVEL_ORDER = { 'Dasar': 1, 'Menengah': 2, 'Lanjutan': 3 }

function PreviewShell({ children, label = 'Preview komponen' }) {
  return (
    <div className="component-preview" role="group" aria-label={label}>
      <div className="component-preview__grid" aria-hidden="true" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}

function ComponentPreview({ module }) {
  const [switchOn, setSwitchOn] = useState(true)
  const [activeTab, setActiveTab] = useState('HTML')
  const [showToast, setShowToast] = useState(true)

  if (module.id === 'navbar') {
    return (
      <PreviewShell label="Navbar & Top Header Preview">
        <div className="w-full max-w-xl mx-auto rounded-2xl border border-surface-variant bg-white overflow-hidden shadow-sm">
          <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-surface-variant">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-primary text-white font-bold flex items-center justify-center text-xs">FA</span>
              <span className="font-extrabold text-sm text-on-surface">FrontEnd</span>
            </div>
            <nav className="hidden sm:flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
              <span className="text-primary font-bold border-b-2 border-primary pb-0.5">Beranda</span>
              <span className="hover:text-primary cursor-pointer">Materi</span>
              <span className="hover:text-primary cursor-pointer">Latihan</span>
            </nav>
            <div className="flex items-center gap-2">
              <button type="button" className="hidden sm:block text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl">Masuk</button>
              <button type="button" onClick={() => setSwitchOn(!switchOn)} className="sm:hidden p-1.5 text-on-surface-variant rounded-lg border border-surface-variant">
                <Icon name={switchOn ? 'close' : 'menu'} size={18} />
              </button>
            </div>
          </header>
          {switchOn && (
            <div className="sm:hidden p-3 bg-surface-container-low border-b border-surface-variant text-xs space-y-2 font-semibold">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">Beranda</div>
              <div className="p-2 text-on-surface-variant">Materi</div>
              <div className="p-2 text-on-surface-variant">Latihan</div>
            </div>
          )}
          <div className="p-4 text-center text-xs text-on-surface-variant bg-surface-bright">
            Header Sticky dengan navigasi responsif & mobile menu toggle.
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'grid-layout') {
    return (
      <PreviewShell label="CSS 12-Column Grid System">
        <div className="w-full max-w-xl mx-auto space-y-3">
          <div className="text-xs font-semibold text-center text-primary mb-1">Simulasi Grid Layout 12-Kolom (Web App Structure)</div>
          <div className="grid grid-cols-12 gap-2 p-3 bg-surface-container-low rounded-2xl border border-surface-variant text-xs font-bold text-center">
            <div className="col-span-12 p-2.5 bg-primary text-white rounded-xl shadow-xs">Header (12 Kolom / Full Width)</div>
            <div className="col-span-12 sm:col-span-4 p-4 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
              Sidebar (4 Kolom)
            </div>
            <div className="col-span-12 sm:col-span-8 p-4 bg-surface-container-lowest border border-primary/30 text-on-surface rounded-xl space-y-2">
              <div className="text-left font-bold text-primary">Main Content (8 Kolom)</div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-surface-container-high rounded-lg text-center">Card 1 (6 Col)</div>
                <div className="p-2 bg-surface-container-high rounded-lg text-center">Card 2 (6 Col)</div>
              </div>
            </div>
            <div className="col-span-12 p-2.5 bg-inverse-surface text-inverse-on-surface rounded-xl">Footer (12 Kolom / Full Width)</div>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'sidebar-layout') {
    return (
      <PreviewShell label="Sidebar Navigation Layout">
        <div className="w-full max-w-md mx-auto grid grid-cols-[140px_1fr] h-52 rounded-2xl border border-surface-variant bg-white overflow-hidden shadow-sm">
          <aside className="bg-surface-container-low p-3 border-r border-surface-variant flex flex-col justify-between">
            <div className="space-y-3">
              <div className="font-extrabold text-xs text-primary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Academy
              </div>
              <nav className="space-y-1 text-[11px] font-semibold">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">Beranda</div>
                <div className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container">Materi</div>
                <div className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container">Latihan</div>
              </nav>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-surface-variant text-[10px] text-on-surface-variant truncate">
              👤 Pelajar Pro
            </div>
          </aside>
          <div className="p-4 flex flex-col justify-center items-center text-center bg-surface-bright space-y-2">
            <Icon name="dashboard" size={24} className="text-primary" />
            <div className="text-xs font-bold text-on-surface">Area Konten Utama</div>
            <p className="text-[11px] text-on-surface-variant">Sidebar tetap berada di sisi kiri memudahkan akses cepat.</p>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'footer-layout') {
    return (
      <PreviewShell label="Web Multi-Column Footer">
        <div className="w-full max-w-lg mx-auto rounded-2xl border border-surface-variant bg-inverse-surface text-inverse-on-surface p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <div className="font-extrabold text-primary-fixed-dim text-sm">FrontEnd</div>
              <p className="text-[10px] text-surface-container-highest leading-relaxed">Belajar komponen UI & Layout web modern.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-xs">Materi</div>
              <div className="text-[11px] text-surface-container-highest">Navbar & Grid</div>
              <div className="text-[11px] text-surface-container-highest">CSS Flexbox</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-xs">Komunitas</div>
              <div className="text-[11px] text-surface-container-highest">Discord Dev</div>
              <div className="text-[11px] text-surface-container-highest">GitHub Repo</div>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-surface-container-highest">
            <span>© 2026 FrontEnd Academy</span>
            <div className="flex gap-2 font-semibold text-primary-fixed-dim">
              <span>Privasi</span>
              <span>Syarat</span>
            </div>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'hero-section') {
    return (
      <PreviewShell label="Hero Section Landing Page">
        <div className="w-full max-w-lg mx-auto rounded-3xl border border-surface-variant bg-gradient-to-b from-primary/5 to-transparent p-6 text-center space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            ⚡ Modul Layout Web
          </span>
          <h3 className="text-xl font-extrabold text-on-surface leading-snug">
            Bangun Web Modern Lebih Cepat & Rapi
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Kuasai grid layout, navbar responsif, dan komponen UI siap pakai dalam hitungan menit.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md">
              Mulai Sekarang →
            </button>
            <button type="button" className="px-4 py-2.5 rounded-xl border border-outline/50 bg-white font-bold text-xs text-on-surface">
              Lihat Demo
            </button>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'flexbox-layout') {
    return (
      <PreviewShell label="Flexbox Layout Pattern Preview">
        <div className="w-full max-w-lg mx-auto space-y-3">
          <div className="text-xs font-semibold text-center text-primary mb-1">Flexbox Media Object & Split Bar Pattern</div>
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-surface-variant bg-white shadow-xs">
            <img src="/avatar.png" alt="Alex Rivera" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-on-surface truncate">Alex Rivera</h4>
              <p className="text-xs text-on-surface-variant truncate">Frontend Architect · @alex.dev</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shrink-0">Ikuti</button>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'container-wrapper') {
    return (
      <PreviewShell label="Max-Width Container Preview">
        <div className="w-full bg-surface-container-low p-4 rounded-2xl border border-surface-variant text-center space-y-2">
          <div className="text-xs font-bold text-on-surface-variant">Layar Monitor Lebar (Viewport 1920px)</div>
          <div className="mx-auto max-w-md p-4 bg-white border border-primary/30 rounded-xl shadow-xs text-xs font-bold text-primary">
            Container Width (Max 1200px) — Content Centered via margin-inline: auto
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'micro-interactions') {
    return (
      <PreviewShell label="Micro-Interactions Hover & Active Preview">
        <div className="flex flex-wrap items-center justify-center gap-4 py-3">
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0">
            Hover & Lift Up
          </button>
          <button className="px-5 py-2.5 rounded-xl border border-primary text-primary font-bold text-xs transition-all duration-200 hover:bg-primary hover:text-white">
            Color Fill Transition
          </button>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'dark-mode-tokens') {
    return (
      <PreviewShell label="Dark Mode vs Light Mode Tokens Preview">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-xs">
          <div className="p-4 rounded-2xl bg-white border border-surface-variant text-on-surface space-y-1">
            <span className="text-[10px] font-bold text-primary">☀️ Light Theme</span>
            <div className="font-bold">Surface #FFFFFF</div>
            <p className="text-[11px] text-on-surface-variant">High readability text</p>
          </div>
          <div className="p-4 rounded-2xl bg-inverse-surface text-inverse-on-surface space-y-1">
            <span className="text-[10px] font-bold text-primary-fixed-dim">🌙 Dark Theme</span>
            <div className="font-bold">Surface #121C28</div>
            <p className="text-[11px] text-surface-container-highest">Slate dark contrast</p>
          </div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'button') {
    return (
      <PreviewShell label="Empat tingkat hierarki button">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm">Filled</button>
          <button className="rounded-full bg-primary/12 px-5 py-3 text-sm font-semibold text-primary">Tonal</button>
          <button className="rounded-full border border-outline/70 bg-white px-5 py-3 text-sm font-semibold text-primary">Outlined</button>
          <button className="rounded-full px-5 py-3 text-sm font-semibold text-primary">Text</button>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'card') {
    return (
      <PreviewShell label="Contoh lesson card">
        <article className="mx-auto max-w-sm rounded-3xl border border-surface-variant bg-white p-5 shadow-[0_16px_40px_-28px_rgba(18,28,40,.5)]">
          <span className="inline-flex rounded-full bg-secondary-fixed px-3 py-1 text-xs font-semibold text-secondary">UI pattern</span>
          <h4 className="mt-4 text-lg font-semibold text-on-surface">Card yang fokus</h4>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">Satu topik, deskripsi ringkas, dan satu aksi yang jelas.</p>
          <button className="mt-5 text-sm font-semibold text-primary">Buka materi →</button>
        </article>
      </PreviewShell>
    )
  }

  return (
    <PreviewShell label={`Diagram konsep ${module.title}`}>
      <div className="mx-auto grid max-w-lg grid-cols-3 items-center gap-3 text-center text-xs font-semibold text-on-surface-variant">
        <span className="rounded-2xl border border-surface-variant bg-white p-4">Struktur</span><Icon name="arrow_forward" size={20} className="mx-auto text-primary" /><span className="rounded-2xl bg-primary p-4 text-white">{module.title}</span>
        <span className="col-span-3 mx-auto h-7 w-px bg-outline-variant" /><span className="col-span-3 mx-auto rounded-2xl border border-primary/25 bg-primary/8 px-5 py-3 text-primary">Hasil yang konsisten & mudah digunakan</span>
      </div>
    </PreviewShell>
  )
}

function CodePanel({ module }) {
  const [language, setLanguage] = useState('html')
  const [copied, setCopied] = useState(false)
  const tabs = [{ id: 'html', label: 'HTML' }, { id: 'next', label: 'Next.js' }, { id: 'css', label: 'CSS' }]

  const copyCode = async () => {
    await navigator.clipboard.writeText(module.code[language])
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  useEffect(() => {
    setLanguage('html')
    setCopied(false)
  }, [module.id])

  return (
    <section className="overflow-hidden rounded-3xl border border-surface-variant bg-inverse-surface text-inverse-on-surface shadow-md">
      <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1" role="tablist" aria-label="Format kode">
          {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setLanguage(tab.id)} className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${language === tab.id ? 'bg-white/14 text-white' : 'text-white/58 hover:text-white'}`}>{tab.label}</button>)}
        </div>
        <button type="button" onClick={copyCode} className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-semibold text-primary-fixed-dim hover:bg-white/10 sm:self-auto"><Icon name={copied ? 'check' : 'content_copy'} size={15} />{copied ? 'Tersalin' : 'Salin kode'}</button>
      </div>
      <pre className="max-h-[360px] overflow-auto p-5 text-[12px] leading-6 text-inverse-on-surface"><code>{module.code[language]}</code></pre>
    </section>
  )
}

export default function ModulPembelajaran() {
  const navigate = useNavigate()
  const [profile] = useUserProfile()
  const [adminMode, toggleAdminMode] = useAdminMode()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModuleId, setSelectedModuleId] = useState('navbar')
  const [unlockedList, setUnlockedList] = useState(getUnlockedModules())

  // Accordion open/close state per category ID
  const [expandedCategories, setExpandedCategories] = useState({
    'layout': true,
    'html-css': true,
    'ux': false,
    'components': false,
    'a11y': false,
    'nextjs': false,
  })

  // Locked Modal State
  const [lockedModalModule, setLockedModalModule] = useState(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Strictly filter and sort modules (Basic -> Expert within category)
  const sortedModules = useMemo(() => {
    return [...LEARNING_MODULES].sort((a, b) => {
      const levelA = LEVEL_ORDER[a.level] || 1
      const levelB = LEVEL_ORDER[b.level] || 1
      return levelA - levelB
    })
  }, [])

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return sortedModules.filter((module) => {
      const inCategory = selectedCategory === 'all' || module.category === selectedCategory
      const matchesQuery = !query || `${module.title} ${module.summary} ${module.usage}`.toLowerCase().includes(query)
      return inCategory && matchesQuery
    })
  }, [searchQuery, selectedCategory, sortedModules])

  // Group modules strictly in Roadmap Category Order
  const groupedModules = useMemo(() => {
    const groups = []
    LEARNING_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') return
      const modulesInCat = filteredModules.filter((m) => m.category === cat.id)
      if (modulesInCat.length > 0) {
        groups.push({
          category: cat,
          modules: modulesInCat,
        })
      }
    })
    return groups
  }, [filteredModules])

  useEffect(() => {
    if (filteredModules.length && !filteredModules.some((module) => module.id === selectedModuleId)) {
      setSelectedModuleId(filteredModules[0].id)
    }
  }, [filteredModules, selectedModuleId])

  const currentModule = sortedModules.find((module) => module.id === selectedModuleId) || sortedModules[0]

  const toggleCategoryAccordion = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }))
  }

  const isModuleUnlocked = (moduleId) => {
    if (adminMode) return true
    return unlockedList.includes(moduleId)
  }

  const handleSelectModule = (mod) => {
    if (isModuleUnlocked(mod.id)) {
      setSelectedModuleId(mod.id)
      // Automatically expand its category
      setExpandedCategories((prev) => ({ ...prev, [mod.category]: true }))
    } else {
      setLockedModalModule(mod)
    }
  }

  const handleMarkCompleteAndNext = () => {
    // Find current index
    const currentIndex = sortedModules.findIndex((m) => m.id === currentModule.id)
    if (currentIndex < sortedModules.length - 1) {
      const nextMod = sortedModules[currentIndex + 1]
      unlockModule(nextMod.id)
      setUnlockedList(getUnlockedModules())
      setSelectedModuleId(nextMod.id)
      setExpandedCategories((prev) => ({ ...prev, [nextMod.category]: true }))
      showToast(`Modul "${nextMod.title}" berhasil dibuka.`)
    } else {
      showToast(`Selamat! Kamu telah menyelesaikan seluruh modul pembelajaran!`)
    }
  }

  return (
    <div className="page-shell">
      {/* Hero Header */}
      <header className="catalog-hero relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="section-kicker">
              <Icon name="menu_book" size={16} /> Kurikulum Frontend
            </span>
            <button
              type="button"
              onClick={() => toggleAdminMode()}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition flex items-center gap-1 ${
                adminMode
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant border-surface-variant'
              }`}
            >
              <Icon name="verified_user" size={14} /> {adminMode ? 'Mode Admin: Aktif' : 'Aktifkan Mode Admin'}
            </button>
          </div>
          <h1 className="page-title">Kurikulum UI/UX & Web Frontend</h1>
          <p className="page-lead">Diurutkan secara berjenjang dari Dasar hingga Expert. Buka modul satu per satu atau aktifkan Mode Admin.</p>
          
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })} className="button-primary">
              Jelajahi Kurikulum <Icon name="arrow_forward" size={17} />
            </button>
            <button type="button" onClick={() => setIsProfileModalOpen(true)} className="button-secondary flex items-center gap-2">
              <img src={profile.avatarUrl} alt={profile.name} className="w-5 h-5 rounded-full object-cover" />
              Edit Profil ({profile.name})
            </button>
          </div>
        </div>

        <dl className="catalog-stats">
          <div><dt>Total Modul</dt><dd>{LEARNING_MODULES.length}</dd></div>
          <div><dt>Status Buku</dt><dd>{adminMode ? 'Semua Unlocked' : `${unlockedList.length}/${LEARNING_MODULES.length}`}</dd></div>
          <div><dt>Soal Latihan</dt><dd>{QUIZ_QUESTIONS.length}</dd></div>
        </dl>
      </header>

      {/* Main Catalog Section */}
      <section id="katalog" className="scroll-mt-6">
        <div className="catalog-toolbar">
          <label className="search-field">
            <span className="sr-only">Cari modul</span>
            <Icon name="search" size={19} />
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari navbar, grid, flexbox, aksesibilitas…" />
          </label>
          <div className="category-scroller" aria-label="Filter kategori">
            {LEARNING_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={selectedCategory === category.id ? 'category-chip category-chip--active' : 'category-chip'}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid Layout (Fixed 2-Column Desktop Grid) */}
        <div className="catalog-layout">
          {/* Left Sidebar - Collapsible Category Dropdowns (Accordion) */}
          <aside className="min-w-0 md:sticky md:top-20 md:max-h-[calc(100vh-100px)] md:overflow-y-auto pr-1 pb-6 custom-scrollbar">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                {filteredModules.length} Modul Terstruktur
              </h2>
              <span className="text-[11px] font-semibold text-primary">
                {adminMode ? 'Mode Admin (Buka Semua)' : 'Terkunci Berurutan'}
              </span>
            </div>

            <div className="space-y-3">
              {groupedModules.map(({ category, modules }) => {
                const isExpanded = expandedCategories[category.id] ?? true
                const unlockedCountInCat = modules.filter((m) => isModuleUnlocked(m.id)).length

                return (
                  <div key={category.id} className="rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-xs overflow-hidden transition-all">
                    {/* Collapsible Category Header / Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleCategoryAccordion(category.id)}
                      className="w-full flex items-center justify-between p-3.5 bg-surface-container-low/60 hover:bg-surface-container-low transition text-left cursor-pointer border-b border-surface-variant/40"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                          <Icon name={category.icon} size={16} />
                        </span>
                        <span className="text-xs font-extrabold text-on-surface truncate">
                          {category.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-surface-variant text-on-surface-variant">
                          {unlockedCountInCat}/{modules.length}
                        </span>
                        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} size={18} className="text-on-surface-variant" />
                      </div>
                    </button>

                    {/* Accordion Module List Content */}
                    {isExpanded && (
                      <div className="p-2 space-y-1.5 animate-fadeIn">
                        {modules.map((module) => {
                          const active = module.id === currentModule.id
                          const unlocked = isModuleUnlocked(module.id)

                          return (
                            <button
                              key={module.id}
                              type="button"
                              onClick={() => handleSelectModule(module)}
                              aria-current={active ? 'true' : undefined}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                                active
                                  ? 'border-primary/50 bg-primary/10 shadow-xs'
                                  : unlocked
                                  ? 'border-surface-variant/60 bg-white hover:border-primary/30 hover:bg-surface-bright'
                                  : 'border-surface-variant/40 bg-surface-container-low/40 opacity-70 cursor-not-allowed'
                              }`}
                            >
                              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                active ? 'bg-primary text-white' : unlocked ? 'bg-surface-container text-primary' : 'bg-surface-container-high text-on-surface-variant'
                              }`}>
                                {unlocked ? <Icon name={module.icon} size={16} /> : <Icon name="lock" size={15} className="text-outline" />}
                              </span>
                              
                              <div className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-bold text-on-surface">
                                  {module.title}
                                </span>
                                <span className="mt-0.5 block text-[10px] text-on-surface-variant">
                                  {module.level} · {module.duration}
                                </span>
                              </div>

                              <span className="shrink-0">
                                {unlocked ? (
                                  <Icon name="arrow_forward" size={15} className={active ? 'text-primary' : 'text-outline'} />
                                ) : (
                                  <span className="text-[10px] font-bold text-outline uppercase">Lock</span>
                                )}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              {filteredModules.length === 0 && (
                <div className="rounded-2xl border border-dashed border-outline-variant bg-white p-6 text-center">
                  <p className="text-xs font-bold text-on-surface">Modul belum ditemukan.</p>
                  <button type="button" onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} className="mt-2 text-xs font-bold text-primary">
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Right Main Article - Detailed View & Code Implementation */}
          <article className="min-w-0 space-y-5" aria-live="polite">
            {/* Header Module Meta Card */}
            <section className="rounded-3xl border border-surface-variant bg-white p-5 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <span>{CATEGORY_NAMES[currentModule.category]}</span>
                    <span>·</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{currentModule.level}</span>
                    <span>·</span>
                    <span className="text-on-surface-variant">{currentModule.duration}</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-on-surface">{currentModule.title}</h2>
                  <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-on-surface-variant">{currentModule.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <button type="button" onClick={() => navigate(`/latihan-soal?topik=${currentModule.id}`)} className="button-secondary text-xs">
                    Uji Soal <Icon name="quiz" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkCompleteAndNext}
                    className="button-primary text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Icon name="check_circle" size={16} />
                    Selesai & Lanjut
                  </button>
                </div>
              </div>
            </section>

            {/* Interactive Live Component Preview */}
            <ComponentPreview key={currentModule.id} module={currentModule} />

            {/* Learning Notes & Anatomy Grid */}
            <section className="learning-notes">
              <div className="learning-note learning-note--wide">
                <p className="learning-note__label">KAPAN DIGUNAKAN</p>
                <p>{currentModule.usage}</p>
              </div>
              <div className="learning-note">
                <p className="learning-note__label">ANATOMI KOMPONEN</p>
                <ol>
                  {currentModule.anatomy.map((item, index) => (
                    <li key={item}>
                      <span>{index + 1}</span>{item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="learning-note">
                <p className="learning-note__label">CHECKLIST UI/UX</p>
                <ul>
                  {currentModule.principles.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={15} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Code Implementation Comparison Panel */}
            <div>
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Implementasi Kode</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-on-surface">Bandingkan Struktur & Styling</h3>
                </div>
                <span className="hidden text-xs font-semibold text-on-surface-variant sm:block">HTML · Next.js · CSS</span>
              </div>
              <CodePanel module={currentModule} />
            </div>
          </article>
        </div>
      </section>

      {/* Edit Profile Modal */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

      {/* Locked Module Popup Modal */}
      {lockedModalModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-surface-variant p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <Icon name="lock" size={28} />
            </div>
            <h3 className="text-lg font-extrabold text-on-surface">Modul Masih Terkunci!</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Modul <strong className="text-on-surface">"{lockedModalModule.title}"</strong> masih terkunci. Pelajari dan selesaikan modul sebelumnya secara berurutan, atau aktifkan Mode Admin.
            </p>
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  toggleAdminMode(true)
                  setLockedModalModule(null)
                  setSelectedModuleId(lockedModalModule.id)
                  showToast('Mode Admin Diaktifkan. Semua Modul Terbuka.')
                }}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary/90 transition flex items-center justify-center gap-1.5"
              >
                <Icon name="verified_user" size={16} /> Aktifkan Mode Admin (Buka Semua)
              </button>
              <button
                type="button"
                onClick={() => setLockedModalModule(null)}
                className="w-full py-2 rounded-xl border border-surface-variant text-xs font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-inverse-surface text-inverse-on-surface text-xs font-bold shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
