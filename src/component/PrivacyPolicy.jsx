import React from "react";
import Navbar from "./Navbar";
import Footer from "./footer";

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-black text-white px-8 py-10 text-center">
          <img
            src="/assets/logo.png"
            alt="Prarambh Infra"
            className="mx-auto w-40 h-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm md:text-base text-blue-100">
            Effective Date: April 29, 2026
          </p>
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-10 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <p className="text-base">
              Welcome to{" "}
              <span className="font-semibold text-blue-800">
                Prarambh Infra
              </span>
              . Your privacy is important to us. This Privacy Policy explains
              how we collect, use, protect, and manage your personal information
              when you visit our website, use our services, or contact us
              regarding property buying, selling, renting, or real estate
              marketing solutions.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>City / Location</li>
              <li>Property Preferences</li>
              <li>Budget Details</li>
              <li>Property Ownership Information</li>
              <li>Business / Agency Details (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide property consultation services</li>
              <li>To help buyers and sellers connect</li>
              <li>To manage rental, resale, and new property inquiries</li>
              <li>To improve our website and customer experience</li>
              <li>
                To send property updates, offers, and promotional communication
              </li>
              <li>To respond to your inquiries and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell your personal information. However, we may share
              your information with:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Property Owners</li>
              <li>Builders and Developers</li>
              <li>Verified Real Estate Agents</li>
              <li>Legal Verification Teams</li>
              <li>Banking / Loan Assistance Partners</li>
              <li>Government Authorities when legally required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              4. Cookies Policy
            </h2>
            <p>
              Our website may use cookies to improve user experience and website
              performance. Cookies help us understand visitor behavior, improve
              functionality, personalize experience, and track marketing
              performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              5. Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your personal
              data from unauthorized access, misuse, disclosure, or loss.
              However, no online system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              6. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of incorrect data</li>
              <li>Request deletion of your information</li>
              <li>Withdraw marketing communication consent</li>
              <li>Request clarification regarding data usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              7. Contact Us
            </h2>
            <div className="bg-slate-100 rounded-xl p-5 border border-slate-200">
              <p className="font-semibold text-blue-900 text-lg">
                Prarambh Infra
              </p>
              <p className="mt-2">📞 Phone: +91 98765 11122</p>
              <p>📧 Email: infoprarambhinfra@gmail.com</p>
              <p className="mt-3 text-sm text-slate-600">
                We are committed to protecting your privacy and building trust
                through transparent real estate services.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
