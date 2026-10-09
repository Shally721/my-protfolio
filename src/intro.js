// Opening sequence for the home galaxy: one star → burst → the galaxy unfolds →
// project stars are flung onto their orbits → the interface arrives.
// About 4 seconds, skippable with any click, key, wheel or touch. Plays once per
// browser session (add ?intro=1 to the URL to replay). index.html sets the
// `intro-pending` class before first paint so nothing flashes in early.

const SEEN_KEY = 'xiaoli-intro-seen'
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)'
const EASE_IN_OUT = 'cubic-bezier(.65,0,.35,1)'

export function introPending() {
  return document.documentElement.classList.contains('intro-pending')
}

function markSeen() {
  try { sessionStorage.setItem(SEEN_KEY, '1') } catch {}
}

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

/**
 * @param {object} opts
 * @param {HTMLElement} opts.galaxySystem
 * @param {(angle:number, id:string) => {left:number, top:number}} opts.orbitPoint
 * @param {Record<string, number>} opts.starAngles
 * @param {(start:number, duration:number) => void} opts.startStarfield
 * @param {string} opts.loadingLabel
 */
export function playIntro({ galaxySystem, orbitPoint, starAngles, startStarfield, loadingLabel }) {
  const root = document.documentElement
  const cosmos = document.getElementById('home')
  const animations = []
  const cleanups = []
  let finished = false
  let resolveDone
  const done = new Promise((resolve) => { resolveDone = resolve })

  const run = (el, keyframes, options) => {
    if (!el) return null
    const animation = el.animate(keyframes, { fill: 'backwards', ...options })
    animations.push(animation)
    return animation
  }
  const make = (parent, className, html = '') => {
    const el = document.createElement('div')
    el.className = className
    el.setAttribute('aria-hidden', 'true')
    el.innerHTML = html
    parent.append(el)
    cleanups.push(() => el.remove())
    return el
  }

  // ── 0 · the seed star and the loading counter ────────────────────────────
  const seed = make(galaxySystem, 'intro-seed', '<i></i>')
  const shock = make(galaxySystem, 'intro-shock')
  const shockInner = make(galaxySystem, 'intro-shock intro-shock--inner')
  const loader = make(cosmos, 'intro-loader', `<span class="intro-loader__label">${loadingLabel}</span><span class="intro-loader__num">000</span>`)
  const loaderNum = loader.querySelector('.intro-loader__num')

  run(seed, [
    { transform: 'translate(-50%,-50%) scale(0) rotate(-90deg)', opacity: 0 },
    { transform: 'translate(-50%,-50%) scale(1.15) rotate(10deg)', opacity: 1, offset: 0.62 },
    { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1, offset: 0.78 },
    { transform: 'translate(-50%,-50%) scale(.55) rotate(45deg)', opacity: 1, offset: 0.9 },
    { transform: 'translate(-50%,-50%) scale(3.2) rotate(90deg)', opacity: 0 },
  ], { duration: 1600, easing: 'linear', fill: 'both' })

  run(shock, [
    { transform: 'translate(-50%,-50%) scale(0)', opacity: 0.95 },
    { transform: 'translate(-50%,-50%) scale(38)', opacity: 0 },
  ], { duration: 1300, delay: 1150, easing: 'cubic-bezier(.1,.7,.3,1)', fill: 'both' })
  run(shockInner, [
    { transform: 'translate(-50%,-50%) scale(0)', opacity: 0.7 },
    { transform: 'translate(-50%,-50%) scale(18)', opacity: 0 },
  ], { duration: 1100, delay: 1260, easing: 'cubic-bezier(.1,.7,.3,1)', fill: 'both' })

  run(loader, [
    { opacity: 0, transform: 'translate(-50%, 8px)' },
    { opacity: 1, transform: 'translate(-50%, 0)' },
  ], { duration: 500, delay: 150, easing: EASE_OUT, fill: 'both' })
  const loaderOut = run(loader, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 3300, easing: 'linear', fill: 'forwards' })
  loaderOut?.addEventListener('finish', () => loader.remove())

  const counterStart = performance.now()
  const counterDuration = 3200
  let counterFrame
  const tickCounter = (now) => {
    const p = Math.min(1, (now - counterStart) / counterDuration)
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
    loaderNum.textContent = String(Math.round(eased * 100)).padStart(3, '0')
    if (p < 1 && !finished) counterFrame = requestAnimationFrame(tickCounter)
  }
  counterFrame = requestAnimationFrame(tickCounter)
  cleanups.push(() => cancelAnimationFrame(counterFrame))

  // ── 1 · burst light ──────────────────────────────────────────────────────
  const glow = document.querySelector('.cosmos-glow')
  const glowOpacity = getComputedStyle(glow).opacity
  run(glow, [{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: glowOpacity }], { duration: 2000, delay: 1100, easing: 'ease-out' })

  // ── 2 · the galaxy unfolds, ring by ring, inside out ──────────────────────
  const vortex = galaxySystem.querySelector('.galaxy-vortex')
  run(vortex, [
    { transform: 'rotate(-48deg) scale(.86)' },
    { transform: getComputedStyle(vortex).transform },
  ], { duration: 2300, delay: 1100, easing: EASE_OUT })

  const rings = [...vortex.querySelectorAll('ellipse')]
    .map((ellipse) => ({ ellipse, rx: Number(ellipse.getAttribute('rx')) }))
    .sort((a, b) => a.rx - b.rx)
  rings.forEach(({ ellipse }, index) => {
    const style = getComputedStyle(ellipse)
    const base = style.transform === 'none' ? 'rotate(0deg)' : style.transform
    run(ellipse, [
      { transform: 'rotate(-80deg) scale(.06)', opacity: 0 },
      { opacity: style.opacity, offset: 0.55 },
      { transform: base, opacity: style.opacity },
    ], { duration: 1400, delay: 1150 + index * 52, easing: EASE_OUT })
  })

  // Background stars burst outward from the centre (drawn on the canvas).
  startStarfield(performance.now() + 1150, 1700)
  run(document.getElementById('starfield'), [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 1150, easing: 'linear' })

  // ── 3 · project stars are flung onto their orbits ────────────────────────
  const center = { left: 50, top: 45 }
  const stars = [...galaxySystem.querySelectorAll('[data-star]')]
  stars
    .sort((a, b) => starAngles[a.dataset.star] - starAngles[b.dataset.star])
    .forEach((star, index) => {
      const id = star.dataset.star
      const target = starAngles[id]
      const frames = Array.from({ length: 16 }, (_, k) => {
        const p = k / 15
        const reach = easeOutCubic(p)
        const point = orbitPoint(target - 150 * (1 - p), id)
        return {
          left: `${center.left + (point.left - center.left) * reach}%`,
          top: `${center.top + (point.top - center.top) * reach}%`,
          opacity: Math.min(1, p * 4),
          transform: `scale(${0.25 + 0.75 * reach})`,
        }
      })
      const delay = 1850 + index * 120
      run(star, frames, { duration: 1150, delay, easing: 'cubic-bezier(.3,.6,.25,1)' })
      run(star.querySelector('.star-label'), [
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 500, delay: delay + 950, easing: EASE_OUT })
    })

  // ── 4 · the traveller and the dust ───────────────────────────────────────
  run(galaxySystem.querySelector('.little-person'), [
    { opacity: 0, transform: 'translateY(14px) scale(.6)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 700, delay: 2500, easing: EASE_OUT })
  galaxySystem.querySelectorAll('.dust-star').forEach((dust, index) => {
    const base = getComputedStyle(dust).transform
    run(dust, [
      { opacity: 0, transform: 'scale(0) rotate(-90deg)' },
      { opacity: 1, transform: base === 'none' ? 'none' : base },
    ], { duration: 800, delay: 2200 + index * 140, easing: EASE_OUT })
  })

  // ── 5 · the interface arrives ────────────────────────────────────────────
  const titleLines = document.querySelectorAll('.galaxy-title > span, .galaxy-title em')
  titleLines.forEach((line, index) => {
    run(line, [
      { clipPath: 'inset(100% -10% -40% -10%)', transform: 'translateY(.45em)', opacity: 0 },
      { clipPath: 'inset(-30% -10% -40% -10%)', transform: 'translateY(0)', opacity: 1 },
    ], { duration: 900, delay: 2800 + index * 170, easing: EASE_OUT })
  })
  const rise = (selector, delay, distance = 16) => document.querySelectorAll(selector).forEach((el) => {
    const base = getComputedStyle(el).transform
    const rest = base === 'none' ? '' : base
    run(el, [
      { opacity: 0, transform: `${rest} translateY(${distance}px)` },
      { opacity: 1, transform: rest || 'none' },
    ], { duration: 750, delay, easing: EASE_OUT })
  })
  run(document.querySelector('.topbar'), [
    { opacity: 0, transform: 'translateY(-100%)' },
    { opacity: 1, transform: 'translateY(0)' },
  ], { duration: 800, delay: 3150, easing: EASE_OUT })
  rise('.hero-status', 3250, -10)
  rise('.hero-intro', 3350)
  rise('.project-dossier', 3450, 24)
  rise('.scroll-cue', 3700, 10)

  // Everything is staged with fill:'backwards', so the guard class can go.
  root.classList.remove('intro-pending')
  root.classList.add('intro-running')

  const finish = () => {
    if (finished) return
    finished = true
    animations.forEach((animation) => { try { animation.finish() } catch {} })
    cleanups.forEach((fn) => fn())
    loader.remove()
    root.classList.remove('intro-running', 'intro-pending')
    ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((type) => window.removeEventListener(type, finish))
    markSeen()
    resolveDone()
  }

  ;['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((type) => window.addEventListener(type, finish, { passive: true }))
  Promise.all(animations.map((animation) => animation.finished)).then(finish).catch(finish)
  return done
}
