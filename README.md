# 江晓丽作品集

这是一个基于 Vite 的静态作品集网站。作品数据与页面逻辑已经分开，后续添加项目时不会覆盖现有作品。

## 本地预览

```bash
npm install
npm run dev
```

## 发布到 Vercel

1. 将整个项目文件夹上传到 GitHub 仓库。
2. 在 Vercel 中导入该仓库。
3. 使用以下构建设置：
   - Build Command：`npm run build`
   - Output Directory：`dist`
4. 之后每次推送到 GitHub，Vercel 都会创建新的部署版本；需要时可以在 Deployments 中回滚。

## 添加新项目

1. 打开 `src/data/projects.js`，在 `projects` 数组末尾追加一个对象。
2. 为项目使用唯一的 `id`，例如 `new-project`；`index` 使用下一个编号。
3. 在同一个文件的 `projectSlides` 中添加相同 `id` 的页面列表。
4. 将详情页图片放进 `src/assets/slides/new-project/`，文件名与页面列表中的文件名一致。
5. 可选填写 `orbitAngle`（0—359），用于控制首页星星的初始位置；不填写时会自动分配位置。

项目列表、作品总数、首页星星、作品详情页和“下一个项目”按钮都会根据数据自动更新。若暂时没有详情页图片，网站会显示“作品内容正在整理中”，不会导致页面报错。

## 评分数据

目前评分和留言保存在访客浏览器的本地存储中，适合静态预览。若要汇总所有访客的评分，需要再接入 Supabase、Firebase 等数据库服务。
