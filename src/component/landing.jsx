import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const PRIMARY_BLUE = "#005596";
const ACCENT_ORANGE = "#f58025";

export default function HeroSection() {
  const [mode, setMode] = useState("buy");
  const videoRef = useRef(null);

  // 🔥 Dynamic Data
  const [units, setUnits] = useState([]);
  const [projects, setProjects] = useState([]);

  // 🎯 Filters State
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    budget: "",
  });

  /* ---------------- FETCH API ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitsRes = await axios.get(
          "https://workiees.com/api/units?project_id=1"
        );
        const unitsData = unitsRes.data.data || [];

        const projectIds = [
          ...new Set(unitsData.map((u) => u.project_id).filter(Boolean)),
        ];

        const projectPromises = projectIds.map((id) =>
          axios.get(`https://workiees.com/api/projects/${id}`)
        );

        const projectsRes = await Promise.all(projectPromises);
        const projectsData = projectsRes.map((r) => r.data.data);

        setUnits(unitsData);
        setProjects(projectsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  /* ---------------- UNIQUE VALUES ---------------- */
  const unique = (arr) => [...new Set(arr.filter(Boolean))];

  const cities = unique(projects.map((p) => p.city));
  const types = unique(units.map((u) => u.property_type));

  const budgets = [
    "0 - 50L",
    "50L - 1Cr",
    "1Cr - 2Cr",
    "2Cr+",
  ];

  /* ---------------- VIDEO AUTO PLAY FIX ---------------- */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-80 md:h-[600px] lg:min-h-screen flex items-center overflow-hidden">
      
      {/* 🎥 Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 🌟 Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
        
        {/* 🧠 Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mt-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
            <span className="h-2 w-2 bg-orange-400 rounded-full animate-ping" />
            <span className="text-[10px] uppercase tracking-widest text-white font-semibold">
              Trusted Real Estate Partner
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Your Dream Home Is{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Our Mission
            </span>
          </h1>

          <p className="text-white/70 max-w-xl text-sm italic">
            We filter out the noise to show only high-value, verified properties.
          </p>

          <div className="flex gap-4 mt-6">
            <Link to="/property">
              <button className="px-5 py-2 bg-orange-500 text-white rounded font-bold flex items-center gap-2">
                Find a Home <Search size={16} />
              </button>
            </Link>

            <Link to="/contact-us">
              <button className="px-5 py-2 bg-white/10 text-white border border-white/30 rounded">
                List Your Property
              </button>
            </Link>
          </div>
        </div>

        {/* 🔥 FILTER BOX */}
        <div className="hidden md:flex flex-col w-full mt-10">
          
          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setMode("buy")}
              className={`px-6 py-2 text-xs font-bold rounded-t ${
                mode === "buy"
                  ? "bg-white text-[#005596]"
                  : "bg-white/20 text-white"
              }`}
            >
              For Sale
            </button>

            <button
              onClick={() => setMode("rent")}
              className={`px-6 py-2 text-xs font-bold rounded-t ${
                mode === "rent"
                  ? "bg-white text-[#005596]"
                  : "bg-white/20 text-white"
              }`}
            >
              For Rent
            </button>
          </div>

          {/* Card */}
          <div className="bg-white p-4 shadow-md max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">

              {/* Budget */}
              <FilterField label="Budget" icon={<Building2 size={14} />}>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </FilterField>

              {/* City */}
              <FilterField label="City" icon={<MapPin size={14} />}>
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </FilterField>

              {/* Type */}
              <FilterField label="Type">
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </FilterField>

              {/* Area */}
              <FilterField label="Area">
                <option>Select Area</option>
                <option>1000 - 2000</option>
                <option>2000 - 4000</option>
              </FilterField>

              {/* Search Button */}
              <Link to="/property" state={filters}>
                <button className="w-full py-2 mt-4 bg-orange-500 text-white rounded flex items-center justify-center gap-2">
                  Search <Search size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- REUSABLE FIELD ---------------- */
function FilterField({ label, children, icon }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <label className="text-[10px] font-bold uppercase tracking-widest">
          {label}
        </label>
      </div>

      <div className="relative">
        <select className="w-full bg-slate-50 border rounded px-3 py-2 text-sm">
          {children}
        </select>

        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
          size={14}
        />
      </div>
    </div>
  );
}