import React from "react";

import MissionVisionSection from "../component/mission";

import Navbar from "../component/Navbar";
import WhyChoosePrarambh from "../component/whychooseus";
import Footer from '../component/footer'
import Overview from "../component/overview";
const AboutPrarambhInfra = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />
      <div className="space mt-20"></div>
    



      <section id="overview">
      <Overview/>

      </section>
      <section id="teams">
      <LeadershipSection />

      </section>

      <section id="mission-vision">
        <MissionVisionSection/>
      </section>


       
      

      <section id="why-choose-us">
        <WhyChoosePrarambh/>

      </section>

      <Footer/>
    </div>
  );
};

const ValuePill = ({ label, color }) => (
  <div
    className={`inline-flex items-center justify-center rounded-md px-3 py-1 ${color}`}
  >
    <span className="text-[11px] font-medium">{label}</span>
  </div>
);

export default AboutPrarambhInfra;
