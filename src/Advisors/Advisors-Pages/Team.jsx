import React, { useState } from "react";
import axios from "axios";

const AdvisorRegistration = () => {
  const initialForm = {
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    aadhaar: "",
    pan: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    occupation: "",
    nomineeName: "",
    nomineePhone: "",
    relationship: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    leaderCode: "",
  };

  const initialFiles = {
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    panCardBack: null, // ✅ NEW
    profilePhoto: null,
  };

  const [formData, setFormData] = useState(initialForm);
  const [files, setFiles] = useState(initialFiles);
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0); // for file reset

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // mapping
      data.append("full_name", formData.fullName);
      data.append("father_name", formData.fatherName);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("aadhaar_number", formData.aadhaar);
      data.append("pan_number", formData.pan);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("address", formData.address);
      data.append("state", formData.state);
      data.append("city", formData.city);
      data.append("occupation", formData.occupation);

      data.append("nomineename", formData.nomineeName);
      data.append("nomineephone", formData.nomineePhone);
      data.append("relationship", formData.relationship);

      data.append("bank_name", formData.bankName);
      data.append("account_number", formData.accountNumber);
      data.append("ifsc_code", formData.ifsc);
      data.append("branch", formData.branch);

      data.append("leader_code", formData.leaderCode);

      // files
      if (files.aadhaarFront)
        data.append("addresscard_front_photo", files.aadhaarFront);

      if (files.aadhaarBack)
        data.append("addresscard_back_photo", files.aadhaarBack);

      if (files.panCard) data.append("pancard_photo", files.panCard);

      if (files.profilePhoto) data.append("profile_photo", files.profilePhoto);

      if (files.panCardBack)
        data.append("pancard_back_photo", files.panCardBack);

      const res = await axios.post(
        "https://workiees.com/api/advisor/register",
        data,
      );

      alert(res.data.message || "✅ Registration Successful");

      // RESET EVERYTHING
      setFormData(initialForm);
      setFiles(initialFiles);
      setResetKey((prev) => prev + 1); // reset file UI
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("❌ Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6">Advisor Registration</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">Personal Details</h2>

              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="input"
              />
              <input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father Name"
                className="input"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="input"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <input
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="Aadhaar"
                className="input"
              />
              <input
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder="PAN"
                className="input"
              />
            </div>

            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">Contact</h2>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="input"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="input"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="input"
                />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input"
                />
              </div>

              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="input"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">Nominee</h2>

              <input
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                placeholder="Nominee Name"
                className="input"
              />
              <input
                name="nomineePhone"
                value={formData.nomineePhone}
                onChange={handleChange}
                placeholder="Nominee Phone"
                className="input"
              />

              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="input"
              >
                <option value="">Relationship</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Spouse</option>
              </select>
            </div>

            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">Bank</h2>

              <input
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
                className="input"
              />
              <input
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                className="input"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleChange}
                  placeholder="IFSC"
                  className="input"
                />
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                  className="input"
                />
              </div>
            </div>

            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">KYC</h2>

              <input
                key={resetKey}
                type="file"
                name="aadhaarFront"
                onChange={handleFileChange}
              />
              <input
                key={resetKey + 1}
                type="file"
                name="aadhaarBack"
                onChange={handleFileChange}
              />
              <input
                key={resetKey + 2}
                type="file"
                name="panCard"
                onChange={handleFileChange}
              />
              <input
                key={resetKey + 4}
                type="file"
                name="panCardBack"
                onChange={handleFileChange}
              />
              <input
                key={resetKey + 3}
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
              />
            </div>

            <div className="border p-5 rounded-xl">
              <h2 className="font-semibold mb-4">Leader Code</h2>

              <input
                name="leaderCode"
                value={formData.leaderCode}
                onChange={handleChange}
                placeholder="Leader Code"
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default AdvisorRegistration;
