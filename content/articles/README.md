# 文章（content/articles/）

每个 `.md` 文件 = 一篇博客文章。新增/修改/删除文件后 `git push`，Vercel 自动重新发布，
首页"最近的文章"与文章列表页自动更新，无需改代码。

## 文件命名

- 推荐英文小写连字符：`how-to-draw-one-map.md`（URL 即 `/blog/how-to-draw-one-map`）
- 中文文件名也可以：会自动映射成稳定哈希 URL（`a-xxxxxxxxxx`），改文件名会换 URL（旧链接 404），所以尽量不改名

## 格式

```markdown
---
title: 文章标题
date: 2026-10-20
tags: 标签一, 标签二
summary: 一句话摘要（列表页显示）
---

正文写在这里，标准 Markdown：
## 二级标题
段落、**加粗**、[链接](https://...)、列表、> 引用、`行内代码`
```

frontmatter 四行都必填（title/date/tags/summary）；`date` 用 `YYYY-MM-DD`，
列表按日期倒序排列。
