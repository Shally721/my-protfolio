// Bilingual copy for the portfolio. Static page text is tagged in index.html with
// data-i18n / data-i18n-html / data-i18n-attr; dynamic text in app.js calls t().
// Project copy lives in data/projects.js (the `en` block on each project).

export const LANGS = ['zh', 'en']
const STORAGE_KEY = 'xiaoli-portfolio-lang'

const copy = {
  'meta.title': { zh: '江晓丽 · Interaction Designer', en: 'Jiang Xiaoli · Interaction Designer' },
  'meta.description': { zh: '江晓丽的交互设计作品集——用研究理解人，用叙事连接产品。', en: 'Interaction design portfolio of Jiang Xiaoli — understanding people through research, connecting products through narrative.' },

  'nav.label': { zh: '主导航', en: 'Main navigation' },
  'nav.home': { zh: '回到首页', en: 'Back to top' },
  'nav.works': { zh: '作品', en: 'Work' },
  'nav.about': { zh: '关于我', en: 'About' },
  'nav.contact': { zh: '联系方式', en: 'Contact' },
  'lang.label': { zh: '切换语言', en: 'Switch language' },

  'hero.title': { zh: '<span>在体验的星河里</span><em>寻找真实的人<i>。</i></em>', en: '<span>In a galaxy of experiences,</span><em>finding real people<i>.</i></em>' },
  'hero.intro': { zh: '把情感洞察，变成真实发生的体验。<br />点亮一颗星，认识一个项目。', en: 'Turning emotional insight into real experiences.<br />Light up a star to meet a project.' },
  'galaxy.label': { zh: '精选作品星座', en: 'Constellation of selected work' },
  'galaxy.stars': { zh: '精选作品星星', en: 'Selected work stars' },
  'dossier.title': { zh: '点亮一个作品', en: 'Light up a project' },
  'dossier.body': { zh: '选择星河中的任意一颗星，查看项目介绍。', en: 'Pick any star in the galaxy to see what the project is about.' },
  'dossier.cta': { zh: '查看完整作品', en: 'View full case study' },
  'scroll.text': { zh: '向下滑动，探索更多作品', en: 'Scroll to explore more work' },
  'scroll.label': { zh: '向下查看全部作品', en: 'Scroll down to all work' },

  'works.heading': { zh: '每个项目，<br /><em>都是一颗有引力的星体。</em>', en: 'Every project<br /><em>is a star with its own gravity.</em>' },
  'works.lede': { zh: '从研究洞察到交互落地，沿着每一条轨道查看我的完整设计过程。', en: 'From research insight to shipped interaction — follow each orbit through my full design process.' },
  'works.enter': { zh: '进入项目', en: 'Open project' },
  'works.enterLabel': { zh: '点亮星星并进入 {title}', en: 'Light up the star and open {title}' },
  'works.mediaLabel': { zh: '查看 {title} 完整项目', en: 'View the full {title} project' },
  'works.starLabel': { zh: '点亮 {title}', en: 'Light up {title}' },
  'works.liveInvite': { zh: '如果你也对这个项目感兴趣，欢迎点进来玩玩，上传一个属于你的披萨。', en: 'Curious? Come and play — upload a pizza of your own.' },
  'works.liveCta': { zh: '探索披萨世界', en: 'Explore the pizza world' },

  'detail.back': { zh: '← 返回宇宙', en: '← Back to the galaxy' },
  'detail.next': { zh: '下一个项目 →', en: 'Next project →' },
  'detail.deckLabel': { zh: '{title} 完整作品内容', en: '{title} full case study' },
  'detail.slideAlt': { zh: '{title}：{page}（第 {n} 页，共 {total} 页）', en: '{title} — board {n} of {total}' },
  'detail.videoLabel': { zh: '{page} 交互录屏', en: '{page} — interaction recording' },
  'detail.missing': { zh: '第 {n} 页暂时无法显示', en: 'Board {n} can’t be shown right now' },
  'detail.emptyTitle': { zh: '作品内容正在整理中', en: 'Case study coming soon' },
  'detail.emptyBody': { zh: '项目介绍已上线，完整展示页即将补充。', en: 'The project summary is live; the full boards are on their way.' },

  'about.portraitAlt': { zh: '交互设计师江晓丽', en: 'Interaction designer Jiang Xiaoli' },
  'about.heading': { zh: '在情感洞察与<br /><em>商业价值之间设计。</em>', en: 'Designing between<br /><em>emotional insight and business value.</em>' },
  'about.role': { zh: '江晓丽 · UX / 交互设计师 · 米兰理工大学数字交互设计硕士在读 · 2027 届', en: 'Jiang Xiaoli · UX / Interaction Designer · MSc Digital and Interaction Design, Politecnico di Milano · Class of 2027' },
  'about.bio': { zh: '我从研究中找到真实需求，再把洞察转化为清晰、可落地的产品体验；尤其关注 AI 产品、软硬件协同与情感化设计。', en: 'I start from research to find real needs, then turn insight into clear, buildable product experiences — with a particular focus on AI products, hardware–software interaction and emotional design.' },
  'about.focusLabel': { zh: '核心能力', en: 'Core strengths' },
  'about.focus1': { zh: '情感洞察', en: 'Emotional insight' },
  'about.focus2': { zh: '商业思维', en: 'Business thinking' },
  'about.focus3': { zh: 'AI 全链路', en: 'End-to-end AI workflow' },
  'about.cv': { zh: '查看完整简历 <span>↗</span>', en: 'View full CV <span>↗</span>' },

  'exp.company': { zh: '深圳市心感智影科技有限公司', en: 'ODYSS · Shenzhen Xinganzhiying Technology' },
  'exp.role': { zh: 'UX/UI 设计实习生 · AI 软硬件初创', en: 'UX/UI Design Intern · AI wearable startup' },
  'exp.p1': { zh: '负责 <strong>Odyss App 产品体验设计</strong>，参与 <strong>AI 产品软硬件交互</strong>、UI 设计等核心工作；完成 <strong>Pizza 营销页面</strong>与 <strong>IFA 深体验区</strong>的体验流程设计和上线走查。', en: 'Owned <strong>product experience design for the Odyss app</strong> and worked on <strong>AI hardware–software interaction</strong> and UI design; designed and QA’d the experience flows for the <strong>Pizza marketing site</strong> and the <strong>IFA hands-on demo area</strong> through launch.' },
  'exp.p2': { zh: '深入开展<strong>用户研究与竞品分析</strong>，主动识别体验问题，并推动优化方案落地。', en: 'Ran <strong>user research and competitive analysis</strong>, surfaced experience issues on my own initiative and drove the fixes through to release.' },
  'exp.p3': { zh: '协助完成<strong>界面视觉设计</strong>，参与制定设计规范与<strong>设计组件库搭建</strong>，确保产品视觉风格统一、一致。', en: 'Contributed to <strong>visual UI design</strong>, helped define the design guidelines and <strong>build the component library</strong> to keep the product visually consistent.' },
  'exp.p4': { zh: '熟练运用 <strong>AIGC 设计工具</strong>，结合 <strong>Figma 与编程工具</strong>，高效推动设计方案从概念走向产品化落地。', en: 'Combined <strong>AIGC design tools</strong> with <strong>Figma and coding tools</strong> to move concepts quickly into production-ready product.' },

  'edu.polimi': { zh: '米兰理工大学', en: 'Politecnico di Milano' },
  'edu.polimiBody': { zh: '数字交互设计硕士（在读）<br />QS 艺术与设计排名世界第 7', en: 'MSc Digital and Interaction Design (in progress)<br />#7 worldwide in the QS Art &amp; Design ranking' },
  'edu.bigc': { zh: '北京印刷学院', en: 'Beijing Institute of Graphic Communication' },
  'edu.bigcBody': { zh: '视觉传达设计本科<br />国家奖学金 · 专业第一', en: 'BA Visual Communication Design<br />National Scholarship · Ranked 1st in major' },

  'award.dyson': { zh: '詹姆斯·戴森奖 意大利全国冠军', en: 'James Dyson Award — Italy National Winner' },
  'award.dysonSub': { zh: 'James Dyson Award 2026 · 项目 ORPHEUS', en: 'James Dyson Award 2026 · Project ORPHEUS' },
  'award.uxda': { zh: 'UX Design Award 国际提名奖', en: 'UX Design Award — Nominee' },
  'award.uxdaSub': { zh: 'UX Design Awards 2025 · 项目 LAST DAY', en: 'UX Design Awards 2025 · Project LAST DAY' },
  'award.loreal': { zh: '欧莱雅 Brandstorm 中国赛区 TOP 8', en: 'L’Oréal Brandstorm — China Top 8' },
  'award.scholarship': { zh: '国家奖学金', en: 'National Scholarship' },
  'award.scholarshipSub': { zh: '连续三年专业第一 · 排名 1/260', en: 'Ranked 1st in major for three years · 1/260' },

  'cap.design': { zh: '设计能力', en: 'Design skills' },
  'cap.designBody': { zh: '交互设计 · 信息架构<br />用户研究 · 情感化设计', en: 'Interaction design · Information architecture<br />User research · Emotional design' },
  'cap.tools': { zh: '工具与工作流', en: 'Tools &amp; workflow' },
  'cap.lang': { zh: '语言', en: 'Languages' },
  'cap.langBody': { zh: '普通话 / 粤语 · 母语<br />英语 · B2，可流利口语', en: 'Mandarin / Cantonese · Native<br />English · B2, fluent in conversation' },

  'contact.heading': { zh: '下一段轨道，<br /><em>也许从这里开始。</em>', en: 'The next orbit<br /><em>might start here.</em>' },
  'contact.body': { zh: '目前坐标米兰，可远程面试。欢迎找我聊聊，期待一起共事。', en: 'Currently based in Milan and available for remote interviews. I’d love to hear from you.' },
  'contact.phone': { zh: '手机 133 1157 9771', en: 'Phone +86 133 1157 9771' },
  'contact.wechat': { zh: '微信号 jiangxiaoli721', en: 'WeChat jiangxiaoli721' },
  'contact.phoneLabel': { zh: '手机号', en: 'Phone number' },
  'contact.emailLabel': { zh: '邮箱', en: 'Email' },
  'contact.wechatLabel': { zh: '微信号', en: 'WeChat ID' },
  'contact.qrAlt': { zh: '江晓丽的微信二维码', en: 'Jiang Xiaoli’s WeChat QR code' },
  'copy.action': { zh: '复制', en: 'Copy' },
  'copy.done': { zh: '已复制', en: 'Copied' },
  'copy.success': { zh: '{label}已复制到剪贴板', en: '{label} copied to clipboard' },
  'copy.fail': { zh: '复制失败，请手动复制：{value}', en: 'Couldn’t copy. Please copy it manually: {value}' },

  'rating.heading': { zh: '看完之后，<br />为这片星河留一颗星。', en: 'Before you go,<br />leave a star in this galaxy.' },
  'rating.groupLabel': { zh: '为作品集评分，满分五星', en: 'Rate this portfolio out of five stars' },
  'rating.star': { zh: '{n} 星', en: '{n} star' },
  'rating.stars': { zh: '{n} 星', en: '{n} stars' },
  'rating.prompt': { zh: '选择一颗星完成评分', en: 'Pick a star to rate' },
  'rating.thanks': { zh: '谢谢你的 {n} 星评分！你可以随时修改。', en: 'Thanks for the {n}-star rating! You can change it any time.' },
  'rating.saveFail': { zh: '暂时无法保存评分，请检查浏览器是否允许本地存储。', en: 'Couldn’t save your rating. Please check that this browser allows local storage.' },
  'rating.removed': { zh: '评分已撤回。', en: 'Rating removed.' },
  'rating.removeFail': { zh: '暂时无法撤回评分，请稍后再试。', en: 'Couldn’t remove your rating. Please try again.' },
  'rating.restored': { zh: '已恢复刚才的评分。', en: 'Your rating is back.' },
  'rating.restoreFail': { zh: '暂时无法恢复评分，请重新选择星星。', en: 'Couldn’t restore your rating. Please pick a star again.' },
  'rating.remove': { zh: '撤回评分', en: 'Remove rating' },
  'rating.undo': { zh: '撤销', en: 'Undo' },
  'form.label': { zh: '评价或提升建议（选填）', en: 'Comments or suggestions (optional)' },
  'form.placeholder': { zh: '哪一部分打动了你？还有什么可以做得更好？', en: 'What stood out to you? What could be better?' },
  'form.submit': { zh: '提交反馈 <span>↗</span>', en: 'Send feedback <span>↗</span>' },
  'form.sending': { zh: '提交中 <span>···</span>', en: 'Sending <span>···</span>' },
  'form.again': { zh: '重新填写 <span>↻</span>', en: 'Write another <span>↻</span>' },
  'form.needRating': { zh: '请先为作品集选择 1—5 星评分。', en: 'Please give the portfolio a 1–5 star rating first.' },
  'form.success': { zh: '谢谢你的评分与建议，这会帮助我继续改进作品集。', en: 'Thank you for the rating and feedback — it helps me keep improving this portfolio.' },
  'galaxy.feedbackLabel': { zh: '观众留下的星光', en: 'Stars left by viewers' },
  'galaxy.waiting': { zh: '等待第一颗星落入这里', en: 'Waiting for the first star to land here' },
  'galaxy.received': { zh: '这片星河已收到 {n} 颗星光', en: 'This galaxy has received {n} stars' },

  'data.title': { zh: '当前浏览器评分与建议', en: 'Ratings and comments in this browser' },
  'data.average': { zh: '平均分', en: 'Average' },
  'data.count': { zh: '评分数', en: 'Ratings' },
  'data.updated': { zh: '最近更新', en: 'Last updated' },
  'data.latest': { zh: '最近评价：', en: 'Latest comment: ' },
  'data.none': { zh: '尚未提交评价或建议。', en: 'No comments or suggestions yet.' },
  'data.note': { zh: '当前为本地预览版，只记录这个浏览器的数据。接入数据库后可汇总所有访客反馈。', en: 'This preview only stores data from this browser. Connecting a database would collect feedback from every visitor.' },
}

