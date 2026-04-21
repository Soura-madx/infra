// CollabShowcaseLight.jsx
import React, { useEffect, useRef } from "react";

const primaryBlue = "#005596";
const primaryOrange = "#f58025";

// Replace with your actual logo URLs (SVG/PNG)
const collabLogos = [
  "/assets/images/bhutani.png",
  "/assets/images/hdfc.png",
  "/assets/images/download.png",
  "/assets/images/muthri.png",
  "/assets/images/download.png",
  "/assets/images/download (1).png",
];

const CollabShowcaseLight = () => {
  const trackRef = useRef(null);
  const logos = [...collabLogos, ...collabLogos]; // duplicate for seamless loop

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame;
    let offset = 0;
    const speed = 0.8; // adjust speed if needed

    const animate = () => {
      offset -= speed;
      const width = track.scrollWidth / 2;
      if (Math.abs(offset) >= width) offset = 0;
      track.style.transform = `translateX(${offset}px)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="bg-[#f3f4f6] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-600">
              Collaborations
              <span
                className="h-1.5 w-1.5 rounded-md"
                style={{ background: primaryOrange }}
              />
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight text-slate-900">
              Trusted by{" "}
              <span style={{ color: primaryBlue }}>leading partners</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Developers, banks and channel partners who believe in legal,
              transparent and RERA‑aligned real estate.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-slate-500 max-w-xs">
            Add your top collaborators here – just logos, no extra text, for a
            clean premium feel.
          </div>
        </div>

        {/* Big light marquee band */}
        <div className="relative overflow-hidden rounded-[32px]  bg-[#f3f4f6] py-8 sm:py-10">
          {/* Top row */}
          <div className="px-6 sm:px-10 flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-md bg-emerald-500" />
              Verified collaborations
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span className="h-1 w-8 rounded-md bg-slate-200" />
              RERA‑focused partners
            </div>
          </div>

          {/* Fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/70 to-transparent" />

          {/* Logo track */}
          <div className="relative flex items-center">
            <div
              ref={trackRef}
              className="flex items-center  sm:gap-16 will-change-transform px-10"
            >
              {logos.map((logo, idx) => (
                <div
                  key={`${logo}-${idx}`}
                  className="flex items-center justify-center h-14 sm:h-16 lg:h-20 min-w-[160px] sm:min-w-[190px] lg:min-w-[210px] opacity-80 hover:opacity-100 transition duration-200"
                >
                  <img
                    src={logo}
                    alt="Collaboration logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note (optional, can remove) */}
          <div className="mt-6 px-6 sm:px-10 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
            <span>Replace with actual Prarambh Infra collaborators.</span>
            <span className="hidden sm:inline">Smooth, continuous animation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollabShowcaseLight;
