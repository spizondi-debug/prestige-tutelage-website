# Campaign audio

Drop a licensed music track in this directory and point
`campaign.audio.track` in `campaign-plan.json` at it. Every video render then
picks it up automatically. With no track present the renderer prints a warning
and produces silent video, which is the current state.

## Requirements

- **Licensed for commercial social use.** Epidemic Sound, Artlist, Soundstripe
  or PremiumBeat all cover this. Never use a commercial release.
- Any common format ffmpeg reads: mp3, m4a, wav, flac.
- Length does not matter — a short track is looped to fill the clip and cut at
  the video's length.
- Level does not matter — the track is normalised to -14 LUFS, so a quiet or
  loud source lands at the same place.

## What the build does

Loudness-normalises to -14 LUFS with -1.5 dBTP headroom, fades in over 0.8s,
fades out over the last 1.5s, encodes AAC 192k stereo at 48kHz, and trims the
audio to the video length. The video stream is unaffected.

## If a voiceover is added later

Set `PT_AUDIO_LUFS=-24` so the music sits under the voice rather than competing
with it, and mix the voice in as a separate stage.

## Note on the current campaign

Posts 01-12 were produced and published silent, and are designed to be
understood with the sound off. Adding music to posts already scheduled means
re-rendering and replacing the media on each scheduled Metricool post.

## Track brief — what to look for

The videos are navy, disciplined and factual, aimed at South African employers.
The music has to match that register: **warm and forward-moving, but
understated**. It is carrying the clip alone, so it sets the whole tone.

**Specification**

| | |
|---|---|
| Length | 20s+ (clips run 18.6-19.8s; shorter loops, but a 30s+ track cuts cleaner) |
| Vocals | **Instrumental only.** Lyrics compete with the on-screen text |
| Tempo | ~90-110 BPM. Enough pulse to feel purposeful, not urgent |
| Arc | Should build gently. The scenes run logo → statement → list → photograph → call to action |
| Instrumentation | Piano, warm strings, soft synth pad, light percussion |

**Search terms that land in the right place**

- "uplifting corporate" · "inspiring ambient" · "hopeful piano"
- "warm optimistic underscore" · "documentary hopeful" · "confident corporate"

**Avoid**

- Cinematic trailer drums and big braams — overblown for a training provider
- EDM builds and drops — the drop will land mid-sentence
- The bright ukulele-and-whistle "happy corporate" cliché — reads as a stock
  advert and undercuts the credibility the copy works for
- Anything triumphant. The posts claim competence, not victory

**Sources** — Epidemic Sound, Artlist, Soundstripe, PremiumBeat. All licence
commercial social use. Never a commercial release.

**One track or several?** One across all twelve is more coherent and less work.
If a post wants its own, set `audioTrack` on that post in campaign-plan.json —
post 08 (Early Childhood Development) is the one that might justify something
warmer, and post 03 (Production Technology) something more rhythmic.
