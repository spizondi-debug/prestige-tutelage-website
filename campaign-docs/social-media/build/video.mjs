// Video renderer — 1080x1920 vertical MP4, silent, on-screen text only.
//
// The page exposes window.renderFrame(t), which positions every element for a
// given time in seconds. Frames are screenshotted deterministically and piped
// to ffmpeg, so a render is reproducible rather than dependent on wall-clock
// animation timing.
//
// Motion is deliberately restrained: a rise-and-fade on entry, a fade on exit,
// a rule that wipes in, and a slow push on photography. Nothing spins, bounces
// or flies, because the audience is South African employers and the posts have
// to survive being read on a phone with the sound off.

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
export const repoRoot = resolve(here, '../../..')
const FONT_DIR = process.env.PT_FONT_DIR

export const plan = JSON.parse(
  readFileSync(resolve(repoRoot, 'campaign-docs/social-media/campaign-plan.json'), 'utf8'),
)
const C = plan.brand.colours

export const W = 1080
export const H = 1920
export const FPS = 30

function fontFaces() {
  return [300, 400, 500, 600, 700, 800]
    .map((w) => {
      const b64 = readFileSync(resolve(FONT_DIR, `poppins-latin-${w}-normal.woff2`)).toString('base64')
      return `@font-face{font-family:Poppins;font-style:normal;font-weight:${w};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`
    })
    .join('')
}

