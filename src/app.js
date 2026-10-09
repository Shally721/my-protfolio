import { defaultStarAngles, projectSlides, projects } from './data/projects.js'
import { applyStaticCopy, getLang, localize, onLangChange, setLang, t } from './i18n.js'
import { introPending, playIntro } from './intro.js'

applyStaticCopy()
document.querySelectorAll('[data-lang-option]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.langOption))
})

const slideImageUrls = import.meta.glob('./assets/slides/**/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})
const thumbUrls = import.meta.glob('./assets/thumbs/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})
const mediaUrls = import.meta.glob('./assets/**/*.{png,mp4,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const grid = document.getElementById('projectGrid')
const detailView = document.getElementById('detailView')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const dossier = document.getElementById('projectDossier')
const galaxySystem = document.getElementById('galaxySystem')
const workStars = document.getElementById('workStars')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const starAngles = { ...defaultStarAngles }
let motionSequence = 0

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const totalBoards = projects.reduce((total, project) => total + project.pages, 0)
document.getElementById('projectStats').textContent = `${projects.length} PROJECTS · ${totalBoards} BOARDS`
document.getElementById('dossierProjectCount').textContent = `${projects.length} PROJECTS`
document.getElementById('dossierBoardCount').textContent = `${totalBoards} BOARDS`

workStars.innerHTML = projects.map((project) => `
  <button class="work-star star-${project.id}" data-star="${project.id}" aria-pressed="false" aria-label="${t('works.starLabel', { title: project.title })}">
    <span class="star-shape" aria-hidden="true"></span>
    <span class="star-label"><b>${project.index}</b><span>${project.title.toUpperCase()}</span></span>
  </button>
`).join('')

function projectMediaMarkup(project) {
  const media = project.media
  if (!media) return '<div class="project-media-placeholder">MEDIA COMING SOON</div>'
  if (media.type === 'video') {
    const src = mediaUrls[media.src] || media.src
    const poster = mediaUrls[media.poster] || media.poster
    const mimeType = media.src.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'
    return `<video class="project-media-video" muted loop playsinline preload="none" poster="${poster}" data-play-in-view><source src="${src}" type="${mimeType}"></video>`
  }
  if (media.type === 'stack') {
    return `<div class="project-media-stack">${media.images.map((src, index) => `<img src="${mediaUrls[src] || src}" alt="${project.title}：${media.label} ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">`).join('')}</div>`
  }
  return `<img class="project-media-image" src="${mediaUrls[media.src] || media.src}" alt="${getLang() === 'en' ? `${project.title} cover` : `${project.title}：${media.label}`}" loading="lazy">`
}

function renderGrid() {
grid.innerHTML = projects.map((project) => `
  <article class="project-row project-${project.id}">
    <div class="project-row-copy">
      <p class="project-meta">${project.meta} · ${project.pages} PAGES</p>
      <h3>${project.title}</h3>
      <p class="project-subtitle">${localize(project, 'subtitle')}</p>
      <p class="project-summary">${localize(project, 'summary')}</p>
      <div class="tag-list">${localize(project, 'tags').map((tag) => `<span>${tag}</span>`).join('')}</div>
      <button class="project-link" data-project="${project.id}" data-project-launch="${project.id}" aria-label="${t('works.enterLabel', { title: project.title })}">${t('works.enter')} <span class="entry-star" aria-hidden="true"><span class="entry-star-core"></span></span></button>
      ${project.liveUrl ? `<div class="project-live-entry"><p>${t('works.liveInvite')}</p><a href="${project.liveUrl}" target="_blank" rel="noreferrer">${t('works.liveCta')} <span class="entry-star" aria-hidden="true"><span class="entry-star-core"></span></span></a></div>` : ''}
    </div>
    <button class="project-media${project.media?.ratio ? ' project-media--fitted' : ''}" data-project="${project.id}" aria-label="${t('works.mediaLabel', { title: project.title })}"${project.media?.ratio ? ` style="aspect-ratio: ${project.media.ratio}"` : ''}>
      <span class="project-media-index">${project.index}</span>
      ${projectMediaMarkup(project)}
      <span class="project-media-overlay">EXPLORE CASE STUDY <b>↗</b></span>
    </button>
  </article>
`).join('')
}
renderGrid()

function orbitPoint(angle, id) {
  const radians = angle * Math.PI / 180
  const compactOrbit = window.innerWidth <= 760
  const timuFrontness = id === 'timu' ? Math.max(0, Math.sin(radians)) : 0
  const upperLeftClearance = compactOrbit
    ? 0
    : Math.max(0, -Math.cos(radians)) * Math.max(0, -Math.sin(radians)) * 2
  return {
    left: 50 + Math.cos(radians) * (compactOrbit ? 22 : 38) + timuFrontness * (compactOrbit ? 10 : 5) - upperLeftClearance * 5.5,
    top: 45 + Math.sin(radians) * 31 + timuFrontness * (compactOrbit ? 9 : 6) + upperLeftClearance * 15,
  }
}

function placeStars() {
  document.querySelectorAll('[data-star]').forEach((star) => {
    const point = orbitPoint(starAngles[star.dataset.star], star.dataset.star)
    star.style.left = `${point.left}%`
    star.style.top = `${point.top}%`
    star.classList.toggle('is-orbit-left', point.left < 38)
    star.classList.toggle('is-orbit-right', point.left > 62)
    star.classList.toggle('is-orbit-front', point.top > 62)
  })
}

function animateGalaxyTo(id) {
  const selectedAngle = starAngles[id]
  const turn = (90 - selectedAngle + 360) % 360
  if (turn === 0 || reduceMotion) {
    Object.keys(starAngles).forEach((key) => { starAngles[key] = (starAngles[key] + turn) % 360 })
    placeStars()
    return Promise.resolve()
  }

  const duration = 1050
  const animations = [...document.querySelectorAll('[data-star]')].map((star) => {
    const startAngle = starAngles[star.dataset.star]
    const keyframes = Array.from({ length: 13 }, (_, index) => {
      const progress = index / 12
      const point = orbitPoint(startAngle + turn * progress, star.dataset.star)
      return { left: `${point.left}%`, top: `${point.top}%` }
    })
    return star.animate(keyframes, { duration, easing: 'cubic-bezier(.45,.02,.18,1)', fill: 'forwards' })
  })

  return Promise.all(animations.map((animation) => animation.finished)).then(() => {
    Object.keys(starAngles).forEach((key) => { starAngles[key] = (starAngles[key] + turn) % 360 })
    placeStars()
    animations.forEach((animation) => animation.cancel())
  }).catch(() => {})
}

let selectedProjectId = null
let orbitBusy = false

async function updateDossier(id) {
  const project = projects.find((item) => item.id === id)
  if (!project) return
  const sequence = ++motionSequence
  document.querySelectorAll('[data-star]').forEach((star) => {
    star.getAnimations().forEach((animation) => animation.cancel())
    star.classList.remove('is-active')
    star.classList.toggle('is-traveling', star.dataset.star === id)
    star.setAttribute('aria-pressed', String(star.dataset.star === id))
  })
  galaxySystem.classList.add('is-rotating')
  dossier.classList.add('is-changing')
  orbitBusy = true
  await animateGalaxyTo(id)
  if (sequence !== motionSequence) return
  orbitBusy = false
  galaxySystem.classList.remove('is-rotating')
  const selectedStar = document.querySelector(`[data-star="${id}"]`)
  selectedStar.classList.remove('is-traveling')
  selectedStar.classList.add('is-active')
  selectedProjectId = id
  renderDossier()
  dossier.classList.remove('is-changing')
}

function renderDossier() {
  const project = projects.find((item) => item.id === selectedProjectId)
  if (!project) return
  dossier.innerHTML = `<div class="dossier-index">STAR ${project.index} / ${String(projects.length).padStart(2, '0')} · SELECTED</div><h2>${project.title}</h2><p>${localize(project, 'subtitle')}</p>${thumbUrls[`./assets/thumbs/${project.id}.webp`] ? `<figure class="dossier-cover"><img src="${thumbUrls[`./assets/thumbs/${project.id}.webp`]}" alt="${getLang() === 'en' ? `${project.title} cover` : `${project.title} 封面`}" width="720" height="405"></figure>` : `<p class="dossier-summary">${localize(project, 'summary')}</p>`}<div class="dossier-meta"><span>${project.meta.split(' · ')[0]}</span><span>${project.pages} BOARDS</span></div><button class="dossier-link" data-project="${project.id}">${t('dossier.cta')} <span>↗</span></button>`
}

document.querySelectorAll('[data-star]').forEach((star) => {
  star.addEventListener('click', () => updateDossier(star.dataset.star))
})

Object.values(thumbUrls).forEach((url) => { const img = new Image(); img.src = url })
placeStars()
updateDossier('pizza')
window.addEventListener('resize', placeStars)

function renderVideoSlide(project, slide, index, total) {
  const videoUrl = mediaUrls[slide.src]
  const posterUrl = slide.poster ? mediaUrls[slide.poster] : ''
  const pageTitle = getLang() === 'en' && slide.titleEn ? slide.titleEn : slide.title
  if (!videoUrl) {
    return `<div class="detail-empty"><strong>${t('detail.missing', { n: index + 1 })}</strong><span>${pageTitle}</span></div>`
  }
  return `<figure class="portfolio-slide video-slide" aria-label="${t('detail.slideAlt', { title: project.title, page: pageTitle, n: index + 1, total })}">
      <figcaption class="video-slide__header">
        <span class="video-slide__label">${slide.label}</span>
        <strong class="video-slide__title">${pageTitle}</strong>
      </figcaption>
      <div class="video-slide__frame">
        <video src="${videoUrl}"${posterUrl ? ` poster="${posterUrl}"` : ''} autoplay muted loop playsinline preload="auto" aria-label="${t('detail.videoLabel', { page: pageTitle })}"></video>
      </div>
    </figure>`
}

let renderedDetailId = null

function renderDetail(id, { keepScroll = false } = {}) {
  const project = projects.find((item) => item.id === id)
  if (!project) return
  detailView.classList.toggle('is-component-detail', id === 'components')
  const slides = projectSlides[id] || []
  const slideMarkup = slides.map((slide, index) => {
    if (!Array.isArray(slide)) return renderVideoSlide(project, slide, index, slides.length)
    const [file, title] = slide
    const imagePath = file.includes('/')
      ? `./assets/${file}.png`
      : `./assets/slides/${id}/${file}.png`
    const imageUrl = slideImageUrls[imagePath] || mediaUrls[imagePath]
    if (!imageUrl) {
      return `<div class="detail-empty"><strong>${t('detail.missing', { n: index + 1 })}</strong><span>${title}</span></div>`
    }
    const isComponentSlide = file.startsWith('component-library/')
    const naturalRatioClass = file.includes('/') ? ' portfolio-slide--natural' : ''
    const nativeWidthClass = isComponentSlide ? ' portfolio-slide--component' : ''
    const loading = file.includes('/') || index < 2 ? 'eager' : 'lazy'
    return `<figure class="portfolio-slide${naturalRatioClass}${nativeWidthClass}"><img src="${imageUrl}" alt="${t('detail.slideAlt', { title: project.title, page: title, n: index + 1, total: slides.length })}" loading="${loading}" fetchpriority="${file.includes('/') ? 'high' : 'auto'}" decoding="async"></figure>`
  }).join('')
  main.hidden = true
  footer.hidden = true
  detailView.hidden = false
  detailView.innerHTML = `
    <div class="detail-top"><button class="detail-nav-button" data-back>${t('detail.back')}</button><span>PROJECT ${project.index} / ${slides.length} BOARDS</span></div>
    <section class="slide-deck" aria-label="${t('detail.deckLabel', { title: project.title })}">
      ${slides.length ? slideMarkup : `<div class="detail-empty"><strong>${t('detail.emptyTitle')}</strong><span>${t('detail.emptyBody')}</span></div>`}
    </section>
    <div class="detail-bottom"><button class="detail-nav-button" data-back>${t('detail.back')}</button><div><strong>${project.title}</strong><span>${localize(project, 'subtitle')}</span></div><button class="space-button" data-next="${projects[(projects.findIndex((item) => item.id === id) + 1) % projects.length].id}">${t('detail.next')}</button></div>`
  detailView.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => { location.hash = 'works' }))
  detailView.querySelector('[data-next]').addEventListener('click', (event) => { location.hash = `project/${event.currentTarget.dataset.next}` })
  renderedDetailId = id
  if (!keepScroll) window.scrollTo({ top: 0, behavior: 'instant' })
}

const ratingButtons = [...document.querySelectorAll('[data-rating]')]
const ratingFeedback = document.getElementById('ratingFeedback')
const removeRatingButton = document.getElementById('removeRating')
const undoRatingButton = document.getElementById('undoRating')
const ratingStorageKey = 'xiaoli-portfolio-rating-v3'
const feedbackStorageKey = 'xiaoli-portfolio-feedback-v2'
const feedbackStars = [...document.querySelectorAll('[data-feedback-star]')]
const feedbackGalaxyStatus = document.getElementById('feedbackGalaxyStatus')
let removedRating = null
let undoRatingTimer
let meteorSequence = 0

function readRating() {
  try {
    const stored = JSON.parse(localStorage.getItem(ratingStorageKey))
    return stored && Number.isInteger(stored.value) && stored.value >= 1 && stored.value <= 5 ? stored : null
  } catch {
    return null
  }
}

function writeRating(rating) {
  localStorage.setItem(ratingStorageKey, JSON.stringify(rating))
}

function readFeedback() {
  try {
    return JSON.parse(localStorage.getItem(feedbackStorageKey))
  } catch {
    return null
  }
}

function renderFeedbackGalaxy(value = 0) {
  feedbackStars.forEach((star) => star.classList.toggle('is-lit', Number(star.dataset.feedbackStar) <= value))
  feedbackGalaxyStatus.textContent = value ? t('galaxy.received', { n: value }) : t('galaxy.waiting')
}

function clearMeteors() {
  document.querySelectorAll('.rating-meteor').forEach((meteor) => meteor.remove())
}

async function sendStarsToGalaxy(value) {
  const sequence = ++meteorSequence
  clearMeteors()
  renderFeedbackGalaxy(0)
  if (reduceMotion) {
    renderFeedbackGalaxy(value)
    return
  }
  await Promise.all(feedbackStars.slice(0, value).map((destination, index) => {
    const sourceRect = ratingButtons[index].getBoundingClientRect()
    const destinationRect = destination.getBoundingClientRect()
    const startLeft = sourceRect.left + sourceRect.width / 2
    const startTop = sourceRect.top + sourceRect.height / 2
    const endLeft = destinationRect.left + destinationRect.width / 2
    const endTop = destinationRect.top + destinationRect.height / 2
    const angle = Math.atan2(endTop - startTop, endLeft - startLeft) * 180 / Math.PI
    const meteor = document.createElement('span')
    meteor.className = 'rating-meteor'
    document.body.append(meteor)
    const animation = meteor.animate([
      { left: `${startLeft - 58}px`, top: `${startTop}px`, opacity: 0, transform: `rotate(${angle}deg) scaleX(.2)` },
      { opacity: 1, offset: .12 },
      { left: `${endLeft - 58}px`, top: `${endTop}px`, opacity: 1, transform: `rotate(${angle}deg) scaleX(1)`, offset: .86 },
      { left: `${endLeft - 58}px`, top: `${endTop}px`, opacity: 0, transform: `rotate(${angle}deg) scaleX(.2)` },
    ], { duration: 820 + index * 90, delay: index * 105, easing: 'cubic-bezier(.4,0,.2,1)' })
    return animation.finished.catch(() => {}).then(() => meteor.remove())
  }))
  if (sequence === meteorSequence) renderFeedbackGalaxy(value)
}

function renderRatingState(rating = readRating(), syncGalaxy = true) {
  const value = rating?.value || 0
  ratingButtons.forEach((button) => {
    const selected = Number(button.dataset.rating) <= value
    button.classList.toggle('is-selected', selected)
    button.textContent = selected ? '★' : '☆'
    button.setAttribute('aria-checked', String(Number(button.dataset.rating) === value))
  })
  removeRatingButton.hidden = !rating
  document.getElementById('ratingAverage').textContent = rating ? `${rating.value}.0` : '—'
  document.getElementById('ratingCount').textContent = rating ? '1' : '0'
  document.getElementById('ratingUpdated').textContent = rating
    ? new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(rating.updatedAt))
    : '—'
  const feedback = readFeedback()
  document.getElementById('feedbackLatest').textContent = feedback?.message || t('data.none')
  if (syncGalaxy) renderFeedbackGalaxy(value)
}

