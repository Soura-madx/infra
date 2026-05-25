import React, { useEffect, useState } from "react";
import axios from "axios";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await axios.get(
        "https://workiees.com/api/deals"
      );

      setDeals(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusStyles = {
    ongoing: "bg-blue-100 text-blue-600",
    closed: "bg-green-100 text-green-600",
    "not verified": "bg-orange-100 text-orange-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading deals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          All Deals
        </h1>

        <div className="flex gap-3">
          <button className="px-5 py-2 bg-white border border-slate-300 rounded-xl shadow-sm hover:bg-slate-50">
            Filter
          </button>

          <button className="px-5 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800">
            + New Deal
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {deals.map((deal, index) => {
          const status =
            deal.status?.toLowerCase() || "ongoing";

          return (
            <div
              key={deal.id || index}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-5">
                <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                  DEAL #{deal.id || index + 1}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    statusStyles[status] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  ● {deal.stage || deal.deal_status || "ONGOING"}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {deal.name || deal.client_name || "No Name"}
              </h2>

              {/* Phone */}
              <p className="text-slate-500 mb-8">
                📞 {deal.phone || deal.client_number || "N/A"}
              </p>

              {/* Advisor */}
              <div className="absolute top-16 right-6 border border-yellow-300 bg-yellow-50 rounded-xl px-4 py-2 text-center">
                <p className="text-[10px] text-yellow-700 font-medium">
                  ADVISOR
                </p>

                <p className="text-sm font-semibold text-yellow-700">
                  👤 {deal.advisor_code || "PIA0001"}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex justify-between items-end mt-10">
                <div>
                  <p className="text-sm text-slate-400">
                    Token
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    ₹{deal.token || deal.token_amount || 0}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-400">
                    Date
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {deal.date || "2026-05-12"}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Deals;