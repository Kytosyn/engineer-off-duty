// Refreshes src/social.json with the latest posts and follower counts.
// Uses public pages only. Fails soft: on any problem the old values stay.
import { readFile, writeFile } from 'node:fs/promises'

const FILE = new URL('../src/social.json', import.meta.url)
const IG_USER = '_engineeroffduty'
const TT_USER = 'engineeroffduty'
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'

async function get(url, ua) {
  const res = await fetch(url, { headers: { 'user-agent': ua, 'accept-language': 'en-US,en' }, signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
}

// IG shortcodes map to time-ordered media ids, so bigger = newer.
const IG_ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const igId = code => [...code].reduce((n, c) => n * 64n + BigInt(IG_ALPHA.indexOf(c)), 0n)

async function instagram() {
  const out = {}
  try {
    const html = await get(`https://www.instagram.com/${IG_USER}/`, 'facebookexternalhit/1.1')
    const m = html.match(/content="([\d,.]+[KM]?) Followers/)
    if (m && !/[KM]/.test(m[1])) out.followers = Number(m[1].replace(/[,.]/g, ''))
  } catch (e) { console.warn('IG followers:', e.message) }
  try {
    const html = await get(`https://www.instagram.com/${IG_USER}/`, 'Googlebot/2.1')
    const codes = [...new Set([...html.matchAll(/\/(?:p|reel)\/([A-Za-z0-9_-]{10,12})\//g)].map(m => m[1]))]
    codes.sort((a, b) => (igId(b) > igId(a) ? 1 : -1))
    if (codes.length >= 3) out.posts = codes.slice(0, 3)
  } catch (e) { console.warn('IG posts:', e.message) }
  return out
}

// TikTok video ids carry the upload time in the top 32 bits, so bigger = newer.
async function tiktok() {
  const out = {}
  try {
    const html = await get(`https://www.tiktok.com/embed/@${TT_USER}`, BROWSER_UA)
    const f = html.match(/"followerCount":(\d+)/)
    if (f) out.followers = Number(f[1])
    const list = html.match(/"videoList":\[(.*?)\]\s*,\s*"/s)
    const ids = [...new Set([...(list ? list[1] : '').matchAll(/"id":"(\d{18,20})"/g)].map(m => m[1]))]
    ids.sort((a, b) => (BigInt(b) > BigInt(a) ? 1 : -1))
    if (ids.length >= 3) out.posts = ids.slice(0, 3)
  } catch (e) { console.warn('TikTok:', e.message) }
  return out
}

const data = JSON.parse(await readFile(FILE, 'utf8'))
const next = structuredClone(data)
const [ig, tt] = await Promise.all([instagram(), tiktok()])
for (const [k, v] of [['instagram', ig], ['tiktok', tt]]) {
  if (v.followers > 0) next.followers[k] = v.followers
  else console.warn(`${k}: no usable follower count, keeping ${data.followers[k]}`)
  if (v.posts?.length === 3) next.embeds[k] = v.posts
  else console.warn(`${k}: no usable post list, keeping old ids`)
}
const changed = JSON.stringify(next.followers) !== JSON.stringify(data.followers) || JSON.stringify(next.embeds) !== JSON.stringify(data.embeds)
if (changed) {
  next.updated = new Date().toISOString()
  await writeFile(FILE, JSON.stringify(next, null, 2) + '\n')
  console.log('Updated social.json', JSON.stringify(next))
} else console.log('No changes')
