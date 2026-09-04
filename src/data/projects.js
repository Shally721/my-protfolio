export const projects = [
  {
    id: 'pizza', index: '01', title: 'Global Pizza Camp', subtitle: '世界披萨阵营营销活动页',
    summary: '把 AI 识别饮食的项链与全球披萨玩法连接，设计一段从探索、表态到自然留存的品牌旅程。',
    tags: ['0→1 概念设计', '国际化', '全链路交互设计', '多端适配'], meta: '2026 · WEB + MOBILE', pages: 14, orbitAngle: 90,
    media: { type: 'video', src: './assets/pizza-demo.mp4', poster: './assets/pizza-cover.png', label: 'Pizza 交互录屏' },
    liveUrl: 'https://pizza-test.odyss.life/',
  },
  {
    id: 'amber', index: '02', title: 'City Amber', subtitle: '小红书城市情感记忆地图',
    summary: '将城市里的情感瞬间变成可探索的地理坐标，打通情感留存与本地生活商业闭环。',
    tags: ['本地生活', '用研驱动决策', '业务增长导向', '创新设计'], meta: '2026 · PRODUCT CONCEPT', pages: 22, orbitAngle: 330,
    media: { type: 'image', src: './assets/amber-cover.png', label: 'City Amber 视觉方案' },
  },
  {
    id: 'timu', index: '03', title: 'Meet Timu', subtitle: '变色龙健康习惯伴侣',
    summary: '用光呼吸代替通知，用城堡崩塌对抗拖延，让健康习惯成为看得见的成就。',
    tags: ['AIGC 工作流', '情感设计', '0→1 概念设计', '软硬件协同'], meta: '2025—2026 · PRODUCT + DEVICE', pages: 16, orbitAngle: 210,
    media: { type: 'image', src: './assets/timu-cover.png', label: 'Timu AI 沉浸式任务场景' },
  },
]

export const projectSlides = {
  pizza: [['01-1504','项目概览'],['02-1708','设计主张'],['03-1404','项目目标'],['04-1432','PRD 与业务任务'],['05-1465','方向探索'],['06-1526','核心隐喻'],['07-1543','体验步骤'],['08-1596','方案价值'],['09-1693','多端方案'],['10-1601','设计决策'],['11-1621','机制完善'],['12-1657','交互细节'],['13-1676','完整体验'],['14-1575','项目总结']],
  amber: [['01-90','项目封面'],['02-113','体验走查'],['03-178','提出假设'],['04-153','用研验证假设'],['05-191','竞品分析'],['06-288','目标推导'],['07-506','设计挑战'],['08-533','初期挑战'],['09-589','解决方案'],['10-682','核心挑战'],['11-631','解决方案'],['12-421','核心流程'],['13-326','设计总览 01'],['14-368','设计总览 02'],['15-370','设计总览 03'],['16-479','迭代过程'],['17-389','具体感受选择'],['18-411','情绪具体细节 01'],['19-413','情绪具体细节 02'],['20-415','FLOW B-1'],['21-417','FLOW B-2'],['22-419','FLOW B-3']],
  timu: [['01-715','项目封面'],['02-1226','提出假设'],['03-1232','研究重点'],['04-1137','竞品分析'],['05-1025','目标用户'],['06-741','设计策略'],['07-853','设计产出 01'],['08-896','设计产出 02'],['09-905','设计产出 03'],['10-929','AI 融入方案 01'],['11-806','设计产出 04'],['12-830','设计产出 05'],['13-873','设计产出 06'],['14-958','AI 融入方案 02'],['15-994','AI 工作流'],['16-1080','用户测试']],
}

export const defaultStarAngles = Object.fromEntries(projects.map((project, index) => [
  project.id,
  Number.isFinite(project.orbitAngle) ? project.orbitAngle : (90 + index * 360 / projects.length) % 360,
]))
