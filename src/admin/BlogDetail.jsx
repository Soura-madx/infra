import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
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

  // DELETE BLOG
  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://workiees.com/api/blogs/delete/${id}`
    );

    alert("Blog deleted successfully!");
    navigate("/admin/blog");
  } catch (err) {
    console.error(err);
    alert("Failed to delete blog");
  }
};

  if (loading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Back */}
      <button
        onClick={() => navigate("/admin/blog")}
        className="mb-4 text-blue-600"
      >
        ← Back to Blogs
      </button>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Image */}
        <img
          src={`https://workiees.com/${blog.image}`}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-3">
            {blog.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {blog.description}
          </p>

          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>Status: {blog.status}</span>
            <span>Publish: {blog.publish_date}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/admin/edit-blogs/${blog.id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;