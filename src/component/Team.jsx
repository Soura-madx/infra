

const primaryBlue = "#005596";
const primaryOrange = "#f58025";

const leaders = [
  {
    name: "Rahul Sharma",
    designation: "Managing Director & Founder",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
    experience: "15+ years in real estate marketing & township development",
    achievements: [
      "Led marketing for 25+ legal plotted townships across MP",
      "Built advisor network of 500+ active partners",
      "Known for customer-first documentation & process",
    ],
    quote:
      "Real estate should never feel like a gamble. It should feel like a confident, well-documented decision for every family.",
    paragraph:
      "As Managing Director of Prarambh Infra, Rahul sets the direction for projects, partnerships and advisor growth. His focus is on working only with legal, RERA-compliant developments and building a culture where every commitment made to customers is honoured with clarity, paperwork and long-term service.",
  }
  
];

const LeadershipSection = () => {
  return (
    <>
    <section className="bg-[#0f172a] text-slate-100 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/5 border border-slate-600/60 px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-300">
              Leadership
              <span
                className="h-1.5 w-1.5 rounded-md"
                style={{ background: primaryOrange }}
              />
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight">
              People behind{" "}
              <span style={{ color: primaryOrange }}>Prarambh Infra</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              A leadership team that treats real estate as a responsibility,
              not just a transaction — combining legal focus, marketing depth
              and long-term relationships.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
            Each senior leader actively works with customers, advisors and
            project partners to ensure that every site, every document and
            every commitment is clear and compliant.
          </p>
        </div>

        {/* Leaders list - no boxes, editorial layout */}
        <div className="space-y-12 sm:space-y-14">
          {leaders.map((leader, index) => (
            <article
              key={leader.name}
              className={`flex flex-col lg:flex-row items-start gap-8 lg:gap-10 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Portrait */}
              <div className="w-full lg:w-[34%]">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-md bg-gradient-to-br from-slate-50/10 via-slate-50/0 to-slate-900/60" />
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                  </div>
                </div>

                {/* Social + tags */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    <span>Experience</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    {leader.social.linkedin && (
                      <a
                        href={leader.social.linkedin}
                        className="h-8 w-8 rounded-md bg-white/5 border border-slate-600 flex items-center justify-center hover:bg-white/10"
                        aria-label="LinkedIn"
                      >
                        in
                      </a>
                    )}
                    {leader.social.twitter && (
                      <a
                        href={leader.social.twitter}
                        className="h-8 w-8 rounded-md bg-white/5 border border-slate-600 flex items-center justify-center hover:bg-white/10"
                        aria-label="Twitter"
                      >
                        t
                      </a>
                    )}
                    {leader.social.instagram && (
                      <a
                        href={leader.social.instagram}
                        className="h-8 w-8 rounded-md bg-white/5 border border-slate-600 flex items-center justify-center hover:bg-white/10"
                        aria-label="Instagram"
                      >
                        ig
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-300">
                  {leader.experience}
                </p>
              </div>

              {/* Text block */}
              <div className="flex-1 border-t border-slate-700/60 pt-5 lg:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      {leader.name}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-1"
                      style={{ color: primaryOrange }}
                    >
                      {leader.designation}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-[15px] italic text-slate-200 mb-4 border-l-2 pl-4 border-slate-500/80">
                  “{leader.quote}”
                </p>

                {/* Main paragraph */}
                <p className="text-sm sm:text-[15px] text-slate-200 mb-4">
                  {leader.paragraph}
                </p>

                {/* Achievements */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1">
                      Key Achievements
                    </p>
                    <ul className="space-y-1.5">
                      {leader.achievements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-[6px] h-1 w-1 rounded-md bg-slate-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1">
                      Role &amp; Responsibility
                    </p>
                    <p className="leading-relaxed">
                      Ensures that marketing, documentation and advisor
                      processes remain aligned with the core values of Prarambh
                      Infra: honesty, transparency, consistency, respect and
                      trust.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
   
    </>
  );
};

export default LeadershipSection;
