// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV_BG = "#005596";
const ACCENT = "#F7941D";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseClasses =
    "fixed top-0 left-0 w-full z-50 transition-all duration-300";
  const scrolledClasses = isScrolled
    ? "bg-[#f0f4f7] backdrop-blur-xl border-b border-slate-100 shadow-sm py-2"
    : "bg-[#fefeff] border-b border-slate-100 py-3";

  return (
    <header className={`${baseClasses} ${scrolledClasses}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <NavLink to="/">
            <div className="flex items-center justify-center rounded-md   p-1.5">
              <img
                src="/assets/logo.png"
                alt="Prarambh Infra"
                className="h-9 w-auto"
              />
            </div>
          </NavLink>

          <div className="flex flex-col leading-tight">
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ color: NAV_BG }}
            >
              Prarambh Infra
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
              Real Estate Marketer
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 lg:flex cursor-pointer">
          <NavItemLink to="/">Home</NavItemLink>
          <Dropdown
            label="About Us"
            tagline="Know our story"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            columns={[
              [
                {
                  label: "overview",
                  to: "/about-us#overview",
                },

                {
                  label: "Teams",
                  to: "/about-us#teams",
                },
                {
                  label: "Mission & Vision",
                  to: "/about-us#mission-vision",
                },
              ],
              [
                {
                  label: "Why Choose Us",
                  to: "/about-us#why-choose-us",
                },
              ],
            ]}
          />

          <NavItemLink to="/projects">project</NavItemLink>
          <NavItemLink to="/property">property</NavItemLink>
          <NavItemLink to="/blog">Blog</NavItemLink>
          <NavItemLink to="/career">Cereer</NavItemLink>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact-us"
            className="hidden lg:inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-150"
            style={{
              background: `linear-gradient(135deg, ${NAV_BG}, #005596)`,
            }}
          >
            Contact
          </Link>

          {/* Mobile toggle */}
          <button
            className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 lg:hidden bg-white/80"
            style={{ color: NAV_BG }}
            onClick={() => setMobileOpen((p) => !p)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current rounded-md transition-transform ${
                  mobileOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current rounded-md transition-opacity ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current rounded-md transition-transform ${
                  mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="border-t border-slate-100 bg-white/98 backdrop-blur-xl px-4 pb-4 pt-3 text-sm font-medium shadow-sm space-y-1">
            <NavLink
              to="/"
              className="block w-full py-2 text-left text-slate-800 pl-3 md:pl-0"
              style={{ color: NAV_BG }}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>
            <MobileGroup
              label="About Us"
              items={[
                { label: "Overview", to: "/about-us#overview" },
                { label: "Mission & Vision", to: "/about-us#mission-vision" },
                { label: "Teams", to: "/about-us#teams" },
                { label: "Collabs", to: "/about-us#collabs" },
                { label: "Achievements", to: "/about-us#achievements" },
                { label: "Testimonials", to: "/about-us#testimonials" },
              ]}
              onItemClick={() => setMobileOpen(false)}
            />
            <MobileGroup
              label="Projects"
              items={[
                { label: "Upcoming", to: "/projects#upcoming" },
                { label: "Ongoing", to: "/projects#ongoing" },
                { label: "Completed", to: "/projects#completed" },
              ]}
              onItemClick={() => setMobileOpen(false)}
            />
            <NavLink
              to="/property"
              className="block w-full py-2 text-left text-slate-800 pl-3 md:pl-0"
              style={{ color: NAV_BG }}
              onClick={() => setMobileOpen(false)}
            >
              Property
            </NavLink>
            <NavLink
              to="/blog"
              className="block w-full py-2 text-left text-slate-800 pl-3 md:pl-0"
              style={{ color: NAV_BG }}
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/career"
              className="block w-full py-2 text-left text-slate-800 pl-3 md:pl-0"
              style={{ color: NAV_BG }}
              onClick={() => setMobileOpen(false)}
            >
              career
            </NavLink>
            <NavLink
              to="/contact-us"
              className="block w-full py-2 text-left text-slate-800 pl-3 md:pl-0"
              style={{ color: NAV_BG }}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

/* Simple nav item */
function NavItemLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative text-sm font-medium transition-colors px-1 py-2",
          isActive
            ? "text-[rgb(194,115,30)]"
            : "text-slate-700 hover:text-slate-900",
        ].join(" ")
      }
      end
    >
      <span>{children}</span>
    </NavLink>
  );
}

/* Professional mega-style dropdown */
function Dropdown({ label, columns, openDropdown, setOpenDropdown }) {
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const isOpen = openDropdown === label;

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 200);
    setHoverTimeout(timeout);
  };

  return (
    <div
      className="relative h-full p-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 cursor-pointer  h-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
        <span>{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 top-full mt-1  w-[150px] lg:w-[200px] -translate-x-1/2 rounded-md bg-white/98 shadow-2xl ring-1 ring-slate-100 origin-top transform transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, ${NAV_BG}, ${ACCENT})`,
          }}
        />

        <div className="grid grid-cols-1 gap-1 px-3 py-2">
          {columns.map((col, colIdx) => (
            <ul key={colIdx} className="space-y-1">
              {col.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "flex shrink-3 gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                        "hover:bg-slate-200",
                        isActive ? "text-slate-700" : "text-slate-700",
                      ].join(" ")
                    }
                  >
                    <div className="flex flex-col ">
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Mobile dropdown group */
function MobileGroup({ label, items, onItemClick }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-md bg-slate-50/40">
      <button
        className="flex w-full items-center justify-between px-3 py-2"
        onClick={() => setOpen((p) => !p)}
        style={{ color: NAV_BG }}
      >
        <span className="text-sm font-medium">{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-3 pb-2">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="block w-full py-1.5 pl-2 text-left text-[13px] text-slate-700"
              onClick={onItemClick}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
