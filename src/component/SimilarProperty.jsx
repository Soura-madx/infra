import React from "react";
import { useNavigate } from "react-router-dom";

const SimilarPropertiesSection = ({ properties = [] }) => {
  const navigate = useNavigate();

  if (!properties.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Similar Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {properties.slice(0, 5).map((prop) => (
          <div
            key={prop.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() =>
              navigate(`/property/${prop.id}`, { state: prop })
            }
          >
            {/* Image */}
            <img
              src={prop.photo?.[0]}
              alt={prop.projectName}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-semibold truncate">
                {prop.projectName}
              </h3>

              <p className="text-xs text-gray-500 truncate">
                {prop.location}
              </p>

              <p className="text-xs">
                Unit: {prop.unitNumber}
              </p>

              <p className="text-xs">
                Area: {prop.areaSqft} sqft
              </p>

              <p className="text-sm font-bold text-green-600">
                ₹ {prop.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarPropertiesSection;