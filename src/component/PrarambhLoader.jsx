import React from "react";

const PrarambhLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#e9ebf2] font-sans">
      {/* Custom keyframes for the building animation */}
      <style>
        {`
          @keyframes building-grow {
            0%, 100% { transform: scaleY(0.85); opacity: 0.9; }
            50% { transform: scaleY(1.05); opacity: 1; }
          }
          .animate-building {
            transform-origin: bottom;
            animation: building-grow 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative flex flex-col items-center">
        {/* Animated Golden Sun Background */}
        <div className="absolute w-36 h-36 bg-gradient-to-br from-[#d97d22] to-[#b86111] rounded-full animate-pulse blur-[1px] -top-8" />

        {/* Skyscraper Buildings */}
        <div className="relative z-10 flex items-end justify-center gap-[2px] h-28 mb-4 border-b-2 border-[#034A91] px-2 pb-1">
          {/* Building 1 */}
          <div 
            className="w-5 bg-[#034A91] h-12 animate-building" 
            style={{ animationDelay: "0ms" }} 
          />
          {/* Building 2 */}
          <div 
            className="w-6 bg-[#023870] h-20 animate-building shadow-lg" 
            style={{ animationDelay: "200ms" }} 
          />
          {/* Building 3 (Tallest Center) */}
          <div 
            className="w-7 bg-[#034A91] h-28 animate-building shadow-xl" 
            style={{ animationDelay: "400ms" }} 
          />
          {/* Building 4 */}
          <div 
            className="w-6 bg-[#023870] h-24 animate-building shadow-lg" 
            style={{ animationDelay: "600ms" }} 
          />
          {/* Building 5 */}
          <div 
            className="w-5 bg-[#034A91] h-14 animate-building" 
            style={{ animationDelay: "800ms" }} 
          />
        </div>

        {/* Company Name */}
        <div className="relative z-10 flex flex-col items-center mt-2">
          <h1 className="text-4xl font-serif font-bold text-[#034A91] tracking-[0.1em] uppercase shadow-white drop-shadow-sm">
            Prarambh
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-12 h-[1px] bg-[#d97d22]"></div>
            <span className="text-[#d97d22] tracking-[0.3em] text-sm font-semibold uppercase">
              Infra
            </span>
            <div className="w-12 h-[1px] bg-[#d97d22]"></div>
          </div>
        </div>

        {/* Loading text indicator */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex space-x-1 mb-2">
            <div className="w-2 h-2 bg-[#034A91] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-[#034A91] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-[#034A91] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
          <p className="text-sm text-slate-500 font-medium tracking-wide">
            Curating your perfect property...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrarambhLoader;