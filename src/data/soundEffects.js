// Web Audio API 8-Bit Chiptune Sound Synthesizer & Global SFX Manager
let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function isSoundEnabled() {
  try {
    const saved = localStorage.getItem('fa_app_settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.soundEnabled !== false
    }
  } catch (e) {}
  return true
}

// Play 8-bit SFX (click, powerup, coin, error)
export function playPixelSFX(type = 'click') {
  if (!isSoundEnabled()) return

  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    if (type === 'click') {
      // Crisp 8-bit Click Blip
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.04)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.04)
    } else if (type === 'powerup' || type === 'success') {
      // 8-bit Level Up Chime (C5 - E5 - G5 - C6)
      const freqs = [523.25, 659.25, 783.99, 1046.5]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)
        gain.gain.setValueAtTime(0.15, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.1)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.1)
      })
    } else if (type === 'coin') {
      // 8-bit Coin Sound (B5 to E6)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(987.77, now)
      osc.frequency.setValueAtTime(1318.51, now + 0.06)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
    }
  } catch (e) {
    console.error('SFX error:', e)
  }
}

// Global Click Sound Listener for ALL interactive elements across browser
let globalListenerAttached = false

export function initGlobalClickSound() {
  if (globalListenerAttached || typeof window === 'undefined') return
  globalListenerAttached = true

  window.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, input[type="submit"], input[type="button"], [role="button"], .category-chip')
    if (target) {
      playPixelSFX('click')
    }
  }, { capture: true, passive: true })
}

// 8-Bit BGM Loop Generator
let bgmTimer = null
let bgmPlaying = false

export function togglePixelBGM(enable) {
  if (!enable) {
    bgmPlaying = false
    if (bgmTimer) {
      clearInterval(bgmTimer)
      bgmTimer = null
    }
    return
  }

  if (bgmPlaying) return
  bgmPlaying = true

  const melody = [
    261.63, 329.63, 392.00, 523.25,
    349.23, 440.00, 523.25, 659.25,
    392.00, 493.88, 587.33, 783.99,
    261.63, 392.00, 523.25, 329.63
  ]

  let step = 0

  bgmTimer = setInterval(() => {
    if (!bgmPlaying) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime
      const freq = melody[step % melody.length]
      
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(freq, now)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.15)

      step++
    } catch (e) {
      console.error(e)
    }
  }, 240)
}
