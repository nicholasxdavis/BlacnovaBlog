#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const requiredRoot = [
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'humans.txt',
  'ai.txt',
  'feed.xml',
  'site.webmanifest',
  'CNAME',
  '.nojekyll',
  '46b6af37-9b5b-4e2d-aa49-f4fd87f3d164.txt',
  '.well-known/security.txt',
];

const issues = [];
const ok = [];

for (const f of requiredRoot) {
  if (existsSync(join(ROOT, f))) ok.push(`root:${f}`);
  else issues.push(`MISSING ${f}`);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(ROOT);
for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replaceAll('\\', '/');
  if (rel === '404.html') continue;
  const html = readFileSync(file, 'utf8');
  if (!html.includes('rel="canonical"')) issues.push(`${rel}: missing canonical`);
  if (!/application\/ld\+json/.test(html)) issues.push(`${rel}: missing JSON-LD`);
}

// sitemap should list every blog post folder
const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const posts = readdirSync(join(ROOT, 'blogs')).filter((n) =>
  statSync(join(ROOT, 'blogs', n)).isDirectory()
);
for (const slug of posts) {
  if (!sitemap.includes(`/blogs/${slug}/`)) issues.push(`sitemap missing blogs/${slug}/`);
}

console.log(`SEO audit — checked ${htmlFiles.length} HTML files, ${posts.length} posts`);
for (const line of ok) console.log(`  OK  ${line}`);
if (issues.length) {
  console.log('\nIssues:');
  for (const i of issues) console.log(`  !!  ${i}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
