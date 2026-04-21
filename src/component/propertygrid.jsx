import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PRIMARY_BLUE = "#005596";

export default function ProjectGrid({ projects = [], loading }) {
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // 🔹 Dynamic options from API
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

  if (loading) {
    return <p className="text-center py-10">Loading projects...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-5">
      {/* 🔥 FILTER BAR */}
      <div className="mb-8 border bg-white px-5 py-4 shadow-md flex flex-wrap gap-4">
        
        {/* CITY */}
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

        {/* LOCALITY */}
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

        {/* TYPE */}
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

        {/* STATUS */}
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

        {/* RESET */}
        <button
          onClick={handleReset}
          className="ml-auto border px-4 py-2 text-xs"
        >
          Reset
        </button>
      </div>

      {/* 🔥 GRID */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block"
          >
            <div className="border bg-white shadow-md overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={
                    project.image?.startsWith("http")
                      ? project.image
                      : `https://workiees.com/${project.image}`
                  }
                  alt={project.name}
                  className="w-full h-full object-cover"
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
        ))}

        {filteredProjects.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No projects found
          </p>
        )}
      </div>
    </section>
  );
}