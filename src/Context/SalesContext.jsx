import  { createContext, useContext, useMemo, useState } from "react";

const SalesContext = createContext();

const nowIso = () => new Date().toISOString();

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createHistoryItem = (payload) => ({
  id: createId(),
  createdAt: nowIso(),
  ...payload,
});

const createDefaultLead = (data = {}) => ({
  id: data.id || Date.now(),
  name: data.name || "",
  phone: data.phone || "",
  alternatePhone: data.alternatePhone || "",
  email: data.email || "",
  city: data.city || "",
  address: data.address || "",
  source: data.source || "Generated",

  attempts: data.attempts || 0,
  status: data.status || "Suspecting",
  createdAt: data.createdAt || nowIso(),
  createdBy: data.createdBy || "Advisor",

  lastNote: data.lastNote || "",
  lastResponse: data.lastResponse || "",

  linkedUnit: data.linkedUnit || null,
  interestedUnits: data.interestedUnits || [],
  unitHistory: data.unitHistory || [],

  followUpDate: data.followUpDate || null,
  visitDate: data.visitDate || null,
  meetingPoint: data.meetingPoint || null,

  // Combined unique fields here
  siteVisitPhotos: data.siteVisitPhotos || [],
  isPriorityLead: data.isPriorityLead || false,
  visitAttempts: data.visitAttempts || 0,
  visitReminder: data.visitReminder || "",

  siteVisit: data.siteVisit || {
    scheduled: false,
    visitDate: "",
    visitTime: "",
    meetingPoint: "",
    meetupAddress: "",
    meetupPerson: "",
    meetupContact: "",
    reminderAt: "",
    projectName: "",
    unitId: null,
    specialInstructions: "",
    status: "Not Scheduled",
    rescheduleReason: "",
    notConnectedReason: "",
  },
  
  // ... rest of the qualification and history objects remain the same

  qualification: {
    age: data.qualification?.age || data.age || "",
    category: data.qualification?.category || data.category || "",
    occupation: data.qualification?.occupation || data.occupation || "",
    currentAddress:
      data.qualification?.currentAddress || data.currentAddress || "",
    ownHouse: data.qualification?.ownHouse || data.ownHouse || "",
    annualIncome: data.qualification?.annualIncome || data.annualIncome || "",
    isKeyDecisionMaker:
      data.qualification?.isKeyDecisionMaker ||
      data.isKeyDecisionMaker ||
      false,
    leadPotential:
      data.qualification?.leadPotential || data.leadPotential || "",
    budget: data.qualification?.budget || "",
    propertyType: data.qualification?.propertyType || "",
    preferredBhk: data.qualification?.preferredBhk || "",
    preferredFacing: data.qualification?.preferredFacing || "",
    preferredLocation: data.qualification?.preferredLocation || "",
    familySize: data.qualification?.familySize || "",
  },

  notesHistory: data.notesHistory || [],
  responseHistory: data.responseHistory || [],

  followUp: data.followUp || {
    reminderAt: "",
    reason: "",
    status: "",
  },

  movedToProspectAt: data.movedToProspectAt || "",
  movedToSiteVisitAt: data.movedToSiteVisitAt || "",
});

const initialLeads = [
  createDefaultLead({
    id: 1,
    name: "Rahul Sharma",
    phone: "9981436647",
    source: "Website",
    attempts: 2,
    status: "Suspecting",
    createdAt: "2026-03-20",
  }),

  createDefaultLead({
    id: 2,
    name: "Amit Verma",
    phone: "8877665544",
    source: "Generated",
    attempts: 0,
    status: "Suspecting",
    createdAt: "2026-03-21",
  }),

  createDefaultLead({
    id: 3,
    name: "Amit Sharma",
    phone: "919876543210",
    source: "Website",
    attempts: 1,
    status: "Prospecting",
    createdAt: "2026-03-24",
    lastNote: "Interested in 2 BHK unit",
    followUpDate: "2026-03-26T11:00",

    linkedUnit: {
      id: 21,
      unitNo: "A-203",
      bhk: "2 BHK",
      type: "Apartment",
      facing: "East",
      displayPrice: "₹52,00,000",
      areaSqft: "1250 Sqft",
      projectName: "Green Valley Residency",
    },

    qualification: {
      age: "32",
      category: "A",
      occupation: "Business",
      currentAddress: "Lucknow",
      ownHouse: "No",
      annualIncome: "12 LPA",
      isKeyDecisionMaker: true,
      leadPotential: "Hot",
    },

    notesHistory: [
      {
        id: "n1",
        text: "Client asked for price and floor plan.",
        createdAt: "2026-03-24 10:30 AM",
        createdBy: "Advisor",
      },
    ],

    responseHistory: [
      {
        id: "r1",
        type: "Prospecting Attempt",
        outcome: "Connected",
        reason: "Interested",
        note: "Client wants site visit this week.",
        followUpDate: "2026-03-26T11:00",
        createdAt: "2026-03-24 10:35 AM",
      },
    ],
  }),
];