function updateRatingDataVisibility() {
  const ratingData = document.getElementById('ratingData')
  const shouldShow = location.hash === '#rating-data'
  ratingData.hidden = !shouldShow
  if (shouldShow) {
    renderRatingState()
    requestAnimationFrame(() => document.getElementById('contact').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' }))
  }
}

ratingButtons.forEach((button, index) => {
  button.addEventListener('click', async () => {
    const value = Number(button.dataset.rating)
    const rating = { value, updatedAt: new Date().toISOString() }
    try {
      writeRating(rating)
      clearTimeout(undoRatingTimer)
      removedRating = null
      undoRatingButton.hidden = true
      renderRatingState(rating, false)
      ratingFeedback.textContent = t('rating.thanks', { n: value })
      await sendStarsToGalaxy(value)
    } catch {
      ratingFeedback.textContent = t('rating.saveFail')
    }
  })
  button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'ArrowRight'
      ? Math.min(index + 1, ratingButtons.length - 1)
      : Math.max(index - 1, 0)
    ratingButtons[nextIndex].focus()
  })
})

removeRatingButton.addEventListener('click', () => {
  removedRating = readRating()
  try {
    localStorage.removeItem(ratingStorageKey)
    meteorSequence += 1
    clearMeteors()
    renderRatingState(null)
    ratingFeedback.textContent = t('rating.removed')
    undoRatingButton.hidden = !removedRating
    clearTimeout(undoRatingTimer)
    undoRatingTimer = window.setTimeout(() => {
      removedRating = null
      undoRatingButton.hidden = true
    }, 5000)
  } catch {
    ratingFeedback.textContent = t('rating.removeFail')
  }
})

