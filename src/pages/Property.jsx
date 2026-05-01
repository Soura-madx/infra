import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";
import { MapPin, Share2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const primaryBlue = "#005596";

/* ---------------- RANGE SLIDER ---------------- */
const RangeSlider = ({ label, min, max, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600">
        {label}: {value[0]} - {value[1]}
      </label>

      <div className="flex gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([+e.target.value, value[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], +e.target.value])}
          className="w-full"
        />
      </div>
    </div>
  );
};

/* ---------------- FILTER SELECT ---------------- */
const FilterSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs text-slate-600">{label}</label>
    <select
      className="w-full border p-2 rounded mt-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */
const PropertyListingPage = () => {
  const [units, setUnits] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();
  const { projectId } = useParams();

  const getCityImage = (city) => {
    const key = city?.trim().toLowerCase();

    const map = {
      indore: "/cities/indore.jpg",
      dewas: "/cities/dewas.jpg",
      ujjain: "/cities/ujjain.jpg",
    };

    return map[key] || "/cities/default.jpg";
  };

  const [filters, setFilters] = useState({
    project: "",
    type: "",
    configuration: "",
    saleCategory: "",
    facing: "",
    location: "",
    city: "",
    area: [0, 5000],
    price: [0, 10000],
  });

  /* -------- FETCH -------- */
  const [loading, setLoading] = useState(true); // Set initial to true

  /* -------- FETCH -------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const unitsRes = await axios.get(`https://workiees.com/api/units`);
        const unitsData = unitsRes.data.data || [];

        const projectIds = [
          ...new Set(unitsData.map((u) => u.project_id).filter(Boolean)),
        ];
        const projectPromises = projectIds.map((id) =>
          axios.get(`https://workiees.com/api/projects/${id}`),
        );

        const projectsRes = await Promise.all(projectPromises);
        const projectsData = projectsRes.map((r) => r.data.data);

        setUnits(unitsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  // 🔹 Skeleton for City Banner Cards
  const BannerSkeleton = () => (
    <div className="flex gap-4 overflow-hidden mt-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="min-w-[210px] h-32 bg-slate-800 animate-pulse rounded-2xl"
        />
      ))}
    </div>
  );

  // 🔹 Skeleton for Sidebar Filters
  const FilterSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 bg-gray-200 rounded w-full" />
      ))}
    </div>
  );

  // 🔹 Skeleton for Property Row
  const PropertySkeleton = () => (
    <div className="rounded-sm mt-3 bg-white border border-slate-100 shadow-sm overflow-hidden animate-pulse">
      <div className="grid md:grid-cols-[0.4fr_0.6fr]">
        <div className="h-[220px] bg-gray-200" />
        <div className="p-5 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-12 bg-gray-50 rounded w-full" />
          <div className="h-8 bg-gray-200 rounded w-24 ml-auto" />
        </div>
      </div>
    </div>
  );

  const projectMap = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [projects]);

  /* -------- MAP -------- */
  const mapped = useMemo(() => {
    return units.map((u) => {
      const project = projectMap[u.project_id] || {};

      const ratePerSqft = Number(u.rate_per_sqft) || 0;
      const areaSqft = Number(u.area_sqft) || 0;

      let amenities = [];
      if (typeof project.amenities === "string") {
        amenities = project.amenities
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);
      } else if (Array.isArray(project.amenities)) {
        amenities = project.amenities;
      }

      return {
        id: u.id,
        // for filters
        project: project.project_name || project.name || "N/A",
        type: u.property_type || "",
        configuration: u.configuration || "",
        saleCategory: u.sale_category || "",
        facing: u.facing || "",
        location: u.Location || "",
        area: areaSqft,
        price: ratePerSqft,
        description: project.description,
        // card UI
        projectName: project.project_name || project.name || "N/A",
        projectAddress: project.full_address || project.project_address || "",
        city: project.city || "",
        plotNo: u.unit_number,
        towerName: u.tower_name,
        dimension: u.plot_dimensions,
        ratePerSqft,
        areaSqft,
        totalPrice: areaSqft * ratePerSqft,
        photo: u.unit_images?.length
          ? `https://workiees.com/${u.unit_images[0]}`
          : "https://via.placeholder.com/300",
        rera: u.rera_number || "",
        amenities, // ← now correctly set
      };
    });
  }, [units, projectMap]);
  /* -------- FILTER LOGIC -------- */
  const filtered = useMemo(() => {
    return mapped.filter((p) => {
      return (
        (!filters.project || p.project === filters.project) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.configuration ||
          String(p.configuration) === filters.configuration) &&
        (!filters.saleCategory || p.saleCategory === filters.saleCategory) &&
        (!filters.facing || p.facing === filters.facing) &&
        (!filters.location || p.location === filters.location) &&
        (!filters.city || p.city === filters.city) &&
        p.area >= filters.area[0] &&
        p.area <= filters.area[1] &&
        p.price >= filters.price[0] &&
        p.price <= filters.price[1]
      );
    });
  }, [mapped, filters]);

  /* -------- OPTIONS -------- */
  const unique = (key) => [
    ...new Set(mapped.map((p) => p[key]).filter(Boolean)),
  ];

  const cities = unique("city");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // items per page

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  const CityBanner = ({ cities, selectedCity, onSelect }) => {
    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 px-5 py-6 sm:px-8 sm:py-7 shadow-xl">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.22),transparent_55%)] opacity-80" />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/80">
              Discover Properties
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1">
              Search by <span className="text-sky-300">City</span>
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-300">
              Tap a city card to instantly filter projects in that location.
            </p>
          </div>

          {selectedCity && (
            <button
              onClick={() => onSelect("")}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md transition hover:bg-white/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Clear city
            </button>
          )}
        </div>

        {/* scroll row */}
        <div className="relative z-10 mt-5 flex items-center gap-4">
          {/* left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-slate-900 to-transparent" />

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {cities.map((city) => {
              const isActive = selectedCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelect(city)}
                  className={`group relative flex min-w-[210px] max-w-[240px] items-end overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "border-sky-400/70 ring-2 ring-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.45)] scale-[1.02]"
                      : "border-white/10 hover:border-sky-300/60 hover:scale-[1.02]"
                  }`}
                >
                  {/* city image */}
                  <img
                    src={getCityImage(city)}
                    alt={city}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-900/10" />

                  {/* highlight bar */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 opacity-100"
                        : "bg-white/20 opacity-0 group-hover:opacity-80"
                    }`}
                  />

                  {/* card content */}
                  <div className="relative z-10 flex w-full items-center justify-between px-3.5 pb-3.5 pt-16">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300/80">
                        City
                      </p>
                      <p className="mt-0.5 text-base font-semibold text-white">
                        {city}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-300/90">
                        View all listings in this city
                      </p>
                    </div>

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-semibold backdrop-blur-sm transition-all ${
                        isActive
                          ? "border-sky-300/70 bg-sky-400/20 text-sky-50"
                          : "border-white/25 bg-slate-900/40 text-slate-100 group-hover:bg-sky-400/20 group-hover:border-sky-300/70"
                      }`}
                    >
                      {isActive ? "Selected" : "Explore"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-slate-900 to-transparent" />
        </div>
      </section>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="space mt-20"></div>
      <main className="mx-auto max-w-7xl px-4 lg:px-8 py-10 lg:py-14 space-y-10">
        {loading ? (
          <section className="rounded-3xl bg-slate-900 px-8 py-7">
            <div className="h-6 bg-slate-800 rounded w-1/4 mb-4 animate-pulse" />
            <BannerSkeleton />
          </section>
        ) : (
          <CityBanner
            cities={cities}
            selectedCity={filters.city}
            onSelect={(city) => {
              setFilters({ ...filters, city });
              setCurrentPage(1);
            }}
          />
        )}

        <div className="flex items-center justify-between lg:hidden">
          <p className="text-xs text-slate-500">
            {filtered.length} results found
          </p>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Filters
          </button>
        </div>
        <div className="mt-4 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
          {/* FILTERS */}
          <div className="hidden lg:block space-y-4 lg:sticky lg:top-2 self-start">
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="font-bold text-lg">Filters</h2>

              <FilterSelect
                label="Project"
                value={filters.project}
                onChange={(v) => {
                  setFilters({ ...filters, project: v });
                  setCurrentPage(1);
                }}
                options={unique("project")}
              />

              <FilterSelect
                label="Type"
                value={filters.type}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, type: v });
                  setCurrentPage(1);
                }}
                options={unique("type")}
              />

              <FilterSelect
                label="Configuration"
                value={filters.configuration}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, configuration: v });
                  setCurrentPage(1);
                }}
                options={unique("configuration")}
              />

              <FilterSelect
                label="Sale Category"
                value={filters.saleCategory}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, saleCategory: v });
                  setCurrentPage(1);
                }}
                options={unique("saleCategory")}
              />

              <FilterSelect
                label="Facing"
                value={filters.facing}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, facing: v });
                  setCurrentPage(1);
                }}
                options={unique("facing")}
              />

              <FilterSelect
                label="Location"
                value={filters.location}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, location: v });
                  setCurrentPage(1);
                }}
                options={unique("location")}
              />

              {/* RANGE */}
              <RangeSlider
                label="Area Sqft"
                min={0}
                max={5000}
                value={filters.area}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, area: v });
                  setCurrentPage(1);
                }}
              />

              <RangeSlider
                label="Rate / Sqft"
                min={0}
                max={20000}
                value={filters.price}
                // whenever you call setFilters, also reset page
                onChange={(v) => {
                  setFilters({ ...filters, price: v });
                  setCurrentPage(1);
                }}
              />

              <button
                onClick={() =>
                  setFilters({
                    project: "",
                    type: "",
                    configuration: "",
                    saleCategory: "",
                    facing: "",
                    location: "",
                    area: [0, 5000],
                    price: [0, 10000],
                  })
                }
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* LIST */}

          <div className="space-y-4 ">

                {loading ? (
            // Show 3 skeletons while loading
            [1, 2, 3].map((i) => <PropertySkeleton key={i} />)
          ) : paginated.length > 0 ? (
            paginated.map((p) => (
              <div className="rounded-sm mt-3 bg-white border border-slate-100 shadow-sm overflow-hidden  transition-all duration-500">
                <div className="grid gap-0 md:grid-cols-[0.4fr_0.6fr]">
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={p.photo}
                      alt={p.projectName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {p.projectName}
                          </p>
                          <h1 className="text-lg  text-slate-900   ">
                            {p.title}
                          </h1>
                          <div className="flex items-center gap-1 text-slate-400 mt-1">
                            <MapPin size={12} />
                            <p className="text-[11px]  uppercase tracking-tighter">
                              {p.plotNo}, {p.towerName}, {p.projectAddress},{" "}
                              {p.city}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg  text-slate-900 leading-none">
                            ` ₹ {p.totalPrice.toLocaleString("en-IN")}`
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Specs Bar */}
                    <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                      {p.bhk && (
                        <>
                          <div className="w-px h-6 bg-slate-100" />
                          <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              {p.type}
                            </p>
                            <p className="text-xs  text-slate-800">{p.bhk} </p>
                          </div>
                        </>
                      )}
                      <div className="w-px h-6 bg-slate-100" />
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Facing
                        </p>
                        <p className="text-xs  text-slate-800">
                          {p.facing || "N/A"}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Rate/Sqft
                        </p>
                        <p className="text-xs  text-slate-800">
                          {p.ratePerSqft || "N/A"}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Area
                        </p>
                        <p className="text-xs  text-slate-800">
                          {p.areaSqft || "N/A"}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Dimension
                        </p>
                        <p className="text-xs  text-slate-800">
                          {p.dimension || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* RERA & Footer */}
                    <div className="flex items-center justify-end pt-1">
                      <Link
                        to={`/property/${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button
                          className="px-5 py-2 rounded-sm text-white text-[11px] font-black uppercase tracking-widest shadow-lg transition-all hover:brightness-110 active:scale-95"
                          style={{ backgroundColor: primaryBlue }}
                        >
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">No properties found.</div>
          )}

          

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE FILTER DRAWER */}
        {isFilterOpen && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* sheet */}
            <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] rounded-t-2xl bg-white shadow-2xl lg:hidden animate-[slideUp_0.25s_ease-out]">
              {/* drag handle + header */}
              <div className="flex items-center justify-between border-b px-4 pt-3 pb-2">
                <div className="flex flex-col">
                  <span className="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-200" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Filters
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Refine results for your search
                  </p>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-[11px] font-medium text-slate-500"
                >
                  Close
                </button>
              </div>

              {/* content */}
              <div className="overflow-y-auto px-4 py-3 space-y-3 text-sm">
                <FilterSelect
                  label="Project"
                  value={filters.project}
                  onChange={(v) => {
                    setFilters({ ...filters, project: v });
                    setCurrentPage(1);
                  }}
                  options={unique("project")}
                />

                <FilterSelect
                  label="Type"
                  value={filters.type}
                  onChange={(v) => {
                    setFilters({ ...filters, type: v });
                    setCurrentPage(1);
                  }}
                  options={unique("type")}
                />

                <FilterSelect
                  label="Configuration"
                  value={filters.configuration}
                  onChange={(v) => {
                    setFilters({ ...filters, configuration: v });
                    setCurrentPage(1);
                  }}
                  options={unique("configuration")}
                />

                <FilterSelect
                  label="Sale Category"
                  value={filters.saleCategory}
                  onChange={(v) => {
                    setFilters({ ...filters, saleCategory: v });
                    setCurrentPage(1);
                  }}
                  options={unique("saleCategory")}
                />

                <FilterSelect
                  label="Facing"
                  value={filters.facing}
                  onChange={(v) => {
                    setFilters({ ...filters, facing: v });
                    setCurrentPage(1);
                  }}
                  options={unique("facing")}
                />

                <FilterSelect
                  label="Location"
                  value={filters.location}
                  onChange={(v) => {
                    setFilters({ ...filters, location: v });
                    setCurrentPage(1);
                  }}
                  options={unique("location")}
                />

                <RangeSlider
                  label="Area Sqft"
                  min={0}
                  max={5000}
                  value={filters.area}
                  onChange={(v) => {
                    setFilters({ ...filters, area: v });
                    setCurrentPage(1);
                  }}
                />

                <RangeSlider
                  label="Rate / Sqft"
                  min={0}
                  max={20000}
                  value={filters.price}
                  onChange={(v) => {
                    setFilters({ ...filters, price: v });
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* footer actions */}
              <div className="border-t px-4 py-3 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setFilters({
                      project: "",
                      type: "",
                      configuration: "",
                      saleCategory: "",
                      facing: "",
                      location: "",
                      area: [0, 5000],
                      price: [0, 10000],
                      city: filters.city, // keep city filter from banner
                    });
                    setCurrentPage(1);
                  }}
                  className="text-xs font-semibold text-red-500"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm"
                >
                  Show {filtered.length} results
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PropertyListingPage;
