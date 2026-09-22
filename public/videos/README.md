# Video

Video is **opt-in per slot** and off by default. Nothing here is required for
the site to be complete — every video slot falls back to a still photograph.

## How to switch a slot on

1. Encode the clip (see targets below) and drop both files in, e.g.:
   ```
   public/videos/homepage/prestige-workforce-hero.webm
   public/videos/homepage/prestige-workforce-hero.mp4
   ```
2. Put the poster still in `public/images/`.
3. Point the slot at it in `src/data/media.js`:
   ```js
   export const heroMedia = {
     src: 'homepage/prestige-workforce-hero',   // no extension
     poster: 'hero-poster.jpg',
     alt: 'Describe what is happening in the footage',
     sources: [ … ],
   }
   ```

That is the whole change. `HeroMedia` handles the rest.

## Encoding targets

| | Target |
|---|---|
| Length | 6–10 seconds, seamless loop |
| Resolution | 1920×1080 max (the hero panel never exceeds ~900px wide) |
| **MP4 file size** | **under 2 MB** — this is the one that matters |
| WebM file size | under 1.5 MB |
| Audio | **none** — strip the track entirely; the video is muted and silent audio is wasted bytes |
| Poster | JPEG, same first frame, ~1400px, quality 82 |

```bash
# MP4 (H.264, no audio)
ffmpeg -i source.mov -an -c:v libx264 -crf 26 -preset slow \
       -vf "scale=1920:-2" -movflags +faststart out.mp4

# WebM (VP9, no audio)
ffmpeg -i source.mov -an -c:v libvpx-vp9 -crf 34 -b:v 0 \
       -vf "scale=1920:-2" out.webm

# Poster from the first frame
ffmpeg -i source.mov -vframes 1 -q:v 3 poster.jpg
```

## Rules

- **One video per page, maximum.** Several autoplaying videos on one page is the
  fastest way to make the site feel slow and burn visitors' mobile data.
- **Never burn text into the footage.** Headlines stay as real HTML so they
  remain selectable, translatable, indexable and readable by screen readers.
- **No generated logos in footage.** The real logo sits in the navigation.
- `HeroMedia` already honours `prefers-reduced-motion`, showing the still
  instead of animating at anyone who asked us not to.

## Folders

```
homepage/     the hero
programmes/   programme-page loops
industries/   sector loops
```
