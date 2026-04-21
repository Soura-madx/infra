import * as XLSX from "xlsx";
import React, { useMemo, useState } from "react";
import {
  RotateCcw,
  MapPin,
  Construction,
  Maximize,
  Compass,
  ArrowLeft,
  Plus,
  Upload,
  Pencil,
  Trash2,
  Eye,
  FileSpreadsheet,
  X,
} from "lucide-react";

const UnitInventoryAdmin = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);

  const [editForm, setEditForm] = useState({
    unitNo: "",
    bhk: "",
    price: "",
    displayPrice: "",
    status: "",
    type: "",
    category: "",
    facing: "",
    amenities: "",
    area: "",
    floor: "",
    tower: "",
    projectName: "",
  });

  const initialFilters = {
    type: "All",
    category: "Buy",
    bhk: "All",
    budget: "All",
    facing: "All",
    status: "All",
    amenities: [],
  };

  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const [allUnits, setAllUnits] = useState([
    {
      id: 101,
      unitNo: "A-101",
      bhk: "2BHK",
      price: 4500000,
      displayPrice: "₹45L",
      status: "Available",
      type: "Apartment",
      category: "Buy",
      facing: "East",
      amenities: ["Gym"],
      area: "1250 Sq.Ft",
      floor: "10th Floor",
      tower: "A",
      projectName: "Shivangan Valley",
    },
    {
      id: 102,
      unitNo: "A-203",
      bhk: "3BHK",
      price: 6500000,
      displayPrice: "₹65L",
      status: "Booked",
      type: "House",
      category: "Buy",
      facing: "North",
      amenities: ["Pool"],
      area: "1650 Sq.Ft",
      floor: "12th Floor",
      tower: "A",
      projectName: "Shivangan Valley",
    },
    {
      id: 103,
      unitNo: "B-104",
      bhk: "1BHK",
      price: 15000,
      displayPrice: "₹15k",
      status: "Resale",
      type: "Apartment",
      category: "Rent",
      facing: "West",
      amenities: [],
      area: "650 Sq.Ft",
      floor: "1st Floor",
      tower: "B",
      projectName: "Mangal Murti",
    },
    {
      id: 104,
      unitNo: "C-501",
      bhk: "4BHK",
      price: 9500000,
      displayPrice: "₹95L",
      status: "Sold Out",
      type: "House",
      category: "Sell",
      facing: "South",
      amenities: ["Gym"],
      area: "2200 Sq.Ft",
      floor: "5th Floor",
      tower: "C",
      projectName: "RK Nivash",
    },
    {
      id: 105,
      unitNo: "A-301",
      bhk: "2BHK",
      price: 4200000,
      displayPrice: "₹42L",
      status: "Available",
      type: "Apartment",
      category: "Buy",
      facing: "East",
      amenities: [],
      area: "1180 Sq.Ft",
      floor: "3rd Floor",
      tower: "A",
      projectName: "Green Heights",
    },
  ]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500 text-white border-green-600";
      case "Booked":
        return "bg-orange-500 text-white border-orange-600";
      case "Sold Out":
        return "bg-red-500 text-white border-red-600";
      case "Resale":
        return "bg-yellow-400 text-black border-yellow-500";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  const stats = {
    Available: allUnits.filter((u) => u.status === "Available").length,
    Booked: allUnits.filter((u) => u.status === "Booked").length,
    Sold: allUnits.filter((u) => u.status === "Sold Out").length,
    Resale: allUnits.filter((u) => u.status === "Resale").length,
  };

  const filteredUnits = useMemo(() => {
    return allUnits.filter((unit) => {
      const matchStatus =
        activeFilters.status === "All" || unit.status === activeFilters.status;
      const matchCategory =
        activeFilters.category === "All" ||
        unit.category === activeFilters.category;
      const matchBhk =
        activeFilters.bhk === "All" || unit.bhk === activeFilters.bhk;
      const matchType =
        activeFilters.type === "All" || unit.type === activeFilters.type;
      const matchFacing =
        activeFilters.facing === "All" || unit.facing === activeFilters.facing;
      const matchAmenities =
        activeFilters.amenities.length === 0 ||
        activeFilters.amenities.every((a) => unit.amenities.includes(a));

      let matchBudget = true;
      if (activeFilters.budget !== "All") {
        const [min, max] = activeFilters.budget.split("-").map(Number);
        matchBudget = unit.price >= min && (max ? unit.price <= max : true);
      }

      return (
        matchStatus &&
        matchCategory &&
        matchBhk &&
        matchType &&
        matchFacing &&
        matchAmenities &&
        matchBudget
      );
    });
  }, [activeFilters, allUnits]);

  const toggleAmenity = (amenity) => {
    const next = activeFilters.amenities.includes(amenity)
      ? activeFilters.amenities.filter((a) => a !== amenity)
      : [...activeFilters.amenities, amenity];

    setActiveFilters({ ...activeFilters, amenities: next });
  };

  const handleDeleteUnit = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this unit?");
    if (!confirmDelete) return;

    setAllUnits((prev) => prev.filter((unit) => unit.id !== id));

    if (selectedUnit?.id === id) setSelectedUnit(null);
    if (editingUnit?.id === id) setEditingUnit(null);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const importedUnits = jsonData.map((row, index) => {
          const normalizedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              String(key).toLowerCase().trim(),
              value,
            ])
          );

          const price = Number(normalizedRow["price"]) || 0;

          return {
            id: Date.now() + index,
            unitNo: normalizedRow["unit no"] || normalizedRow["unitno"] || "N/A",
            bhk: normalizedRow["bhk"] || "2BHK",
            price,
            displayPrice:
              normalizedRow["display price"] || `₹${price.toLocaleString("en-IN")}`,
            status: normalizedRow["status"] || "Available",
            type: normalizedRow["type"] || "Apartment",
            category: normalizedRow["category"] || "Buy",
            facing: normalizedRow["facing"] || "East",
            amenities: normalizedRow["amenities"]
              ? String(normalizedRow["amenities"])
                  .split(",")
                  .map((a) => a.trim())
                  .filter(Boolean)
              : [],
            area: normalizedRow["area"] || "0 Sq.Ft",
            floor: normalizedRow["floor"] || "1st Floor",
            tower: normalizedRow["tower"] || "A",
            projectName:
              normalizedRow["project"] ||
              normalizedRow["project name"] ||
              "Shivangan Valley",
          };
        });

        setAllUnits((prev) => [...prev, ...importedUnits]);
        setShowImportModal(false);
        setUploadedFileName("");
        e.target.value = "";
      } catch (error) {
        console.error("Excel import error:", error);
        alert("Failed to import Excel file. Please check the file format.");
      }
    };

    reader.onerror = () => {
      alert("Error reading file.");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleEditClick = (unit) => {
    setEditingUnit(unit);
    setEditForm({
      unitNo: unit.unitNo || "",
      bhk: unit.bhk || "",
      price: unit.price || "",
      displayPrice: unit.displayPrice || "",
      status: unit.status || "",
      type: unit.type || "",
      category: unit.category || "",
      facing: unit.facing || "",
      amenities: unit.amenities ? unit.amenities.join(", ") : "",
      area: unit.area || "",
      floor: unit.floor || "",
      tower: unit.tower || "",
      projectName: unit.projectName || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUnit = (e) => {
    e.preventDefault();

    const updatedUnit = {
      ...editingUnit,
      unitNo: editForm.unitNo,
      bhk: editForm.bhk,
      price: Number(editForm.price),
      displayPrice: editForm.displayPrice,
      status: editForm.status,
      type: editForm.type,
      category: editForm.category,
      facing: editForm.facing,
      amenities: editForm.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      area: editForm.area,
      floor: editForm.floor,
      tower: editForm.tower,
      projectName: editForm.projectName,
    };

    setAllUnits((prev) =>
      prev.map((unit) => (unit.id === editingUnit.id ? updatedUnit : unit))
    );

    if (selectedUnit?.id === editingUnit.id) {
      setSelectedUnit(updatedUnit);
    }

    setEditingUnit(null);
  };

  if (selectedUnit) {
    return (
      <div
        className="max-w-6xl mx-auto p-8 animate-in fade-in duration-500"
        style={{ fontFamily: "'Varela Round', sans-serif" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedUnit(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-black font-black text-xs transition-all uppercase tracking-widest"
          >
            <ArrowLeft size={18} /> BACK TO INVENTORY
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleEditClick(selectedUnit)}
              className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-100 hover:scale-105 transition-all active:scale-95"
            >
              <Pencil size={16} /> EDIT UNIT
            </button>

            <button
              onClick={() => handleDeleteUnit(selectedUnit.id)}
              className="bg-red-600 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-red-100 hover:scale-105 transition-all active:scale-95"
            >
              <Trash2 size={16} /> DELETE UNIT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="aspect-video bg-gray-200 rounded-[40px] flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">
                  Admin Unit Preview
                </span>
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs text-center">
                {selectedUnit.unitNo} Layout / Floor Plan
              </p>
            </div>

            <div className="bg-white rounded-[35px] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 mb-5">
                Unit Details
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoTile icon={<Maximize size={20} />} label="Area" value={selectedUnit.area} />
                <InfoTile icon={<Compass size={20} />} label="Facing" value={selectedUnit.facing} />
                <InfoTile icon={<Construction size={20} />} label="Floor" value={selectedUnit.floor} />
                <InfoTile icon={<MapPin size={20} />} label="Tower" value={selectedUnit.tower} />
                <InfoTile icon={<FileSpreadsheet size={20} />} label="Category" value={selectedUnit.category} />
                <InfoTile icon={<Eye size={20} />} label="Project" value={selectedUnit.projectName} />
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedUnit.amenities.length > 0 ? (
                    selectedUnit.amenities.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No amenities added.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-1">{selectedUnit.unitNo}</h1>
                  <p className="text-lg font-bold text-blue-600">
                    {selectedUnit.bhk} • {selectedUnit.type}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-[10px] font-black border-2 ${getStatusStyles(
                    selectedUnit.status
                  )}`}
                >
                  {selectedUnit.status.toUpperCase()}
                </div>
              </div>

              <div className="border-t border-b py-8 my-6 border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Unit Price
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-gray-900">{selectedUnit.displayPrice}</p>
                  <p className="text-sm font-bold text-gray-400">Onwards</p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoRow label="Unit ID" value={selectedUnit.id} />
                <InfoRow label="Project Name" value={selectedUnit.projectName} />
                <InfoRow label="Type" value={selectedUnit.type} />
                <InfoRow label="Category" value={selectedUnit.category} />
                <InfoRow label="Facing" value={selectedUnit.facing} />
                <InfoRow label="Status" value={selectedUnit.status} />
              </div>
            </div>
          </div>
        </div>

        {editingUnit && (
          <EditUnitModal
            editForm={editForm}
            handleEditChange={handleEditChange}
            handleUpdateUnit={handleUpdateUnit}
            closeModal={() => setEditingUnit(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="max-w-[1600px] mx-auto p-6 flex gap-8 bg-gray-50 min-h-screen"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-gray-800">Import Units</h2>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50">
              <label className="cursor-pointer flex flex-col items-center gap-3">
                <Upload size={24} className="text-blue-600" />
                <span className="text-sm font-bold text-gray-700">Select XLSX File</span>
                <span className="text-xs text-gray-400">Upload unit inventory sheet</span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </label>
            </div>

            {uploadedFileName && (
              <div className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
                <p className="text-sm font-bold text-green-700">
                  Imported: {uploadedFileName}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {editingUnit && (
        <EditUnitModal
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleUpdateUnit={handleUpdateUnit}
          closeModal={() => setEditingUnit(null)}
        />
      )}

      <div className="w-80 shrink-0 space-y-5 bg-white p-6 rounded-3xl border-2 border-black shadow-sm h-fit sticky top-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-black text-gray-800">Inventory Filter</h2>
          <button
            onClick={() => setActiveFilters(initialFilters)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RotateCcw size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Transaction
          </h3>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["Buy", "Sell", "Rent"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilters({ ...activeFilters, category: cat })}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeFilters.category === cat
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Configuration (BHK)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {["All", "1BHK", "2BHK", "3BHK", "4BHK", "5BHK"].map((val) => (
              <button
                key={val}
                onClick={() => setActiveFilters({ ...activeFilters, bhk: val })}
                className={`py-2 text-[10px] font-black rounded-lg border transition-all ${
                  activeFilters.bhk === val
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white text-gray-500 hover:border-blue-200"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Budget
          </h3>
          <select
            value={activeFilters.budget}
            className="w-full p-3 text-sm border-0 bg-gray-100 rounded-xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setActiveFilters({ ...activeFilters, budget: e.target.value })
            }
          >
            <option value="All">Any Budget</option>
            <option value="0-50000">Under ₹50k (Rentals)</option>
            <option value="1000000-3000000">₹10L - ₹30L</option>
            <option value="3000000-6000000">₹30L - ₹60L</option>
            <option value="6000000-50000000">Above ₹60L</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Facing
            </h3>
            <select
              value={activeFilters.facing}
              className="w-full p-2 text-[11px] border rounded-lg font-bold"
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, facing: e.target.value })
              }
            >
              <option value="All">All</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Type
            </h3>
            <select
              value={activeFilters.type}
              className="w-full p-2 text-[11px] border rounded-lg font-bold"
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, type: e.target.value })
              }
            >
              <option value="All">All</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Plot">Plot</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Gym", "Pool", "Clubhouse"].map((amt) => (
              <button
                key={amt}
                onClick={() => toggleAmenity(amt)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition ${
                  activeFilters.amenities.includes(amt)
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-400"
                }`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-black hover:bg-green-700"
          >
            <Upload size={16} />
            IMPORT XLSX
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-black hover:bg-blue-700">
            <Plus size={16} />
            CREATE UNIT
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "AVAILABLE", count: stats.Available, color: "text-green-600", key: "Available" },
            { label: "BOOKED", count: stats.Booked, color: "text-orange-500", key: "Booked" },
            { label: "SOLD", count: stats.Sold, color: "text-red-500", key: "Sold Out" },
            { label: "RESALE", count: stats.Resale, color: "text-yellow-600", key: "Resale" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                const newStatus = activeFilters.status === item.key ? "All" : item.key;
                setActiveFilters({ ...activeFilters, status: newStatus });
              }}
              className={`p-4 rounded-xl bg-white border-2 transition-all text-center ${
                activeFilters.status === item.key
                  ? "border-blue-500 shadow-md scale-105 bg-blue-50/30"
                  : "border-transparent shadow-sm hover:border-gray-200"
              }`}
            >
              <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
              <p className="text-[10px] font-black text-gray-400 mt-1 tracking-widest">
                {item.label}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-gray-800">Units ({filteredUnits.length})</h3>
            <p className="text-xs font-bold text-gray-400">Admin Inventory Management</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className={`relative rounded-[20px] border-2 p-4 flex flex-col items-center justify-center transition-all h-44 ${getStatusStyles(
                  unit.status
                )}`}
              >
                <span className="absolute top-3 text-[9px] font-black uppercase tracking-widest opacity-70">
                  {unit.status}
                </span>

                <h4 className="text-xl font-bold mt-5 mb-1">{unit.unitNo}</h4>
                <p className="text-[10px] font-bold opacity-80 uppercase mb-1">
                  {unit.bhk} • {unit.type}
                </p>
                <p className="text-sm font-bold opacity-90 mb-2">{unit.projectName}</p>
                <p className="text-lg font-black">{unit.displayPrice}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedUnit(unit)}
                    className="p-2 rounded-lg bg-white/90 text-gray-800 hover:bg-white"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => handleEditClick(unit)}
                    className="p-2 rounded-lg bg-white/90 text-blue-700 hover:bg-white"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="p-2 rounded-lg bg-white/90 text-red-600 hover:bg-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 mt-4">
              <p className="text-gray-400 font-bold">No units found for selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditUnitModal = ({
  editForm,
  handleEditChange,
  handleUpdateUnit,
  closeModal,
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-black text-gray-800">Edit Unit</h2>
        <button onClick={closeModal} className="text-gray-400 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleUpdateUnit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="unitNo" value={editForm.unitNo} onChange={handleEditChange} placeholder="Unit No" className="p-3 border rounded-xl" />
        <select name="bhk" value={editForm.bhk} onChange={handleEditChange} className="p-3 border rounded-xl">
          <option value="">Select BHK</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="4BHK">4BHK</option>
          <option value="5BHK">5BHK</option>
        </select>

        <input type="number" name="price" value={editForm.price} onChange={handleEditChange} placeholder="Price" className="p-3 border rounded-xl" />
        <input type="text" name="displayPrice" value={editForm.displayPrice} onChange={handleEditChange} placeholder="Display Price" className="p-3 border rounded-xl" />

        <select name="status" value={editForm.status} onChange={handleEditChange} className="p-3 border rounded-xl">
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Sold Out">Sold Out</option>
          <option value="Resale">Resale</option>
        </select>

        <select name="type" value={editForm.type} onChange={handleEditChange} className="p-3 border rounded-xl">
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Plot">Plot</option>
          <option value="Land">Land</option>
        </select>

        <select name="category" value={editForm.category} onChange={handleEditChange} className="p-3 border rounded-xl">
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
          <option value="Rent">Rent</option>
        </select>

        <select name="facing" value={editForm.facing} onChange={handleEditChange} className="p-3 border rounded-xl">
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>

        <input type="text" name="area" value={editForm.area} onChange={handleEditChange} placeholder="Area" className="p-3 border rounded-xl" />
        <input type="text" name="floor" value={editForm.floor} onChange={handleEditChange} placeholder="Floor" className="p-3 border rounded-xl" />
        <input type="text" name="tower" value={editForm.tower} onChange={handleEditChange} placeholder="Tower" className="p-3 border rounded-xl" />
        <input type="text" name="projectName" value={editForm.projectName} onChange={handleEditChange} placeholder="Project Name" className="p-3 border rounded-xl" />

        <div className="md:col-span-2">
          <input
            type="text"
            name="amenities"
            value={editForm.amenities}
            onChange={handleEditChange}
            placeholder="Amenities (comma separated)"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
          <button type="button" onClick={closeModal} className="px-5 py-3 rounded-xl border font-bold">
            Cancel
          </button>
          <button type="submit" className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold">
            Update Unit
          </button>
        </div>
      </form>
    </div>
  </div>
);

const InfoTile = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
    <div className="text-blue-500 mb-2 flex justify-center">{icon}</div>
    <p className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">{label}</p>
    <p className="text-xs font-black text-gray-800">{value}</p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
    <p className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className="text-sm font-bold text-gray-800 text-right">{value}</p>
  </div>
);

export default UnitInventoryAdmin;