// AwardsSectionDark.jsx
import React, { useEffect, useRef } from "react";

const primaryBlue = "#005596";
const primaryOrange = "#f58025";

const awards = [
  {
    year: "2025",
    title: "Emerging Real Estate Marketing Brand",
    org: "Central India Realty Forum",
  },
  {
    year: "2025",
    title: "Customer Trust & Transparency Recognition",
    org: "Regional Property Excellence Summit",
  },
  {
    year: "2024",
    title: "High-Impact Plot Marketing Campaign",
    org: "Real Estate Marketing Awards",
  },
];

const AwardsSectionDark = () => {
  const glowRef = useRef(null);

  // Gentle floating animation for the trophy glow
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let frame;
    let t = 0;

    const animate = () => {
      t += 0.015;
      const translateY = Math.sin(t) * 4; // small up-down motion
      const blur = 22 + Math.sin(t) * 4;
      el.style.transform = `translateY(${translateY}px)`;
      el.style.filter = `blur(${blur}px)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-[#000000] text-slate-100 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/5 border border-slate-700/60 px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-300">
              Awards &amp; Achievements
              <span
                className="h-1.5 w-1.5 rounded-md"
                style={{ background: primaryOrange }}
              />
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight">
              Recognition for{" "}
              <span style={{ color: primaryOrange }}>legal, honest growth</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Moments where the industry noticed what our customers already feel:
              transparency, compliance and long‑term commitment from Prarambh Infra.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
            Real estate awards are not our goal, but a by‑product of doing the
            basics right — legal projects, clear paperwork and advisor support.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-stretch">
          {/* Left: award timeline with subtle highlight */}
          <div className="relative">
            {/* vertical accent */}
            <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#facc6b] via-slate-600 to-transparent" />

            <div className="space-y-6 pl-7 sm:pl-9">
              {awards.map((award, idx) => (
                <div
                  key={award.title}
                  className="relative group"
                >
                  {/* node */}
                  <div className="absolute -left-5 sm:-left-6 mt-1.5 h-3.5 w-3.5 rounded-md bg-gradient-to-br from-[#fde68a] to-[#eab308] shadow-[0_0_18px_rgba(234,179,8,0.9)] group-hover:scale-110 transition-transform" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-400">
                        {award.year}
                      </p>
                      <h3 className="mt-1 text-sm sm:text-[15px] font-semibold text-slate-50">
                        {award.title}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-[13px] text-slate-400">
                        {award.org}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      #{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: luxury trophy / stats card with animation */}
          <div className="relative">
            {/* soft animated glow */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute -inset-x-6 top-8 h-40 bg-gradient-to-b from-[#facc6b]/35 via-transparent to-transparent opacity-70"
            />

            <div className="relative rounded-[28px] border border-slate-700/60 bg-gradient-to-br from-[#000000] via-[#020617] to-[#020617] shadow-[0_26px_80px_rgba(15,23,42,0.9)] px-6 sm:px-8 py-7 overflow-hidden">
              {/* top row */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1">
                    Highlighted milestones
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Awards that validate our direction
                  </h3>
                </div>
                <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                  <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#facc6b] via-[#eab308] to-[#a16207] opacity-90" />
                  <div className="relative h-full w-full flex items-center justify-center text-2xl">
                    🏆
                  </div>
                </div>
              </div>

              {/* stats row */}
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                    Industry awards
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    3<span className="text-lg align-top">+</span>
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
                    Regional recognition within the first years of operation.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                    Recognised focus
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    RERA
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-slate-400">
                    Awards centred on transparency, documentation and legal work.
                  </p>
                </div>
              </div>

              {/* bottom copy */}
              <p className="text-xs sm:text-[13px] text-slate-300 border-t border-slate-700/70 pt-3">
                For Prarambh Infra, every achievement is a promise to keep raising
                standards for documentation, advisor training and customer clarity —
                so recognition always follows responsibility, never replaces it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSectionDark;
