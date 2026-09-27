import PaymentDetails from './components/PaymentDetails'
import WeddingCalendar from './components/WeddingCalendar'
import BotanicalCorners from './components/BotanicalCorners'
import { useEffect, useState } from 'react'
import heroPhoto from './assets/FotoCasamiento.png'
import EnvelopeIntro from './components/EnvelopeIntro'

// Datos del casamiento — editar acá si cambia algo.
const WEDDING_DATE = new Date('2027-10-02T19:30:00-03:00')
const LOCATIONS = [
  {
    label: 'La ceremonia',
    name: 'Convento San Alfonso',
    time: '19:30 hs',
    maps: 'https://www.google.com/maps?cid=7930684530931996123',
  },
  {
    label: 'La fiesta',
    name: 'Bolgheri',
    time: '21:00 hs',
    maps: 'https://www.google.com/maps?cid=8508632084612308582',
  },
]
// Pegar acá el enlace público de Google Forms cuando esté disponible.
const RSVP_FORM_URL = ''
// La misma cuenta se usa para abonar la tarjeta y para regalos opcionales.
const PAYMENT_ACCOUNT = { alias: '', cbu: '', holder: '', bank: '' }
// Completar los valores vigentes, incluyendo la moneda (por ejemplo, '$ 50.000').
const TICKET_PRICES = { adults: '', children: '' }

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

function Section({ eyebrow, children, prominent = false }) {
  return (
    <section className="text-center space-y-6">
      {eyebrow && (
        <p className={prominent ? "text-base sm:text-lg tracking-[0.22em] uppercase text-[#493B30]" : "text-[11px] sm:text-xs tracking-[0.22em] uppercase text-stone-500"}>
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

  return (
    <>
      {!introDone && <EnvelopeIntro onOpen={() => setIntroDone(true)} />}
      <div className="min-h-screen bg-[#EDE5D9] text-[#493B30] font-normal selection:bg-stone-800 selection:text-stone-50">

      <header className="relative h-screen w-full overflow-hidden">
        <img
          src={heroPhoto}
          alt="Cele y Rodri"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/40 to-stone-900/85" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 sm:pb-24 text-center text-stone-50">
          <p className="font-display text-3xl sm:text-4xl italic text-stone-100">
            Nos casamos
          </p>
          <p className="mt-4 max-w-sm text-sm sm:text-base text-stone-200 leading-relaxed">
            Queremos compartir con vos uno de los días más importantes
            de nuestras vidas.
          </p>
        </div>
      </header>

      <main className="relative isolate mx-auto w-full max-w-2xl px-6 py-16 sm:py-24 md:py-32 space-y-20 md:space-y-28">
        <BotanicalCorners />

        <Section eyebrow="El gran día" prominent>
          <WeddingCalendar />
        </Section>

        <Divider />

        <Section>
          <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight text-[#493B30]">
            Compartamos este capítulo
          </h2>
          <p className="mx-auto w-[85%] max-w-64 text-sm leading-relaxed text-stone-600 sm:w-full sm:max-w-sm">
            ¡Nos hace mucha ilusión celebrarlo con vos!
            Tu compañía hará que este día sea aún más especial.
          </p>
        </Section>

        <Section eyebrow="Faltan">
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-md mx-auto">
            {COUNTDOWN_UNITS.map(({ key, label }) => (
              <div key={key} className="flex flex-col items-center">
                <p className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight tabular-nums">
                  {String(countdown[key]).padStart(2, '0')}
                </p>
                <p className="mt-2 text-[10px] sm:text-xs tracking-[0.18em] uppercase text-stone-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Dónde nos encontramos">
          <div className="space-y-10 sm:space-y-14">
            {LOCATIONS.map((location) => (
              <article key={location.name} className="min-w-0 space-y-5">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">
                    {location.label}
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight text-[#493B30]">{location.name}</h2>
                  <p className="text-sm tracking-[0.08em] text-stone-600">{location.time}</p>
                </div>
                <div className="mx-auto grid w-full max-w-xs grid-cols-1">
                  <a
                    href={location.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cómo llegar a ${location.name} (abre en otra pestaña)`}
                    className="invitation-link"
                  >
                    Cómo llegar <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Divider />

        <Section>
          <svg className="mx-auto h-12 w-12 text-[#795B46]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M9 23v18h30V23M6 16h36v7H6zM24 16v25" />
            <path d="M24 16c-8 0-13-2-13-6a4 4 0 0 1 7-3c3 3 6 9 6 9Zm0 0c8 0 13-2 13-6a4 4 0 0 0-7-3c-3 3-6 9-6 9Z" />
          </svg>
          <h2 className="font-display text-3xl sm:text-4xl italic text-[#493B30]">Un regalo de corazón</h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-600">
            Tu presencia es el regalo más importante para nosotros. Sin embargo,
            si deseas acompañarnos con un detalle, puedes encontrar la información a continuación:
          </p>
          <PaymentDetails account={PAYMENT_ACCOUNT} prices={TICKET_PRICES} />
        </Section>

        <Section eyebrow="Confirmar tu asistencia">
        <div className="mx-auto grid w-full max-w-xs grid-cols-1">
          {RSVP_FORM_URL ? (
            <a
              href={RSVP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Confirmar asistencia (abre en otra pestaña)"
              className="invitation-link"
            >
              Confirmar <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="El formulario estará disponible próximamente"
              className="invitation-link cursor-not-allowed opacity-60"
            >
              Confirmar <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
        </Section>

        <footer className="pt-12 text-center font-display text-xl italic text-stone-500">
          Cele &amp; Rodri · 2027
        </footer>

      </main>
    </div>
    </>
  )
}
