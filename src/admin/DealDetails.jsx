import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

import {
  ArrowLeft,
  Phone,
  User,
  Building2,
  MapPin,
  CalendarDays,
  IndianRupee,
  BadgeCheck,
  FileText,
  MessageCircle,
  Search,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://workiees.com/";

const INSTALLMENT_PLANS = {
  1: [100],
  2: [50, 50],
  3: [33, 33, 34],
  4: [25, 25, 25, 25],
  5: [20, 20, 20, 20, 20],
};

const DealDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deal, setDeal] = useState(null);
  const [lead, setLead] = useState(null);
  const [advisor, setAdvisor] = useState(null);

  const [project, setProject] = useState(null);

  const [unit, setUnit] = useState(null);

  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);

  // UNIT FILTERS
  const [unitSearch, setUnitSearch] = useState("");

  const [configuration, setConfiguration] = useState("");

  const [propertyType, setPropertyType] = useState("");

  const [saleCategory, setSaleCategory] = useState("");

  const [facing, setFacing] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(2);

  const [paymentAmount, setPaymentAmount] = useState(0);

  const [installments, setInstallments] = useState([]);

  const [showUnitModal, setShowUnitModal] = useState(false);

  const [statusFilter, setStatusFilter] = useState("available");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [minArea, setMinArea] = useState("");

  const [maxArea, setMaxArea] = useState("");

  const [changingUnit, setChangingUnit] = useState(false);

  const [projects, setProjects] = useState([]);
  const [projectFilter, setProjectFilter] = useState("");

  // FETCH ALL
  useEffect(() => {
    fetchData();
  }, [id]);

  // INSTALLMENTS
  useEffect(() => {
    generateInstallments(selectedPlan, paymentAmount);
  }, [selectedPlan, paymentAmount]);

  const fetchData = async () => {
    try {
      // DEAL
      const dealRes = await axios.get(`${BASE_URL}api/deals/${id}`);

      const dealData = dealRes.data.data;

      setDeal(dealData);

      // APIS
      const [leadRes, advisorRes, unitRes, projectRes] = await Promise.all([
        axios.get(`${BASE_URL}api/leads`),

        axios.get(`${BASE_URL}api/advisor/all`),

        axios.get(`${BASE_URL}api/units`),

        axios.get(`${BASE_URL}api/projects`),
      ]);

      // LEAD
      const foundLead = leadRes.data.data.find(
        (item) => Number(item.id) === Number(dealData.lead_id),
      );

      setLead(foundLead);

      // ADVISOR
      // ADVISOR
      const advisorData =
        advisorRes?.data?.data ||
        advisorRes?.data?.advisors ||
        advisorRes?.data ||
        [];

      console.log("ALL ADVISORS =>", advisorData);

      console.log("DEAL ADVISOR CODE =>", dealData?.advisor_code);

      const foundAdvisor = advisorData.find(
        (item) =>
          String(item?.Advisor_code || item?.advisorCode).trim() ===
          String(dealData?.Advisor_code).trim(),
      );

      console.log("FOUND ADVISOR =>", foundAdvisor);

      setAdvisor(foundAdvisor || null);

      // UNIT
      const foundUnit = unitRes.data.data.find(
        (item) => Number(item.id) === Number(dealData.unit_id),
      );

      setUnit(foundUnit);

      setUnits(unitRes.data.data || []);

      // PROJECT
      const foundProject = projectRes.data.data.find(
        (item) => Number(item.id) === Number(dealData.property_id),
      );

      setProjects(projectRes.data.data || []);

      setPaymentAmount(dealData.payment_amount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // TOTAL VALUE
  const totalValue = useMemo(() => {
    return Number(unit?.area_sqft || 0) * Number(unit?.rate_per_sqft || 0);
  }, [unit]);

  // WHATSAPP
  const openWhatsapp = (phone) => {
    if (!phone) return;

    window.open(`https://wa.me/${phone}`, "_blank");
  };

  // INSTALLMENTS
  const generateInstallments = (plan, amount) => {
    const percentages = INSTALLMENT_PLANS[plan] || [];

    const generated = percentages.map((percent) => ({
      percent,
      amount: ((Number(amount) * percent) / 100).toFixed(0),

      date: "",

      status: "pending",
    }));

    setInstallments(generated);
  };

  // FILTERED UNITS
  const filteredUnits = useMemo(() => {
    return units.filter((item) => {
      const total =
        Number(item?.area_sqft || 0) * Number(item?.rate_per_sqft || 0);

      return (
        (!statusFilter ||
          item?.status?.toLowerCase() === statusFilter.toLowerCase()) &&
        (!configuration || item?.configuration === configuration) &&
        (!propertyType || item?.property_type === propertyType) &&
        (!saleCategory || item?.sale_category === saleCategory) &&
        (!facing || item?.facing === facing) &&
        (!unitSearch ||
          item?.unit_number
            ?.toLowerCase()
            .includes(unitSearch.toLowerCase())) &&
        (!minPrice || total >= Number(minPrice)) &&
        (!maxPrice || total <= Number(maxPrice)) &&
        (!minArea || Number(item?.area_sqft) >= Number(minArea)) &&
        (!maxArea || Number(item?.area_sqft) <= Number(maxArea)) && 
        (!projectFilter || Number(item?.property_id) === Number(projectFilter))
        
      );
    });
  }, [
    units,
    unitSearch,
    configuration,
    propertyType,
    saleCategory,
    facing,
    statusFilter,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
  ]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const changeUnit = async (selectedUnit) => {
    try {
      setChangingUnit(true);

      await axios.put(`${BASE_URL}api/deals/${deal?.id}`, {
        unit_id: selectedUnit?.id,
      });

      setUnit(selectedUnit);

      setShowUnitModal(false);

      alert("Unit changed successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to change unit");
    } finally {
      setChangingUnit(false);
    }
  };

  console.log("ADVISOR STATE =>", advisor);

  return (
    <>
      <div className="min-h-screen bg-slate-100 p-4 md:p-6">
        {/* TOP */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-white px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft />
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => openWhatsapp(deal?.client_number)}
              className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Client
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* CLIENT */}
            <div className="bg-white rounded-3xl overflow-hidden">
              <div className="h-72 bg-slate-200">
                {lead?.site_visit_photo ? (
                  <img
                    src={`${BASE_URL}${lead.site_visit_photo}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold">{deal?.client_name}</h1>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <InfoCard
                    icon={<Phone size={18} />}
                    title="Client Number"
                    value={deal?.client_number}
                  />

                  <InfoCard
                    icon={<Building2 size={18} />}
                    title="Project"
                    value={project?.project_name}
                  />

                  <InfoCard
                    icon={<BadgeCheck size={18} />}
                    title="Deal Status"
                    value={deal?.deal_status}
                  />

                  <InfoCard
                    icon={<CalendarDays size={18} />}
                    title="Token Date"
                    value={deal?.token_date}
                  />
                </div>
              </div>
            </div>

            {/* ADVISOR */}
            {/* ADVISOR */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Advisor Details</h2>

              <div className="flex items-center gap-5">
                {/* IMAGE */}
                {advisor?.profile || advisor?.profile_photo ? (
                  <img
                    src={`${BASE_URL}${
                      advisor?.profile || advisor?.profile_photo
                    }`}
                    alt=""
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-slate-200 flex items-center justify-center">
                    <User size={30} />
                  </div>
                )}

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {advisor?.name || advisor?.full_name || "N/A"}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {advisor?.designation || "Advisor"}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                      {advisor?.advisor_type || "N/A"}
                    </span>

                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                      Slab ₹{advisor?.slab || 0}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-slate-600">
                      Advisor Code :
                      <span className="font-semibold ml-2">
                        {deal?.advisor_code || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm text-slate-600">
                      Phone :
                      <span className="font-semibold ml-2">
                        {advisor?.mobile || advisor?.phone || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() =>
                        openWhatsapp(advisor?.mobile || advisor?.phone)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* UNIT */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Unit Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard title="Tower" value={unit?.tower_name} />

                <InfoCard title="Unit Number" value={unit?.unit_number} />

                <InfoCard title="Floor" value={unit?.floor_number} />

                <InfoCard title="Configuration" value={unit?.configuration} />

                <InfoCard title="Property Type" value={unit?.property_type} />

                <InfoCard title="Facing" value={unit?.facing} />

                <InfoCard title="Area" value={`${unit?.area_sqft} sqft`} />

                <InfoCard title="Rate" value={`₹${unit?.rate_per_sqft}`} />
              </div>

              {/* TOTAL */}
              <div className="bg-blue-50 rounded-2xl p-5 mt-5">
                <p className="text-slate-500">Total Value</p>

                <h1 className="text-4xl font-bold text-blue-700 mt-2">
                  ₹{totalValue.toLocaleString()}
                </h1>
              </div>
            </div>

            {/* CHANGE UNIT */}
            {/* CHANGE UNIT */}
            <div className="bg-white rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Change Unit</h2>

                  <p className="text-slate-500 mt-1">
                    Change assigned property unit
                  </p>
                </div>

                <button
                  onClick={() => setShowUnitModal(true)}
                  className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
                >
                  Change Unit
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* TOKEN */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Token Details</h2>

              <div className="space-y-4">
                <Input label="Token Amount" value={deal?.token_amount} />

                <Input label="Payment Mode" value={deal?.token_payment_mode} />

                <Input label="Token Date" value={deal?.token_date} />
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Property Docs</h2>

              <div className="space-y-4">
                {deal?.property_docs?.map((doc, index) => (
                  <div key={index} className="border rounded-2xl p-4">
                    <h3 className="font-semibold">{doc.title}</h3>

                    <a
                      href={`${BASE_URL}${doc.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm"
                    >
                      View Document
                    </a>
                  </div>
                ))}

                {/* ADD DOC */}
                {deal?.deal_status !== "verified" && (
                  <button className="w-full bg-blue-600 text-white py-3 rounded-2xl">
                    Add Document
                  </button>
                )}
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Notes</h2>

              <div className="space-y-3">
                {deal?.notes?.map((note, index) => (
                  <div key={index} className="border rounded-2xl p-4">
                    <p className="font-medium">{note.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENTS */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-5">Payment Details</h2>

              <Input
                label="Payment Amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />

              {/* PLAN */}
              <div className="mt-4">
                <label className="text-sm text-slate-500">
                  Installment Plan
                </label>

                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(Number(e.target.value))}
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                >
                  <option value={1}>100%</option>

                  <option value={2}>50% - 50%</option>

                  <option value={3}>33% - 33% - 34%</option>

                  <option value={4}>25% - 25% - 25% - 25%</option>

                  <option value={5}>20% x 5</option>
                </select>
              </div>

              {/* INSTALLMENTS */}
              <div className="space-y-4 mt-5">
                {installments.map((item, index) => (
                  <div key={index} className="border rounded-2xl p-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Installment #{index + 1}</h3>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {item.percent}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <Input label="Amount" value={item.amount} />

                      <Input label="Date" value={item.date} />
                    </div>

                    <div className="mt-4">
                      <select
                        value={item.status}
                        className="w-full border rounded-xl px-4 py-3"
                      >
                        <option value="pending">Pending</option>

                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIT MODAL */}
      {/* =========================
    BEAUTIFUL UNIT MODAL
========================= */}

      {showUnitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            {/* HEADER */}
            <div className="px-6 py-5 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Change Unit</h2>

                  <p className="text-blue-100 text-sm mt-1">
                    Select available unit for this deal
                  </p>
                </div>

                <button
                  onClick={() => setShowUnitModal(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* FILTER SECTION */}
            <div className="p-5 bg-slate-50 border-b">
              {/* PROJECT TABS */}
              <div className="flex gap-3 overflow-x-auto pb-2 mb-5">
                <button
                  onClick={() => setProjectFilter("")}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                    projectFilter === ""
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border text-slate-600"
                  }`}
                >
                  All Projects
                </button>

                {projects.map((proj) => (
                  <button
                    key={proj?.id}
                    onClick={() => setProjectFilter(proj?.id)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                      Number(projectFilter) === Number(proj?.id)
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border text-slate-600"
                    }`}
                  >
                    {proj?.project_name}
                  </button>
                ))}
              </div>

              {/* FILTER GRID */}
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  placeholder="Search Unit..."
                  value={unitSearch}
                  onChange={(e) => setUnitSearch(e.target.value)}
                  className="h-12 px-4 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-12 px-4 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>

                  <option value="available">Available</option>

                  <option value="booked">Booked</option>

                  <option value="sold out">Sold Out</option>
                </select>

                <select
                  value={configuration}
                  onChange={(e) => setConfiguration(e.target.value)}
                  className="h-12 px-4 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Configuration</option>

                  {[...new Set(units.map((u) => u.configuration))]
                    .filter(Boolean)
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>

                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                  className="h-12 px-4 rounded-2xl border bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Facing</option>

                  {[...new Set(units.map((u) => u.facing))]
                    .filter(Boolean)
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* UNIT LIST */}
            <div className="max-h-[65vh] overflow-y-auto p-5">
              {filteredUnits.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl font-semibold text-slate-700">
                    No Units Found
                  </h3>

                  <p className="text-slate-500 mt-2">Try changing filters</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredUnits.slice(0, 12).map((item) => {
                    const total =
                      Number(item?.area_sqft || 0) *
                      Number(item?.rate_per_sqft || 0);

                    const status = item?.status?.toLowerCase();

                    const selectable = status === "available";

                    return (
                      <div
                        key={item?.id}
                        className="rounded-3xl border border-slate-200 bg-white p-5 hover:shadow-xl transition duration-300"
                      >
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-slate-800">
                              {item?.unit_number}
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                              {item?.tower_name}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              selectable
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item?.status}
                          </span>
                        </div>

                        {/* INFO */}
                        <div className="grid grid-cols-2 gap-3 mt-5">
                          <MiniInfo
                            label="Config"
                            value={item?.configuration}
                          />

                          <MiniInfo label="Facing" value={item?.facing} />

                          <MiniInfo
                            label="Area"
                            value={`${item?.area_sqft} sqft`}
                          />

                          <MiniInfo label="Floor" value={item?.floor_number} />
                        </div>

                        {/* PRICE */}
                        <div className="mt-5 bg-slate-50 rounded-2xl p-4">
                          <p className="text-sm text-slate-500">Total Value</p>

                          <h2 className="text-2xl font-bold text-blue-700 mt-1">
                            ₹{total.toLocaleString()}
                          </h2>
                        </div>

                        {/* BUTTON */}
                        <button
                          disabled={!selectable || changingUnit}
                          onClick={() => changeUnit(item)}
                          className={`w-full mt-5 py-3 rounded-2xl font-semibold transition ${
                            selectable
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-slate-200 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          {changingUnit
                            ? "Please wait..."
                            : selectable
                              ? "Select Unit"
                              : "Unavailable"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// INPUT
const Input = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="text-sm text-slate-500">{label}</label>

      <input
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 mt-2"
      />
    </div>
  );
};

const MiniInfo = ({ label, value }) => {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <h4 className="font-semibold text-sm mt-1">{value || "N/A"}</h4>
    </div>
  );
};

// CARD
const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-slate-500 mb-1">
        {icon}

        <span className="text-sm">{title}</span>
      </div>

      <h3 className="font-semibold text-slate-800">{value || "N/A"}</h3>
    </div>
  );
};

export default DealDetails;
