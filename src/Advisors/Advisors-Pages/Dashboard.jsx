import React, { useState } from 'react';
import { 
  User, Home, PieChart, Users, Settings, 
  Bell, CalendarCheck, FileText, Award, LogOut, 
  Trophy, Megaphone, Calculator, ChevronRight, 
  TrendingUp, Clock, FileType, MapPin, Map, Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdvisorManagement = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [timeFilter, setTimeFilter] = useState('Month');

  const primaryBlue = "#005596";
  const primaryOrange = "#f58025";
  const filters = ['Month', 'Quarter', 'Year'];
  

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      
      

      {/* MAIN DASHBOARD */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
       

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
          
          {/* CAREER PROGRESS */}
          <section className="bg-white border border-gray-100 p-5 rounded-[8px] shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#1e293b] rounded-[8px] flex flex-col items-center justify-center text-white">
                 <Trophy size={20} className="text-gray-300 mb-0.5" />
                 <div className="bg-[#f59e0b] px-1.5 py-0.5 rounded-full">
                    <span className="text-[7px] font-black text-black">LVL 3</span>
                 </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Senior Adviser</h3>
                <p className="text-[10px] font-bold text-[#005596] flex items-center gap-1 uppercase tracking-wider">
                  Next: Director <TrendingUp size={10} />
                </p>
              </div>
            </div>
            <div className="text-4xl font-black text-[#1e293b]">82%</div>
          </section>

          {/* SALES CONVERSION WITH TIME FILTER */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sales Conversion</h3>
              <div className="flex bg-gray-100 p-1 rounded-[8px]">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setTimeFilter(f)}
                    className={`px-4 py-1 text-[10px] font-bold rounded-[6px] transition-all ${
                      timeFilter === f ? 'bg-white text-[#005596] shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              <StatBox label="Suspecting" val="102" bg="#E3F2FD" color="#1976D2" />
              <StatBox label="Prospecting" val="25" bg="#F3E5F5" color="#7B1FA2" />
              <StatBox label="Site Visit" val="10" bg="#E8F5E9" color="#388E3C" />
              <StatBox label="Business Plan" val="05" bg="#FFF3E0" color="#F57C00" />
              <StatBox label="Booking" val="03" bg="#FFEBEE" color="#D32F2F" />
              <StatBox label="Recruitment" val="08" bg="#E0F2F1" color="#00796B" />
            </div>
          </section>

          <div className="grid grid-cols-12 gap-8">
            {/* LEFT COLUMN: PENDING ACTIONS & ACTIVE CONTESTS */}
            <div className="col-span-7 space-y-8">
              
              {/* PENDING ACTIONS */}
              <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-700">Pending Actions</h3>
                  <span className="text-[10px] font-bold text-[#005596]">4 Tasks</span>
                </div>
                <div className="space-y-4">
                  <ActionItem icon={<Users size={18} className="text-orange-500" />} bg="bg-orange-50" title="Recruitment Follow-up" desc="Call for Actions: Team Recruit..." time="10:00 AM" />
                  <ActionItem icon={<FileType size={18} className="text-blue-500" />} bg="bg-blue-50" title="Upload KYC Documents" desc="PAN, Aadhaar, Photo, Cancel..." time="Due Today" />
                  <ActionItem icon={<CalendarCheck size={18} className="text-green-500" />} bg="bg-green-50" title="Installment Reminder" desc="Old installments - Call to cust..." time="Tomorrow" />
                  <ActionItem icon={<MapPin size={18} className="text-teal-500" />} bg="bg-teal-50" title="Pending Site Visit" desc="Site visit today with rajesh kum" time="Due Today" />
                </div>
              </div>

              {/* ACTIVE CONTESTS (Integrated from Image 3) */}
              <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-700">Active Contests</h3>
                  <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-[4px] uppercase tracking-tighter">Running</span>
                </div>
                <div className="space-y-3">
                  <ContestItem icon={<Trophy size={16} className="text-blue-500" />} label="Top 3 Advisor in Recruitment" />
                  <ContestItem icon={<MapPin size={16} className="text-blue-500" />} label="Top 3 Advisor in Site Visit" />
                  <ContestItem icon={<CalendarCheck size={16} className="text-blue-500" />} label="Top 3 Advisor in Booking" />
                  <ContestItem 
                    icon={<Gift size={16} className="text-blue-500" />} 
                    label="Goa, Malesiya" 
                    sub="Qualify for: Trip to Goa/Malaysia" 
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROMOTION STATUS & STATS */}
            <div className="col-span-5 space-y-8">
              {/* PROMOTION STATUS */}
              <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-700 mb-4">Promotion Status</h3>
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="text-gray-400 font-bold uppercase border-b border-gray-50">
                      <th className="pb-3 font-medium">Metric</th>
                      <th className="pb-3 font-medium text-center">Target</th>
                      <th className="pb-3 font-medium text-right">Achieved</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <TableRow label="Personal Booking" target="1" achieved="1" color="text-blue-600" />
                    <TableRow label="Team Booking" target="4" achieved="3" dot color="text-blue-400" />
                    <TableRow label="Team Size" target="20" achieved="15" color="text-blue-500" />
                    <TableRow label="Attendance" target="10" achieved="05" color="text-blue-700" />
                  </tbody>
                </table>
              </div>

              {/* ATTENDANCE & LAST DEAL */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-[8px] border border-gray-100 flex justify-between items-center shadow-sm">
                   <p className="text-[10px] font-bold text-gray-400 uppercase">Team Avg Attendance</p>
                   <p className="text-xl font-black text-[#005596]">78%</p>
                </div>
                <div className="bg-[#005596] p-5 rounded-[8px] text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[9px] font-bold opacity-60 uppercase mb-1">Last Deal Closure</p>
                    <p className="text-sm font-bold">Skyline Residency</p>
                  </div>
                  <button className="relative z-10 bg-[#f58025] px-4 py-2 rounded-[8px] text-[10px] font-bold hover:bg-orange-600 transition-colors">
                    INVOICE
                  </button>
                  <Home className="absolute -right-4 -bottom-4 opacity-10" size={80} />
                </div>
              </div>
            </div>

            {/* UPCOMING INSTALLMENT (Full Width Footer) */}
            <div className="col-span-12 bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm flex items-center justify-between">
               <div className="flex gap-8 items-center">
                 <div className="w-12 h-12 bg-orange-50 rounded-[8px] flex items-center justify-center text-[#f58025]">
                    <CalendarCheck size={24} />
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-gray-800">Green Valley • Unit A-402</h3>
                   <div className="flex gap-6 mt-1 text-[10px] text-gray-500">
                      <p>Client: <span className="text-gray-800 font-medium">Rohan Sharma</span></p>
                      <p>Commission: <span className="text-green-600 font-bold">₹2,250</span></p>
                   </div>
                 </div>
               </div>
               <div className="text-right border-l pl-8 border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Due Date</p>
                  <p className="text-base font-black text-[#005596]">15 MAR 2026</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const SidebarLink = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-[#005596] hover:bg-gray-50 rounded-[8px] cursor-pointer transition-all">
    <span>{icon}</span><span className="text-xs font-bold">{label}</span>
  </div>
);

const StatBox = ({ label, val, bg, color }) => (
  <div className="p-4 rounded-[8px] min-w-[160px] shadow-sm border border-white" style={{ backgroundColor: bg }}>
    <p className="text-2xl font-black mb-1" style={{ color }}>{val}</p>
    <p className="text-[9px] font-bold uppercase tracking-wider opacity-70" style={{ color }}>{label}</p>
  </div>
);

const ActionItem = ({ icon, bg, title, desc, time }) => (
  <div className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
    <div className="flex items-center gap-4">
      <div className={`w-9 h-9 ${bg} rounded-[8px] flex items-center justify-center`}>{icon}</div>
      <div><h4 className="text-[11px] font-bold text-gray-800">{title}</h4><p className="text-[9px] text-gray-400 leading-tight">{desc}</p></div>
    </div>
    <span className="text-[8px] font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-[4px]">{time}</span>
  </div>
);

const ContestItem = ({ icon, label, sub }) => (
  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-[8px] hover:border-blue-100 transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-blue-50 rounded-[6px] flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[11px] font-bold text-gray-800">{label}</p>
        {sub && <p className="text-[9px] text-blue-400 mt-0.5">{sub}</p>}
      </div>
    </div>
    <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
  </div>
);

const TableRow = ({ label, target, achieved, color, dot }) => (
  <tr className="border-b border-gray-50 last:border-0">
    <td className="py-3 flex items-center gap-2">{label} {dot && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}</td>
    <td className="py-3 text-center font-bold text-gray-900">{target}</td>
    <td className={`py-3 text-right font-bold ${color}`}>{achieved}</td>
  </tr>
);

export default AdvisorManagement;