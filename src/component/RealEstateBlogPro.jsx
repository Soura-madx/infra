import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Clock,
  User,
  ChevronRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";
import PrarambhLoader from "./PrarambhLoader";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchAllBlogs();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://workiees.com/api/blogs/${id}`
      );
      setBlog(res.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(
        `https://workiees.com/api/blogs`
      );
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const similarBlogs = blogs
    .filter((b) => b.id !== parseInt(id))
    .slice(0, 3);

  if (loading) {
    return (
      <div>
        <Navbar />
        <PrarambhLoader/>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Navbar />
        <p className="mt-24 text-center">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[420px] max-w-7xl mx-auto md:mt-30 overflow-hidden">
        <img
          src={`https://workiees.com/${blog.image}`}
          alt={blog.title}
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-4xl w-full px-4 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb-4 text-sm opacity-80 hover:opacity-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-sm opacity-90">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {blog.publish_date}
            </span>

            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              Admin
            </span>

            <span className="px-3 py-1 bg-[#f58025] rounded-full text-xs font-medium">
              {blog.status}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
          {blog.description}
        </div>
      </div>

      {/* SIMILAR BLOGS */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Related Articles
          </h2>

          {/* <button
            onClick={() => navigate("/blogs")}
            className="text-sm text-[#005596] hover:text-[#f58025] flex items-center"
          >
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </button> */}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {similarBlogs.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/blog/${item.id}`)}
              className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="overflow-hidden">
                <img
                  src={`https://workiees.com/${item.image}`}
                  alt={item.title}
                  className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500 mb-2">
                  {item.publish_date}
                </p>

                <h3 className="font-semibold text-slate-800 group-hover:text-[#005596] line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <button
          onClick={() => navigate("/blog")}
          className="bg-[#f58025] text-white px-8 py-3 rounded-full shadow hover:shadow-lg hover:scale-105 transition"
        >
          Explore More Articles
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;