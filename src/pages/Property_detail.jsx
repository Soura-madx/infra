import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PropertyImageGallery from "../component/property-images";
import PropertyPage from "../component/PropertyDetailBox";
import SimilarPropertiesSection from "../component/SimilarProperty";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";
import PrarambhLoader from "../component/PrarambhLoader";

const Property_detail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);

  // ✅ ALWAYS FETCH PROPERTY BY ID (fixes refresh issue)
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        // 1. fetch unit
        const unitRes = await axios.get(`https://workiees.com/api/units/${id}`);
        const unit = unitRes.data.data;

        // 2. fetch project
        const projectRes = await axios.get(
          `https://workiees.com/api/projects/${unit.project_id}`,
        );
        const project = projectRes.data.data;

        // 3. normalize amenities
        const amenities = (() => {
          if (Array.isArray(project.amenities)) return project.amenities;
          if (typeof project.amenities === "string") {
            return project.amenities.split(",").map((a) => a.trim());
          }
          return [];
        })();

        // 4. set property
        setProperty({
          id: unit.id,
          project_id: unit.project_id,

          projectName: project.project_name || project.name || "N/A",
          location: unit.Location || "",
          saleCategory: unit.sale_category || "",
          towerName: unit.tower_name,
          price: Number(unit.rate_per_sqft) || 0,
          plotNo: unit.plot_number || unit.unit_number || "N/A",
          area: Number(unit.area_sqft) || 0,
          totalPrice:
            (Number(unit.area_sqft) || 0) * (Number(unit.rate_per_sqft) || 0),

          facing: unit.facing || "",
          dimension: unit.plot_dimensions || "",

          description: project.description || "",

          amenities,

          projectAddress: project.full_address || project.project_address || "",
          city: project.city || "",

          photo: unit.unit_images?.length
            ? unit.unit_images.map((img) => `https://workiees.com/${img}`)
            : ["https://via.placeholder.com/300"],
        });
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ✅ FETCH SIMILAR PROPERTIES
  useEffect(() => {
    if (!property?.project_id) return;

    const fetchSimilarProperties = async () => {
      try {
        const res = await axios.get(
          `https://workiees.com/api/units?project_id=${property.project_id}`,
        );

        const units = res.data?.data || [];

        const mapped = units
          .filter((u) => u.id !== property.id)
          .slice(0, 5)
          .map((unit) => ({
            id: unit.id,
            project_id: unit.project_id,

            projectName: unit.project_name || property.projectName || "N/A",

            location: unit.location || property.location || "",

            unitNumber: unit.unit_number || unit.plot_number || "N/A",

            towerName: unit.tower_name || "",

            ratePerSqft: Number(unit.rate_per_sqft) || 0,
            areaSqft: Number(unit.area_sqft) || 0,

            totalPrice:
              (Number(unit.area_sqft) || 0) * (Number(unit.rate_per_sqft) || 0),

            photo: unit.unit_images?.length
              ? unit.unit_images.map((img) => `https://workiees.com/${img}`)
              : ["https://via.placeholder.com/300"],
          }));

        setSimilarProperties(mapped);
      } catch (err) {
        console.error("Error fetching similar properties:", err);
      }
    };

    fetchSimilarProperties();
  }, [property?.project_id, property?.id]);

  if (loading) {
    return <PrarambhLoader/>
  }

  if (!property) {
    return <p className="text-center mt-20">Not Found</p>;
  }

  const galleryImages = property.photo.map((img, index) => ({
    src: img,
    type: img.includes(".mp4") ? "video" : "image",
    alt: `${property.projectName} ${index + 1}`,
    label: property.projectName,
  }));

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

        {/* ✅ SIMILAR PROPERTIES */}
        {similarProperties.length > 0 && (
          <SimilarPropertiesSection
            properties={similarProperties}
            images={galleryImages}
            title={property.projectName}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Property_detail;
