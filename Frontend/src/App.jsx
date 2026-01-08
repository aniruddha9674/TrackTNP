import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import MainPage from "./Pages/MainPage/main";
import AuthApp from "./Pages/LoginSection/Auth";
import FAQ from "./Pages/FAQ/FAQ";
import Pricing from "./Pages/Pricing/pricing";
import Documentation from "./Pages/Docs/Documentation";
import PrivacyPolicy from "./Pages/PPsection/privacy";
import ContactUsPage from "./Pages/Contactus/Contact";
import ServicesPage from "./Pages/Services/services";
import Aboutus from "./Pages/Aboutus/About";

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
import ResumeBuilder from "./components/StudentDashboard/ResumeBuilder/ResumeBuilder";
import VolunteerNotifications from "./components/StudentDashboard/Notification";

import AdminDash from "./Pages/AdminDash/AdminDash";
import Calendar from "./components/AdminDashboard/Calendar";
import Settings from "./components/AdminDashboard/Settings";
import StaffDetailsManager from "./components/AdminDashboard/Staff/AddStaff";
import AddCompany from "./components/AdminDashboard/Company/AddCompany";
import CompanyDrivesManager from "./components/AdminDashboard/Company/CompanyDrives";
import PlacementResultsManager from "./components/AdminDashboard/Result/Result";
import Overview from "./components/AdminDashboard/Overview/Overview";
import StudentDetails from "./components/AdminDashboard/Student/StudentDetails";
import Addstudent from "./components/AdminDashboard/Student/AddSudent";
import NotificationAdmin from "./components/AdminDashboard/Notification/Notification";

import CollegeCoordinatorDash from "./Pages/CollegeCoordinatordash/CollegeCoordinatorDash";
import DrivesListVolunteer from "./components/CollegeCoordinator/Volunteer/DrivesListVolunteer";
import StudentListVolunteer from "./components/CollegeCoordinator/Students/StudentListVolunteer";
import ResultsPageVolunteer from "./components/CollegeCoordinator/Results/ResultsPageVolunteer";
import CoordinatorNotifications from "./components/CollegeCoordinator/Notification/Notification";
import CoordinatorCalendar from "./components/CollegeCoordinator/Calendar/Calendar";
import SettingsPage from "./components/CollegeCoordinator/Setting/Setting";
import FirstLogin from "./Pages/FirstTimeLogin";

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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/").then((res) => res.json());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthApp />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/aboutus" element={<Aboutus />} />

      <Route path="/firstlogin" element={<FirstLogin />} />

      <Route path="/admindashboard" element={<AdminDash />}>
        <Route path="" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
        <Route path="calender" element={<Calendar />} />
        <Route path="staff" element={<StaffDetailsManager />} />
        <Route path="company/add" element={<AddCompany />} />
        <Route path="company/drive" element={<CompanyDrivesManager />} />
        <Route path="results" element={<PlacementResultsManager />} />
        <Route path="student/details" element={<StudentDetails />} />
        <Route path="student/add" element={<Addstudent />} />
        <Route path="notifications" element={<NotificationAdmin />} />
      </Route>

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
        <Route path="resume" element={<ResumeBuilder />} />
        <Route path="notifications" element={<VolunteerNotifications />} />
      </Route>

      <Route
        path="/collegecoordinatordashboard"
        element={<CollegeCoordinatorDash />}
      >
        <Route path="volunteer" element={<DrivesListVolunteer />} />
        <Route path="student/details" element={<StudentListVolunteer />} />
        <Route path="results" element={<ResultsPageVolunteer />} />
        <Route path="notifications" element={<CoordinatorNotifications />} />
        <Route path="calender" element={<CoordinatorCalendar />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
