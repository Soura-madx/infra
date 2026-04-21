import React, { useMemo, useState } from "react";
import {
  RotateCcw,
  Share2,
  MapPin,
  Construction,
  Maximize,
  Compass,
  Star,
  Users,
  User,
  ArrowLeft,
} from "lucide-react";
import { useSales } from "../../Context/SalesContext";

const UnitInventory = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [activeAction, setActiveAction] = useState(null);

  const { leads, moveLeadToProspecting, moveLeadToSiteVisit } = useSales();

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

  const allUnits = [
    {
      id: 101,
      bhk: "2BHK",
      price: 4500000,
      displayPrice: "₹45L",
      status: "Available",
      type: "Apartment",
      category: "Buy",
      facing: "East",
      amenities: ["Gym"],
    },
    {
      id: 102,
      bhk: "3BHK",
      price: 6500000,
      displayPrice: "₹65L",
      status: "Booked",
      type: "House",
      category: "Buy",
      facing: "North",
      amenities: ["Pool"],
    },
    {
      id: 103,
      bhk: "1BHK",
      price: 15000,
      displayPrice: "₹15k",
      status: "Resale",
      type: "Apartment",
      category: "Rent",
      facing: "West",
      amenities: [],
    },
    {
      id: 104,
      bhk: "4BHK",
      price: 9500000,
      displayPrice: "₹95L",
      status: "Sold Out",
      type: "House",
      category: "Sell",
      facing: "South",
      amenities: ["Gym"],
    },
    {
      id: 105,
      bhk: "2BHK",
      price: 4200000,
      displayPrice: "₹42L",
      status: "Available",
      type: "Apartment",
      category: "Buy",
      facing: "East",
      amenities: [],
    },
    {
      id: 106,
      bhk: "2BHK",
      price: 4800000,
      displayPrice: "₹48L",
      status: "Available",
      type: "Apartment",
      category: "Buy",
      facing: "North",
      amenities: ["Pool"],
    },
    {
      id: 107,
      bhk: "3BHK",
      price: 6200000,
      displayPrice: "₹62L",
      status: "Booked",
      type: "House",
      category: "Buy",
      facing: "East",
      amenities: [],
    },
    {
      id: 108,
      bhk: "1BHK",
      price: 12000,
      displayPrice: "₹12k",
      status: "Resale",
      type: "Apartment",
      category: "Rent",
      facing: "South",
      amenities: [],
    },
  ];

  const eligibleLeads =
    activeAction === "prospecting"
      ? leads.filter((lead) => lead.status === "Suspecting")
      : leads.filter((lead) =>
          ["Suspecting", "Prospecting"].includes(lead.status),
        );

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
        return "bg-gray-100 text-gray-500";
    }
  };

  const stats = {
    Available: allUnits.filter((u) => u.status === "Available").length,
    Booked: allUnits.filter((u) => u.status === "Booked").length,
    Sold: allUnits.filter((u) => u.status === "Sold Out").length,
    Resale: allUnits.filter((u) => u.status === "Resale").length,
  };

  const handleMoveToTab = (details) => {
  if (details.action === "prospecting") {
    moveLeadToProspecting({
      leadId: details.leadId,
      unit: selectedUnit,
      followUpDate: details.followUp,
      note: details.note,
      qualification: details.qualification,
    });
  }

  if (details.action === "site-visit") {
    moveLeadToSiteVisit({
      leadId: details.leadId,
      unit: selectedUnit,
      visitDate: details.followUp,
      meetingPoint: details.meetingPoint,
      note: details.note,
      qualification: details.qualification,
    });
  }

  setActiveAction(null);
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
  }, [activeFilters]);

  const toggleAmenity = (amenity) => {
    const next = activeFilters.amenities.includes(amenity)
      ? activeFilters.amenities.filter((a) => a !== amenity)
      : [...activeFilters.amenities, amenity];

    setActiveFilters({ ...activeFilters, amenities: next });
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
              onClick={() => setActiveAction("prospecting")}
              className="bg-amber-500 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-100 hover:scale-105 transition-all active:scale-95"
            >
              <Star size={16} /> THINKING / INTERESTED
            </button>

            <button
              onClick={() => setActiveAction("site-visit")}
              className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-100 hover:scale-105 transition-all active:scale-95"
            >
              <MapPin size={16} /> SCHEDULE SITE VISIT
            </button>

            <button className="p-3 bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
              <Share2 size={18} />
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              BOOK NOW
            </button>
          </div>
        </div>

        {activeAction && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-black uppercase tracking-tight ${
                    activeAction === "prospecting"
                      ? "text-amber-600"
                      : "text-indigo-600"
                  }`}
                >
                  {activeAction === "prospecting"
                    ? "Move to Prospecting"
                    : "Schedule Site Visit"}
                </h2>
                <button
                  onClick={() => setActiveAction(null)}
                  className="text-gray-400 hover:text-black font-bold"
                >
                  X
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target);

                  handleMoveToTab({
                    leadId: fd.get("leadId"),
                    followUp: fd.get("followUp"),
                    meetingPoint: fd.get("meetingPoint"),
                    note: fd.get("note"),
                    action: activeAction,
                    qualification: {
                      age: fd.get("age") || "",
                      category: fd.get("category") || "",
                      occupation: fd.get("occupation") || "",
                      currentAddress: fd.get("currentAddress") || "",
                      ownHouse: fd.get("ownHouse") || "",
                      annualIncome: fd.get("annualIncome") || "",
                      isKeyDecisionMaker:
                        fd.get("isKeyDecisionMaker") === "true",
                      leadPotential: fd.get("leadPotential") || "",
                    },
                  });
                }}
                className="space-y-5 max-h-[85vh] overflow-y-auto pr-2"
              >
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-black text-blue-400 uppercase">
                    Linking Unit
                  </p>
                  <p className="text-sm font-black text-blue-900">
                    {selectedUnit.id} ({selectedUnit.bhk}) -{" "}
                    {selectedUnit.displayPrice}
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                    Select Client
                  </label>
                  <select
                    name="leadId"
                    required
                    className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold mt-1"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select lead
                    </option>
                    {eligibleLeads.map((lead) => (
                      <option key={lead.id} value={lead.id}>
                        {lead.name} - {lead.phone} - {lead.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border border-gray-200 rounded-3xl p-4 space-y-4">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-wide">
                    Client Details
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500">
                        Age
                      </label>
                      <input
                        name="age"
                        type="number"
                        placeholder="Eg. 34"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-500">
                        Category
                      </label>
                      <select
                        name="category"
                        required
                        defaultValue=""
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium mt-1"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500">
                      Occupation
                    </label>
                    <input
                      name="occupation"
                      placeholder="Eg. Software Engineer"
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500">
                      Current Address
                    </label>
                    <textarea
                      name="currentAddress"
                      placeholder="Enter full address"
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium mt-1 min-h-[90px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 block mb-2">
                      Own House?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <input type="radio" name="ownHouse" value="Yes" />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <input type="radio" name="ownHouse" value="No" />
                        No
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500">
                      Annual Income
                    </label>
                    <select
                      name="annualIncome"
                      defaultValue=""
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium mt-1"
                    >
                      <option value="" disabled>
                        Select Income Range
                      </option>
                      <option value="Below 3L">Below 3L</option>
                      <option value="3L-5L">3L - 5L</option>
                      <option value="5L-10L">5L - 10L</option>
                      <option value="10L-20L">10L - 20L</option>
                      <option value="20L+">20L+</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <input
                        type="checkbox"
                        name="isKeyDecisionMaker"
                        value="true"
                      />
                      Is Key Decision Maker?
                    </label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-3xl p-4 space-y-4">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-wide">
                    Lead Potential
                  </p>

                  <select
                    name="leadPotential"
                    required
                    defaultValue=""
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-medium"
                  >
                    <option value="" disabled>
                      Select Lead Potential
                    </option>
                    <option value="Hot">🔥 Hot Lead</option>
                    <option value="Warm">⚡ Warm Lead</option>
                    <option value="Cold">❄️ Cold Lead</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                      {activeAction === "prospecting"
                        ? "Follow-up Date"
                        : "Visit Date & Time"}
                    </label>
                    <input
                      name="followUp"
                      type="datetime-local"
                      required
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold mt-1 text-sm"
                    />
                  </div>

                  {activeAction === "site-visit" && (
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                        Meeting Point
                      </label>
                      <input
                        name="meetingPoint"
                        placeholder="Main Gate / Office"
                        defaultValue="Main Site Office"
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">
                      Advisor Note
                    </label>
                    <textarea
                      name="note"
                      placeholder="Any specific requirements..."
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold mt-1 min-h-[90px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95 ${
                    activeAction === "prospecting"
                      ? "bg-blue-600 shadow-blue-200"
                      : "bg-indigo-600 shadow-indigo-200"
                  }`}
                >
                  {activeAction === "prospecting"
                    ? "Save & Move to Prospecting →"
                    : "Save & Move to Site Visit →"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="aspect-video bg-gray-200 rounded-[40px] flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">
                  Live Unit Preview
                </span>
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs text-center">
                Unit {selectedUnit.id} Floor Plan
              </p>
            </div>

            <div className="bg-gray-900 rounded-[35px] p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-2xl">
                    <Users size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest">
                      Interested Clients
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold">
                      Real-time Advisor Activity
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-3xl border border-white/10 text-center">
                  <p className="text-2xl font-black text-amber-400">
                    {leads.filter((l) => l.status === "Prospecting").length}
                  </p>
                  <p className="text-[9px] font-black text-gray-500 uppercase">
                    Prospects
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-3xl border border-white/10 text-center">
                  <p className="text-2xl font-black text-indigo-400">
                    {leads.filter((l) => l.status === "Site Visit").length}
                  </p>
                  <p className="text-[9px] font-black text-gray-500 uppercase">
                    Visits
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-3xl border border-white/10 text-center">
                  <p className="text-2xl font-black text-red-400">
                    {
                      leads.filter((l) => l.linkedUnit?.id === selectedUnit.id)
                        .length
                    }
                  </p>
                  <p className="text-[9px] font-black text-gray-500 uppercase">
                    This Unit
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">
                  Linked Clients
                </p>
                <div className="space-y-3">
                  {leads
                    .filter((lead) => lead.linkedUnit?.id === selectedUnit.id)
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                          <User size={16} className="text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs font-black text-blue-300">
                              {item.name}
                            </p>
                            <span className="text-[8px] font-black px-2 py-0.5 rounded bg-white/10 text-gray-400 uppercase">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed italic">
                            {item.lastNote || "No notes available"}
                          </p>
                        </div>
                      </div>
                    ))}

                  {leads.filter(
                    (lead) => lead.linkedUnit?.id === selectedUnit.id,
                  ).length === 0 && (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-xs text-gray-400 font-bold">
                        No client linked with this unit yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-5xl font-black text-gray-900 mb-1">
                    U-{selectedUnit.id}
                  </h1>
                  <p className="text-lg font-bold text-blue-600">
                    {selectedUnit.bhk} • {selectedUnit.type}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-[10px] font-black border-2 ${getStatusStyles(
                    selectedUnit.status,
                  )}`}
                >
                  {selectedUnit.status.toUpperCase()}
                </div>
              </div>

              <div className="border-t border-b py-8 my-6 border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Total All-Inclusive Price
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-6xl font-black text-gray-900">
                    {selectedUnit.displayPrice}
                  </p>
                  <p className="text-sm font-bold text-gray-400">Onwards</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoTile
                  icon={<Maximize size={20} />}
                  label="Area"
                  value="1,250 Sq.Ft"
                />
                <InfoTile
                  icon={<Compass size={20} />}
                  label="Facing"
                  value={selectedUnit.facing}
                />
                <InfoTile
                  icon={<Construction size={20} />}
                  label="Floor"
                  value="12th Floor"
                />
                <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                  <p className="text-[8px] font-black uppercase text-gray-400">
                    Availability
                  </p>
                  <p className="text-xs font-black text-green-600">
                    Ready to Move
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 flex items-start gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-black text-indigo-900 text-sm">
                  Location Advantage
                </p>
                <p className="text-indigo-700 text-xs mt-1 leading-relaxed font-medium">
                  Strategically located at the <strong>North-East wing</strong>,
                  offering maximum natural light and shortest walking distance
                  to the Club House.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-[1600px] mx-auto p-6 flex gap-8 bg-gray-50 min-h-screen"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
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
                onClick={() =>
                  setActiveFilters({ ...activeFilters, category: cat })
                }
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
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "AVAILABLE",
              count: stats.Available,
              color: "text-green-600",
              key: "Available",
            },
            {
              label: "BOOKED",
              count: stats.Booked,
              color: "text-orange-500",
              key: "Booked",
            },
            {
              label: "SOLD",
              count: stats.Sold,
              color: "text-red-500",
              key: "Sold Out",
            },
            {
              label: "RESALE",
              count: stats.Resale,
              color: "text-yellow-600",
              key: "Resale",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                const newStatus =
                  activeFilters.status === item.key ? "All" : item.key;
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

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit)}
              className={`relative rounded-[20px] border-2 p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg h-36 ${getStatusStyles(
                unit.status,
              )}`}
            >
              <span className="absolute top-3 text-[9px] font-black uppercase tracking-widest opacity-70">
                {unit.status}
              </span>
              <h4 className="text-2xl font-bold mt-4 mb-1">{unit.id}</h4>
              <p className="text-[10px] font-bold opacity-60 uppercase mb-2">
                {unit.bhk}
              </p>
              <p className="text-lg font-black">{unit.displayPrice}</p>
            </div>
          ))}
        </div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">
              No units found for "{activeFilters.status}" status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoTile = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
    <div className="text-blue-500 mb-2 flex justify-center">{icon}</div>
    <p className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">
      {label}
    </p>
    <p className="text-xs font-black text-gray-800">{value}</p>
  </div>
);

export default UnitInventory;
