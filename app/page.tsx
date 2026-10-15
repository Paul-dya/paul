import Link from 'next/link';
import { SITE, WORKS } from '@/lib/site';
import { getArticles } from '@/lib/articles';

export default function HomePage() {
  const latest = getArticles().slice(0, 3);

  return (
    <div className="container">
      <section className="hero">
        <h1>
          {SITE.name}
          <span className="hero-dot">.</span>
        </h1>
        <p className="hero-tagline">{SITE.tagline}</p>
        <p className="hero-desc">
          我在做的事：把厚厚的医学课本，压成一张能点、能查、能全屏看的知识图。
          这里是入口——作品集、更新日志，都在下面。
        </p>
        <div className="hero-actions">
          <a href={SITE.medhub} target="_blank" rel="noreferrer" className="btn btn-primary">
            进入 MedHub 知识库
          </a>
          <a href={SITE.xhs} target="_blank" rel="noreferrer" className="btn btn-ghost">
            小红书 · 更多动态
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">知识作品</h2>
        <p className="section-sub">
          整门课的可视化知识网页，托管在 {SITE.medhubName}
          ，内容持续更新（以下链接随 MedHub 发布自动生效）。
        </p>
        <div className="work-grid">
          {WORKS.map((w) => (
            <a key={w.title} href={w.href} target="_blank" rel="noreferrer" className="work-card">
              <h3>{w.title}</h3>
              <p>{w.note}</p>
              <span className="work-go">打开 →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">最近的文章</h2>
        <div className="article-list">
          {latest.length === 0 && (
            <p className="empty">还没有文章，先把网站搭起来。</p>
          )}
          {latest.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="article-row">
              <span className="article-date">{a.date}</span>
              <span className="article-main">
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </span>
            </Link>
          ))}
        </div>
        <Link href="/blog" className="more-link">
          全部文章 →
        </Link>
      </section>

      <section className="section">
        <h2 className="section-title">关于我</h2>
        <div className="about-card">
          <p>
            你好，我是 {SITE.name}。医学在读，喜欢把复杂的东西讲简单。
            做知识网页的起因很朴素：自己背书时发现，一张结构清晰的图比十页
            文字记得牢——于是把每门课重做了一遍。
          </p>
          <p>
            这里的文章记录制作过程、医学学习方法和一些随想。
            知识内容的正式版都在 {SITE.medhubName}。
          </p>
          <p className="about-links">
            <a href={SITE.xhs} target="_blank" rel="noreferrer">小红书 · 日常与预告</a>
            <a href={SITE.github} target="_blank" rel="noreferrer">GitHub · 开源与项目</a>
          </p>
        </div>
      </section>
    </div>
  );
}