undoRatingButton.addEventListener('click', () => {
  if (!removedRating) return
  try {
    writeRating(removedRating)
    renderRatingState(removedRating, false)
    ratingFeedback.textContent = t('rating.restored')
    sendStarsToGalaxy(removedRating.value)
    removedRating = null
    undoRatingButton.hidden = true
    clearTimeout(undoRatingTimer)
  } catch {
    ratingFeedback.textContent = t('rating.restoreFail')
  }
})

renderRatingState()

function renderRoute() {
  const routeMatch = location.hash.match(/^#project\/([\w-]+)$/)
  const match = routeMatch && projects.some((item) => item.id === routeMatch[1]) ? routeMatch : null
  document.querySelector('.site-shell')?.classList.toggle('is-detail-route', Boolean(match))
  if (match) {
    renderDetail(match[1])
    return
  }
  detailView.hidden = true
  main.hidden = false
  footer.hidden = false
  if (location.hash === '#works') {
    requestAnimationFrame(() => {
      const worksSection = document.getElementById('works')
      worksSection?.scrollIntoView({ behavior: 'instant', block: 'start' })
      window.setTimeout(() => worksSection?.scrollIntoView({ behavior: 'instant', block: 'start' }), 80)
    })
  }
  updateRatingDataVisibility()
}

document.addEventListener('click', (event) => {
  const launchTarget = event.target.closest('[data-project-launch]')
  if (launchTarget) {
    const id = launchTarget.dataset.projectLaunch
    if (launchTarget.classList.contains('is-launching')) return
    if (reduceMotion) {
      location.hash = `project/${id}`
      return
    }
    launchTarget.classList.add('is-launching')
    const rect = launchTarget.getBoundingClientRect()
    const meteor = document.createElement('span')
    meteor.className = 'project-launch-meteor'
    meteor.style.left = `${rect.left + rect.width / 2}px`
    meteor.style.top = `${rect.top + rect.height / 2}px`
    document.body.append(meteor)
    const travelX = Math.max(280, window.innerWidth * .42)
    const travelY = -Math.max(170, window.innerHeight * .32)
    const angle = Math.atan2(travelY, travelX) * 180 / Math.PI
    meteor.style.setProperty('--meteor-angle', `${angle}deg`)
    meteor.style.setProperty('--meteor-x', `${travelX}px`)
    meteor.style.setProperty('--meteor-y', `${travelY}px`)
    window.setTimeout(() => {
      meteor.remove()
      location.hash = `project/${id}`
      launchTarget.classList.remove('is-launching')
    }, 820)
    return
  }
  const projectTarget = event.target.closest('[data-project]')
  if (projectTarget) location.hash = `project/${projectTarget.dataset.project}`
})

window.addEventListener('hashchange', renderRoute)
renderRoute()

document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => {
  const target = button.dataset.scroll
  history.replaceState(null, '', target === 'home' ? location.pathname : `#${target}`)
  document.getElementById(target)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
}))