function readStoredLang() {
  try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
}

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang')
  if (LANGS.includes(fromUrl)) return fromUrl
  const stored = readStoredLang()
  if (LANGS.includes(stored)) return stored
  const browser = (navigator.languages?.[0] || navigator.language || 'zh').toLowerCase()
  return browser.startsWith('zh') ? 'zh' : 'en'
}

let current = initialLang()
const listeners = new Set()

export function getLang() { return current }

export function t(key, vars = {}) {
  const entry = copy[key]
  if (!entry) return key
  const text = entry[current] ?? entry.zh
  return text.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? vars[name] : `{${name}}`))
}

// Pick the localized field of a project (falls back to the Chinese source).
export function localize(project, field) {
  if (current === 'en' && project.en && project.en[field] !== undefined) return project.en[field]
  return project[field]
}

export function applyStaticCopy(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n) })
  root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml) })
  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((part) => part.trim())
      if (attr && key) el.setAttribute(attr, t(key, { n: el.dataset.i18nN }))
    })
  })
  document.documentElement.lang = current === 'en' ? 'en' : 'zh-CN'
  document.title = t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  document.querySelectorAll('[data-lang-option]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.langOption === current))
  })
}

export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return
  current = lang
  try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  const url = new URL(location.href)
  if (lang === 'en') url.searchParams.set('lang', 'en')
  else url.searchParams.delete('lang')
  history.replaceState(history.state, '', url)
  applyStaticCopy()
  listeners.forEach((fn) => fn(lang))
}

export function onLangChange(fn) { listeners.add(fn) }
