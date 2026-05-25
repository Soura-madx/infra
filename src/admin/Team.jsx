// src/pages/TeamManagement.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";

import axios from "axios";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  Handle,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";

import dagre from "dagre";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  Search,
  GitBranch,
  List,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ======================================================
// CONFIG
// ======================================================

const PRIMARY = "#005596";

const nodeWidth = 260;
const nodeHeight = 240;

const hierarchy = {
  admin: 1,
  director: 2,
  "chief manager": 3,
  "senior manager": 4,
  manager: 5,
  supervisor: 6,
  advisor: 7,
};

// ======================================================
// DAGRE
// ======================================================

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

// ======================================================
// NODE
// ======================================================

const AdvisorNode = ({ data }) => {
  return (
    <div
      className={`bg-white rounded-[28px] border shadow-lg p-5 w-[250px] transition-all duration-300 relative ${
        data.highlight
          ? "border-[#005596] ring-4 ring-blue-100 scale-105"
          : "border-gray-200"
      }`}
    >
      {/* HANDLES */}

      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#005596",
          width: 10,
          height: 10,
        }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#005596",
          width: 10,
          height: 10,
        }}
      />

      {/* PROFILE */}

      <div className="flex justify-center">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#EEF4FB] flex items-center justify-center text-[#005596] text-2xl font-bold">
            {data.initials}
          </div>
        )}
      </div>

      {/* INFO */}

      <div className="text-center mt-4">
        <h3 className="font-bold text-[#111827] capitalize text-[17px]">
          {data.name}
        </h3>

        <p className="text-[#005596] font-semibold capitalize text-sm mt-1">
          {data.designation}
        </p>

        <div className="mt-3 bg-[#F4F7FB] rounded-2xl px-3 py-2">
          <p className="text-[11px] text-gray-400 uppercase font-semibold">
            Advisor Code
          </p>

          <p className="text-sm font-bold text-[#111827] mt-1">{data.code}</p>
        </div>

        <p className="text-xs text-gray-400 mt-3">Joined : {data.date}</p>

        {/* DETAILS BUTTON */}

        <button
          type="button"
          onClick={() => data.onView(data.advisor)}
          className="mt-4 w-full h-[46px] rounded-2xl bg-[#005596] text-white text-sm font-semibold hover:opacity-90 transition-all"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};

// ======================================================
// NODE TYPES
// ======================================================

const nodeTypes = {
  advisorNode: AdvisorNode,
};

// ======================================================
// MAIN
// ======================================================

