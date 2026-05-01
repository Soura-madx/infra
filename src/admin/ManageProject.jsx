import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Upload, X } from "lucide-react";
import PrarambhLoader from "../component/PrarambhLoader";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    developerName: "",
    city: "",
    address: "",
    status: "",
    type: "",
    possession: "",
    marketValue: "",
    totalPlot: "",
    builtUpArea: "",
    reraNo: "",
    mapLink: "",
    ratePerSqft: "",
    budgetRange: "",
    description: "",
    brochureFileName: "",
    galleryImages: [],
    videoUrl: "",
    amenities: [""],
    specialities: [""],
    reraApproved: false,
  });

  const [newImages, setNewImages] = useState([]);
  const [deletedOldImages, setDeletedOldImages] = useState([]);
  const [newVideo, setNewVideo] = useState(null);
  const [removeOldVideo, setRemoveOldVideo] = useState(false);
  const [newBrochure, setNewBrochure] = useState(null);
  const [removeOldBrochure, setRemoveOldBrochure] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");
        setProjectNotFound(false);

        // YAHAN apna actual fetch endpoint lagao
        // Example:
        // const response = await fetch(`https://workiees.com/api/projects/details?id=${id}`);

        const response = await fetch(
          `https://workiees.com/api/projects/update/${id}`,
        );
        const text = await response.text();
        console.log("PROJECT DETAILS RAW:", text);

        let result;
        try {
          result = JSON.parse(text);
        } catch {
          throw new Error("Project details API JSON return nahi kar rahi");
        }

        console.log("PROJECT DETAILS PARSED:", result);

        const project =
          result?.project || result?.data?.project || result?.data || result;

        if (!project || typeof project !== "object") {
          setProjectNotFound(true);
          return;
        }

        setFormData({
          id: project.id || id || "",
          name: project.project_name || project.name || "",
          developerName: project.developer_name || project.developerName || "",
          city: project.city || "",
          address: project.full_address || project.address || "",
          status: project.status || "",
          type: project.project_type || project.type || "",
          possession: project.construction_status || project.possession || "",
          marketValue: project.market_value || project.marketValue || "",
          totalPlot: project.total_plots || project.totalPlot || "",
          builtUpArea: project.build_area || project.builtUpArea || "",
          reraNo: project.rera_number || project.reraNo || "",
          mapLink: project.location || project.mapLink || "",
          ratePerSqft: project.rate_per_sqft || project.ratePerSqft || "",
          budgetRange: project.budget_range || project.budgetRange || "",
          description: project.description || "",
          brochureFileName:
            project.brochure_file || project.brochureFileName || "",
          galleryImages: Array.isArray(project.images) ? project.images : [],
          videoUrl: project.video_url || project.videoUrl || "",
          amenities: Array.isArray(project.amenities)
            ? project.amenities.length
              ? project.amenities
              : [""]
            : typeof project.amenities === "string"
              ? project.amenities
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean).length
                ? project.amenities
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [""]
              : [""],
          specialities: Array.isArray(
            project.specialities || project.speciality,
          )
            ? project.specialities || project.speciality
            : typeof (project.specialities || project.speciality) === "string"
              ? (project.specialities || project.speciality)
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean).length
                ? (project.specialities || project.speciality)
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [""]
              : [""],
          reraApproved:
            project.rera_approved == 1 || project.reraApproved === true,
        });
      } catch (err) {
        console.error("Fetch project error:", err);
        setError(err.message || "Project load nahi ho paya");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updated.length ? updated : [""],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (img) => {
    setDeletedOldImages((prev) => [...prev, img]);
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((item) => item !== img),
    }));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewVideo(file);
      setRemoveOldVideo(false);
    }
  };

  const handleBrochureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBrochure(file);
      setRemoveOldBrochure(false);
    }
  };

  const normalizeNumber = (value) => {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/[^\d.]/g, "")
      .trim();
  };

  const normalizeType = (type) => {
    if (!type) return "";
    const t = type.toLowerCase();

    if (t === "residential") return "Residential";
    if (t === "commercial") return "Commercial";

    return "";
  };

  const normalizeStatus = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();

    if (s === "upcoming") return "Upcoming";
    if (s === "ongoing") return "Ongoing";
    if (s === "completed") return "Completed";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload = new FormData();

      payload.append("project_id", String(id));
      payload.append("project_name", formData.name?.trim() || "");
      payload.append("description", formData.description?.trim() || "");
      payload.append("developer_name", formData.developerName?.trim() || "");
      payload.append("rera_number", formData.reraNo?.trim() || "");

      // ✅ FIXED ENUM
      payload.append("project_type", normalizeType(formData.type));
      payload.append("status", normalizeStatus(formData.status));

      payload.append("construction_status", formData.possession?.trim() || "");
      payload.append("full_address", formData.address?.trim() || "");
      payload.append("location", formData.mapLink?.trim() || "");
      payload.append("city", formData.city?.trim() || "");

      if (formData.marketValue)
        payload.append("market_value", normalizeNumber(formData.marketValue));

      if (formData.totalPlot)
        payload.append("total_plots", normalizeNumber(formData.totalPlot));

      if (formData.ratePerSqft)
        payload.append("rate_per_sqft", normalizeNumber(formData.ratePerSqft));

      payload.append("build_area", formData.builtUpArea?.trim() || "");
      payload.append("budget_range", formData.budgetRange?.trim() || "");

      payload.append(
        "amenities",
        formData.amenities
          .map((i) => i.trim())
          .filter(Boolean)
          .join(","),
      );

      payload.append(
        "specialities",
        formData.specialities
          .map((i) => i.trim())
          .filter(Boolean)
          .join(","),
      );

      payload.append("rera_approved", formData.reraApproved ? "1" : "0");

      // ✅ FILE FIX
      if (newVideo) {
        payload.append("video", newVideo);
      }

      if (newBrochure) {
        payload.append("brochure", newBrochure);
      }

      newImages.forEach((file) => {
        payload.append("images[]", file);
      });

      console.log("--------- PAYLOAD ---------");
      for (const pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch("https://workiees.com/api/projects/update", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || result.status === false) {
        throw new Error(result.message || "Validation error");
      }

      alert("Project updated successfully");
      navigate(`/admin/projects/manage/${id}`);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <PrarambhLoader/>
        </div>
      </div>
    );
  }

  if (projectNotFound) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate("/admin/project")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold text-gray-800">Project not found</h2>
        </div>
      </div>
    );
  }

 const handleDeleteProject = async () => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    const response = await fetch("https://workiees.com/api/projects/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_id: id }),
    });

    const result = await response.json();

    if (!response.ok || result.status === false) {
      throw new Error(result.message || "Delete failed");
    }

    alert("Deleted successfully");

    // 🔥 EVENT FIRE
    window.dispatchEvent(new Event("projectDeleted"));

    navigate("/admin/project");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div
      className="max-w-6xl mx-auto p-4 md:p-6 space-y-6"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <div>
        <button
          onClick={() => navigate(`/admin/projects/${id}`)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Manage Project
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mt-2">Edit Project</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update all project information, media, brochure, amenities, and
          specialities.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Developer Name"
              name="developerName"
              value={formData.developerName}
              onChange={handleChange}
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <label>
              <span className="text-xs font-bold">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full border px-4 py-3 rounded-xl"
              >
                <option value="">Select Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <label>
              <span className="text-xs font-bold">Type</span>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-2 w-full border px-4 py-3 rounded-xl"
              >
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>
            <label>
              <span className="text-xs font-bold">Possession</span>
              <select
                name="possession"
                value={formData.possession}
                onChange={handleChange}
                className="mt-2 w-full border px-4 py-3 rounded-xl"
              >
                <option value="">Select Possession</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
              </select>
            </label>
            <InputField
              label="RERA No."
              name="reraNo"
              value={formData.reraNo}
              onChange={handleChange}
            />
          </div>
        </SectionCard>

        <SectionCard title="Pricing & Area">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Market Value"
              name="marketValue"
              value={formData.marketValue}
              onChange={handleChange}
            />
            <InputField
              label="Rate Per Sqft"
              name="ratePerSqft"
              value={formData.ratePerSqft}
              onChange={handleChange}
            />
            <InputField
              label="Budget Range"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
            />
            <InputField
              label="Total Plot"
              name="totalPlot"
              value={formData.totalPlot}
              onChange={handleChange}
            />
            <InputField
              label="Built Up Area"
              name="builtUpArea"
              value={formData.builtUpArea}
              onChange={handleChange}
            />
            <InputField
              label="Map Link"
              name="mapLink"
              value={formData.mapLink}
              onChange={handleChange}
            />
          </div>
        </SectionCard>

        <SectionCard title="Description">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Project Description
            </span>
            <textarea
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#005596]"
            />
          </label>
        </SectionCard>

        <SectionCard title="Existing Images">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.galleryImages.length > 0 ? (
              formData.galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <img
                    src={img}
                    alt={`existing-${index}`}
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No existing images left.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Upload New Images">
          <label className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-sm font-bold text-gray-600 cursor-pointer hover:border-[#005596] hover:text-[#005596]">
            <Upload size={16} />
            Select Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {newImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {newImages.map((file, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`new-${index}`}
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Video">
          <div className="space-y-4">
            {formData.videoUrl && !removeOldVideo && !newVideo && (
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
                <video
                  src={formData.videoUrl}
                  controls
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-white">
                  <button
                    type="button"
                    onClick={() => setRemoveOldVideo(true)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
                  >
                    <Trash2 size={14} />
                    Remove Existing Video
                  </button>
                </div>
              </div>
            )}

            {newVideo && (
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
                <video
                  src={URL.createObjectURL(newVideo)}
                  controls
                  className="w-full h-64 object-cover"
                />
                <div className="p-3 bg-white">
                  <button
                    type="button"
                    onClick={() => setNewVideo(null)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
                  >
                    <X size={14} />
                    Remove New Video
                  </button>
                </div>
              </div>
            )}

            {!newVideo && (
              <label className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-sm font-bold text-gray-600 cursor-pointer hover:border-[#005596] hover:text-[#005596]">
                <Upload size={16} />
                Select Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Brochure">
          <div className="space-y-4">
            {formData.brochureFileName &&
              !removeOldBrochure &&
              !newBrochure && (
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    {formData.brochureFileName}
                  </p>
                  <button
                    type="button"
                    onClick={() => setRemoveOldBrochure(true)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              )}

            {newBrochure && (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-700">
                  {newBrochure.name}
                </p>
                <button
                  type="button"
                  onClick={() => setNewBrochure(null)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
                >
                  <X size={14} />
                  Remove New File
                </button>
              </div>
            )}

            {!newBrochure && (
              <label className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-sm font-bold text-gray-600 cursor-pointer hover:border-[#005596] hover:text-[#005596]">
                <Upload size={16} />
                Select Brochure
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleBrochureUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Amenities">
          <div className="space-y-3">
            {formData.amenities.map((item, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("amenities", index, e.target.value)
                  }
                  placeholder={`Amenity ${index + 1}`}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#005596]"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("amenities", index)}
                  className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addArrayField("amenities")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#005596] text-sm font-bold"
            >
              <Plus size={16} />
              Add Amenity
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Specialities">
          <div className="space-y-3">
            {formData.specialities.map((item, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("specialities", index, e.target.value)
                  }
                  placeholder={`Speciality ${index + 1}`}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#005596]"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("specialities", index)}
                  
                  className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addArrayField("specialities")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 text-sm font-bold"
            >
              <Plus size={16} />
              Add Speciality
            </button>
          </div>
        </SectionCard>

        <SectionCard title="RERA Approval">
          <label className="inline-flex items-center gap-3">
            <input
              type="checkbox"
              name="reraApproved"
              checked={formData.reraApproved}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-semibold text-gray-700">
              RERA Approved
            </span>
          </label>
        </SectionCard>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(`/admin/projects/manage/${id}`)}
            className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-3 rounded-xl bg-[#005596] text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Project"}
          </button>

          <button
            type="button"
            disabled={deletingId === id}
            onClick={() => handleDeleteProject(id)}
            className="px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700"
          >
            {deletingId === id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
    <h2 className="text-base font-bold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const InputField = ({ label, name, value, onChange }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
      {label}
    </span>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#005596]"
    />
  </label>
);

export default EditProject;
