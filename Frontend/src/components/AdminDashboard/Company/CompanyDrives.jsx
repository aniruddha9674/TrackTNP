import React, { useState } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  X,
  Download,
  Search,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";


const CompanyDrivesManager = () => {
  const { theme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStep, setFilterStep] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Theme configuration function
  const getThemeColors = () => {
    const isDark = theme === "dark";
    if (isDark) {
      return {
        background: "#020617",
        cardBg: "#1D2939",
        border: "#344054",
        text: "#F9FAFB",
        textSecondary: "#98A2B3",
        textTertiary: "#667085",
        inputBg: "#1D2939",
        hoverBg: "#344054",
        modalBg: "#1D2939",
        tableBg: "#1D2939",
        tableHeaderBg: "#1D2939",
      };
    } else {
      return {
        background: "#ffffff",
        cardBg: "#ffffff",
        border: "#E4E7EC",
        text: "#101828",
        textSecondary: "#667085",
        textTertiary: "#98A2B3",
        inputBg: "#ffffff",
        hoverBg: "#F2F4F7",
        modalBg: "#ffffff",
        tableBg: "#ffffff",
        tableHeaderBg: "#F2F4F7",
      };
    }
  };

  const colors = getThemeColors();
  const isDark = theme === "dark";

  // Sample data
  const [companies] = useState([
    {
      id: 1,
      name: "Incorbis",
      date: "Nov 25, 2025",
      registrationStatus: "Open",
      totalRegistered: 45,
      totalSelected: 12,
      salary: "6.5 LPA",
      venue: "Seminar Hall",
      type: "Placement",
      color: "#465FFF",
      totalRounds: 5,
    },
    {
      id: 2,
      name: "TCS",
      date: "Nov 28, 2025",
      registrationStatus: "Closed",
      totalRegistered: 120,
      totalSelected: 35,
      salary: "4.5 LPA",
      venue: "Main Auditorium",
      type: "Placement",
      color: "#32D583",
      totalRounds: 3,
    },
    {
      id: 3,
      name: "Infosys",
      date: "Dec 2, 2025",
      registrationStatus: "Open",
      totalRegistered: 89,
      totalSelected: 28,
      salary: "5.0 LPA",
      venue: "Conference Hall",
      type: "Internship",
      color: "#0BA5EC",
      totalRounds: 4,
    },
    {
      id: 4,
      name: "Wipro",
      date: "Dec 5, 2025",
      registrationStatus: "Open",
      totalRegistered: 67,
      totalSelected: 18,
      salary: "4.0 LPA",
      venue: "Lab Complex",
      type: "Placement",
      color: "#F97066",
      totalRounds: 3,
    },
  ]);

  const colleges = [
    { id: 1, name: "ABC Engineering College" },
    { id: 2, name: "XYZ Institute of Technology" },
    { id: 3, name: "PQR College of Engineering" },
    { id: 4, name: "LMN Technical Campus" },
  ];

  const departments = [
    { id: 1, name: "Computer Science", short: "CS" },
    { id: 2, name: "Information Technology", short: "IT" },
    { id: 3, name: "Electronics & Telecommunication", short: "ENTC" },
    { id: 4, name: "Mechanical", short: "Mechanical" },
    { id: 5, name: "Civil", short: "Civil" },
  ];

  const years = [
    { id: 1, name: "Third Year", value: "3rd" },
    { id: 2, name: "Fourth Year", value: "4th" },
  ];

  const [students] = useState([
    {
      id: 1,
      fullName: "Soham Pachpute",
      mobile: "9876543210",
      email: "soham@example.com",
      studentId: "PRN001",
      round1: "Pass",
      round2: "Pass",
      round3: "Pass",
      round4: "Pass",
      round5: "Pass",
      placementSelected: true,
      internshipSelected: false,
      company: "Incorbis",
      collegeName: "ABC Engineering College",
      branch: "Computer Science",
      year: "4th",
    },
    {
      id: 2,
      fullName: "Rahul Sharma",
      mobile: "9876543211",
      email: "rahul@example.com",
      studentId: "PRN002",
      round1: "Pass",
      round2: "Pass",
      round3: "Fail",
      round4: "-",
      round5: "-",
      placementSelected: false,
      internshipSelected: true,
      company: "Incorbis",
      collegeName: "ABC Engineering College",
      branch: "Computer Science",
      year: "3rd",
    },
    {
      id: 3,
      fullName: "Priya Patel",
      mobile: "9876543212",
      email: "priya@example.com",
      studentId: "PRN003",
      round1: "Pass",
      round2: "Pass",
      round3: "Pass",
      round4: "Pass",
      round5: "Pass",
      placementSelected: false,
      internshipSelected: true,
      company: "Incorbis",
      collegeName: "ABC Engineering College",
      branch: "Information Technology",
      year: "4th",
    },
    {
      id: 4,
      fullName: "Amit Kumar",
      mobile: "9876543213",
      email: "amit@example.com",
      studentId: "PRN004",
      round1: "Pass",
      round2: "Pass",
      round3: "Pass",
      round4: "-",
      round5: "-",
      placementSelected: true,
      internshipSelected: false,
      company: "TCS",
      collegeName: "XYZ Institute of Technology",
      branch: "Mechanical",
      year: "4th",
    },
    {
      id: 5,
      fullName: "Sneha Desai",
      mobile: "9876543214",
      email: "sneha@example.com",
      studentId: "PRN005",
      round1: "Pass",
      round2: "Fail",
      round3: "-",
      round4: "-",
      round5: "-",
      placementSelected: false,
      internshipSelected: false,
      company: "Infosys",
      collegeName: "ABC Engineering College",
      branch: "Electronics & Telecommunication",
      year: "3rd",
    },
    {
      id: 6,
      fullName: "Vikram Singh",
      mobile: "9876543215",
      email: "vikram@example.com",
      studentId: "PRN006",
      round1: "Pass",
      round2: "Pass",
      round3: "Pass",
      round4: "Pass",
      round5: "-",
      placementSelected: true,
      internshipSelected: false,
      company: "Incorbis",
      collegeName: "ABC Engineering College",
      branch: "Computer Science",
      year: "4th",
    },
  ]);

  const stats = {
    totalCompanies: companies.length,
    openDrives: companies.filter((c) => c.registrationStatus === "Open").length,
    totalPlacements: companies.reduce((sum, c) => sum + c.totalSelected, 0),
    totalRegistered: companies.reduce((sum, c) => sum + c.totalRegistered, 0),
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowFilterModal(true);
    setFilterStep(1);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
  };

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setFilterStep(2);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setFilterStep(3);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowFilterModal(false);
  };

  const handleCloseModal = () => {
    setShowFilterModal(false);
    setSelectedCompany(null);
    setFilterStep(1);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
  };

  const exportToExcel = () => {
    alert("Exporting students to Excel...");
  };

  // Check if student passed all rounds up to the company's total rounds
  const passedAllRounds = (student, company) => {
    const totalRounds = company.totalRounds;
    for (let i = 1; i <= totalRounds; i++) {
      const roundKey = `round${i}`;
      if (student[roundKey] !== "Pass") {
        return false;
      }
    }
    return true;
  };

  // Filter students who made it to the final round
  const filteredStudents = students.filter(
    (s) =>
      s.company === selectedCompany?.name &&
      s.collegeName === selectedCollege?.name &&
      s.branch === selectedDepartment?.name &&
      s.year === selectedYear?.value &&
      passedAllRounds(s, selectedCompany) &&
      (s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "Urbanist, sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: colors.text }}
                >
                  Company Drives
                </h1>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Manage campus recruitment drives
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                icon: Building2,
                label: "Total Companies",
                value: stats.totalCompanies,
                subtitle: "recruitment drives",
                gradient: isDark
                  ? "from-gray-800 to-blue-900/30"
                  : "from-white to-blue-50",
                iconBg: isDark ? "bg-blue-900/30" : "bg-blue-100",
                iconColor: isDark ? "text-blue-400" : "text-blue-600",
              },
              {
                icon: Calendar,
                label: "Open Drives",
                value: stats.openDrives,
                subtitle: "currently active",
                gradient: isDark
                  ? "from-gray-800 to-green-900/30"
                  : "from-white to-green-50",
                iconBg: isDark ? "bg-green-900/30" : "bg-green-100",
                iconColor: isDark ? "text-green-400" : "text-green-600",
              },
              {
                icon: Users,
                label: "Total Registered",
                value: stats.totalRegistered,
                subtitle: "students applied",
                gradient: isDark
                  ? "from-gray-800 to-purple-900/30"
                  : "from-white to-purple-50",
                iconBg: isDark ? "bg-purple-900/30" : "bg-purple-100",
                iconColor: isDark ? "text-purple-400" : "text-purple-600",
              },
              {
                icon: TrendingUp,
                label: "Total Placements",
                value: stats.totalPlacements,
                subtitle: "students placed",
                gradient: isDark
                  ? "from-gray-800 to-amber-900/30"
                  : "from-white to-amber-50",
                iconBg: isDark ? "bg-amber-900/30" : "bg-amber-100",
                iconColor: isDark ? "text-amber-400" : "text-amber-600",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.gradient}`}
                style={{
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      {stat.label}
                    </p>
                    <h3
                      className="text-3xl font-bold mt-2"
                      style={{ color: colors.text }}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.textTertiary }}
                    >
                      {stat.subtitle}
                    </p>
                  </div>
                  <div
                    className={`h-12 w-12 ${stat.iconBg} rounded-full flex items-center justify-center`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Modal */}
          {showFilterModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                style={{
                  backgroundColor: colors.modalBg,
                }}
              >
                <div
                  className="p-6 border-b flex items-center justify-between sticky top-0 z-10"
                  style={{
                    backgroundColor: colors.modalBg,
                    borderColor: colors.border,
                  }}
                >
                  <div>
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: colors.text }}
                    >
                      {selectedCompany.name} Drive - Filter Students
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.textSecondary }}
                    >
                      Step {filterStep} of 3: Select{" "}
                      {filterStep === 1
                        ? "College"
                        : filterStep === 2
                          ? "Department"
                          : "Year"}
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                    style={{
                      backgroundColor: colors.hoverBg,
                    }}
                  >
                    <X size={24} style={{ color: colors.text }} />
                  </button>
                </div>

                <div className="p-6">
                  {filterStep === 1 && (
                    <div>
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: colors.text }}
                      >
                        Select College
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {colleges.map((college) => (
                          <div
                            key={college.id}
                            onClick={() => handleCollegeSelect(college)}
                            className="p-6 rounded-xl border cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                            style={{
                              backgroundColor: colors.hoverBg,
                              borderColor: colors.border,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4
                                  className="font-semibold text-lg"
                                  style={{
                                    color: colors.text,
                                  }}
                                >
                                  {college.name}
                                </h4>
                                <p
                                  className="text-sm mt-1"
                                  style={{
                                    color: colors.textSecondary,
                                  }}
                                >
                                  Click to select
                                </p>
                              </div>
                              <ChevronRight
                                size={24}
                                style={{ color: "#465FFF" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filterStep === 2 && (
                    <div>
                      <button
                        onClick={() => setFilterStep(1)}
                        className="mb-4 text-sm font-semibold flex items-center gap-2"
                        style={{ color: "#465FFF" }}
                      >
                        ← Back to Colleges
                      </button>
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: colors.text }}
                      >
                        Select Department
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {departments.map((dept) => (
                          <div
                            key={dept.id}
                            onClick={() => handleDepartmentSelect(dept)}
                            className="p-6 rounded-xl border cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                            style={{
                              backgroundColor: colors.hoverBg,
                              borderColor: colors.border,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4
                                  className="font-semibold text-lg"
                                  style={{
                                    color: colors.text,
                                  }}
                                >
                                  {dept.short}
                                </h4>
                                <p
                                  className="text-sm mt-1"
                                  style={{
                                    color: colors.textSecondary,
                                  }}
                                >
                                  {dept.name}
                                </p>
                              </div>
                              <ChevronRight
                                size={24}
                                style={{ color: "#465FFF" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filterStep === 3 && (
                    <div>
                      <button
                        onClick={() => setFilterStep(2)}
                        className="mb-4 text-sm font-semibold flex items-center gap-2"
                        style={{ color: "#465FFF" }}
                      >
                        ← Back to Departments
                      </button>
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: colors.text }}
                      >
                        Select Year
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {years.map((year) => (
                          <div
                            key={year.id}
                            onClick={() => handleYearSelect(year)}
                            className="p-8 rounded-xl border cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                            style={{
                              backgroundColor: colors.hoverBg,
                              borderColor: colors.border,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4
                                  className="font-semibold text-2xl"
                                  style={{
                                    color: colors.text,
                                  }}
                                >
                                  {year.name}
                                </h4>
                                <p
                                  className="text-sm mt-1"
                                  style={{
                                    color: colors.textSecondary,
                                  }}
                                >
                                  Click to view students
                                </p>
                              </div>
                              <ChevronRight
                                size={28}
                                style={{ color: "#465FFF" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!selectedCompany || !selectedYear ? (
            /* Company Cards Grid */
            <div>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: colors.text }}
              >
                Recent Drives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => handleCompanyClick(company)}
                    className="rounded-2xl border shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden hover:scale-105"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.border,
                    }}
                  >
                    <div
                      className="h-2"
                      style={{ backgroundColor: company.color }}
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            className="text-xl font-bold"
                            style={{ color: colors.text }}
                          >
                            {company.name}
                          </h3>
                          <p
                            className="text-sm mt-1"
                            style={{ color: colors.textSecondary }}
                          >
                            {company.type}
                          </p>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              company.registrationStatus === "Open"
                                ? "#32D583"
                                : "#F97066",
                            color: "#ffffff",
                          }}
                        >
                          {company.registrationStatus}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textSecondary }}>
                            Date:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: colors.text }}
                          >
                            {company.date}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textSecondary }}>
                            Salary:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: colors.text }}
                          >
                            {company.salary}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textSecondary }}>
                            Registered:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: colors.text }}
                          >
                            {company.totalRegistered}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.textSecondary }}>
                            Selected:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "#32D583" }}
                          >
                            {company.totalSelected}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Final Round Students View */
            <div
              className="rounded-xl shadow-sm border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >
              {/* Header */}
              <div
                className="p-6 border-b"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToList}
                      className="p-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: colors.hoverBg,
                        color: colors.text,
                      }}
                    >
                      ←
                    </button>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: colors.text }}
                      >
                        {selectedCompany.name} Drive - Final Round Students
                      </h2>
                      <p
                        className="text-sm"
                        style={{ color: colors.textSecondary }}
                      >
                        {selectedCollege.name} - {selectedDepartment.name} -{" "}
                        {selectedYear.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      Students who cleared all {selectedCompany.totalRounds} rounds
                    </p>
                  </div>
                  <button
                    onClick={exportToExcel}
                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                    style={{
                      backgroundColor: "#32D583",
                      color: "#ffffff",
                    }}
                  >
                    <Download size={16} />
                    Export Students
                  </button>
                </div>
              </div>

              {/* Search */}
              <div
                className="p-4 border-b"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      size={18}
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      placeholder="Search by name, email, or PRN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border transition-all"
                      style={{
                        backgroundColor: colors.inputBg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                  <div
                    className="text-sm font-medium px-4 py-2"
                    style={{ color: colors.text }}
                  >
                    {filteredStudents.length} students
                  </div>
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    style={{
                      backgroundColor: colors.tableHeaderBg,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <tr>
                      <th
                        className="p-4 text-left text-sm font-semibold"
                        style={{ color: colors.text, width: "80px" }}
                      >
                        Sr No.
                      </th>
                      <th
                        className="p-4 text-left text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        Name
                      </th>
                      <th
                        className="p-4 text-left text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        Email
                      </th>
                      <th
                        className="p-4 text-left text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        PRN No.
                      </th>
                      <th
                        className="p-4 text-left text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        College Name
                      </th>
                      <th
                        className="p-4 text-center text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        Selected For
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        style={{
                          borderBottom: `1px solid ${colors.border}`,
                        }}
                      >
                        <td
                          className="p-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="p-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          {student.fullName}
                        </td>
                        <td
                          className="p-4"
                          style={{ color: colors.textSecondary }}
                        >
                          {student.email}
                        </td>
                        <td
                          className="p-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          {student.studentId}
                        </td>
                        <td
                          className="p-4"
                          style={{ color: colors.textSecondary }}
                        >
                          {student.collegeName}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                            style={{
                              backgroundColor: student.placementSelected
                                ? "#32D583"
                                : student.internshipSelected
                                  ? "#0BA5EC"
                                  : colors.border,
                              color: student.placementSelected || student.internshipSelected
                                ? "#ffffff"
                                : colors.textSecondary,
                            }}
                          >
                            {student.placementSelected
                              ? "Placement"
                              : student.internshipSelected
                                ? "Internship"
                                : "Not Selected"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="p-12 text-center">
                  <p
                    className="text-lg font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    No students found who cleared all rounds
                  </p>
                  <p
                    className="text-sm mt-2"
                    style={{ color: colors.textTertiary }}
                  >
                    Try selecting different filters or check back later
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDrivesManager;