
import AnimatedCounter from "./counter";

const AboutStatsStrip = () => {
  return (
    <section className="w-full mt-10 mb-20 md:mt-14">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="rounded-[28px] bg-white shadow-md border border-slate-100 px-5 py-6 md:px-12 md:py-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 md:gap-10">
            {/* Left heading / description */}
           

            {/* Counters */}
            <div className=" flex flex-wrap gap-6 md:gap-5 lg:gap-15">
              <AnimatedCounter
                from={0}
                to={1200}
                duration={1800}
                suffix="+"
                label="Satisfied Clients"
                
              />

              <AnimatedCounter
                from={0}
                to={7}
                duration={1800}
                suffix="+"
                label="Years Of Experience"
                
              />

              <AnimatedCounter
                from={0}
                to={600}
                duration={1800}
                suffix="+"
                label="Property Sold"
                
              />
              <AnimatedCounter
                from={0}
                to={600}
                duration={1800}
                suffix="+"
                label="Advisor"
                
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsStrip;
