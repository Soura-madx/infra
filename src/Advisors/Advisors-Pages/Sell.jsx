import React, { useMemo, useState } from "react";
import {
  MessageCircle,
  UserPlus,
  Search,
  Clock,
  Info,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  FileText,
  Building2,
  UserCheck,
  PhoneCall,
  PhoneOff,
  RefreshCcw,
  Upload,
  Star,
  Send,
  BadgeCheck,
} from "lucide-react";
import { useSales } from "../../Context/SalesContext";

const SalesPipeline = () => {
  const [activeTab, setActiveTab] = useState("Suspecting");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { leads, setLeads, updateLead, moveLeadToSiteVisit } = useSales();

  const tabs = ["Suspecting", "Prospecting", "Site Visit", "Booking", "Dead Lead"];

  const handleAddLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newLead = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      source: "Generated",
      attempts: 0,
      visitAttempts: 0,
      status: "Suspecting",
      previousStatus: "",
      createdAt: new Date().toISOString().split("T")[0],
      lastNote: "",
      linkedUnit: null,
      followUpDate: "",
      visitDate: "",
      visitReminder: "",
      meetingPoint: "",
      age: "",
      category: "",
      occupation: "",
      currentAddress: "",
      ownHouse: "",
      annualIncome: "",
      isKeyDecisionMaker: false,
      leadPotential: "",
      notesHistory: [],
      responseHistory: [],
      qualification: {},
      siteVisit: {
        scheduled: false,
        visitDate: "",
        visitTime: "",
        meetingPoint: "",
        meetupAddress: "",
        meetupPerson: "",
        meetupContact: "",
        reminderAt: "",
        specialInstructions: "",
        status: "",
      },
      siteVisitResponse: "",
      isPriorityLead: false,
      siteVisitPhotos: [],
      deadLeadReason: "",
      deadLeadNote: "",
      deadLeadAt: "",
      booking: {
        aadhaarNumber: "",
        aadhaarPhoto: null,
        panNumber: "",
        panPhoto: null,
        clientEmail: "",
        bookingAmount: "",
        sentToManager: false,
        sentToManagerAt: "",
        bookingStatus: "Docs Pending",
        notes: "",
      },
    };

    setLeads((prev) => [...prev, newLead]);
    setShowAddForm(false);
  };

  const addHistoryItem = (leadId, field, item) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, [field]: [...(lead[field] || []), item] }
          : lead
      )
    );
  };

  const handleNotConnected = ({ leadId, reason, reminderAt, note }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        return {
          ...lead,
          attempts: (lead.attempts || 0) + 1,
          followUpDate: reminderAt || lead.followUpDate,
          lastNote: note || reason,
          responseHistory: [
            ...(lead.responseHistory || []),
            {
              id: Date.now(),
              type: "Not Connected",
              reason,
              note: note || "",
              reminderAt: reminderAt || "",
              createdAt: new Date().toLocaleString(),
            },
          ],
        };
      })
    );
  };

  const handleNotInterested = ({ leadId, reason, note }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        return {
          ...lead,
          previousStatus: lead.status,
          attempts: (lead.attempts || 0) + 1,
          status: "Dead Lead",
          deadLeadReason: reason,
          deadLeadNote: note || "",
          deadLeadAt: new Date().toLocaleString(),
          lastNote: note || reason,
          responseHistory: [
            ...(lead.responseHistory || []),
            {
              id: Date.now(),
              type: "Not Interested",
              reason,
              note: note || "",
              createdAt: new Date().toLocaleString(),
            },
          ],
        };
      })
    );
    setSelectedLead(null);
  };

  const handleSaveProspectingNote = (leadId, noteText) => {
    if (!noteText.trim()) return;
    addHistoryItem(leadId, "notesHistory", {
      id: Date.now(),
      text: noteText,
      createdAt: new Date().toLocaleString(),
      createdBy: "Advisor",
    });
    updateLead(leadId, { lastNote: noteText });
  };

  const handleProspectingAttempt = ({
    leadId,
    outcome,
    reason,
    followUpDate,
    note,
  }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;

        return {
          ...lead,
          attempts: (lead.attempts || 0) + 1,
          followUpDate: followUpDate || lead.followUpDate || "",
          lastNote: note || reason || outcome,
          responseHistory: [
            ...(lead.responseHistory || []),
            {
              id: Date.now(),
              type: "Prospecting Attempt",
              outcome,
              reason: reason || "",
              note: note || "",
              followUpDate: followUpDate || "",
              createdAt: new Date().toLocaleString(),
            },
          ],
        };
      })
    );
  };

  const handleProspectingDeadLead = ({ leadId, reason, note }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;

        return {
          ...lead,
          previousStatus: lead.status,
          status: "Dead Lead",
          deadLeadReason: reason,
          deadLeadNote: note || "",
          deadLeadAt: new Date().toLocaleString(),
          lastNote: note || reason,
          responseHistory: [
            ...(lead.responseHistory || []),
            {
              id: Date.now(),
              type: "Dead Lead",
              reason,
              note: note || "",
              createdAt: new Date().toLocaleString(),
            },
          ],
        };
      })
    );
    setSelectedLead(null);
  };

  const handleScheduleSiteVisit = ({
    leadId,
    unit,
    visitDate,
    meetingPoint,
    note,
    qualification,
  }) => {
    if (moveLeadToSiteVisit) {
      moveLeadToSiteVisit({
        leadId,
        unit,
        visitDate,
        meetingPoint,
        note,
        qualification,
      });
    } else {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                status: "Site Visit",
                linkedUnit: unit || lead.linkedUnit,
                visitDate,
                meetingPoint,
                qualification: qualification || {},
                siteVisit: {
                  ...lead.siteVisit,
                  scheduled: true,
                  visitDate,
                  meetingPoint,
                  status: "Scheduled",
                },
              }
            : lead
        )
      );
    }

    if (note?.trim()) {
      addHistoryItem(leadId, "notesHistory", {
        id: Date.now(),
        text: note,
        createdAt: new Date().toLocaleString(),
        createdBy: "Advisor",
      });
    }
  };

  const handleSiteVisitUpdate = (leadId, updates, note) => {
    updateLead?.(leadId, updates);
    if (!updateLead) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead))
      );
    }

    if (note?.trim()) {
      addHistoryItem(leadId, "notesHistory", {
        id: Date.now(),
        text: note,
        createdAt: new Date().toLocaleString(),
        createdBy: "Advisor",
      });
    }
  };

  const handleProceedToBooking = (leadId, note = "") => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              status: "Booking",
              siteVisitResponse: "Liked",
              booking: {
                ...lead.booking,
                bookingStatus: lead.booking?.bookingStatus || "Docs Pending",
              },
              lastNote: note || lead.lastNote,
            }
          : lead
      )
    );

    if (note?.trim()) {
      addHistoryItem(leadId, "notesHistory", {
        id: Date.now(),
        text: `Moved to Booking: ${note}`,
        createdAt: new Date().toLocaleString(),
        createdBy: "Advisor",
      });
    }
  };

  const handleMoveToDeadLead = (leadId, reason, note) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              previousStatus: lead.status,
              status: "Dead Lead",
              deadLeadReason: reason,
              deadLeadNote: note || "",
              deadLeadAt: new Date().toLocaleString(),
              lastNote: note || reason,
            }
          : lead
      )
    );
    setSelectedLead(null);
  };

  const handleBookingUpdate = (leadId, bookingUpdates, note) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              booking: {
                ...lead.booking,
                ...bookingUpdates,
              },
              lastNote: note || lead.lastNote,
            }
          : lead
      )
    );

    if (note?.trim()) {
      addHistoryItem(leadId, "notesHistory", {
        id: Date.now(),
        text: note,
        createdAt: new Date().toLocaleString(),
        createdBy: "Advisor",
      });
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (l) =>
        l.status === activeTab &&
        (l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.phone?.includes(searchQuery))
    );
  }, [leads, activeTab, searchQuery]);

  if (selectedLead) {
    const freshLead = leads.find((l) => l.id === selectedLead.id) || selectedLead;

    if (freshLead.status === "Suspecting") {
      return (
        <SuspectingLeadDetails
          lead={freshLead}
          onBack={() => setSelectedLead(null)}
          onNotConnected={handleNotConnected}
          onNotInterested={handleNotInterested}
        />
      );
    }

    if (freshLead.status === "Prospecting") {
      return (
        <ProspectingLeadDetails
          lead={freshLead}
          onBack={() => setSelectedLead(null)}
          onSaveNote={handleSaveProspectingNote}
          onMoveToSiteVisit={handleScheduleSiteVisit}
          onAddAttempt={handleProspectingAttempt}
          onDeadLead={handleProspectingDeadLead}
        />
      );
    }

    if (freshLead.status === "Site Visit") {
      return (
        <SiteVisitLeadDetails
          lead={freshLead}
          onBack={() => setSelectedLead(null)}
          onUpdateVisit={handleSiteVisitUpdate}
          onProceedToBooking={handleProceedToBooking}
          onMoveToDeadLead={handleMoveToDeadLead}
        />
      );
    }

    if (freshLead.status === "Booking") {
      return (
        <BookingLeadDetails
          lead={freshLead}
          onBack={() => setSelectedLead(null)}
          onUpdateBooking={handleBookingUpdate}
          onMoveToDeadLead={handleMoveToDeadLead}
        />
      );
    }

    if (freshLead.status === "Dead Lead") {
      return <DeadLeadDetails lead={freshLead} onBack={() => setSelectedLead(null)} />;
    }

    return <DefaultLeadDetails lead={freshLead} onBack={() => setSelectedLead(null)} />;
  }

  return (
    <div
      className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
            Sell Tab
          </h1>
          <p className="text-sm text-gray-400 font-bold">
            Manage your sales funnel and lead attempts
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-[#005596] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95"
        >
          <UserPlus size={20} /> CREATE CLIENT
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-black transition-all border-b-4 whitespace-nowrap ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab.toUpperCase()}
            <span className="ml-2 bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px]">
              {leads.filter((l) => l.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-4 mb-8">
        <div className="relative flex-1 min-w-[300px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-lg font-black text-gray-800">{lead.name}</h3>
                <p className="text-sm text-gray-500 font-bold mt-1">{lead.phone}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="text-[10px] font-black text-blue-500 uppercase bg-blue-50 px-2 py-0.5 rounded inline-block">
                    Source: {lead.source}
                  </p>
                  {lead.isPriorityLead && (
                    <span className="text-[10px] font-black text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded inline-flex items-center gap-1">
                      <Star size={10} /> Priority
                    </span>
                  )}
                </div>
              </div>
              <a
                href={`https://wa.me/${lead.phone}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            {lead.linkedUnit && (
              <div className="mb-4 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-400 uppercase">Linked Unit</p>
                <p className="text-sm font-black text-blue-900">
                  {lead.linkedUnit.unitNo || `U-${lead.linkedUnit.id}`} •{" "}
                  {lead.linkedUnit.bhk} • {lead.linkedUnit.displayPrice}
                </p>
                <p className="text-[11px] font-bold text-blue-700 mt-1">
                  {lead.linkedUnit.type} • {lead.linkedUnit.facing} Facing
                </p>
              </div>
            )}

            {(lead.followUpDate || lead.visitDate) && (
              <div className="mb-4 text-xs font-bold text-gray-600 space-y-1">
                {lead.followUpDate && <p>Follow-up: {lead.followUpDate}</p>}
                {lead.visitDate && <p>Visit: {lead.visitDate}</p>}
                {lead.meetingPoint && <p>Meeting: {lead.meetingPoint}</p>}
              </div>
            )}

            {lead.status === "Dead Lead" && (
              <div className="mb-4 p-3 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-[10px] font-black text-red-500 uppercase">Dead Lead Reason</p>
                <p className="text-sm font-black text-red-800">
                  {lead.deadLeadReason || "-"}
                </p>
              </div>
            )}

            {lead.status === "Booking" && (
              <div className="mb-4 p-3 bg-green-50 rounded-2xl border border-green-100">
                <p className="text-[10px] font-black text-green-500 uppercase">Booking Status</p>
                <p className="text-sm font-black text-green-800">
                  {lead.booking?.bookingStatus || "Docs Pending"}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock
                  size={14}
                  className={lead.attempts >= 4 ? "text-red-500" : "text-gray-400"}
                />
                <span
                  className={`text-xs font-black ${
                    lead.attempts >= 4 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  Attempts: {lead.attempts || 0}/5
                </span>
              </div>
              <button
                onClick={() => setSelectedLead(lead)}
                className="text-[10px] font-black text-gray-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest"
              >
                Details <Info size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">No leads found in {activeTab} tab.</p>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <form
            onSubmit={handleAddLead}
            className="bg-white w-full max-w-md p-8 rounded-[32px] space-y-5 shadow-2xl"
          >
            <h2 className="text-2xl font-black text-gray-800">New Client Entry</h2>
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Client Full Name"
                required
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-4 text-gray-400 font-black uppercase text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200"
              >
                GENERATE LEAD
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const SuspectingLeadDetails = ({ lead, onBack, onNotConnected, onNotInterested }) => {
  const [responseMode, setResponseMode] = useState(null);
  const [followUpForm, setFollowUpForm] = useState({
    reason: "",
    reminderAt: "",
    note: "",
  });
  const [deadLeadForm, setDeadLeadForm] = useState({
    reason: "Already Bought",
    note: "",
  });

  const handleFollowUpSubmit = () => {
    if (!followUpForm.reason || !followUpForm.reminderAt) {
      alert("Please select reason and set reminder.");
      return;
    }

    onNotConnected({
      leadId: lead.id,
      reason: followUpForm.reason,
      reminderAt: followUpForm.reminderAt,
      note: followUpForm.note,
    });

    setFollowUpForm({ reason: "", reminderAt: "", note: "" });
    setResponseMode(null);
  };

  const handleDeadLeadSubmit = () => {
    onNotInterested({
      leadId: lead.id,
      reason: deadLeadForm.reason,
      note: deadLeadForm.note,
    });

    setDeadLeadForm({ reason: "Already Bought", note: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8 hover:text-black transition-all"
      >
        <ArrowLeft size={16} /> BACK TO PIPELINE
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 text-center">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-[24px] flex items-center justify-center text-3xl font-black mx-auto mb-4">
              {lead.name?.charAt(0) || "C"}
            </div>
            <h2 className="text-2xl font-black text-gray-800">{lead.name}</h2>
            <p className="text-blue-600 font-bold">{lead.phone}</p>
            <p className="text-sm text-gray-500 font-bold mt-2">Source: {lead.source}</p>
            <p className="text-sm text-gray-500 font-bold">Created: {lead.createdAt}</p>
          </div>

          <InfoCard
            icon={<AlertCircle size={16} className="text-blue-400" />}
            title="Communication Score"
          >
            <p className="text-sm font-bold text-blue-900">Attempt {lead.attempts || 0} of 5</p>
          </InfoCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">
            Log Interaction
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              active={responseMode === "not-connected"}
              onClick={() => setResponseMode("not-connected")}
              icon={<Clock className="text-orange-500" size={32} />}
              label="NOT CONNECTED"
              activeBorder="border-orange-500 bg-orange-50"
              border="hover:border-orange-200"
            />

            <ActionButton
              active={responseMode === "not-interested"}
              onClick={() => setResponseMode("not-interested")}
              icon={<XCircle className="text-red-500" size={32} />}
              label="NOT INTERESTED"
              activeBorder="border-red-500 bg-red-50"
              border="hover:border-red-200"
            />
          </div>

          {responseMode === "not-connected" && (
            <div className="bg-white p-8 rounded-[32px] border-2 border-orange-100 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Switch Off", "Busy", "Not Answered", "Call Later", "Network Issue"].map(
                  (r) => (
                    <button
                      key={r}
                      onClick={() => setFollowUpForm((prev) => ({ ...prev, reason: r }))}
                      className={`p-3 rounded-xl text-[11px] font-bold transition-all ${
                        followUpForm.reason === r
                          ? "bg-orange-500 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-orange-100"
                      }`}
                    >
                      {r}
                    </button>
                  )
                )}
              </div>

              <input
                type="datetime-local"
                value={followUpForm.reminderAt}
                onChange={(e) =>
                  setFollowUpForm((prev) => ({ ...prev, reminderAt: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <textarea
                value={followUpForm.note}
                onChange={(e) =>
                  setFollowUpForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Write note..."
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
              />

              <button
                onClick={handleFollowUpSubmit}
                className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black"
              >
                SAVE FOLLOW-UP
              </button>
            </div>
          )}

          {responseMode === "not-interested" && (
            <div className="bg-white p-8 rounded-[32px] border-2 border-red-100 space-y-6">
              <select
                value={deadLeadForm.reason}
                onChange={(e) =>
                  setDeadLeadForm((prev) => ({ ...prev, reason: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              >
                <option>Already Bought</option>
                <option>Just Browsing</option>
                <option>Budget Issue</option>
                <option>Location Issue</option>
                <option>Loan Issue</option>
                <option>Others</option>
              </select>

              <textarea
                value={deadLeadForm.note}
                onChange={(e) =>
                  setDeadLeadForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Write additional note..."
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
              />

              <button
                onClick={handleDeadLeadSubmit}
                className="w-full py-4 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3"
              >
                <CheckCircle size={20} /> CONFIRM DEAD LEAD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProspectingLeadDetails = ({
  lead,
  onBack,
  onSaveNote,
  onMoveToSiteVisit,
  onAddAttempt,
  onDeadLead,
}) => {
  const [noteText, setNoteText] = useState("");
  const [attemptForm, setAttemptForm] = useState({
    outcome: "Not Connected",
    reason: "",
    followUpDate: "",
    note: "",
  });
  const [visitForm, setVisitForm] = useState({
    visitDate: "",
    meetingPoint: "",
    note: "",
  });
  const [deadLeadForm, setDeadLeadForm] = useState({
    reason: "Budget Issue",
    note: "",
  });

  const unit = lead.linkedUnit;

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    onSaveNote(lead.id, noteText);
    setNoteText("");
  };

  const handleAttemptSave = () => {
    if (!attemptForm.outcome || !attemptForm.reason) {
      alert("Please select outcome and reason.");
      return;
    }

    onAddAttempt({
      leadId: lead.id,
      outcome: attemptForm.outcome,
      reason: attemptForm.reason,
      followUpDate: attemptForm.followUpDate,
      note: attemptForm.note,
    });

    setAttemptForm({
      outcome: "Not Connected",
      reason: "",
      followUpDate: "",
      note: "",
    });
  };

  const handleMoveToVisit = () => {
    if (!visitForm.visitDate || !visitForm.meetingPoint) {
      alert("Please select visit date and meeting point.");
      return;
    }

    onMoveToSiteVisit({
      leadId: lead.id,
      unit: lead.linkedUnit,
      visitDate: visitForm.visitDate,
      meetingPoint: visitForm.meetingPoint,
      note: visitForm.note,
      qualification: {
        age: lead.age || "",
        category: lead.category || "",
        occupation: lead.occupation || "",
        currentAddress: lead.currentAddress || "",
        ownHouse: lead.ownHouse || "",
        annualIncome: lead.annualIncome || "",
        isKeyDecisionMaker: lead.isKeyDecisionMaker || false,
        leadPotential: lead.leadPotential || "",
      },
    });

    setVisitForm({
      visitDate: "",
      meetingPoint: "",
      note: "",
    });
  };

  const handleDeadLeadSubmit = () => {
    onDeadLead({
      leadId: lead.id,
      reason: deadLeadForm.reason,
      note: deadLeadForm.note,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8 hover:text-black transition-all"
      >
        <ArrowLeft size={16} /> BACK TO PIPELINE
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800">{lead.name}</h2>
            <p className="text-blue-600 font-bold">{lead.phone}</p>
          </div>

          <InfoCard icon={<Building2 size={16} className="text-blue-500" />} title="Linked Unit">
            <p className="text-lg font-black text-gray-800">
              {unit?.unitNo || `U-${unit?.id || ""}`}
            </p>
            <p className="text-sm font-bold text-gray-600">
              {unit?.bhk || "-"} • {unit?.type || "-"}
            </p>
            <p className="text-sm font-bold text-blue-600">{unit?.displayPrice || "-"}</p>
          </InfoCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-orange-100 space-y-4">
            <h3 className="text-sm font-black text-orange-700 uppercase tracking-widest">
              Attempt / Follow-up
            </h3>

            <select
              value={attemptForm.outcome}
              onChange={(e) =>
                setAttemptForm((prev) => ({ ...prev, outcome: e.target.value, reason: "" }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            >
              <option value="Not Connected">Not Connected</option>
              <option value="Connected">Connected</option>
              <option value="Call Back Later">Call Back Later</option>
            </select>

            <input
              type="datetime-local"
              value={attemptForm.followUpDate}
              onChange={(e) =>
                setAttemptForm((prev) => ({ ...prev, followUpDate: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            />

            <input
              type="text"
              placeholder="Reason"
              value={attemptForm.reason}
              onChange={(e) =>
                setAttemptForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            />

            <textarea
              value={attemptForm.note}
              onChange={(e) =>
                setAttemptForm((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Write attempt note..."
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
            />

            <button
              onClick={handleAttemptSave}
              className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black"
            >
              SAVE ATTEMPT
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
              Add Note
            </h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write advisor note..."
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
            />
            <button
              onClick={handleSaveNote}
              className="mt-4 px-5 py-3 rounded-2xl bg-black text-white text-xs font-black"
            >
              SAVE NOTE
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-blue-100 space-y-4">
            <h3 className="text-sm font-black text-blue-700 uppercase tracking-widest">
              Schedule Site Visit
            </h3>

            <input
              type="datetime-local"
              value={visitForm.visitDate}
              onChange={(e) =>
                setVisitForm((prev) => ({ ...prev, visitDate: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            />

            <input
              type="text"
              value={visitForm.meetingPoint}
              onChange={(e) =>
                setVisitForm((prev) => ({ ...prev, meetingPoint: e.target.value }))
              }
              placeholder="Meeting point"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            />

            <textarea
              value={visitForm.note}
              onChange={(e) =>
                setVisitForm((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Visit instruction / note"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
            />

            <button
              onClick={handleMoveToVisit}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black"
            >
              MOVE TO SITE VISIT
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-red-100 space-y-4">
            <h3 className="text-sm font-black text-red-700 uppercase tracking-widest">
              Dead Lead
            </h3>

            <select
              value={deadLeadForm.reason}
              onChange={(e) =>
                setDeadLeadForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            >
              <option>Budget Issue</option>
              <option>Location Issue</option>
              <option>Already Bought</option>
              <option>Not Interested</option>
              <option>Loan Issue</option>
              <option>Requirement Changed</option>
              <option>Others</option>
            </select>

            <textarea
              value={deadLeadForm.note}
              onChange={(e) =>
                setDeadLeadForm((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Why client denied? Add note..."
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px]"
            />

            <button
              onClick={handleDeadLeadSubmit}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-black"
            >
              MARK AS DEAD LEAD
            </button>
          </div>

          <HistoryCard title="Notes History" items={lead.notesHistory || []} />
        </div>
      </div>
    </div>
  );
};

const SiteVisitLeadDetails = ({
  lead,
  onBack,
  onUpdateVisit,
  onProceedToBooking,
  onMoveToDeadLead,
}) => {
  const [form, setForm] = useState({
    visitDate: lead.visitDate || lead.siteVisit?.visitDate || "",
    visitTime: lead.siteVisit?.visitTime || "",
    visitReminder: lead.visitReminder || lead.siteVisit?.reminderAt || "",
    meetingPoint: lead.meetingPoint || lead.siteVisit?.meetingPoint || "",
    meetupAddress: lead.siteVisit?.meetupAddress || "",
    meetupPerson: lead.siteVisit?.meetupPerson || "",
    meetupContact: lead.siteVisit?.meetupContact || "",
    specialInstructions: lead.siteVisit?.specialInstructions || "",
    note: "",
    isPriorityLead: lead.isPriorityLead || false,
    siteVisitResponse: lead.siteVisitResponse || "Thinking",
  });

  const [notConnectedForm, setNotConnectedForm] = useState({
    reason: "",
    reminderAt: "",
    note: "",
  });

  const [rescheduleForm, setRescheduleForm] = useState({
    visitDate: lead.visitDate || lead.siteVisit?.visitDate || "",
    visitTime: lead.siteVisit?.visitTime || "",
    meetingPoint: lead.meetingPoint || lead.siteVisit?.meetingPoint || "",
    meetupAddress: lead.siteVisit?.meetupAddress || "",
    meetupPerson: lead.siteVisit?.meetupPerson || "",
    meetupContact: lead.siteVisit?.meetupContact || "",
    note: "",
  });

  const [deadLeadForm, setDeadLeadForm] = useState({
    reason: "Not Interested",
    note: "",
  });

  const [localPhotos, setLocalPhotos] = useState(lead.siteVisitPhotos || []);

  const handleSaveMainUpdate = () => {
    onUpdateVisit(
      lead.id,
      {
        visitDate: form.visitDate,
        meetingPoint: form.meetingPoint,
        isPriorityLead: form.isPriorityLead,
        siteVisitResponse: form.siteVisitResponse,
        siteVisit: {
          ...lead.siteVisit,
          scheduled: true,
          visitDate: form.visitDate,
          visitTime: form.visitTime,
          meetingPoint: form.meetingPoint,
          meetupAddress: form.meetupAddress,
          meetupPerson: form.meetupPerson,
          meetupContact: form.meetupContact,
          reminderAt: form.visitReminder,
          specialInstructions: form.specialInstructions,
          status: "Scheduled",
        },
      },
      form.note
    );

    setForm((prev) => ({ ...prev, note: "" }));
  };

  const handleNotConnected = () => {
    if (!notConnectedForm.reason || !notConnectedForm.reminderAt) {
      alert("Please select reason and set follow-up reminder.");
      return;
    }

    onUpdateVisit(
      lead.id,
      {
        followUpDate: notConnectedForm.reminderAt,
        visitAttempts: (lead.visitAttempts || 0) + 1,
        siteVisit: {
          ...lead.siteVisit,
          reminderAt: notConnectedForm.reminderAt,
          status: "Not Connected",
          notConnectedReason: notConnectedForm.reason,
        },
      },
      `Visit call not connected: ${notConnectedForm.reason}${
        notConnectedForm.note ? ` - ${notConnectedForm.note}` : ""
      }`
    );

    setNotConnectedForm({
      reason: "",
      reminderAt: "",
      note: "",
    });
  };

  const handleReschedule = () => {
    if (!rescheduleForm.visitDate || !rescheduleForm.meetingPoint) {
      alert("Please enter new visit date and meeting point.");
      return;
    }

    onUpdateVisit(
      lead.id,
      {
        visitDate: rescheduleForm.visitDate,
        meetingPoint: rescheduleForm.meetingPoint,
        visitAttempts: (lead.visitAttempts || 0) + 1,
        siteVisit: {
          ...lead.siteVisit,
          scheduled: true,
          visitDate: rescheduleForm.visitDate,
          visitTime: rescheduleForm.visitTime,
          meetingPoint: rescheduleForm.meetingPoint,
          meetupAddress: rescheduleForm.meetupAddress,
          meetupPerson: rescheduleForm.meetupPerson,
          meetupContact: rescheduleForm.meetupContact,
          status: "Rescheduled",
          rescheduleReason: rescheduleForm.note || "",
        },
      },
      `Visit rescheduled to ${rescheduleForm.visitDate}${
        rescheduleForm.visitTime ? ` at ${rescheduleForm.visitTime}` : ""
      }`
    );
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPhotos = files.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
      uploadedAt: new Date().toLocaleString(),
      uploadedBy: "Advisor",
    }));

    const updatedPhotos = [...localPhotos, ...newPhotos];
    setLocalPhotos(updatedPhotos);
    onUpdateVisit(lead.id, { siteVisitPhotos: updatedPhotos });
    e.target.value = "";
  };

  const handleProceed = () => {
    if (form.siteVisitResponse !== "Liked") {
      alert("Select site visit response as Liked before proceed to booking.");
      return;
    }
    onProceedToBooking(lead.id, form.note || "Visit successful");
  };

  const handleDeadLead = () => {
    onMoveToDeadLead(lead.id, deadLeadForm.reason, deadLeadForm.note);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8 hover:text-black transition-all"
      >
        <ArrowLeft size={16} /> BACK TO PIPELINE
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800">{lead.name}</h2>
            <p className="text-blue-600 font-bold">{lead.phone}</p>

            {lead.isPriorityLead && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase">
                <Star size={14} /> Priority Lead
              </div>
            )}
          </div>

          <InfoCard icon={<UserCheck size={16} className="text-purple-500" />} title="Visit Attempts">
            <p className="text-lg font-black text-gray-800">{lead.visitAttempts || 0}</p>
          </InfoCard>

          <InfoCard icon={<Building2 size={16} className="text-blue-500" />} title="Visit Unit">
            <p className="text-lg font-black text-gray-800">
              {lead.linkedUnit?.unitNo || `U-${lead.linkedUnit?.id || ""}`}
            </p>
            <p className="text-sm font-bold text-gray-600">
              {lead.linkedUnit?.bhk || "-"} • {lead.linkedUnit?.type || "-"}
            </p>
            <p className="text-sm font-bold text-blue-600">
              {lead.linkedUnit?.displayPrice || "-"}
            </p>
          </InfoCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
              Full Client Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-700">
              <div className="bg-gray-50 p-4 rounded-2xl">Name: {lead.name || "-"}</div>
              <div className="bg-gray-50 p-4 rounded-2xl">Phone: {lead.phone || "-"}</div>
              <div className="bg-gray-50 p-4 rounded-2xl">Source: {lead.source || "-"}</div>
              <div className="bg-gray-50 p-4 rounded-2xl">Created At: {lead.createdAt || "-"}</div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                Lead Potential: {lead.qualification?.leadPotential || lead.leadPotential || "-"}
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                Occupation: {lead.qualification?.occupation || lead.occupation || "-"}
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl md:col-span-2">
                Current Address: {lead.qualification?.currentAddress || lead.currentAddress || "-"}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-blue-100 space-y-4">
            <h3 className="text-sm font-black text-blue-700 uppercase tracking-widest">
              Meetup Details & Priority
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={form.visitDate}
                onChange={(e) => setForm((prev) => ({ ...prev, visitDate: e.target.value }))}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="time"
                value={form.visitTime}
                onChange={(e) => setForm((prev) => ({ ...prev, visitTime: e.target.value }))}
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={form.meetingPoint}
                onChange={(e) => setForm((prev) => ({ ...prev, meetingPoint: e.target.value }))}
                placeholder="Meeting point"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={form.meetupAddress}
                onChange={(e) => setForm((prev) => ({ ...prev, meetupAddress: e.target.value }))}
                placeholder="Meetup full address"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={form.meetupPerson}
                onChange={(e) => setForm((prev) => ({ ...prev, meetupPerson: e.target.value }))}
                placeholder="Meetup person name"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={form.meetupContact}
                onChange={(e) => setForm((prev) => ({ ...prev, meetupContact: e.target.value }))}
                placeholder="Meetup contact number"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="datetime-local"
                value={form.visitReminder}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, visitReminder: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm md:col-span-2"
              />

              <select
                value={form.siteVisitResponse}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, siteVisitResponse: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm md:col-span-2"
              >
                <option value="Thinking">Thinking</option>
                <option value="Liked">Liked</option>
                <option value="Not Interested">Not Interested</option>
              </select>

              <textarea
                value={form.specialInstructions}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, specialInstructions: e.target.value }))
                }
                placeholder="Special instructions"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[100px] md:col-span-2"
              />

              <label className="md:col-span-2 flex items-center gap-3 text-sm font-bold text-gray-700 bg-yellow-50 border border-yellow-100 rounded-2xl px-4 py-4">
                <input
                  type="checkbox"
                  checked={form.isPriorityLead}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, isPriorityLead: e.target.checked }))
                  }
                />
                Higher possibility of buying property
              </label>

              <textarea
                value={form.note}
                onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                placeholder="Visit note"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[110px] md:col-span-2"
              />
            </div>

            <button
              onClick={handleSaveMainUpdate}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black"
            >
              SAVE MEETUP DETAILS
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-orange-100 space-y-4">
            <div className="flex items-center gap-2">
              <PhoneOff size={18} className="text-orange-500" />
              <h3 className="text-sm font-black text-orange-700 uppercase tracking-widest">
                Called Not Connected
              </h3>
            </div>

            <select
              value={notConnectedForm.reason}
              onChange={(e) =>
                setNotConnectedForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            >
              <option value="">Select reason</option>
              <option value="Not Answered">Not Answered</option>
              <option value="Busy">Busy</option>
              <option value="Switched Off">Switched Off</option>
              <option value="Call Later">Call Later</option>
              <option value="Unreachable">Unreachable</option>
            </select>

            <input
              type="datetime-local"
              value={notConnectedForm.reminderAt}
              onChange={(e) =>
                setNotConnectedForm((prev) => ({ ...prev, reminderAt: e.target.value }))
              }
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
            />

            <textarea
              value={notConnectedForm.note}
              onChange={(e) =>
                setNotConnectedForm((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Write note"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[110px]"
            />

            <button
              onClick={handleNotConnected}
              className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black"
            >
              SAVE NOT CONNECTED
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-purple-100 space-y-4">
            <div className="flex items-center gap-2">
              <RefreshCcw size={18} className="text-purple-500" />
              <h3 className="text-sm font-black text-purple-700 uppercase tracking-widest">
                Reschedule Visit
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={rescheduleForm.visitDate}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, visitDate: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="time"
                value={rescheduleForm.visitTime}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, visitTime: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={rescheduleForm.meetingPoint}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, meetingPoint: e.target.value }))
                }
                placeholder="New meeting point"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={rescheduleForm.meetupAddress}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, meetupAddress: e.target.value }))
                }
                placeholder="New meetup address"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={rescheduleForm.meetupPerson}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, meetupPerson: e.target.value }))
                }
                placeholder="Meetup person"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                value={rescheduleForm.meetupContact}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, meetupContact: e.target.value }))
                }
                placeholder="Meetup contact"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <textarea
                value={rescheduleForm.note}
                onChange={(e) =>
                  setRescheduleForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Reschedule reason / note"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[100px] md:col-span-2"
              />
            </div>

            <button
              onClick={handleReschedule}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black"
            >
              RESCHEDULE VISIT
            </button>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-green-100 space-y-4">
            <div className="flex items-center gap-2">
              <Upload size={18} className="text-green-500" />
              <h3 className="text-sm font-black text-green-700 uppercase tracking-widest">
                Upload Advisor & Client Photos
              </h3>
            </div>

            <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="text-center">
                <Upload size={20} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-700">Select visit photos</p>
              </div>
            </label>

            {localPhotos?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {localPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative border border-gray-200 rounded-2xl overflow-hidden bg-white"
                  >
                    <img
                      src={photo.preview}
                      alt="site-visit"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleProceed}
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-black flex items-center justify-center gap-2"
            >
              <BadgeCheck size={18} /> VISIT SUCCESSFUL - PROCEED TO BOOKING
            </button>

            <div className="bg-white p-4 rounded-[32px] border border-red-100 space-y-3">
              <select
                value={deadLeadForm.reason}
                onChange={(e) =>
                  setDeadLeadForm((prev) => ({ ...prev, reason: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              >
                <option>Not Interested</option>
                <option>Budget Issue</option>
                <option>Location Issue</option>
                <option>Loan Issue</option>
                <option>Family Rejected</option>
                <option>Requirement Changed</option>
              </select>
              <textarea
                value={deadLeadForm.note}
                onChange={(e) =>
                  setDeadLeadForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Dead lead note"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[100px]"
              />
              <button
                onClick={handleDeadLead}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black"
              >
                MOVE TO DEAD LEAD
              </button>
            </div>
          </div>

          <HistoryCard title="Visit Notes History" items={lead.notesHistory || []} />
        </div>
      </div>
    </div>
  );
};

const BookingLeadDetails = ({ lead, onBack, onUpdateBooking, onMoveToDeadLead }) => {
  const [bookingForm, setBookingForm] = useState({
    aadhaarNumber: lead.booking?.aadhaarNumber || "",
    panNumber: lead.booking?.panNumber || "",
    clientEmail: lead.booking?.clientEmail || lead.email || "",
    bookingAmount: lead.booking?.bookingAmount || "",
    bookingStatus: lead.booking?.bookingStatus || "Docs Pending",
    notes: lead.booking?.notes || "",
    aadhaarPhoto: lead.booking?.aadhaarPhoto || null,
    panPhoto: lead.booking?.panPhoto || null,
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBookingForm((prev) => ({
      ...prev,
      [field]: {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      },
    }));
  };

  const handleSaveBooking = () => {
    onUpdateBooking(lead.id, bookingForm, "Booking details updated");
  };

  const handleSendToManager = () => {
    onUpdateBooking(
      lead.id,
      {
        ...bookingForm,
        sentToManager: true,
        sentToManagerAt: new Date().toLocaleString(),
        bookingStatus: "Sent to Manager",
      },
      "Lead sent to manager"
    );
  };

  const handleConfirmBooking = () => {
    onUpdateBooking(
      lead.id,
      {
        ...bookingForm,
        bookingStatus: "Booking Confirmed",
      },
      "Booking confirmed"
    );
  };

  const handleCancelBooking = () => {
    onUpdateBooking(
      lead.id,
      {
        ...bookingForm,
        bookingStatus: "Booking Cancelled",
      },
      "Booking cancelled"
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8 hover:text-black transition-all"
      >
        <ArrowLeft size={16} /> BACK TO PIPELINE
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-gray-800">{lead.name}</h2>
            <p className="text-blue-600 font-bold">{lead.phone}</p>
            <p className="mt-3 text-sm font-bold text-gray-500">
              Status: {lead.booking?.bookingStatus || "Docs Pending"}
            </p>
            {lead.isPriorityLead && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase">
                <Star size={14} /> Priority Lead
              </div>
            )}
          </div>

          <InfoCard icon={<Building2 size={16} className="text-blue-500" />} title="Interested Property">
            <p className="text-lg font-black text-gray-800">
              {lead.linkedUnit?.unitNo || `U-${lead.linkedUnit?.id || ""}`}
            </p>
            <p className="text-sm font-bold text-gray-600">
              {lead.linkedUnit?.bhk || "-"} • {lead.linkedUnit?.type || "-"}
            </p>
            <p className="text-sm font-bold text-blue-600">
              {lead.linkedUnit?.displayPrice || "-"}
            </p>
          </InfoCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
              Client Documentation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Aadhaar Number"
                value={bookingForm.aadhaarNumber}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, aadhaarNumber: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                placeholder="PAN Number"
                value={bookingForm.panNumber}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, panNumber: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="email"
                placeholder="Client Email"
                value={bookingForm.clientEmail}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, clientEmail: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <input
                type="text"
                placeholder="Booking Amount"
                value={bookingForm.bookingAmount}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, bookingAmount: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm"
              />

              <select
                value={bookingForm.bookingStatus}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, bookingStatus: e.target.value }))
                }
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm md:col-span-2"
              >
                <option>Docs Pending</option>
                <option>Sent to Manager</option>
                <option>Token Pending</option>
                <option>Token Received</option>
                <option>Booking Confirmed</option>
                <option>Booking Cancelled</option>
              </select>

              <label className="bg-gray-50 p-4 rounded-2xl font-bold text-sm cursor-pointer">
                Upload Aadhaar Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "aadhaarPhoto")}
                  className="block mt-2 w-full"
                />
              </label>

              <label className="bg-gray-50 p-4 rounded-2xl font-bold text-sm cursor-pointer">
                Upload PAN Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "panPhoto")}
                  className="block mt-2 w-full"
                />
              </label>

              <textarea
                value={bookingForm.notes}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Booking notes..."
                className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm min-h-[120px] md:col-span-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleSaveBooking}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black"
              >
                SAVE BOOKING DETAILS
              </button>

              <button
                onClick={handleSendToManager}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black flex items-center justify-center gap-2"
              >
                <Send size={18} /> SEND TO MANAGER
              </button>

              <button
                onClick={handleConfirmBooking}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black"
              >
                MARK BOOKING CONFIRMED
              </button>

              <button
                onClick={handleCancelBooking}
                className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black"
              >
                MARK BOOKING CANCELLED
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-red-100 space-y-4">
            <h3 className="text-sm font-black text-red-700 uppercase tracking-widest">
              Move to Dead Lead
            </h3>

            <button
              onClick={() =>
                onMoveToDeadLead(
                  lead.id,
                  "Booking Failed",
                  bookingForm.notes || "Booking stage failed"
                )
              }
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-black"
            >
              MOVE TO DEAD LEAD
            </button>
          </div>

          <HistoryCard title="Booking Notes History" items={lead.notesHistory || []} />
        </div>
      </div>
    </div>
  );
};

const DeadLeadDetails = ({ lead, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8 hover:text-black transition-all"
      >
        <ArrowLeft size={16} /> BACK TO PIPELINE
      </button>

      <div className="bg-white rounded-[32px] border border-red-100 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <XCircle className="text-red-500" size={28} />
          <h2 className="text-2xl font-black text-red-700">Dead Lead Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-700">
          <div className="bg-gray-50 p-4 rounded-2xl">Name: {lead.name || "-"}</div>
          <div className="bg-gray-50 p-4 rounded-2xl">Phone: {lead.phone || "-"}</div>
          <div className="bg-gray-50 p-4 rounded-2xl">Previous Stage: {lead.previousStatus || "-"}</div>
          <div className="bg-gray-50 p-4 rounded-2xl">Marked At: {lead.deadLeadAt || "-"}</div>
          <div className="bg-red-50 p-4 rounded-2xl md:col-span-2 text-red-700">
            Reason: {lead.deadLeadReason || "-"}
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl md:col-span-2">
            Note: {lead.deadLeadNote || "-"}
          </div>
        </div>

        <HistoryCard title="Lead Notes History" items={lead.notesHistory || []} />
      </div>
    </div>
  );
};

const DefaultLeadDetails = ({ lead, onBack }) => (
  <div className="max-w-4xl mx-auto p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-400 font-black text-xs mb-8"
    >
      <ArrowLeft size={16} /> BACK TO PIPELINE
    </button>
    <div className="bg-white p-8 rounded-[32px] border border-gray-100">
      <h2 className="text-2xl font-black text-gray-800">{lead.name}</h2>
      <p className="text-gray-500 font-bold mt-2">No specific details screen found.</p>
    </div>
  </div>
);

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">{title}</h3>
    </div>
    {children}
  </div>
);

const ActionButton = ({ active, onClick, icon, label, activeBorder, border }) => (
  <button
    onClick={onClick}
    className={`p-6 rounded-[28px] border-2 transition-all text-left ${border} ${
      active ? activeBorder : "border-gray-100 bg-white"
    }`}
  >
    <div className="mb-4">{icon}</div>
    <p className="text-sm font-black text-gray-800">{label}</p>
  </button>
);

const HistoryCard = ({ title, items }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100">
    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
      {title}
    </h3>
    <div className="space-y-3">
      {!items?.length && <p className="text-sm text-gray-400 font-bold">No history found.</p>}
      {items?.map((item) => (
        <div key={item.id} className="bg-gray-50 p-4 rounded-2xl">
          <p className="text-sm font-bold text-gray-700">{item.text || item.note || "-"}</p>
          <p className="text-[11px] text-gray-400 font-bold mt-2">
            {item.createdAt || "-"} {item.createdBy ? `• ${item.createdBy}` : ""}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default SalesPipeline;