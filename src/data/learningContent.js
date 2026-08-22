const baseCss = `:root {
  --primary: #0b6e3e;
  --surface: #ffffff;
  --surface-soft: #f3f6f2;
  --text: #172019;
  --muted: #59645b;
  --border: #dce4dc;
  --radius: 16px;
}`

const makeCode = (html, next, css) => ({ html, next, css: `${baseCss}\n\n${css}` })

export const LEARNING_CATEGORIES = [
  { id: 'all', label: 'Semua', icon: 'grid_view' },
  { id: 'components', label: 'Komponen UI', icon: 'layers' },
  { id: 'ux', label: 'Dasar UI/UX', icon: 'auto_awesome' },
  { id: 'html-css', label: 'HTML & CSS', icon: 'html' },
  { id: 'nextjs', label: 'Next.js', icon: 'data_object' },
  { id: 'a11y', label: 'Aksesibilitas', icon: 'verified' },
]

export const LEARNING_MODULES = [
  {
    id: 'button', title: 'Button', category: 'components', icon: 'play_arrow', level: 'Dasar', duration: '12 menit',
    summary: 'Aksi yang membantu pengguna maju, mengirim, menyimpan, atau mengubah sesuatu.',
    usage: 'Pakai satu filled button untuk aksi utama. Gunakan tonal, outlined, atau text untuk aksi dengan prioritas lebih rendah.',
    anatomy: ['Container', 'Label berbentuk kata kerja', 'Ikon opsional', 'State layer'],
    principles: ['Label harus menjelaskan hasil aksi.', 'Sediakan hover, focus, pressed, dan disabled.', 'Target sentuh idealnya minimal 44 × 44 px.'],
    code: makeCode(
      `<button class="button button--filled" type="button">\n  Simpan perubahan\n</button>`,
      `export default function SaveButton() {\n  return (\n    <button className="button button--filled" type="button">\n      Simpan perubahan\n    </button>\n  )\n}`,
      `.button { min-height: 44px; padding: 0 20px; border: 0; border-radius: 999px; font: inherit; font-weight: 700; cursor: pointer; }\n.button--filled { color: white; background: var(--primary); }\n.button:focus-visible { outline: 3px solid #9ad7b5; outline-offset: 2px; }`
    ),
  },
  {
    id: 'card', title: 'Card', category: 'components', icon: 'layers', level: 'Dasar', duration: '14 menit',
    summary: 'Wadah untuk satu objek atau topik dengan isi dan aksi yang saling berkaitan.',
    usage: 'Gunakan card untuk mengelompokkan informasi, bukan sebagai dekorasi untuk setiap bagian halaman.',
    anatomy: ['Media opsional', 'Judul', 'Deskripsi', 'Area aksi'],
    principles: ['Jaga padding tetap konsisten.', 'Hindari card di dalam card.', 'Jangan membuat seluruh card klik jika terdapat aksi lain di dalamnya.'],
    code: makeCode(
      `<article class="card">\n  <p class="card__eyebrow">UI component</p>\n  <h2>Card yang mudah dipindai</h2>\n  <p>Satukan informasi yang benar-benar berkaitan.</p>\n  <a href="/materi/card">Pelajari card</a>\n</article>`,
      `import Link from 'next/link'\n\nexport default function LessonCard() {\n  return (\n    <article className="card">\n      <h2>Card yang mudah dipindai</h2>\n      <p>Satukan informasi yang benar-benar berkaitan.</p>\n      <Link href="/materi/card">Pelajari card</Link>\n    </article>\n  )\n}`,
      `.card { padding: 24px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }\n.card h2 { margin: 8px 0; font-size: 1.125rem; }\n.card p { color: var(--muted); line-height: 1.6; }`
    ),
  },
  {
    id: 'text-field', title: 'Text field', category: 'components', icon: 'data_object', level: 'Dasar', duration: '16 menit',
    summary: 'Input satu baris untuk data seperti nama, email, pencarian, atau kode.',
    usage: 'Label harus tetap terlihat saat pengguna mengetik. Helper text menjelaskan format, sedangkan error text menjelaskan cara memperbaiki.',
    anatomy: ['Label', 'Input container', 'Nilai input', 'Helper atau error text'],
    principles: ['Jangan mengganti label dengan placeholder.', 'Gunakan tipe input yang sesuai.', 'Error harus spesifik dan dekat dengan field.'],
    code: makeCode(
      `<div class="field">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" aria-describedby="email-help">\n  <small id="email-help">Gunakan email aktif.</small>\n</div>`,
      `'use client'\n\nimport { useState } from 'react'\n\nexport default function EmailField() {\n  const [email, setEmail] = useState('')\n  return <label className="field">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>\n}`,
      `.field { display: grid; gap: 7px; color: var(--text); font-weight: 650; }\n.field input { min-height: 48px; padding: 0 14px; border: 1px solid #7a877d; border-radius: 12px; font: inherit; }\n.field input:focus { border-color: var(--primary); outline: 3px solid #d5f2e1; }\n.field small { color: var(--muted); font-weight: 500; }`
    ),
  },
  {
    id: 'checkbox', title: 'Checkbox', category: 'components', icon: 'check_circle', level: 'Dasar', duration: '10 menit',
    summary: 'Kontrol untuk memilih nol, satu, atau beberapa opsi yang tidak saling eksklusif.',
    usage: 'Pakai checkbox untuk pilihan independen, misalnya preferensi notifikasi atau daftar tugas.',
    anatomy: ['Selection control', 'Label', 'Deskripsi opsional', 'Checked state'],
    principles: ['Seluruh label harus bisa diklik.', 'Jangan gunakan checkbox untuk aksi langsung.', 'Kelompokkan pilihan terkait dengan fieldset.'],
    code: makeCode(
      `<fieldset class="check-group">\n  <legend>Pilih notifikasi</legend>\n  <label><input type="checkbox" name="notif" value="email"> Email</label>\n  <label><input type="checkbox" name="notif" value="push"> Push</label>\n</fieldset>`,
      `'use client'\n\nexport default function Preferences() {\n  return <label className="check"><input type="checkbox" /> Kirim ringkasan mingguan</label>\n}`,
      `.check-group { display: grid; gap: 12px; border: 0; padding: 0; }\n.check-group label, .check { display: flex; gap: 10px; align-items: center; cursor: pointer; }\ninput[type="checkbox"] { width: 20px; height: 20px; accent-color: var(--primary); }`
    ),
  },
  {
    id: 'radio', title: 'Radio button', category: 'components', icon: 'radio_button_unchecked', level: 'Dasar', duration: '10 menit',
    summary: 'Kontrol untuk memilih tepat satu opsi dari sekumpulan pilihan.',
    usage: 'Gunakan saat semua opsi perlu terlihat. Untuk daftar yang sangat panjang, pertimbangkan select.',
    anatomy: ['Radio control', 'Label', 'Radio group', 'Selected state'],
    principles: ['Satu grup harus memakai name yang sama.', 'Berikan pilihan awal bila aman.', 'Jangan izinkan multi-select.'],
    code: makeCode(
      `<fieldset class="radio-group">\n  <legend>Ukuran tampilan</legend>\n  <label><input type="radio" name="size" value="compact"> Ringkas</label>\n  <label><input type="radio" name="size" value="comfortable"> Nyaman</label>\n</fieldset>`,
      `export default function DensityChoice() {\n  return <fieldset><legend>Ukuran tampilan</legend><label><input type="radio" name="size" defaultChecked /> Nyaman</label></fieldset>\n}`,
      `.radio-group { display: grid; gap: 12px; border: 0; padding: 0; }\n.radio-group label { display: flex; align-items: center; gap: 10px; }\ninput[type="radio"] { width: 20px; height: 20px; accent-color: var(--primary); }`
    ),
  },
  {
    id: 'switch', title: 'Switch', category: 'components', icon: 'tune', level: 'Dasar', duration: '12 menit',
    summary: 'Kontrol on/off yang langsung mengubah satu pengaturan.',
    usage: 'Gunakan untuk perubahan instan. Jika perubahan baru berlaku setelah submit, gunakan checkbox.',
    anatomy: ['Track', 'Handle', 'Label', 'On/off state'],
    principles: ['Label menjelaskan kondisi, bukan perintah.', 'Perubahan harus langsung terlihat.', 'Jangan gunakan untuk tiga keadaan.'],
    code: makeCode(
      `<label class="switch-row">\n  <span>Mode gelap</span>\n  <input class="switch" type="checkbox" role="switch">\n</label>`,
      `'use client'\n\nexport default function ThemeSwitch() {\n  return <label className="switchRow"><span>Mode gelap</span><input type="checkbox" role="switch" /></label>\n}`,
      `.switch-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; }\n.switch { width: 44px; height: 24px; accent-color: var(--primary); cursor: pointer; }`
    ),
  },
  {
    id: 'select', title: 'Select', category: 'components', icon: 'tune', level: 'Dasar', duration: '13 menit',
    summary: 'Input ringkas untuk memilih satu nilai dari daftar opsi.',
    usage: 'Cocok untuk opsi familiar dan cukup banyak, seperti negara atau kategori.',
    anatomy: ['Label', 'Selected value', 'Chevron', 'Option list'],
    principles: ['Urutkan opsi secara logis.', 'Hindari placeholder yang bisa dipilih.', 'Gunakan radio jika hanya ada 2–4 opsi.'],
    code: makeCode(
      `<label class="field">Topik\n  <select name="topic">\n    <option value="ui">Komponen UI</option>\n    <option value="css">CSS layout</option>\n  </select>\n</label>`,
      `export default function TopicSelect() {\n  return <label className="field">Topik<select name="topic"><option>Komponen UI</option><option>CSS layout</option></select></label>\n}`,
      `.field select { min-height: 48px; padding: 0 42px 0 14px; border: 1px solid #7a877d; border-radius: 12px; background: var(--surface); font: inherit; }`
    ),
  },
  {
    id: 'accordion', title: 'Accordion', category: 'components', icon: 'menu_book', level: 'Menengah', duration: '15 menit',
    summary: 'Kumpulan judul yang dapat dibuka untuk menampilkan informasi lanjutan.',
    usage: 'Baik untuk FAQ atau detail sekunder. Konten penting sebaiknya tidak disembunyikan.',
    anatomy: ['Header button', 'Indicator', 'Content region', 'Expanded state'],
    principles: ['Header harus berupa button.', 'Status buka harus terbaca screen reader.', 'Jaga label tetap singkat.'],
    code: makeCode(
      `<details class="accordion">\n  <summary>Apa itu design token?</summary>\n  <p>Nama semantik untuk nilai desain yang digunakan berulang.</p>\n</details>`,
      `'use client'\n\nexport default function Accordion() {\n  return <details className="accordion"><summary>Apa itu design token?</summary><p>Nilai desain yang diberi nama semantik.</p></details>\n}`,
      `.accordion { padding: 16px 18px; border: 1px solid var(--border); border-radius: 14px; }\n.accordion summary { font-weight: 700; cursor: pointer; }\n.accordion p { color: var(--muted); line-height: 1.6; }`
    ),
  },
  {
    id: 'dialog', title: 'Dialog', category: 'components', icon: 'layers', level: 'Menengah', duration: '18 menit',
    summary: 'Lapisan modal yang meminta fokus dan keputusan pengguna sebelum kembali ke halaman.',
    usage: 'Gunakan untuk keputusan penting atau alur singkat. Jangan memindahkan halaman penuh ke dalam dialog.',
    anatomy: ['Scrim', 'Container', 'Headline dan body', 'Action area'],
    principles: ['Fokus harus masuk dan kembali dengan benar.', 'Sediakan cara menutup yang jelas.', 'Aksi utama ditempatkan konsisten.'],
    code: makeCode(
      `<dialog id="confirm" class="dialog">\n  <h2>Hapus draft?</h2><p>Perubahan ini tidak dapat dibatalkan.</p>\n  <form method="dialog"><button value="cancel">Batal</button><button value="confirm">Hapus</button></form>\n</dialog>`,
      `'use client'\n\nexport default function ConfirmDialog({ open, onClose }) {\n  if (!open) return null\n  return <div role="dialog" aria-modal="true" aria-labelledby="title"><h2 id="title">Hapus draft?</h2><button onClick={onClose}>Batal</button></div>\n}`,
      `.dialog { width: min(92vw, 420px); padding: 24px; border: 0; border-radius: 24px; color: var(--text); }\n.dialog::backdrop { background: rgb(8 20 12 / .52); }\n.dialog form { display: flex; justify-content: end; gap: 10px; margin-top: 24px; }`
    ),
  },
  {
    id: 'tabs', title: 'Tabs', category: 'components', icon: 'layers', level: 'Menengah', duration: '17 menit',
    summary: 'Navigasi antar panel yang setara di dalam konteks yang sama.',
    usage: 'Gunakan untuk beberapa kategori sebaya. Jangan jadikan tabs sebagai navigasi utama yang terlalu dalam.',
    anatomy: ['Tab list', 'Active indicator', 'Tab label', 'Tab panel'],
    principles: ['Dukung tombol panah pada keyboard.', 'Tab aktif harus jelas tanpa warna saja.', 'Panel terkait memakai aria-controls.'],
    code: makeCode(
      `<div class="tabs" role="tablist" aria-label="Contoh kode">\n  <button role="tab" aria-selected="true">HTML</button>\n  <button role="tab" aria-selected="false">Next.js</button>\n</div>\n<div role="tabpanel">Contoh HTML</div>`,
      `'use client'\n\nexport default function CodeTabs() {\n  return <div><div role="tablist"><button role="tab" aria-selected="true">HTML</button><button role="tab">Next.js</button></div><div role="tabpanel">Contoh HTML</div></div>\n}`,
      `.tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); }\n.tabs button { padding: 10px 14px; border: 0; border-bottom: 3px solid transparent; background: none; }\n.tabs [aria-selected="true"] { color: var(--primary); border-color: var(--primary); font-weight: 700; }`
    ),
  },
  {
    id: 'snackbar', title: 'Snackbar', category: 'components', icon: 'notifications', level: 'Menengah', duration: '12 menit',
    summary: 'Pesan singkat tentang hasil proses, biasanya dengan satu aksi opsional.',
    usage: 'Gunakan untuk feedback non-kritis seperti data tersimpan. Error yang memblokir perlu tampil dekat sumber masalah.',
    anatomy: ['Container', 'Supporting text', 'Action opsional', 'Dismiss opsional'],
    principles: ['Pesan harus ringkas.', 'Jangan menumpuk banyak snackbar.', 'Gunakan aria-live untuk pembaruan dinamis.'],
    code: makeCode(
      `<div class="snackbar" role="status" aria-live="polite">\n  Draft berhasil disimpan. <button type="button">Urungkan</button>\n</div>`,
      `export default function Snackbar() {\n  return <div className="snackbar" role="status" aria-live="polite">Draft berhasil disimpan. <button>Urungkan</button></div>\n}`,
      `.snackbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; max-width: 420px; padding: 14px 16px; border-radius: 14px; color: white; background: #26332b; }\n.snackbar button { border: 0; color: #8ff0b4; background: none; font-weight: 700; }`
    ),
  },
  {
    id: 'tooltip', title: 'Tooltip', category: 'components', icon: 'lightbulb', level: 'Menengah', duration: '11 menit',
    summary: 'Label atau penjelasan singkat yang muncul saat hover atau fokus.',
    usage: 'Cocok untuk tombol ikon. Informasi penting tidak boleh hanya tersedia di tooltip.',
    anatomy: ['Trigger', 'Tooltip container', 'Descriptive text', 'Placement'],
    principles: ['Muncul saat fokus keyboard.', 'Tidak menutupi trigger.', 'Teks pendek dan langsung.'],
    code: makeCode(
      `<button class="tip-trigger" aria-describedby="save-tip">Simpan</button>\n<span class="tooltip" id="save-tip" role="tooltip">Simpan draft</span>`,
      `export default function SaveWithTip() {\n  return <span className="tipWrap"><button aria-describedby="save-tip">Simpan</button><span id="save-tip" role="tooltip">Simpan draft</span></span>\n}`,
      `.tipWrap { position: relative; display: inline-flex; }\n.tooltip { position: absolute; left: 50%; bottom: calc(100% + 8px); translate: -50% 0; padding: 6px 9px; border-radius: 8px; color: white; background: #26332b; font-size: .75rem; }`
    ),
  },
  {
    id: 'breadcrumbs', title: 'Breadcrumbs', category: 'components', icon: 'arrow_forward', level: 'Dasar', duration: '9 menit',
    summary: 'Jejak lokasi halaman di dalam hierarki informasi.',
    usage: 'Berguna pada situs dengan struktur lebih dari dua tingkat. Bukan pengganti navigasi utama.',
    anatomy: ['Navigation landmark', 'Parent links', 'Separator', 'Current page'],
    principles: ['Gunakan elemen nav dan ol.', 'Halaman aktif memakai aria-current.', 'Label parent tetap pendek.'],
    code: makeCode(
      `<nav aria-label="Breadcrumb"><ol class="breadcrumbs"><li><a href="/">Beranda</a></li><li><a href="/materi">Materi</a></li><li aria-current="page">Button</li></ol></nav>`,
      `import Link from 'next/link'\n\nexport default function Breadcrumbs() {\n  return <nav aria-label="Breadcrumb"><ol className="breadcrumbs"><li><Link href="/">Beranda</Link></li><li aria-current="page">Button</li></ol></nav>\n}`,
      `.breadcrumbs { display: flex; gap: 8px; padding: 0; list-style: none; color: var(--muted); font-size: .875rem; }\n.breadcrumbs li + li::before { content: '/'; margin-right: 8px; color: #8a958c; }`
    ),
  },
  {
    id: 'pagination', title: 'Pagination', category: 'components', icon: 'arrow_forward', level: 'Menengah', duration: '13 menit',
    summary: 'Navigasi untuk memecah koleksi panjang menjadi beberapa halaman.',
    usage: 'Gunakan bila pengguna perlu memahami posisi atau kembali ke bagian tertentu dari koleksi.',
    anatomy: ['Previous', 'Page links', 'Current page', 'Next'],
    principles: ['Tandai halaman aktif.', 'Jangan hanya gunakan ikon tanpa nama.', 'Pertahankan filter saat berpindah halaman.'],
    code: makeCode(
      `<nav class="pagination" aria-label="Halaman hasil"><a href="?page=1">Sebelumnya</a><a href="?page=2" aria-current="page">2</a><a href="?page=3">Berikutnya</a></nav>`,
      `import Link from 'next/link'\n\nexport default function Pagination() {\n  return <nav aria-label="Halaman hasil"><Link href="?page=1">Sebelumnya</Link><Link href="?page=2" aria-current="page">2</Link></nav>\n}`,
      `.pagination { display: flex; align-items: center; gap: 6px; }\n.pagination a { padding: 9px 12px; border: 1px solid var(--border); border-radius: 10px; text-decoration: none; }\n.pagination [aria-current="page"] { color: white; background: var(--primary); }`
    ),
  },
  {
    id: 'progress', title: 'Progress indicator', category: 'components', icon: 'monitoring', level: 'Dasar', duration: '10 menit',
    summary: 'Representasi status penyelesaian proses atau rangkaian langkah.',
    usage: 'Pakai determinate jika nilai kemajuan diketahui dan indeterminate jika durasinya belum diketahui.',
    anatomy: ['Track', 'Active indicator', 'Value label', 'Supporting label'],
    principles: ['Tampilkan nilai dalam teks jika berguna.', 'Jangan membuat progres palsu.', 'Gunakan progress native bila memungkinkan.'],
    code: makeCode(
      `<label for="course-progress">Progres belajar: 60%</label>\n<progress id="course-progress" max="100" value="60">60%</progress>`,
      `export default function CourseProgress({ value = 60 }) {\n  return <label>Progres belajar: {value}%<progress max="100" value={value}>{value}%</progress></label>\n}`,
      `progress { width: 100%; height: 10px; accent-color: var(--primary); }\nprogress::-webkit-progress-bar { border-radius: 99px; background: var(--surface-soft); }`
    ),
  },
  {
    id: 'navigation', title: 'Navigation', category: 'components', icon: 'menu_book', level: 'Menengah', duration: '18 menit',
    summary: 'Sistem tautan yang membantu pengguna memahami lokasi dan berpindah bagian.',
    usage: 'Pilih pola sesuai viewport: bar bawah untuk mobile, rail atau drawer untuk layar lebar.',
    anatomy: ['Container', 'Destination item', 'Active indicator', 'Label dan ikon'],
    principles: ['Prioritaskan 3–5 tujuan utama.', 'Status aktif harus konsisten.', 'Nama menu mengikuti bahasa pengguna.'],
    code: makeCode(
      `<nav class="main-nav" aria-label="Utama"><a href="/" aria-current="page">Beranda</a><a href="/materi">Materi</a><a href="/latihan">Latihan</a></nav>`,
      `import Link from 'next/link'\n\nexport default function Navigation() {\n  return <nav aria-label="Utama"><Link href="/">Beranda</Link><Link href="/materi">Materi</Link><Link href="/latihan">Latihan</Link></nav>\n}`,
      `.main-nav { display: flex; gap: 6px; }\n.main-nav a { padding: 10px 14px; border-radius: 12px; color: var(--muted); text-decoration: none; }\n.main-nav [aria-current="page"] { color: var(--primary); background: #e3f5ea; font-weight: 700; }`
    ),
  },
  {
    id: 'skeleton', title: 'Skeleton', category: 'components', icon: 'grid_view', level: 'Menengah', duration: '10 menit',
    summary: 'Placeholder berbentuk struktur konten saat data sedang dimuat.',
    usage: 'Gunakan saat struktur hasil bisa diprediksi. Untuk proses singkat, skeleton sering tidak diperlukan.',
    anatomy: ['Placeholder media', 'Text lines', 'Container shape', 'Loading state'],
    principles: ['Bentuk mengikuti konten asli.', 'Hentikan animasi untuk reduced motion.', 'Jangan tampilkan terlalu lama tanpa feedback.'],
    code: makeCode(
      `<div class="skeleton" aria-label="Memuat materi" aria-busy="true"><span class="skeleton__title"></span><span></span><span></span></div>`,
      `export default function Loading() {\n  return <div className="skeleton" aria-label="Memuat materi" aria-busy="true"><span /><span /><span /></div>\n}`,
      `.skeleton { display: grid; gap: 10px; }\n.skeleton span { display: block; height: 12px; border-radius: 99px; background: #e1e8e2; animation: pulse 1.4s ease-in-out infinite; }\n.skeleton__title { width: 55%; height: 20px !important; }\n@keyframes pulse { 50% { opacity: .45; } }`
    ),
  },
  {
    id: 'alert', title: 'Alert & banner', category: 'components', icon: 'notifications', level: 'Dasar', duration: '12 menit',
    summary: 'Pesan menonjol untuk perubahan, peringatan, atau informasi yang perlu segera diketahui.',
    usage: 'Gunakan alert inline untuk feedback yang menetap dan banner untuk informasi tingkat halaman atau aplikasi.',
    anatomy: ['Status icon', 'Headline', 'Supporting text', 'Action opsional'],
    principles: ['Pesan menjelaskan dampak dan langkah lanjut.', 'Gunakan role alert hanya untuk pesan mendesak.', 'Jangan bergantung pada warna saja.'],
    code: makeCode(
      `<section class="alert" role="status"><strong>Perubahan tersimpan</strong><p>Profilmu sudah menggunakan data terbaru.</p></section>`,
      `export default function Alert() {\n  return <section className="alert" role="status"><strong>Perubahan tersimpan</strong><p>Profilmu sudah menggunakan data terbaru.</p></section>\n}`,
      `.alert { padding: 16px; border: 1px solid #8fc8a6; border-radius: 14px; color: #123d25; background: #e4f7eb; }\n.alert p { margin: 4px 0 0; line-height: 1.5; }`
    ),
  },
  {
    id: 'avatar-badge', title: 'Avatar & badge', category: 'components', icon: 'account_circle', level: 'Dasar', duration: '11 menit',
    summary: 'Avatar mewakili pengguna atau entitas; badge menampilkan status atau metadata ringkas.',
    usage: 'Pakai inisial sebagai fallback avatar dan badge untuk status pendek seperti Baru, Pro, atau 3 notifikasi.',
    anatomy: ['Avatar image atau initial', 'Accessible name', 'Badge container', 'Status value'],
    principles: ['Sediakan alt yang bermakna atau kosong untuk dekoratif.', 'Badge tidak menggantikan label lengkap.', 'Jaga bentuk dan ukuran konsisten.'],
    code: makeCode(
      `<div class="profile"><span class="avatar" aria-label="Pelajar bernama Nara">N</span><span><strong>Nara</strong><small class="badge">Pro</small></span></div>`,
      `export default function Profile() {\n  return <div className="profile"><span className="avatar" aria-label="Pelajar bernama Nara">N</span><span><strong>Nara</strong><small className="badge">Pro</small></span></div>\n}`,
      `.profile { display: flex; align-items: center; gap: 12px; }\n.avatar { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 50%; color: white; background: var(--primary); font-weight: 700; }\n.badge { margin-left: 8px; padding: 3px 7px; border-radius: 99px; background: #e3f5ea; }`
    ),
  },
  {
    id: 'icon-button', title: 'Icon button & FAB', category: 'components', icon: 'star', level: 'Dasar', duration: '13 menit',
    summary: 'Tombol ikon menyediakan aksi ringkas; FAB menonjolkan aksi utama pada konteks mobile.',
    usage: 'Gunakan icon button untuk aksi yang ikonnya familiar dan FAB untuk satu aksi penting seperti membuat item.',
    anatomy: ['Touch target', 'Icon', 'State layer', 'Accessible name'],
    principles: ['Berikan aria-label.', 'Target sentuh minimal 44 px.', 'Maksimal satu FAB utama per layar.'],
    code: makeCode(
      `<button class="icon-button" type="button" aria-label="Tambah materi">+</button>`,
      `export default function AddButton() {\n  return <button className="iconButton" type="button" aria-label="Tambah materi">+</button>\n}`,
      `.icon-button { display: grid; width: 48px; height: 48px; place-items: center; border: 0; border-radius: 16px; color: white; background: var(--primary); font-size: 1.5rem; box-shadow: 0 8px 20px rgb(11 110 62 / .24); }`
    ),
  },
  {
    id: 'chips', title: 'Chips', category: 'components', icon: 'auto_awesome', level: 'Dasar', duration: '13 menit',
    summary: 'Elemen ringkas untuk filter, input pilihan, saran, atau aksi kecil yang kontekstual.',
    usage: 'Gunakan filter chips untuk menyaring koleksi dan input chips untuk nilai yang dimasukkan pengguna.',
    anatomy: ['Container', 'Label', 'Leading icon opsional', 'Selected state'],
    principles: ['Bedakan chip terpilih dengan jelas.', 'Jangan mengganti semua button dengan chip.', 'Label maksimal beberapa kata.'],
    code: makeCode(
      `<div class="chips" aria-label="Filter topik"><button aria-pressed="true">Semua</button><button aria-pressed="false">CSS</button><button aria-pressed="false">Next.js</button></div>`,
      `'use client'\n\nexport default function FilterChips() {\n  return <div className="chips"><button aria-pressed="true">Semua</button><button aria-pressed="false">CSS</button></div>\n}`,
      `.chips { display: flex; gap: 8px; overflow-x: auto; }\n.chips button { padding: 8px 13px; border: 1px solid var(--border); border-radius: 99px; background: white; white-space: nowrap; }\n.chips [aria-pressed="true"] { color: var(--primary); background: #e3f5ea; }`
    ),
  },
  {
    id: 'list', title: 'List', category: 'components', icon: 'menu_book', level: 'Dasar', duration: '12 menit',
    summary: 'Susunan vertikal item berulang untuk konten, pilihan, atau tujuan navigasi.',
    usage: 'Gunakan list ketika item memiliki pola data yang sama dan perlu dipindai dari atas ke bawah.',
    anatomy: ['Leading element', 'Headline', 'Supporting text', 'Trailing action'],
    principles: ['Gunakan ul atau ol jika urutan bermakna.', 'Jaga alignment elemen berulang.', 'Pisahkan aksi sekunder dari target utama.'],
    code: makeCode(
      `<ul class="lesson-list"><li><span>01</span><div><strong>Button</strong><p>12 menit</p></div></li><li><span>02</span><div><strong>Card</strong><p>14 menit</p></div></li></ul>`,
      `export default function LessonList({ lessons }) {\n  return <ul className="lessonList">{lessons.map((lesson) => <li key={lesson.id}><strong>{lesson.title}</strong><span>{lesson.duration}</span></li>)}</ul>\n}`,
      `.lesson-list { display: grid; gap: 8px; padding: 0; list-style: none; }\n.lesson-list li { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid var(--border); border-radius: 14px; }\n.lesson-list p { margin: 3px 0 0; color: var(--muted); }`
    ),
  },
  {
    id: 'divider', title: 'Divider', category: 'components', icon: 'layers', level: 'Dasar', duration: '8 menit',
    summary: 'Garis halus untuk memisahkan kelompok konten ketika jarak saja belum cukup.',
    usage: 'Gunakan dengan hemat di antara kelompok yang berbeda, bukan di antara setiap elemen kecil.',
    anatomy: ['Line', 'Inset opsional', 'Start edge', 'End edge'],
    principles: ['Utamakan spacing sebelum divider.', 'Kontras harus lembut.', 'Divider dekoratif tidak perlu diumumkan.'],
    code: makeCode(
      `<section><p>Profil</p><hr class="divider"><p>Preferensi</p></section>`,
      `export default function Settings() {\n  return <section><p>Profil</p><hr className="divider" /><p>Preferensi</p></section>\n}`,
      `.divider { height: 1px; margin: 16px 0; border: 0; background: var(--border); }`
    ),
  },
  {
    id: 'search-bar', title: 'Search bar', category: 'components', icon: 'search', level: 'Dasar', duration: '14 menit',
    summary: 'Input pencarian untuk menemukan item pada koleksi, situs, atau konteks tertentu.',
    usage: 'Tampilkan search bar ketika pencarian merupakan jalur utama untuk menemukan konten.',
    anatomy: ['Search icon', 'Input', 'Clear action', 'Suggestions opsional'],
    principles: ['Label atau accessible name harus tersedia.', 'Tombol clear muncul saat ada nilai.', 'Pertahankan query di halaman hasil.'],
    code: makeCode(
      `<form class="search" role="search"><label class="sr-only" for="q">Cari materi</label><input id="q" name="q" type="search" placeholder="Cari materi…"><button>Cari</button></form>`,
      `'use client'\n\nexport default function SearchBar() {\n  return <form className="search" role="search"><label className="srOnly" htmlFor="q">Cari materi</label><input id="q" name="q" type="search" /><button>Cari</button></form>\n}`,
      `.search { display: flex; gap: 8px; }\n.search input { min-width: 0; flex: 1; min-height: 46px; padding: 0 14px; border: 1px solid var(--border); border-radius: 14px; }`
    ),
  },
  {
    id: 'slider', title: 'Slider', category: 'components', icon: 'tune', level: 'Menengah', duration: '14 menit',
    summary: 'Input untuk memilih nilai pada rentang kontinu atau bertahap.',
    usage: 'Cocok untuk volume, zoom, atau nilai perkiraan. Gunakan number input untuk nilai yang harus presisi.',
    anatomy: ['Track', 'Active track', 'Handle', 'Value label'],
    principles: ['Tampilkan nilai saat dibutuhkan.', 'Berikan min, max, dan step yang masuk akal.', 'Harus dapat dikontrol keyboard.'],
    code: makeCode(
      `<label class="range">Ukuran teks <output>16px</output><input type="range" min="12" max="24" value="16"></label>`,
      `'use client'\n\nexport default function TextSize() {\n  return <label className="range">Ukuran teks <input type="range" min="12" max="24" defaultValue="16" /></label>\n}`,
      `.range { display: grid; grid-template-columns: 1fr auto; gap: 10px; }\n.range input { grid-column: 1 / -1; width: 100%; accent-color: var(--primary); }`
    ),
  },
  {
    id: 'data-table', title: 'Data table', category: 'components', icon: 'grid_view', level: 'Menengah', duration: '20 menit',
    summary: 'Struktur baris dan kolom untuk membandingkan data terukur atau berulang.',
    usage: 'Gunakan saat pengguna perlu memindai dan membandingkan beberapa atribut antaritem.',
    anatomy: ['Caption', 'Column header', 'Data row', 'Sort control'],
    principles: ['Sediakan caption yang jelas.', 'Header memakai th dan scope.', 'Bungkus secara horizontal di layar sempit.'],
    code: makeCode(
      `<div class="table-wrap"><table><caption>Progres materi</caption><thead><tr><th scope="col">Materi</th><th scope="col">Nilai</th></tr></thead><tbody><tr><th scope="row">HTML</th><td>88%</td></tr></tbody></table></div>`,
      `export default function ProgressTable() {\n  return <div className="tableWrap"><table><caption>Progres materi</caption><thead><tr><th>Materi</th><th>Nilai</th></tr></thead><tbody><tr><th>HTML</th><td>88%</td></tr></tbody></table></div>\n}`,
      `.table-wrap { overflow-x: auto; }\ntable { width: 100%; border-collapse: collapse; }\ncaption { margin-bottom: 12px; font-weight: 700; text-align: left; }\nth, td { padding: 12px; border-bottom: 1px solid var(--border); text-align: left; }`
    ),
  },
  {
    id: 'menu', title: 'Menu & dropdown', category: 'components', icon: 'layers', level: 'Menengah', duration: '17 menit',
    summary: 'Daftar aksi atau tujuan sementara yang dibuka dari sebuah trigger.',
    usage: 'Gunakan menu untuk aksi kontekstual. Select tetap digunakan untuk memilih nilai dalam form.',
    anatomy: ['Trigger', 'Menu container', 'Menu item', 'Selected atau destructive state'],
    principles: ['Trigger mengumumkan expanded state.', 'Escape menutup menu.', 'Navigasi keyboard mengikuti pola menu.'],
    code: makeCode(
      `<div class="menu-wrap"><button aria-haspopup="menu" aria-expanded="true">Aksi</button><ul class="menu" role="menu"><li role="menuitem">Duplikat</li><li role="menuitem">Hapus</li></ul></div>`,
      `'use client'\n\nexport default function ActionMenu() {\n  return <div><button aria-haspopup="menu" aria-expanded="true">Aksi</button><ul role="menu"><li role="menuitem">Duplikat</li><li role="menuitem">Hapus</li></ul></div>\n}`,
      `.menu-wrap { position: relative; width: fit-content; }\n.menu { position: absolute; top: calc(100% + 8px); min-width: 180px; margin: 0; padding: 6px; border: 1px solid var(--border); border-radius: 12px; background: white; list-style: none; box-shadow: 0 14px 34px rgb(18 28 40 / .14); }\n.menu li { padding: 10px; border-radius: 8px; }`
    ),
  },
  {
    id: 'drawer-sheet', title: 'Drawer & sheet', category: 'components', icon: 'menu_book', level: 'Menengah', duration: '18 menit',
    summary: 'Panel dari tepi layar untuk navigasi, detail, atau tugas sekunder.',
    usage: 'Navigation drawer cocok untuk tujuan aplikasi; bottom sheet cocok untuk pilihan atau detail kontekstual di mobile.',
    anatomy: ['Scrim opsional', 'Sheet container', 'Drag handle opsional', 'Content area'],
    principles: ['Jangan menumpuk sheet.', 'Sediakan close action yang jelas.', 'Fokus tetap berada di modal sheet.'],
    code: makeCode(
      `<aside class="drawer" aria-label="Navigasi"><button aria-label="Tutup">×</button><nav><a href="/">Beranda</a><a href="/materi">Materi</a></nav></aside>`,
      `'use client'\n\nexport default function Drawer({ open, onClose }) {\n  if (!open) return null\n  return <aside className="drawer" aria-label="Navigasi"><button onClick={onClose}>Tutup</button><nav>...</nav></aside>\n}`,
      `.drawer { position: fixed; inset: 0 auto 0 0; width: min(88vw, 340px); padding: 20px; border-radius: 0 24px 24px 0; background: white; box-shadow: 20px 0 60px rgb(18 28 40 / .18); }`
    ),
  },
  {
    id: 'empty-state', title: 'Empty state', category: 'components', icon: 'explore_off', level: 'Dasar', duration: '12 menit',
    summary: 'Tampilan saat koleksi valid tetapi belum memiliki data untuk ditampilkan.',
    usage: 'Jelaskan mengapa kosong dan tawarkan satu langkah relevan seperti membuat item atau mereset filter.',
    anatomy: ['Simple visual', 'Headline', 'Explanation', 'Primary action'],
    principles: ['Bedakan dari error state.', 'Aksi harus relevan dengan penyebab kosong.', 'Hindari ilustrasi yang lebih dominan dari pesan.'],
    code: makeCode(
      `<section class="empty"><h2>Belum ada proyek</h2><p>Buat proyek pertamamu untuk mulai berlatih.</p><button>Buat proyek</button></section>`,
      `export default function EmptyProjects() {\n  return <section className="empty"><h2>Belum ada proyek</h2><p>Buat proyek pertamamu untuk mulai berlatih.</p><button>Buat proyek</button></section>\n}`,
      `.empty { max-width: 460px; padding: 36px 24px; border: 1px dashed var(--border); border-radius: 20px; background: var(--surface); text-align: center; }\n.empty p { color: var(--muted); line-height: 1.6; }`
    ),
  },
  {
    id: 'file-upload', title: 'File upload', category: 'components', icon: 'arrow_forward', level: 'Menengah', duration: '18 menit',
    summary: 'Input untuk memilih atau menyeret berkas dari perangkat pengguna.',
    usage: 'Tampilkan tipe, ukuran maksimum, progres, dan cara menghapus atau mengganti file.',
    anatomy: ['File input', 'Drop zone', 'Requirement text', 'File status'],
    principles: ['Input file native tetap tersedia.', 'Drag and drop bukan satu-satunya cara.', 'Validasi memberi alasan yang spesifik.'],
    code: makeCode(
      `<label class="upload" for="portfolio"><strong>Unggah portfolio</strong><span>PDF, maksimal 5 MB</span><input id="portfolio" type="file" accept="application/pdf"></label>`,
      `'use client'\n\nexport default function FileUpload() {\n  return <label className="upload" htmlFor="portfolio"><strong>Unggah portfolio</strong><span>PDF, maksimal 5 MB</span><input id="portfolio" type="file" accept="application/pdf" /></label>\n}`,
      `.upload { display: grid; gap: 8px; padding: 24px; border: 1px dashed #7a877d; border-radius: 16px; background: var(--surface-soft); text-align: center; cursor: pointer; }\n.upload span { color: var(--muted); font-size: .875rem; }`
    ),
  },
  {
    id: 'date-picker', title: 'Date picker', category: 'components', icon: 'grid_view', level: 'Menengah', duration: '17 menit',
    summary: 'Kontrol kalender untuk memilih satu tanggal atau rentang tanggal.',
    usage: 'Gunakan input tanggal untuk nilai yang sudah diketahui dan kalender visual untuk eksplorasi tanggal.',
    anatomy: ['Month navigation', 'Week labels', 'Date grid', 'Selected date'],
    principles: ['Format tanggal dijelaskan.', 'Tanggal nonaktif punya alasan.', 'Dukung input keyboard dan teks.'],
    code: makeCode(
      `<label class="field">Tanggal mulai<input type="date" name="start-date"></label>`,
      `'use client'\n\nexport default function StartDate() {\n  return <label className="field">Tanggal mulai<input type="date" name="startDate" /></label>\n}`,
      `input[type="date"] { min-height: 48px; padding: 0 14px; border: 1px solid #7a877d; border-radius: 12px; color: var(--text); background: white; font: inherit; }`
    ),
  },
  {
    id: 'carousel', title: 'Carousel', category: 'components', icon: 'arrow_forward', level: 'Menengah', duration: '19 menit',
    summary: 'Deretan panel yang dapat digeser untuk menampilkan konten terkait dalam ruang terbatas.',
    usage: 'Gunakan untuk konten eksploratif, bukan informasi penting yang harus selalu terlihat.',
    anatomy: ['Slide', 'Viewport', 'Previous dan next', 'Position indicator'],
    principles: ['Jangan auto-play tanpa kontrol.', 'Tombol punya nama yang jelas.', 'Konten tetap dapat diakses keyboard.'],
    code: makeCode(
      `<section class="carousel" aria-label="Materi pilihan"><button aria-label="Materi sebelumnya">←</button><article>CSS Grid</article><button aria-label="Materi berikutnya">→</button></section>`,
      `'use client'\n\nexport default function Carousel() {\n  return <section className="carousel" aria-label="Materi pilihan"><button aria-label="Sebelumnya">←</button><article>CSS Grid</article><button aria-label="Berikutnya">→</button></section>\n}`,
      `.carousel { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; }\n.carousel article { min-height: 160px; padding: 24px; border-radius: 20px; background: #e3f5ea; }`
    ),
  },
  {
    id: 'color-system', title: 'Color & design tokens', category: 'ux', icon: 'auto_awesome', level: 'Dasar', duration: '20 menit',
    summary: 'Warna semantik menjaga identitas, hierarki, status, dan kontras tetap konsisten.',
    usage: 'Beri nama token berdasarkan fungsi—primary, surface, error—bukan nama warna literal.',
    anatomy: ['Primary roles', 'Surface roles', 'On-color roles', 'State colors'],
    principles: ['Uji kontras teks minimal 4.5:1.', 'Jangan menyampaikan status dengan warna saja.', 'Gunakan token agar tema mudah diubah.'],
    code: makeCode(
      `<section class="notice notice--success"><strong>Berhasil</strong><p>Profil telah diperbarui.</p></section>`,
      `export default function SuccessNotice() {\n  return <section className="notice notice--success"><strong>Berhasil</strong><p>Profil telah diperbarui.</p></section>\n}`,
      `:root { --color-primary: #0b6e3e; --color-on-primary: #fff; --color-success-container: #d9f7e5; --color-on-success-container: #123d25; }\n.notice--success { color: var(--color-on-success-container); background: var(--color-success-container); }`
    ),
  },
  {
    id: 'typography', title: 'Typography hierarchy', category: 'ux', icon: 'menu_book', level: 'Dasar', duration: '18 menit',
    summary: 'Skala teks membantu pembaca membedakan judul, isi, label, dan metadata tanpa kebisingan visual.',
    usage: 'Mulai dari body 16px, batasi jumlah ukuran, dan gunakan bobot tebal hanya pada titik penekanan.',
    anatomy: ['Display atau headline', 'Title', 'Body', 'Label'],
    principles: ['Gunakan maksimal 4–5 ukuran per halaman.', 'Body memakai line-height 1.5–1.7.', 'Hindari semua judul memakai extra bold.'],
    code: makeCode(
      `<article class="lesson"><p class="eyebrow">Bab 02</p><h1>Hierarki yang tenang</h1><p>Skala yang konsisten membuat konten lebih mudah dipindai.</p></article>`,
      `export default function LessonIntro() {\n  return <article className="lesson"><p className="eyebrow">Bab 02</p><h1>Hierarki yang tenang</h1><p>Skala konsisten membuat konten mudah dipindai.</p></article>\n}`,
      `.lesson { max-width: 65ch; }\n.lesson h1 { margin: 8px 0 12px; font-size: clamp(2rem, 5vw, 3.25rem); line-height: 1.08; letter-spacing: -.03em; }\n.lesson p { color: var(--muted); font-size: 1rem; line-height: 1.65; }\n.eyebrow { font-size: .75rem !important; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; }`
    ),
  },
  {
    id: 'spacing', title: 'Spacing & layout rhythm', category: 'ux', icon: 'grid_view', level: 'Dasar', duration: '16 menit',
    summary: 'Sistem jarak menciptakan ritme dan hubungan antarelemen tanpa menambah garis atau dekorasi.',
    usage: 'Gunakan skala kecil yang konsisten seperti 4, 8, 12, 16, 24, dan 32 px.',
    anatomy: ['Inset spacing', 'Stack spacing', 'Grid gutter', 'Section spacing'],
    principles: ['Jarak dekat berarti berkaitan.', 'Padding card harus konsisten.', 'Gunakan gap alih-alih margin acak.'],
    code: makeCode(
      `<section class="stack"><header><h2>Materi terbaru</h2><p>Teruskan progres belajarmu.</p></header><div class="grid"><article>HTML</article><article>CSS</article></div></section>`,
      `export default function LessonGrid() {\n  return <section className="stack"><header><h2>Materi terbaru</h2><p>Teruskan progres.</p></header><div className="grid"><article>HTML</article><article>CSS</article></div></section>\n}`,
      `.stack { display: grid; gap: 24px; }\n.stack header { display: grid; gap: 8px; }\n.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }\n.grid article { padding: 20px; border: 1px solid var(--border); border-radius: var(--radius); }`
    ),
  },
  {
    id: 'responsive', title: 'Responsive patterns', category: 'ux', icon: 'monitoring', level: 'Menengah', duration: '22 menit',
    summary: 'Layout beradaptasi terhadap ruang, perangkat input, dan kebutuhan pengguna—bukan sekadar ukuran layar.',
    usage: 'Mulai dari alur satu kolom, lalu tambah kolom ketika konten punya ruang yang cukup.',
    anatomy: ['Fluid container', 'Content breakpoint', 'Flexible grid', 'Adaptive navigation'],
    principles: ['Hindari lebar tetap pada konten utama.', 'Uji 320px sampai layar lebar.', 'Gunakan minmax untuk mencegah overflow.'],
    code: makeCode(
      `<main class="container"><section class="responsive-grid"><article>Materi 1</article><article>Materi 2</article></section></main>`,
      `export default function Courses() {\n  return <main className="container"><section className="responsiveGrid"><article>Materi 1</article><article>Materi 2</article></section></main>\n}`,
      `.container { width: min(100% - 32px, 1120px); margin-inline: auto; }\n.responsive-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 16px; }\n@media (min-width: 768px) { .container { width: min(100% - 56px, 1120px); } }`
    ),
  },
  {
    id: 'semantic-html', title: 'Semantic HTML', category: 'html-css', icon: 'html', level: 'Dasar', duration: '20 menit',
    summary: 'Elemen HTML semantik memberi struktur bermakna untuk browser, mesin pencari, dan teknologi asistif.',
    usage: 'Pilih elemen dari maknanya: button untuk aksi, a untuk navigasi, nav untuk kumpulan tautan.',
    anatomy: ['Landmark', 'Heading order', 'Interactive elements', 'Content grouping'],
    principles: ['Jangan membuat div yang berpura-pura menjadi button.', 'Satu h1 yang jelas per halaman.', 'Gunakan list untuk kumpulan item.'],
    code: makeCode(
      `<header><nav aria-label="Utama">...</nav></header>\n<main>\n  <h1>Katalog materi</h1>\n  <section aria-labelledby="baru"><h2 id="baru">Materi baru</h2></section>\n</main>\n<footer>...</footer>`,
      `export default function Page() {\n  return <><header><nav aria-label="Utama">...</nav></header><main><h1>Katalog materi</h1><section aria-labelledby="baru"><h2 id="baru">Materi baru</h2></section></main><footer>...</footer></>\n}`,
      `body { margin: 0; color: var(--text); background: var(--surface-soft); }\nmain { width: min(100% - 32px, 1120px); margin-inline: auto; }\nsection { margin-block: 40px; }`
    ),
  },
  {
    id: 'flexbox', title: 'CSS Flexbox', category: 'html-css', icon: 'code', level: 'Dasar', duration: '24 menit',
    summary: 'Model layout satu dimensi untuk menyusun item dalam baris atau kolom.',
    usage: 'Cocok untuk navigation bar, action row, media object, dan alignment komponen.',
    anatomy: ['Main axis', 'Cross axis', 'Gap', 'Flexible item'],
    principles: ['Gunakan gap untuk jarak antaranak.', 'Biarkan item membungkus bila perlu.', 'Tambahkan min-width: 0 pada anak fleksibel berisi teks.'],
    code: makeCode(
      `<div class="toolbar"><div class="toolbar__title"><h2>Materi</h2><p>24 komponen</p></div><button>Filter</button></div>`,
      `export default function Toolbar() {\n  return <div className="toolbar"><div className="toolbarTitle"><h2>Materi</h2><p>24 komponen</p></div><button>Filter</button></div>\n}`,
      `.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }\n.toolbar__title { min-width: 0; }\n.toolbar h2, .toolbar p { margin: 0; }`
    ),
  },
  {
    id: 'css-grid', title: 'CSS Grid', category: 'html-css', icon: 'grid_view', level: 'Menengah', duration: '26 menit',
    summary: 'Model layout dua dimensi untuk mengatur baris dan kolom secara bersamaan.',
    usage: 'Cocok untuk katalog card, dashboard, dan shell halaman dengan sidebar.',
    anatomy: ['Grid container', 'Track', 'Gap', 'Grid item'],
    principles: ['Gunakan minmax(0, 1fr) untuk area cair.', 'Auto-fit cocok untuk katalog responsif.', 'Hindari breakpoint bila intrinsic layout cukup.'],
    code: makeCode(
      `<section class="catalog"><article>Button</article><article>Card</article><article>Dialog</article></section>`,
      `export default function Catalog() {\n  return <section className="catalog">{['Button', 'Card', 'Dialog'].map((name) => <article key={name}>{name}</article>)}</section>\n}`,
      `.catalog { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 16px; }\n.catalog article { min-width: 0; padding: 20px; border: 1px solid var(--border); border-radius: var(--radius); }`
    ),
  },
  {
    id: 'forms', title: 'Accessible forms', category: 'a11y', icon: 'verified', level: 'Menengah', duration: '25 menit',
    summary: 'Form yang mudah dipahami, diisi, divalidasi, dan diperbaiki oleh semua pengguna.',
    usage: 'Kelompokkan field secara logis, berikan label tetap, dan fokuskan pengguna pada error pertama saat submit gagal.',
    anatomy: ['Form name', 'Label dan field', 'Instructions', 'Validation summary'],
    principles: ['Error tidak cukup ditandai merah.', 'Gunakan autocomplete yang sesuai.', 'Jangan menonaktifkan paste pada password.'],
    code: makeCode(
      `<form class="form"><label for="name">Nama lengkap</label><input id="name" name="name" autocomplete="name" required><button type="submit">Simpan profil</button></form>`,
      `'use client'\n\nexport default function ProfileForm() {\n  return <form className="form"><label htmlFor="name">Nama lengkap</label><input id="name" name="name" autoComplete="name" required /><button>Simpan profil</button></form>\n}`,
      `.form { display: grid; gap: 10px; max-width: 480px; }\n.form input { min-height: 48px; padding-inline: 14px; border: 1px solid #778279; border-radius: 12px; }\n.form button { justify-self: start; margin-top: 8px; }`
    ),
  },
  {
    id: 'focus-keyboard', title: 'Focus & keyboard', category: 'a11y', icon: 'verified', level: 'Menengah', duration: '20 menit',
    summary: 'Semua fungsi interaktif harus bisa ditemukan dan dijalankan tanpa mouse.',
    usage: 'Gunakan elemen native, urutan DOM logis, dan focus ring yang terlihat jelas.',
    anatomy: ['Tab order', 'Focus indicator', 'Keyboard behavior', 'Focus return'],
    principles: ['Jangan menghapus outline tanpa pengganti.', 'Hindari tabindex positif.', 'Escape menutup lapisan sementara.'],
    code: makeCode(
      `<a class="skip-link" href="#content">Lewati ke konten</a><nav>...</nav><main id="content" tabindex="-1">...</main>`,
      `export default function Layout({ children }) {\n  return <><a className="skipLink" href="#content">Lewati ke konten</a><nav>...</nav><main id="content" tabIndex={-1}>{children}</main></>\n}`,
      `.skip-link { position: fixed; top: 8px; left: 8px; translate: 0 -160%; padding: 10px 14px; color: white; background: var(--primary); z-index: 100; }\n.skip-link:focus { translate: 0; }\n:focus-visible { outline: 3px solid #248d59; outline-offset: 3px; }`
    ),
  },
  {
    id: 'next-components', title: 'Component composition', category: 'nextjs', icon: 'data_object', level: 'Menengah', duration: '24 menit',
    summary: 'Komponen kecil dan terarah membuat antarmuka Next.js lebih mudah diuji dan dirawat.',
    usage: 'Pisahkan berdasarkan tanggung jawab dan komposisi, bukan sekadar memecah setiap elemen menjadi file.',
    anatomy: ['Props contract', 'Children slot', 'Reusable view', 'Page composition'],
    principles: ['Gunakan children untuk slot fleksibel.', 'Pertahankan state dekat pemakainya.', 'Hindari prop boolean berlebihan.'],
    code: makeCode(
      `<article class="card"><h2>Materi</h2><p>Konten card.</p></article>`,
      `function Card({ title, children }) {\n  return <article className="card"><h2>{title}</h2>{children}</article>\n}\n\nexport default function Page() {\n  return <Card title="Materi"><p>Konten card.</p></Card>\n}`,
      `.card { display: grid; gap: 10px; padding: 20px; border: 1px solid var(--border); border-radius: var(--radius); }\n.card > * { margin: 0; }`
    ),
  },
  {
    id: 'server-client', title: 'Server & Client Components', category: 'nextjs', icon: 'hub', level: 'Lanjutan', duration: '28 menit',
    summary: 'Batas server/client menentukan lokasi data, ukuran JavaScript, dan kemampuan interaktif komponen.',
    usage: 'Mulai dengan Server Component. Tambahkan use client hanya pada bagian yang membutuhkan state, effect, atau event browser.',
    anatomy: ['Server page', 'Data fetch', 'Client boundary', 'Serializable props'],
    principles: ['Jaga client boundary sekecil mungkin.', 'Fetch data di server bila memungkinkan.', 'Jangan kirim rahasia melalui props.'],
    code: makeCode(
      `<section><h1>Materi terbaru</h1><div id="course-list"></div></section>`,
      `// app/courses/page.jsx — Server Component\nimport CourseFilter from './CourseFilter'\n\nexport default async function Page() {\n  const courses = await getCourses()\n  return <><h1>Materi terbaru</h1><CourseFilter courses={courses} /></>\n}`,
      `.course-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }`
    ),
  },
  {
    id: 'next-routing', title: 'Routing & navigation', category: 'nextjs', icon: 'arrow_forward', level: 'Menengah', duration: '22 menit',
    summary: 'App Router memetakan folder ke URL dan menjaga navigasi aplikasi tetap terstruktur.',
    usage: 'Gunakan Link untuk navigasi internal dan route groups untuk merapikan organisasi tanpa mengubah URL.',
    anatomy: ['Route segment', 'Page', 'Layout', 'Link'],
    principles: ['Gunakan Link untuk URL internal.', 'Buat loading dan error boundary.', 'Nama segment harus stabil dan mudah dibaca.'],
    code: makeCode(
      `<nav><a href="/materi">Materi</a><a href="/latihan">Latihan</a></nav>`,
      `import Link from 'next/link'\n\nexport default function CourseNav() {\n  return <nav><Link href="/materi">Materi</Link><Link href="/latihan">Latihan</Link></nav>\n}`,
      `nav { display: flex; gap: 8px; }\nnav a { padding: 10px 14px; border-radius: 10px; color: var(--text); text-decoration: none; }\nnav a:hover { background: var(--surface-soft); }`
    ),
  },
  {
    id: 'loading-errors', title: 'Loading & error states', category: 'nextjs', icon: 'notifications', level: 'Menengah', duration: '24 menit',
    summary: 'File loading dan error memberi feedback dekat dengan route yang sedang diproses.',
    usage: 'Buat loading.js yang menyerupai struktur konten dan error.js dengan aksi pemulihan yang jelas.',
    anatomy: ['Suspense fallback', 'Error boundary', 'Retry action', 'Empty state'],
    principles: ['Bedakan loading, empty, dan error.', 'Pertahankan layout untuk mencegah lonjakan.', 'Error message menawarkan langkah berikutnya.'],
    code: makeCode(
      `<section role="alert"><h2>Materi gagal dimuat</h2><p>Periksa koneksi lalu coba lagi.</p><button>Muat ulang</button></section>`,
      `'use client'\n\nexport default function Error({ reset }) {\n  return <section role="alert"><h2>Materi gagal dimuat</h2><p>Periksa koneksi lalu coba lagi.</p><button onClick={() => reset()}>Coba lagi</button></section>\n}`,
      `[role="alert"] { max-width: 520px; padding: 24px; border: 1px solid #d9a09a; border-radius: 18px; background: #fff2f0; }\n[role="alert"] p { color: #6e3b36; }`
    ),
  },
]

