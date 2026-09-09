import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    id: 'pizza',
    index: '01',
    title: 'Global Pizza Camp',
    subtitle: '世界披萨阵营营销活动页',
    summary: '把 AI 识别饮食的项链与全球披萨玩法连接，设计一段从探索、表态到自然留存的品牌旅程。',
    tags: ['0→1 概念设计', '国际化', '全链路交互设计', '多端适配'],
    meta: '团队项目 · C 端 · Web + 移动端 · 2026.08',
    accent: 'coral',
    details: ['用“堆叠披萨盒”物理隐喻组织空间叙事', '将邮箱从准入门槛重构为披萨身份卡行囊', '探索、搜索、表态驱动自愿留存，减少打扰式转化'],
  },
  {
    id: 'amber',
    index: '02',
    title: 'City Amber',
    subtitle: '小红书城市情感记忆地图',
    summary: '将城市里的情感瞬间变成可探索的地理坐标，打通情感留存与本地生活商业闭环。',
    tags: ['本地生活', '用研驱动决策', '业务增长导向', '创新设计'],
    meta: '个人独立项目 · 概念设计 · C 端 · 2026.03–04',
    accent: 'amber',
    details: ['7 人深访与竞品分析，识别“存坐标不存感受”的缺口', '重建统一 6 色情绪体系，恢复多人叠加后的地图可读性', '推导情感数据 → LBS 唤起复访 → 线下转化的商业飞轮'],
  },
  {
    id: 'timu',
    index: '03',
    title: 'Meet Timu',
    subtitle: '变色龙健康习惯伴侣',
    summary: '用光呼吸代替通知，用城堡崩塌对抗拖延，让健康习惯成为看得见的成就。',
    tags: ['AIGC 工作流', '情感设计', '0→1 概念设计', '全链路交互设计'],
    meta: '团队项目 · 软硬件协同 · 2025.10–2026.02',
    accent: 'violet',
    details: ['以颜色感知状态，用实体光信号替代弹窗通知', '完成健身城堡加砖，超时刷手机触发城堡崩塌', '跑通 GPT Image → RodinAI → Figma Make → Codex 的工作流'],
  },
]

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState('idle')
  const [error, setError] = useState('')

  const active = useMemo(() => projects.find((item) => item.id === activeProject), [activeProject])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('请完整填写姓名、邮箱和留言。')
      setFormState('error')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('邮箱格式似乎不正确，请检查后再试。')
      setFormState('error')
      return
    }
    setFormState('loading')
    window.setTimeout(() => setFormState('success'), 650)
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => scrollTo('home')} aria-label="回到首页">XIAOLI<span>·</span>JIANG</button>
        <nav aria-label="主导航">
          <button onClick={() => scrollTo('works')}>作品</button>
          <button onClick={() => scrollTo('about')}>关于我</button>
          <button onClick={() => scrollTo('contact')}>联系方式</button>
        </nav>
        <span className="availability"><i /> Available for opportunities</span>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">INTERACTION DESIGNER · MILAN</p>
            <h1>把情感洞察，<br /><em>变成真实发生的体验。</em></h1>
            <p className="hero-intro">我是江晓丽，一名在米兰理工大学攻读数字交互设计的设计师。用研究理解人，用叙事连接产品，用 AI 工作流让想法更快落地。</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollTo('works')}>查看作品 <span>↓</span></button>
              <button className="text-button" onClick={() => scrollTo('contact')}>和我聊聊 <span>↗</span></button>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true"><span>情</span><span>感</span><span>洞</span><span>察</span></div>
        </section>

        <section className="section works" id="works">
          <div className="section-heading"><p className="eyebrow">SELECTED WORKS</p><h2>三个项目，<br />三种靠近用户的方式。</h2></div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.id}>
                <button className="project-visual" onClick={() => setActiveProject(project.id)} aria-label={`查看 ${project.title} 项目详情`}>
                  <span className="project-number">{project.index}</span>
                  <span className="visual-word">{project.id === 'pizza' ? 'PIZZA' : project.id === 'amber' ? 'AMBER' : 'TIMU'}</span>
                  <span className="visual-orbit" />
                </button>
                <div className="project-body">
                  <p className="project-meta">{project.meta}</p>
                  <h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-summary">{project.summary}</p>
                  <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <button className="project-link" onClick={() => setActiveProject(project.id)}>查看项目详情 <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading"><p className="eyebrow">ABOUT ME</p><h2>有同理心，<br />更有方法论。</h2></div>
          <div className="about-layout">
            <div className="about-lede"><p>通过深度访谈和行为观察，识别用户说不清楚的情感需求，并将其转化为可执行的设计机会点。</p><p>不只停留在“用户很喜欢”，而是追问背后为什么，找到真正驱动行为的动因。</p><div className="skill-cloud">{['用研驱动决策','情感洞察','商业逻辑','叙事策略','国际协作','AIGC 工作流'].map((skill) => <span key={skill}>{skill}</span>)}</div></div>
            <div className="about-details">
              <div><h3>教育背景</h3><div className="detail-row"><strong>米兰理工大学</strong><span>2025.09 — 2027.07</span><p>数字交互设计硕士（在读）</p></div><div className="detail-row"><strong>北京印刷学院</strong><span>2018.09 — 2022.07</span><p>视觉传达设计 · 展示设计方向</p></div></div>
              <div><h3>荣誉与经历</h3><p className="plain-list">2024 UX Design Award 国际提名奖<br />欧莱雅 Brandstorm 中国赛区 TOP8<br />国家奖学金 · 专业综合排名 1/260<br />深圳市心感智影科技有限公司 · 产品体验设计</p></div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy"><p className="eyebrow">LET'S CONNECT</p><h2>有项目想聊？<br /><em>我在这里。</em></h2><p>目前坐标米兰，可远程面试。欢迎找我聊聊，期待一起共事。</p><div className="contact-links"><a href="mailto:jiangxiaoli721@gmail.com">jiangxiaoli721@gmail.com <span>↗</span></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>你的称呼<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="怎么称呼你？" disabled={formState === 'loading'} /></label>
            <label>邮箱地址<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" disabled={formState === 'loading'} /></label>
            <label>想聊的内容<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="项目背景、合作方式，或者一句问候" rows="4" disabled={formState === 'loading'} /></label>
            {error && <p className="form-feedback error" role="alert">{error}</p>}
            {formState === 'success' ? <div className="form-feedback success" role="status">谢谢你的留言，我会尽快回复你。</div> : <button className="button button-dark submit-button" disabled={formState === 'loading'}>{formState === 'loading' ? '发送中…' : '发送留言 ↗'}</button>}
            {formState === 'success' && <button type="button" className="text-button reset-button" onClick={() => { setForm({ name: '', email: '', message: '' }); setFormState('idle') }}>再发一条</button>}
          </form>
        </section>
      </main>

      <footer><span>© 2026 Jiang Xiaoli</span><span>Designed with curiosity, built with care.</span><button onClick={() => scrollTo('home')}>回到顶部 ↑</button></footer>

      {active && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActiveProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭项目详情">×</button><p className="eyebrow">PROJECT {active.index}</p><h2 id="modal-title">{active.title}</h2><p className="modal-subtitle">{active.subtitle}</p><p>{active.summary}</p><ul>{active.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><div className="tag-list">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
