import React from 'react';
import { Search, FileText, Eye, Download, ShieldCheck, CreditCard, MapPin, TrendingUp } from 'lucide-react';

const Document = () => {
  const allDocuments = [
    { id: 1, name: "Welcome Letter", url: "/files/welcome.pdf", type: "PDF", size: "1.2 MB", icon: <ShieldCheck className="text-blue-500" />, bg: "bg-blue-50" },
    { id: 2, name: "Advisor ID Card", url: "/files/id-card.jpg", type: "JPG", size: "450 KB", icon: <CreditCard className="text-cyan-500" />, bg: "bg-cyan-50" },
    { id: 3, name: "Project Brochures",url: "/files/id-card.jpg", type: "PDF", size: "12.4 MB", icon: <FileText className="text-purple-500" />, bg: "bg-purple-50" },
    { id: 4, name: "Site Maps",url: "/files/id-card.jpg", type: "JPG", size: "4.5 MB", icon: <MapPin className="text-teal-500" />, bg: "bg-teal-50" },
    { id: 5, name: "Business Plan",url: "/files/id-card.jpg", type: "PDF", size: "3.1 MB", icon: <TrendingUp className="text-indigo-500" />, bg: "bg-indigo-50" },
    { id: 6, name: "RERA Certification",url: "/files/id-card.jpg", type: "PDF", size: "2.5 MB", icon: <ShieldCheck className="text-yellow-600" />, bg: "bg-yellow-50" },
    { id: 7, name: "Advisor ID Card",url: "/files/id-card.jpg", type: "JPG", size: "450 KB", icon: <CreditCard className="text-cyan-500" />, bg: "bg-cyan-50" },
    { id: 8, name: "Company Rules",url: "/files/id-card.jpg", type: "PDF", size: "4.2 MB", icon: <FileText className="text-slate-500" />, bg: "bg-slate-50" },
  ];

  // FUNCTIONALITY FOR VIEWING
  const handleView = (url) => {
    if (url) {
      window.open(url, '_blank'); // Opens in a new tab using browser's native PDF viewer
    } else {
      alert("File not available for viewing");
    }
  };

  // FUNCTIONALITY FOR DOWNLOADING
  const handleDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Suggests a filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <h2 className="text-2xl font-bold text-gray-800">Document Center</h2>

{/* Professional Search Bar */}
      <div className="relative bg-white border border-gray-100 rounded-[8px] px-5 py-4 flex items-center shadow-sm max-w-2xl">
        <Search size={20} className="text-gray-300 mr-3" />
        <input 
          type="text" 
          placeholder="Search for brochures, forms, or certifications..." 
          className="bg-transparent border-none outline-none w-full text-sm text-gray-600"
        />
      </div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allDocuments.map((doc) => (
          <div key={doc.id} className="bg-gray-200 p-5 rounded-[8px] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 ${doc.bg} rounded-[8px] flex items-center justify-center shrink-0`}>
                {doc.icon}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">{doc.name}</h4>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">{doc.type} • {doc.size}</p>
              </div>
            </div>

            {/* BUTTONS WITH LOGIC */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleView(doc.url)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[#005596] py-2 rounded-[8px] text-[10px] font-bold transition-all border border-transparent hover:border-blue-100"
              >
                <Eye size={14} /> VIEW
              </button>
              <button 
                onClick={() => handleDownload(doc.url, doc.name)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-[#f58025] py-2 rounded-[8px] text-[10px] font-bold transition-all border border-transparent hover:border-orange-100"
              >
                <Download size={14} /> DOWNLOAD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Document;