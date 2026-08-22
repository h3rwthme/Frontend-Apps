import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function DetailUIUX() {
  const navigate = useNavigate()
  const [hearts, setHearts] = useState(4)
  const [tasks, setTasks] = useState([
    { text: 'Membuat grid tata letak yang responsif.', checked: true },
    { text: 'Menambahkan jarak dan ruang kosong antar elemen.', checked: false },
    { text: 'Memilih tipografi yang mudah dibaca.', checked: false },
  ])

  const toggleTask = (index) => {
    const updated = [...tasks]
    updated[index].checked = !updated[index].checked
    setTasks(updated)
  }

  const completedCount = tasks.filter((task) => task.checked).length
  const progressPercentage = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="flex-1 bg-surface text-on-background">
      <div className="mx-auto max-w-[1180px] px-5 py-6 md:px-8 md:py-8">
        <header className="mb-8 rounded-[32px] border border-surface-variant bg-white/90 p-5 shadow-sm backdrop-blur-md md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              onClick={() => navigate('/')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-variant bg-surface text-on-surface-variant transition hover:bg-surface-container-low"
            >
              <Icon name="arrow_back" size={24} />
            </button>
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">Unit 3</p>
              <h1 className="mt-3 text-3xl font-extrabold text-on-surface md:text-4xl">Tata Letak UI/UX</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
                Pelajari cara membuat antarmuka yang rapi, mudah dibaca, dan nyaman digunakan, lengkap dengan prinsip hierarki visual dan ruang kosong.
              </p>
            </div>
            <button
              onClick={() => setHearts((prev) => Math.min(5, prev + 1))}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-surface-variant bg-surface px-4 text-on-surface-variant transition hover:bg-surface-container-low"
            >
              <Icon name="favorite" size={23} className="text-error" />
              <span className="font-semibold">{hearts}</span>
            </button>
          </div>

          <div className="mt-6 rounded-full bg-surface-container-high overflow-hidden border border-surface-variant">
            <div className="h-3 rounded-full bg-primary transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] bg-white border border-surface-variant p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary/90">Ringkasan modul</p>
                <h2 className="mt-4 text-2xl font-extrabold text-on-surface">Apa yang akan kamu pelajari?</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  Pelajari prinsip desain UI/UX penting—mulai dari layout, ruang kosong, hingga tipografi—untuk membuat antarmuka lebih nyaman dan menarik.
                </p>
              </div>
              <div className="flex h-[260px] items-center justify-center overflow-hidden rounded-[32px] border border-surface-variant bg-secondary-fixed/50 p-5 md:h-[320px]">
                <div className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-secondary/20 bg-white shadow-xl" aria-label="Contoh susunan antarmuka yang rapi" role="img">
                  <div className="flex h-10 items-center gap-2 border-b border-surface-variant px-3">
                    <span className="h-2 w-2 rounded-full bg-error" />
                    <span className="h-2 w-2 rounded-full bg-tertiary-container" />
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="grid grid-cols-[54px_1fr]">
                    <div className="space-y-3 bg-inverse-surface p-3">
                      <span className="block h-5 rounded-md bg-primary-fixed-dim" />
                      <span className="block h-2 rounded-full bg-white/20" />
                      <span className="block h-2 rounded-full bg-white/20" />
                      <span className="block h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="space-y-4 p-4">
                      <div className="h-4 w-3/5 rounded-full bg-on-surface" />
                      <div className="h-2 w-full rounded-full bg-surface-variant" />
                      <div className="h-2 w-4/5 rounded-full bg-surface-variant" />
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <span className="h-16 rounded-xl bg-primary/15" />
                        <span className="h-16 rounded-xl bg-secondary/15" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-surface-container-lowest border border-surface-variant p-6 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface">Detail Prinsip</h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'Hierarki Visual',
                  desc: 'Susun konten agar pengguna langsung fokus ke elemen paling penting dulu.',
                },
                {
                  title: 'Ruang Kosong',
                  desc: 'Beri jarak supaya tampilan tidak penuh dan informasi lebih mudah dipahami.',
                },
                {
                  title: 'Tipografi',
                  desc: 'Gunakan ukuran dan jarak huruf yang konsisten agar teks terasa nyaman dibaca.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[28px] border border-surface-variant bg-white p-5">
                  <p className="text-sm font-semibold text-primary">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[32px] bg-white border border-surface-variant p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">Tugas Modul</p>
              <h2 className="mt-3 text-xl font-extrabold text-on-surface">Checklist Tugas</h2>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{progressPercentage}% selesai</span>
          </div>

          <ul className="mt-6 space-y-3">
            {tasks.map((task, idx) => (
              <li key={task.text}>
                <button
                  type="button"
                  onClick={() => toggleTask(idx)}
                  aria-pressed={task.checked}
                  className="flex w-full cursor-pointer items-center gap-4 rounded-3xl border border-surface-variant bg-surface-container-lowest p-4 text-left transition hover:border-primary/30"
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-lg ${task.checked ? 'border-primary bg-primary text-white' : 'border-surface-variant text-on-surface-variant'}`}>
                    {task.checked ? '✓' : idx + 1}
                  </span>
                  <span className={`text-sm leading-7 ${task.checked ? 'text-on-surface line-through opacity-70' : 'text-on-surface-variant'}`}>
                    {task.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 flex flex-col items-stretch justify-between gap-4 rounded-[32px] border border-surface-variant bg-inverse-surface p-5 text-inverse-on-surface sm:flex-row sm:items-center md:p-6">
          <div>
            <p className="text-sm font-extrabold">Siap mencoba langsung?</p>
            <p className="mt-1 text-sm text-inverse-on-surface/70">
              {completedCount} dari {tasks.length} tugas persiapan selesai
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold sm:block">
            {completedCount} dari {tasks.length} tugas selesai
            </div>
            <button
              type="button"
              onClick={() => navigate('/belajar')}
              className="min-w-[160px] flex-1 rounded-2xl border-b-4 border-on-primary-fixed-variant bg-primary px-6 py-3 text-sm font-bold text-on-primary btn-tactile sm:flex-none"
            >
              Mulai Latihan
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
