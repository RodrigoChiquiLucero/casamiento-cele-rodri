import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EffectsProvider, Reveal, ParallaxPhoto, ParallaxLayer, ParallaxFooter, ScrollHint } from './components/InvitationEffects'
import sunsetPhoto from './assets/cele-rodri-atardecer.jpeg'
import MusicPlayer from './components/MusicPlayer'
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
const RSVP_FORM_URL = 'https://forms.gle/UerMSQHiD7oL6vWd6'
// Enlace para agregar canciones: playlist colaborativa o formulario de sugerencias.
const SONG_REQUEST_URL = 'https://open.spotify.com/playlist/4SV5ATSEIuFOKugC7ER7je?si=ASWYFRRuTsSdXgaiiWa-TQ&utm_source=whatsapp&pt=579b690886af195f6bb64fff34b635ab&pi=XrehX3bkQDmu8'
// La misma cuenta se usa para abonar la tarjeta y para regalos opcionales.
const PAYMENT_ACCOUNT = {
  alias: 'bodaceleyrodri2027',
  cvu: '0000003100043666057513',
  holder: 'Rodrigo Daniel Lucero',
  bank: 'Mercado Pago',
}
// Completar los valores vigentes, incluyendo la moneda (por ejemplo, '$ 50.000').
const TICKET_PRICES = { adults: '$ 175.000', children: '$ 77.000' }

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

function LinkArrow() {
  return (
    <svg className="link-arrow" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 18 18 6M7 6h11v11" />
    </svg>
  )
}

function Divider() {
  const reduced = useReducedMotion()
  const line = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }
  return (
    <motion.div initial={reduced ? false : 'hidden'} animate={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once: false, amount: 1 }} className="flex items-center justify-center gap-4 py-1">
      <motion.span variants={reduced ? undefined : line} className="h-px w-12 origin-right bg-stone-300" />
      <span className="h-1 w-1 rounded-full bg-stone-400" />
      <motion.span variants={reduced ? undefined : line} className="h-px w-12 origin-left bg-stone-300" />
    </motion.div>
  )
}

