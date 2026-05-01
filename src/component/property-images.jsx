// src/components/PropertyImageGallery.jsx
import React, { useState } from "react";
import { Share2, Heart } from "lucide-react";

const PRIMARY_BLUE = "#005596";
const ACCENT_ORANGE = "#F7941D";

export default function PropertyImageGallery({ images, title = "Property" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [liked, setLiked] = useState(false);

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
    <section className="w-full rounded-md bg-gray-100 px-3 sm:px-4 py-4 sm:py-5 shadow-[0_1px_3px_rgba(15,23,42,0.45)]">
      {/* Main image */}
      <div className="rounded-md bg-slate-800 overflow-hidden border border-slate-700 relative">
        <div
          className={`relative h-60 sm:h-72 md:h-80 lg:h-[360px] transition-opacity duration-150 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {current.type === "video" ? (
            renderVideo(current.src)
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              className="h-full w-full object-cover"
            />
          )}

          {/* Top overlay: Like + Share buttons */}
          <div className="absolute top-4 right-4 flex  gap-2 sm:gap-3">
            {/* Share button */}
            <button
              type="button"
              onClick={handleShare}
              className="
        group relative
        h-10 w-10 sm:h-11 sm:w-11 rounded-full
        bg-white/90 backdrop-blur-md border border-slate-200
        flex items-center justify-center
        shadow-[0_4px_12px_rgba(0,0,0,0.05)]
        hover:bg-white hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
        transition-all duration-300 ease-in-out
        active:scale-90
      "
              aria-label="Share Property"
            >
              <Share2
                size={20}
                strokeWidth={2.2}
                className="text-slate-600 transition-colors group-hover:text-[#005596]"
              />

              {/* Subtle Tooltip for Desktop */}
              <span className="absolute -bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-lg font-bold tracking-widest pointer-events-none shadow-xl">
                SHARE
              </span>
            </button>
          </div>

          {/* Bottom overlay: Photo counter + label + possession status */}
          <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2.5 py-1 text-[11px] text-slate-100/90 font-medium">
                <span
                  className="h-1.5 w-1.5 rounded-md"
                  style={{ backgroundColor: PRIMARY_BLUE }}
                />
                {activeIndex + 1} of {images.length}
              </span>
              {current.label && (
                <span className="rounded-md bg-black/60 px-2.5 py-1 text-[11px] text-slate-100/90 font-medium">
                  {current.label}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails strip */}
      <div className="mt-4">
        <div
          className="
            flex gap-2 sm:gap-3 py-1
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
                className={`flex-none w-24 sm:w-28 md:w-32 text-left rounded-md border bg-white/95 overflow-hidden transition-all
                  ${
                    isActive
                      ? "border-[#005596] shadow-md"
                      : "border-slate-200 shadow-md hover:border-slate-300"
                  }`}
              >
                <div className="h-14 sm:h-16 w-full">
                  {img.type === "video" ? (
                    <div className="h-full w-full flex items-center justify-center bg-black text-white text-xs">
                      🎥 Video
                    </div>
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-40 object-cover"
                    />
                  )}
                </div>
                <div className="px-2.5 py-1.5">
                  <p className="text-[10px] font-medium text-slate-900 truncate">
                    {img.label || `Image ${idx + 1}`}
                  </p>
                  <p className="text-[9px] text-slate-500">Tap preview</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
