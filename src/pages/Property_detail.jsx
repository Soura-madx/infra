import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import PropertyImageGallery from "../component/property-images";
import PropertyPage from "../component/PropertyDetailBox";
import SimilarPropertiesSection from "../component/SimilarProperty";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";

const Property_detail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [property, setProperty] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [similarProperties, setSimilarProperties] = useState([]);
useEffect(() => {
  if (!property?.project_id) return; // ✅ important guard

  const fetchSimilarProperties = async () => {
    try {
      console.log("Fetching similar for project:", property.project_id);

      const res = await axios.get(
        `https://workiees.com/api/units?project_id=${property.project_id}`
      );

      console.log("API response:", res.data);

      const units = res.data?.data || [];

      if (!units.length) {
        console.warn("No similar units found");
      }

      const mapped = units
        .filter((u) => u.id !== property.id)
        .slice(0, 5)
        .map((unit) => ({
          id: unit.id,
          project_id: unit.project_id,

          projectName: property.projectName,
          location: unit.location || "",

          unitNumber: unit.unit_number || unit.plot_number || "N/A",
          towerName: unit.tower_name,

          ratePerSqft: Number(unit.rate_per_sqft) || 0,
          areaSqft: Number(unit.area_sqft) || 0,

          totalPrice:
            (Number(unit.area_sqft) || 0) *
            (Number(unit.rate_per_sqft) || 0),

          photo: unit.unit_images?.length
            ? unit.unit_images.map(
                (img) => `https://workiees.com/${img}`
              )
            : ["https://via.placeholder.com/300"],
        }));

      console.log("Mapped similar:", mapped);

      setSimilarProperties(mapped);
    } catch (err) {
      console.error("Error fetching similar properties:", err);
    }
  };

  fetchSimilarProperties();
}, [property?.project_id]); // ✅ better dependency

  // ✅ fallback if user opens directly
  useEffect(() => {
    if (!property) {
      const fetchProperty = async () => {
        try {
          // 1. get unit
          const unitRes = await axios.get(
            `https://workiees.com/api/units/${id}`,
          );
          const unit = unitRes.data.data;

          // 2. get project
          const projectRes = await axios.get(
            `https://workiees.com/api/projects/${unit.project_id}`,
          );
          const project = projectRes.data.data;

          // 3. map SAME as listing page
          const mapped = {
            id: unit.id,
            project_id: unit.project_id,

            projectName: project.project_name || project.name || "N/A",
            projectAddress:
              project.full_address || project.project_address || "",
            city: project.city || "",

            location: unit.location || "",

            unitNumber: unit.unit_number || unit.plot_number || "N/A", // ✅ fixed

            towerName: unit.tower_name,
            dimension: unit.plot_dimensions,

            ratePerSqft: Number(unit.rate_per_sqft) || 0,
            areaSqft: Number(unit.area_sqft) || 0,

            totalPrice:
              (Number(unit.area_sqft) || 0) * (Number(unit.rate_per_sqft) || 0),

            facing: unit.facing,

            photo: unit.unit_images?.length
              ? unit.unit_images.map((img) => `https://workiees.com/${img}`)
              : ["https://via.placeholder.com/300"],
          };
          setProperty(mapped);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id, property]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!property) return <p className="text-center mt-20">Not Found</p>;

  const galleryImages = [
    {
      src: property.photo,
      label: property.projectName,
    },
  ];

  return (
    <div>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-8">
        <div className="mt-20" />

        <PropertyImageGallery
          images={galleryImages}
          title={property.projectName}
        />

        {/* ✅ MAIN DETAIL BOX */}
        <PropertyPage property={property} />

        {similarProperties.length > 0 && (
  <SimilarPropertiesSection properties={similarProperties} />
)}
       
      </main>

      <Footer />
    </div>
  );
};

export default Property_detail;
