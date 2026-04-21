// components/ThankYouModal.jsx
import React from "react";
import { CheckCircle2 } from "lucide-react";

const ThankYouModal = ({ isOpen, onClose, onSeeSimilar }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/40
  ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} 
  transition-opacity duration-200`}>
      {/* Backdrop */}

       <div className={`bg-white rounded-lg p-6 shadow-lg transform
    ${isOpen ? "scale-100" : "scale-95"} transition-transform duration-200`}
  >


      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-[101] w-full max-w-md mx-4 rounded-lg bg-white shadow-xl p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Thank you for your interest
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Your details have been submitted successfully. Our property advisor
            will contact you shortly to discuss this property in detail.
          </p>
          <p className="text-[11px] text-slate-500">
            Meanwhile, you can also explore similar properties that match your
            requirements.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              OK
            </button>
            <button
              type="button"
              onClick={onSeeSimilar}
              className="w-full inline-flex items-center justify-center rounded-md bg-[#f58025] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#d56716]"
            >
              See similar properties
            </button>
          </div>
        </div>
      </div>
  </div>
    </div>
  );
};

export default ThankYouModal;
