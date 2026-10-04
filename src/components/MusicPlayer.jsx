import { useRef, useState } from 'react'
import song from '../assets/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video).mp3'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false)

  const toggle = async () => {
    const audio = audioRef.current
    if (playing) { audio.pause(); return }
    try { setError(false); await audio.play() } catch { setError(true) }
  }
  const reset = (stop = false) => {
    if (stop) audioRef.current.pause()
    audioRef.current.currentTime = 0
    setProgress(0)
  }

  return (
    <div className="mx-auto max-w-xs space-y-5">
      <div>
        <p className="font-display text-3xl italic">Die With a Smile</p>
        <p className="mt-2 text-xs tracking-wide text-stone-500">Lady Gaga &amp; Bruno Mars</p>
      </div>
      <input type="range" className="music-progress" min="0" max="100" step="0.1" value={progress}
        aria-label="Posición en la canción" onChange={({ target }) => {
          const audio = audioRef.current
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = Number(target.value) / 100 * audio.duration
            setProgress(Number(target.value))
          }
        }} />
      <div className="flex items-center justify-center gap-6">
        <button className="music-secondary" type="button" onClick={() => reset()} aria-label="Reiniciar canción">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5h2v14H5zm14 0v14L8 12Z" /></svg>
        </button>
        <button className="music-control" type="button" onClick={toggle} aria-label={playing ? 'Pausar canción' : 'Reproducir canción'}>
          <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{playing ? <path d="M6 5h4v14H6zm8 0h4v14h-4Z" /> : <path d="M8 5v14l11-7Z" />}</svg>
        </button>
        <button className="music-secondary" type="button" onClick={() => reset(true)} aria-label="Detener canción">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1" /></svg>
        </button>
      </div>
      <audio ref={audioRef} src={song} preload="metadata"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onError={() => { setPlaying(false); setError(true) }}
        onTimeUpdate={({ currentTarget }) => setProgress(currentTarget.duration ? currentTarget.currentTime / currentTarget.duration * 100 : 0)} />
      {error && <p className="text-xs text-stone-500" role="status">No pudimos reproducir la canción. Intentá nuevamente.</p>}
    </div>
  )
}
