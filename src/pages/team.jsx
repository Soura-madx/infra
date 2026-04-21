// src/pages/PropertyListingPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import CityLocalityExplorer from "../component/locality";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import Footer from "../component/footer";
import { Share2, MapPin, CheckCircle2 } from "lucide-react";

const primaryBlue = "#005596";
const primaryOrange = "#f58025";

const pageSize = 6;

const PropertyListingPage = () => {
  const [units, setUnits] = useState([]);
  const [filters, setFilters] = useState({
    project: "",
    type: "",
    configuration: "",
    sale_category: "",
    facing: "",
    location: "",
    minArea: 0,
    maxArea: 5000,
    minPrice: 0,
    maxPrice: 10000,
  });

  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch Units
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get(
          "https://workiees.com/api/units?project_id=1",
        );
        setUnits(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUnits();
  }, []);

  const options = useMemo(() => {
    return {
      projects: [...new Set(units.map((u) => u.project_name))],
      types: [...new Set(units.map((u) => u.property_type))],
      configs: [...new Set(units.map((u) => u.configuration))],
      categories: [...new Set(units.map((u) => u.sale_category))],
      facings: [...new Set(units.map((u) => u.facing))],
    };
  }, [units]);

  // ✅ Map Units → Property UI format
  const mappedUnits = useMemo(() => {
    return units.map((u) => ({
      id: u.id,
      title: `Unit ${u.unit_number}`,
      type: u.property_type,
      transactionType: "Sale",
      price: Number(u.rate_per_sqft || 0),
      priceLabel: `₹ ${u.rate_per_sqft || "-"}`,
      city: "Project",
      locality: u.tower_name || "N/A",
      areaBuiltUp: u.area_sqft,
      bhk: u.configuration,
      facing: u.facing,
      possessionStatus: u.availability_status,
      photos: u.unit_images?.length
        ? [`https://workiees.com/${u.unit_images[0]}`]
        : ["https://via.placeholder.com/300"],
      rera: "Approved",
    }));
  }, [units]);

  // ✅ Filtering
  const filtered = useMemo(() => {
    return units.filter((u) => {
      return (
        (!filters.project || u.project_name === filters.project) &&
        (!filters.type || u.property_type === filters.type) &&
        (!filters.configuration || u.configuration === filters.configuration) &&
        (!filters.sale_category || u.sale_category === filters.sale_category) &&
        (!filters.facing || u.facing === filters.facing) &&
        (!filters.location ||
          u.plot_dimensions
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        u.area_sqft >= filters.minArea &&
        u.area_sqft <= filters.maxArea &&
        u.rate_per_sqft >= filters.minPrice &&
        u.rate_per_sqft <= filters.maxPrice
      );
    });
  }, [units, filters]);
  const pageSize = 6;

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentPageItems = filtered.slice(start, start + pageSize);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const totalProperties = filtered.length;

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">
      <Navbar />
      <div className="space mt-20"></div>
      <main className="mx-auto max-w-7xl px-4 lg:px-8 py-10 lg:py-14 space-y-10">
        {/* MAIN: filters left, content right */}
        <section className="mt-4 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
          {/* LEFT – Filters */}
          <div className="space-y-4 lg:sticky lg:top-2 self-start">
            <div className="bg-white p-4 rounded shadow space-y-4">
              <Select
                label="Project"
                options={options.projects}
                onChange={(v) => setFilters({ ...filters, project: v })}
              />
              <Select
                label="Type"
                options={options.types}
                onChange={(v) => setFilters({ ...filters, type: v })}
              />
              <Select
                label="Configuration"
                options={options.configs}
                onChange={(v) => setFilters({ ...filters, configuration: v })}
              />
              <Select
                label="Sale Category"
                options={options.categories}
                onChange={(v) => setFilters({ ...filters, sale_category: v })}
              />
              <Select
                label="Facing"
                options={options.facings}
                onChange={(v) => setFilters({ ...filters, facing: v })}
              />

              {/* LOCATION */}
              <input
                placeholder="Location (Garden, Corner...)"
                className="border p-2 w-full"
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />

              {/* AREA SLIDER */}
              <RangeSlider
                label="Area Sqft"
                min={0}
                max={5000}
                valueMin={filters.minArea}
                valueMax={filters.maxArea}
                onChange={(min, max) =>
                  setFilters({ ...filters, minArea: min, maxArea: max })
                }
              />

              {/* PRICE SLIDER */}
              <RangeSlider
                label="Rate per Sqft"
                min={0}
                max={10000}
                valueMin={filters.minPrice}
                valueMax={filters.maxPrice}
                onChange={(min, max) =>
                  setFilters({ ...filters, minPrice: min, maxPrice: max })
                }
              />
            </div>

            <div className="rounded-md bg-white border border-slate-100 px-4 py-3 shadow-sm">
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Recommended</option>
                <option value="priceLow">Price Low</option>
                <option value="priceHigh">Price High</option>
              </select>
            </div>
          </div>

          {/* RIGHT – cards + pagination */}
          <div className="space-y-4">
            <section className="space-y-4">
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                <span>
                  Showing{" "}
                  <span className="font-semibold">
                    {currentPageItems.length}
                  </span>{" "}
                  of <span className="font-semibold">{totalProperties}</span>{" "}
                  properties
                </span>
              </div>

              <div className="space-y-4">
                {currentPageItems.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/* Filters */

const FilterSelect = ({ label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-medium text-slate-600 mb-1">
      {label}
    </label>
    <select
      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

const FilterRangeSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-medium text-slate-600 mb-1">
      {label}
    </label>
    <select
      className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

/* Smaller property card */

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    type,
    transactionType,
    priceLabel,
    negotiable,
    city,
    locality,
    areaBuiltUp,
    bhk,
    rera,
    photos,
    tag,
  } = property;

  const [liked, setLiked] = useState(false);
  const primaryBlue = "#005596";
  const accentOrange = "#f58025";

  const handleShare = (e) => {
    e.preventDefault(); // Prevents Link navigation
    // Add your sharing logic here
  };

  return (
    <Link to={`/property/${id}`} target="_blank" className="block group">
      <article className="rounded-sm bg-white border border-slate-100 shadow-sm overflow-hidden  transition-all duration-500">
        <div className="grid gap-0 md:grid-cols-[0.4fr_0.6fr]">
          {/* Image Column */}
          <div className="relative w-full h-[220px] overflow-hidden">
            <img
              src={photos[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Professional Tag */}
            {tag && (
              <span className="absolute left-3 top-3 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 shadow-lg">
                {tag}
              </span>
            )}

            {/* Action Buttons: Top Right Positioned */}
            <div className="absolute right-3 top-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="
                     group relative
                     h-10 w-10 sm:h-11 sm:w-11 rounded-full
                     bg-white/90 backdrop-blur-md border border-slate-200
                     flex items-center justify-center
                     shadow-[0_4px_12px_rgba(0,0,0,0.05)]
                     hover:bg-white hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
                     transition-all duration-300 ease-in-out
                     active:scale-90
                   "
                aria-label="Share Property"
              >
                <Share2
                  size={20}
                  strokeWidth={2.2}
                  className="text-slate-600 transition-colors group-hover:text-[#005596]"
                />

                {/* Subtle Tooltip for Desktop */}
                <span className="absolute -bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-lg font-bold tracking-widest pointer-events-none shadow-xl">
                  SHARE
                </span>
              </button>
            </div>
          </div>

          {/* Content Column */}
          <div className="p-5 flex flex-col gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-lg  text-slate-900   ">{title}</h1>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <MapPin size={12} />
                    <p className="text-[11px]  uppercase tracking-tighter">
                      {locality}, {city}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg  text-slate-900 leading-none">
                    `{priceLabel}/sqft`
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1">
                    {negotiable ? "Negotiable" : "Fixed Price"}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="flex items-center gap-4 py-3 border-y border-slate-50">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Size
                </p>
                <p className="text-xs  text-slate-800">
                  {areaBuiltUp}{" "}
                  <span className="text-[9px] text-slate-400">Sqft</span>
                </p>
              </div>
              {bhk && (
                <>
                  <div className="w-px h-6 bg-slate-100" />
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Type
                    </p>
                    <p className="text-xs  text-slate-800">{bhk} </p>
                  </div>
                </>
              )}
              <div className="w-px h-6 bg-slate-100" />
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Facing
                </p>
                <p className="text-xs  text-slate-800">
                  {property.facing || "N/A"}
                </p>
              </div>
            </div>

            {/* RERA & Footer */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#f58025]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  RERA: {rera}
                </span>
              </div>
              <button
                className="px-5 py-2 rounded-sm text-white text-[11px] font-black uppercase tracking-widest shadow-lg transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: primaryBlue }}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* Pagination */

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) pages.push(i);

  return (
    <nav
      className="flex items-center justify-center gap-2 pt-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded-md text-xs sm:text-sm border ${
          currentPage === 1
            ? "text-slate-300 border-slate-200 bg-white"
            : "text-slate-700 border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-md text-xs sm:text-sm border ${
              p === currentPage
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded-md text-xs sm:text-sm border ${
          currentPage === totalPages
            ? "text-slate-300 border-slate-200 bg-white"
            : "text-slate-700 border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        Next
      </button>
    </nav>
  );
};

const Select = ({ label, options, onChange }) => (
  <div>
    <label className="text-sm">{label}</label>
    <select className="w-full border p-2" onChange={(e)=>onChange(e.target.value)}>
      <option value="">All</option>
      {options.map((o)=> <option key={o}>{o}</option>)}
    </select>
  </div>
);


const RangeSlider = ({ label, min, max, valueMin, valueMax, onChange }) => {
  return (
    <div>
      <label className="text-sm">{label}</label>

      <div className="flex gap-2 text-xs mb-1">
        <span>{valueMin}</span>
        <span>-</span>
        <span>{valueMax}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={valueMin}
        onChange={(e)=>onChange(Number(e.target.value), valueMax)}
        className="w-full"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={valueMax}
        onChange={(e)=>onChange(valueMin, Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};
export default PropertyListingPage;