function dataUri(relPath) {
  const abs = resolve(repoRoot, relPath)
  const mime = abs.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${mime};base64,${readFileSync(abs).toString('base64')}`
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const durationOf = (post) =>
  post.videoScenes.reduce((n, s) => n + s.seconds, 0)

/** A stack of animated lines; `i` drives the entry stagger. */
const line = (cls, html, i) => `<div class="ln ${cls}" data-i="${i}">${html}</div>`

function sceneInner(scene, accent, photoSrc) {
  switch (scene.kind) {
    case 'logo':
      return `<div class="stack center">
        ${line('logo-wrap', `<img class="big-logo" src="${photoSrc.logo}" alt="">`, 0)}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${line('tagline', esc(plan.brand.tagline), 2)}
      </div>`

    case 'statement':
      return `<div class="stack">
        ${scene.sub ? line('sub', esc(scene.sub), 0) : ''}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${line('big', esc(scene.text), 2)}
      </div>`

    case 'list':
      return `<div class="stack">
        ${scene.text ? line('sub', esc(scene.text), 0) : ''}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${scene.items
          .map((it, n) =>
            line(
              'item',
              `<span class="tick" style="background:${accent}"></span><span>${esc(it)}</span>`,
              2 + n,
            ),
          )
          .join('')}
      </div>`

    case 'rows':
      return `<div class="stack">
        ${scene.text ? line('sub', esc(scene.text), 0) : ''}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${scene.items
          .map((it, n) =>
            line('rowitem', `<span style="border-left-color:${accent}">${esc(it)}</span>`, 2 + n),
          )
          .join('')}
      </div>`

    case 'facts':
      return `<div class="stack">
        ${scene.items
          .map((it, n) => {
            const [label, value] = it.split('|')
            return line(
              'factrow',
              `<span class="fact-label">${esc(label)}</span>
               <span class="fact-num" style="color:${accent}">${esc(value)}</span>`,
              n,
            )
          })
          .join('')}
      </div>`

    case 'steps':
      return `<div class="stack">
        ${scene.items
          .map((it, n) =>
            line(
              'steprow',
              `<span class="stepnum" style="color:${accent}">${String(n + 1).padStart(2, '0')}</span>
               <span>${esc(it)}</span>`,
              n,
            ),
          )
          .join('')}
      </div>`

    case 'contact':
      return `<div class="stack">
        ${line('mid', esc(scene.text), 0)}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${scene.items.map((it, n) => line('contactline', esc(it), 2 + n)).join('')}
      </div>`

    case 'photo':
      return `<div class="photo-scene">
        <img class="kb" src="${photoSrc.photo}" alt="">
        <span class="scrim"></span>
        <div class="stack photo-copy">
          ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 0)}
          ${line('mid', esc(scene.text), 1)}
          ${scene.sub ? line('sub', esc(scene.sub), 2) : ''}
        </div>
      </div>`

    case 'cta':
      return `<div class="stack center">
        ${line('logo-wrap', `<img class="cta-logo" src="${photoSrc.logo}" alt="">`, 0)}
        ${line('rule-line', `<span class="rule" style="background:${accent}"></span>`, 1)}
        ${line('url', esc(scene.text), 2)}
        ${line('tagline', esc(plan.brand.tagline), 3)}
      </div>`

    default:
      return ''
  }
}

export function videoHtml(post) {
  const accent = post.accent === 'green' ? C.green : C.blue
  const src = {
    logo: dataUri(plan.brand.logo),
    photo: post.photo ? dataUri(`public/images/${post.photo}`) : '',
  }

  let t0 = 0
  const scenes = post.videoScenes
    .map((s) => {
      const start = t0
      t0 += s.seconds
      return `<section class="scene" data-start="${start}" data-end="${t0}">
        ${sceneInner(s, accent, src)}
      </section>`
    })
    .join('')
  const total = t0

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Poppins,sans-serif;background:${C.blueDeep};color:#fff;
  -webkit-font-smoothing:antialiased}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${C.blueDeep}}
.wash{position:absolute;inset:-10%;pointer-events:none;
  background:radial-gradient(70% 46% at 50% 22%, rgba(0,111,216,.34) 0%, rgba(11,39,66,0) 68%)}

.scene{position:absolute;inset:0;display:flex;align-items:center;
  padding:0 88px 40px;opacity:0;will-change:opacity}
.stack{width:100%;display:flex;flex-direction:column;align-items:flex-start}
.stack.center{align-items:center;text-align:center}
.ln{will-change:transform,opacity;max-width:100%}

.big{font-size:96px;font-weight:700;line-height:1.14;letter-spacing:-.022em;
  text-wrap:balance;margin-top:34px}
.mid{font-size:68px;font-weight:600;line-height:1.22;letter-spacing:-.018em;
  text-wrap:balance;margin-top:30px}
.sub{font-size:32px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;
  color:rgba(255,255,255,.72);line-height:1.45}
.rule{display:block;height:6px;border-radius:3px;transform-origin:left center}
.stack.center .rule{transform-origin:center}
.rule-line{margin:36px 0 4px;width:150px}

.item{display:flex;align-items:flex-start;gap:28px;font-size:40px;font-weight:400;
  line-height:1.4;color:rgba(255,255,255,.94);margin-top:40px}
.tick{flex:0 0 auto;width:14px;height:14px;border-radius:50%;margin-top:24px}

.rowitem{margin-top:40px;font-size:50px;font-weight:600;line-height:1.35}
.rowitem span{display:block;border-left:5px solid;padding-left:30px}

.factrow{display:flex;align-items:baseline;justify-content:space-between;width:100%;
  gap:40px;margin-top:44px;border-bottom:2px solid rgba(255,255,255,.16);padding-bottom:26px}
.fact-label{font-size:30px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;
  color:rgba(255,255,255,.66)}
.fact-num{font-size:104px;font-weight:700;letter-spacing:-.02em;line-height:1}

.steprow{display:flex;align-items:baseline;gap:38px;font-size:62px;font-weight:600;
  margin-top:46px;line-height:1.2}
.stepnum{font-size:44px;font-weight:700;min-width:86px}

.contactline{font-size:44px;font-weight:400;line-height:1.5;margin-top:22px;
  color:rgba(255,255,255,.88)}
.url{font-size:74px;font-weight:700;letter-spacing:-.02em;margin-top:34px}
.tagline{font-size:28px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.62);margin-top:26px}

.big-logo{width:560px;height:auto;display:block}
.cta-logo{width:440px;height:auto;display:block}

.photo-scene{position:absolute;inset:0}
.photo-scene .kb{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  object-position:50% 30%;will-change:transform}
.scrim{position:absolute;inset:0;
  background:linear-gradient(180deg, rgba(11,39,66,.62) 0%, rgba(11,39,66,.30) 34%,
    rgba(11,39,66,.86) 74%, rgba(11,39,66,.97) 100%)}
.photo-copy{position:absolute;left:88px;right:88px;bottom:320px;width:auto}

/* Persistent chrome: the mark stays present, and a hairline shows how much of
   the clip is left — both anchored outside the safe-area of platform UI. */
.bug{position:absolute;top:76px;left:88px;width:210px;height:auto;opacity:0}
.progress{position:absolute;left:88px;right:88px;bottom:112px;height:4px;
  background:rgba(255,255,255,.18);border-radius:2px;overflow:hidden}
.progress i{display:block;height:100%;width:0;background:${accent};border-radius:2px}
</style></head><body>
<div class="stage">
  <div class="wash"></div>
  ${scenes}
  <img class="bug" src="${src.logo}" alt="">
  <div class="progress"><i></i></div>
</div>
<script>
const TOTAL = ${total};
const scenes = [...document.querySelectorAll('.scene')];
const bug = document.querySelector('.bug');
const bar = document.querySelector('.progress i');

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (p) => 1 - Math.pow(1 - clamp(p, 0, 1), 3);

// Lines rise and fade in on a stagger, hold, then fade out together.
const IN = 0.62, STAGGER = 0.13, OUT = 0.42;

window.renderFrame = function (t) {
  for (const scene of scenes) {
    const start = parseFloat(scene.dataset.start);
    const end = parseFloat(scene.dataset.end);
    const live = t >= start - 0.001 && t < end;
    scene.style.opacity = live ? '1' : '0';
    if (!live) continue;

    const local = t - start;
    const remain = end - local - start;
    const outP = remain < OUT ? 1 - clamp(remain / OUT, 0, 1) : 0;

    for (const ln of scene.querySelectorAll('.ln')) {
      const i = parseInt(ln.dataset.i, 10) || 0;
      const p = easeOut((local - i * STAGGER) / IN);
      const rise = (1 - p) * 30 + easeOut(outP) * -16;
      ln.style.opacity = String(clamp(p, 0, 1) * (1 - easeOut(outP)));
      ln.style.transform = 'translate3d(0,' + rise.toFixed(2) + 'px,0)';

      const rule = ln.querySelector('.rule');
      if (rule) rule.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    }

    // Slow push on photography, so the frame is never completely static.
    const kb = scene.querySelector('.kb');
    if (kb) {
      const s = 1 + 0.075 * clamp(local / (end - start), 0, 1);
      kb.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
  }

  // The mark fades in once the opening logo card has handed over.
  const firstEnd = parseFloat(scenes[0].dataset.end);
  const lastStart = parseFloat(scenes[scenes.length - 1].dataset.start);
  const showBug = t > firstEnd && t < lastStart;
  bug.style.opacity = showBug ? String(easeOut((t - firstEnd) / 0.6) * 0.85) : '0';

  bar.style.width = (clamp(t / TOTAL, 0, 1) * 100).toFixed(3) + '%';
};
window.renderFrame(0);
</script>
</body></html>`
}
