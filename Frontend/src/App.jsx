import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

{
  /*import MainPage from "./Pages/MainPage/main";*/
}
import AuthApp from "./Pages/LoginSection/Auth";

import StudentDash from "./Pages/StudentDash/StudentDash";
import StudentOverview from "./components/StudentDashboard/overview";
import CompanyRegistrationfrom from "./components/StudentDashboard/Company";
import OfferLetters from "./components/StudentDashboard/OfferLetter";
import CertificationManager from "./components/StudentDashboard/Certification";
import PlacementFeedbackSystem from "./components/StudentDashboard/Feedback";
import InternshipManagerfrom from "./components/StudentDashboard/Internship";
import Profile from "./components/StudentDashboard/Profile";
import ProjectManager from "./components/StudentDashboard/Project";
import StudentCalendar from "./components/StudentDashboard/Calender";

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

      <Route path="/studentdashboard" element={<StudentDash />}>
        <Route path="" element={<StudentOverview />} />
        <Route
          path="companyregistration"
          element={<CompanyRegistrationfrom />}
        />
        <Route path="offerletter" element={<OfferLetters />} />
        <Route path="internshipdetails" element={<InternshipManagerfrom />} />
        <Route path="certificationdetails" element={<CertificationManager />} />
        <Route path="feedback" element={<PlacementFeedbackSystem />} />
        <Route path="projectdetails" element={<ProjectManager />} />
        <Route path="profilesettings" element={<Profile />} />
        <Route path="calender" element={<StudentCalendar />} />
      </Route>
    </Routes>
  );
}

export default App;
