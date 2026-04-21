import React from "react";

const PRIMARY_BLUE = "#005596";

const CITY_OPTIONS = ["Indore", "Ujjain"];

const LOCALITY_OPTIONS = {
  Indore: ["Vijay Nagar", "Super Corridor", "Old Palasia", "New Palasia", "Bhawarkuan"],
  Ujjain: ["Freeganj", "Nanakhheda", "Rishi Nagar", "Dewas Road", "Indore Road"],
};

const TYPE_OPTIONS = ["Residential", "Commercial"];

const STATUS_OPTIONS = ["Upcoming", "Ready to move", "Under construction"];

export default function HorizontalProjectFilter({
  values,
  onChange,
  onApply,
}) {
  const { city = "", locality = "", type = "", status = "" } = values || {};

  const currentLocalities =
    city && LOCALITY_OPTIONS[city] ? LOCALITY_OPTIONS[city] : [];

  const handleChange = (name, value) => {
    if (name === "city") {
      onChange({ ...values, city: value, locality: "" });
    } else {
      onChange({ ...values, [name]: value });
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-md border border-slate-200 bg-white shadow-md">
          <div className="flex flex-col lg:flex-row items-stretch gap-4 px-4 py-4 lg:px-5 lg:py-4">
            {/* City */}
            <FilterPill label="City">
              <select
                value={city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none"
              >
                <option value="">Indore & Ujjain</option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FilterPill>

            {/* Locality */}
            <FilterPill label="Locality">
              <select
                value={locality}
                onChange={(e) => handleChange("locality", e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none"
                disabled={!city}
              >
                <option value="">
                  {city ? "All prime localities" : "Select city first"}
                </option>
                {currentLocalities.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </FilterPill>

            {/* Type */}
            <FilterPill label="Type">
              <select
                value={type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none"
              >
                <option value="">Residential & Commercial</option>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FilterPill>

            {/* Status */}
            <FilterPill label="Status">
              <select
                value={status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 outline-none"
              >
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FilterPill>

            {/* Apply button */}
            <div className="flex items-center justify-end lg:pl-4">
              <button
                type="button"
                onClick={onApply}
                className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm sm:text-base font-bold text-white shadow-sm"
                style={{ backgroundColor: PRIMARY_BLUE }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterPill({ label, children }) {
  return (
    <div className="flex-1 flex items-center gap-3 border border-slate-200 lg:border-0 lg:border-r lg:last:border-r-0 px-3 py-2.5 bg-slate-50 lg:bg-gray-100">
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 flex items-center rounded-md bg-white px-3 py-2 border border-slate-200">
        {children}
      </div>
    </div>
  );
}
