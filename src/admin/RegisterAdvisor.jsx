// src/pages/AdvisorRegistration.jsx

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  FileText,
  Upload,
  Briefcase,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";

const PRIMARY = "#004B8D";

// =========================================================
// SUB-COMPONENTS (Defined outside to prevent re-rendering issues)
// =========================================================

const Input = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => (
  <div>
    <label className="text-sm font-semibold text-gray-700 mb-2 block">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full h-[52px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#005596]"
    />
  </div>
);

const Select = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="text-sm font-semibold text-gray-700 mb-2 block">
      {label}
    </label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-[52px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#005596]"
    >
      <option value="">Select {label}</option>

      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
        style={{ background: PRIMARY }}
      >
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {children}
    </div>
  </div>
);

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function AdvisorRegistration() {
  const navigate = useNavigate();

  // =========================================================
  // USER DESIGNATION
  // =========================================================

  // Change dynamically from login user
  const currentUserDesignation = "admin";

  const hierarchy = [
    "Director",
    "Chief Manager",
    "Senior Manager",
    "Manager",
    "Supervisor",
    "Advisor",
  ];

  const designationOptions = useMemo(() => {
    const index = hierarchy.indexOf(currentUserDesignation.toLowerCase());
    return hierarchy.slice(index + 1);
  }, []);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // PERSONAL
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    aadhaar: "",
    pan: "",
    maritalStatus: "",

    // CONTACT
    phone: "",
    email: "",
    address: "",
    state: "Madhya Pradesh",
    city: "",
    pincode: "",
    nationality: "Indian",
    workType: "",
    profession: "",

    // TYPE
    designation: "",
    advisorType: "",

    // NOMINEE
    nomineeName: "",
    nomineeAge: "",
    nomineeRelation: "",
    reference1Name: "",
    reference1Address: "",
    reference1Phone: "",
    reference2Name: "",
    reference2Address: "",
    reference2Phone: "",

    // BRANCH
    branchCode: "",
    headOffice: "Ujjain",
    branchLocation: "",

    // QUALIFICATION
    qualifications: [],

    // BANK
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branchName: "",

    // LEADER
    leaderCode: "admin001",
  });

  // =========================================================
  // FILES
  // =========================================================

  const [files, setFiles] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    panFront: null,
    panBack: null,
    profileImage: null,
  });

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // AADHAAR VALIDATION
    if (name === "aadhaar") {
      if (!/^\d{0,12}$/.test(value)) return;
    }

    // PHONE VALIDATION
    if (
      name === "phone" ||
      name === "reference1Phone" ||
      name === "reference2Phone"
    ) {
      if (!/^[6-9]?\d{0,9}$/.test(value)) return;
    }

    // PINCODE
    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }

    // ACCOUNT NUMBER
    if (name === "accountNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    // NOMINEE AGE
    if (name === "nomineeAge") {
      if (!/^\d{0,3}$/.test(value)) return;
    }

    // PAN
    if (name === "pan") {
      const upper = value.toUpperCase();
      setFormData((prev) => ({
        ...prev,
        [name]: upper,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // FILE HANDLE
  // =========================================================

  const handleFile = (e) => {
    const { name, files } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // =========================================================
  // QUALIFICATION
  // =========================================================

  const handleQualification = (value) => {
    setFormData((prev) => {
      const exists = prev.qualifications.includes(value);

      return {
        ...prev,
        qualifications: exists
          ? prev.qualifications.filter((q) => q !== value)
          : [...prev.qualifications, value],
      };
    });
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!/^\d{12}$/.test(formData.aadhaar)) {
      return alert("Aadhaar number must be 12 digits");
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      return alert("Invalid PAN format");
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return alert("Invalid phone number");
    }

    try {
      setLoading(true);
      const body = new FormData();

      // TEXT FIELDS
      Object.keys(formData).forEach((key) => {
        if (key === "qualifications") {
          body.append(key, JSON.stringify(formData.qualifications));
        } else {
          body.append(key, formData[key]);
        }
      });

      // FILES
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          body.append(key, files[key]);
        }
      });

      await axios.post("https://workiees.com/api/advisor/register", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Advisor Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-5 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* BACK BUTTON */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
            >
              <ArrowLeft size={20} className="text-gray-700 cursor-pointer" />
            </button>

            {/* TITLE */}
            <div>
              <h1 className="text-4xl font-bold text-[#111827]">
                Advisor Registration
              </h1>
              <p className="text-gray-500 mt-1">
                Complete advisor onboarding form
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL */}
          <Section title="Personal Details" icon={<User size={22} />}>
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Sourabh Sharma"
              value={formData.fullName}
              onChange={handleChange}
            />

            <Input
              label="Father Name"
              name="fatherName"
              placeholder="Rajesh Sharma"
              value={formData.fatherName}
              onChange={handleChange}
            />

            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              placeholder="DD/MM/YYYY"
              value={formData.dob}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              value={formData.gender}
              onChange={handleChange}
            />

            <Input
              label="Aadhaar Number"
              name="aadhaar"
              placeholder="123456789012"
              value={formData.aadhaar}
              onChange={handleChange}
            />

            <Input 
              label="PAN Number" 
              name="pan" 
              placeholder="ABCDE1234F" 
              value={formData.pan}
              onChange={handleChange}
            />

            <Select
              label="Marital Status"
              name="maritalStatus"
              options={["Single", "Married", "Divorced"]}
              value={formData.maritalStatus}
              onChange={handleChange}
            />
          </Section>

          {/* CONTACT */}
          <Section title="Contact Information" icon={<Phone size={22} />}>
            <Input 
              label="Phone Number" 
              name="phone" 
              placeholder="9876543210" 
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="Email Id"
              name="email"
              type="email"
              placeholder="advisor@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input 
              label="Address" 
              name="address" 
              placeholder="45 MG Road" 
              value={formData.address}
              onChange={handleChange}
            />

            <Input
              label="State"
              name="state"
              disabled
              placeholder="Madhya Pradesh"
              value={formData.state}
              onChange={handleChange}
            />

            <Select
              label="City"
              name="city"
              options={["Ujjain", "Dewas", "Indore"]}
              value={formData.city}
              onChange={handleChange}
            />

            <Input 
              label="Pincode" 
              name="pincode" 
              placeholder="456001" 
              value={formData.pincode}
              onChange={handleChange}
            />

            <Input
              label="Nationality"
              name="nationality"
              disabled
              placeholder="Indian"
              value={formData.nationality}
              onChange={handleChange}
            />

            <Input 
              label="Type of Work" 
              name="workType" 
              placeholder="Teacher" 
              value={formData.workType}
              onChange={handleChange}
            />

            <Input
              label="Primary Profession"
              name="profession"
              placeholder="Government Job"
              value={formData.profession}
              onChange={handleChange}
            />
          </Section>

          {/* TYPE */}
          <Section title="Type & Designation" icon={<Briefcase size={22} />}>
            <Select
              label="Designation"
              name="designation"
              options={designationOptions}
              value={formData.designation}
              onChange={handleChange}
            />

            <Select
              label="Advisor Type"
              name="advisorType"
              options={["Full Time", "Part Time"]}
              value={formData.advisorType}
              onChange={handleChange}
            />
          </Section>

          {/* NOMINEE */}
          <Section title="Nominee Details" icon={<ShieldCheck size={22} />}>
            <Input
              label="Nominee Name"
              name="nomineeName"
              placeholder="Pooja Sharma"
              value={formData.nomineeName}
              onChange={handleChange}
            />

            <Input 
              label="Nominee Age" 
              name="nomineeAge" 
              placeholder="25" 
              value={formData.nomineeAge}
              onChange={handleChange}
            />

            <Select
              label="Relationship"
              name="nomineeRelation"
              options={["Wife", "Husband", "Son", "Daughter", "Parent"]}
              value={formData.nomineeRelation}
              onChange={handleChange}
            />

            <Input
              label="Reference 1 Name"
              name="reference1Name"
              placeholder="Ramesh Sharma"
              value={formData.reference1Name}
              onChange={handleChange}
            />

            <Input
              label="Reference 1 Address"
              name="reference1Address"
              placeholder="Freeganj Ujjain"
              value={formData.reference1Address}
              onChange={handleChange}
            />

            <Input
              label="Reference 1 Phone"
              name="reference1Phone"
              placeholder="9876543210"
              value={formData.reference1Phone}
              onChange={handleChange}
            />

            <Input
              label="Reference 2 Name"
              name="reference2Name"
              placeholder="Mahesh Sharma"
              value={formData.reference2Name}
              onChange={handleChange}
            />

            <Input
              label="Reference 2 Address"
              name="reference2Address"
              placeholder="Vijay Nagar Indore"
              value={formData.reference2Address}
              onChange={handleChange}
            />

            <Input
              label="Reference 2 Phone"
              name="reference2Phone"
              placeholder="9876543210"
              value={formData.reference2Phone}
              onChange={handleChange}
            />
          </Section>

          {/* BRANCH */}
          <Section title="Branch Information" icon={<Building2 size={22} />}>
            <Input
              label="Branch Code"
              name="branchCode"
              placeholder="PIBUJ026"
              value={formData.branchCode}
              onChange={handleChange}
            />

            <Input
              label="Head Office"
              name="headOffice"
              disabled
              placeholder="Ujjain"
              value={formData.headOffice}
              onChange={handleChange}
            />

            <Input
              label="Branch Location"
              name="branchLocation"
              placeholder="Nanakheda Ujjain"
              value={formData.branchLocation}
              onChange={handleChange}
            />
          </Section>

          {/* QUALIFICATION */}
          <Section title="Qualification" icon={<FileText size={22} />}>
            <div className="col-span-full flex flex-wrap gap-5">
              {["10th", "12th", "Graduate", "Post Graduate"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.qualifications.includes(item)}
                    onChange={() => handleQualification(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </Section>

          {/* BANK */}
          <Section title="Bank Details" icon={<CreditCard size={22} />}>
            <Input
              label="Bank Name"
              name="bankName"
              placeholder="State Bank of India"
              value={formData.bankName}
              onChange={handleChange}
            />

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="123456789012"
              value={formData.accountNumber}
              onChange={handleChange}
            />

            <Input 
              label="IFSC Code" 
              name="ifsc" 
              placeholder="SBIN0001234" 
              value={formData.ifsc}
              onChange={handleChange}
            />

            <Input
              label="Branch Name"
              name="branchName"
              placeholder="Freeganj Branch"
              value={formData.branchName}
              onChange={handleChange}
            />
          </Section>

          {/* KYC */}
          <Section title="KYC Documents" icon={<Upload size={22} />}>
            {[
              ["aadhaarFront", "Aadhaar Front"],
              ["aadhaarBack", "Aadhaar Back"],
              ["panFront", "PAN Front"],
              ["panBack", "PAN Back"],
              ["profileImage", "Profile Image"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  {label}
                </label>
                <input
                  type="file"
                  name={name}
                  onChange={handleFile}
                  className="w-full border border-gray-200 rounded-xl p-3 bg-white"
                />
              </div>
            ))}
          </Section>

          {/* LEADER */}
          <Section title="Leader Information" icon={<User size={22} />}>
            <Input
              label="Leader Code"
              name="leaderCode"
              disabled
              placeholder="admin001"
              value={formData.leaderCode}
              onChange={handleChange}
            />
          </Section>

          {/* SUBMIT */}
          <div className="flex justify-end pb-8">
            <button
              type="submit"
              disabled={loading}
              className="h-[56px] px-10 rounded-2xl text-white font-semibold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: PRIMARY }}
            >
              {loading ? "Submitting..." : "Register Advisor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}