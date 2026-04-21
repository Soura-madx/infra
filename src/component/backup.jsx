// ClientPortal.jsx
import React, { useState } from "react";
import Navbar from "../component/Navbar";

const TABS = [
  { id: "enquiry", label: "Enquiry", icon: "📩" },
  { id: "favourites", label: "Favourites", icon: "❤️" },
  { id: "booked", label: "Booked", icon: "📝" },
  { id: "my-properties", label: "My properties", icon: "🏠" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "help", label: "Help", icon: "❓" },
];

const badgeStatusClasses = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-yellow-100 text-amber-800",
  cancelled: "bg-red-100 text-red-700",
  "site visited": "bg-blue-100 text-blue-700",
 
};

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("enquiry");
  const [modalData, setModalData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openModal = (data) => setModalData(data);
  const closeModal = () => setModalData(null);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-slate-900">

      <Navbar/>
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200/60 px-4 md:px-6 py-2.5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              src="http://127.0.0.1:5500/assets/img/logo/logo1.png"
              alt="Prarambh Infra Logo"
              className="h-10 w-auto"
            />
            <div>
              <div className="text-sm font-bold tracking-[0.18em] uppercase text-[#005596]">
                PRARAMBH INFRA
              </div>
              <div className="text-[11px] tracking-[0.12em] uppercase text-[#f58025]">
                Client Property Portal
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3.5">
          {/* Mobile drawer button */}
          <button
            type="button"
            className="flex md:hidden items-center gap-1 px-3 py-1.5 rounded-md border border-slate-900/15 bg-slate-50 text-[12px]"
            onClick={() => setDrawerOpen((p) => !p)}
          >
            <span className="text-base">☰</span>
            <span>Menu</span>
          </button>

          <div className="flex items-center gap-3.5">
            <button
              type="button"
              className="w-9 h-9 rounded-md border border-slate-900/10 inline-flex items-center justify-center bg-white text-base"
              title="Notifications"
            >
              🔔
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-blue-100 flex items-center justify-center text-[#005596] font-semibold text-sm">
                RK
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[13px] font-semibold">Rakesh Kumar</span>
                <span className="text-[11px] text-slate-500">
                  Premium client
                </span>
              </div>
            </div>

            <button
              type="button"
              className="hidden md:inline-flex px-4 py-1.5 rounded-md border border-slate-900/15 bg-orange-50 text-[12px] font-semibold text-[#f58025]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet app drawer for tabs */}
      <div
        className={`md:hidden bg-white border-b border-slate-200/60 transition-[max-height,opacity] duration-200 overflow-hidden ${
          drawerOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-3 py-2">
          <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-2">
            Navigation
          </div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] transition ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-[#005596] font-semibold"
                    : "bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-[#005596]"
                }`}
              >
                <span className="text-[15px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-[25%_75%] flex-1 min-h-0">
        {/* Sidebar: only on md+ */}
        <aside className="hidden md:flex bg-white border-r border-slate-200/60 p-4.5 flex-col gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 mb-1.5">
              Navigation
            </div>
            <ul className="list-none space-y-1">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-[#005596] font-semibold"
                        : "text-slate-500 hover:bg-blue-50 hover:text-[#005596]"
                    }`}
                  >
                    <span className="w-5 text-center text-[15px]">
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed rounded-md bg-orange-50 px-3 py-2.5 border-l-4 border-[#f58025]">
            Your entire buying journey with Prarambh Infra – from enquiry and
            favourites to booking, payment and final handover – in one clear
            panel.
          </div>
        </aside>

        {/* Main content */}
        <main className="px-4 md:px-6 pt-4 md:pt-5 pb-5 md:pb-6 overflow-y-auto">
          <h1 className="text-[22px] font-bold text-[#005596] mb-1">
            Client panel
          </h1>
          <p className="text-[13px] text-slate-500 mb-5">
            Review your enquiries, favourites, bookings and completed properties
            in one place.
          </p>

          {/* ENQUIRY TAB */}
          {activeTab === "enquiry" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">
                    Enquiry properties
                  </h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-3.5">
                  Properties you have raised enquiries for, with quick actions
                  and detailed info in a popup.
                </p>

                <div className="flex flex-col gap-3">
                  <EnquiryCard
                    image="assets/img/properties/p1.jpg"
                    name="3 BHK Corner Unit"
                    project="DLF Skyview – Tower B"
                    id="PI-10234"
                    price="₹84,50,000"
                    size="1,650 Sq.ft"
                    address="Sector 82, Gurgaon, Haryana"
                    amenities="Club house, swimming pool, 2 covered parking, kids play area."
                    description="High-floor corner flat with park-facing view and modular kitchen."
                    category="Sale"
                    status="Confirmed"
                    brokerName="Amit Sharma"
                    brokerPhone="+91-98765 11223"
                    onViewDetails={openModal}
                  />

                  <EnquiryCard
                    image="assets/img/properties/p2.jpg"
                    name="2 BHK Compact"
                    project="Prarambh Heights – Tower A"
                    id="PI-20411"
                    price="₹56,90,000"
                    size="1,150 Sq.ft"
                    address="Sector 4, Narnaund, Haryana"
                    amenities="Lift, reserved parking, CCTV, power backup."
                    description="Ideal starter home, east-facing unit with balcony."
                    category="Sale"
                    status="Pending"
                    brokerName="Neha Kapoor"
                    brokerPhone="+91-98970 88991"
                    onViewDetails={openModal}
                  />

                  <EnquiryCard
                    image="assets/img/properties/p3.jpg"
                    name="Furnished Studio"
                    project="Lakeview Residency"
                    id="PI-30892"
                    price="₹24,000/month"
                    size="620 Sq.ft"
                    address="Near City Park, Hisar Road, Haryana"
                    amenities="Fully furnished, Wi‑Fi, housekeeping, covered parking."
                    description="Lake-facing studio, suitable for working professionals."
                    category="Rent"
                    status="Site visited"
                    brokerName="Vikas Rana"
                    brokerPhone="+91-98122 33445"
                    onViewDetails={openModal}
                  />
                </div>
              </div>
            </section>
          )}

          {/* FAVOURITES TAB */}
          {activeTab === "favourites" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">Favourites</h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-3.5">
                  Properties you have shortlisted. You can start an enquiry
                  anytime.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
                  <FavouriteCard
                    image="https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg"
                    name="3 BHK Corner Unit"
                    project="DLF Skyview – Tower B"
                    price="₹84,50,000 • 1,650 Sq.ft"
                    location="Sector 82, Gurgaon, Haryana"
                    category="Sale"
                  />
                  <FavouriteCard
                    image="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                    name="Garden Facing 2 BHK"
                    project="Prarambh Heights – Tower C"
                    price="₹62,20,000 • 1,280 Sq.ft"
                    location="Sector 5, Narnaund, Haryana"
                    category="Sale"
                  />
                  <FavouriteCard
                    image="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg"
                    name="Furnished Studio"
                    project="Lakeview Residency"
                    price="₹24,000/month • 620 Sq.ft"
                    location="Near City Park, Hisar Road, Haryana"
                    category="Rent"
                  />
                </div>
              </div>
            </section>
          )}

          {/* BOOKED TAB */}
          {activeTab === "booked" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">
                    Booked properties
                  </h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-3.5">
                  Properties where booking is done and token details or EMI plan
                  are defined.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg"
                    name="3 BHK Corner Unit"
                    project="DLF Skyview – Tower B"
                    badgeCategory="Sale"
                    lines={[
                      "Booking status: Token received",
                      "Token amount: ₹2,00,000 • Payment mode: Installment (EMI)",
                      "EMI plan: ₹78,000 x 96 months (8 years) to complete payment.",
                      "Next EMI due: 10 Feb 2026 • Bank: HDFC Home Loan.",
                    ]}
                    badges={[
                      { label: "Token received", type: "confirmed" },
                      { label: "EMI running", type: "pending" },
                    ]}
                  />

                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg"
                    name="2 BHK Compact"
                    project="Prarambh Heights – Tower A"
                    badgeCategory="Sale"
                    lines={[
                      "Booking status: Token received",
                      "Token amount: ₹1,00,000 • Payment mode: One time full amount",
                      "Final payment: ₹55,90,000 on registry date.",
                      "Registry tentative: 25 Mar 2026.",
                    ]}
                    badges={[
                      { label: "Token received", type: "confirmed" },
                      { label: "Full payment pending", type: "pending" },
                    ]}
                  />

                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/3656188/pexels-photo-3656188.jpeg"
                    name="Garden Facing 2 BHK"
                    project="Prarambh Heights – Tower C"
                    badgeCategory="Sale"
                    lines={[
                      "Booking status: Token not received",
                      "Token amount: — • Payment status: Not started",
                      "EMI / full payment mode will be decided at time of token.",
                    ]}
                    badges={[{ label: "Awaiting token", type: "pending" }]}
                  />
                </div>
              </div>
            </section>
          )}

          {/* MY PROPERTIES TAB */}
          {activeTab === "my-properties" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">My properties</h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-3.5">
                  Properties you have completely purchased with status marked as
                  complete.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3.5">
                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg"
                    name="3 BHK Corner Unit"
                    project="DLF Skyview – Tower B"
                    badgeCategory="Sale"
                    lines={[
                      "Final price: ₹82,00,000 • Size: 1,650 Sq.ft",
                      "Status: Complete • Handover done: 12 Dec 2025",
                      "Registry no: HR-2025-9-8823 • All payments cleared.",
                    ]}
                    badges={[{ label: "Complete", type: "confirmed" }]}
                    actionLink="Download registry & docs"
                  />

                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/3075453/pexels-photo-3075453.jpeg"
                    name="Furnished Studio"
                    project="Lakeview Residency"
                    badgeCategory="Rent"
                    lines={[
                      "Agreement: 11‑month lease • ₹24,000/month",
                      "Status: Complete • Agreement signed 01 Jan 2026",
                      "Security deposit: ₹48,000 • Next renewal: Dec 2026.",
                    ]}
                    badges={[{ label: "Active tenancy", type: "confirmed" }]}
                    actionLink="Download rent agreement"
                  />

                  <PropertySimpleCard
                    image="https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg"
                    name="2 BHK Compact"
                    project="Prarambh Heights – Tower A"
                    badgeCategory="Sale"
                    lines={[
                      "Final price: ₹55,90,000 • Size: 1,150 Sq.ft",
                      "Status: Complete • Handover done: 18 Nov 2025",
                      "Registry no: HR-2025-7-4411 • No outstanding dues.",
                    ]}
                    badges={[{ label: "Complete", type: "confirmed" }]}
                    actionLink="Download registry & docs"
                  />
                </div>
              </div>
            </section>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">
                    Profile &amp; account
                  </h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-4">
                  Keep your personal information and login details up to date so
                  Prarambh Infra can assist you smoothly.
                </p>

                <div className="grid grid-cols-[220px,minmax(0,1fr)] gap-4.5 max-md:grid-cols-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 text-[11px] text-[#005596] mb-2">
                      User account
                    </div>
                    <div className="w-[90px] h-[90px] rounded-md bg-blue-100 flex items-center justify-center text-[32px] text-[#005596] font-bold mb-2.5">
                      RK
                    </div>

                    <div className="text-[14px] font-semibold mb-0.5">
                      Rakesh Kumar
                    </div>
                    <div className="text-[12px] text-slate-500 mb-3">
                      Client ID: CLT-00921 • Joined Jan 2024
                    </div>

                    <div className="text-[12px] text-slate-500 mb-1">
                      Primary email:
                    </div>
                    <div className="text-[13px] mb-2">
                      rakesh.kumar@example.com
                    </div>

                    <div className="text-[12px] text-slate-500 mb-1">
                      Contact number:
                    </div>
                    <div className="text-[13px] mb-3">
                      +91-98765 43210
                    </div>

                    <div className="text-[11px] text-slate-500 border-t border-dashed border-slate-200 pt-2.5">
                      These details are shared with your assigned Prarambh Infra
                      broker for faster communication.
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h3 className="text-[14px] font-semibold mb-1.5">
                        Contact details
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-2.5">
                        Update how we should reach you for site visits, booking
                        updates and payment reminders.
                      </p>

                      <label
                        htmlFor="profile-name"
                        className="block text-[12px] font-semibold mb-1"
                      >
                        Full name
                      </label>
                      <input
                        id="profile-name"
                        type="text"
                        defaultValue="Rakesh Kumar"
                        className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                      />

                      <label
                        htmlFor="profile-email"
                        className="block text-[12px] font-semibold mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="profile-email"
                        type="email"
                        defaultValue="rakesh.kumar@example.com"
                        className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                      />

                      <label
                        htmlFor="profile-phone"
                        className="block text-[12px] font-semibold mb-1"
                      >
                        Phone
                      </label>
                      <input
                        id="profile-phone"
                        type="tel"
                        defaultValue="+91-98765 43210"
                        className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                      />

                      <label
                        htmlFor="profile-address"
                        className="block text-[12px] font-semibold mb-1"
                      >
                        Address
                      </label>
                      <textarea
                        id="profile-address"
                        defaultValue="House no. 112, Near Market, Narnaund, Haryana"
                        className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                      />

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label
                            htmlFor="profile-city"
                            className="block text-[12px] font-semibold mb-1"
                          >
                            City
                          </label>
                          <input
                            id="profile-city"
                            type="text"
                            defaultValue="Narnaund"
                            className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="profile-pincode"
                            className="block text-[12px] font-semibold mb-1"
                          >
                            Pincode
                          </label>
                          <input
                            id="profile-pincode"
                            type="text"
                            defaultValue="125039"
                            className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                          />
                        </div>
                      </div>

                      <div className="mt-1.5 flex gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] bg-gradient-to-br from-[#005596] to-[#013f6d] text-white"
                        >
                          Save profile
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-md border border-slate-900/15 bg-white text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    <hr className="my-4 border-t border-slate-200" />

                    <div>
                      <h3 className="text-[14px] font-semibold mb-1.5">
                        Login &amp; security
                      </h3>
                      <p className="text-[11px] text-slate-500 mb-2.5">
                        Use a strong password and avoid sharing your login with
                        others. For any suspicious activity, contact support
                        immediately.
                      </p>

                      <label
                        htmlFor="current-password"
                        className="block text-[12px] font-semibold mb-1"
                      >
                        Current password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                      />

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label
                            htmlFor="new-password"
                            className="block text-[12px] font-semibold mb-1"
                          >
                            New password
                          </label>
                          <input
                            id="new-password"
                            type="password"
                            placeholder="New password"
                            className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="confirm-password"
                            className="block text-[12px] font-semibold mb-1"
                          >
                            Confirm new password
                          </label>
                          <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            className="w-full px-2.5 py-2 rounded-md border border-slate-200 text-[13px] bg-slate-50 mb-2"
                          />
                        </div>
                      </div>

                      <div className="mt-1.5 flex gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] bg-gradient-to-br from-[#005596] to-[#013f6d] text-white"
                        >
                          Update password
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-md border border-slate-900/15 bg-white text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2">
                        Tip: Use at least 8 characters with a mix of letters,
                        numbers and symbols.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* HELP TAB */}
          {activeTab === "help" && (
            <section>
              <div className="bg-white rounded-[20px] shadow-[0_22px_60px_rgba(15,23,42,0.16)] p-5 mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-[15px] font-semibold">
                    Help &amp; support
                  </h2>
                </div>
                <p className="text-[12px] text-slate-500 mb-4">
                  Reach Prarambh Infra for any query related to site visits,
                  bookings, payments or documentation.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3 mb-4.5">
                  <div className="rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px]">
                    <div className="text-[11px] font-semibold text-slate-500 mb-1">
                      General support
                    </div>
                    <div className="text-[13px] mb-1">
                      +91-98765 11122
                    </div>
                    <div className="text-[12px] text-slate-500">
                      For questions about your client portal, profile and basic
                      property queries.
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-orange-50 px-3 py-2.5 text-[12px]">
                    <div className="text-[11px] font-semibold text-[#f58025] mb-1">
                      Booking &amp; payments
                    </div>
                    <div className="text-[13px] mb-0.5">
                      +91-98111 44332
                    </div>
                    <div className="text-[12px] mb-0.5">
                      booking@prarambhinfra.com
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Use for token, registry date, EMI plan or refund related
                      discussions.
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-blue-50 px-3 py-2.5 text-[12px]">
                    <div className="text-[11px] font-semibold text-[#005596] mb-1">
                      Email support
                    </div>
                    <div className="text-[13px] mb-0.5">
                      support@prarambhinfra.com
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Share screenshots or documents and the team will reply
                      within 24 hours.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] gap-4 items-start max-md:grid-cols-1">
                  <div>
                    <h3 className="text-[14px] font-semibold mb-1.5">
                      Head office
                    </h3>
                    <p className="text-[13px] mb-1">
                      Prarambh Infra, SCO‑21, Main Market, Narnaund, Haryana –
                      125039
                    </p>
                    <p className="text-[12px] text-slate-500 mb-1">
                      Landmark: Near main bus stand and city market.
                    </p>
                    <p className="text-[12px] text-slate-500">
                      You can visit the office for agreement signing, registry
                      coordination or detailed project presentations.
                    </p>
                  </div>

                  <div className="rounded-[14px] border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-[12px]">
                    <div className="text-[11px] font-semibold text-slate-500 mb-1">
                      Support hours
                    </div>
                    <div className="text-[13px] mb-0.5">
                      Monday – Saturday
                    </div>
                    <div className="text-[12px] mb-1">
                      10:00 AM to 7:00 PM (IST)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      For urgent issues outside these hours, drop an email with
                      subject <strong>URGENT</strong> and the team will
                      prioritise it next morning.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50">
          <div className="w-[min(680px,92vw)] bg-white rounded-[18px] shadow-[0_24px_70px_rgba(15,23,42,0.45)] overflow-hidden">
            <div className="px-4.5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[15px] font-semibold">
                  {modalData.name}
                </div>
                <div className="text-[12px] text-slate-500">
                  Project: {modalData.project}
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-7.5 h-7.5 rounded-md border border-slate-200 bg-slate-50 text-base"
              >
                ×
              </button>
            </div>
            <div className="px-4.5 py-3.5 text-[13px]">
              <div className="grid grid-cols-[2fr,1fr] gap-4 max-md:grid-cols-1">
                <div>
                  <div className="text-[12px] font-semibold mb-1.5">
                    Property details
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    ID
                  </div>
                  <div className="text-[13px] mb-1.5">{modalData.id}</div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Price &amp; size
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.price} • {modalData.size}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Address
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.address}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Description
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.description}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Amenities
                  </div>
                  <div className="text-[13px]">
                    {modalData.amenities}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold mb-1.5">
                    Status &amp; broker
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Category
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.category}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Current status
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.status}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Broker
                  </div>
                  <div className="text-[13px] mb-1.5">
                    {modalData.brokerName}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-500">
                    Broker contact
                  </div>
                  <div className="text-[13px]">
                    {modalData.brokerPhone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Sub components --- */

const EnquiryCard = ({
  image,
  name,
  project,
  id,
  price,
  size,
  address,
  amenities,
  description,
  category,
  status,
  brokerName,
  brokerPhone,
  onViewDetails,
}) => {
  const statusKey = status.toLowerCase();
  return (
    <div className="flex flex-col md:flex-row items-stretch rounded-[16px] border border-slate-200 bg-slate-50 overflow-hidden">
      <div
        className="w-full md:w-[210px] md:min-w-[210px] md:max-h-[140px] h-[140px] bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="flex-1 px-3 py-2.5 text-[12px]">
        <div className="flex items-start justify-between mb-0.5">
          <div>
            <div className="font-semibold text-[13px]">{name}</div>
            <div className="text-[11px] text-slate-500">
              Project: {project}
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-blue-100 text-[#005596]">
            {category}
          </span>
        </div>

        <div className="text-[11px] text-slate-900 mb-0.5">
          ID: {id} • {price} • {size}
        </div>
        <div className="text-[11px] text-slate-500 mb-0.5">
          {address}
        </div>
        <div className="text-[11px] text-slate-500 mb-1">
          Amenities: {amenities}
        </div>
        <div className="text-[11px] text-slate-500 mb-1.5">
          Description: {description}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-2.5 py-1 rounded-md text-[11px] bg-blue-100 text-[#005596] font-semibold"
            >
              Ask for site visit
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded-md text-[11px] border border-red-300 bg-red-50 text-red-700"
            >
              Remove
            </button>
            <a
              href="#"
              className="text-[11px] text-[#f58025] font-semibold"
            >
              Download brochure ▾
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.08em] ${
                badgeStatusClasses[statusKey] || "bg-slate-100 text-slate-700"
              }`}
            >
              {status}
            </span>
            <button
              type="button"
              onClick={() =>
                onViewDetails({
                  image,
                  name,
                  project,
                  id,
                  price,
                  size,
                  address,
                  amenities,
                  description,
                  category,
                  status,
                  brokerName,
                  brokerPhone,
                })
              }
              className="px-2.5 py-1 rounded-md text-[11px] bg-gradient-to-br from-[#005596] to-[#013f6d] text-white"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavouriteCard = ({
  image,
  name,
  project,
  price,
  location,
  category,
}) => (
  <div className="rounded-[16px] border border-slate-200 bg-slate-50 overflow-hidden flex flex-col">
    <div
      className="w-full h-[140px] bg-cover bg-center"
      style={{ backgroundImage: `url('${image}')` }}
    />
    <div className="px-3 py-2.5 text-[12px]">
      <div className="flex items-start justify-between mb-0.5">
        <div>
          <div className="font-semibold text-[13px]">{name}</div>
          <div className="text-[11px] text-slate-500">{project}</div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-blue-100 text-[#005596]">
          {category}
        </span>
      </div>
      <div className="text-[11px] text-slate-900 mb-0.5">{price}</div>
      <div className="text-[11px] text-slate-500 mb-1.5">
        {location}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <button
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] bg-gradient-to-br from-[#005596] to-[#013f6d] text-white"
        >
          Add an enquiry
        </button>
        <a href="#" className="text-[11px] text-[#f58025] font-semibold">
          Brochure
        </a>
      </div>
    </div>
  </div>
);

const PropertySimpleCard = ({
  image,
  name,
  project,
  badgeCategory,
  lines,
  badges,
  actionLink,
}) => (
  <div className="rounded-[16px] border border-slate-200 bg-slate-50 overflow-hidden flex flex-col">
    <div
      className="w-full h-[140px] bg-cover bg-center"
      style={{ backgroundImage: `url('${image}')` }}
    />
    
    <div className="px-3 py-2.5 text-[12px]">
      <div className="flex items-start justify-between mb-0.5">
        <div>
          <div className="font-semibold text-[13px]">{name}</div>
          <div className="text-[11px] text-slate-500">{project}</div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] bg-blue-100 text-[#005596]">
          {badgeCategory}
        </span>
      </div>

      {lines.map((line, idx) => (
        <div
          key={idx}
          className="text-[11px] text-slate-500 mb-0.5"
        >
          {line}
        </div>
      ))}

      <div className="flex items-center justify-between mt-1.5">
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => {
            const cls =
              badgeStatusClasses[b.type] || "bg-slate-100 text-slate-700";
            return (
              <span
                key={b.label}
                className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.08em] ${cls}`}
              >
                {b.label}
              </span>
            );
          })}
        </div>
        <div>
          
        </div>
        {actionLink && (
          <a
            href="#"
            className="text-[11px] text-[#f58025] font-semibold"
          >
            {actionLink}
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ClientPortal;
