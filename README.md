# Paul · 个人主页

个人主页 + 博客：自我介绍、MedHub 知识作品入口、文章（Markdown）。

- **技术栈**：Next.js（App Router，TypeScript）+ 纯 CSS（暖色纸感风格，区别于 MedHub），全 SSG、零后端
- **部署**：GitHub（SSH）→ Vercel 自动构建；`git push` 即上线
- **内容**：`content/articles/*.md`（新增文章 = 新建 md 文件 + push）

## 本地开发

```powershell
cd <本目录>
npm install          # 首次
npm run dev          # http://localhost:3000（改文件自动刷新）
# 或生产模式：
npm run build
npm run start -- -p 3100
```

## 改内容

| 想改什么 | 改哪里 |
|---|---|
| 署名 / 一句话介绍 / 链接（小红书、GitHub、MedHub） | `lib/site.ts` |
| 知识作品卡片（标题、说明、链接） | `lib/site.ts` → `WORKS` |
| 首页/文章页文案 | `app/page.tsx`、`app/blog/**` |
| 配色与排版 | `app/globals.css`（顶部 `:root` 变量） |
| 新增文章 | `content/articles/新文章.md`（格式见该目录 README） |

## 发布

```powershell
git add -A
git commit -m "说明"
git push            # 远端已配 SSH：git@github.com:Paul-dya/paul.git
```

Vercel 约 1–2 分钟内完成构建部署。
