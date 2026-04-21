import React, { useEffect, useState } from "react";
import axios from "axios";
import AdvisorCard from "./advisorcard";

const AllAdvisors = () => {
  const [status, setStatus] = useState("Active");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `https://workiees.com/api/advisor/all?status=${status}`
    );
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Advisors</h2>

      {/* FILTER */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mb-4 border p-2"
      >
        <option>Active</option>
        <option>Pending</option>
        <option>Inactive</option>
        <option>Suspended</option>
      </select>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((advisor) => (
          <AdvisorCard key={advisor.id || advisor.advisor_id} advisor={advisor} />
        ))}
      </div>
    </div>
  );
};

export default AllAdvisors;