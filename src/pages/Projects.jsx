import React, { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import ProjectGrid from "../component/projectGrid";
import Footer from "../component/footer";
import Navbar from "../component/Navbar";


export default function LuxuryProjectsBanner() {
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    type: "",
    status: "",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ✅ AUTO SLIDER
 useEffect(() => {
  if (slides.length === 0) return;

  const timer = setInterval(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, 3000);

  return () => clearInterval(timer);
}, [slides]);

  // ✅ FETCH PROJECTS API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://workiees.com/api/projects");
      const text = await res.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON from API");
      }

      const projectList =
        result?.data?.projects ||
        result?.projects ||
        result?.data ||
        result ||
        [];

      const BASE_URL = "https://workiees.com/";

      const normalized = projectList.map((item, index) => {
        let images = [];

        if (Array.isArray(item.project_images)) {
          images = item.project_images;
        } else if (typeof item.project_images === "string") {
          try {
            images = JSON.parse(item.project_images);
          } catch {
            images = [];
          }
        }

        const imagePath = images[0] || "";

        const fullImage =
          imagePath && imagePath.startsWith("http")
            ? imagePath
            : imagePath
              ? BASE_URL + imagePath
              : "https://dummyimage.com/800x500/cccccc/000000&text=No+Image";

        return {
          id: item.id || index,
          title: item.project_name || item.name || "Project",
          subtitle: item.city || "Premium Location",
          image: fullImage,
          city: item.city || "",
          type: item.project_type || "",
          status: item.status || "",
        };
      });

      setProjects(normalized);
      setSlides(normalized.slice(0, 3));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER CHANGE
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      type: "",
      status: "",
    });
  };

  // ✅ FILTER LOGIC
  const filteredProjects = projects.filter((proj) => {
    return (
      (!filters.city || proj.city === filters.city) &&
      (!filters.type || proj.type === filters.type) &&
      (!filters.status || proj.status === filters.status)
    );
  });

  return (
    <div>
      <Navbar />

      <div className="mt-20"></div>

      {/* 🔥 HERO BANNER */}
      <section className="relative max-w-7xl mx-auto h-[320px] sm:h-[420px] overflow-hidden">
        {slides.length > 0 &&
          slides.map((slide, index) => {
            const isActive = index === active;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-10 left-6 text-white">
                  <h2 className="text-3xl font-bold">{slide.title}</h2>
                  <p className="text-sm mt-2">{slide.subtitle}</p>
                </div>
              </div>
            );
          })}
      </section>

      {/* 🔥 MOBILE FILTER BUTTON */}
      <div className="max-w-7xl mx-auto px-4 mt-4 flex justify-between md:hidden">
        <p className="text-xs text-gray-600">Filter projects</p>
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 text-xs border px-3 py-1 rounded"
        >
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* 🔥 MOBILE FILTER PANEL */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="bg-white h-full p-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">Filters</h3>
              <X onClick={() => setShowMobileFilters(false)} />
            </div>

            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full mb-3 border p-2"
            >
              <option value="">City</option>
              <option value="Ujjain">Ujjain</option>
              <option value="Indore">Indore</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full mb-3 border p-2"
            >
              <option value="">Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Agriculture">Agriculture</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full mb-3 border p-2"
            >
              <option value="">Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="bg-blue-600 text-white px-4 py-2 w-full mt-3"
            >
              Apply
            </button>

            <button onClick={clearFilters} className="text-sm underline mt-2">
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 🔥 PROJECT GRID (API DATA PASS) */}
      <ProjectGrid projects={filteredProjects} loading={loading} />

      <div className="mt-20"></div>

      <Footer />
    </div>
  );
}
