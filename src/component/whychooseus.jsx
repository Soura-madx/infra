import { useNavigate } from "react-router-dom";

const PRIMARY_BLUE = "#005596";
const ACCENT_ORANGE = "#f58025";

export default function WhyChoosePrarambh() {
  const navigate = useNavigate()
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Top heading */}
        <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-6">
          Why{" "}
          <span style={{ color: PRIMARY_BLUE }} className="font-bold">
            Prarambh Infra
          </span>{" "}
          is the Right Choice for You
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* LEFT: three light cards */}
          <div className="space-y-4">
            {/* Row 1: 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 px-6 py-5">
                <div className="mb-4 h-9 w-9 rounded-full border border-slate-900 flex items-center justify-center text-slate-600 text-xs">
                  PI
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Project‑Focused Strategy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Each launch gets its own media plan, messaging and landing pages
                  tailored to your ticket size, buyer segment and sales targets.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 px-6 py-5">
                <div className="mb-4 h-9 w-9 rounded-full border border-slate-900 flex items-center justify-center text-slate-600 text-xs">
                  PL
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Performance‑Led Campaigns
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We optimise for qualified site‑visit leads, using Meta &amp; Google
                  ads, remarketing and CRM tracking instead of just impressions.
                </p>
              </div>
            </div>

            {/* Row 2: full‑width card */}
            <div className="bg-slate-50 border border-slate-200 px-6 py-5">
              <div className="mb-4 h-9 w-9 rounded-full border border-slate-900 flex items-center justify-center text-slate-600 text-xs">
                24/7
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                Transparent Reporting &amp; Support
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Weekly dashboards, clear CPL and booking metrics, and on‑ground
                coordination with your sales team so you always know how the
                campaign is performing.
              </p>
            </div>
          </div>

          {/* RIGHT: highlighted blue card */}
          <div
            className="text-white px-6 py-6 flex flex-col justify-between"
            style={{ backgroundColor: PRIMARY_BLUE }}
          >
            <div>
              <div className="mb-4 h-9 w-9 rounded-full border border-white/40 flex items-center justify-center text-xs">
                PI
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Specialized Real Estate Partner
              </h3>
              <p className="text-sm text-slate-100 leading-relaxed">
                Prarambh Infra works only in real estate marketing across Indore
                and Ujjain. From plotted townships to premium apartments and
                commercial spaces, we understand your buyers and your numbers.
              </p>
              <p className="mt-3 text-sm text-slate-100 leading-relaxed">
                Whether you are launching a new project or pushing inventory for
                an existing one, we design campaigns that align with your cash
                flows, sales cycles and RERA compliance.
              </p>
            </div>

            <button
              onClick={() => navigate("/contact-us")}
              type="button"
              className="mt-5 inline-flex items-center justify-center rounded-md px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-amber-50 cursor-pointer text-black bg-slate-300"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