function Section({ eyebrow, children, prominent = false }) {
  return (
    <Reveal as="section" className="text-center space-y-6">
      {eyebrow && (
        <p className={prominent ? "text-base sm:text-lg tracking-[0.22em] uppercase text-[#51402B]" : "text-[11px] sm:text-xs tracking-[0.22em] uppercase text-stone-500"}>
          {eyebrow}
        </p>
      )}
      {children}
    </Reveal>
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
  const reduceMotion = useReducedMotion()

  const handleOpenInvitation = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setIntroDone(true)
  }

  return (
    <EffectsProvider ready={introDone}>
      {!introDone && <EnvelopeIntro onOpen={handleOpenInvitation} />}
      <div className="invitation-parallax min-h-screen bg-[#F2E9DA] text-[#51402B] font-normal selection:bg-stone-800 selection:text-stone-50">

      <header className="parallax-cover h-screen w-full overflow-hidden">
        <ParallaxPhoto
          active={introDone}
          hero
          src={heroPhoto}
          alt="Cele y Rodri"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/40 to-stone-900/85" />
        <ParallaxLayer active={introDone} travel={30} className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 sm:pb-24 text-center text-stone-50">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: reduceMotion ? 0 : 0.8 }} className="font-display text-3xl sm:text-4xl italic text-stone-100">
            Nos casamos
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: introDone ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.25 }} className="mt-4 max-w-sm text-sm sm:text-base text-stone-200 leading-relaxed">
            Queremos compartir con vos uno de los días más importantes
            de nuestras vidas.
          </motion.p>
        </ParallaxLayer>
        <ScrollHint active={introDone} />
      </header>

      <div className="parallax-content">
      <main id="invitacion" className="relative isolate mx-auto w-full max-w-2xl px-6 py-12 sm:py-16 md:py-20 space-y-10 sm:space-y-12 md:space-y-16">
        <BotanicalCorners />

        <Section eyebrow="Nuestra canción">
          <MusicPlayer />
        </Section>

        <Divider />

        <Section eyebrow="El gran día" prominent>
          <WeddingCalendar />
        </Section>

        <Divider />

        <Section>
          <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight text-[#51402B]">
            Compartamos este capítulo
          </h2>
          <p className="mx-auto w-[85%] max-w-64 text-sm leading-relaxed text-stone-600 sm:w-full sm:max-w-sm">
            ¡Nos hace mucha ilusión celebrarlo con vos!
            Tu compañía hará que este día sea aún más especial.
          </p>
          <motion.figure
            className="chapter-photo mx-auto w-[92%] max-w-[22rem] overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            animate={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            whileInView={introDone ? { opacity: 1, x: reduceMotion ? 0 : [-28, 9, -5, 2, 0] } : undefined}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              opacity: { duration: reduceMotion ? 0 : 1.2 },
              x: { duration: reduceMotion ? 0 : 2.2, times: [0, 0.5, 0.72, 0.88, 1], ease: 'easeInOut' },
            }}
          >

            <div className="chapter-photo-depth">
            <div className="chapter-photo-window">
            <ParallaxPhoto
              active={introDone}
              travel={16}
              zoom={1.16}
              offsetX={5}
              offsetY={-3}
              src={sunsetPhoto}
              alt="Cele y Rodri juntos frente al mar al atardecer"
              width="960"
              height="1280"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            </div>
            </div>
            <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="chapter-photo-organic" clipPathUnits="objectBoundingBox">
                  <path d="M.43,.015 C.64,-.018 .88,.06 .925,.16 C.967,.245 .939,.3 .894,.355 C.834,.43 .908,.49 .95,.565 C.995,.642 .928,.68 .92,.725 C.909,.773 .975,.828 .938,.892 C.892,.975 .702,.992 .506,.985 C.3,.997 .09,.95 .055,.875 C.023,.803 .078,.756 .102,.7 C.132,.639 .084,.591 .045,.525 C.007,.452 .016,.383 .069,.324 C.104,.281 .086,.218 .096,.154 C.107,.078 .273,.025 .43,.015 Z" />
                </clipPath>
              </defs>
            </svg>

          </motion.figure>
        </Section>

        <Section eyebrow="Faltan">
          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-md mx-auto">
            {COUNTDOWN_UNITS.map(({ key, label }, index) => (
              <motion.div key={key} className="flex flex-col items-center"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={introDone ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.1 }}>
                <p className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight tabular-nums">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span key={countdown[key]} className="inline-block" initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.22 }}>
                      {String(countdown[key]).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </p>
                <p className="mt-2 text-[10px] sm:text-xs tracking-[0.18em] uppercase text-stone-500">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Dónde nos encontramos">
          <div className="space-y-8 sm:space-y-10">
            {LOCATIONS.map((location) => (
              <article key={location.name} className="min-w-0 space-y-5">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">
                    {location.label}
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight text-[#51402B]">{location.name}</h2>
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
                    Cómo llegar <LinkArrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Tarjeta">
          <svg className="mx-auto h-12 w-12 text-[#816035]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <circle cx="16" cy="19" r="12" />
            <circle cx="16" cy="19" r="9.5" />
            <path d="M26 29a12 12 0 1 1 16-7M28 26a9.5 9.5 0 1 1 11-5" />
            <path d="M10 29c8 10 21 10 33-2M24 36c-4-1-7-4-9-7M28 36c1-5 3-9 7-11-1 5-3 9-7 11ZM34 32c4-1 8 0 11 3-5 1-8 0-11-3ZM39 29c1-5 4-8 8-9-1 5-4 8-8 9ZM23 36c4 0 7 2 10 6-5 0-8-2-10-6Z" />
            <path d="M35 25l2-5" />
            <circle cx="37.5" cy="18.5" r="1.5" />
          </svg>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-600">
            Nos gustaría compartir este momento tan importante con vos.
            Acá podés consultar el valor de la tarjeta y los datos para abonarla.
          </p>
          <PaymentDetails account={PAYMENT_ACCOUNT} prices={TICKET_PRICES} />
        </Section>

        <Divider />

        <Section eyebrow="Confirmar tu asistencia">
          <svg className="mx-auto h-12 w-12 text-[#816035]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <rect x="8" y="10" width="32" height="31" rx="3" />
            <path d="M16 7v7m16-7v7M8 19h32M17 29l5 5 10-11" />
          </svg>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-600">
            Nos encantaría contar con vos.
            <span className="mt-2 block font-medium text-[#51402B]">
              Confirmá tu asistencia hasta el 1 de septiembre de 2027.
            </span>
          </p>
        <div className="mx-auto grid w-full max-w-xs grid-cols-1">
          {RSVP_FORM_URL ? (
            <a
              href={RSVP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Confirmar asistencia (abre en otra pestaña)"
              className="invitation-link"
            >
              Confirmar <LinkArrow />
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="El formulario estará disponible próximamente"
              className="invitation-link cursor-not-allowed opacity-60"
            >
              Confirmar <LinkArrow />
            </button>
          )}
        </div>
        </Section>

        <Divider />

        <Section>
          <svg className="mx-auto h-12 w-12 text-[#816035]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M9 23v18h30V23M6 16h36v7H6zM24 16v25" />
            <path d="M24 16c-8 0-13-2-13-6a4 4 0 0 1 7-3c3 3 6 9 6 9Zm0 0c8 0 13-2 13-6a4 4 0 0 0-7-3c-3 3-6 9-6 9Z" />
          </svg>
          <h2 className="font-display text-3xl sm:text-4xl italic text-[#51402B]">¿Querés hacernos un regalito?</h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-stone-600">
            Tu presencia es nuestro mejor regalo. Si además del pago de la tarjeta
            querés acompañarnos con un detalle en esta nueva etapa, podés hacerlo por acá.
            Es totalmente opcional.
          </p>
          <PaymentDetails account={PAYMENT_ACCOUNT} prices={TICKET_PRICES} gift />
        </Section>

        <Divider />

        <Section>
          <svg className="mx-auto h-12 w-12 text-[#816035]" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <circle cx="24" cy="24" r="22" fill="currentColor" />
            <g fill="none" stroke="#F2E9DA" strokeLinecap="round">
              <path d="M12 19C20 16 29 16 37 21" strokeWidth="3.5" />
              <path d="M14 25C21 22.5 28 23 34 27" strokeWidth="3" />
              <path d="M16 31C22 29 27 29.5 32 32" strokeWidth="2.5" />
            </g>
          </svg>
          <h2 className="font-display text-3xl sm:text-4xl italic text-[#51402B]">La música la elegimos juntos</h2>
          <p className="mx-auto w-[85%] max-w-64 text-sm leading-relaxed text-stone-600 sm:w-full sm:max-w-sm">
            ¿Qué canción no puede faltar en nuestra fiesta? Sumá ese tema que te hace salir a bailar.
          </p>
          <div className="mx-auto grid w-full max-w-xs grid-cols-1 gap-3">
            {SONG_REQUEST_URL ? (
              <a
                href={SONG_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agregar canción (abre en otra pestaña)"
                className="invitation-link"
              >
                Agregar canción <LinkArrow />
              </a>
            ) : (
              <>
                <button type="button" disabled aria-describedby="songs-coming-soon" className="invitation-link cursor-not-allowed opacity-60">
                  Agregar canción <LinkArrow />
                </button>
                <p id="songs-coming-soon" className="text-xs leading-relaxed text-stone-600">Pronto vas a poder sumar tu canción.</p>
              </>
            )}
          </div>
        </Section>

      </main>
      </div>
      <ParallaxFooter>Cele &amp; Rodri · 2027</ParallaxFooter>
    </div>
    </EffectsProvider>
  )
}
