import React from 'react';
import { Trophy, Star, ShieldCheck, Award } from 'lucide-react';

const AwardsSection = () => {
  const PRIMARY_BLUE = "#005596";
  const ACCENT_ORANGE = "#f58025";

  const awardsData = [
    {
      id: 1,
      title: "Gold Excellence Award",
      category: "Real Estate Marketing 2024",
      description: "Recognized for driving highest sales velocity in Ujjain region projects like Shivangan Valley.",
      color: "#FFD700", // Gold
    },
    {
      id: 2,
      title: "Silver Trust Badge",
      category: "Customer Transparency",
      description: "Awarded for 100% legal clarity and RERA compliance documentation across all projects.",
      color: "#C0C0C0", // Silver
    },
    {
      id: 3,
      title: "Bronze Innovation",
      category: "Best Tech Integration",
      description: "For implementing the most efficient Broker-Manager mediation platform for real estate.",
      color: "#CD7F32", // Bronze
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Star size={14} style={{ color: ACCENT_ORANGE }} fill={ACCENT_ORANGE} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: PRIMARY_BLUE }}>
                Milestones of Trust
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Recognized for <br />
              <span style={{ color: PRIMARY_BLUE }}>Excellence & Integrity.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm border-l-2 border-slate-200 pl-6 pb-2 hidden md:block">
            Our commitment to legal clarity and developer success has earned us 
            prestigious accolades in the regional property market.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {awardsData.map((award) => (
            <div 
              key={award.id} 
              className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-100"
            >
              {/* Laurel Wreath Visual mimicking your reference */}
              <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                   <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: award.color }}>
                     <path d="M50 85c-19.3 0-35-15.7-35-35s15.7-35 35-35c1.1 0 2 .9 2 2s-.9 2-2 2c-17.1 0-31 13.9-31 31s13.9 31 31 31c1.1 0 2 .9 2 2s-.9 2-2 2zM50 15c19.3 0 35 15.7 35 35s-15.7 35-35 35c-1.1 0-2-.9-2-2s.9-2 2-2c17.1 0 31-13.9 31-31s-13.9-31-31-31c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
                   </svg>
                </div>
                <div className="relative z-10 flex items-center justify-center">
                   <Trophy size={40} style={{ color: award.color }} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    {award.category}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#005596] transition-colors">
                    {award.title}
                  </h3>
                </div>
                
                <div className="h-px w-12 bg-slate-100 mx-auto transition-all duration-700 group-hover:w-full" />
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {award.description}
                </p>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Validation Badges mimicking your Roadmap Step 8 */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <div className="flex items-center gap-3">
             <ShieldCheck size={20} style={{ color: PRIMARY_BLUE }} />
             <span className="text-xs font-black tracking-[0.2em] text-slate-900 uppercase">RERA Compliant</span>
          </div>
          <div className="flex items-center gap-3">
             <Award size={20} style={{ color: PRIMARY_BLUE }} />
             <span className="text-xs font-black tracking-[0.2em] text-slate-900 uppercase">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-3">
             <Star size={20} style={{ color: PRIMARY_BLUE }} />
             <span className="text-xs font-black tracking-[0.2em] text-slate-900 uppercase">TNCP Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;