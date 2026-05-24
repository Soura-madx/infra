import React, { useState, useEffect } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Home,
  Users,
  Bell,
  CalendarCheck,
  FileText,
  Award,
  LogOut,
  Trophy,
  Calculator,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Determine Context based on URL
  const isAdminPath = location.pathname.startsWith("/admin");
  const basePath = isAdminPath ? "/admin" : "/advisor";

  // 2. State for Project tracking - ensure this matches App.js route paths
  // If App.js has path="project", this should be `${basePath}/project`
  const [lastProjectPath, setLastProjectPath] = useState(`${basePath}/project`);

  useEffect(() => {
    // Only update if we are actually inside a project sub-route
    if (location.pathname.includes(`${basePath}/project/`)) {
      setLastProjectPath(location.pathname);
    }
  }, [location.pathname, basePath]);

  // 3. Authentication & User Data
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSignOut = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    // 5. Force a reload (optional) to ensure all states are wiped clean
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div
      className="flex h-screen bg-[#F8F9FA] overflow-hidden"
      style={{ fontFamily: "'Varela Round', sans-serif" }}
    >
      {/* SIDEBAR */}
      <aside
        className={`w-64 flex flex-col p-6 border-r border-gray-100 h-full transition-colors duration-500 ${isAdminPath ? "bg-[#005596]" : "bg-[#f58025]"}`}
      >
        <div className="flex flex-col items-center mb-8 border-b border-white/20 pb-8 text-white">
          <div className="relative mb-4">
            <img
              src={user.image || "/assets/images/bhanu.jpeg"}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/30 shadow-lg"
              alt="Profile"
            />
            <div className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h2 className="font-bold text-base uppercase tracking-tight text-center">
            {user.name || "User Name"}
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
            {isAdminPath ? "System Administrator" : "Senior Adviser"}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {/* Use 'end' on the dashboard link to prevent it from staying active on all sub-routes */}
          <SidebarNavLink
            to={basePath}
            icon={<Home size={16} />}
            label="Dashboard"
            end
          />

          {isAdminPath ? (
            <>
              <SidebarNavLink
                to={`${basePath}/document-management`}
                icon={<ShieldCheck size={16} />}
                label="Doc Management"
              />
              {/* Ensure /admin/advisors exists in App.js or remove this */}
              <SidebarNavLink
                to={`${basePath}/pending_advisors`}
                icon={<Users size={16} />}
                label="ADVISOR APPROVAL"
              />
            </>
          ) : (
            <SidebarNavLink
              to={`${basePath}/document`}
              icon={<FileText size={16} />}
              label="Document View"
            />
          )}

          <SidebarNavLink
            to={`${basePath}/contests`}
            icon={<Award size={16} />}
            label="CONTEST"
          />
         
          <SidebarNavLink
            to={`${basePath}/installments`}
            icon={<CalendarCheck size={16} />}
            label="UPCOMING INSTALLMENTS"
          />
          <SidebarNavLink
            to={`${basePath}/blog`}
            icon={<CalendarCheck size={16} />}
            label="BLOG"
          />
          <SidebarNavLink
            to={`${basePath}/recruitment`}
            icon={<Calculator size={16} />}
            label="RECRUITMENT MANAGEMENT"
          />
          <SidebarNavLink
            to={`${basePath}/leaderboard`}
            icon={<Trophy size={16} />}
            label="Leaderboard"
          />
          <SidebarNavLink
            to={`${basePath}/notifications`}
            icon={<Bell size={16} />}
            label="Notifications"
          />
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-white hover:text-red-200 pt-6 mt-auto border-t border-white/20 transition-all active:scale-95"
        >
          <LogOut size={16} />
          <span className="text-xs font-black uppercase tracking-widest">
            Sign Out
          </span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`${isAdminPath ? "bg-[#f58025]" : "bg-[#005596]"} px-10 pt-6 flex justify-between items-end h-20 shrink-0 transition-colors duration-500`}
        >
          <div className="flex gap-8">
            {[
              { name: "Home", path: basePath, end: true },
              { name: "Profile", path: `${basePath}/profile`, end: false },
              { name: "Project", path: lastProjectPath, end: false },
              { name: "Sell", path: `${basePath}/sell`, end: false },
              { name: "Team", path: `${basePath}/team`, end: false },
            ].map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                end={tab.end}
                className="relative pb-4 text-sm font-bold uppercase tracking-widest transition-colors outline-none"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={
                        isActive
                          ? "text-white scale-105"
                          : "text-white/50 hover:text-white/80"
                      }
                    >
                      {tab.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="topUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-white rounded-t-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Link
              to={`${basePath}/notifications`}
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-slate-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const SidebarNavLink = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
      ${
        isActive
          ? "bg-white/20 text-white shadow-lg backdrop-blur-sm scale-[1.02]"
          : "text-white/60 hover:text-white hover:bg-white/10"
      }
    `}
  >
    <span className="transition-transform group-hover:scale-110 group-active:scale-90">
      {icon}
    </span>
    <span className="text-[11px] font-black uppercase tracking-widest">
      {label}
    </span>
  </NavLink>
);

export default Layout;
