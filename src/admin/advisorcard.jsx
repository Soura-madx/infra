import { useNavigate } from "react-router-dom";

const AdvisorCard = ({ advisor, onApprove, onReject }) => {
  const navigate = useNavigate();

  // ✅ FIX HERE
  const id = advisor.id || advisor.advisor_id;

  return (
    <div className="bg-white shadow rounded-xl p-5 border">
      <h3 className="font-bold text-lg">{advisor.full_name}</h3>

      <p className="text-sm text-gray-600">📧 {advisor.email}</p>
      <p className="text-sm text-gray-600">📞 {advisor.phone}</p>

      <p className="mt-2 text-sm">
        Status:
        <span className="ml-2 font-semibold text-yellow-600">
          {advisor.status}
        </span>
      </p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate(`/admin/advisor/${id}`)}>
          View
        </button>

        {advisor.status === "Pending" && (
          <>
            <button
              onClick={() => onApprove(id)}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => onReject(id)}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvisorCard