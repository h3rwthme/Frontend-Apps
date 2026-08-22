import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

const achievements = [
  {
    title: 'State Master',
    desc: 'Menuntaskan modul state management dengan baik.',
    icon: 'military_tech',
    unlocked: true,
    progress: 100,
    accent: 'bg-tertiary-fixed/40 text-on-tertiary-container',
  },
  {
    title: 'UI Explorer',
    desc: 'Menyelesaikan tantangan tata letak UI/UX.',
    icon: 'auto_awesome',
    unlocked: true,
    progress: 100,
    accent: 'bg-secondary-fixed text-on-secondary-fixed',
  },
  {
    title: 'Fast Learner',
    desc: 'Menyelesaikan 3 latihan beruntun dalam sehari.',
    icon: 'flash_on',
    unlocked: false,
    progress: 70,
    accent: 'bg-surface-container-low text-on-surface-variant',
  },
]

const weeklyGoals = [
  { label: 'Jam belajar', value: '6/8 jam' },
  { label: 'Modul selesai', value: '2/3 modul' },
  { label: 'Tantangan', value: '4/5' },
]

export default function Pencapaian() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 w-full max-w-[960px] mx-auto px-5 md:px-8 flex flex-col gap-6 pt-4 pb-24 md:pb-8">
      <section className="rounded-3xl bg-surface-container-lowest border border-surface-variant/70 p-6 md:p-7 card-tactile">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">Pencapaianmu</p>
            <h1 className="text-[28px] md:text-[34px] font-extrabold text-on-surface mt-2">Perjalananmu makin cerah</h1>
            <p className="text-[15px] md:text-[16px] leading-[1.6] font-medium text-on-surface-variant mt-2 max-w-2xl">
              Kamu sudah konsisten belajar dan mengumpulkan pencapaian. Lanjutkan, target minggu ini sudah dekat.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 bg-primary text-on-primary rounded-2xl text-[15px] font-bold btn-tactile border-b-4 border-on-primary-fixed-variant"
          >
            Lihat Dashboard
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-3xl bg-secondary-container p-6 text-on-secondary-container border-b-4 border-on-secondary-fixed-variant">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest/90 flex items-center justify-center text-secondary text-[24px]">
              <Icon name="emoji_events" size={24} />
            </div>
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em]">Streak aktif</p>
              <h2 className="text-[24px] font-extrabold">7 Hari Berturut-turut</h2>
            </div>
          </div>
          <p className="text-[14px] leading-[1.6] font-medium opacity-95">
            Kamu menjaga konsistensi belajar. Semangat! Kesabaran dan latihan kecil setiap hari membawa hasil besar.
          </p>
        </div>

        <div className="rounded-3xl bg-surface-container-lowest border border-surface-variant/70 p-6 card-tactile">
          <h3 className="text-[18px] font-bold text-on-surface">Target minggu ini</h3>
          <div className="mt-4 space-y-3">
            {weeklyGoals.map((goal) => (
              <div key={goal.label} className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                <span className="text-[14px] font-bold text-on-surface-variant">{goal.label}</span>
                <span className="text-[14px] font-extrabold text-primary">{goal.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((item) => (
          <article key={item.title} className="rounded-3xl border border-surface-variant/70 bg-surface-container-lowest p-5 flex flex-col gap-4 card-tactile">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.accent}`}>
              <Icon name={item.icon} size={24} />
            </div>
            <div>
              <h3 className="text-[18px] font-extrabold text-on-surface">{item.title}</h3>
              <p className="text-[14px] leading-[1.6] font-medium text-on-surface-variant mt-1">{item.desc}</p>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-[13px] font-bold text-on-surface-variant mb-2">
                <span>{item.unlocked ? 'Terbuka' : 'Dalam progres'}</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
