import React from 'react'

const Overview = () => {
  return (
    <div>
        <section className="relative w-full h-[260px] sm:h-[320px] lg:h-[550px] overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/images/team.jpg" // replace with your team banner image
          alt="Prarambh Infra Team"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75" />

        {/* Centered text */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200 mb-2">
              Prarambh Infra
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Our Team
            </h1>
            <p className="mt-2 max-w-xl mx-auto text-xs sm:text-sm text-slate-200">
              The people who build transparent, high‑trust real estate
              experiences for buyers, advisors and developers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <section className="bg-white">
          <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14 ">
              <div className="grid gap-8 lg:grid-cols-2 items-center mb-20">
                {/* Left: text */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Why We Exist
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                    Making real estate decisions clear and confident
                  </h2>
                  <p className="text-sm sm:text-[15px] text-slate-600 mb-3">
                    Prarambh Infra is a trusted and transparent real estate
                    marketing company that works primarily on legal,
                    RERA-compliant plotted projects instead of the unorganized
                    open market. The company provides a positive work
                    environment for advisors and employees and focuses on
                    long-term relationships with customers and partners.
                  </p>
                  <p className="text-sm sm:text-[15px] text-slate-600">
                    From approval checks and pricing strategy to digital
                    campaigns and site‑visit coordination, the team works
                    end‑to‑end so every booking feels like a confident decision,
                    not a gamble.
                  </p>
                  <br />
                  <p className="text-sm sm:text-[15px] text-slate-600">
                    From approval checks and pricing strategy to digital
                    campaigns and site‑visit coordination, the team works
                    end‑to‑end so every booking feels like a confident decision,
                    not a gamble.
                  </p>
                </div>

                {/* Right: image */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-xl bg-slate-900/5" />
                  <div className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src="/assets/images/realestate.avif" // replace with your image
                      alt="Prarambh Infra team at work"
                      className="h-64 sm:h-80 w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Our Objective
                  </h3>
                  <p className="text-sm text-slate-700">
                    To empower the team to deliver the best possible service and
                    to always work in the interest of customers while helping
                    them find a home that becomes a happy and secure place for
                    their family.
                  </p>
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Our Goal
                  </h3>
                  <p className="text-sm text-slate-700">
                    To help customers find a home or plot that matches their
                    needs, budget and dreams, through legal, transparent and
                    well-planned projects.
                  </p>
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Our Values
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      "Honesty",
                      "Transparency",
                      "Consistency",
                      "Respect",
                      "Trust",
                    ].map((value) => (
                      <span
                        key={value}
                        className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-800"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}

export default Overview
