import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';

import { Link } from 'react-router-dom';

const PRIMARY = '#005596';
const ACCENT = '#f58025';

const Footer = () => {
  return (
    <footer className="w-full bg-[#061927] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Top strip: tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <h2 className="text-lg font-semibold tracking-wide">
            Prarambh Infra – Real Estate Marketing Partners
          </h2>
          <p className="text-xs text-blue-100 max-w-xl">
            Helping developers and brokers market projects with structured campaigns,
            transparent reporting and on-ground sales coordination.
          </p>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-8">
          {/* Column 1: Brand Identity */}
          <div className="space-y-4">
            <img
              src="/assets/logo.png"
              alt="Prarambh Infra Logo"
              className="h-12 w-auto "
            />
            <p className="text-sm text-blue-100 leading-relaxed">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#f58025]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f58025]" />
                RERA Registered Company
              </span>
              <br />
              Elevating property marketing standards across Indore and Ujjain with
              structured digital campaigns and verified projects.
            </p>

            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-[#f58025] hover:border-[#f58025] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#f58025] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link to={"/about-us"} className="hover:text-[#f58025] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/property"} className="hover:text-[#f58025] transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to={"/blog"} className="hover:text-[#f58025] transition-colors">
                  Real Estate Blog
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="hover:text-[#f58025] transition-colors">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-[#f58025] font-medium mt-2"
                >
                  <Star size={16} fill={ACCENT} />
                  Rate us on Google
                </a>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Properties */}
          {/* <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-blue-100 mb-4">
              Properties
            </h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a href="#" className="hover:text-[#f58025] transition-colors">
                  New Projects in Ujjain
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58025] transition-colors">
                  Residential Plots Indore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58025] transition-colors">
                  Divine Valley Listings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58025] transition-colors">
                  Commercial Spaces Ujjain
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f58025] transition-colors">
                  Rishi Nagar Properties
                </a>
              </li>
            </ul>
          </div> */}

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-[#f58025] mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#f58025] shrink-0 mt-0.5" />
                <p>
                  A-115, First Floor, Divine Valley, Rishi Nagar,
                  Ujjain 456010
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#f58025] shrink-0" />
                <a href="tel:+916232908887" className="hover:text-[#f58025]">
                  +91 6232908887
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#f58025] shrink-0" />
                <a
                  href="mailto:infoprarambhinfra@gmail.com"
                  className="hover:text-[#f58025]"
                >
                  infoprarambhinfra@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Clock size={16} className="text-[#f58025] shrink-0" />
                <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

         
          {/* Column 5: Newsletter (horizontal style) */}
{/* <div className="lg:col-span-2">
  <h3 className="text-sm font-semibold tracking-wide uppercase text-blue-100 mb-3">
    Stay Updated
  </h3>
  <p className="text-xs text-blue-100 mb-3">
    Get updates on new projects, offers and site visit schedules in Indore & Ujjain.
  </p>

  <form
    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/5 border border-white/10 rounded-sm sm:rounded-full px-2 py-1.5"
    onSubmit={(e) => {
      e.preventDefault();
      // handle newsletter submit
    }}
  >
    <div className="relative flex-1">
      <Mail
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200"
      />
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="w-full bg-transparent text-xs text-white placeholder:text-blue-300 pl-9 pr-3 py-2.5 focus:outline-none"
      />
    </div>
    <button
      type="submit"
      className="shrink-0 px-5 py-2.5 rounded-sm sm:rounded-full bg-[#f58025] text-xs font-semibold tracking-wide hover:bg-[#ff953e] transition-colors"
    >
      Subscribe
    </button>
  </form>

  <p className="text-[10px] text-blue-300 mt-2">
    No spam. Only project alerts and important real estate updates.
  </p>
</div> */}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 mt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-blue-200">
          <p>
            © {new Date().getFullYear()} Prarambh Infra. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to={"/privacypolicy"} className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to={"/termcondition"} className="hover:text-white">
              Term and Condition
            </Link>
            <span className="inline-flex items-center gap-1 text-[#f58025]">
              <span className="h-1 w-1 rounded-full bg-[#f58025]" />
              RERA No: [ A-UJN-25-2120 ]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
