#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(__dirname, 'indexnow-key.json'), 'utf8'));

const DEFAULT_URLS = [
  'https://blog.blacnova.net/',
  'https://blog.blacnova.net/blogs/what-blacnova-does-differently/',
  'https://blog.blacnova.net/blogs/website-design-las-cruces-mesilla/',
  'https://blog.blacnova.net/blogs/las-cruces-get-found-online/',
  'https://blog.blacnova.net/blogs/who-needs-a-website/',
  'https://blog.blacnova.net/blogs/types-of-websites/',
  'https://blog.blacnova.net/blogs/about-blacnova/',
  'https://blog.blacnova.net/sitemap.xml',
  'https://blog.blacnova.net/feed.xml',
];

const argUrls = process.argv.slice(2).filter((u) => u.startsWith('http'));
const urlList = argUrls.length ? argUrls : DEFAULT_URLS;

const payload = {
  host: cfg.host,
  key: cfg.key,
  keyLocation: cfg.keyLocation,
  urlList,
};

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

let ok = 0;
for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    console.log(`${endpoint} → ${res.status} ${body.slice(0, 200)}`);
    if (res.status === 200 || res.status === 202) ok += 1;
  } catch (err) {
    console.error(`${endpoint} → error:`, err.message);
  }
}

console.log(`Submitted ${urlList.length} URL(s). ${ok}/${endpoints.length} endpoints accepted.`);
process.exit(ok > 0 ? 0 : 1);
