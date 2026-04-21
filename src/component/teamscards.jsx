import { useState, useEffect } from "react";

const TeamSlider = ({ team }) => {
  const [index, setIndex] = useState(0);

  // auto-slide optional
  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % team.length),
      5000
    );
    return () => clearInterval(id);
  }, [team.length]);

  const visible = 3; // show 3 cards on desktop

  const getVisibleTeam = () => {
    const list = [];
    for (let i = 0; i < visible; i += 1) {
      const idx = (index + i) % team.length;
      list.push(team[idx]);
    }
    return list;
  };

  const visibleTeam = getVisibleTeam();

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-[0.18em]">
          Core Team
        </h3>
        <div className="flex gap-2 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={() =>
              setIndex((prev) =>
                prev === 0 ? team.length - 1 : prev - 1
              )
            }
            className="h-7 w-7 rounded-full border border-slate-600 flex items-center justify-center hover:bg-white/5"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() =>
              setIndex((prev) => (prev + 1) % team.length)
            }
            className="h-7 w-7 rounded-full border border-slate-600 flex items-center justify-center hover:bg-white/5"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleTeam.map((member) => (
          <article
            key={member.name}
            className="border border-slate-700/70 bg-slate-900/40 rounded-md px-4 py-4 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={member.image}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  {member.name}
                </p>
                <p
                  className="text-[11px] font-medium"
                  style={{ color: primaryOrange }}
                >
                  {member.designation}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 mb-2">
              {member.experience}
            </p>
            <ul className="text-[11px] text-slate-400 space-y-1 mb-3">
              {member.achievements.slice(0, 2).map((a) => (
                <li key={a} className="flex gap-1">
                  <span className="mt-[5px] h-1 w-1 rounded-full bg-slate-400" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex gap-2 text-xs text-slate-300">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  className="px-2 py-1 rounded-full border border-slate-600 hover:bg-white/5"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
