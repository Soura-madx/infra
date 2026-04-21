import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publish_date: "",
    status: "Active",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch existing blog data
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `https://workiees.com/api/blogs/${id}`
      );

      const blog = res.data?.data;

      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        publish_date: blog.publish_date || "",
        status: blog.status || "Active",
      });

      setPreview(`https://workiees.com/${blog.image}`);
    } catch (err) {
      console.error(err);
      alert("Error loading blog");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("publish_date", formData.publish_date);
      data.append("status", formData.status);

      if (image) {
        data.append("image", image);
      }

      await axios.post(
        `https://workiees.com/api/blogs/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog updated successfully!");
      navigate(`/admin/blogs/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Publish Date */}
        <div>
          <label className="block mb-1 font-medium">Publish Date</label>
          <input
            type="date"
            name="publish_date"
            value={formData.publish_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Image Preview */}
        {preview && (
          <div>
            <p className="mb-2 font-medium">Current Image</p>
            <img
              src={preview}
              alt="preview"
              className="h-40 rounded object-cover"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Change Image
          </label>
          <input
            type="file"
            className = "block w-full mb-1 font-medium flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition"
            onChange={handleImageChange}
            
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/admin/blogs/${id}`)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;