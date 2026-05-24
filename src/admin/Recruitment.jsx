// src/pages/Recruitment.jsx

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Bell,
  HelpCircle,
  Users,
  CheckCircle2,
  Clock3,
  Ban,
  Phone,
  Mail,
  Filter,
  Plus,
  MoreVertical,
} from "lucide-react";

const PRIMARY = "#004B8D";

export default function Recruitment() {
  const [advisors, setAdvisors] = useState([]);
  const [allStatsData, setAllStatsData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 20;

  // ======================================================
  // FETCH FILTERED ADVISORS
  // ======================================================

  const fetchAdvisors = async (selectedStatus = "all") => {
    try {
      setLoading(true);

      let url = "https://workiees.com/api/advisor/all";

      // SERVER FILTER
      if (selectedStatus !== "all") {
        const statusValue =
          selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);

        url += `?status=${statusValue}`;
      }

      const res = await axios.get(url);

      const data = res?.data?.data || res?.data?.advisors || res?.data || [];

      setAdvisors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FETCH ALL DATA FOR STATS
  // ======================================================

  const fetchStatsData = async () => {
    try {
      const res = await axios.get("https://workiees.com/api/advisor/all");

      const data = res?.data?.data || res?.data?.advisors || res?.data || [];

      setAllStatsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {
    fetchStatsData();
  }, []);

  // ======================================================
  // FILTER CHANGE API CALL
  // ======================================================

  useEffect(() => {
    fetchAdvisors(filter);
  }, [filter]);

  // RESET PAGE ON FILTER/SEARCH CHANGE

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  // ======================================================
  // STATUS HELPER
  // ======================================================

  const getStatus = (advisor) => {
    const status = advisor?.status?.toLowerCase();

    if (status === "terminated") return "terminated";

    if (status === "pending") return "pending";

    return "active";
  };

  // ======================================================
  // STATS
  // ======================================================

  const stats = useMemo(() => {
    return {
      total: allStatsData.length,

      active: allStatsData.filter((a) => getStatus(a) === "active").length,

      pending: allStatsData.filter((a) => getStatus(a) === "pending").length,

      terminated: allStatsData.filter((a) => getStatus(a) === "terminated")
        .length,
    };
  }, [allStatsData]);

  // ======================================================
  // SEARCH FILTER
  // ======================================================

  const filteredAdvisors = useMemo(() => {
    if (!search) return advisors;

    return advisors.filter((advisor) => {
      const name = advisor?.name || advisor?.full_name || "";

      const email = advisor?.email || "";

      const phone = advisor?.mobile || advisor?.phone || "";

      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        phone.includes(search)
      );
    });
  }, [advisors, search]);

  // ======================================================
  // PAGINATION LOGIC
  // ======================================================

  const totalPages = Math.ceil(filteredAdvisors.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedAdvisors = filteredAdvisors.slice(startIndex, endIndex);

  // ======================================================
  // STAT CARD
  // ======================================================

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    borderColor,
    filterName,
  }) => (
    <div
      onClick={() => setFilter(filterName)}
      className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
        filter === filterName ? "shadow-lg scale-[1.02]" : ""
      }`}
      style={{
        borderColor: borderColor,
        borderWidth: filter === filterName ? "2px" : "1px",
      }}
    >
      <div
        className="flex items-center gap-2 text-[11px] font-bold uppercase"
        style={{ color: borderColor }}
      >
        {icon}
        {title}
      </div>

      <h2 className="text-5xl font-bold text-[#111827] mt-4">{value}</h2>

      <p className="text-gray-500 text-lg mt-1">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {/* ====================================================== */}

      {/* ====================================================== */}
      {/* PAGE */}
      {/* ====================================================== */}

      <div className="p-5 md:p-0">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* SEARCH */}

          <div className="flex items-center gap-4">
            <h1 className="text-black font-semibold text-lg">
              Recruitment Portal
            </h1>
          </div>

          <div className="hidden md:flex items-center bg-[#0C5B9E] rounded-full px-4 h-[40px] w-[280px]">
            <Search className="text-white/70" size={16} />

            <input
              type="text"
              placeholder="Search advisors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none border-none text-white placeholder:text-white/60 text-sm ml-2 w-full"
            />
          </div>

          <button
            onClick={() => navigate("/admin/recruitment/create")}
            className="h-[48px] px-6 rounded-xl cursor-pointer text-white font-semibold flex items-center gap-2 w-fit shadow-md"
            style={{ background: PRIMARY }}
          >
            <Plus size={18} />
            New Application
          </button>
        </div>

        {/* ====================================================== */}
        {/* STATS */}
        {/* ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <StatCard
            title="Total"
            value={stats.total}
            subtitle="Advisors"
            filterName="all"
            borderColor="#0c0c0c"
            icon={<Users size={14} />}
          />

          <StatCard
            title="Active"
            value={stats.active}
            subtitle="Onboard"
            filterName="active"
            borderColor="#2563EB"
            icon={<CheckCircle2 size={14} />}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Verification"
            filterName="pending"
            borderColor="#F59E0B"
            icon={<Clock3 size={14} />}
          />

          <StatCard
            title="Terminated"
            value={stats.terminated}
            subtitle="Inactive"
            filterName="terminated"
            borderColor="#EF4444"
            icon={<Ban size={14} />}
          />
        </div>

        {/* ====================================================== */}
        {/* TABLE */}
        {/* ====================================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 mt-8 overflow-hidden">
          {/* TOP */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-[#111827]">
              Recent Applications
            </h3>

            {/* FILTER BUTTONS */}

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === "all"
                    ? "bg-[#005596] text-white"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                All ({stats.total})
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === "active"
                    ? "bg-green-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                Active ({stats.active})
              </button>

              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                Pending ({stats.pending})
              </button>

              <button
                onClick={() => setFilter("terminated")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === "terminated"
                    ? "bg-red-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                Terminated ({stats.terminated})
              </button>
            </div>
          </div>

          {/* TABLE HEADER */}

          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8FAFC] border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
            <div className="col-span-3">Advisor</div>

            <div className="col-span-4">Contact Information</div>

            <div className="col-span-2">Joined Date</div>

            <div className="col-span-2">Status</div>

            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* TABLE BODY */}

          {loading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            </div>
          ) : filteredAdvisors.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No advisors found
            </div>
          ) : (
            <>
              {paginatedAdvisors.map((advisor, index) => {
                const status = getStatus(advisor);

                const name = advisor?.name || advisor?.full_name || "Unknown";

                const designation = advisor?.designation || "Advisor";

                const phone = advisor?.mobile || advisor?.phone || "N/A";

                const email = advisor?.email || "N/A";

                const joined = advisor?.created_at || advisor?.joining_date;

                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={advisor?._id || advisor?.id || index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-[#FAFBFD] transition-all"
                  >
                    {/* ADVISOR */}

                    <div className="md:col-span-3 flex items-center gap-4">
                      {advisor?.profile ? (
                        <img
                          src={advisor.profile}
                          alt={name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#E8EEF7] flex items-center justify-center text-[#005596] font-bold">
                          {initials}
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-[#111827] capitalize">
                          {name}
                        </h4>

                        <p className="text-sm text-gray-500">{designation}</p>
                      </div>
                    </div>

                    {/* CONTACT */}

                    <div className="md:col-span-4 flex flex-col gap-2 justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        {phone}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                        <Mail size={14} />
                        {email}
                      </div>
                    </div>

                    {/* DATE */}

                    <div className="md:col-span-2 flex items-center text-sm text-gray-600">
                      {joined ? new Date(joined).toLocaleDateString() : "-"}
                    </div>

                    {/* STATUS */}

                    <div className="md:col-span-2 flex items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === "active"
                            ? "bg-green-100 text-green-600"
                            : status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>

                    {/* ACTION */}

                    <div className="md:col-span-1 flex items-center md:justify-end">
                      <button className="text-gray-500 hover:text-black">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* FOOTER */}

              {/* FOOTER */}

              <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* LEFT */}

                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredAdvisors.length)} of{" "}
                  {filteredAdvisors.length} applicants
                </p>

                {/* PAGINATION */}

                <div className="flex items-center gap-2">
                  {/* PREVIOUS */}

                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {"<"}
                  </button>

                  {/* PAGE NUMBERS */}

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                        currentPage === index + 1
                          ? "bg-[#005596] text-white"
                          : "bg-white border hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  {/* NEXT */}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
