// src/components/PropertyImageGallery.jsx
import React, { useState, useEffect } from "react";
import {
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

const PRIMARY_BLUE = "#005596";

export default function PropertyImageGallery({
  images,
  title = "Property",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

   useEffect(() => {
    const handleKey = (e) => {
      if (!previewOpen) return;

      if (e.key === "Escape") {
        setPreviewOpen(false);
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [previewOpen]);


  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  const handleThumbClick = (index) => {
    if (index === activeIndex) return;

    setFade(true);

    setTimeout(() => {
      setActiveIndex(index);
      setFade(false);
    }, 120);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this property: ${title}`,
        url: window.location.href,
      });
    } else {
      alert("Share this link: " + window.location.href);
    }
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

 
  const renderVideo = (url) => {
    if (!url) return null;

    // YouTube (watch?v=)
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="h-full w-full"
          allowFullScreen
          title="Project Video"
        />
      );
    }

    // YouTube short (youtu.be)
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="h-full w-full"
          allowFullScreen
          title="Project Video"
        />
      );
    }

    // Direct video file
    return (
      <video controls className="h-full w-full object-cover">
        <source src={`https://workiees.com/${url}`} type="video/mp4" />
      </video>
    );
  };

  return (
    <>
      <section className="w-full rounded-xl bg-gray-100 px-3 sm:px-4 py-4 sm:py-5 shadow-[0_1px_3px_rgba(15,23,42,0.45)]">
        {/* Main Image */}
        <div className="rounded-xl bg-slate-800 overflow-hidden border border-slate-700 relative">
          <div
            className={`relative h-60 sm:h-72 md:h-80 lg:h-[420px] transition-opacity duration-150 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {current.type === "video" ? (
              renderVideo(current.src)
            ) : (
              <img
                src={current.src}
                alt={current.alt}
                onClick={() => setPreviewOpen(true)}
                className="h-full w-full object-cover cursor-zoom-in"
              />
            )}

            {/* Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

            {/* Top Right Buttons */}
            <div className="absolute top-4 right-4 flex gap-3 z-20">
              {/* Zoom Button */}
              {current.type !== "video" && (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="group h-11 w-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <ZoomIn
                    size={20}
                    className="text-slate-700 group-hover:text-[#005596]"
                  />
                </button>
              )}

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="group h-11 w-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Share2
                  size={20}
                  className="text-slate-700 group-hover:text-[#005596]"
                />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-3 py-1 text-[11px] text-white font-medium">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: PRIMARY_BLUE }}
                  />
                  {activeIndex + 1} of {images.length}
                </span>

                {current.label && (
                  <span className="rounded-md bg-black/60 px-3 py-1 text-[11px] text-white font-medium">
                    {current.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4">
          <div
            className="
              flex gap-3 py-1
              overflow-x-auto
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {images.map((img, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleThumbClick(idx)}
                  className={`flex-none w-24 sm:w-28 md:w-32 rounded-xl border bg-white overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "border-[#005596] shadow-lg scale-[1.03]"
                      : "border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="h-20 w-full overflow-hidden">
                    {img.type === "video" ? (
                      <div className="h-full w-full flex items-center justify-center bg-black text-white text-xs">
                        🎥 Video
                      </div>
                    ) : (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="px-2 py-2">
                    <p className="text-[11px] font-semibold text-slate-800 truncate">
                      {img.label || `Image ${idx + 1}`}
                    </p>

                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Tap preview
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL SCREEN PREVIEW */}
      {previewOpen && current.type !== "video" && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setPreviewOpen(false)}
            className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition"
          >
            <X size={22} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Main Preview Image */}
          <div className="w-full h-full flex items-center justify-center p-4 md:p-10">
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition"
          >
            <ChevronRight size={28} />
          </button>

          {/* Bottom Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}