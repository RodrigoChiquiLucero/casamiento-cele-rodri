import { useEffect, useState } from 'react'
import heroPhoto from './assets/FotoCasamiento.png'
import EnvelopeIntro from './components/EnvelopeIntro'

// Datos del casamiento — editar acá si cambia algo.
const WEDDING_DATE = new Date('2027-10-02T21:00:00-03:00')
const VENUE_NAME = 'Santiago Derqui 703'
const VENUE_CITY = 'Villa Allende, Córdoba'
const VENUE_FULL_ADDRESS = 'Santiago Derqui 703, X5105 Villa Allende, Córdoba'
const CARD_PRICE = 'A consultar'

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime())
  const totalSeconds = Math.floor(diffMs / 1000)
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  }
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <span className="h-px w-12 bg-stone-300" />
      <span className="h-1 w-1 rounded-full bg-stone-400" />
      <span className="h-px w-12 bg-stone-300" />
    </div>
  )
}

function Section({ eyebrow, children }) {
  return (
    <section className="text-center space-y-6">
      {eyebrow && (
        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-500">
          {eyebrow}
        </p>
      )}
      {children}
    </section>
  )
}

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
]

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const countdown = useCountdown(WEDDING_DATE)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_FULL_ADDRESS)}`

  return (
    <>
      {!introDone && <EnvelopeIntro onOpen={() => setIntroDone(true)} />}
      <div className="min-h-screen bg-stone-50 text-stone-800 font-light selection:bg-stone-800 selection:text-stone-50">

      <header className="relative h-screen w-full overflow-hidden">
        <img
          src={heroPhoto}
          alt="Cele y Rodri"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/40 to-stone-900/85" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 sm:pb-24 text-center text-stone-50">
          <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-stone-200">
            Nos casamos
          </p>
          <p className="mt-6 max-w-md text-stone-200 leading-relaxed">
            Queremos compartir con vos uno de los días más importantes
            de nuestras vidas.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24 md:py-32 space-y-20 md:space-y-28">

        <Section eyebrow="El gran día">
          <div className="space-y-2">
            <p className="text-sm tracking-[0.3em] uppercase text-stone-500">Sábado</p>
            <p className="text-7xl sm:text-8xl font-extralight tracking-tight">02</p>
            <p className="text-2xl sm:text-3xl tracking-[0.3em] uppercase text-stone-600">
              Octubre
            </p>
            <p className="text-lg text-stone-500 pt-2">2027 · 21:00 hs</p>
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Faltan">
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-md mx-auto">
            {COUNTDOWN_UNITS.map(({ key, label }) => (
              <div key={key} className="flex flex-col items-center">
                <p className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight tabular-nums">
                  {String(countdown[key]).padStart(2, '0')}
                </p>
                <p className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-stone-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Dónde">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-light">{VENUE_NAME}</p>
            <p className="text-stone-500">{VENUE_CITY}</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-stone-700 hover:text-stone-900 transition-colors"
          >
            <span>Cómo llegar</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Section>

        <Divider />

        <Section eyebrow="Tarjeta">
          <p className="text-3xl sm:text-4xl font-extralight tracking-tight italic text-stone-700">
            {CARD_PRICE}
          </p>
        </Section>

        <footer className="pt-12 text-center text-[10px] tracking-[0.5em] uppercase text-stone-400">
          Cele &amp; Rodri · 2027
        </footer>

      </main>
    </div>
    </>
  )
}
