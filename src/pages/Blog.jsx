import React, { useEffect, useState, useMemo } from "react";
import {
  ArrowRight,
  Search,
  Clock,
  ChevronRight,
  User,
  Loader2,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";

const API_URL = "https://workiees.com/api/blogs";

const RealEstateBlogPro = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
      else if (b.status) set.add(b.status);
    });
    return ["All", ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const categoryValue = blog.category || blog.status || "Other";

      const matchesCategory =
        activeCategory === "All" || activeCategory === categoryValue;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, activeCategory]);

  const featured = filteredBlogs[0];
  const restBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <div className="mt-20" />

      <main className="max-w-7xl mx-auto px-4 py-14">

        {/* HEADER */}
        <section className="mb-14 text-center">
          <p className="text-xs tracking-widest uppercase text-[#f58025] font-semibold mb-3">
            Prarambh Infra 
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Real Estate{" "}
            <span className="text-[#005596]">Growth Blog</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-sm md:text-base">
            Learn how to generate leads, build trust, and sell properties faster
            with proven digital strategies.
          </p>

          {/* SEARCH */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-5 pr-10 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-[#f58025] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </section>

        {/* CATEGORY FILTER */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs rounded-full border transition ${
                activeCategory === cat
                  ? "bg-[#005596] text-white border-[#005596]"
                  : "bg-white border-gray-200 hover:border-[#f58025] hover:text-[#f58025]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-6 h-6 text-[#f58025]" />
          </div>
        )}

        {!loading && (
          <>
            {/* FEATURED HERO */}
            {featured && (
              <section className="mb-16">
                <Link
                  to={`/blog/${featured.id}`}
                  className="relative block rounded-2xl overflow-hidden group shadow-lg"
                >
                  <img
                    src={`https://workiees.com/${featured.image}`}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-widest mb-2">
                      Featured Article
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                      {featured.title}
                    </h2>

                    <div className="flex items-center text-xs gap-4 opacity-90">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {featured.publish_date}
                      </span>
                      <span>Admin</span>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* BLOG GRID */}
            <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {restBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* IMAGE */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={`https://workiees.com/${blog.image}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {blog.publish_date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#005596] line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center text-gray-500">
                        <User className="w-3 h-3 mr-1 text-[#f58025]" />
                        Admin
                      </div>

                      <span className="text-[#f58025] flex items-center font-medium">
                        Read
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {/* EMPTY STATE */}
            {filteredBlogs.length === 0 && (
              <div className="text-center mt-16">
                <p className="text-gray-500 mb-4">
                  No blogs found
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-4 py-2 border rounded-full text-sm hover:border-[#f58025] hover:text-[#f58025]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RealEstateBlogPro;