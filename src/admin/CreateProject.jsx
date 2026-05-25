import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Upload,
  MapPinned,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react";

const emptyProject = {
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
  reraApproved: false,
  galleryImages: [],
  videoFile: null,
  brochureFile: null,
  amenities: [],
  specialities: [],
};

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyProject);
  const [amenityInput, setAmenityInput] = useState("");
  const [specialityInput, setSpecialityInput] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const imagePreviews = useMemo(() => {
    return formData.galleryImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  }, [formData.galleryImages]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...files],
    }));

    e.target.value = "";
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      videoFile: file,
    }));
  };

  const handleBrochureUpload = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      brochureFile: file,
    }));
  };

  const addAmenity = () => {
    const value = amenityInput.trim();
    if (!value) return;
    if (formData.amenities.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, value],
    }));
    setAmenityInput("");
  };

  const removeAmenity = (item) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((amenity) => amenity !== item),
    }));
  };

  const addSpeciality = () => {
    const value = specialityInput.trim();
    if (!value) return;
    if (formData.specialities.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      specialities: [...prev.specialities, value],
    }));
    setSpecialityInput("");
  };

  const removeSpeciality = (item) => {
    setFormData((prev) => ({
      ...prev,
      specialities: prev.specialities.filter(
        (speciality) => speciality !== item,
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.developerName.trim())
      newErrors.developerName = "Developer name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.possession) newErrors.possession = "Possession is required";
    if (!formData.marketValue.trim())
      newErrors.marketValue = "Market value is required";
    if (!formData.totalPlot.trim())
      newErrors.totalPlot = "Total plot is required";
    if (!formData.builtUpArea.trim())
      newErrors.builtUpArea = "Built up area is required";
    if (!formData.reraNo.trim()) newErrors.reraNo = "RERA no. is required";
    if (!formData.ratePerSqft.trim())
      newErrors.ratePerSqft = "Rate per sqft is required";
    if (!formData.budgetRange.trim())
      newErrors.budgetRange = "Budget range is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("project_name", formData.name);
      payload.append("developer_name", formData.developerName);
      payload.append("city", formData.city);
      payload.append("full_address", formData.address);
      payload.append("status", formData.status);
      payload.append("project_type", formData.type);
      payload.append("construction_status", formData.possession);
      payload.append("market_value", formData.marketValue);
      payload.append("total_plots", formData.totalPlot);
      payload.append("build_area", formData.builtUpArea);
      payload.append("rera_number", formData.reraNo);
      payload.append("location", formData.mapLink);
      payload.append("rate_per_sqft", formData.ratePerSqft);
      payload.append("budget_range", formData.budgetRange);
      payload.append("description", formData.description);
      

      payload.append("amenities", formData.amenities.join(", "));
      payload.append("specialties", formData.specialities.join(", "));

      formData.galleryImages.forEach((file) => {
        payload.append("images[]", file);
      });

      if (formData.videoFile) {
        payload.append("video", formData.videoFile);
      }

      if (formData.brochureFile) {
        payload.append("brochure", formData.brochureFile);
      }

      const response = await fetch("https://workiees.com/api/projects/add", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create project");
      }

      alert("Project created successfully");

      setFormData(emptyProject);
      setAmenityInput("");
      setSpecialityInput("");
      setErrors({});
    } catch (error) {
      console.error("Create project error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto p-4 md:p-6 space-y-6"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/project")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#005596] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Create Project
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add a new project with file upload support
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <FormField label="Project Name" error={errors.name}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                className="input-style"
              />
            </FormField>

            <FormField label="Developer Name" error={errors.developerName}>
              <input
                type="text"
                name="developerName"
                value={formData.developerName}
                onChange={handleChange}
                placeholder="Enter developer name"
                className="input-style"
              />
            </FormField>

            <FormField label="City" error={errors.city}>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-style"
              >
                
                <option value="Indore">Indore</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Dewas">Dewas</option>
              </select>
            </FormField>

            <FormField label="Status" error={errors.status}>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-style"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </FormField>

            <FormField label="Project Type" error={errors.type}>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-style"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Residential + Commercial">
                  Residential + Commercial
                </option>
              </select>
            </FormField>

            <FormField label="Property Type" error={errors.possession}>
              <select
                name="possession"
                value={formData.possession}
                onChange={handleChange}
                className="input-style"
              >
                <option value="Raw House">Raw House</option>
                <option value="Flats">Flats</option>
                <option value="Plots">Plots</option>
                <option value="P+C">P+C</option>
                <option value="Shop">Shop</option>
                <option value="Office">Office</option>
                <option value="Farming Land">Farming Land</option>
              </select>
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Location & Approval">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Address" error={errors.address}>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                placeholder="Enter full address"
                className="input-style resize-none"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4">
              <FormField label="RERA No." error={errors.reraNo}>
                <input
                  type="text"
                  name="reraNo"
                  value={formData.reraNo}
                  onChange={handleChange}
                  placeholder="Enter RERA number"
                  className="input-style"
                />
              </FormField>

              <FormField label="Map Integration Link">
                <div className="relative">
                  <MapPinned
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="mapLink"
                    value={formData.mapLink}
                    onChange={handleChange}
                    placeholder="Paste Google Maps link"
                    className="input-style pl-10"
                  />
                </div>
              </FormField>

              <label className="flex items-center gap-3 text-sm font-bold text-gray-700 pt-2">
                <input
                  type="checkbox"
                  name="reraApproved"
                  checked={formData.reraApproved}
                  onChange={handleChange}
                />
                RERA Approved
              </label>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Pricing & Area Details">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <FormField label="Market Value" error={errors.marketValue}>
              <input
                type="text"
                name="marketValue"
                value={formData.marketValue}
                onChange={handleChange}
                placeholder="Example: ₹3,200 / sqft"
                className="input-style"
              />
            </FormField>

            <FormField label="Total Plot" error={errors.totalPlot}>
              <input
                type="text"
                name="totalPlot"
                value={formData.totalPlot}
                onChange={handleChange}
                placeholder="Example: 12 Units"
                className="input-style"
              />
            </FormField>

            <FormField label="Built Up Area" error={errors.builtUpArea}>
              <input
                type="text"
                name="builtUpArea"
                value={formData.builtUpArea}
                onChange={handleChange}
                placeholder="Example: 1850 sqft"
                className="input-style"
              />
            </FormField>

            <FormField label="Rate Per Sqft" error={errors.ratePerSqft}>
              <input
                type="text"
                name="ratePerSqft"
                value={formData.ratePerSqft}
                onChange={handleChange}
                placeholder="Example: ₹3200"
                className="input-style"
              />
            </FormField>

            <FormField label="Budget Range" error={errors.budgetRange}>
              <input
                type="text"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                placeholder="Example: ₹45L - ₹85L"
                className="input-style"
              />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Gallery & Documents">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
                <ImageIcon size={16} />
                Upload Gallery Images
              </h3>

              <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload size={20} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-bold text-gray-700">
                    Select image files
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    You can upload multiple images
                  </p>
                </div>
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((item, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                      <img
                        src={item.preview}
                        alt={`preview-${index}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-[11px] text-gray-600 truncate">
                          {item.file.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Upload Project Video">
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                  <Video size={16} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {formData.videoFile
                      ? formData.videoFile.name
                      : "Select video file"}
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </FormField>

              <FormField label="Upload Brochure">
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                  <FileText size={16} className="text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {formData.brochureFile
                      ? formData.brochureFile.name
                      : "Select brochure file"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleBrochureUpload}
                    className="hidden"
                  />
                </label>
              </FormField>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Amenities">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add surrounding amenity"
                className="input-style"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="px-4 py-2.5 rounded-lg bg-[#005596] text-white text-sm font-bold hover:bg-blue-700"
              >
                Add Amenity
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((item) => (
                <TagItem
                  key={item}
                  label={item}
                  onRemove={() => removeAmenity(item)}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Specialities">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={specialityInput}
                onChange={(e) => setSpecialityInput(e.target.value)}
                placeholder="Add speciality like TNCP Approved"
                className="input-style"
              />
              <button
                type="button"
                onClick={addSpeciality}
                className="px-4 py-2.5 rounded-lg bg-[#005596] text-white text-sm font-bold hover:bg-blue-700"
              >
                Add Speciality
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.specialities.map((item) => (
                <TagItem
                  key={item}
                  label={item}
                  onRemove={() => removeSpeciality(item)}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Description">
          <FormField label="Project Description" error={errors.description}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Write full project description"
              className="input-style resize-none"
            />
          </FormField>
        </SectionCard>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-5 py-3 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#005596] text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            <Upload size={16} />
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>

      <style>{`
        .input-style {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 0.9rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
          background: white;
        }

        .input-style:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-6">
    <h2 className="text-base font-bold text-gray-800 mb-5">{title}</h2>
    {children}
  </div>
);

const FormField = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TagItem = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="text-blue-700 hover:text-red-500"
    >
      <Trash2 size={12} />
    </button>
  </span>
);

export default CreateProject;
