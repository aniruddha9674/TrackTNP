import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

{
  /*import MainPage from "./Pages/MainPage/main";*/
}
import AuthApp from "./Pages/LoginSection/Auth";

{
  /*
  import StudentDash from "./Pages/StudentDash/AppLayout";
  
  import StudentDash from "./Pages/StudentDash/StudentDash";
import CertificationManager from "./components/StudentDashboard/Certification";
import CompanyRegistrationfrom from "./components/StudentDashboard/Company";
import PlacementFeedbackSystem from "./components/StudentDashboard/Feedback";
import InternshipManagerfrom from "./components/StudentDashboard/Internship";
import OfferLetters from "./components/StudentDashboard/OfferLetter";
import Overview from "./components/StudentDashboard/overview";
import Profile from "./components/StudentDashboard/FirstTimeLogin";
import ProjectManager from "./components/StudentDashboard/Project";
import AuthApp from "./Pages/LoginSection/Auth";*/
}

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const root = window.document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AuthApp />} />
      <Route path="/login" element={<AuthApp />} />

      {/*
       <Route path="/studentdashboard" element={<StudentDash />} />
      
      Student Dashboard 
      <Route path="" element={<Overview />} />
      <Route path="/company" element={<CompanyRegistrationfrom />} />
      <Route path="/calender" element={< />} /> 
      <Route path="/offerletter" element={<OfferLetters />} />
      <Route path="/internship" element={<InternshipManagerfrom />} />
      <Route path="/certification" element={<CertificationManager />} />
      <Route path="/project" element={<ProjectManager />} />
      <Route path="/feedback" element={<PlacementFeedbackSystem />} />
      <Route path="/profile" element={<Profile />} />*/}
    </Routes>
  );
}

export default App;
