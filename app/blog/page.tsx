import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '文章',
  description: 'Paul 的文章：知识网页制作过程、医学学习方法与随想。',
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="container narrow">
      <header className="page-head">
        <h1>文章</h1>
        <p>知识网页的制作手记、学习方法与随想。共 {articles.length} 篇。</p>
      </header>
      <div className="article-list">
        {articles.length === 0 && (
          <p className="empty">还没有文章。在 content/articles/ 里新建一个 .md 文件，push 后即自动出现。</p>
        )}
        {articles.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="article-row">
            <span className="article-date">{a.date}</span>
            <span className="article-main">
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              {a.tags.length > 0 && (
                <span className="article-tags">
                  {a.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
