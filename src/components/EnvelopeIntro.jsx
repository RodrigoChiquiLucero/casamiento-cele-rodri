import { useEffect, useMemo, useState } from 'react'
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
      <path d={wavyPath} fill="#e5d7c1" stroke="currentColor" strokeWidth="0.7" />
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

  useEffect(() => {
    if (phase !== 'opening') return
    const timer = setTimeout(() => setPhase('done'), 2400)
    return () => clearTimeout(timer)
  }, [phase])

  const handleClick = () => {
    if (phase !== 'closed') return
    if (reduceMotion) {
      setPhase('done')
      return
    }
    setPhase('opening')
  }

  return (
    <AnimatePresence onExitComplete={onOpen}>
      {phase !== 'done' && (
        <motion.div
          key="envelope-intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f6] px-4 sm:px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <p className="absolute top-10 sm:top-14 font-display text-3xl sm:text-4xl italic text-stone-600">
            Cele &amp; Rodri
          </p>

          <button
            type="button"
            onClick={handleClick}
            aria-label="Abrir invitación"
            disabled={phase !== 'closed'}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-stone-500 disabled:cursor-default"
            style={{ perspective: '1500px' }}
          >
            <div className="relative w-[min(84vw,52svh,24rem)] aspect-[3/2]">

              <div className="absolute inset-0 bg-[#e9e2d7] border border-[#d9cebf] rounded-sm shadow-[0_18px_60px_-15px_rgba(85,70,48,0.25)]" />

              <motion.div
                className="absolute inset-x-3 inset-y-2 flex flex-col items-center justify-center gap-2 rounded-sm border border-[#e4dacb] bg-[#fffdf8] text-stone-600 shadow-sm"
                initial={false}
                animate={phase === 'opening' ? { y: '-36%' } : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
                  Te invitamos
                </p>
                <p className="font-display text-2xl sm:text-3xl italic">Cele &amp; Rodri</p>
                <p className="text-[10px] tracking-[0.15em]">02 · 10 · 2027</p>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-sm bg-[linear-gradient(135deg,#eee7dc,#e1d5c4)]"
                style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-sm bg-[linear-gradient(0deg,#f1ebe1,#e6dccd)]"
                style={{ clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }}
              />

              <motion.div
                className="absolute inset-0 origin-top border-b border-[#d6c9b7]"
                style={{
                  background: 'linear-gradient(180deg, #f3ede3, #e4d8c6)',
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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#79664b]"
                style={{ zIndex: 30 }}
                animate={
                  phase === 'opening'
                    ? { scale: 0, opacity: 0, rotate: 12 }
                    : { scale: 1, opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <WaxSeal className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_3px_3px_rgba(85,65,40,0.2)]" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {phase === 'closed' && (
              <motion.p
                key="hint"
                className="absolute bottom-12 sm:bottom-14 text-[11px] tracking-[0.2em] text-stone-600"
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: reduceMotion ? 1 : [0.5, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 2.8, repeat: reduceMotion ? 0 : Infinity }}
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