async function copyText(value) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value)
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.append(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('copy failed')
}

document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async (event) => {
  const currentButton = event.currentTarget
  const feedback = document.getElementById('copyFeedback')
  const action = currentButton.querySelector('span')
  try {
    await copyText(currentButton.dataset.copy)
    document.querySelectorAll('[data-copy]').forEach((button) => {
      button.classList.remove('is-copied')
      button.querySelector('span').textContent = t('copy.action')
    })
    currentButton.classList.add('is-copied')
    action.textContent = t('copy.done')
    feedback.textContent = t('copy.success', { label: t(currentButton.dataset.copyLabel) })
  } catch {
    feedback.textContent = t('copy.fail', { value: currentButton.dataset.copy })
  }
  window.setTimeout(() => {
    currentButton.classList.remove('is-copied')
    action.textContent = t('copy.action')
    feedback.textContent = ''
  }, 2400)
}))

const form = document.getElementById('contactForm')
let formSubmitted = false
const formError = document.getElementById('formError')
const formSuccess = document.getElementById('formSuccess')
const submitButton = document.getElementById('submitButton')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  formError.textContent = ''
  formSuccess.textContent = ''
  const data = new FormData(form)
  const message = String(data.get('message')).trim()
  const rating = readRating()
  if (!rating) {
    formError.textContent = t('form.needRating')
    ratingButtons[0].focus()
    return
  }
  submitButton.disabled = true
  submitButton.innerHTML = t('form.sending')
  window.setTimeout(() => {
    const feedbackRecord = { ...rating, message, submittedAt: new Date().toISOString() }
    try { localStorage.setItem(feedbackStorageKey, JSON.stringify(feedbackRecord)) } catch {}
    renderRatingState(rating)
    formSuccess.textContent = t('form.success')
    submitButton.disabled = false
    submitButton.innerHTML = t('form.again')
    formSubmitted = true
    submitButton.type = 'button'
    submitButton.onclick = () => {
      form.reset()
      formSuccess.textContent = ''
      submitButton.innerHTML = t('form.submit')
      formSubmitted = false
      submitButton.type = 'submit'
      submitButton.onclick = null
    }
  }, 650)
})

