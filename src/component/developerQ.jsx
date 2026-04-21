import React from 'react';
import { Building2, Rocket, ShieldCheck, ArrowUpRight, BarChart3 } from 'lucide-react';

const DeveloperLightUI = () => {
  // Brand Colors
  const PRIMARY_BLUE = "#005596";
  const ACCENT_ORANGE = "#f58025";

  return (
    <div className="w-full py-12 bg-[#F8FAFC]"> {/* Subtle off-white background */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Container */}
        <div className="relative overflow-hidden bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          
          {/* Subtle Corner Accent */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none translate-x-20 -translate-y-20"
            style={{ backgroundColor: PRIMARY_BLUE, borderRadius: '100%' }}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Left: Content Area */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                <ShieldCheck size={14} style={{ color: PRIMARY_BLUE }} />
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: PRIMARY_BLUE }}>
                  Strategic Partner Program
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Are You a <span style={{ color: ACCENT_ORANGE }}>Developer?</span>
                </h2>
                <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
                  Leverage the <span className="text-slate-900">Prarambh Infra</span> sales engine. 
                  We handle the marketing complexity so you can focus on construction.
                </p>
              </div>

              {/* Minimal Value Points */}
              <div className="grid grid-cols-2  pt-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <BarChart3 size={16} className="text-slate-400" />
                  <span className="text-xs font-semibold">Market Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Rocket size={16} className="text-slate-400" />
                  <span className="text-xs font-semibold">Rapid Sales Velocity</span>
                </div>
              </div>
            </div>

            {/* Right: Action Card */}
            <div className="w-full lg:w-auto">
              <div className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100 flex flex-col items-center text-center space-y-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform "
                  style={{ backgroundColor: PRIMARY_BLUE }}
                >
                  <Building2 size={30} className="text-white" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Growth Phase</p>
                  <p className="text-lg font-bold text-slate-900">Scale Your Projects</p>
                </div>

                <button 
                  style={{ backgroundColor: ACCENT_ORANGE }}
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-sm transition-all hover:shadow-[0_10px_25px_-5px_rgba(245,128,37,0.4)] active:scale-95 whitespace-nowrap"
                >
                  Marketing Strategy
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLightUI;