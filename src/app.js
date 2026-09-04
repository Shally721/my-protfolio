import { defaultStarAngles, projectSlides, projects } from './data/projects.js'

const slideImageUrls = import.meta.glob('./assets/slides/**/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})
const mediaUrls = import.meta.glob('./assets/*.{png,mp4,mov}', {
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
  <button class="work-star star-${project.id}" data-star="${project.id}" aria-pressed="false" aria-label="点亮 ${project.title}">
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
    return `<video class="project-media-video" autoplay muted loop playsinline preload="metadata" poster="${poster}"><source src="${src}" type="${mimeType}"></video>`
  }
  if (media.type === 'stack') {
    return `<div class="project-media-stack">${media.images.map((src, index) => `<img src="${mediaUrls[src] || src}" alt="${project.title}：${media.label} ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">`).join('')}</div>`
  }
  return `<img class="project-media-image" src="${mediaUrls[media.src] || media.src}" alt="${project.title}：${media.label}" loading="lazy">`
}

grid.innerHTML = projects.map((project) => `
  <article class="project-row project-${project.id}">
    <div class="project-row-copy">
      <p class="project-meta">${project.meta} · ${project.pages} PAGES</p>
      <h3>${project.title}</h3>
      <p class="project-subtitle">${project.subtitle}</p>
      <p class="project-summary">${project.summary}</p>
      <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <button class="project-link" data-project="${project.id}" data-project-launch="${project.id}" aria-label="点亮星星并进入 ${project.title}">进入项目 <span class="entry-star" aria-hidden="true"><span class="entry-star-core"></span></span></button>
      ${project.liveUrl ? `<div class="project-live-entry"><p>如果你也对这个项目感兴趣，欢迎点进来玩玩，上传一个属于你的披萨。</p><a href="${project.liveUrl}" target="_blank" rel="noreferrer">探索披萨世界 <span class="entry-star" aria-hidden="true"><span class="entry-star-core"></span></span></a></div>` : ''}
    </div>
    <button class="project-media" data-project="${project.id}" aria-label="查看 ${project.title} 完整项目">
      <span class="project-media-index">${project.index}</span>
      ${projectMediaMarkup(project)}
      <span class="project-media-overlay">EXPLORE CASE STUDY <b>↗</b></span>
    </button>
  </article>
`).join('')

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
  await animateGalaxyTo(id)
  if (sequence !== motionSequence) return
  galaxySystem.classList.remove('is-rotating')
  const selectedStar = document.querySelector(`[data-star="${id}"]`)
  selectedStar.classList.remove('is-traveling')
  selectedStar.classList.add('is-active')
  dossier.innerHTML = `<div class="dossier-index">STAR ${project.index} / ${String(projects.length).padStart(2, '0')} · SELECTED</div><h2>${project.title}</h2><p>${project.subtitle}</p><p class="dossier-summary">${project.summary}</p><div class="dossier-meta"><span>${project.meta.split(' · ')[0]}</span><span>${project.pages} BOARDS</span></div><button class="dossier-link" data-project="${project.id}">查看完整作品 <span>↗</span></button>`
  dossier.classList.remove('is-changing')
}

document.querySelectorAll('[data-star]').forEach((star) => {
  star.addEventListener('click', () => updateDossier(star.dataset.star))
})

placeStars()
updateDossier('pizza')
window.addEventListener('resize', placeStars)

function renderDetail(id) {
  const project = projects.find((item) => item.id === id)
  if (!project) return
  const slides = projectSlides[id] || []
  const slideMarkup = slides.map(([file, title], index) => {
    const imagePath = `./assets/slides/${id}/${file}.png`
    const imageUrl = slideImageUrls[imagePath]
    if (!imageUrl) {
      return `<div class="detail-empty"><strong>第 ${index + 1} 页暂时无法显示</strong><span>${title}</span></div>`
    }
    return `<figure class="portfolio-slide"><img src="${imageUrl}" alt="${project.title}：${title}（第 ${index + 1} 页，共 ${slides.length} 页）" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async"></figure>`
  }).join('')
  main.hidden = true
  footer.hidden = true
  detailView.hidden = false
  detailView.innerHTML = `
    <div class="detail-top"><button class="detail-nav-button" data-back>← 返回宇宙</button><span>PROJECT ${project.index} / ${slides.length} BOARDS</span></div>
    <section class="slide-deck" aria-label="${project.title} 完整作品内容">
      ${slides.length ? slideMarkup : '<div class="detail-empty"><strong>作品内容正在整理中</strong><span>项目介绍已上线，完整展示页即将补充。</span></div>'}
    </section>
    <div class="detail-bottom"><button class="detail-nav-button" data-back>← 返回宇宙</button><div><strong>${project.title}</strong><span>${project.subtitle}</span></div><button class="space-button" data-next="${projects[(projects.findIndex((item) => item.id === id) + 1) % projects.length].id}">下一个项目 →</button></div>`
  detailView.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => { location.hash = 'works' }))
  detailView.querySelector('[data-next]').addEventListener('click', (event) => { location.hash = `project/${event.currentTarget.dataset.next}` })
  window.scrollTo({ top: 0, behavior: 'instant' })
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
  feedbackGalaxyStatus.textContent = value ? `这片星河已收到 ${value} 颗星光` : '等待第一颗星落入这里'
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
  document.getElementById('feedbackLatest').textContent = feedback?.message || '尚未提交评价或建议。'
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
      ratingFeedback.textContent = `谢谢你的 ${value} 星评分！你可以随时修改。`
      await sendStarsToGalaxy(value)
    } catch {
      ratingFeedback.textContent = '暂时无法保存评分，请检查浏览器是否允许本地存储。'
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
    ratingFeedback.textContent = '评分已撤回。'
    undoRatingButton.hidden = !removedRating
    clearTimeout(undoRatingTimer)
    undoRatingTimer = window.setTimeout(() => {
      removedRating = null
      undoRatingButton.hidden = true
    }, 5000)
  } catch {
    ratingFeedback.textContent = '暂时无法撤回评分，请稍后再试。'
  }
})

undoRatingButton.addEventListener('click', () => {
  if (!removedRating) return
  try {
    writeRating(removedRating)
    renderRatingState(removedRating, false)
    ratingFeedback.textContent = '已恢复刚才的评分。'
    sendStarsToGalaxy(removedRating.value)
    removedRating = null
    undoRatingButton.hidden = true
    clearTimeout(undoRatingTimer)
  } catch {
    ratingFeedback.textContent = '暂时无法恢复评分，请重新选择星星。'
  }
})

renderRatingState()

function renderRoute() {
  const match = location.hash.match(/^#project\/(pizza|amber|timu)$/)
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
      button.querySelector('span').textContent = '复制'
    })
    currentButton.classList.add('is-copied')
    action.textContent = '已复制'
    feedback.textContent = `${currentButton.dataset.copyLabel}已复制到剪贴板`
  } catch {
    feedback.textContent = `复制失败，请手动复制：${currentButton.dataset.copy}`
  }
  window.setTimeout(() => {
    currentButton.classList.remove('is-copied')
    action.textContent = '复制'
    feedback.textContent = ''
  }, 2400)
}))

const form = document.getElementById('contactForm')
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
    formError.textContent = '请先为作品集选择 1—5 星评分。'
    ratingButtons[0].focus()
    return
  }
  submitButton.disabled = true
  submitButton.innerHTML = '提交中 <span>···</span>'
  window.setTimeout(() => {
    const feedbackRecord = { ...rating, message, submittedAt: new Date().toISOString() }
    try { localStorage.setItem(feedbackStorageKey, JSON.stringify(feedbackRecord)) } catch {}
    renderRatingState(rating)
    formSuccess.textContent = '谢谢你的评分与建议，这会帮助我继续改进作品集。'
    submitButton.disabled = false
    submitButton.innerHTML = '重新填写 <span>↻</span>'
    submitButton.type = 'button'
    submitButton.onclick = () => {
      form.reset()
      formSuccess.textContent = ''
      submitButton.innerHTML = '提交反馈 <span>↗</span>'
      submitButton.type = 'submit'
      submitButton.onclick = null
    }
  }, 650)
})

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
    stars.forEach((star, index) => {
      const driftX = pointerX * star.depth * 4
      const driftY = pointerY * star.depth * 3
      context.beginPath()
      context.fillStyle = `rgba(${index % 9 === 0 ? '103,120,255' : '255,255,255'},${star.alpha + Math.sin(time / 900 + index) * 0.08})`
      context.arc(star.x + driftX, star.y + driftY, star.radius, 0, Math.PI * 2)
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
