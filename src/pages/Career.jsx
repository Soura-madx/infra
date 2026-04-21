import Footer from "../component/footer";
import Navbar from "../component/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const primaryBlue = "#005596";
const primaryOrange = "#f58025";

const Career = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    // phone validation
    if (!/^[6-9]\d{9}$/.test(form.phone_number)) {
      alert("Phone must be 10 digits and start with 6-9");
      return false;
    }

    // email validation
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Invalid email format");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const payload = {
        name: form.full_name, // ✅ FIXED
        phone: form.phone_number, // ✅ FIXED
        email: form.email,
        city: form.city,
        description: form.description,
      };

      const response = await axios.post(
        "https://workiees.com/api/career-enquiries/add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Response:", response.data);

      setForm({
        full_name: "",
        phone_number: "",
        email: "",
        city: "",
        description: "",
      });

      if (response.data.success) {
        // ✅ RESET FORM

        alert("Enquiry submitted successfully ✅");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Backend Error:", error.response?.data);

      alert(
        error.response?.data?.message || "400 error - check required fields ❌",
      );
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* HERO */}

        <section className="relative w-full h-[600px] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('/assets/images/relation.jpg')`, // Replace with your specific image path
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0  bg-gradient-to-r from-gray-900 via-gray-600 to-#f58025t"></div>
          </div>

          {/* Content Container */}
          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <div className="flex flex-col items-start space-y-6">
              {/* RERA Badge */}
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-xs font-medium text-slate-700 uppercase ">
                  RERA Registered Real Estate Marketing Company
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-100 mb-4">
                Start Your Real Estate <br />
                Journey with{" "}
                <span className="text-orange-500">Prarambh Infra</span>
              </h1>

              {/* Subtext */}
              <p className="text-xs sm:text-base text-slate-100 max-w-xl mb-5">
                Prarambh Infra is a RERA-registered real estate marketing
                company based in Ujjain, helping families find legal plots and
                helping advisors build a stable, growing income in real estate.
              </p>

              {/* CTA and Metadata */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <Link to='/career#join' className="bg-[#005596] hover:bg-orange-600 transition-colors text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
                  Join as Advisor
                </Link>

                <div className="text-sm text-slate-100 border-l-2 border-orange-500 pl-4">
                  <p className="font-semibold uppercase">
                    RERA No: A-UJN-25-2120
                  </p>
                  <p className="text-slate-100 italic">
                    Established: 01 January 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVISOR OPPORTUNITY */}
        <section
          id="opportunity"
          className="py-14 border-b border-slate-200 bg-slate-50"
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  Become a Trusted{" "}
                  <span style={{ color: primaryOrange }}>Advisor</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
                  By joining Prarambh Infra as an advisor, you guide customers
                  in the biggest dream of their life – their own home – while
                  building your own income, identity and future.
                </p>
              </div>
              <a
                href="#join"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-medium text-white shadow-sm"
                style={{ background: primaryBlue }}
              >
                Apply to Join
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  What You Do
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  Help customers choose the right plot or project, explain
                  benefits, and support them throughout the buying process with
                  honesty and clarity.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Guide site visits and explain project features.</li>
                  <li>Coordinate with company team for documentation.</li>
                  <li>Build long-term trust with customers.</li>
                </ul>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  What You Gain
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>Attractive per sq.ft commission on every sale.</li>
                  <li>Team-building income through promotions.</li>
                  <li>Contests, rewards and recognition on big platforms.</li>
                  <li>Legacy benefits for your nominee.</li>
                  <li>
                    Flexible freelancer model for those who cannot attend daily.
                  </li>
                </ul>
              </div>

              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  Work Environment
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  Prarambh Infra offers continuous training, leadership support
                  and a positive culture where clean, transparent business is
                  the first priority.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Office and field support from senior leaders.</li>
                  <li>Regular meetings, training and awareness programs.</li>
                  <li>Clear rules to protect customers and advisors.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INCOME PLAN (SIMPLIFIED) */}
        <section id="plan" className="py-14 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                Advisor Income & Growth Plan
              </h2>
              <p className="text-sm sm:text-base text-slate-700 max-w-3xl">
                The Prarambh Infra plan is designed to reward both personal
                sales and team building. As you grow from Advisor to Director,
                your per sq.ft commission, difference income and recognition
                also grow.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Commission Structure (Example Overview)
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  Values below are simplified examples based on the plan in the
                  PDF. Always refer to the latest official plan shared by the
                  company.
                </p>
                <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-slate-700">
                          Cadre
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-slate-700">
                          Per Sq.Ft Commission
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-slate-700">
                          Difference Income*
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Advisor</td>
                        <td className="px-3 py-2">₹90</td>
                        <td className="px-3 py-2">–</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Supervisor</td>
                        <td className="px-3 py-2">₹100</td>
                        <td className="px-3 py-2">₹10</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Manager</td>
                        <td className="px-3 py-2">₹110</td>
                        <td className="px-3 py-2">₹20</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Sr. Manager</td>
                        <td className="px-3 py-2">₹120</td>
                        <td className="px-3 py-2">₹30</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Chief Manager</td>
                        <td className="px-3 py-2">₹130</td>
                        <td className="px-3 py-2">₹40</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2">Director</td>
                        <td className="px-3 py-2">₹140</td>
                        <td className="px-3 py-2">₹50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  *Difference income is earned on team sales as per company
                  rules.
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Power of One Concept
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  The plan explains how consistent effort with even one plot
                  sale per month (for example, 1000 sq.ft) can build a strong
                  monthly income over time. The idea is to focus on regular
                  activity and disciplined follow-up.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Focus on at least one customer every month.</li>
                  <li>
                    Use training, tools and team support provided by the
                    company.
                  </li>
                  <li>Build your own team to multiply your earnings.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHO CAN JOIN (WOMEN / SALARIED / RETIRED) */}
        <section
          id="segments"
          className="py-14 border-b border-slate-200 bg-slate-50"
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                Who Can Join Prarambh Infra?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 max-w-3xl">
                The advisor model is designed for homemakers, salaried
                professionals, business owners and retired individuals who want
                additional income, flexible work and a meaningful role in a
                high-impact industry like real estate.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Women */}
              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: primaryBlue }}
                >
                  Women / Homemakers
                </h3>
                <p className="text-sm text-slate-700 mb-2">
                  Prarambh Infra strongly promotes women empowerment. Many
                  women, especially homemakers, have already joined to build
                  their own identity and independent income.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Build financial independence and self-confidence.</li>
                  <li>
                    Flexible working hours along with family responsibilities.
                  </li>
                  <li>Earn rewards, respect and recognition.</li>
                </ul>
              </div>

              {/* Salaried / Professionals */}
              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: primaryBlue }}
                >
                  Salaried & Professionals
                </h3>
                <p className="text-sm text-slate-700 mb-2">
                  Working professionals can use real estate advisory to expand
                  their income and knowledge while still continuing their main
                  job.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Additional income on top of salary.</li>
                  <li>Be your own boss in your extra time.</li>
                  <li>Upgrade your skills in real estate & finance.</li>
                </ul>
              </div>

              {/* Retired */}
              <div className="rounded-md border border-slate-200 bg-white p-5">
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: primaryBlue }}
                >
                  Retired Individuals
                </h3>
                <p className="text-sm text-slate-700 mb-2">
                  Retired people can stay active, productive and financially
                  strong by using their experience and network in this business.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>Use your time in a meaningful, productive way.</li>
                  <li>Build regular income with minimal investment.</li>
                  <li>Inspire younger generations by your work.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT & TERMS (SHORT) */}
        <section className="py-14 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                  Support You Receive
                </h2>
                <p className="text-sm text-slate-700 mb-3">
                  Prarambh Infra provides strong project support, training and
                  leadership systems to help every advisor perform better.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>
                    Project brochures, 3D albums, presentations and videos.
                  </li>
                  <li>
                    Area maps, rate charts and on-ground site visit support.
                  </li>
                  <li>
                    Advisor kit on promotion and leadership academy programs.
                  </li>
                  <li>Office space for meetings and team trainings.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                  Key Terms & Clean Business
                </h2>
                <p className="text-sm text-slate-700 mb-3">
                  The company follows strict do&apos;s and don&apos;ts to
                  protect customers and maintain a clean, transparent business
                  environment.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>No cash collection from customers by advisors.</li>
                  <li>
                    No dummy business; commission is recovered in such cases.
                  </li>
                  <li>
                    No interference in other teams and no tobacco in office.
                  </li>
                  <li>
                    Office discipline is mandatory; misconduct can cancel
                    agency.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* JOIN FORM */}
        <section id="join" className="py-14 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="mb-6 md:text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                Join Prarambh Infra as an Advisor
              </h2>
              <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto">
                Basic eligibility includes minimum age 18 years, Indian
                citizenship and at least 10th class education. If you are a
                dreamer and want to be your own boss, share your details below.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                    placeholder="Enter your name"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                    placeholder="Enter your phone"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                    placeholder="Enter your email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                    placeholder="e.g. Ujjain / Indore"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tell us about yourself and why you want to join
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                  placeholder="Share a brief background and your goals."
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  style={{ background: primaryOrange }}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
                <p className="text-[11px] text-slate-500">
                  By submitting, you agree to be contacted by the Prarambh Infra
                  team for further discussion.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Career;