let starfieldIntro = null

function initStarfield() {
  const canvas = document.getElementById('starfield')
  const context = canvas.getContext('2d')
  let stars = []
  let frame
  let pointerX = 0
  let pointerY = 0

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(canvas.clientWidth * ratio)
    canvas.height = Math.floor(canvas.clientHeight * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    stars = Array.from({ length: Math.min(180, Math.floor(canvas.clientWidth / 7)) }, (_, index) => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      radius: Math.random() * 1.35 + 0.2,
      alpha: Math.random() * 0.7 + 0.18,
      depth: index % 3 + 1,
    }))
  }

  const draw = (time = 0) => {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    // During the intro every star starts at the galaxy centre and is thrown outward.
    let spread = 1
    let fade = 1
    if (starfieldIntro) {
      const p = Math.min(1, Math.max(0, (performance.now() - starfieldIntro.start) / starfieldIntro.duration))
      spread = 1 - Math.pow(1 - p, 4)
      fade = Math.min(1, p * 2.2)
      if (p >= 1) starfieldIntro = null
    }
    const cx = canvas.clientWidth * 0.5
    const cy = canvas.clientHeight * 0.47
    stars.forEach((star, index) => {
      const driftX = pointerX * star.depth * 4
      const driftY = pointerY * star.depth * 3
      const x = cx + (star.x - cx) * spread
      const y = cy + (star.y - cy) * spread
      context.beginPath()
      context.fillStyle = `rgba(${index % 9 === 0 ? '103,120,255' : '255,255,255'},${(star.alpha + Math.sin(time / 900 + index) * 0.08) * fade})`
      context.arc(x + driftX, y + driftY, star.radius * (fade < 1 ? 1.6 - 0.6 * fade : 1), 0, Math.PI * 2)
      context.fill()
    })
    if (!reduceMotion) frame = requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  document.getElementById('home').addEventListener('pointermove', (event) => {
    pointerX = event.clientX / window.innerWidth - 0.5
    pointerY = event.clientY / window.innerHeight - 0.5
    document.documentElement.style.setProperty('--pointer-x', `${pointerX * 18}px`)
    document.documentElement.style.setProperty('--pointer-y', `${pointerY * 14}px`)
  })
  resize()
  draw()
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame)
    if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(draw)
  })
}

