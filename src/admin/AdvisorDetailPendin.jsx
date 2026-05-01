import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PrarambhLoader from "../component/PrarambhLoader";

const AdvisorDetails = () => {
  const { id } = useParams();
  const [advisor, setAdvisor] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "https://workiees.com/api";

  useEffect(() => {
    fetchAdvisor();
  }, []);

  const fetchAdvisor = async () => {
    try {
      const res = await axios.get(`${API}/advisor/${id}`);
      setAdvisor(res.data.data);
    } catch (err) {
      alert("Failed to fetch advisor");
    } finally {
      setLoading(false);
    }
  };

  const approveAdvisor = async () => {
    try {
      await axios.post(`${API}/advisor/approve/${id}`);
      alert("Approved Successfully");
      fetchAdvisor();
    } catch {
      alert("Approval failed");
    }
  };

  const changeStatus = async (status) => {
    try {
      await axios.post(`${API}/advisor/change-status/${id}`, { status });
      alert("Status updated");
      fetchAdvisor();
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <PrarambhLoader/>;
  if (!advisor) return <p className="p-6">Advisor not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Advisor Details</h2>

      {/* 🔥 BASIC INFO */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Basic Info</h3>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(advisor).map(([key, value]) => {
            if (
              key.includes("photo") ||
              key.includes("password") ||
              key.includes("otp")
            )
              return null;

            return (
              <div key={key}>
                <p className="text-sm text-gray-500">{key}</p>
                <p className="font-medium">{value || "-"}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 DOCUMENTS */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Documents</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {advisor.profile_photo && (
            <img
              src={`https://workiees.com/${advisor.profile_photo}`}
              alt="Profile"
              className="rounded border"
            />
          )}

          {advisor.pancard_photo && (
            <img
              src={`https://workiees.com/${advisor.pancard_photo}`}
              alt="PAN"
              className="rounded border"
            />
          )}

          {advisor.pancard_back_photo && (
            <img
              src={`https://workiees.com/${advisor.pancard_back_photo}`}
              alt="PAN Back"
              className="rounded border"
            />
          )}

          {advisor.addresscard_front_photo && (
            <img
              src={`https://workiees.com/${advisor.addresscard_front_photo}`}
              alt="Address Front"
              className="rounded border"
            />
          )}

          {advisor.addresscard_back_photo && (
            <img
              src={`https://workiees.com/${advisor.addresscard_back_photo}`}
              alt="Address Back"
              className="rounded border"
            />
          )}
        </div>
      </div>

      {/* 🔥 ACTIONS */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Actions</h3>

        <div className="flex flex-wrap gap-3">

          {advisor.status === "Pending" && (
            <button
              onClick={approveAdvisor}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => changeStatus("Active")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Activate
          </button>

          <button
            onClick={() => changeStatus("Inactive")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Inactivate
          </button>

          <button
            onClick={() => changeStatus("Suspended")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Suspend
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdvisorDetails;