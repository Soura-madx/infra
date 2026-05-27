import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://workiees.com/";

const Deals = () => {
  const navigate = useNavigate();

  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dealsRes, leadsRes, unitsRes] =
        await Promise.all([
          axios.get(
            "https://workiees.com/api/deals"
          ),
          axios.get(
            "https://workiees.com/api/leads"
          ),
          axios.get(
            "https://workiees.com/api/units"
          ),
        ]);

      setDeals(dealsRes.data.data || []);
      setLeads(leadsRes.data.data || []);
      setUnits(unitsRes.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // MERGE DATA
  const mergedDeals = useMemo(() => {
    return deals.map((deal) => {
      const lead = leads.find(
        (l) =>
          Number(l.id) ===
          Number(deal.lead_id)
      );

      const unit = units.find(
        (u) =>
          Number(u.id) ===
          Number(deal.unit_id)
      );

      return {
        ...deal,

        client_name:
          deal.client_name ||
          lead?.client_name,

        advisor_code:
          deal.advisor_code ||
          lead?.advisor_code,

        advisor_name:
          deal.advisor_name ||
          lead?.advisor_name,

        site_visit_photo:
          lead?.site_visit_photo,

        unit_number:
          unit?.unit_number ||
          unit?.name,

        colony_name:
          unit?.colony_name ||
          unit?.property_name,

        stage:
          deal?.deal_status ||
          deal?.stage,
      };
    });
  }, [deals, leads, units]);

  // SEARCH
  const filteredDeals = useMemo(() => {
    return mergedDeals.filter((deal) => {
      const value = search.toLowerCase();

      return (
        deal.client_name
          ?.toLowerCase()
          .includes(value) ||
        deal.advisor_name
          ?.toLowerCase()
          .includes(value) ||
        deal.advisor_code
          ?.toLowerCase()
          .includes(value) ||
        deal.unit_number
          ?.toLowerCase()
          .includes(value) ||
        deal.colony_name
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [search, mergedDeals]);

  // BADGE COLORS
  const getStageColor = (stage) => {
    switch (stage?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "booking":
        return "bg-blue-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <h1 className="text-2xl font-bold text-slate-800">
          Deals
        </h1>

        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            onClick={() =>
              navigate(`/deals/${deal.id}`)
            }
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="h-36 bg-slate-200">
              {deal.site_visit_photo ? (
                <img
                  src={`${BASE_URL}${deal.site_visit_photo}`}
                  alt="Site Visit"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              {/* CLIENT */}
              <h2 className="text-lg font-bold text-slate-800 truncate">
                {deal.client_name || "N/A"}
              </h2>

              {/* ADVISOR */}
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                <User size={14} />

                <span className="truncate">
                  {deal.advisor_name ||
                    "N/A"}
                </span>
              </div>

              {/* ADVISOR CODE */}
              <p className="text-xs text-slate-500 mt-1">
                {deal.advisor_code || "N/A"}
              </p>

              {/* UNIT + COLONY */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Unit
                  </p>

                  <p className="font-semibold text-sm text-slate-700">
                    {deal.unit_number ||
                      "N/A"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Colony
                  </p>

                  <p className="font-semibold text-sm text-slate-700 truncate max-w-[120px]">
                    {deal.colony_name ||
                      "N/A"}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getStageColor(
                    deal.stage
                  )}`}
                >
                  {deal.stage || "N/A"}
                </span>

                <span className="text-xs text-slate-500">
                  Open Details →
                </span>
              </div>

              {/* TOKEN */}
              <div className="mt-4 bg-blue-50 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    Token
                  </p>

                  <h3 className="font-bold text-blue-700">
                    ₹
                    {deal.token_amount ||
                      0}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    Date
                  </p>

                  <p className="text-xs font-semibold text-slate-700">
                    {deal.token_date
                      ? new Date(
                          deal.token_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;