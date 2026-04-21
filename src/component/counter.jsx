import React, { useEffect, useState } from "react";

const AnimatedCounter = ({
  from = 0,
  to = 500,
  duration = 2000,
  suffix = "+",
  label = "",
  subLabel = "",
}) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const diff = to - from;
    if (diff === 0) return;

    const fps = 60;
    const totalSteps = Math.round((duration / 1000) * fps);
    const increment = diff / totalSteps;
    let current = from;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      current += increment;
      if (step >= totalSteps) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(Math.round(current));
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <div className="flex-1 min-w-[110px] sm:min-w-[130px] lg:min-w-[180px]  text-center">
      <div className="text-xl md:text-2xl font-semibold text-blue-900">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-xs md:text-base font-medium text-slate-800">
        {label}
      </div>
      {subLabel && (
        <div className="text-xs md:text-sm text-slate-500 mt-0.5">
          {subLabel}
        </div>
      )}
    </div>
  );
};

export default AnimatedCounter;
