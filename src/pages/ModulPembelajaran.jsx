import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { LEARNING_CATEGORIES, LEARNING_MODULES, QUIZ_QUESTIONS } from '../data/learningContent'

const CATEGORY_NAMES = Object.fromEntries(LEARNING_CATEGORIES.map((category) => [category.id, category.label]))

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

  if (module.id === 'text-field') {
    return (
      <PreviewShell label="Text field dengan label dan helper text">
        <label className="mx-auto grid max-w-sm gap-2 text-sm font-semibold text-on-surface">
          Email
          <input className="h-12 rounded-xl border border-outline bg-white px-4 font-normal outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" type="email" defaultValue="pelajar@email.com" />
          <span className="text-xs font-normal text-on-surface-variant">Kami hanya mengirim kabar progres belajar.</span>
        </label>
      </PreviewShell>
    )
  }

  if (module.id === 'checkbox' || module.id === 'radio') {
    const isRadio = module.id === 'radio'
    return (
      <PreviewShell label={`Contoh ${module.title}`}>
        <fieldset className="mx-auto grid max-w-sm gap-3 rounded-2xl border border-surface-variant bg-white p-5">
          <legend className="px-2 text-sm font-semibold text-on-surface">{isRadio ? 'Pilih tingkat materi' : 'Pilih topik favorit'}</legend>
          {['UI & UX', 'HTML & CSS', 'Next.js'].map((item, index) => (
            <label key={item} className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-on-surface-variant">
              <input className="h-5 w-5 accent-primary" type={isRadio ? 'radio' : 'checkbox'} name={isRadio ? 'level' : item} defaultChecked={index === 0} />
              {item}
            </label>
          ))}
        </fieldset>
      </PreviewShell>
    )
  }

  if (module.id === 'switch') {
    return (
      <PreviewShell label="Switch pengaturan notifikasi">
        <button type="button" onClick={() => setSwitchOn((value) => !value)} className="mx-auto flex w-full max-w-sm items-center justify-between gap-5 rounded-2xl border border-surface-variant bg-white p-5 text-left">
          <span><strong className="block text-sm font-semibold text-on-surface">Pengingat belajar</strong><span className="mt-1 block text-xs text-on-surface-variant">Kirim setiap pukul 19.00</span></span>
          <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${switchOn ? 'justify-end bg-primary' : 'justify-start bg-surface-container-highest'}`}><span className="h-5 w-5 rounded-full bg-white shadow" /></span>
        </button>
      </PreviewShell>
    )
  }

  if (module.id === 'select') {
    return (
      <PreviewShell label="Select topik pembelajaran">
        <label className="mx-auto grid max-w-sm gap-2 text-sm font-semibold">Topik pembelajaran<select className="h-12 rounded-xl border border-outline bg-white px-4 font-normal"><option>Komponen UI</option><option>HTML & CSS</option><option>Next.js</option></select></label>
      </PreviewShell>
    )
  }

  if (module.id === 'accordion') {
    return (
      <PreviewShell label="Accordion pertanyaan umum">
        <div className="mx-auto grid max-w-md gap-2">
          <details className="rounded-2xl border border-surface-variant bg-white p-4" open><summary className="cursor-pointer text-sm font-semibold">Apa itu design token?</summary><p className="mt-3 text-sm leading-6 text-on-surface-variant">Nama semantik untuk keputusan desain yang digunakan berulang.</p></details>
          <details className="rounded-2xl border border-surface-variant bg-white p-4"><summary className="cursor-pointer text-sm font-semibold">Kapan memakai token?</summary><p className="mt-3 text-sm text-on-surface-variant">Saat nilai warna, jarak, atau bentuk dipakai lintas komponen.</p></details>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'dialog') {
    return (
      <PreviewShell label="Contoh confirmation dialog">
        <div className="mx-auto max-w-sm rounded-3xl border border-surface-variant bg-white p-6 shadow-xl">
          <h4 className="text-lg font-semibold text-on-surface">Hapus draft?</h4><p className="mt-2 text-sm leading-6 text-on-surface-variant">Perubahan yang belum dipublikasikan akan hilang.</p>
          <div className="mt-6 flex justify-end gap-2"><button className="rounded-full px-4 py-2 text-sm font-semibold text-primary">Batal</button><button className="rounded-full bg-error px-4 py-2 text-sm font-semibold text-white">Hapus</button></div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'tabs') {
    return (
      <PreviewShell label="Tabs pemilih format kode">
        <div className="mx-auto max-w-md rounded-2xl border border-surface-variant bg-white p-2">
          <div className="flex border-b border-surface-variant" role="tablist">
            {['HTML', 'Next.js', 'CSS'].map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`flex-1 border-b-2 px-3 py-3 text-sm font-semibold ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}>{tab}</button>)}
          </div>
          <div className="p-5 text-sm text-on-surface-variant">Contoh implementasi dengan {activeTab}.</div>
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'snackbar') {
    return (
      <PreviewShell label="Snackbar status penyimpanan">
        <div className="flex min-h-24 items-end justify-center">
          {showToast ? <div className="flex w-full max-w-md items-center justify-between gap-5 rounded-2xl bg-inverse-surface px-5 py-4 text-sm text-inverse-on-surface shadow-lg"><span>Draft berhasil disimpan.</span><button onClick={() => setShowToast(false)} className="font-semibold text-primary-fixed-dim">Urungkan</button></div> : <button onClick={() => setShowToast(true)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Tampilkan lagi</button>}
        </div>
      </PreviewShell>
    )
  }

  if (module.id === 'tooltip') {
    return (
      <PreviewShell label="Tooltip tombol simpan">
        <div className="group relative mx-auto flex w-fit justify-center pt-10"><span id="preview-tooltip" role="tooltip" className="absolute top-0 rounded-lg bg-inverse-surface px-3 py-1.5 text-xs text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">Simpan draft</span><button aria-describedby="preview-tooltip" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"><Icon name="check" size={19} /></button></div>
      </PreviewShell>
    )
  }

  if (module.id === 'breadcrumbs') {
    return <PreviewShell label="Breadcrumb halaman materi"><nav aria-label="Breadcrumb" className="mx-auto max-w-lg rounded-2xl border border-surface-variant bg-white p-5"><ol className="flex flex-wrap items-center gap-2 text-sm"><li className="text-primary">Beranda</li><li className="text-outline">/</li><li className="text-primary">Komponen</li><li className="text-outline">/</li><li aria-current="page" className="font-semibold">Button</li></ol></nav></PreviewShell>
  }

  if (module.id === 'pagination') {
    return <PreviewShell label="Pagination hasil katalog"><nav aria-label="Halaman hasil" className="mx-auto flex w-fit items-center gap-2"><button className="rounded-xl border border-surface-variant bg-white px-3 py-2 text-sm">←</button>{[1, 2, 3].map((page) => <button key={page} className={`h-10 w-10 rounded-xl text-sm font-semibold ${page === 2 ? 'bg-primary text-white' : 'border border-surface-variant bg-white'}`}>{page}</button>)}<button className="rounded-xl border border-surface-variant bg-white px-3 py-2 text-sm">→</button></nav></PreviewShell>
  }

  if (module.id === 'progress') {
    return <PreviewShell label="Progress penyelesaian kursus"><div className="mx-auto max-w-md"><div className="mb-2 flex justify-between text-sm"><span className="font-semibold">Progres kursus</span><span className="text-on-surface-variant">68%</span></div><div className="h-3 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full w-[68%] rounded-full bg-primary" /></div></div></PreviewShell>
  }

  if (module.id === 'navigation') {
    return <PreviewShell label="Navigation bar"><nav className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-surface-variant bg-white p-2">{['Beranda', 'Materi', 'Latihan'].map((item, index) => <button key={item} className={`rounded-xl px-4 py-3 text-sm font-semibold ${index === 1 ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'}`}>{item}</button>)}</nav></PreviewShell>
  }

  if (module.id === 'skeleton') {
    return <PreviewShell label="Skeleton loading card"><div className="mx-auto grid max-w-md animate-pulse gap-4 rounded-2xl border border-surface-variant bg-white p-5"><div className="h-5 w-2/5 rounded-full bg-surface-container-highest" /><div className="h-3 rounded-full bg-surface-container-high" /><div className="h-3 w-4/5 rounded-full bg-surface-container-high" /></div></PreviewShell>
  }

  if (module.id === 'alert') {
    return <PreviewShell label="Success alert"><div className="mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4 text-on-primary-container"><Icon name="check_circle" size={21} /><div><strong className="text-sm font-semibold">Perubahan tersimpan</strong><p className="mt-1 text-sm leading-6">Profilmu sudah menggunakan data terbaru.</p></div></div></PreviewShell>
  }

  if (module.id === 'avatar-badge') {
    return <PreviewShell label="Avatar dengan status badge"><div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-surface-variant bg-white p-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-base font-semibold text-white">N</span><span><strong className="block text-sm font-semibold">Nara Putri</strong><span className="mt-1 inline-flex rounded-full bg-secondary-fixed px-2 py-0.5 text-xs font-semibold text-secondary">Pro member</span></span></div></PreviewShell>
  }

  if (module.id === 'icon-button') {
    return <PreviewShell label="Icon button dan floating action button"><div className="flex items-center justify-center gap-5"><button aria-label="Favorit" className="grid h-11 w-11 place-items-center rounded-full border border-surface-variant bg-white text-primary"><Icon name="favorite" size={19} /></button><button aria-label="Tambah materi" className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lg"><span className="text-2xl leading-none">+</span></button></div></PreviewShell>
  }

  if (module.id === 'chips') {
    return <PreviewShell label="Filter chips"><div className="mx-auto flex max-w-lg flex-wrap justify-center gap-2">{['Semua', 'UI/UX', 'HTML & CSS', 'Next.js'].map((chip, index) => <button key={chip} aria-pressed={index === 0} className={`rounded-full border px-4 py-2 text-xs font-semibold ${index === 0 ? 'border-primary/25 bg-primary/10 text-primary' : 'border-surface-variant bg-white text-on-surface-variant'}`}>{chip}</button>)}</div></PreviewShell>
  }

  if (module.id === 'list') {
    return <PreviewShell label="Lesson list"><ul className="mx-auto grid max-w-md gap-2">{[['01', 'Button', '12 menit'], ['02', 'Card', '14 menit'], ['03', 'Text field', '16 menit']].map(([number, title, meta]) => <li key={number} className="flex items-center gap-3 rounded-2xl border border-surface-variant bg-white p-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-container-low text-xs font-semibold text-primary">{number}</span><span className="flex-1"><strong className="block text-sm font-semibold">{title}</strong><small className="text-xs text-on-surface-variant">{meta}</small></span><Icon name="arrow_forward" size={16} className="text-outline" /></li>)}</ul></PreviewShell>
  }

  if (module.id === 'divider') {
    return <PreviewShell label="Divider separating content"><div className="mx-auto max-w-md rounded-2xl border border-surface-variant bg-white p-5"><p className="text-sm font-semibold">Profil</p><p className="mt-1 text-xs text-on-surface-variant">Nama dan email pengguna</p><hr className="my-4 border-0 border-t border-surface-variant" /><p className="text-sm font-semibold">Preferensi</p><p className="mt-1 text-xs text-on-surface-variant">Tema dan pengingat belajar</p></div></PreviewShell>
  }

  if (module.id === 'search-bar') {
    return <PreviewShell label="Search bar"><form className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-surface-variant bg-white p-2" role="search"><Icon name="search" size={19} className="ml-2 text-on-surface-variant" /><input aria-label="Cari materi" className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm outline-none" placeholder="Cari materi…" /><button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Cari</button></form></PreviewShell>
  }

  if (module.id === 'slider') {
    return <PreviewShell label="Text size slider"><label className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-3 text-sm font-semibold">Ukuran teks <output className="text-primary">16px</output><input className="col-span-2 w-full accent-primary" type="range" min="12" max="24" defaultValue="16" /></label></PreviewShell>
  }

  if (module.id === 'data-table') {
    return <PreviewShell label="Data table progress"><div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-surface-variant bg-white"><table className="w-full text-left text-sm"><caption className="p-4 text-left font-semibold">Progres materi</caption><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr><th className="px-4 py-3">Materi</th><th className="px-4 py-3">Nilai</th></tr></thead><tbody><tr className="border-t border-surface-variant"><th className="px-4 py-3 font-medium">HTML dasar</th><td className="px-4 py-3 text-primary">88%</td></tr><tr className="border-t border-surface-variant"><th className="px-4 py-3 font-medium">CSS Grid</th><td className="px-4 py-3 text-primary">76%</td></tr></tbody></table></div></PreviewShell>
  }

  if (module.id === 'menu') {
    return <PreviewShell label="Action menu"><div className="mx-auto w-52"><button aria-haspopup="menu" aria-expanded="true" className="w-full rounded-xl border border-surface-variant bg-white px-4 py-2 text-sm font-semibold">Aksi materi</button><ul role="menu" className="mt-2 grid gap-1 rounded-2xl border border-surface-variant bg-white p-2 text-sm shadow-lg"><li role="menuitem" className="rounded-xl px-3 py-2">Duplikat</li><li role="menuitem" className="rounded-xl px-3 py-2">Bagikan</li><li role="menuitem" className="rounded-xl px-3 py-2 text-error">Hapus</li></ul></div></PreviewShell>
  }

  if (module.id === 'drawer-sheet') {
    return <PreviewShell label="Navigation drawer"><div className="mx-auto grid h-48 w-full max-w-md grid-cols-[150px_1fr] overflow-hidden rounded-2xl border border-surface-variant bg-white"><aside className="grid content-start gap-2 bg-surface-container-low p-3"><strong className="mb-2 text-xs font-semibold text-primary">Menu</strong><span className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">Beranda</span><span className="px-3 py-2 text-xs text-on-surface-variant">Materi</span><span className="px-3 py-2 text-xs text-on-surface-variant">Latihan</span></aside><div className="grid place-items-center p-4 text-center text-xs text-on-surface-variant">Konten utama tetap memiliki konteks.</div></div></PreviewShell>
  }

  if (module.id === 'empty-state') {
    return <PreviewShell label="Empty project state"><div className="mx-auto max-w-md text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-surface-container-high text-on-surface-variant"><Icon name="explore_off" size={23} /></span><h4 className="mt-4 text-base font-semibold">Belum ada proyek</h4><p className="mt-2 text-sm text-on-surface-variant">Buat proyek pertamamu untuk mulai berlatih.</p><button className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Buat proyek</button></div></PreviewShell>
  }

  if (module.id === 'file-upload') {
    return <PreviewShell label="File upload drop zone"><label className="mx-auto grid max-w-md cursor-pointer place-items-center rounded-2xl border border-dashed border-outline bg-white p-7 text-center"><Icon name="arrow_forward" size={22} className="rotate-[-90deg] text-primary" /><strong className="mt-3 text-sm font-semibold">Unggah portfolio</strong><span className="mt-1 text-xs text-on-surface-variant">PDF, maksimal 5 MB</span><input className="sr-only" type="file" accept="application/pdf" /></label></PreviewShell>
  }

  if (module.id === 'date-picker') {
    return <PreviewShell label="Date picker input"><label className="mx-auto grid max-w-sm gap-2 text-sm font-semibold">Tanggal mulai<input className="h-12 rounded-xl border border-outline bg-white px-4 font-normal" type="date" defaultValue="2026-08-21" /></label></PreviewShell>
  }

  if (module.id === 'carousel') {
    return <PreviewShell label="Course carousel"><div className="mx-auto grid w-full max-w-lg grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"><button aria-label="Sebelumnya" className="grid h-10 w-10 place-items-center rounded-full border border-surface-variant bg-white">←</button><article className="rounded-3xl bg-secondary-fixed p-6 text-on-secondary-fixed"><span className="text-xs font-semibold">Materi pilihan</span><h4 className="mt-2 text-lg font-semibold">CSS Grid tanpa overflow</h4><p className="mt-2 text-sm opacity-75">Belajar layout intrinsik dalam 26 menit.</p></article><button aria-label="Berikutnya" className="grid h-10 w-10 place-items-center rounded-full border border-surface-variant bg-white">→</button></div></PreviewShell>
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
    <section className="overflow-hidden rounded-3xl border border-surface-variant bg-inverse-surface text-inverse-on-surface">
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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedModuleId, setSelectedModuleId] = useState('button')

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return LEARNING_MODULES.filter((module) => {
      const inCategory = selectedCategory === 'all' || module.category === selectedCategory
      const matchesQuery = !query || `${module.title} ${module.summary} ${module.usage}`.toLowerCase().includes(query)
      return inCategory && matchesQuery
    })
  }, [searchQuery, selectedCategory])

  useEffect(() => {
    if (filteredModules.length && !filteredModules.some((module) => module.id === selectedModuleId)) setSelectedModuleId(filteredModules[0].id)
  }, [filteredModules, selectedModuleId])

  const currentModule = LEARNING_MODULES.find((module) => module.id === selectedModuleId) || filteredModules[0] || LEARNING_MODULES[0]

  return (
    <div className="page-shell">
      <header className="catalog-hero">
        <div className="max-w-2xl">
          <span className="section-kicker"><Icon name="menu_book" size={16} />Perpustakaan frontend</span>
          <h1 className="page-title">Belajar komponen sampai ke kodenya.</h1>
          <p className="page-lead">Pelajari pola UI/UX, anatomi, aksesibilitas, lalu bandingkan implementasinya dalam HTML, Next.js, dan CSS.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => document.getElementById('katalog')?.scrollIntoView()} className="button-primary">Jelajahi materi <Icon name="arrow_forward" size={17} /></button>
            <button type="button" onClick={() => navigate('/latihan-soal')} className="button-secondary">Latihan {QUIZ_QUESTIONS.length} soal</button>
          </div>
        </div>
        <dl className="catalog-stats">
          <div><dt>Materi</dt><dd>{LEARNING_MODULES.length}</dd></div>
          <div><dt>Topik</dt><dd>{LEARNING_CATEGORIES.length - 1}</dd></div>
          <div><dt>Soal</dt><dd>{QUIZ_QUESTIONS.length}</dd></div>
        </dl>
      </header>

      <section id="katalog" className="scroll-mt-6">
        <div className="catalog-toolbar">
          <label className="search-field"><span className="sr-only">Cari materi</span><Icon name="search" size={19} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari button, grid, aksesibilitas…" /></label>
          <div className="category-scroller" aria-label="Filter kategori">
            {LEARNING_CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} aria-pressed={selectedCategory === category.id} className={selectedCategory === category.id ? 'category-chip category-chip--active' : 'category-chip'}>{category.label}</button>)}
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="min-w-0">
            <div className="mb-3 flex items-center justify-between px-1"><h2 className="text-sm font-semibold text-on-surface">{filteredModules.length} materi</h2><span className="text-xs text-on-surface-variant">Pilih untuk membuka</span></div>
            <div className="module-list">
              {filteredModules.map((module) => {
                const active = module.id === currentModule.id
                return (
                  <button key={module.id} type="button" onClick={() => setSelectedModuleId(module.id)} aria-current={active ? 'true' : undefined} className={active ? 'module-list-card module-list-card--active' : 'module-list-card'}>
                    <span className={active ? 'module-list-card__icon module-list-card__icon--active' : 'module-list-card__icon'}><Icon name={module.icon} size={19} /></span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-on-surface">{module.title}</span><span className="mt-1 block text-xs text-on-surface-variant">{CATEGORY_NAMES[module.category]} · {module.duration}</span></span>
                    <Icon name="arrow_forward" size={17} className={active ? 'text-primary' : 'text-outline'} />
                  </button>
                )
              })}
              {filteredModules.length === 0 && <div className="rounded-3xl border border-dashed border-outline-variant bg-white p-7 text-center"><p className="text-sm font-semibold">Materi belum ditemukan.</p><button onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} className="mt-2 text-sm font-semibold text-primary">Reset pencarian</button></div>}
            </div>
          </aside>

          <article className="min-w-0 space-y-5" aria-live="polite">
            <section className="rounded-3xl border border-surface-variant bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0"><p className="text-xs font-semibold text-primary">{CATEGORY_NAMES[currentModule.category]} · {currentModule.level}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-on-surface">{currentModule.title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">{currentModule.summary}</p></div>
                <button type="button" onClick={() => navigate(`/latihan-soal?topik=${currentModule.id}`)} className="button-secondary shrink-0">Uji materi <Icon name="quiz" size={17} /></button>
              </div>
            </section>

            <ComponentPreview key={currentModule.id} module={currentModule} />

            <section className="learning-notes">
              <div className="learning-note learning-note--wide"><p className="learning-note__label">Kapan digunakan</p><p>{currentModule.usage}</p></div>
              <div className="learning-note"><p className="learning-note__label">Anatomi</p><ol>{currentModule.anatomy.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol></div>
              <div className="learning-note"><p className="learning-note__label">Checklist UX</p><ul>{currentModule.principles.map((item) => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul></div>
            </section>

            <div><div className="mb-3 flex items-end justify-between gap-3"><div><p className="text-xs font-semibold text-primary">Implementasi</p><h3 className="mt-1 text-lg font-semibold text-on-surface">Bandingkan struktur dan styling</h3></div><span className="hidden text-xs text-on-surface-variant sm:block">HTML · Next.js · CSS</span></div><CodePanel module={currentModule} /></div>
          </article>
        </div>
      </section>
    </div>
  )
}
