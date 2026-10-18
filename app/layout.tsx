import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { default: `${SITE.name} · 个人主页`, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="topbar">
          <div className="container topbar-inner">
            <Link href="/" className="brand">
              {SITE.name}
              <span className="brand-dot">.</span>
            </Link>
            <nav className="topnav">
              <Link href="/">主页</Link>
              <Link href="/blog">文章</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-inner">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <span className="footer-links">
              <a href={SITE.xhs} target="_blank" rel="noreferrer">小红书</a>
              <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={SITE.douyin} target="_blank" rel="noreferrer">抖音</a>
              <span title="微信搜索该公众号名称关注">公众号：{SITE.wechat}</span>
              <a href={SITE.medhub} target="_blank" rel="noreferrer">{SITE.medhubName}</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
