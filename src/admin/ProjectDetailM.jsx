import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Building2,
  FileText,
  IndianRupee,
  Ruler,
  MapPinned,
  BadgeInfo,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(`https://workiees.com/api/projects/${id}`);

        const text = await response.text();
        console.log("PROJECT DETAIL RAW RESPONSE:", text);

        let result;
        try {
          result = JSON.parse(text);
        } catch (err) {
          throw new Error("API is not returning valid JSON");
        }

        console.log("PROJECT DETAIL PARSED RESPONSE:", result);

        const item =
          result?.data || result?.project || result?.details || result;

        if (!item || typeof item !== "object") {
          throw new Error("Project detail not found");
        }

        const normalizedProject = {
          id: item.id || item.project_id || id,
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
          description: item.description || "No description available.",
          brochureUrl: item.brochure_file
            ? `https://workiees.com/${item.brochure_file}`
            : "",
          videoUrl: item.video_url || "",

          galleryImages: Array.isArray(item.images)
            ? item.images
            : typeof item.images === "string"
              ? item.images
                  .split(",")
                  .map((img) => img.trim())
                  .filter(Boolean)
              : item.image
                ? [item.image]
                : [],
          amenities:
            typeof item.amenities === "string"
              ? item.amenities
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : Array.isArray(item.amenities)
                ? item.amenities
                : [],
          specialities:
            typeof item.specialties === "string"
              ? item.specialties
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : typeof item.specialities === "string"
                ? item.specialities
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean)
                : Array.isArray(item.specialties)
                  ? item.specialties
                  : Array.isArray(item.specialities)
                    ? item.specialities
                    : [],
          reraApproved: !!item.rera_number,
        };

        setProject(normalizedProject);
        setActiveIndex(0);
      } catch (error) {
        console.error("Fetch project detail error:", error);
        setApiError(error.message || "Failed to load project detail");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  const mediaItems = useMemo(() => {
    if (!project) return [];

    const images = (project.galleryImages || []).map((src, index) => ({
      id: `img-${index}`,
      type: "image",
      src,
    }));

    const video = project.videoUrl
      ? [
          {
            id: "video-0",
            type: "video",
            src: project.videoUrl,
          },
        ]
      : [];

    return [...images, ...video];
  }, [project]);

  const goPrev = () => {
    if (!mediaItems.length) return;
    setActiveIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (!mediaItems.length) return;
    setActiveIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate("/admin/project")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            Loading project...
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while project details are being loaded.
          </p>
        </div>
      </div>
    );
  }

  if (apiError || !project) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate("/admin/projects")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-800">Project not found</h2>
          <p className="text-sm text-red-500 mt-2">
            {apiError || "The requested project does not exist."}
          </p>
        </div>
      </div>
    );
  }

  const activeMedia = mediaItems[activeIndex];

  return (
    <div
      className="max-w-7xl mx-auto p-4 md:p-6 space-y-6"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/project")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <Building2 size={12} />
              {project.developerName}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <MapPin size={12} />
              {project.city}
            </span>

            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase">
              {project.status}
            </span>

            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase">
              {project.type}
            </span>

            {project.reraApproved && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase">
                <ShieldCheck size={12} />
                RERA Approved
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate(`/admin/projects/manage/${project.id}`)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#005596] text-white text-sm font-bold hover:bg-blue-700"
        >
          <Settings size={16} />
          Manage Project
        </button>
      </div>

      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard
            title="Project Media Slider"
            icon={<ImageIcon size={16} />}
          >
            <div className="space-y-4">
              <div className="relative bg-black rounded-2xl overflow-hidden">
                <div className="w-full h-[320px] md:h-[420px]">
                  {activeMedia ? (
                    activeMedia.type === "image" ? (
                      <img
                        src={activeMedia.src}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={activeMedia.src}
                        controls
                        className="w-full h-full object-cover bg-black"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/70 text-sm">
                      No media available
                    </div>
                  )}
                </div>

                {mediaItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {mediaItems.length > 0 && (
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                    {activeIndex + 1} / {mediaItems.length}
                  </div>
                )}
              </div>

              {mediaItems.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {mediaItems.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeIndex === index
                          ? "border-[#005596]"
                          : "border-transparent"
                      }`}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.src}
                          alt={`thumb-${index}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                          <video
                            src={item.src}
                            className="w-full h-full object-cover opacity-70"
                          />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle size={24} className="text-white" />
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Project Description"
            icon={<BadgeInfo size={16} />}
          >
            <p className="text-sm text-gray-600 leading-7">
              {project.description}
            </p>
          </SectionCard>

          <SectionCard title="Amenities" icon={<Building2 size={16} />}>
            <div className="flex flex-wrap gap-2">
              {project.amenities.length > 0 ? (
                project.amenities.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No amenities available</p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Specialities" icon={<ShieldCheck size={16} />}>
            <div className="flex flex-wrap gap-2">
              {project.specialities.length > 0 ? (
                project.specialities.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-xs font-bold"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No specialities available
                </p>
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Quick Information">
            <div className="space-y-4">
              <InfoRow label="Developer" value={project.developerName} />
              <InfoRow label="Address" value={project.address} />
              <InfoRow label="Possession" value={project.possession} />
              <InfoRow label="RERA No." value={project.reraNo} />
              <InfoRow label="Type" value={project.type} />
              <InfoRow label="Status" value={project.status} />
            </div>
          </SectionCard>

          <SectionCard title="Pricing & Area">
            <div className="space-y-4">
              <InfoRow
                label="Market Value"
                value={project.marketValue}
                icon={<IndianRupee size={14} />}
              />
              <InfoRow
                label="Rate Per Sqft"
                value={project.ratePerSqft}
                icon={<IndianRupee size={14} />}
              />
              <InfoRow
                label="Budget Range"
                value={project.budgetRange}
                icon={<IndianRupee size={14} />}
              />
              <InfoRow
                label="Total Plot"
                value={project.totalPlot}
                icon={<Ruler size={14} />}
              />
              <InfoRow
                label="Built Up Area"
                value={project.builtUpArea}
                icon={<Ruler size={14} />}
              />
            </div>
          </SectionCard>

          <SectionCard title="Documents & Links">
            <div className="space-y-3">
              {project.brochureUrl ? (
                <a
                  href={project.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  <FileText size={16} />
                  View Brochure
                </a>
              ) : (
                <div className="flex items-center gap-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-400">
                  <FileText size={16} />
                  Brochure not available
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate(`/admin/projects/unit/${project.id}`)}
                className="flex items-center gap-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                <FileText size={16} />
                View Unit Inventory
              </button>

              {project.mapLink ? (
                <a
                  href={project.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  <MapPinned size={16} />
                  Open Map Location
                </a>
              ) : (
                <div className="flex items-center gap-3 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-400">
                  <MapPinned size={16} />
                  Map location not available
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
    <div className="flex items-center gap-2 mb-4">
      {icon && <span className="text-[#005596]">{icon}</span>}
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
    <div className="flex items-center gap-2 min-w-[130px]">
      {icon && <span className="text-gray-400">{icon}</span>}
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </p>
    </div>
    <p className="text-sm font-semibold text-gray-700 text-right">
      {value || "-"}
    </p>
  </div>
);

export default ProjectDetail;
