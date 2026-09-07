// Renders a voiceover TIMING preview — the real video with the spoken line
// revealed word by word at reading pace, and the music ducked to where it
// would sit under a voice.
//
// There is no synthetic voice here on purpose: an en-US or en-GB model
// mispronounces NQF, SAQA and B-BBEE, which costs more credibility than
// silence. This preview answers the only question that blocks recording —
// does each line actually fit its scene? — so a person can be booked with
// confidence.
//
//   node render-vo-preview.mjs 2      -> preview for post 2

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { plan, videoHtml, durationOf, repoRoot, W, H, FPS } from './video.mjs'

const WPS = 2.5          // matches make-vo-script.mjs
const HEADROOM = 0.5
const DUCKED_LUFS = -24  // where music sits under a voice

const id = Number(process.argv[2] || 2)
const post = plan.posts.find((p) => p.id === id)
if (!post) throw new Error(`no post ${id}`)

const OUT = process.env.PT_PREVIEW_DIR || '/tmp'
mkdirSync(OUT, { recursive: true })
const outFile = resolve(OUT, `post-${String(id).padStart(2, '0')}-vo-timing-preview.mp4`)

/** Same line selection as the recording script, so the two cannot disagree. */
function lineFor(scene) {
  switch (scene.kind) {
    case 'logo': return 'Prestige Tutelage.'
    case 'statement': case 'photo': return scene.text
    case 'list': return [scene.text, ...(scene.items || [])].filter(Boolean).join('. ') + '.'
    case 'rows': case 'steps': return (scene.items || []).join('. ') + '.'
    case 'facts': return (scene.items || []).map((i) => i.split('|').join(', ')).join('. ') + '.'
    case 'contact': return [scene.text, ...(scene.items || [])].join('. ')
    case 'cta': return scene.text
    default: return ''
  }
}

let t0 = 0
const cues = post.videoScenes.map((s) => {
  const start = t0
  t0 += s.seconds
  const line = lineFor(s)
  const need = line.trim().split(/\s+/).filter(Boolean).length / WPS
  return { start, end: t0, line, need, budget: s.seconds, tight: need > s.seconds - HEADROOM }
})
const seconds = durationOf(post)

// Inject the caption band and a per-frame reveal driven by the same clock the
// video already uses, so the words track the visuals exactly.
const overlay = `
<style>
.vo{position:absolute;left:0;right:0;bottom:150px;padding:0 70px;text-align:center;
  font-family:Poppins,sans-serif;pointer-events:none}
.vo-band{display:inline-block;max-width:100%;background:rgba(6,20,36,.90);
  border-radius:18px;padding:26px 34px;border:2px solid rgba(255,255,255,.16)}
.vo-tag{font-size:22px;font-weight:600;letter-spacing:.20em;text-transform:uppercase;
  color:#4FC3F7;margin-bottom:14px}
.vo-tag.tight{color:#FFB74D}
.vo-line{font-size:38px;line-height:1.36;font-weight:500}
.vo-line span{color:rgba(255,255,255,.26);transition:none}
.vo-line span.said{color:#fff}
.vo-meter{margin-top:18px;height:6px;background:rgba(255,255,255,.16);border-radius:3px;overflow:hidden}
.vo-meter i{display:block;height:100%;width:0;background:#4FC3F7;border-radius:3px}
.vo-meter i.tight{background:#FFB74D}
.vo-note{position:absolute;top:64px;right:88px;font-family:Poppins,sans-serif;
  font-size:20px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(255,255,255,.55)}
</style>
<div class="vo-note">Voiceover timing preview</div>
<div class="vo"><div class="vo-band">
  <div class="vo-tag" id="voTag"></div>
  <div class="vo-line" id="voLine"></div>
  <div class="vo-meter"><i id="voMeter"></i></div>
</div></div>
<script>
const CUES=${JSON.stringify(cues)};
const WPS=${WPS};
const tagEl=document.getElementById('voTag');
const lineEl=document.getElementById('voLine');
const meterEl=document.getElementById('voMeter');
const band=document.querySelector('.vo-band');
let current=null;
const baseRender=window.renderFrame;
window.renderFrame=function(t){
  baseRender(t);
  const cue=CUES.find(c=>t>=c.start-0.001&&t<c.end);
  if(!cue){band.style.opacity='0';return;}
  band.style.opacity='1';
  if(cue!==current){
    current=cue;
    lineEl.innerHTML=cue.line.split(/\\s+/).map(w=>'<span>'+w+'</span>').join(' ');
    tagEl.textContent=cue.tight
      ? 'tight — '+cue.need.toFixed(1)+'s to say, '+cue.budget.toFixed(1)+'s available'
      : cue.need.toFixed(1)+'s to say, '+cue.budget.toFixed(1)+'s available';
    tagEl.className='vo-tag'+(cue.tight?' tight':'');
    meterEl.className=cue.tight?'tight':'';
  }
  // Reveal words at speaking pace so a line that overruns visibly runs out of room.
  const spoken=Math.max(0,t-cue.start);
  const words=lineEl.querySelectorAll('span');
  const said=Math.floor(spoken*WPS);
  words.forEach((w,i)=>w.classList.toggle('said',i<said));
  meterEl.style.width=Math.min(100,(spoken/cue.need)*100).toFixed(1)+'%';
};
</script>`

const html = videoHtml(post).replace('</body>', overlay + '</body>')

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)

const trackRel = plan.campaign?.audio?.track
const track = trackRel && existsSync(resolve(repoRoot, trackRel)) ? resolve(repoRoot, trackRel) : null

const args = [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
  ...(track ? ['-stream_loop', '-1', '-i', track] : []),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
  '-profile:v', 'high', '-level', '4.0', '-movflags', '+faststart', '-r', String(FPS),
  ...(track
    ? ['-map', '0:v:0', '-map', '1:a:0', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2',
       '-af', `loudnorm=I=${DUCKED_LUFS}:TP=-2:LRA=11,afade=t=in:st=0:d=0.8,afade=t=out:st=${(seconds - 1.5).toFixed(2)}:d=1.5`,
       '-shortest', '-fflags', '+shortest']
    : ['-an']),
  outFile,
]
const ff = spawn('ffmpeg', args)
const done = new Promise((res, rej) => {
  ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c))))
  ff.stderr.on('data', (d) => process.stderr.write(d))
})

const stage = page.locator('.stage')
const frames = Math.round(seconds * FPS)
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.renderFrame(t), i / FPS)
  const buf = await stage.screenshot({ type: 'jpeg', quality: 92 })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
}
ff.stdin.end()
await done
await browser.close()

console.log(`preview: ${outFile}`)
console.log(`music ducked to ${DUCKED_LUFS} LUFS — where it would sit under a voice`)
cues.forEach((c) =>
  console.log(`  ${c.start.toFixed(1).padStart(4)}-${c.end.toFixed(1).padStart(4)}s  ` +
    `needs ${c.need.toFixed(1)}s of ${c.budget.toFixed(1)}s  ${c.tight ? 'TIGHT' : 'ok'}`))
