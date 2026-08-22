import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-5 py-12">
      <section className="w-full max-w-xl rounded-[32px] border border-surface-variant bg-surface-container-lowest p-8 text-center card-tactile md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary-fixed text-secondary">
          <Icon name="explore_off" size={32} />
        </div>
        <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-on-surface">Halaman tidak ditemukan</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-on-surface-variant">
          Sepertinya kamu mengambil jalur belajar yang belum tersedia. Yuk, kembali ke halaman utama.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-7 rounded-2xl border-b-4 border-on-primary-fixed-variant bg-primary px-6 py-3 font-bold text-on-primary btn-tactile"
        >
          Kembali ke Beranda
        </button>
      </section>
    </div>
  )
}
