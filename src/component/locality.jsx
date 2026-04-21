// src/components/CityLocalityExplorer.jsx
import React, { useMemo, useRef, useState } from "react";

const primaryBlue = "#005596";
const accentPink = "#e11d48";

export default function CityLocalityExplorer({
  properties,
  onSelectCity,
  onSelectLocality,
}) {
  const [activeCity, setActiveCity] = useState("Indore");
  const trackRef = useRef(null);

  // Group by city & locality
  const cityStats = useMemo(() => {
    // 1. Initialize structure including Dewas
    const result = {
      Indore: { total: 0, localities: {} },
      Ujjain: { total: 0, localities: {} },
      Dewas: { total: 0, localities: {} },
    };

    if (properties) {
      properties.forEach((p) => {
        if (!result[p.city]) return;
        const cityObj = result[p.city];
        cityObj.total += 1;
        const key = p.locality || "Others";
        if (!cityObj.localities[key]) {
          result[p.city].localities[key] = {
            name: key,
            projects: 0,
            pricePerSqft:
              p.price && p.areaBuiltUp
                ? Math.round(p.price / p.areaBuiltUp)
                : null,
          };
        }
        result[p.city].localities[key].projects += 1;
      });
    }

    const addDemo = (city, items) => {
      // Safety check to ensure city exists
      if (!result[city]) return;
      
      items.forEach((loc) => {
        if (!result[city].localities[loc.name]) {
          result[city].localities[loc.name] = {
            name: loc.name,
            projects: loc.projects,
            pricePerSqft: loc.pricePerSqft,
          };
        }
      });
    };

    addDemo("Indore", [
      { name: "Nipania", projects: 4, pricePerSqft: 1734 },
      { name: "Khandwa Road", projects: 3, pricePerSqft: 900 },
      { name: "AB Bypass Road", projects: 3, pricePerSqft: 2600 },
      { name: "Mahalakshmi Nagar", projects: 3, pricePerSqft: 2835 },
      { name: "Super Corridor", projects: 2, pricePerSqft: 2380 },
      { name: "Vijay Nagar", projects: 5, pricePerSqft: 3200 },
      { name: "Rau", projects: 3, pricePerSqft: 2100 },
    ]);

    addDemo("Ujjain", [
      { name: "Indore Road", projects: 4, pricePerSqft: 1200 },
      { name: "Rishi Nagar", projects: 3, pricePerSqft: 1500 },
      { name: "Nanakhheda", projects: 2, pricePerSqft: 1100 },
      { name: "Freeganj", projects: 3, pricePerSqft: 1800 },
      { name: "Dewas Road", projects: 2, pricePerSqft: 1050 },
    ]);

    // 2. Added Dewas Demo Data
    addDemo("Dewas", [
      { name: "Bhopal Road", projects: 3, pricePerSqft: 1100 },
      { name: "AB Road", projects: 4, pricePerSqft: 1350 },
      { name: "Industrial Area", projects: 2, pricePerSqft: 950 },
      { name: "Civil Lines", projects: 2, pricePerSqft: 1600 },
      { name: "Kalani Nagar", projects: 1, pricePerSqft: 1000 },
    ]);

    return result;
  }, [properties]);

  const activeCityData = cityStats[activeCity] || { total: 0, localities: {} };
  const localityList = Object.values(activeCityData.localities);

  const handleCityClick = (city) => {
    setActiveCity(city);
    onSelectCity && onSelectCity(city);
  };

  const handleLocalityClick = (loc) => {
    onSelectLocality && onSelectLocality(activeCity, loc.name);
  };

  const scrollTrack = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = direction === "left" ? -280 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="rounded-md bg-white border border-slate-200 shadow-sm px-4 sm:px-6 py-4 sm:py-5 space-y-4">
      {/* Message */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            Serving Indore, Ujjain &amp; Dewas
          </p>
          <h2 className="mt-1 text-sm sm:text-base md:text-lg font-semibold text-slate-900">
            Properties currently available in{" "}
            <span className="text-[#005596]">Indore</span>,{" "}
            <span className="text-[#005596]">Ujjain</span> and{" "}
            <span className="text-[#005596]">Dewas</span> – choose your city
            and locality to see matching options instantly.
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-slate-600 max-w-xl">
            This helps focus on real, visit‑ready projects instead of scattered
            listings across India.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          {["Indore", "Ujjain", "Dewas"].map((city) => (
            <span 
              key={city}
              className="inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200 px-3 py-1 text-slate-600"
            >
              {cityStats[city]?.total || 0} in {city}
            </span>
          ))}
        </div>
      </div>

      {/* City tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-2">
        {["Indore", "Ujjain", "Dewas"].map((city) => {
          const isActive = activeCity === city;
          return (
            <button
              key={city}
              type="button"
              onClick={() => handleCityClick(city)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {city}
              <span
                className={`text-[10px] ${
                  isActive ? "text-slate-200" : "text-slate-400"
                }`}
              >
                {cityStats[city]?.total || 0} props
              </span>
            </button>
          );
        })}
      </div>

      {/* Slider with visible content */}
      <div className="relative">
        <div className="overflow-x-auto no-scrollbar max-w-500 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <div ref={trackRef} className="flex gap-4 py-0 pr-2">
            {localityList.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleLocalityClick(loc)}
                className="flex-shrink-0 w-[200px] text-left rounded-md border border-[#e4e4e4] bg-white px-6 py-4 shadow-[0_2px_6px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:border-[#d4d4d4] transition-all"
              >
                {/* Top: locality + projects */}
                <p className="text-sm font-semibold text-orange-700">
                  {loc.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {loc.projects} project{loc.projects > 1 ? "s" : ""}
                </p>

                {/* Middle divider line */}
                <div className="mt-3 border-t border-[#ececec]" />

                {/* Bottom: price + View all */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-700">
                    {loc.pricePerSqft
                      ? `₹ ${loc.pricePerSqft.toLocaleString()}/ SQ. FT.`
                      : "Price on request"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}