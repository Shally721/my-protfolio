export const projects = [
  {
    id: 'pizza', index: '01', title: 'Global Pizza Camp', subtitle: '世界披萨阵营营销页（实习项目）',
    summary: '用「披萨盒盲盒」做探索入口，配合无限画布与冷启动排行，把 AI 饮食项链品牌讲成一段从探索、表态到留资的旅程；核心框架已被官网沿用。',
    tags: ['0→1 概念设计', '视觉与交互表现', '全链路交互设计', '国际化'], meta: '2026 · WEB + MOBILE', pages: 16, orbitAngle: 90,
    media: { type: 'video', src: './assets/pizza-demo.mp4', poster: './assets/pizza-cover.png', label: 'Pizza 交互录屏' },
    liveUrl: 'https://pizza-test.odyss.life/',
  },
  {
    id: 'ifa', index: '02', title: 'ODYSS × IFA 2026', subtitle: '智能项链德国 IFA 展会沉浸式 Demo',
    summary: '为 ODYSS 智能项链设计 IFA 2026 展会 Demo：用 8 个真实生活角色替代繁琐建档，配合预填充数据与锁屏 Live Activity，让观众在 5 分钟内体验无感饮食追踪的完整价值。',
    tags: ['系统思维', '叙事设计', '全链路交互设计'], meta: '2026 · IFA BERLIN · APP DEMO', pages: 12, orbitAngle: 30,
    media: { type: 'image', src: './assets/slides/ifa/01-cover.png', label: 'ODYSS × IFA 2026 项目封面', ratio: '3840 / 2160' },
  },
  {
    id: 'components', index: '03', title: 'Odyss Components', subtitle: 'AI 软硬件产品Odyss组件库搭建',
    summary: '为 AI 软硬件产品整理统一的组件语言，从 Button、Alert 到 Toast，覆盖组件类型、交互状态、布局规则与动效参数，建立可复用、可落地的设计规范。',
    tags: ['设计规范', '组件库搭建', '交互状态', '动效参数'], meta: '2026 · DESIGN SYSTEM', pages: 3, orbitAngle: 150,
    media: { type: 'image', src: './assets/component-library/buttons@2x.png', label: 'Odyss Components Button 组件规范' },
  },
  {
    id: 'amber', index: '04', title: 'City Amber', subtitle: '小红书城市情感记忆地图',
    summary: '将城市里的情感瞬间变成可探索的地理坐标，打通情感留存与本地生活商业闭环。',
    tags: ['本地生活', '用研驱动决策', '业务增长导向', '创新设计'], meta: '2026 · PRODUCT CONCEPT', pages: 22, orbitAngle: 330,
    media: { type: 'image', src: './assets/amber-cover.png', label: 'City Amber 视觉方案', ratio: '2172 / 1442' },
  },
  {
    id: 'timu', index: '05', title: 'Meet Timu', subtitle: '变色龙健康习惯伴侣',
    summary: '用光呼吸代替通知，用城堡崩塌对抗拖延，让健康习惯成为看得见的成就。',
    tags: ['AIGC 工作流', '情感设计', '0→1 概念设计', '软硬件协同'], meta: '2025—2026 · PRODUCT + DEVICE', pages: 16, orbitAngle: 210,
    media: { type: 'image', src: './assets/slides/timu/01-715.png', label: 'Meet Timu 项目封面', ratio: '3840 / 2160' },
  },
]

export const projectSlides = {
  pizza: [['01-overview','项目概览'],{ kind: 'video', label: 'FINAL SOLUTION', title: '最终方案：打开披萨盒子', src: './assets/pizza-demo-web.mp4', poster: './assets/pizza-cover.png' },['02-starting-point','设计发力点'],['03-competitors','竞品分析'],['04-cross-reference','跨界参考'],['05-explorations','方向探索'],['06-final-solution','最终方案：披萨盒子隐喻'],['07-interaction-flow','体验节奏'],['08-highlight-box-hover','设计亮点一：盲盒探索'],['09-highlight-box-drop','设计亮点一：掉落对应阵营'],['10-highlight-canvas','设计亮点二：无限画布'],['11-highlight-ranking','设计亮点三：排行榜逻辑'],['12-flow-upload','核心流程：上传披萨'],['13-flow-result-share','核心流程：结果与分享'],['14-business-value','设计如何支撑业务目标'],['15-project-result','项目效果']],
  ifa: [['01-cover','项目封面'],['02-problem','提出问题'],['03-goal-analysis','目标定义'],['04-scene-insight','场景洞察'],['05-design-direction','设计方向'],['06-experience-flow','整体体验流程'],['07-onboarding','策略 1：缩减 Onboarding 流程'],['08-persona-play','策略 2：8 角色扮演'],['09-daily-flow','策略 3：已经在生活中的时刻'],['10-live-activity','Live Activity 硬件价值证明'],['11-layered-report','分层报告'],['12-design-review','设计复盘']],
  components: [['component-library/buttons@2x','Button 组件规范'],['component-library/alert@2x','Alert 弹窗规范'],['component-library/toast@2x','Toast 轻提示规范']],
  amber: [['01-90','项目封面'],['02-113','体验走查'],['03-178','提出假设'],['04-153','用研验证假设'],['05-191','竞品分析'],['06-288','目标推导'],['07-506','设计挑战'],['08-533','初期挑战'],['09-589','解决方案'],['10-682','核心挑战'],['11-631','解决方案'],['12-421','核心流程'],['13-326','设计总览 01'],['14-368','设计总览 02'],['15-370','设计总览 03'],['16-479','迭代过程'],['17-389','具体感受选择'],['18-411','情绪具体细节 01'],['19-413','情绪具体细节 02'],['20-415','FLOW B-1'],['21-417','FLOW B-2'],['22-419','FLOW B-3']],
  timu: [['01-715','项目封面'],['02-1226','提出问题'],['03-1232','研究问题'],['04-1137','竞品分析'],['05-1025','用户研究'],['06-741','设计策略'],['07-853','设计产出：AI 沉浸式任务场景'],['08-896','设计产出：长期留存如何实现 01'],['09-905','设计产出：长期留存如何实现 02'],['10-929','AI 融入方案'],['11-806','设计产出：健身流程'],['12-830','设计产出：专注流程'],['13-873','设计产出：分心如何被打断'],['14-958','AI 工作流 01'],['15-994','AI 工作流 02'],['16-1080','用户测试']],
}

export const defaultStarAngles = Object.fromEntries(projects.map((project, index) => [
  project.id,
  Number.isFinite(project.orbitAngle) ? project.orbitAngle : (90 + index * 360 / projects.length) % 360,
]))
