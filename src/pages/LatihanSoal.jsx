import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { LEARNING_MODULES, QUIZ_QUESTIONS } from '../data/learningContent'

const DIFFICULTIES = ['Semua level', 'Dasar', 'Menengah', 'Lanjutan']

export default function LatihanSoal() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const requestedTopic = searchParams.get('topik')
  const initialTopic = LEARNING_MODULES.some((module) => module.id === requestedTopic) ? requestedTopic : 'all'
  const [topic, setTopic] = useState(initialTopic)
  const [difficulty, setDifficulty] = useState('Semua level')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState([])
  const [complete, setComplete] = useState(false)

  const questions = useMemo(() => QUIZ_QUESTIONS.filter((question) => {
    const matchesTopic = topic === 'all' || question.moduleId === topic
    const matchesDifficulty = difficulty === 'Semua level' || question.difficulty === difficulty
    return matchesTopic && matchesDifficulty
  }), [difficulty, topic])

  const currentQuestion = questions[questionIndex]
  const correctCount = answers.filter((answer) => answer.correct).length
  const score = answers.length ? Math.round((correctCount / answers.length) * 100) : 0

  const resetQuiz = () => {
    setQuestionIndex(0)
    setSelectedOption(null)
    setSubmitted(false)
    setAnswers([])
    setComplete(false)
  }

  useEffect(() => {
    resetQuiz()
  }, [topic, difficulty])

  const submitAnswer = () => {
    if (selectedOption === null || submitted || !currentQuestion) return
    setSubmitted(true)
    setAnswers((current) => [...current, {
      questionId: currentQuestion.id,
      selectedOption,
      correct: selectedOption === currentQuestion.correctIdx,
    }])
  }

  const nextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      setComplete(true)
      return
    }
    setQuestionIndex((index) => index + 1)
    setSelectedOption(null)
    setSubmitted(false)
  }

  const jumpToQuestion = (index) => {
    if (index > answers.length) return
    setQuestionIndex(index)
    const answer = answers[index]
    setSelectedOption(answer?.selectedOption ?? null)
    setSubmitted(Boolean(answer))
    setComplete(false)
  }

  if (complete) {
    const wrongAnswers = answers.filter((answer) => !answer.correct)
    return (
      <div className="page-shell max-w-[1040px]">
        <section className="result-card">
          <span className="result-card__icon"><Icon name={score >= 75 ? 'emoji_events' : 'menu_book'} size={30} /></span>
          <p className="section-kicker mx-auto w-fit">Sesi selesai</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-on-surface">{score >= 75 ? 'Pemahamanmu sudah kuat.' : 'Sedikit review akan membantu.'}</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">Kamu menjawab {correctCount} dari {questions.length} soal dengan benar. Nilai sesi ini {score}%.</p>
          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-3">
            <div><span>Nilai</span><strong>{score}%</strong></div><div><span>Benar</span><strong>{correctCount}</strong></div><div><span>Perlu review</span><strong>{wrongAnswers.length}</strong></div>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={resetQuiz} className="button-primary"><Icon name="restart_alt" size={18} />Ulangi sesi</button>
            <button type="button" onClick={() => navigate('/modul')} className="button-secondary">Kembali belajar</button>
          </div>
        </section>

        {wrongAnswers.length > 0 && (
          <section className="mt-6 rounded-3xl border border-surface-variant bg-white p-5 sm:p-6">
            <div className="mb-5"><p className="text-xs font-semibold text-error">Review jawaban</p><h2 className="mt-1 text-xl font-semibold text-on-surface">Materi yang perlu diulang</h2></div>
            <div className="grid gap-3">
              {wrongAnswers.map((answer) => {
                const question = questions.find((item) => item.id === answer.questionId)
                const module = LEARNING_MODULES.find((item) => item.id === question?.moduleId)
                return (
                  <article key={answer.questionId} className="rounded-2xl bg-surface-container-low p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold text-error">{module?.title}</p><h3 className="mt-1 text-sm font-semibold text-on-surface">{question?.question}</h3><p className="mt-2 text-sm leading-6 text-on-surface-variant">{question?.explanation}</p></div><button type="button" onClick={() => navigate(`/modul`)} className="shrink-0 text-sm font-semibold text-primary">Buka materi →</button></div>
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="page-shell max-w-[1120px]">
      <header className="quiz-header">
        <div>
          <span className="section-kicker"><Icon name="quiz" size={16} />Latihan terpisah dari materi</span>
          <h1 className="page-title page-title--compact">Uji pemahaman, satu konsep sekali.</h1>
          <p className="page-lead">{QUIZ_QUESTIONS.length} soal UI/UX, HTML, CSS, aksesibilitas, dan Next.js dengan pembahasan langsung.</p>
        </div>
        <button type="button" onClick={() => navigate('/modul')} className="button-secondary shrink-0"><Icon name="menu_book" size={17} />Buka halaman belajar</button>
      </header>

      <section className="quiz-filters" aria-label="Pengaturan soal">
        <label><span>Topik</span><select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="all">Semua topik ({QUIZ_QUESTIONS.length})</option>{LEARNING_MODULES.filter((module) => QUIZ_QUESTIONS.some((question) => question.moduleId === module.id)).map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}</select></label>
        <label><span>Tingkat</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{DIFFICULTIES.map((level) => <option key={level}>{level}</option>)}</select></label>
        <div className="quiz-filter-summary"><span>Dalam sesi</span><strong>{questions.length} soal</strong></div>
      </section>

      {questions.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-outline-variant bg-white p-10 text-center"><h2 className="text-lg font-semibold">Belum ada soal untuk kombinasi ini.</h2><p className="mt-2 text-sm text-on-surface-variant">Pilih tingkat lain untuk melanjutkan.</p><button type="button" onClick={() => setDifficulty('Semua level')} className="button-primary mt-5">Tampilkan semua level</button></section>
      ) : (
        <div className="quiz-layout">
          <main className="min-w-0">
            <section className="quiz-card">
              <div className="quiz-progress-row"><span>Soal {questionIndex + 1} dari {questions.length}</span><span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span></div>
              <div className="quiz-progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>

              <div className="mt-7">
                <div className="flex items-center gap-2"><span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">{currentQuestion.difficulty}</span><span className="text-xs text-on-surface-variant">{LEARNING_MODULES.find((module) => module.id === currentQuestion.moduleId)?.title}</span></div>
                <h2 className="mt-4 text-xl font-semibold leading-8 text-on-surface sm:text-2xl">{currentQuestion.question}</h2>
                {currentQuestion.code && <pre className="mt-5 overflow-x-auto rounded-2xl bg-inverse-surface p-4 text-xs leading-6 text-inverse-on-surface"><code>{currentQuestion.code}</code></pre>}
              </div>

              <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Pilihan jawaban">
                {currentQuestion.options.map((option, index) => {
                  const selected = selectedOption === index
                  const correct = submitted && index === currentQuestion.correctIdx
                  const wrong = submitted && selected && index !== currentQuestion.correctIdx
                  return (
                    <button key={option} type="button" onClick={() => !submitted && setSelectedOption(index)} role="radio" aria-checked={selected} disabled={submitted} className={`quiz-option ${selected ? 'quiz-option--selected' : ''} ${correct ? 'quiz-option--correct' : ''} ${wrong ? 'quiz-option--wrong' : ''}`}>
                      <span className="quiz-option__marker">{correct ? <Icon name="check" size={17} /> : wrong ? <Icon name="close" size={16} /> : String.fromCharCode(65 + index)}</span><span>{option}</span>
                    </button>
                  )
                })}
              </div>

              {submitted && (
                <div role="status" aria-live="polite" className={`quiz-feedback ${selectedOption === currentQuestion.correctIdx ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
                  <Icon name={selectedOption === currentQuestion.correctIdx ? 'check_circle' : 'lightbulb'} size={21} />
                  <div><strong>{selectedOption === currentQuestion.correctIdx ? 'Tepat.' : 'Belum tepat.'}</strong><p>{currentQuestion.explanation}</p></div>
                </div>
              )}

              <div className="mt-7 flex items-center justify-between gap-3 border-t border-surface-variant pt-5">
                <span className="hidden text-sm text-on-surface-variant sm:block">{correctCount} benar dari {answers.length} dijawab</span>
                <button type="button" onClick={submitted ? nextQuestion : submitAnswer} disabled={selectedOption === null} className="button-primary ml-auto min-w-36 justify-center">{submitted ? (questionIndex === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya') : 'Periksa jawaban'}<Icon name="arrow_forward" size={17} /></button>
              </div>
            </section>
          </main>

          <aside className="quiz-map">
            <div><p className="text-xs font-semibold text-primary">Peta soal</p><h2 className="mt-1 text-base font-semibold text-on-surface">Progres sesi</h2></div>
            <div className="quiz-map__grid">
              {questions.map((question, index) => {
                const answer = answers[index]
                return <button key={question.id} type="button" onClick={() => jumpToQuestion(index)} disabled={index > answers.length} aria-label={`Soal ${index + 1}${answer ? answer.correct ? ', benar' : ', salah' : ''}`} className={`${index === questionIndex ? 'quiz-map__item quiz-map__item--current' : 'quiz-map__item'} ${answer?.correct ? 'quiz-map__item--correct' : ''} ${answer && !answer.correct ? 'quiz-map__item--wrong' : ''}`}>{index + 1}</button>
              })}
            </div>
            <div className="grid gap-2 border-t border-surface-variant pt-4 text-xs text-on-surface-variant"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-primary" />Jawaban benar</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-error" />Perlu review</span></div>
          </aside>
        </div>
      )}
    </div>
  )
}
