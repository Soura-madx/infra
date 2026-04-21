import React, { useEffect, useState } from "react";
import axios from "axios";
import AdvisorCard from "./advisorcard";
import AdvisorDetailsModal from "./AdvisorDetailPendin";

const PendingAdvisors = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchData = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "https://workiees.com/api/advisor/all?status=Pending"
    );

    console.log("API:", res.data); // 🔥 DEBUG

    const advisors = res.data?.data || [];

    setData(Array.isArray(advisors) ? advisors : []);
  } catch (err) {
    console.error(err.response || err);
    alert(err.response?.data?.message || "Failed to fetch advisors");
    setData([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const approve = async (id) => {
    await axios.post(`https://workiees.com/api/advisor/approve/${id}`);
    fetchData();
  };

  const reject = async (id) => {
    await axios.post(`https://workiees.com/api/advisor/change-status/${id}`, {
      status: "Suspended",
    });
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Advisors</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No pending advisors found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((advisor) => (
            <AdvisorCard
              key={advisor.id || advisor.advisor_id}
              advisor={advisor}
              onApprove={approve}
              onReject={reject}
              onView={setSelected}
            />
          ))}
        </div>
      )}

      <AdvisorDetailsModal
        advisor={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default PendingAdvisors;