function TeamManagementContent() {
  const reactFlowInstance = useRef(null);

  const [advisors, setAdvisors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [viewMode, setViewMode] = useState("tree");

  const [direction, setDirection] = useState("TB");

  const [designationFilter, setDesignationFilter] = useState("all");

  const [selectedDate, setSelectedDate] = useState(null);

  const [dateSort, setDateSort] = useState("newest");

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const [advisorType, setAdvisorType] = useState("");

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // ======================================================
  // FETCH
  // ======================================================

  useEffect(() => {
    fetchAdvisors();
  }, []);

  const fetchAdvisors = async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://workiees.com/api/advisor/all");

      console.log(res.data);

      const data = res?.data?.data || res?.data?.advisors || res?.data || [];

      setAdvisors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAdvisor?.advisor_type) {
      setAdvisorType(selectedAdvisor.advisor_type);
    }
  }, [selectedAdvisor]);

  // ======================================================
  // TOGGLE ADVISOR TYPE
  // ======================================================

  const handleAdvisorTypeToggle = async () => {
    try {
      // GET ADVISOR ID

      const advisorId = selectedAdvisor?._id || selectedAdvisor?.id;

      if (!advisorId) {
        console.log("Advisor ID not found");
        return;
      }

      // TOGGLE VALUE

      const updatedType =
        advisorType === "Full Time" ? "Part Time" : "Full Time";

      // UPDATE FRONTEND UI

      setAdvisorType(updatedType);

      // UPDATE SELECTED ADVISOR STATE

      setSelectedAdvisor((prev) => ({
        ...prev,
        advisor_type: updatedType,
      }));

      // OPTIONAL API UPDATE

      await axios.put(`https://workiees.com/api/advisor/update/${advisorId}`, {
        advisor_type: updatedType,
      });

      // UPDATE LIST ALSO

      setAdvisors((prev) =>
        prev.map((advisor) =>
          (advisor._id || advisor.id) === advisorId
            ? {
                ...advisor,
                advisor_type: updatedType,
              }
            : advisor,
        ),
      );

      console.log("Advisor type updated");
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FILTER
  // ======================================================

  const filteredAdvisors = useMemo(() => {
    let filtered = [...advisors];

    // SEARCH

    if (search) {
      filtered = filtered.filter((advisor) => {
        const name =
          advisor?.name || advisor?.full_name || advisor?.fullName || "";

        return name.toLowerCase().includes(search.toLowerCase());
      });
    }

    // DESIGNATION

    if (designationFilter !== "all") {
      filtered = filtered.filter(
        (advisor) =>
          advisor?.designation?.toLowerCase()?.trim() ===
          designationFilter.toLowerCase(),
      );
    }

    // DATE

    if (selectedDate) {
      filtered = filtered.filter((advisor) => {
        if (!advisor?.created_at) return false;

        const advisorDate = new Date(advisor.created_at);

        return advisorDate.toDateString() === selectedDate.toDateString();
      });
    }

    // SORT

    filtered.sort((a, b) => {
      const dateA = new Date(a?.created_at || 0).getTime();

      const dateB = new Date(b?.created_at || 0).getTime();

      return dateSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [advisors, search, designationFilter, selectedDate, dateSort]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.ceil(filteredAdvisors.length / itemsPerPage);

  const paginatedAdvisors = filteredAdvisors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ======================================================
  // TREE
  // ======================================================

  const buildTree = () => {
    if (!paginatedAdvisors.length) return [];

    const normalized = paginatedAdvisors.map((advisor, index) => ({
      ...advisor,
      __index: index,
      __designation:
        advisor?.designation?.toString().trim().toLowerCase() || "advisor",
    }));

    const sorted = [...normalized].sort((a, b) => {
      const aRank = hierarchy[a.__designation] || 999;

      const bRank = hierarchy[b.__designation] || 999;

      return aRank - bRank;
    });

    return sorted.map((advisor, index) => {
      let parent = null;

      const currentRank = hierarchy[advisor.__designation] || 999;

      for (let i = index - 1; i >= 0; i--) {
        const upperRank = hierarchy[sorted[i].__designation] || 999;

        if (upperRank < currentRank) {
          parent = sorted[i]?._id || sorted[i]?.id || `node-${i}`;

          break;
        }
      }

      return {
        advisor,
        parent,
      };
    });
  };

  // ======================================================
  // NODES + EDGES
  // ======================================================

  const { nodes, edges } = useMemo(() => {
    const tree = buildTree();

    const nodes = [];
    const edges = [];

    dagreGraph.setGraph({
      rankdir: direction,
      ranksep: 120,
      nodesep: 80,
    });

    tree.forEach((item, index) => {
      const advisor = item.advisor;

      const id = advisor?._id || advisor?.id || `node-${index}`;

      const name =
        advisor?.name ||
        advisor?.full_name ||
        advisor?.fullName ||
        advisor?.advisor_name ||
        "Unknown";

      const designation = advisor?.designation || "Advisor";

      const image =
        advisor?.profile_photo ||
        advisor?.profileImage ||
        advisor?.profile_image;

      const code =
        advisor?.Advisor_code ||
        advisor?.advisorId ||
        advisor?.advisor_id ||
        advisor?.code ||
        `PIAD00${index}`;

      dagreGraph.setNode(id, {
        width: nodeWidth,
        height: nodeHeight,
      });

      if (item.parent) {
        dagreGraph.setEdge(item.parent, id);
      }

      nodes.push({
        id,
        type: "advisorNode",

        data: {
          advisor,
          name,
          designation,
          image,
          code,

          date: advisor?.created_at
            ? new Date(advisor.created_at).toLocaleDateString()
            : "-",

          initials: name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),

          highlight:
            search && name.toLowerCase().includes(search.toLowerCase()),

          onView: (advisorDetails) => {
            setSelectedAdvisor(advisorDetails);

            setDetailsOpen(true);
          },
        },

        position: { x: 0, y: 0 },
      });

      if (item.parent) {
        edges.push({
          id: `${item.parent}-${id}`,

          source: item.parent,

          target: id,

          style: {
            stroke: "#9DB8D3",
            strokeWidth: 2,
          },
        });
      }
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,

        y: nodeWithPosition.y - nodeHeight / 2,
      };
    });

    return { nodes, edges };
  }, [paginatedAdvisors, direction, search]);

  // ======================================================
  // SEARCH CENTER
  // ======================================================

  useEffect(() => {
    if (!search || !reactFlowInstance.current) return;

    const match = nodes.find((node) =>
      node.data.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (match) {
      reactFlowInstance.current.setCenter(match.position.x, match.position.y, {
        zoom: 1.2,
        duration: 800,
      });
    }
  }, [search, nodes]);

  // ======================================================
  // LIST VIEW
  // ======================================================

  const getProfilePhotoURL = (advisor) => {
    if (!advisor?.profile_photo) return null;
    // If your API returns relative path:
    return `https://workiees.com${advisor.profile_photo}`;
    // Or, if you have an env var:
    // return `${process.env.REACT_APP_API_BASE_URL}${advisor.profile_photo}`;
  };

  // Then inside `ListView` map:

  // ======================================================
  // LIST VIEW (TABLE FORMAT)
  // ======================================================

  const ListView = () => {
    // Helper to build full image URL
    const getProfilePhotoURL = (advisor) => {
      if (!advisor?.profile_photo) return null;
      // If profile_photo is relative path like "/uploads/abc.jpg"
      return `https://workiees.com${advisor.profile_photo}`;
      // Or use env variable: `${process.env.REACT_APP_API_BASE_URL}${advisor.profile_photo}`
    };

    return (
      <div className="w-full h-full overflow-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          {/* TABLE HEADER */}
          <thead className="sticky top-0 bg-[#F8FAFC] shadow-sm z-10">
            <tr className="border-b border-gray-200">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Designation
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Advisor Code
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-gray-100">
            {paginatedAdvisors.length > 0 ? (
              paginatedAdvisors.map((advisor, index) => {
                const name =
                  advisor?.name ||
                  advisor?.full_name ||
                  advisor?.fullName ||
                  "Unknown";

                const photoURL = getProfilePhotoURL(advisor);

                const code =
                  advisor?.Advisor_code ||
                  advisor?.advisor_code ||
                  advisor?.advisorId ||
                  advisor?.advisor_id ||
                  "-";

                const joinedDate = advisor?.created_at
                  ? new Date(advisor.created_at).toLocaleDateString()
                  : "-";

                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr
                    key={advisor?._id || advisor?.id || index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* PROFILE IMAGE */}
                    <td className="py-3 px-6">
                      {photoURL ? (
                        <img
                          src={photoURL}
                          alt={name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#EEF4FB] flex items-center justify-center text-[#005596] font-bold text-lg border border-blue-100">
                          {initials}
                        </div>
                      )}
                    </td>

                    {/* NAME */}
                    <td className="py-3 px-6 font-bold text-[#111827] capitalize">
                      {name}
                    </td>

                    {/* DESIGNATION */}
                    <td className="py-3 px-6 text-[#005596] font-semibold capitalize">
                      {advisor?.designation || "-"}
                    </td>

                    {/* ADVISOR CODE */}
                    <td className="py-3 px-6 text-gray-500 font-medium font-mono text-sm">
                      {code}
                    </td>

                    {/* JOINED DATE */}
                    <td className="py-3 px-6 text-gray-500 text-sm">
                      {joinedDate}
                    </td>

                    {/* ACTION BUTTON */}
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => {
                          setSelectedAdvisor(advisor);
                          setDetailsOpen(true);
                        }}
                        className="h-10 px-5 rounded-xl bg-[#005596] text-white text-sm font-semibold hover:bg-[#00447a] transition-colors shadow-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500 font-medium"
                >
                  No advisors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const DetailItem = ({ label, value }) => (
    <div className="flex items-start justify-between gap-5 border-b border-gray-200 pb-3">
      <p className="text-sm text-gray-500 min-w-[140px]">{label}</p>

      <p className="font-semibold text-[#111827] text-right break-words capitalize">
        {value || "-"}
      </p>
    </div>
  );

  const DocumentCard = ({ title, image }) => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] object-cover"
        />
      ) : (
        <div className="w-full h-[220px] flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4">
        <h4 className="font-semibold text-center">{title}</h4>
      </div>
    </div>
  );

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-[#F4F7FB] p-5">
      {/* TOP */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setViewMode("tree")}
            className={`h-[48px] px-6 rounded-2xl font-semibold flex items-center gap-2 ${
              viewMode === "tree"
                ? "bg-[#005596] text-white"
                : "bg-white border"
            }`}
          >
            <GitBranch size={18} />
            Tree View
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`h-[48px] px-6 rounded-2xl font-semibold flex items-center gap-2 ${
              viewMode === "list"
                ? "bg-[#005596] text-white"
                : "bg-white border"
            }`}
          >
            <List size={18} />
            List View
          </button>
        </div>

        {/* SEARCH */}

        <div className="relative w-full lg:w-[380px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search advisor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[52px] rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none"
          />
        </div>
      </div>

      {/* FILTERS */}

      <div className="flex flex-wrap items-center gap-4 mb-5">
        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
          className="h-[52px] px-5 rounded-2xl border border-gray-200 bg-white"
        >
          <option value="all">All Designation</option>

          <option value="advisor">Advisor</option>

          <option value="supervisor">Supervisor</option>

          <option value="manager">Manager</option>

          <option value="senior manager">Senior Manager</option>

          <option value="chief manager">Chief Manager</option>

          <option value="director">Director</option>
        </select>

        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="h-[52px] px-5 rounded-2xl border border-gray-200 bg-white"
        >
          <option value="newest">Newest Joined</option>

          <option value="oldest">Oldest Joined</option>
        </select>

        {/* DATE PICKER */}

        <div className="bg-white rounded-2xl border border-gray-200 px-4 h-[52px] flex items-center shadow-sm">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select Joined Date"
            dateFormat="dd/MM/yyyy"
            isClearable
            className="outline-none text-sm font-medium w-[220px]"
          />
        </div>
      </div>

      {/* DIRECTION */}

      {/* CONTENT */}

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden h-[78vh]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#005596] border-t-transparent animate-spin" />
          </div>
        ) : viewMode === "tree" ? (
          <div className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              nodeTypes={nodeTypes}
              defaultViewport={{
                x: 0,
                y: 0,
                zoom: 0.7,
              }}
              onInit={(instance) => {
                reactFlowInstance.current = instance;
              }}
            >
              <MiniMap />
              <Controls />
              <Background gap={16} />
            </ReactFlow>
          </div>
        ) : (
          <ListView />
        )}
      </div>

      {/* PAGINATION */}

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-gray-500">
          Showing {paginatedAdvisors.length} of {filteredAdvisors.length}{" "}
          advisors
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="px-5 h-11 rounded-2xl bg-[#005596] text-white flex items-center justify-center font-semibold">
            {currentPage}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MODAL */}

      {detailsOpen && selectedAdvisor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div className="bg-[#005596] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Advisor Details
                </h2>

                <p className="text-blue-100 mt-1">
                  Complete profile information
                </p>
              </div>

              <button
                onClick={() => setDetailsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/20 text-white"
              >
                ✕
              </button>
            </div>

            {/* BODY */}

            <div className="p-8">
              {/* ====================================================== */
              /* COMPLETE ADVISOR DETAILS SECTION */
              /* ====================================================== */}

              {/* ====================================================== */}
              {/* PROFILE HEADER */}
              {/* ====================================================== */}

              <div className="bg-gradient-to-r from-[#005596] to-[#0A6BC2] rounded-3xl p-6 text-white mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* PROFILE IMAGE */}

                  <div className="flex justify-center md:justify-start">
                    {selectedAdvisor?.profile ||
                    selectedAdvisor?.profile_photo ? (
                      <img
                        src={
                          selectedAdvisor?.profile ||
                          selectedAdvisor?.profile_photo
                        }
                        alt={selectedAdvisor?.name}
                        className="w-28 h-28 rounded-3xl object-cover border-4 border-white/30 shadow-xl"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-3xl bg-white/20 flex items-center justify-center text-4xl font-bold border border-white/20">
                        {selectedAdvisor?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")
                          ?.slice(0, 2)
                          ?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold capitalize">
                          {selectedAdvisor?.full_name || "-"}
                        </h2>

                        <p className="text-white/80 mt-1 capitalize">
                          {selectedAdvisor?.designation || "Advisor"}
                        </p>
                      </div>

                      {/* ACTIVE BADGE */}

                      <div>
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-semibold ${
                            selectedAdvisor?.status?.toLowerCase() === "active"
                              ? "bg-green-500 text-white"
                              : selectedAdvisor?.status?.toLowerCase() ===
                                  "pending"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-500 text-white"
                          }`}
                        >
                          {selectedAdvisor?.status || "Active"}
                        </span>
                      </div>
                    </div>

                    {/* QUICK INFO */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      {/* ADVISOR CODE */}

                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <p className="text-white/70 text-sm">Advisor Code</p>

                        <h4 className="font-bold text-lg mt-1">
                          {selectedAdvisor?.Advisor_code ||
                            selectedAdvisor?.advisorId ||
                            "-"}
                        </h4>
                      </div>

                      {/* PHONE */}

                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <p className="text-white/70 text-sm">Advisor Type</p>

                        <h4 className="font-bold text-lg mt-1">
                          {selectedAdvisor?.advisor_type || "-"}
                        </h4>
                      </div>

                      {/* EMAIL */}

                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <p className="text-white/70 text-sm">Leader</p>

                        <h4 className="font-bold text-lg mt-2 capitalize text-[#fcfdff]">
                          {selectedAdvisor?.leader_name || "Admin"}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* ADD THIS IN WORK DETAILS SECTION */}
              {/* ====================================================== */}

              <DetailItem
                label="Reference Person"
                value={selectedAdvisor?.reference_person}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* ====================================================== */}
                {/* PERSONAL DETAILS */}
                {/* ====================================================== */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    Personal Details
                  </h3>

                  <div className="space-y-4">
                    <DetailItem
                      label="Application Number"
                      value={selectedAdvisor?.application_number}
                    />

                    <DetailItem
                      label="Father Name"
                      value={
                        selectedAdvisor?.father_name ||
                        selectedAdvisor?.fatherName
                      }
                    />

                    <DetailItem
                      label="Date of Birth"
                      value={
                        selectedAdvisor?.dob || selectedAdvisor?.date_of_birth
                          ? new Date(
                              selectedAdvisor?.dob ||
                                selectedAdvisor?.date_of_birth,
                            ).toLocaleDateString()
                          : "-"
                      }
                    />

                    <DetailItem label="Phone" value={selectedAdvisor?.phone} />

                    <DetailItem label="Email" value={selectedAdvisor?.email} />

                    <DetailItem
                      label="Gender"
                      value={selectedAdvisor?.gender}
                    />

                    <DetailItem
                      label="Marital Status"
                      value={selectedAdvisor?.marital_status}
                    />

                    <DetailItem
                      label="Nationality"
                      value={selectedAdvisor?.nationality}
                    />

                    <DetailItem
                      label="Occupation"
                      value={selectedAdvisor?.occupation}
                    />

                    <DetailItem
                      label="Primary Profession"
                      value={selectedAdvisor?.primary_profession}
                    />

                    <DetailItem
                      label="Qualification"
                      value={selectedAdvisor?.qualification}
                    />

                    <DetailItem
                      label="Aadhaar Number"
                      value={
                        selectedAdvisor?.aadhaar ||
                        selectedAdvisor?.aadhaar_number
                      }
                    />

                    <DetailItem
                      label="PAN Number"
                      value={
                        selectedAdvisor?.pan || selectedAdvisor?.pan_number
                      }
                    />

                    {/* FULL ADDRESS */}

                    <DetailItem
                      label="Address"
                      value={`
${selectedAdvisor?.address || ""}, 
${selectedAdvisor?.city || ""}, 
${selectedAdvisor?.state || ""} - 
${selectedAdvisor?.pincode || ""}
`}
                    />
                  </div>
                </div>
                {/* WORK DETAILS */}
                {/* ====================================================== */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    Work Details
                  </h3>

                  <div className="space-y-4">
                    {/* ====================================================== */}
                    {/* ADVISOR TYPE TOGGLE */}
                    {/* ====================================================== */}

                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div>
                        <p className="text-sm text-gray-500">Advisor Type</p>

                        <p
                          className={`font-bold text-lg mt-1 capitalize ${
                            selectedAdvisor?.advisor_type === "Full Time"
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {selectedAdvisor?.advisor_type || "-"}
                        </p>
                      </div>
                      <button
                        onClick={handleAdvisorTypeToggle}
                        className={`h-[42px] px-5 rounded-2xl text-sm font-semibold transition-all ${
                          advisorType === "Full Time"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        Switch to{" "}
                        {advisorType === "Full Time"
                          ? "Part Time"
                          : "Full Time"}
                      </button>
                    </div>
                    <DetailItem
                      label="Commission Slab"
                      value={selectedAdvisor?.slab || "5% - 12%"}
                    />

                    <DetailItem
                      label="Branch Code"
                      value={selectedAdvisor?.branch_code}
                    />

                    <DetailItem
                      label="Head Office"
                      value={selectedAdvisor?.head_office}
                    />

                    <DetailItem
                      label="Branch Location"
                      value={selectedAdvisor?.branch_location}
                    />

                    <DetailItem
                      label="Reference Person"
                      value={selectedAdvisor?.reference_person}
                    />
                  </div>
                </div>

                {/* ====================================================== */}
                {/* NOMINEE DETAILS */}
                {/* ====================================================== */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    Nominee Details
                  </h3>

                  <div className="space-y-4">
                    <DetailItem
                      label="Nominee Name"
                      value={selectedAdvisor?.nominee_name}
                    />

                    <DetailItem
                      label="Relationship"
                      value={selectedAdvisor?.nominee_relationship}
                    />

                    <DetailItem
                      label="Nominee DOB"
                      value={
                        selectedAdvisor?.nominee_dob
                          ? new Date(
                              selectedAdvisor?.nominee_dob,
                            ).toLocaleDateString()
                          : "-"
                      }
                    />
                  </div>
                </div>

                {/* ====================================================== */}
                {/* BANK DETAILS */}
                {/* ====================================================== */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    Bank Details
                  </h3>

                  <div className="space-y-4">
                    <DetailItem
                      label="Bank Name"
                      value={selectedAdvisor?.bank_name}
                    />

                    <DetailItem
                      label="Account Number"
                      value={selectedAdvisor?.account_number}
                    />

                    <DetailItem
                      label="IFSC Code"
                      value={selectedAdvisor?.ifsc_code}
                    />

                    <DetailItem
                      label="Branch Name"
                      value={selectedAdvisor?.branch_name}
                    />
                  </div>
                </div>

                {/* ====================================================== */}
                {/* LEADER DETAILS */}
                {/* ====================================================== */}

                <div className="bg-[#F8FAFC] rounded-3xl p-6 md:col-span-2">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    Leader Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-2xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500">Leader Name</p>

                      <h4 className="font-bold text-lg mt-2 capitalize text-[#111827]">
                        {selectedAdvisor?.leader_name || "Admin"}
                      </h4>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500">Leader Code</p>

                      <h4 className="font-bold text-lg mt-2 text-[#111827]">
                        {selectedAdvisor?.leader_code || "ADMIN001"}
                      </h4>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-500">
                        Leader Designation
                      </p>

                      <h4 className="font-bold text-lg mt-2 capitalize text-[#111827]">
                        {selectedAdvisor?.leader_designation || "Admin"}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-3xl p-6 md:col-span-2">
                  <h3 className="font-bold text-xl text-[#111827] mb-5">
                    KYC Documents
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* AADHAAR FRONT */}

                    <DocumentCard
                      title="Aadhaar Front"
                      image={selectedAdvisor?.addresscard_front_photo}
                    />

                    {/* AADHAAR BACK */}

                    <DocumentCard
                      title="Aadhaar Back"
                      image={selectedAdvisor?.addresscard_back_photo}
                    />

                    {/* PAN FRONT */}

                    <DocumentCard
                      title="PAN Front"
                      image={selectedAdvisor?.pancard_photo}
                    />

                    {/* PAN BACK */}

                    <DocumentCard
                      title="PAN Back"
                      image={selectedAdvisor?.pancard_back_photo}
                    />
                  </div>
                </div>
              </div>

              {/* ====================================================== */
              /* DETAIL ITEM COMPONENT */
              /* ====================================================== */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ======================================================
// EXPORT
// ======================================================

export default function TeamManagement() {
  return (
    <ReactFlowProvider>
      <TeamManagementContent />
    </ReactFlowProvider>
  );
}
