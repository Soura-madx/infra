import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PRIMARY_BLUE = "#005596";

export default function ProjectGrid({ projects = [], loading }) {
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Dynamic options from API (Safely empty if loading)
  const cityOptions = [...new Set(projects.map((p) => p.city).filter(Boolean))];

  const localityOptions = city
    ? [
        ...new Set(
          projects
            .filter((p) => p.city === city)
            .map((p) => p.locality)
            .filter(Boolean)
        ),
      ]
    : [];

  const typeOptions = [...new Set(projects.map((p) => p.type).filter(Boolean))];

  const statusOptions = [
    ...new Set(projects.map((p) => p.status).filter(Boolean)),
  ];

  // 🔥 FILTER LOGIC
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      if (city && p.city !== city) return false;
      if (locality && p.locality !== locality) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }, [projects, city, locality, type, status]);

  const handleReset = () => {
    setCity("");
    setLocality("");
    setType("");
    setStatus("");
  };

  return (
    <section className="max-w-7xl mx-auto py-10 px-5">
      
      {/* 1️⃣ CITY BANNER (Loading State vs Real State) */}
      {loading ? (
        <div className="mb-8 w-full h-48 bg-gray-200 animate-pulse rounded-md"></div>
      ) : (
        <div className="mb-8 w-full h-48 bg-blue-100 rounded-md flex items-center justify-center">
          {/* Replace this with your actual City Banner Component */}
          <h2 className="text-2xl font-bold text-gray-700">
            {city ? `Projects in ${city}` : "Explore All Projects"}
          </h2>
        </div>
      )}

      {/* 2️⃣ FILTER BAR */}
      {loading ? (
        <div className="mb-8 border bg-white px-5 py-4 shadow-md flex flex-wrap gap-4 animate-pulse">
          {/* Skeleton select boxes */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded"></div>
          ))}
          <div className="h-10 w-20 bg-gray-200 rounded ml-auto"></div>
        </div>
      ) : (
        <div className="mb-8 border bg-white px-5 py-4 shadow-md flex flex-wrap gap-4">
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setLocality("");
            }}
            className="border px-3 py-2 text-sm"
          >
            <option value="">All Cities</option>
            {cityOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            disabled={!city}
            className="border px-3 py-2 text-sm"
          >
            <option value="">Locality</option>
            {localityOptions.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-3 py-2 text-sm"
          >
            <option value="">Type</option>
            {typeOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 text-sm"
          >
            <option value="">Status</option>
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="ml-auto border px-4 py-2 text-xs hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      )}

      {/* 3️⃣ PROPERTY GRID */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          /* Render 8 skeleton cards while loading */
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border bg-white shadow-md overflow-hidden animate-pulse">
              {/* Image Skeleton */}
              <div className="h-40 bg-gray-300"></div>
              
              {/* Text Skeleton */}
              <div className="p-3 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-1 pt-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredProjects.length > 0 ? (
          /* Render Actual Cards when loaded */
          filteredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="block">
              <div className="border bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={
                      project.image?.startsWith("http")
                        ? project.image
                        : `https://workiees.com/${project.image}`
                    }
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {project.city} • {project.locality}
                  </p>
                  <p className="text-xs mt-1 text-gray-600 line-clamp-2">
                    {project.address}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* Empty State */
          <p className="col-span-full text-center text-gray-500 py-10">
            No projects found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
}