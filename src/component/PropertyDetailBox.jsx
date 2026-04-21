import React, { useState, useEffect, useRef } from "react";
import { Home, Sun, TreePine, CreditCard, Send } from "lucide-react";
import axios from "axios";
import ThankYouModal from "./Thanks";

const PropertyPage = ({ property }) => {
  const [activeNav, setActiveNav] = useState("about");
  const navRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_number: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitInterest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        client_name: formData.client_name,
        client_number: formData.client_number,
        description: formData.description,
        source: "website", // static
      };

      const res = await axios.post(
        "https://workiees.com/api/leads/interested",
        payload,
      );

      const result = Array.isArray(res.data) ? res.data[0] : res.data;

      if (result.status) {
        setShowThankYou(true);
        setFormData({ client_name: "", client_number: "", description: "" });
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("API Error!");
    } finally {
      setLoading(false);
    }
  };
  const handleSeeSimilar = () => {
    setShowThankYou(false);
    window.location.href = "/property";
  };

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!2m3...[long string]..."
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>;

  const sections = [
    { id: "about", label: "About" },
    { id: "map", label: "See on Map" },

    { id: "surroundings", label: "Surrounding Aminities" },
  ];

  useEffect(() => {
    const activeElement = document.getElementById(`nav-${activeNav}`);
    if (activeElement && navRef.current) {
      const navWidth = navRef.current.offsetWidth;
      const elementOffset = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;
      navRef.current.scrollTo({
        left: elementOffset - navWidth / 2 + elementWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeNav]);

  if (!property) return <p className="text-center mt-10">Loading...</p>;

  // 🔥 Dynamic values mapping
  const price = property.price || 0;
  const area = property.area || property.plot_area || 0;
  const city = property.city || "N/A";
  const title =
    property.title ||
    `${property.type || "Property"} for Sale in ${property.plotNo}, ${property.towerName} ${property.projectAddress || ""}`;

  return (
    <div className="bg-[#e9ebf2] min-h-screen font-sans text-slate-900 pb-20">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div
          ref={navRef}
          className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar whitespace-nowrap px-6 py-4 gap-8"
        >
          {sections.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => {
                setActiveNav(item.id);
                const sectionEl = document.getElementById(item.id);
                if (sectionEl) {
                  const y =
                    sectionEl.getBoundingClientRect().top +
                    window.scrollY -
                    100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className={`text-sm font-semibold border-b-2 ${
                activeNav === item.id
                  ? "text-[#034A91] border-[#034A91]"
                  : "text-slate-400 border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto md:px-6 mt-8 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 border-r border-slate-200">
          {/* HEADER */}
          <div className="bg-white px-2 md:px-8 py-6 border-b border-slate-200">
            <h2 className="text-slate-400 text-xs font-bold uppercase mb-2">
              {property.projectName || "Project"}
            </h2>

            <h1 className="text-xs md:text-xl font-bold text-[#034A91] mb-6">
              {title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-6 border-y border-slate-200">
              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Price/Sqft</p>
                <p className="font-bold text-lg">₹ {price}</p>
              </div>

              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Plot Area</p>
                <p className="font-bold text-lg">{area} sq.ft</p>
              </div>

              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Facing</p>
                <p className="font-bold text-lg">{property.facing || "N/A"}</p>
              </div>

              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Location</p>
                <p className="font-bold text-lg">{property.location}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Plot No.</p>
                <p className="font-bold text-lg">{property.plotNo}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Price In Value</p>
                <p className="font-bold text-lg"> ₹ {property.totalPrice}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">Plot Dimenstion</p>
                <p className="font-bold text-lg">{property.dimension}</p>
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-slate-400">City</p>
                <p className="font-bold text-lg">{property.city}</p>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <section id="about" className="bg-white px-2 md:px-8 py-6">
            <h3 className="text-lg font-bold mb-4">About This Project</h3>
            <p className="text-sm text-slate-600">
              {property.description ||
                "No description available for this property."}
            </p>
          </section>

          {/* MAP */}
          {/* MAP */}
          <section id="map" className="bg-white px-2 md:px-8 py-6">
            <h3 className="text-lg font-bold mb-4">See on Map</h3>

            {property.projectAddress ? (
              <iframe
                title="Property location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.projectAddress,
                )}&z=15&output=embed`}
                className="w-full h-64"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <p className="text-sm text-slate-500">
                Map not available. Address missing for this property.
              </p>
            )}
          </section>

          {/* AMENITIES */}
          <section id="surroundings" className="bg-white px-2 md:px-8 py-6">
            <h3 className="text-lg font-bold mb-4">Surrounding Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {(property.amenities && property.amenities.length
                ? property.amenities
                : ["No Data"]
              ).map((a) => (
                <div key={a} className="text-sm bg-slate-100 p-2 rounded">
                  {a}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 border shadow">
            <h3 className="text-lg font-bold mb-6">
              Interested in this Property?
            </h3>

            <form onSubmit={handleSubmitInterest} className="space-y-4">
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border rounded"
                required
              />

              <input
                type="tel"
                name="client_number"
                value={formData.client_number}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 border rounded"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Message"
                className="w-full p-3 border rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#f58025] text-white py-3 flex justify-center items-center gap-2 rounded transition
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#e06f15]"}`}
              >
                {loading && (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                <span>{loading ? "Submitting..." : "Submit Interest"}</span>
                {!loading && <Send size={16} />}
              </button>
            </form>

            <ThankYouModal
              isOpen={showThankYou}
              onClose={() => setShowThankYou(false)}
              onSeeSimilar={handleSeeSimilar}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyPage;
