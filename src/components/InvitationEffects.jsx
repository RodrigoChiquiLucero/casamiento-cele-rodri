import { createContext, useContext, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const EffectsContext = createContext(false)

export function EffectsProvider({ ready, children }) {
  return <EffectsContext.Provider value={ready}>{children}</EffectsContext.Provider>
}

export function Reveal({ as = 'div', children, ...props }) {
  const ready = useContext(EffectsContext)
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [18, -18])
  const Tag = as === 'section' ? motion.section : as === 'footer' ? motion.footer : motion.div
  return (
    <Tag ref={ref} {...props} style={ready && !reduced ? { y } : undefined}>
    <motion.div className={as === 'section' ? 'space-y-6' : undefined} initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={ready ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
    </Tag>
  )
}

export function ParallaxPhoto({ active, hero = false, travel = 8, zoom = 1.035, offsetX = 0, offsetY = 0, ...props }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], hero ? ['-45px', '45px'] : [`calc(${offsetY}% - ${travel}px)`, `calc(${offsetY}% + ${travel}px)`])
  const framing = offsetX || offsetY
  return <motion.img ref={ref} {...props} style={reduced || !active
    ? (framing ? { x: `${offsetX}%`, y: `${offsetY}%`, scale: zoom } : undefined)
    : { x: `${offsetX}%`, y, scale: hero ? 1.16 : zoom }} />
}

export function ParallaxLayer({ active, children, className, travel = 24 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel])
  return <motion.div ref={ref} className={className} style={active && !reduced ? { y } : undefined}>{children}</motion.div>
}

export function ParallaxFooter({ children }) {
  const ref = useRef(null)
  const ready = useContext(EffectsContext)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  return (
    <div ref={ref} className="parallax-footer-space">
      <motion.footer className="parallax-footer text-center font-display text-xl italic text-stone-500"
        style={reduced ? undefined : { opacity: ready ? opacity : 0, y }}>
        {children}
      </motion.footer>
    </div>
  )
}

export function ScrollHint({ active }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 120], [1, 0])
  if (!active) return null
  return (
    <motion.a href="#invitacion" className="scroll-hint" style={{ opacity }}
      aria-label="Deslizá para descubrir la invitación">
      <span>Deslizá para descubrir</span>
      <motion.svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor"
        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        animate={reduced ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M9 3v15m-5-5 5 5 5-5" />
      </motion.svg>
    </motion.a>
  )
}
