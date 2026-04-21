import React, { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amit Sharma",
    role: "Home Buyer – Rishi Nagar, Ujjain",
    image: "/assets/images/testimonial1.jpg",
    text: "प्रारंभ इंफ्रा ने खरीदने का पूरा प्रोसेस आसान बना दिया – साइट विज़िट से लेकर रजिस्ट्रेशन तक, सब कुछ ट्रांसपेरेंट और अच्छे से समझाया गया",
    rating: 5,
  },
  {
    name: "Neha Patel",
    role: "Investor – Dewas Road",
    image: "/assets/images/testimonal2.jpg",
    text: "अप्रूवल और रियलिस्टिक रिटर्न की साफ़ जानकारी ने मुझे उनके टाउनशिप प्रोजेक्ट में भरोसे के साथ इन्वेस्टमेंट का फ़ैसला लेने में मदद की।",
    rating: 5,
  },
  {
    name: "Meena Verma",
    role: "Channel Partner – Ujjain & Indore",
    image: "/assets/images/testimonial3.jpg",
    text: "एक पार्टनर के तौर पर, मुझे अच्छा मार्केटिंग सपोर्ट और ईमानदार इन्वेंट्री अपडेट मिलते हैं, जिससे मेरे अपने क्लाइंट्स को सर्विस देना आसान हो जाता है।",
    rating: 4,
  },
];

export default function Testimonial3DDark() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () =>
    setActive((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));

  return (
    <section className="bg-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f58025] mb-1">
            Testimonials
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            What our clients say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Real experiences from buyers, investors and channel partners
            associated with Prarambh Infra.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative h-110 sm:h-118 w-full max-w-2xl flex items-center justify-center overflow-x-hidden md:overflow-visible perspective-[1200px]">
              {TESTIMONIALS.map((t, index) => {
                const offset = index - active;

                let translateX = 0;
                let rotateY = 0;
                let scale = 1;
                let zIndex = 0;
                let opacity = 1;

                if (isMobile) {
                  // Mobile: only active card, centered
                  if (offset === 0) {
                    translateX = 0;
                    rotateY = 0;
                    scale = 1;
                    zIndex = 30;
                    opacity = 1;
                  } else {
                    opacity = 0;
                    zIndex = 0;
                  }
                } else {
                  // Desktop / tablet: 3D effect
                  if (offset === 0) {
                    translateX = 0;
                    rotateY = 0;
                    scale = 1;
                    zIndex = 30;
                    opacity = 1;
                  } else if (
                    offset === -1 ||
                    (active === 0 && index === TESTIMONIALS.length - 1)
                  ) {
                    translateX = -170;
                    rotateY = 18;
                    scale = 0.9;
                    zIndex = 20;
                    opacity = 0.8;
                  } else if (
                    offset === 1 ||
                    (active === TESTIMONIALS.length - 1 && index === 0)
                  ) {
                    translateX = 170;
                    rotateY = -18;
                    scale = 0.9;
                    zIndex = 20;
                    opacity = 0.8;
                  } else {
                    translateX = offset < 0 ? -260 : 260;
                    rotateY = offset < 0 ? 24 : -24;
                    scale = 0.8;
                    zIndex = 10;
                    opacity = 0;
                  }
                }

                return (
                  <div
                    key={t.name}
                    className="absolute w-[92%] sm:w-3/4 lg:w-[65%] transition-all duration-500 ease-out origin-center"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <article className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/90 backdrop-blur shadow-[0_26px_80px_rgba(0,0,0,0.5)] px-5 py-5 sm:px-6 sm:py-6 flex flex-col">
                      {/* Big vertical image at top */}
                      <div className="mb-4 h-40 sm:h-56 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-[#f58025] flex items-center justify-center shadow-lg">
                        <Quote className="h-5 w-5 text-slate-950" />
                      </div>

                      {/* Text */}
                      <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-3">
                        “{t.text}”
                      </p>

                      {/* Rating */}
                      <div className="mb-3 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < t.rating
                                ? "text-[#facc15] fill-[#facc15]"
                                : "text-slate-700"
                            }
                          />
                        ))}
                      </div>

                      {/* Name + role at bottom */}
                      <div className="mt-auto flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white">
                            {t.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="h-9 w-9 rounded-full border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 shadow-sm hover:bg-slate-800"
            >
              ‹
            </button>
            <div className="flex gap-1">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-1.5 w-4 rounded-full transition-all ${
                    i === active
                      ? "bg-[#f58025]"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="h-9 w-9 rounded-full border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 shadow-sm hover:bg-slate-800"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
