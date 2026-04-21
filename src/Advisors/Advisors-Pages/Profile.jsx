import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Shield,
  Users,
  Landmark,
  Heart,
  Edit3,
  Camera,
  CheckCircle,
  Eye,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Personal");

  const profileData = {
    basic: {
      name: "Rajesh Kumar",
      desig: "Senior Manager",
      code: "PRM-8821",
      leader: "Amit Singh",
      type: "Full Time",
    },
    personal: {
      dob: "15 Aug 1985",
      fatherName: "Suresh Kumar", // Added
      gender: "Male",
      marital: "Married", // Added
      nation: "Indian", // Added
      mobile: "+91 98765 43210",
      email: "rajesh.k@gmail.com",
      address: "42, Green Avenue, Jaipur",
      doj: "01 Jan 2023", // Added
    },
    leader: {
      name: "Amit Singh",
      code: "PRI00001",
      designation: "Regional Head",
    },
    family: {
      nominee: "Sunita Kumar",
      relation: "Spouse",
      nomineeDob: "22 Nov 1988",
    },
    identity: { pan: "ABCDE1234F", aadhar: "XXXX-XXXX-9876" },
    banking: {
      bank: "HDFC Bank",
      branch: "Vaishali Nagar",
      account: "50100234567890",
      ifsc: "HDFC0001234",
    },
  };

  const tabs = [
    { id: "Personal", icon: <User size={16} /> },
    { id: "Leader", icon: <Users size={16} /> },
    { id: "Identity", icon: <Shield size={16} /> },
    { id: "Family", icon: <Heart size={16} /> },
    { id: "Banking", icon: <Landmark size={16} /> },
  ];

  // Helper for Document Actions
  const handleDocumentView = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleDocumentDownload = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Modern Identity Card Component
  const IdentityCard = ({ label, value, fileUrl, fileName }) => (
    <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm flex flex-col justify-between h-44 hover:border-blue-100 transition-all">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-lg font-black text-gray-800 mt-1 tracking-widest">
          {value}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleDocumentView(fileUrl)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[#005596] py-2 rounded-[8px] text-[10px] font-bold transition-all border border-transparent hover:border-blue-100"
        >
          <Eye size={14} /> VIEW
        </button>
        <button
          onClick={() => handleDocumentDownload(fileUrl, fileName)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-[#f58025] py-2 rounded-[8px] text-[10px] font-bold transition-all border border-transparent hover:border-orange-100"
        >
          <Download size={14} /> DOWNLOAD
        </button>
      </div>
    </div>
  );
  return (
    <div
      className="max-w-5xl mx-auto space-y-6 bg-gray-200 p-4"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* HEADER CARD (Top Section of Sketch) */}
      <div className="bg-white p-8 rounded-[8px] border border-gray-100 shadow-sm flex items-center gap-10">
        <div className="relative">
          <img
            src="/assets/images/bhanu.jpeg"
            className="w-32 h-32 rounded-[8px] object-cover border-2 border-gray-100"
            alt="Profile"
          />
          <div className="absolute -bottom-2 -right-2 p-2 bg-[#f58025] text-white rounded-full shadow-lg cursor-pointer">
            <Camera size={14} />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-y-2">
          <p className="text-sm text-gray-500">
            Name :-{" "}
            <span className="font-bold text-gray-800">
              {profileData.basic.name}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Designation :-{" "}
            <span className="font-bold text-gray-800">
              {profileData.basic.desig}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Code :-{" "}
            <span className="font-bold text-gray-800">
              {profileData.basic.code}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Type :-{" "}
            <span className="font-bold text-gray-800">
              {profileData.basic.type}
            </span>
          </p>
        </div>
        <Link
          to="/advisor/profile/edit"
          className="bg-[#005596] text-white px-4 py-2 rounded-[8px] text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors self-start"
        >
          <Edit3 size={14} /> EDIT PROFILE
        </Link>
      </div>

      {/* CONTENT BY TABS (Bottom Section of Sketch) */}
      <div className="flex gap-6 h-[450px]">
        {/* Left Side: Tabs List */}
        <div className="w-64 bg-white border border-gray-100 rounded-[8px] overflow-hidden flex flex-col shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 text-xs font-bold transition-all border-l-4 ${activeTab === tab.id ? "bg-blue-50 text-[#005596] border-[#005596]" : "text-gray-400 border-transparent hover:bg-gray-50"}`}
            >
              {tab.icon} {tab.id} Details
            </button>
          ))}
        </div>

        {/* Right Side: Tab Content (Now including all sections) */}
        <div className="flex-1 bg-white border border-gray-100 rounded-[8px] p-8 overflow-y-auto no-scrollbar">
          {/* PERSONAL TAB */}
          {activeTab === "Personal" && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-300">
              <DetailItem
                label="Date of Birth"
                value={profileData.personal.dob}
              />
              <DetailItem
                label="Father's Name"
                value={profileData.personal.fatherName}
              />
              <DetailItem label="Gender" value={profileData.personal.gender} />
              <DetailItem
                label="Marital Status"
                value={profileData.personal.marital}
              />
              <DetailItem
                label="Nationality"
                value={profileData.personal.nation}
              />
              <DetailItem
                label="Date of Joining"
                value={profileData.personal.doj}
              />
              <DetailItem label="Mobile" value={profileData.personal.mobile} />
              <DetailItem label="Email" value={profileData.personal.email} />
              <DetailItem
                label="Address"
                value={profileData.personal.address}
                full
              />
            </div>
          )}

          {/* LEADER TAB */}
          {activeTab === "Leader" && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-300">
              <DetailItem label="Leader Name" value={profileData.leader.name} />
              <DetailItem label="Leader Code" value={profileData.leader.code} />
              <DetailItem
                label="Leader Designation"
                value={profileData.leader.designation}
                full
              />
            </div>
          )}

          {/* IDENTITY TAB */}
          {activeTab === "Identity" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PAN CARD CARD */}
                <div className="bg-gray-200 p-6 rounded-[8px] border border-gray-100 shadow-sm flex flex-col justify-between h-44 hover:border-blue-100 transition-all">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      PAN Card
                    </p>
                    <p className="text-lg font-black text-gray-800 mt-1 tracking-widest">
                      {profileData.identity.pan}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDocumentView("/path-to-pan.pdf")}
                      className="flex-1 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[#005596] py-2.5 rounded-[8px] text-[10px] font-black transition-all border border-transparent hover:border-blue-100 uppercase"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleDocumentDownload(
                          "/path-to-pan.pdf",
                          "PAN_Card.pdf",
                        )
                      }
                      className="flex-1 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-[#f58025] py-2.5 rounded-[8px] text-[10px] font-black transition-all border border-transparent hover:border-orange-100 uppercase"
                    >
                      Download
                    </button>
                  </div>
                </div>

                {/* AADHAR CARD CARD */}
                <div className="bg-gray-200 p-6 rounded-[8px] border border-gray-100 shadow-sm flex flex-col justify-between h-44 hover:border-blue-100 transition-all">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Aadhar Number
                    </p>
                    <p className="text-lg font-black text-gray-800 mt-1 tracking-widest">
                      {profileData.identity.aadhar}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDocumentView("/path-to-aadhar.pdf")}
                      className="flex-1 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[#005596] py-2.5 rounded-[8px] text-[10px] font-black transition-all border border-transparent hover:border-blue-100 uppercase"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleDocumentDownload(
                          "/path-to-aadhar.pdf",
                          "Aadhar_Card.pdf",
                        )
                      }
                      className="flex-1 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-[#f58025] py-2.5 rounded-[8px] text-[10px] font-black transition-all border border-transparent hover:border-orange-100 uppercase"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAMILY TAB */}
          {activeTab === "Family" && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-300">
              <DetailItem
                label="Nominee Name"
                value={profileData.family.nominee}
              />
              <DetailItem
                label="Relation"
                value={profileData.family.relation}
              />
              <DetailItem
                label="Nominee DOB"
                value={profileData.family.nomineeDob}
              />
            </div>
          )}
          {/* BANKING TAB */}
          {activeTab === "Banking" && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-300">
              <DetailItem label="Bank Name" value={profileData.banking.bank} />
              <DetailItem label="Branch" value={profileData.banking.branch} />
              <DetailItem
                label="Account Number"
                value={profileData.banking.account}
              />
              <DetailItem label="IFSC Code" value={profileData.banking.ifsc} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, full }) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-sm font-bold text-gray-700 mt-1">{value || "---"}</p>
  </div>
);

export default Profile;
