import { Target, Telescope } from "lucide-react";

const PRIMARY_TEAL = "#008b88";

export default function MissionVision() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "#005596" }}
          >
            We Build Relationships
          </h2>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-center">
          {/* Mission */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
              <Target size={120} strokeWidth={1.4} color={"#f58025"} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Mission</h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600">
              To simplify real estate for buyers, investors, builders and
              advisors by combining transparent documentation, practical product
              design and performance‑driven marketing. Prarambh Infra focuses on
              projects where approvals, layouts and pricing are clear, so every
              site visit and every booking feels like a confident step forward,
              not a risk.
              <br />
              <br />
              For builders, this means structured launches, stronger brand
              recall and faster inventory movement. For channel partners, it
              means consistent training, honest communication and a system that
              respects the effort they put into every lead and every client.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
              <Telescope size={120} strokeWidth={1.4} color={"#f58025"} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">Vision</h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600">
              To be Central India’s most trusted real estate marketing partner,
              known for working only with legally strong developments and for
              treating every customer like a long‑term relationship. The aim is
              to make documented, well‑explained property buying the norm,
              whether someone is purchasing their first plot or expanding a
              builder’s portfolio.
              <br />
              <br />
              Over the coming years, Prarambh Infra aspires to build a network
              of empowered advisors, transparent developers and informed buyers
              who together raise the standard of how real estate business is
              done in Indore, Ujjain and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
