import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

const options = [
  { value: '1', title: 'Untuk nilai state sederhana', desc: null },
  { value: '2', title: 'State kompleks yang saling terkait', desc: 'Atau ketika state berikutnya bergantung pada nilai sebelumnya.' },
  { value: '3', title: 'Menggantikan Context API', desc: null },
]

export default function MobileBelajar() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [hearts, setHearts] = useState(4)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleCheck = () => {
    if (selected === '2') {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setHearts((prev) => Math.max(0, prev - 1))
    }
    setChecked(true)
  }

  const handleContinue = () => {
    if (!isCorrect) {
      setSelected(null)
      setChecked(false)
      setIsCorrect(null)
      return
    }

    navigate('/dashboard')
  }

  const progressPercentage = checked ? (isCorrect ? 100 : 70) : 45

  return (
    <div className="min-h-screen bg-surface text-on-background font-sans antialiased pb-28">
      <div className="mx-auto max-w-3xl px-5 py-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            aria-label="Tutup"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-variant bg-white text-on-surface-variant transition hover:bg-surface-container-low"
          >
            <Icon name="close" size={22} />
          </button>
          <div className="flex-1 bg-surface-container-highest rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-variant bg-white px-4 py-2 text-sm font-semibold text-on-surface">
            <Icon name="favorite" size={20} className="text-error" />
            {hearts}
          </div>
        </div>

        <div className="rounded-[32px] bg-white border border-surface-variant p-6 shadow-sm">
          <div className="mx-auto w-full max-w-xl space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">Tantangan interaktif</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-on-background leading-tight">
              Kapan sebaiknya menggunakan <span className="font-mono text-primary">useReducer</span>?
            </h1>
            <p className="text-sm leading-7 text-on-surface-variant">
              Pilih jawaban yang paling tepat untuk mengelola state di React ketika logika berubah kompleks.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {options.map((opt) => (
              <label
                key={opt.value}
                className={`block rounded-3xl border p-5 transition ${
                  selected === opt.value && checked
                    ? isCorrect
                      ? 'border-primary bg-primary/10'
                      : 'border-error bg-error-container/70'
                    : selected === opt.value
                      ? 'border-primary bg-primary/10'
                    : 'border-surface-variant bg-surface-container-lowest hover:border-primary'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={opt.value}
                  disabled={checked}
                  checked={selected === opt.value}
                  onChange={() => {
                    setSelected(opt.value)
                    setChecked(false)
                  }}
                  className="sr-only"
                />
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center border-2 ${
                    selected === opt.value && checked && !isCorrect
                      ? 'border-error bg-error text-white'
                      : selected === opt.value
                        ? 'border-primary bg-primary text-white'
                        : 'border-surface-variant text-transparent'
                  }`}>
                    <Icon name="check" size={17} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-on-surface">{opt.title}</p>
                    {opt.desc && <p className="mt-2 text-sm leading-6 text-on-surface-variant">{opt.desc}</p>}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {checked && (
            <div role="status" aria-live="polite" className={`mt-6 rounded-3xl border p-5 ${isCorrect ? 'border-primary/40 bg-primary/10 text-primary' : 'border-error/40 bg-error-container text-error'}`}>
              <p className="text-sm font-semibold">{isCorrect ? 'Benar!' : 'Jawaban belum tepat.'}</p>
              <p className="mt-2 text-sm text-on-surface-variant">
                {isCorrect ? 'State kompleks yang saling terkait lebih cocok dikelola dengan useReducer karena logika update menjadi lebih terstruktur.' : 'Coba lagi. useReducer paling tepat untuk state kompleks yang saling terkait.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-surface-variant bg-white/95 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={checked ? handleContinue : handleCheck}
            disabled={!selected}
            className={`w-full rounded-3xl py-4 text-base font-bold transition ${
              !selected
                ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
                : checked
                  ? isCorrect
                  ? 'bg-primary text-on-primary hover:bg-primary/90'
                    : 'bg-error text-on-error hover:bg-error/90'
                  : 'bg-primary text-on-primary hover:bg-primary/90'
            }`}
          >
            {checked ? (isCorrect ? 'Lanjut ke Dashboard' : 'Coba Lagi') : 'Cek Jawaban'}
          </button>
        </div>
      </div>
    </div>
  )
}
