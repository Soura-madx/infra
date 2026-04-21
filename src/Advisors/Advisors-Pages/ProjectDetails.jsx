import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  MapPin, Share2, FileText, Map as MapIcon, 
  Grid, ShieldCheck, ChevronLeft, ChevronRight, 
  User, Home, Info, Trees, Car, Zap, ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Retrieves project ID from URL

  // Mock data representing the "Shivangan Valley" example
  const project = {
    name: "Shivangan Valley",
    developer: "Workiees Developers",
    location: "Behind City Mall, Sector 4, Indore",
    city: "Indore",
    status: "Ongoing",
    possession: "Under Construction",
    type: "Residential",
    reraNo: "P-IND-22-1234",
    builtUpArea: "1200 - 2500 sqft",
    marketValue: "₹45L - ₹85L",
    totalUnits: "250",
    description: "Shivangan Valley offers a premium living experience with modern architecture and lush green surroundings. Designed for families seeking comfort and connectivity.",
    amenities: ["Garden", "Gym", "Clubhouse", "24/7 Security", "Power Backup", "Parking"],
    images: ["/assets/p1.jpg", "/assets/p2.jpg", "/assets/p3.jpg"]
  };

  const [currentImg, setCurrentImg] = useState(0);

  const handleShare = () => {
    const text = `Check out ${project.name} in ${project.city}. Price: ${project.marketValue}. RERA: ${project.reraNo}`;
    if (navigator.share) {
      navigator.share({ title: project.name, text: text, url: window.location.href });
    } else {
      alert("Copied to clipboard: " + text);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex justify-between items-center bg-white p-4 rounded-[8px] border border-gray-100 shadow-sm  z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{project.location}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleShare} className="p-2 border rounded-[8px] hover:bg-gray-50"><Share2 size={16}/></button>
          <button className="bg-[#005596] text-white px-6 py-2 rounded-[8px] text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
            <FileText size={14} /> BROCHURE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT: SLIDER & DESCRIPTION */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* IMAGE SLIDER */}
          <div className="relative h-[400px] bg-gray-200 rounded-[8px] overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
               <ImageIcon size={48} className="opacity-20" />
            </div>
            {/* Nav Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
            {/* RERA Badge */}
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-[4px] text-[10px] font-bold flex items-center gap-2 shadow-lg">
              <ShieldCheck size={14} /> RERA APPROVED
            </div>
          </div>

          {/* PROJECT DESCRIPTION */}
          <div className="bg-white p-8 rounded-[8px] border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">Project Description</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>
          </div>

          {/* AMENITIES */}
          <div className="bg-white p-8 rounded-[8px] border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 border-b pb-4 mb-6">Surrounding Amenities</h3>
            <div className="grid grid-cols-3 gap-6">
              <AmenityItem icon={<Trees className="text-green-500"/>} label="Park & Garden" />
              <AmenityItem icon={<Car className="text-blue-500"/>} label="Visitor Parking" />
              <AmenityItem icon={<Zap className="text-yellow-500"/>} label="Power Backup" />
              <AmenityItem icon={<Home className="text-purple-500"/>} label="Club House" />
              <AmenityItem icon={<ShieldCheck className="text-red-500"/>} label="24/7 Security" />
              <AmenityItem icon={<Info className="text-cyan-500"/>} label="CCTV Surveillance" />
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS & ACTIONS */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* QUICK INFO CARD */}
          <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm space-y-4">
            <div className="pb-4 border-b">
               <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Developer</p>
               <p className="text-sm font-bold text-gray-800">{project.developer}</p>
            </div>
            <DetailRow label="RERA No." value={project.reraNo} />
            <DetailRow label="Total Units" value={project.totalUnits} />
            <DetailRow label="Built-up Area" value={project.builtUpArea} />
            <DetailRow label="Market Value" value={project.marketValue} highlight />
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="grid grid-cols-1 gap-3">
            <ActionButton 
              icon={<Grid size={18} />} 
              label="UNIT INVENTORY" 
              onClick={() => navigate(`/advisor/project/${id}/inventory`)}
              primary
            />
            <ActionButton icon={<MapIcon size={18} />} label="OPEN IN GOOGLE MAPS" />
          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-2 gap-4">
             <StatusBox label="Status" value={project.status} />
             <StatusBox label="Possession" value={project.possession} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- UI COMPONENTS --- */

const DetailRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-gray-400 font-bold uppercase">{label}</span>
    <span className={`font-bold ${highlight ? 'text-[#f58025] text-sm' : 'text-gray-800'}`}>{value}</span>
  </div>
);

const ActionButton = ({ icon, label, onClick, primary }) => (
  <button 
    onClick={onClick}
    className={`w-full py-3 rounded-[8px] text-[10px] font-black flex items-center justify-center gap-3 transition-all border shadow-sm ${
      primary ? 'bg-[#f58025] text-white border-[#f58025] hover:bg-orange-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {icon} {label}
  </button>
);

const AmenityItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[8px]">
    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">{icon}</div>
    <span className="text-[10px] font-bold text-gray-600 uppercase">{label}</span>
  </div>
);

const StatusBox = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-[8px] border text-center">
    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{label}</p>
    <p className="text-[11px] font-black text-[#005596] uppercase">{value}</p>
  </div>
);

export default ProjectDetails;