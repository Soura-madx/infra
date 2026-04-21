import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/footer";
import UpcomingProjectsSlider from "../component/upcomingproject";
import HeroWithSearch from "../component/landing";
import DeveloperCTA from "../component/developerQ";
import AboutStatsStrip from "../component/statstrip";
import CollabShowcaseLight from "../component/collabs";
import PremiumTestimonials from "../component/testimonial";
import WhyChoosePrarambh from "../component/whychooseus";
import PrarambhFaqAccordion from "../component/faq";
import BrokerDashboard from "../component/awrd";
const Home = () => {
  const images = [
    {
      src: "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1200",
      label: "Front elevation",
    },
    {
      src: "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=1200",
      label: "Living room",
    },
    {
      src: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/5563469/pexels-photo-5563469.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/5825538/pexels-photo-5825538.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/7163610/pexels-photo-7163610.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/3615182/pexels-photo-3615182.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/3615182/pexels-photo-3615182.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/5570226/pexels-photo-5570226.jpeg",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
      label: "Floor plan",
    },
    {
      src: "https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg",
      label: "Floor plan",
    },
  ];

  return (
    <div className="bg-[#f3f4f6]">
      <Navbar />
      <div className="space mt-20"></div>
      <HeroWithSearch />
      <UpcomingProjectsSlider />
      
      <AboutStatsStrip />
      <PremiumTestimonials />
      <CollabShowcaseLight />
      <PrarambhFaqAccordion/>
      
      <div className="space mt-20"></div>
      <Footer />
    </div>
  );
};

export default Home;
