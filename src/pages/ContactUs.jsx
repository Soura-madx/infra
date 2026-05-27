import React, { useState } from "react";
import axios from "axios";
import Footer from "../component/footer";
import Navbar from "../component/Navbar";

const PRIMARY = "#034A91";
const ACCENT = "#f58025";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    iWant: "",
  });

  // ✅ NEW STATES FOR MODAL AND LOADING
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("full_name", form.name);
    formData.append("phone_number", form.phone);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("i_want_to", form.iWant);

    const response = await axios.post(
      "https://workiees.com/api/contacts/add",
      formData,
    );

    console.log("API Response:", response.data);

    // ✅ FIX: Check if response status is 200 or 201 (success)
    // Most APIs return 200/201 for success, not necessarily success: true
    if (response.status === 200 || response.status === 201 || response.data.success) {
      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
        iWant: "",
      });
    } else {
      // Show error modal
      setErrorMessage(response.data.message || "Something went wrong");
      setShowErrorModal(true);
    }
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.log("BACKEND RESPONSE:", error.response?.data);

    // ✅ Only show error if there's actually an error (4xx, 5xx status codes)
    setErrorMessage(
      error.response?.data?.message ||
        "Failed to submit enquiry. Please try again.",
    );
    setShowErrorModal(true);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div>
      <Navbar />
      <div className="space mt-20"></div>
      <section className="bg-[#F8FAFC] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-6">
          {/* Heading */}
          <header className="mb-8 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f58025] mb-1">
              Contact us
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Let&apos;s talk about your property plans
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Share a few details and a Prarambh Infra advisor will get in touch
              to help you buy, rent or sell property in and around Ujjain.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Form */}
            <div className="bg-white rounded-md border border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                Share your requirement
              </h3>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Full name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#034A91]/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Phone number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#034A91]/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#034A91]/20"
                  />
                </div>

                <div className="grid gap-3 grid-cols-1">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      I want to*
                    </label>
                    <select
                      name="iWant"
                      value={form.iWant}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#034A91]/20"
                    >
                      <option value="">Select</option>
                      <option value="Buy a property">Buy a property</option>
                      <option value="Rent a property">Rent a property</option>
                      <option value="Sell a property">Sell a property</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about location, budget, BHK or plot size you are looking for."
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#034A91]/20"
                  />
                </div>

                {/* ✅ UPDATED SUBMIT BUTTON WITH LOADER */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-2 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all ${
                    isSubmitting
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-[#f58025] shadow-orange-900/20 hover:bg-[#d66716] hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit enquiry"
                  )}
                </button>

                <p className="mt-2 text-[10px] text-slate-400">
                  By submitting this form, you agree to be contacted by Prarambh
                  Infra via call / WhatsApp / SMS for your enquiry.
                </p>
              </form>
            </div>

            {/* Right: Company details + Map */}
            <div className="space-y-4">
              <div className="bg-white rounded-md border border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                  Prarambh Infra – Head Office
                </h3>

                <dl className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex gap-2">
                    <dt className="w-28 text-slate-500">Contact person</dt>
                    <dd className="font-semibold">Amit Jadhav</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 text-slate-500">Call us</dt>
                    <dd>
                      <a
                        href="tel:+919876511122"
                        className="font-semibold text-[#034A91] hover:underline"
                      >
                        6232908887
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 text-slate-500">Email</dt>
                    <dd>
                      <a
                        href="mailto:infoprarambhinfra@gmail.com"
                        className="font-semibold text-[#034A91] hover:underline break-all"
                      >
                        infoprarambhinfra@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 text-slate-500">Office time</dt>
                    <dd>Mon – Sat: 10:00 AM – 7:00 PM</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 text-slate-500">Address</dt>
                    <dd className="font-medium">
                      A-115, First Floor, Divine Valley, Rishi Nagar, Ujjain
                      456010
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Map */}
              <div className="bg-white rounded-md border border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.08)] overflow-hidden">
                <div className="h-56 sm:h-64 w-full">
                  <iframe
                    title="Prarambh Infra office location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.0826967728804!2d75.78412527509637!3d23.16718167907264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963747c1e9ecf7b%3A0x513be4298109aa70!2sDivine%20Valley!5e0!3m2!1sen!2sus!4v1775648332001!5m2!1sen!2sus"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
                {/* Success Icon */}
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enquiry Submitted!
                </h3>
                <p className="text-sm text-green-50">
                  We've received your request successfully
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Thank you{" "}
                    <strong className="text-green-700">
                      {form.name || "for reaching out"}
                    </strong>
                    ! Our team will contact you within <strong>24 hours</strong>{" "}
                    on{" "}
                    <strong className="text-green-700">{form.phone}</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>
                    You'll receive a confirmation message on WhatsApp shortly.
                    Check your spam folder if you don't see our email.
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ ERROR MODAL */}
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-shake">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-8 text-center">
                {/* Error Icon */}
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-sm text-red-50">
                  We couldn't submit your enquiry
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-slate-700">{errorMessage}</p>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>
                    Please try again or contact us directly at{" "}
                    <strong className="text-blue-600">6232908887</strong>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="flex-1 bg-slate-100 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-200 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowErrorModal(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all shadow-lg"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}