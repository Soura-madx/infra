import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Search,
  RotateCcw,
  X,
  Plus,
  Building2,
  Eye,
} from "lucide-react";

const ProjectList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    possession: "",
    status: "",
    type: "",
    city: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch("https://workiees.com/api/projects");
        const text = await response.text();

        console.log("RAW API RESPONSE:", text);

        let result;
        try {
          result = JSON.parse(text);
        } catch (err) {
          throw new Error("API is not returning valid JSON");
        }

        console.log("PARSED API RESPONSE:", result);

        const projectList =
          (Array.isArray(result) && result) ||
          (Array.isArray(result?.data) && result.data) ||
          (Array.isArray(result?.projects) && result.projects) ||
          (Array.isArray(result?.data?.projects) && result.data.projects) ||
          [];

        const normalizedProjects = projectList.map((item, index) => ({
          id: item.id || item.project_id || index + 1,
          name: item.project_name || item.name || "Untitled Project",
          developerName: item.developer_name || "-",
          city: item.city || "-",
          address: item.full_address || item.address || "-",
          status: item.status || "-",
          type: item.project_type || item.type || "-",
          possession: item.construction_status || item.possession || "-",
          marketValue: item.market_value || "-",
          totalPlot: item.total_plots || "-",
          builtUpArea: item.build_area || "-",
          reraNo: item.rera_number || "-",
          mapLink: item.location || item.mapLink || "",
          ratePerSqft: item.rate_per_sqft || "-",
          budgetRange: item.budget_range || "-",
          description: item.description || "-",
          brochureUrl: item.brochure_file || "",
          galleryImages: Array.isArray(item.images)
            ? item.images
            : item.image
            ? [item.image]
            : [],
          videoUrl: item.video_url || "",
          amenities:
            typeof item.amenities === "string"
              ? item.amenities.split(",").map((x) => x.trim())
              : Array.isArray(item.amenities)
              ? item.amenities
              : [],
          specialities:
            typeof item.specialties === "string"
              ? item.specialties.split(",").map((x) => x.trim())
              : typeof item.specialities === "string"
              ? item.specialities.split(",").map((x) => x.trim())
              : Array.isArray(item.specialties)
              ? item.specialties
              : Array.isArray(item.specialities)
              ? item.specialities
              : [],
          reraApproved: !!item.rera_number,
        }));

        setProjects(normalizedProjects);
      } catch (error) {
        console.error("Fetch projects error:", error);
        setApiError(error.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    const handleRefresh = () => {
    fetchProjects();
  };

  window.addEventListener("projectDeleted", handleRefresh);

  return () => {
    window.removeEventListener("projectDeleted", handleRefresh);
  };
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ possession: "", status: "", type: "", city: "" });
    setSearchQuery("");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesSearch =
        searchQuery === "" ||
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPossession =
        !filters.possession || proj.possession === filters.possession;
      const matchesStatus = !filters.status || proj.status === filters.status;
      const matchesType = !filters.type || proj.type === filters.type;
      const matchesCity = !filters.city || proj.city === filters.city;

      return (
        matchesSearch &&
        matchesPossession &&
        matchesStatus &&
        matchesType &&
        matchesCity
      );
    });
  }, [projects, searchQuery, filters]);

  const isFilterActive =
    searchQuery || Object.values(filters).some((value) => value !== "");

  const cityOptions = [...new Set(projects.map((item) => item.city).filter(Boolean))];

  return (
    <div
      className="max-w-7xl mx-auto space-y-6 p-4 md:p-6"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <header className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Project Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all projects and open detail or management pages
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="relative w-full xl:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search name, city, developer or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => navigate("/admin/projects/create")}
            className="flex items-center justify-center gap-2 bg-[#005596] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
          >
            <Plus size={16} />
            Create Project
          </button>
        </div>
      </header>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Projects"
          value={projects.length}
          icon={<Building2 size={18} />}
        />
        <StatCard
          label="Residential"
          value={projects.filter((p) => p.type === "Residential").length}
        />
        <StatCard
          label="Commercial"
          value={projects.filter((p) => p.type === "Commercial").length}
        />
        <StatCard
          label="RERA Approved"
          value={projects.filter((p) => p.reraApproved).length}
        />
      </div>

      <div className="bg-white p-3 rounded-[8px] border border-gray-100 flex flex-wrap items-center gap-3 shadow-sm">
        <FilterSelect
          label="Possession"
          name="possession"
          value={filters.possession}
          options={["Ready to Move", "Under Construction"]}
          onChange={handleFilterChange}
        />
        <FilterSelect
          label="Status"
          name="status"
          value={filters.status}
          options={["Ongoing", "Upcoming", "Completed", "Ready to Move"]}
          onChange={handleFilterChange}
        />
        <FilterSelect
          label="Type"
          name="type"
          value={filters.type}
          options={["Commercial", "Residential"]}
          onChange={handleFilterChange}
        />
        <FilterSelect
          label="City"
          name="city"
          value={filters.city}
          options={cityOptions}
          onChange={handleFilterChange}
        />

        {isFilterActive && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-red-500 hover:bg-red-50 rounded-[6px] transition-colors uppercase tracking-widest"
          >
            <RotateCcw size={14} /> Clear All
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">
          Projects ({loading ? "..." : filteredProjects.length})
        </h3>
      </div>

      {loading ? (
        <div className="py-20 text-center bg-white rounded-[8px] border border-gray-100">
          <p className="text-gray-400 font-bold text-sm">Loading projects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-gray-200 rounded-[10px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <img
                  src={
                    proj.galleryImages?.[0] ||
                    "https://via.placeholder.com/800x500?text=No+Image"
                  }
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {proj.reraApproved && (
                  <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-[4px] flex items-center gap-1 shadow-sm">
                    <ShieldCheck size={12} className="text-green-600" />
                    <span className="text-[9px] font-bold text-gray-700 uppercase">
                      RERA Approved
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {proj.status}
                  </span>
                  <span className="bg-white/95 text-gray-700 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {proj.type}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {proj.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-[8px]">
                  <InfoBlock label="Budget Range" value={proj.budgetRange} />
                  <InfoBlock label="Rate / Sqft" value={proj.ratePerSqft} />
                  <InfoBlock label="Possession" value={proj.possession} />
                  <InfoBlock label="Market Value" value={proj.marketValue} />
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => navigate(`/admin/projects/${proj.id}`)}
                    className="flex items-center bg-orange-500 justify-center gap-2 w-full border border-blue-200 text-[#000000] py-2.5 rounded-[8px] text-xs font-bold hover:bg-blue-50 transition-all"
                  >
                    <Eye size={14} />
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[8px] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-bold text-sm">
            No projects found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-blue-500 text-xs font-bold underline"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
          {label}
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
      </div>
      <div className="text-blue-600">{icon}</div>
    </div>
  </div>
);

const FilterSelect = ({ label, name, value, options, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    className={`bg-gray-50 border px-3 py-2 rounded-[8px] text-xs font-bold outline-none min-w-[140px] transition-all ${
      value
        ? "border-blue-500 text-blue-600 bg-blue-50/30"
        : "border-gray-200 text-gray-600"
    }`}
  >
    <option value="">{label}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const InfoBlock = ({ label, value }) => (
  <div>
    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
      {label}
    </p>
    <p className="text-[11px] font-bold text-gray-700 mt-1">{value}</p>
  </div>
);

export default ProjectList;