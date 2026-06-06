import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

function WaxSeal({ className }) {
  const wavyPath = useMemo(() => {
    const cx = 50
    const cy = 50
    const baseR = 42
    const amplitude = 1.6
    const waves = 28
    const steps = 360
    let d = ''
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI
      const r = baseR + amplitude * Math.sin(waves * angle)
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      d += i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`
    }
    return d + ' Z'
  }, [])

  const textR = 37

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={wavyPath} fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" />

      <defs>
        <path
          id="seal-top-arc"
          d={`M ${50 - textR},50 A ${textR},${textR} 0 0 1 ${50 + textR},50`}
        />
        <path
          id="seal-bottom-arc"
          d={`M ${50 - textR},50 A ${textR},${textR} 0 0 0 ${50 + textR},50`}
        />
      </defs>

      <text fill="currentColor" fontSize="5.5" letterSpacing="1.4" fontWeight="300">
        <textPath href="#seal-top-arc" startOffset="50%" textAnchor="middle">
          CELE · RODRI
        </textPath>
      </text>

      <text fill="currentColor" fontSize="4.2" letterSpacing="1.6" fontWeight="300">
        <textPath
          href="#seal-bottom-arc"
          startOffset="50%"
          textAnchor="middle"
          side="right"
        >
          VILLA ALLENDE · 2027
        </textPath>
      </text>

      <text
        x="50"
        y="48"
        fill="currentColor"
        fontSize="6.5"
        textAnchor="middle"
        letterSpacing="0.8"
        fontWeight="300"
      >
        02 · OCT
      </text>
      <text
        x="50"
        y="58"
        fill="currentColor"
        fontSize="6.5"
        textAnchor="middle"
        letterSpacing="0.8"
        fontWeight="300"
      >
        2027
      </text>
    </svg>
  )
}

export default function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('closed')
  const reduceMotion = useReducedMotion()

  const handleClick = () => {
    if (phase !== 'closed') return
    if (reduceMotion) {
      setPhase('done')
      return
    }
    setPhase('opening')
    setTimeout(() => setPhase('done'), 2200)
  }

  return (
    <AnimatePresence onExitComplete={onOpen}>
      {phase !== 'done' && (
        <motion.div
          key="envelope-intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 px-4 sm:px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="absolute top-10 sm:top-14 text-[10px] sm:text-xs tracking-[0.5em] uppercase text-sky-900/70">
            Cele &amp; Rodri
          </p>

          <button
            type="button"
            onClick={handleClick}
            aria-label="Abrir invitación"
            disabled={phase !== 'closed'}
            className="focus:outline-none disabled:cursor-default"
            style={{ perspective: '1500px' }}
          >
            <div className="relative w-[92vw] h-[62vw] max-w-md max-h-72 sm:w-96 sm:h-64">

              <div className="absolute inset-0 bg-white border border-sky-200 rounded-sm shadow-sm" />

              <motion.div
                className="absolute inset-1 flex flex-col items-center justify-center text-sky-900/70"
                initial={{ opacity: 0 }}
                animate={phase === 'opening' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase">
                  Te invitamos
                </p>
              </motion.div>

              <motion.div
                className="absolute inset-0 origin-top border-b border-sky-300/60"
                style={{
                  background: '#e0f2fe',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  zIndex: 20,
                }}
                initial={{ rotateX: 0 }}
                animate={phase === 'opening' ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-900"
                style={{ zIndex: 30 }}
                animate={
                  phase === 'opening'
                    ? { scale: 0, opacity: 0, rotate: 12 }
                    : { scale: 1, opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <WaxSeal className="w-28 h-28 sm:w-28 sm:h-28" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {phase === 'closed' && (
              <motion.p
                key="hint"
                className="absolute bottom-12 sm:bottom-14 text-[10px] tracking-[0.5em] uppercase text-sky-900/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                Tocá para abrir
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
