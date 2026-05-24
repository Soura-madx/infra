import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Property from "./pages/Property";
import Blog from "./pages/Blog";
import ContactPrarambh from "./pages/ContactUs";
import Property_detail from "./pages/Property_detail";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetailPage from "./component/RealEstateBlogPro";
import Career from "./pages/Career";
import SplashScreen from "./component/splash";

// Auth Components
import Signup from "./component/auth/Signup";
import LoginPage from "./component/auth/Login";
import ProtectRoute from "./component/auth/ProtectRoute";

// Advisor/Admin Panel Components
import Layout from "./Advisors/Advisors-Pages/Layout";
import Dashboard from "./Advisors/Advisors-Pages/Dashboard";
import Document from "./Advisors/Advisors-Pages/Document";
import Contest from "./Advisors/Advisors-Pages/Contest";
import Income from "./Advisors/Advisors-Pages/Income";
import Installment from "./Advisors/Advisors-Pages/Installment";
import Achievement from "./Advisors/Advisors-Pages/Achievement";
import Calculator from "./Advisors/Advisors-Pages/Calculator";
import Attendance from "./Advisors/Advisors-Pages/Attendance";
import Leaderboard from "./Advisors/Advisors-Pages/Leaderboard";
import Promotion from "./Advisors/Advisors-Pages/Promotion";

import Sell from "./Advisors/Advisors-Pages/Sell";
import Project from "./Advisors/Advisors-Pages/Project";
import Profile from "./Advisors/Advisors-Pages/Profile";
import Notification from "./Advisors/Advisors-Pages/Notification";
import EditProfile from "./Advisors/Advisors-Pages/EditProfile";
import UnitInventory from "./Advisors/Advisors-Pages/UnitInventory";
import ProjectDetails from "./Advisors/Advisors-Pages/ProjectDetails";
import DocumentM from "./admin/DocumentM";
import ProjectM from "./admin/ProjectM";
import CreateProject from "./admin/CreateProject";
import { SalesProvider } from "./Context/SalesContext";
import ManageProject from "./admin/ManageProject";
import ProjectDetailM from "./admin/ProjectDetailM";
import EditProject from "./admin/ManageProject";
import UnitInventoryAdmin from "./admin/UnitInventoryAdmin";
import EditUnit from "./admin/EditUnit";

import ForgotPassword from "./component/auth/ForgotPassword";
import BlogM from "./admin/Blog";
import AddBlog from "./admin/AddBlog";
import BlogDetail from "./admin/BlogDetail";
import EditBlog from "./admin/EditBlog"
import TermsConditionsPage from "./component/TermCondition";
import PrivacyPolicy from "./component/PrivacyPolicy";
import PendingAdvisor from "./admin/PendingAdvisor";
import Recruitment from "./admin/Recruitment";
import RegisterAdvisor from "./component/auth/Signup";
import AdvisorRegistration from "./admin/RegisterAdvisor";
import AdvisorTreeView from "./admin/Team";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SalesProvider>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

        {!showSplash && (
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/property" element={<Property />} />
            <Route path="/property_detail/:id" element={<Property_detail />} />
            <Route path="/property/:id" element={<Property_detail />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact-us" element={<ContactPrarambh />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/termcondition" element={<TermsConditionsPage/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} /> 
            <Route path="/privacypolicy" element={<PrivacyPolicy/>} /> 


            {/* --- PROTECTED ADVISOR ROUTES --- */}
            <Route
              path="/advisor"
              element={
                <ProtectRoute allowedRoles={["advisor", "admin"]}>
                  <Layout />
                </ProtectRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="document" element={<Document />} />
              <Route path="contests" element={<Contest />} />
              <Route path="income" element={<Income />} />
              <Route path="installments" element={<Installment />} />
              <Route path="achievements" element={<Achievement />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="promotion" element={<Promotion />} />
              <Route path="profile" element={<Profile />} />
              <Route path="project" element={<Project />} />
              <Route path="sell" element={<Sell />} />
              
              <Route path="notifications" element={<Notification />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="project/:id/inventory" element={<UnitInventory />} />
              <Route path="project/:id" element={<ProjectDetails />} />
            </Route>

            {/* --- PROTECTED ADMIN ROUTES --- */}
            <Route
              path="/admin"
              element={
                <ProtectRoute allowedRoles={["admin"]}>
                  <Layout />
                </ProtectRoute>
              }
            >
              <Route index element={<Dashboard />} />
              {/* REMOVED LEADING SLASH HERE */}
              <Route path="document-management" element={<DocumentM />} />
              <Route path="project" element={<ProjectM />} />
              <Route path="blog" element={<BlogM />} />
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="/admin/blogs/:id" element={<BlogDetail />} />
              <Route path="/admin/edit-blogs/:id" element={<EditBlog />} />

             
              <Route path="projects/create" element={<CreateProject />} />
              <Route path="projects/:id" element={<ProjectDetailM />} />
              <Route path="projects/manage/:id" element={<EditProject />} />
              <Route path="projects/unit" element={<UnitInventoryAdmin />} />
              <Route path="projects/unit/edit" element={<EditUnit />} />
              <Route path="pending_advisors" element={<PendingAdvisor />} />
              <Route path="recruitment" element={<Recruitment />} />
              <Route path="recruitment/create" element={<AdvisorRegistration />} />
              <Route path="team" element={<AdvisorTreeView />} />
             
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        )}
      </SalesProvider>
    </>
  );
}

export default App;