initStarfield()

// ── Galaxy idle rotation ─────────────────────────────────────────────────────
// After the intro the project stars drift slowly along their orbit. Hovering a
// star pauses the drift so it's easy to click; clicking still spins the galaxy
// fast to bring that star to the front (animateGalaxyTo), then the drift resumes.
const DRIFT_DEGREES_PER_SECOND = 3.2
let driftPaused = false
let cosmosInView = true
let driftActive = false
let lastDriftTime = null

function driftGalaxy(now) {
  if (lastDriftTime !== null && !orbitBusy && !driftPaused && cosmosInView && !main.hidden && !document.hidden) {
    const step = DRIFT_DEGREES_PER_SECOND * Math.min(64, now - lastDriftTime) / 1000
    Object.keys(starAngles).forEach((key) => { starAngles[key] = (starAngles[key] + step) % 360 })
    placeStars()
  }
  lastDriftTime = now
  requestAnimationFrame(driftGalaxy)
}

// Card videos start only once the intro is over and the card is on screen,
// so decoding never competes with the opening animation.
let videoObserver = null
function playVideosInView() {
  const videos = document.querySelectorAll('video[data-play-in-view]')
  if (!('IntersectionObserver' in window)) { videos.forEach((video) => video.play().catch(() => {})); return }
  videoObserver ??= new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) target.play().catch(() => {})
    else target.pause()
  }), { rootMargin: '200px 0px' })
  videos.forEach((video) => videoObserver.observe(video))
}