export const SalesProvider = ({ children }) => {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (lead) => {
    const newLead = createDefaultLead(lead);
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (leadId, updates) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === Number(leadId)
          ? {
              ...lead,
              ...(typeof updates === "function" ? updates(lead) : updates),
            }
          : lead,
      ),
    );
  };

  const addNoteToLead = ({
    leadId,
    text,
    createdBy = "Advisor",
    type = "general",
  }) => {
    if (!text?.trim()) return;

    updateLead(leadId, (lead) => ({
      ...lead,
      lastNote: text.trim(),
      notesHistory: [
        createHistoryItem({
          type,
          text: text.trim(),
          createdBy,
        }),
        ...lead.notesHistory,
      ],
    }));
  };

  const addResponseToLead = ({
    leadId,
    status,
    reason,
    reminderAt = "",
    createdBy = "Advisor",
    note = "",
    increaseAttempt = false,
  }) => {
    updateLead(leadId, (lead) => {
      const nextAttempts = increaseAttempt ? lead.attempts + 1 : lead.attempts;

      return {
        ...lead,
        attempts: nextAttempts,
        lastResponse: reason || status,
        lastNote: note?.trim() ? note.trim() : lead.lastNote,
        followUpDate: reminderAt || lead.followUpDate,
        followUp: {
          reminderAt,
          reason: reason || "",
          status: status || "",
        },
        responseHistory: [
          createHistoryItem({
            type: (status || "response").toLowerCase().replace(/\s+/g, "-"),
            status,
            reason,
            attemptNumber: nextAttempts,
            reminderAt,
            createdBy,
          }),
          ...lead.responseHistory,
        ],
        notesHistory: note?.trim()
          ? [
              createHistoryItem({
                type: "response-note",
                text: note.trim(),
                createdBy,
              }),
              ...lead.notesHistory,
            ]
          : lead.notesHistory,
      };
    });
  };

  const moveLeadToProspecting = ({
    leadId,
    unit,
    followUpDate,
    note,
    qualification,
    clientDetails = {},
    createdBy = "Advisor",
  }) => {
    updateLead(leadId, (lead) => ({
      ...lead,
      ...clientDetails,
      status: "Prospecting",
      linkedUnit: unit || lead.linkedUnit,
      interestedUnits: unit
        ? [
            unit,
            ...(lead.interestedUnits || []).filter((u) => u.id !== unit.id),
          ]
        : lead.interestedUnits,
      followUpDate: followUpDate || lead.followUpDate,
      followUp: {
        reminderAt: followUpDate || "",
        reason: "Interested",
        status: "Prospecting",
      },
      qualification: {
        ...lead.qualification,
        ...qualification,
      },
      movedToProspectAt: nowIso(),
      lastNote: note || lead.lastNote,
      lastResponse: "Interested",
      notesHistory: [
        createHistoryItem({
          type: "stage-change",
          text: `Lead moved to Prospecting${
            unit ? ` with Unit ${unit.unitNo || unit.id}` : ""
          }.`,
          createdBy,
        }),
        ...(note
          ? [
              createHistoryItem({
                type: "prospecting",
                text: note,
                createdBy,
              }),
            ]
          : []),
        ...lead.notesHistory,
      ],
      responseHistory: [
        createHistoryItem({
          type: "prospecting",
          status: "Prospecting",
          reason: "Interested",
          attemptNumber: lead.attempts,
          reminderAt: followUpDate || "",
          createdBy,
        }),
        ...lead.responseHistory,
      ],
    }));
  };

  const moveLeadToSiteVisit = ({
    leadId,
    unit,
    visitDate,
    meetingPoint,
    note,
    qualification,
    reminderAt = "",
    visitTime = "",
    specialInstructions = "",
    createdBy = "Advisor",
  }) => {
    updateLead(leadId, (lead) => ({
      ...lead,
      status: "Site Visit",
      linkedUnit: unit || lead.linkedUnit,
      interestedUnits: unit
        ? [
            unit,
            ...(lead.interestedUnits || []).filter((u) => u.id !== unit.id),
          ]
        : lead.interestedUnits,
      visitDate: visitDate || lead.visitDate,
      meetingPoint: meetingPoint || lead.meetingPoint || "",
      followUpDate: reminderAt || lead.followUpDate,
      siteVisit: {
        scheduled: true,
        visitDate: visitDate || "",
        visitTime: visitTime || "",
        meetingPoint: meetingPoint || "",
        reminderAt: reminderAt || "",
        projectName: unit?.projectName || lead.linkedUnit?.projectName || "",
        unitId: unit?.id || lead.linkedUnit?.id || null,
        specialInstructions: specialInstructions || "",
        status: "Scheduled",
      },
      qualification: {
        ...lead.qualification,
        ...qualification,
      },
      movedToSiteVisitAt: nowIso(),
      lastNote: note || lead.lastNote,
      lastResponse: "Site Visit Scheduled",
      notesHistory: [
        createHistoryItem({
          type: "site-visit",
          text: `Site visit scheduled for ${visitDate || "-"}${
            visitTime ? ` at ${visitTime}` : ""
          }${meetingPoint ? `, meeting point: ${meetingPoint}` : ""}.`,
          createdBy,
        }),
        ...(note
          ? [
              createHistoryItem({
                type: "site-visit-note",
                text: note,
                createdBy,
              }),
            ]
          : []),
        ...lead.notesHistory,
      ],
      responseHistory: [
        createHistoryItem({
          type: "site-visit",
          status: "Site Visit",
          reason: "Meeting Fixed",
          attemptNumber: lead.attempts,
          reminderAt: reminderAt || "",
          createdBy,
        }),
        ...lead.responseHistory,
      ],
    }));
  };

  const scheduleFollowUp = ({
    leadId,
    reason,
    reminderAt,
    note = "",
    createdBy = "Advisor",
    increaseAttempt = false,
  }) => {
    if (!reason || !reminderAt) return;

    addResponseToLead({
      leadId,
      status: "Not Connected",
      reason,
      reminderAt,
      note,
      createdBy,
      increaseAttempt,
    });
  };

  const changeLeadUnit = ({
    leadId,
    newUnit,
    reason = "",
    createdBy = "Advisor",
  }) => {
    if (!newUnit) return;

    updateLead(leadId, (lead) => {
      const oldUnit = lead.linkedUnit;

      return {
        ...lead,
        linkedUnit: newUnit,
        interestedUnits: [
          newUnit,
          ...(lead.interestedUnits || []).filter((u) => u.id !== newUnit.id),
        ],
        unitHistory: [
          createHistoryItem({
            type: "unit-change",
            fromUnit: oldUnit || null,
            toUnit: newUnit,
            reason,
            createdBy,
          }),
          ...lead.unitHistory,
        ],
        notesHistory: [
          createHistoryItem({
            type: "unit-change",
            text: `Unit changed from ${
              oldUnit?.unitNo || oldUnit?.id || "None"
            } to ${newUnit?.unitNo || newUnit?.id}${
              reason ? ` (${reason})` : ""
            }.`,
            createdBy,
          }),
          ...lead.notesHistory,
        ],
      };
    });
  };

  const updateSiteVisitStatus = ({
    leadId,
    visitStatus,
    note = "",
    createdBy = "Advisor",
  }) => {
    updateLead(leadId, (lead) => ({
      ...lead,
      siteVisit: {
        ...lead.siteVisit,
        status: visitStatus,
      },
      notesHistory: [
        createHistoryItem({
          type: "site-visit-status",
          text: `Site visit marked as ${visitStatus}.${note ? ` ${note}` : ""}`,
          createdBy,
        }),
        ...lead.notesHistory,
      ],
    }));
  };

  const value = useMemo(
    () => ({
      leads,
      setLeads,
      addLead,
      updateLead,
      addNoteToLead,
      addResponseToLead,
      moveLeadToProspecting,
      moveLeadToSiteVisit,
      scheduleFollowUp,
      changeLeadUnit,
      updateSiteVisitStatus,
    }),
    [leads],
  );

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used inside SalesProvider");
  }
  return context;
};
