import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function DetailReact() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState([
    { text: 'Pahami useMemo dan kapan tidak menggunakannya.', checked: true },
    { text: 'Strategi memecah bundel (Code Splitting).', checked: false },
    { text: 'Mencegah render ulang yang tidak perlu.', checked: false },
  ])
  const [showChallenge, setShowChallenge] = useState(false)
  const [challengeCode, setChallengeCode] = useState('')
  const [challengeResult, setChallengeResult] = useState(null)
  const [challengeCompleted, setChallengeCompleted] = useState(false)

  const toggleCheck = (index) => {
    const updated = [...checklist]
    updated[index].checked = !updated[index].checked
    setChecklist(updated)
  }

  const completedCount = checklist.filter(c => c.checked).length
  const progressPercentage = Math.round(((completedCount + (challengeCompleted ? 1 : 0)) / (checklist.length + 1)) * 100)

  const submitChallenge = () => {
    const normalizedCode = challengeCode.toLowerCase()
    const isValid = normalizedCode.includes('cloneelement') && normalizedCode.includes('setactive')

    setChallengeResult(isValid ? 'success' : 'error')
    if (isValid) setChallengeCompleted(true)
  }

  return (
    <div className="flex-1 w-full max-w-[960px] mx-auto px-5 md:px-8 flex flex-col gap-6 pt-4 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-on-surface-variant">
        <NavLink to="/" className="flex items-center gap-1.5 text-[14px] font-bold hover:text-primary transition-colors">
          <Icon name="arrow_back" size={18} />
          Kembali ke Kursus Saya
        </NavLink>
      </div>

      {/* Header */}
      <section className="flex flex-col gap-3">
        <h1 className="text-[24px] md:text-[32px] leading-[1.15] tracking-tight font-extrabold text-on-background">
          Arsitektur React Lanjutan
        </h1>
        <p className="text-[16px] leading-[1.6] font-medium text-on-surface-variant max-w-2xl">
          Kuasai pola desain tingkat lanjut untuk membangun aplikasi React yang lebih terukur, dapat dipelihara, dan berkinerja tinggi.
        </p>

        {/* Progress */}
        <div className="flex flex-col gap-1.5 max-w-sm mt-1">
          <div className="flex justify-between text-[13px] font-bold text-on-surface-variant">
            <span>Progres Modul</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2.5 w-full bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Card 1: Compound Components */}
        <div className="bg-surface-container-lowest rounded-2xl card-tactile p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shrink-0 border border-on-secondary-fixed-variant/30">
              <span className="text-[15px] font-bold">1</span>
            </div>
            <h2 className="text-[16px] font-bold text-on-background">Komponen Gabungan</h2>
          </div>
          <p className="text-[14px] leading-[1.6] font-medium text-on-surface">
            Pola <em>Compound Components</em> memungkinkan beberapa komponen bekerja sama dan berbagi <em>state</em> secara implisit.
          </p>
          <div className="bg-inverse-surface rounded-xl p-4 overflow-hidden">
            <pre className="font-mono text-[13px] leading-[1.6] text-inverse-on-surface whitespace-pre-wrap break-all"><code>{`<Menu>
  <Menu.Toggle />
  <Menu.List>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item>Hapus</Menu.Item>
  </Menu.List>
</Menu>`}</code></pre>
          </div>
        </div>

        {/* Card 2: Performance */}
        <div className="bg-surface-container-lowest rounded-2xl card-tactile p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shrink-0 border border-on-secondary-fixed-variant/30">
              <span className="text-[15px] font-bold">2</span>
            </div>
            <h2 className="text-[16px] font-bold text-on-background">Rekayasa Performa</h2>
          </div>
          <p className="text-[14px] leading-[1.6] font-medium text-on-surface">
            Optimalkan aplikasi Anda dengan memahami bagaimana React menangani render dan kapan harus mengintervensi.
          </p>
          <ul className="flex flex-col gap-2 mt-auto">
            {checklist.map((item, i) => (
              <li
                key={i}
                onClick={() => toggleCheck(i)}
                className="flex items-start gap-2.5 cursor-pointer select-none p-2 rounded-xl hover:bg-surface-container-low transition-colors"
              >
                <span className={`mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border ${item.checked ? 'border-primary bg-primary text-on-primary' : 'border-on-surface-variant text-on-surface-variant'}`}>
                  {item.checked && <Icon name="check" size={12} />}
                </span>
                <span className={`text-[13px] leading-[1.5] font-medium text-on-surface ${item.checked ? 'line-through opacity-60' : ''}`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Challenge Banner */}
      <section>
        <div className="bg-tertiary-fixed/30 rounded-2xl border border-tertiary-fixed/50 p-5 flex flex-col md:flex-row gap-4 items-center">
          <div className="shrink-0">
            <Icon name="stars" size={40} className="text-on-tertiary-container" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-[20px] md:text-[22px] leading-[1.2] font-extrabold text-on-tertiary-container">Tantangan Pro</h3>
            <p className="text-[14px] leading-[1.6] font-medium text-on-tertiary-container/80 mt-1">
              Uji pemahaman Anda! Refaktor aplikasi daftar tugas menggunakan pola Compound Components.
            </p>
          </div>
          <button
            onClick={() => {
              setChallengeResult(null)
              setShowChallenge(true)
            }}
            className="bg-on-tertiary-container text-tertiary-fixed text-[14px] font-bold px-5 py-2.5 rounded-xl border-b-3 border-on-background/50 hover:translate-y-[1px] active:translate-y-[2px] transition-all shrink-0"
          >
            {challengeCompleted ? 'Ulangi Tantangan' : 'Mulai Tantangan'}
          </button>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-surface-variant/60">
        <button
          onClick={() => navigate('/detail-uiux')}
          className="text-[14px] font-bold px-5 py-2.5 rounded-xl text-on-surface-variant border border-surface-variant/60 hover:bg-surface-container-low transition-colors"
        >
          ← Modul Sebelumnya
        </button>
        <button
          onClick={() => navigate('/belajar')}
          className="bg-primary text-on-primary text-[14px] font-bold px-5 py-2.5 rounded-xl border-b-3 border-on-primary-fixed-variant hover:translate-y-[1px] active:translate-y-[2px] transition-all flex items-center gap-1.5"
        >
          Lanjutkan
          <Icon name="arrow_forward" size={18} />
        </button>
      </div>

      {/* Challenge Modal */}
      {showChallenge && (
        <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div role="dialog" aria-modal="true" aria-labelledby="challenge-title" className="bg-surface max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-surface-variant/60 p-6 flex flex-col gap-4 shadow-xl">
            <h3 id="challenge-title" className="text-[18px] font-bold text-on-surface">Tantangan Refaktor</h3>
            <p className="text-[14px] leading-[1.6] font-medium text-on-surface-variant">
              Lengkapi fungsi agar setiap anak menerima <code className="bg-surface-container px-1.5 py-0.5 rounded text-[13px] font-mono">active</code> dan <code className="bg-surface-container px-1.5 py-0.5 rounded text-[13px] font-mono">setActive</code>.
            </p>
            <label htmlFor="challenge-code" className="text-xs font-extrabold uppercase tracking-[0.16em] text-on-surface-variant">Editor kode</label>
            <textarea
              id="challenge-code"
              value={challengeCode}
              onChange={(event) => {
                setChallengeCode(event.target.value)
                setChallengeResult(null)
              }}
              spellCheck="false"
              placeholder={`const Tabs = ({ children }) => {\n  const [active, setActive] = useState(0)\n  // tulis solusi di sini\n}`}
              className="min-h-52 w-full resize-y rounded-xl border border-white/10 bg-inverse-surface p-4 font-mono text-[12px] leading-[1.7] text-inverse-on-surface placeholder:text-inverse-on-surface/45"
            />

            {challengeResult && (
              <div role="status" aria-live="polite" className={`rounded-xl border px-4 py-3 text-sm font-semibold ${challengeResult === 'success' ? 'border-primary/30 bg-primary/10 text-primary' : 'border-error/30 bg-error-container text-on-error-container'}`}>
                {challengeResult === 'success'
                  ? 'Mantap! Props berhasil diteruskan ke setiap child.'
                  : 'Belum tepat. Gunakan React.cloneElement dan teruskan setActive ke child.'}
              </div>
            )}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowChallenge(false)}
                className="text-[14px] font-bold px-4 py-2 border border-surface-variant/60 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={challengeResult === 'success' ? () => setShowChallenge(false) : submitChallenge}
                disabled={!challengeCode.trim()}
                className="bg-primary text-on-primary text-[14px] font-bold px-4 py-2 rounded-xl border-b-3 border-on-primary-fixed-variant hover:translate-y-[1px] active:translate-y-[2px] transition-all"
              >
                {challengeResult === 'success' ? 'Selesai' : 'Periksa Kode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