export const QUIZ_QUESTIONS = [
  { id: 1, moduleId: 'button', difficulty: 'Dasar', question: 'Varian button mana yang paling tepat untuk satu aksi utama di sebuah halaman?', options: ['Text button', 'Filled button', 'Icon dekoratif', 'Disabled button'], correctIdx: 1, explanation: 'Filled button memiliki penekanan visual tertinggi dan cocok untuk aksi utama.' },
  { id: 2, moduleId: 'button', difficulty: 'Dasar', question: 'Label tombol yang paling jelas adalah…', options: ['Klik di sini', 'Lanjut', 'Simpan profil', 'Proses'], correctIdx: 2, explanation: 'Label berbentuk kata kerja dan objek menjelaskan hasil tindakan dengan konkret.' },
  { id: 3, moduleId: 'card', difficulty: 'Dasar', question: 'Kapan card sebaiknya digunakan?', options: ['Untuk setiap paragraf', 'Untuk mengelompokkan satu objek dan aksinya', 'Untuk mengganti seluruh section', 'Hanya sebagai dekorasi'], correctIdx: 1, explanation: 'Card mengelompokkan informasi dan aksi yang memang saling berkaitan.' },
  { id: 4, moduleId: 'text-field', difficulty: 'Dasar', question: 'Mengapa placeholder tidak boleh menjadi satu-satunya label?', code: '<input placeholder="Email">', options: ['Tidak bisa diberi warna', 'Hilang saat pengguna mengetik', 'Membuat input lambat', 'Tidak didukung browser'], correctIdx: 1, explanation: 'Placeholder menghilang ketika input terisi sehingga konteks field ikut hilang.' },
  { id: 5, moduleId: 'checkbox', difficulty: 'Dasar', question: 'Kontrol yang tepat untuk memilih beberapa minat sekaligus adalah…', options: ['Radio', 'Checkbox', 'Switch', 'Button'], correctIdx: 1, explanation: 'Checkbox mendukung pilihan independen dan multi-select.' },
  { id: 6, moduleId: 'radio', difficulty: 'Dasar', question: 'Apa aturan penting untuk radio dalam satu grup?', options: ['Semua punya id sama', 'Semua memakai name sama', 'Tidak perlu label', 'Harus bisa memilih banyak'], correctIdx: 1, explanation: 'Atribut name yang sama membuat browser memperlakukan radio sebagai satu grup eksklusif.' },
  { id: 7, moduleId: 'switch', difficulty: 'Dasar', question: 'Switch paling tepat digunakan ketika…', options: ['Perubahan langsung berlaku', 'Ada lima opsi', 'Form baru disimpan nanti', 'Membuka halaman baru'], correctIdx: 0, explanation: 'Switch merepresentasikan kondisi on/off yang berubah saat itu juga.' },
  { id: 8, moduleId: 'select', difficulty: 'Dasar', question: 'Untuk tiga opsi penting yang perlu dibandingkan langsung, pola yang lebih baik daripada select adalah…', options: ['Tooltip', 'Radio group', 'Snackbar', 'Skeleton'], correctIdx: 1, explanation: 'Radio menampilkan semua opsi sehingga mudah dibandingkan tanpa membuka menu.' },
  { id: 9, moduleId: 'accordion', difficulty: 'Menengah', question: 'Elemen HTML native yang memberi perilaku accordion sederhana adalah…', options: ['dialog dan form', 'details dan summary', 'nav dan aside', 'table dan caption'], correctIdx: 1, explanation: 'Details/summary menyediakan disclosure yang dapat digunakan dengan keyboard secara native.' },
  { id: 10, moduleId: 'dialog', difficulty: 'Menengah', question: 'Setelah dialog ditutup, fokus idealnya kembali ke…', options: ['Body halaman', 'Awal dokumen', 'Elemen yang membuka dialog', 'Address bar'], correctIdx: 2, explanation: 'Mengembalikan fokus ke trigger menjaga posisi pengguna keyboard.' },
  { id: 11, moduleId: 'tabs', difficulty: 'Menengah', question: 'Tombol keyboard yang lazim untuk berpindah antar tab adalah…', options: ['Arrow keys', 'Caps Lock', 'Page Down saja', 'Backspace'], correctIdx: 0, explanation: 'Pola ARIA tabs menggunakan tombol panah untuk bergerak di dalam tablist.' },
  { id: 12, moduleId: 'snackbar', difficulty: 'Menengah', question: 'Pesan “Draft berhasil disimpan” paling cocok memakai…', options: ['Dialog pemblokir', 'Snackbar dengan role status', 'Tooltip', 'Breadcrumb'], correctIdx: 1, explanation: 'Feedback singkat dan non-kritis cocok tampil sebagai snackbar/status.' },
  { id: 13, moduleId: 'tooltip', difficulty: 'Menengah', question: 'Informasi apa yang tidak boleh hanya disimpan di tooltip?', options: ['Label singkat tombol ikon', 'Informasi penting untuk menyelesaikan tugas', 'Nama ikon', 'Shortcut tambahan'], correctIdx: 1, explanation: 'Tooltip mudah terlewat dan tidak selalu tersedia di perangkat sentuh.' },
  { id: 14, moduleId: 'breadcrumbs', difficulty: 'Dasar', question: 'Atribut untuk menandai halaman breadcrumb saat ini adalah…', options: ['aria-live="page"', 'aria-current="page"', 'role="active"', 'data-current'], correctIdx: 1, explanation: 'aria-current="page" mengumumkan item sebagai halaman aktif.' },
  { id: 15, moduleId: 'pagination', difficulty: 'Menengah', question: 'Saat pengguna berpindah halaman hasil, apa yang sebaiknya tetap dipertahankan?', options: ['Animasi', 'Filter dan urutan pencarian', 'Warna acak', 'Scroll horizontal'], correctIdx: 1, explanation: 'Filter dan urutan adalah konteks kerja pengguna dan harus dipertahankan.' },
  { id: 16, moduleId: 'progress', difficulty: 'Dasar', question: 'Kapan progress determinate digunakan?', options: ['Nilai kemajuan diketahui', 'Durasi sama sekali tidak diketahui', 'Tidak ada proses', 'Untuk tombol aksi'], correctIdx: 0, explanation: 'Determinate menampilkan proporsi penyelesaian yang dapat dihitung.' },
  { id: 17, moduleId: 'navigation', difficulty: 'Menengah', question: 'Berapa jumlah tujuan utama yang ideal untuk bottom navigation?', options: ['1', '3–5', '8–12', 'Tidak terbatas'], correctIdx: 1, explanation: 'Tiga hingga lima tujuan menjaga navigasi mudah dikenali dan disentuh.' },
  { id: 18, moduleId: 'skeleton', difficulty: 'Menengah', question: 'Skeleton yang baik seharusnya…', options: ['Berbeda total dari konten asli', 'Mengikuti struktur konten yang akan muncul', 'Berkedip secepat mungkin', 'Selalu tampil minimal 10 detik'], correctIdx: 1, explanation: 'Kemiripan bentuk mengurangi layout shift dan menyiapkan ekspektasi pengguna.' },
  { id: 19, moduleId: 'color-system', difficulty: 'Dasar', question: 'Nama design token yang paling tahan terhadap perubahan tema adalah…', options: ['green-500', 'warna-brand-hijau', 'color-primary', 'hex-0b6e3e'], correctIdx: 2, explanation: 'Nama semantik berdasarkan peran tetap relevan ketika nilai warnanya berubah.' },
  { id: 20, moduleId: 'typography', difficulty: 'Dasar', question: 'Cara paling efektif mengurangi kebisingan tipografi adalah…', options: ['Semua teks dibuat bold', 'Membatasi ukuran dan bobot yang digunakan', 'Menambah tiga font', 'Memakai uppercase di semua judul'], correctIdx: 1, explanation: 'Skala dan bobot terbatas membuat hierarki lebih jelas dan konsisten.' },
  { id: 21, moduleId: 'spacing', difficulty: 'Dasar', question: 'Jarak yang lebih dekat secara visual biasanya menandakan…', options: ['Elemen tidak berkaitan', 'Elemen saling berkaitan', 'Elemen sedang error', 'Elemen dapat diseret'], correctIdx: 1, explanation: 'Prinsip proximity menghubungkan elemen melalui jarak.' },
  { id: 22, moduleId: 'responsive', difficulty: 'Menengah', question: 'Deklarasi Grid mana yang membantu mencegah overflow pada kolom cair?', code: 'grid-template-columns: 320px minmax(0, 1fr);', options: ['auto auto', '320px minmax(0, 1fr)', '100vw 100vw', 'repeat(10, 1fr)'], correctIdx: 1, explanation: 'minmax(0, 1fr) mengizinkan kolom menyusut di bawah ukuran minimum intrinsik kontennya.' },
  { id: 23, moduleId: 'semantic-html', difficulty: 'Dasar', question: 'Untuk navigasi ke halaman lain, elemen yang benar adalah…', options: ['button', 'div onclick', 'a dengan href', 'span'], correctIdx: 2, explanation: 'Anchor dengan href memiliki semantik, keyboard, dan perilaku navigasi native.' },
  { id: 24, moduleId: 'flexbox', difficulty: 'Menengah', question: 'Properti yang memberi jarak konsisten antar flex item adalah…', options: ['gap', 'text-indent', 'outline', 'z-index'], correctIdx: 0, explanation: 'Gap membuat jarak antaritem tanpa perlu mengelola margin sisi demi sisi.' },
  { id: 25, moduleId: 'css-grid', difficulty: 'Menengah', question: 'Pola yang cocok untuk grid card responsif tanpa banyak breakpoint adalah…', options: ['repeat(auto-fit, minmax(240px, 1fr))', 'width: 1200px', 'position: absolute', 'white-space: nowrap'], correctIdx: 0, explanation: 'Auto-fit dan minmax membentuk jumlah kolom berdasarkan ruang yang tersedia.' },
  { id: 26, moduleId: 'forms', difficulty: 'Menengah', question: 'Pesan error form yang paling membantu adalah…', options: ['Salah', 'Input invalid', 'Nomor telepon harus berisi 10–13 digit', 'Coba lagi'], correctIdx: 2, explanation: 'Pesan spesifik menjelaskan masalah dan cara memperbaikinya.' },
  { id: 27, moduleId: 'focus-keyboard', difficulty: 'Menengah', question: 'Praktik tabindex yang disarankan adalah…', options: ['Gunakan nilai positif untuk semua tombol', 'Hindari tabindex positif', 'Hapus semua focus ring', 'Gunakan tabindex=99 untuk dialog'], correctIdx: 1, explanation: 'Urutan fokus idealnya mengikuti DOM; tabindex positif membuat urutan sulit diprediksi.' },
  { id: 28, moduleId: 'next-components', difficulty: 'Menengah', question: 'Kapan prop children sangat berguna?', options: ['Untuk menyimpan password', 'Untuk membuat slot konten yang fleksibel', 'Untuk mengakses database', 'Untuk mengganti CSS'], correctIdx: 1, explanation: 'Children memungkinkan komponen membungkus konten yang bervariasi melalui komposisi.' },
  { id: 29, moduleId: 'server-client', difficulty: 'Lanjutan', question: 'Dalam App Router, titik awal yang baik adalah…', options: ['Jadikan semua Client Component', 'Mulai sebagai Server Component lalu tambah client boundary seperlunya', 'Hindari server', 'Fetch hanya di useEffect'], correctIdx: 1, explanation: 'Server Components mengurangi JavaScript klien; interaktivitas dapat diisolasi pada client boundary kecil.' },
  { id: 30, moduleId: 'next-routing', difficulty: 'Menengah', question: 'Komponen Next.js untuk navigasi internal adalah…', options: ['Image', 'Script', 'Link', 'Head'], correctIdx: 2, explanation: 'Link menyediakan navigasi internal yang terintegrasi dengan router.' },
  { id: 31, moduleId: 'loading-errors', difficulty: 'Menengah', question: 'Pernyataan yang benar tentang empty dan error state adalah…', options: ['Keduanya selalu sama', 'Empty berarti data valid tetapi kosong; error berarti proses gagal', 'Empty harus memakai warna merah', 'Error tidak perlu aksi'], correctIdx: 1, explanation: 'Keduanya membutuhkan pesan dan tindak lanjut yang berbeda.' },
  { id: 32, moduleId: 'server-client', difficulty: 'Lanjutan', question: 'Directive yang menandai Client Component adalah…', code: "'use client'", options: ["'use browser'", "'use client'", "'client only'", "'use effect'"], correctIdx: 1, explanation: 'Directive use client mendefinisikan batas modul yang berjalan di klien.' },
  { id: 33, moduleId: 'alert', difficulty: 'Dasar', question: 'Kapan role="alert" paling tepat digunakan?', options: ['Untuk semua teks bantuan', 'Untuk pesan mendesak yang perlu segera diumumkan', 'Untuk judul halaman', 'Untuk breadcrumb'], correctIdx: 1, explanation: 'Role alert bersifat asertif dan sebaiknya dibatasi pada pembaruan yang benar-benar mendesak.' },
  { id: 34, moduleId: 'avatar-badge', difficulty: 'Dasar', question: 'Fallback avatar yang baik saat foto pengguna tidak tersedia adalah…', options: ['Area kosong', 'Inisial nama yang jelas', 'Ikon error', 'Gambar acak'], correctIdx: 1, explanation: 'Inisial mempertahankan identitas tanpa bergantung pada gambar yang gagal dimuat.' },
  { id: 35, moduleId: 'icon-button', difficulty: 'Dasar', question: 'Apa yang wajib dimiliki tombol yang hanya berisi ikon?', options: ['Font lebih besar', 'aria-label yang menjelaskan aksi', 'Dua border', 'Animasi terus-menerus'], correctIdx: 1, explanation: 'Accessible name seperti aria-label membuat fungsi tombol terbaca oleh teknologi asistif.' },
  { id: 36, moduleId: 'chips', difficulty: 'Dasar', question: 'Filter chip yang aktif sebaiknya…', options: ['Terlihat sama dengan chip lain', 'Memiliki selected state yang jelas', 'Tidak bisa dinonaktifkan', 'Selalu memakai ikon'], correctIdx: 1, explanation: 'Selected state membantu pengguna memahami filter yang sedang diterapkan.' },
  { id: 37, moduleId: 'list', difficulty: 'Dasar', question: 'Elemen HTML yang tepat untuk kumpulan item tanpa urutan khusus adalah…', options: ['ul', 'table', 'dialog', 'form'], correctIdx: 0, explanation: 'Unordered list memberi struktur semantik pada kumpulan item yang tidak berurutan.' },
  { id: 38, moduleId: 'divider', difficulty: 'Dasar', question: 'Sebelum menambah divider, solusi visual yang sebaiknya dicoba adalah…', options: ['Tambah bayangan', 'Atur spacing antar kelompok', 'Gunakan warna merah', 'Buat teks uppercase'], correctIdx: 1, explanation: 'Spacing sering sudah cukup menjelaskan pengelompokan dengan tampilan yang lebih tenang.' },
  { id: 39, moduleId: 'search-bar', difficulty: 'Dasar', question: 'Landmark yang tepat untuk form pencarian adalah…', options: ['role="search"', 'role="dialog"', 'role="grid"', 'role="status"'], correctIdx: 0, explanation: 'Role search membantu pengguna teknologi asistif menemukan area pencarian dengan cepat.' },
  { id: 40, moduleId: 'slider', difficulty: 'Menengah', question: 'Untuk nilai yang harus dimasukkan sangat presisi, kontrol yang biasanya lebih tepat daripada slider adalah…', options: ['Number input', 'Tooltip', 'Snackbar', 'Avatar'], correctIdx: 0, explanation: 'Number input memungkinkan pengguna mengetik nilai presisi, sementara slider lebih cocok untuk penyesuaian relatif.' },
  { id: 41, moduleId: 'data-table', difficulty: 'Menengah', question: 'Atribut pada th yang menjelaskan header kolom adalah…', options: ['scope="col"', 'role="button"', 'aria-live="true"', 'tabindex="4"'], correctIdx: 0, explanation: 'scope="col" menghubungkan header dengan sel pada kolom tersebut.' },
  { id: 42, moduleId: 'menu', difficulty: 'Menengah', question: 'Perbedaan utama menu dan select adalah…', options: ['Menu berisi aksi; select memilih nilai form', 'Select hanya untuk mobile', 'Menu tidak punya trigger', 'Keduanya selalu sama'], correctIdx: 0, explanation: 'Menu menjalankan aksi atau navigasi, sedangkan select menetapkan sebuah nilai input.' },
  { id: 43, moduleId: 'drawer-sheet', difficulty: 'Menengah', question: 'Untuk modal sheet, fokus keyboard seharusnya…', options: ['Bebas pindah ke konten di belakang', 'Tetap berada di dalam sheet sampai ditutup', 'Masuk ke address bar', 'Dihilangkan'], correctIdx: 1, explanation: 'Focus trap menjaga konteks modal dan mencegah pengguna berinteraksi dengan lapisan di belakang.' },
  { id: 44, moduleId: 'empty-state', difficulty: 'Dasar', question: 'Empty state berbeda dari error state karena…', options: ['Empty state berarti data valid tetapi belum ada', 'Empty state selalu berwarna merah', 'Error state tidak perlu pesan', 'Keduanya identik'], correctIdx: 0, explanation: 'Empty state adalah kondisi valid tanpa isi, bukan kegagalan proses.' },
  { id: 45, moduleId: 'file-upload', difficulty: 'Menengah', question: 'Mengapa drag and drop tidak boleh menjadi satu-satunya cara upload?', options: ['Karena terlalu cepat', 'Tidak semua pengguna dapat melakukan drag and drop', 'Karena file input dilarang', 'Karena hanya mendukung gambar'], correctIdx: 1, explanation: 'Input file native memberi jalur yang dapat digunakan keyboard, sentuhan, dan lebih banyak teknologi asistif.' },
  { id: 46, moduleId: 'date-picker', difficulty: 'Menengah', question: 'Untuk pengguna yang sudah mengetahui tanggal persis, pola yang paling efisien adalah…', options: ['Carousel', 'Input tanggal yang bisa diketik', 'Tooltip', 'Snackbar'], correctIdx: 1, explanation: 'Input yang dapat diketik sering lebih cepat daripada menavigasi kalender visual.' },
  { id: 47, moduleId: 'carousel', difficulty: 'Menengah', question: 'Praktik carousel yang perlu dihindari adalah…', options: ['Memberi nama tombol next', 'Auto-play tanpa kontrol jeda', 'Mendukung keyboard', 'Menampilkan posisi slide'], correctIdx: 1, explanation: 'Auto-play tanpa kontrol mengganggu pembacaan dan dapat menjadi hambatan aksesibilitas.' },
]

export const getModuleById = (id) => LEARNING_MODULES.find((module) => module.id === id)
