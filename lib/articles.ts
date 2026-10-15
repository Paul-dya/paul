import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { marked } from 'marked';

export type Article = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  summary: string;
  html: string;
};

const DIR = path.join(process.cwd(), 'content', 'articles');

/** 文件名 → 稳定 URL：kebab 英文原名；非 ASCII 名映射为 a-<sha1 前 10 位> */
function asciiSlug(name: string): string {
  if (/^[a-z0-9-]+$/i.test(name)) return name.toLowerCase();
  return 'a-' + crypto.createHash('sha1').update(name, 'utf8').digest('hex').slice(0, 10);
}

/** 极简 frontmatter 解析：--- 包裹的 key: value 行 */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: raw.slice(m[0].length) };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md');
  const articles = files.map((file) => {
    const name = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug: asciiSlug(name),
      title: meta.title || name,
      date: meta.date || '0000-00-00',
      tags: (meta.tags || '')
        .split(/[,，]/)
        .map((t) => t.trim())
        .filter(Boolean),
      summary: meta.summary || '',
      html: marked.parse(body, { async: false }) as string,
    };
  });
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}
