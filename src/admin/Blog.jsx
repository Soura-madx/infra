import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrarambhLoader from "../component/PrarambhLoader";

const API_URL = "https://workiees.com/api/blogs";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  // Fetch Data
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter + Search
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? blog.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  // Pagination Logic
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="header flex justify-between ">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/admin/add-blog")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Create Blog
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Loader */}
      {loading && <PrarambhLoader/>}

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/admin/blogs/${blog.id}`)}
            className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden"
          >
            <img
              src={`https://workiees.com/${blog.image}`}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{blog.title}</h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {blog.description}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-medium">{blog.status}</span>

                <span className="text-gray-500">{blog.publish_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Data */}
      {!loading && currentBlogs.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No blogs found</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
