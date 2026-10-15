import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/articles';

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: '未找到' };
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="container narrow">
      <article className="post">
        <header className="post-head">
          <h1>{article.title}</h1>
          <div className="post-meta">
            <time dateTime={article.date}>{article.date}</time>
            {article.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        <footer className="post-foot">
          <Link href="/blog">← 返回文章列表</Link>
        </footer>
      </article>
    </div>
  );
}