function startGalaxyDrift() {
  if (driftActive || reduceMotion) return
  driftActive = true
  galaxySystem.classList.add('is-drifting')
  workStars.addEventListener('pointerover', (event) => { if (event.target.closest('[data-star]')) driftPaused = true })
  workStars.addEventListener('pointerout', (event) => { if (event.target.closest('[data-star]')) driftPaused = false })
  workStars.addEventListener('focusin', () => { driftPaused = true })
  workStars.addEventListener('focusout', () => { driftPaused = false })
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { cosmosInView = entry.isIntersecting }).observe(document.getElementById('home'))
  }
  requestAnimationFrame(driftGalaxy)
}

if (introPending() && !reduceMotion) {
  playIntro({
    galaxySystem,
    orbitPoint,
    starAngles,
    startStarfield: (start, duration) => { starfieldIntro = { start, duration } },
    loadingLabel: t('intro.loading'),
  }).then(() => { startGalaxyDrift(); playVideosInView() })
} else {
  document.documentElement.classList.remove('intro-pending')
  startGalaxyDrift()
  playVideosInView()
}

function syncLanguageCopy() {
  const rating = readRating()
  ratingFeedback.textContent = rating ? t('rating.thanks', { n: rating.value }) : t('rating.prompt')
  if (submitButton.disabled) submitButton.innerHTML = t('form.sending')
  else submitButton.innerHTML = formSubmitted ? t('form.again') : t('form.submit')
  if (formSuccess.textContent) formSuccess.textContent = t('form.success')
  if (formError.textContent) formError.textContent = t('form.needRating')
  document.getElementById('copyFeedback').textContent = ''
  renderRatingState(rating)
}

syncLanguageCopy()

onLangChange(() => {
  workStars.querySelectorAll('[data-star]').forEach((star) => {
    const project = projects.find((item) => item.id === star.dataset.star)
    star.setAttribute('aria-label', t('works.starLabel', { title: project.title }))
  })
  renderGrid()
  if (!document.documentElement.classList.contains('intro-running')) playVideosInView()
  renderDossier()
  if (renderedDetailId && !detailView.hidden) renderDetail(renderedDetailId, { keepScroll: true })
  syncLanguageCopy()
})
