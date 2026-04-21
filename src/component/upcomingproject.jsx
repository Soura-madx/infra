import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY_BLUE = "#005596";
const ACCENT = "#f58025";

export default function UpcomingProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingProjects = async () => {
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
          (Array.isArray(result) && result) ||
          (Array.isArray(result?.data) && result.data) ||
          (Array.isArray(result?.projects) && result.projects) ||
          (Array.isArray(result?.data?.projects) && result.data.projects) ||
          [];

        // ✅ FILTER UPCOMING PROJECTS
        const upcoming = projectList.filter(
          (item) => (item.status || "").toLowerCase() === "upcoming",
        );

        const BASE_URL = "https://workiees.com/";

        const formatted = upcoming.map((item, index) => {
          let images = [];

          // ✅ FIXED FIELD NAME
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
            id: item.id || item.project_id || index,
            name: item.project_name || item.name || "Untitled Project",
            location: item.city || item.location || "Location not available",
            status: item.status || "",
            src: fullImage,
          };
        });
        setProjects(formatted);
      } catch (err) {
        console.error("Upcoming fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingProjects();
  }, []);

  return (
    <section className="border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f58025] mb-1">
              Upcoming Projects
            </p>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Coming Soon ...
            </h2>
          </div>

          <button
            onClick={() => navigate("/projects")}
            className="text-xs font-semibold px-3 py-1.5 rounded border"
            style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
          >
            View All
          </button>
        </div>

        {/* ✅ LOADING */}
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-10">
            Loading upcoming projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">
            No upcoming projects found.
          </p>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.id}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="cursor-pointer bg-white rounded-md border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all"
              >
                {/* Image */}
                <div className="h-[200px] sm:h-[280px] w-full overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.name}
                    onError={(e) => {
                      e.target.src =
                        "https://dummyimage.com/800x500/cccccc/000000&text=Image+Not+Found";
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="px-4 py-3 flex-1 flex flex-col">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-3">
                    {p.location}
                  </p>

                  <div className="mt-3 hidden sm:flex">
                    <span className="inline-flex items-center rounded-full bg-[#005596]/5 px-3 py-1 text-[10px] font-semibold text-[#005596]">
                      Registrations opening soon
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
