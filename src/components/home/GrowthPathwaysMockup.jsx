/**
 * GrowthPathwaysMockup — a stylised illustration of the Growth Pathways
 * product, not a screenshot: a tilted "laptop" and "phone" panel plus a
 * scatter of glass cards, each carrying an obviously illustrative stat.
 * Purely decorative (aria-hidden) — the real claims live in the copy beside
 * it, and nothing here is dressed up as a measured result.
 */
function GlassCard({ className = '', children }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 shadow-2xl backdrop-blur-md sm:p-4 ${className}`}
    >
      {children}
    </div>
  )
}

function Donut({ segments, size = 44 }) {
  const c = 2 * Math.PI * 15.5
  let offset = 0
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} className="-rotate-90 shrink-0">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
      {segments.map((s) => {
        const dash = (s.pct / 100) * c
        const el = (
          <circle
            key={s.color}
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke={s.color}
            strokeWidth="4"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-offset}
          />
        )
        offset += dash
        return el
      })}
    </svg>
  )
}

export default function GrowthPathwaysMockup() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-xl select-none lg:aspect-[11/9]" aria-hidden="true">
      {/* Faint network dots, matching the site's dark-section texture. */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 600 500" fill="none">
        <circle cx="70" cy="440" r="2" fill="#fff" opacity="0.35" />
        <circle cx="540" cy="50" r="2" fill="#fff" opacity="0.35" />
        <circle cx="330" cy="230" r="1.6" fill="#fff" opacity="0.25" />
        <path d="M70,440 L330,230 L540,50" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
      </svg>

      {/* Laptop panel */}
      <div className="absolute right-0 top-0 w-[70%] -rotate-2">
        <div className="rounded-xl border border-white/15 bg-shadow/90 p-2 shadow-2xl">
          <div className="rounded-lg bg-[#0d1b2e] p-3.5 sm:p-4">
            <p className="text-[0.65rem] font-semibold text-white/70 sm:text-xs">Workforce Overview</p>
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
              {[
                ['Total Employees', '2,450'],
                ['Skills Assessed', '1,872'],
                ['Active Learners', '1,234'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2">
                  <p className="text-[0.5rem] text-white/45 sm:text-[0.55rem]">{label}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-white sm:text-base">{value}</p>
                </div>
              ))}
              <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2">
                <p className="text-[0.5rem] text-white/45 sm:text-[0.55rem]">Readiness Score</p>
                <p className="mt-1 font-display text-sm font-semibold text-prestige-green-light sm:text-base">
                  72% <span className="text-[0.55rem] font-medium sm:text-[0.6rem]">+8%</span>
                </p>
              </div>
            </div>
            <div className="mt-2.5 rounded-lg border border-white/10 bg-white/[0.04] p-2.5 sm:mt-3 sm:p-3">
              <p className="text-[0.5rem] text-white/45 sm:text-[0.55rem]">Workforce Readiness</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="relative shrink-0">
                  <Donut size={40} segments={[{ color: '#31B84A', pct: 72 }]} />
                  <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] font-semibold text-white">
                    72%
                  </span>
                </div>
                <svg viewBox="0 0 100 30" className="h-6 flex-1" preserveAspectRatio="none">
                  <polyline
                    points="0,22 15,18 30,20 45,10 60,14 75,6 100,8"
                    fill="none"
                    stroke="#066DCE"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone panel */}
      <div className="absolute bottom-0 right-0 z-10 w-[20%] rotate-3">
        <div className="rounded-2xl border border-white/15 bg-[#0d1b2e] p-2.5 shadow-2xl sm:p-3">
          <p className="text-[0.5rem] font-semibold text-white/70 sm:text-[0.6rem]">My Progress</p>
          <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">68%</p>
          <div className="mt-1.5 h-1 w-full rounded-full bg-white/10">
            <div className="h-1 w-2/3 rounded-full bg-prestige-blue" />
          </div>
          <p className="mt-2 text-[0.45rem] text-white/45 sm:text-[0.5rem]">Current Pathway</p>
          <p className="text-[0.5rem] font-medium text-white/85 sm:text-[0.6rem]">Leadership Essentials</p>
          <p className="mt-1 text-[0.45rem] text-white/40 sm:text-[0.5rem]">3 of 6 completed</p>
        </div>
      </div>

      {/* Floating glass cards */}
      <GlassCard className="left-0 top-[4%] w-[40%] sm:w-[38%]">
        <p className="text-[0.55rem] text-white/50 sm:text-[0.6rem]">Skills Gaps</p>
        <div className="mt-2 flex items-center gap-3">
          <Donut
            segments={[
              { color: '#EAB308', pct: 32 },
              { color: '#066DCE', pct: 41 },
              { color: '#31B84A', pct: 27 },
            ]}
          />
          <p className="font-display text-lg font-bold text-white">32%</p>
        </div>
        <p className="mt-2 text-[0.5rem] leading-relaxed text-white/45 sm:text-[0.55rem]">
          High 32% · Medium 41% · Low 27%
        </p>
      </GlassCard>

      <GlassCard className="left-0 top-[36%] w-[36%] sm:w-[34%]">
        <p className="text-[0.55rem] text-white/50 sm:text-[0.6rem]">Learning Progress</p>
        <p className="mt-1 font-display text-lg font-bold text-white sm:text-xl">68%</p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-2/3 rounded-full bg-prestige-blue" />
        </div>
      </GlassCard>

      <GlassCard className="bottom-[1%] left-[1%] w-[46%] sm:w-[42%]">
        <p className="text-[0.55rem] text-white/50 sm:text-[0.6rem]">Recommended Pathways</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.5rem] text-white/70 sm:text-[0.55rem]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" />
          Leadership Essentials
          <span className="text-white/30">→</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" />
          People Management
        </div>
      </GlassCard>

      <GlassCard className="bottom-[0%] left-[44%] w-[26%] sm:left-[42%]">
        <p className="text-[0.55rem] text-white/50 sm:text-[0.6rem]">Measurable Outcomes</p>
        <p className="mt-1 font-display text-base font-bold text-prestige-green-light sm:text-lg">+24%</p>
        <div className="mt-2 flex h-8 items-end gap-1" aria-hidden="true">
          {[40, 55, 70, 90].map((h) => (
            <span key={h} className="w-2 rounded-sm bg-prestige-blue" style={{ height: `${h}%` }} />
          ))}
        </div>
      </GlassCard>

      <GlassCard className="bottom-[40%] right-0 w-[24%]">
        <p className="text-[0.55rem] text-white/50 sm:text-[0.6rem]">Skills Distribution</p>
        <div className="mt-2">
          <Donut
            segments={[
              { color: '#066DCE', pct: 40 },
              { color: '#31B84A', pct: 35 },
              { color: 'rgba(255,255,255,0.2)', pct: 25 },
            ]}
          />
        </div>
      </GlassCard>
    </div>
  )
}
