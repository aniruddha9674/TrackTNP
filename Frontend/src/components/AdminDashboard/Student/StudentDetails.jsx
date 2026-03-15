import React, { useState, useMemo } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Code,
  MapPin,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Hardcoded student data
const STUDENTS_DATA = [
  {
    prn: "PRN2021001",
    personalInfo: {
      firstName: "Rahul",
      middleName: "Kumar",
      lastName: "Sharma",
      gender: "Male",
      dateOfBirth: "2002-05-15",
      studentMobNo: "+91 9876543210",
      parentMobNo: "+91 9876543211",
      studentEmail: "rahul.sharma@college.edu",
      personalEmail: "rahul.sharma@gmail.com",
      parentEmail: "parent.sharma@gmail.com",
      linkedin: "linkedin.com/in/rahulsharma",
      aadharNo: "1234 5678 9012",
      panNo: "ABCDE1234F",
      temporaryAddress: "Room 301, Hostel A, College Campus",
      permanentAddress: "123 MG Road, Mumbai",
      homeTown: "Mumbai",
      homeDistrict: "Mumbai",
      homeState: "Maharashtra",
      professionOfFather: "Business",
      designationOfFather: "Proprietor",
      organizationOfWorking: "Sharma Enterprises",
    },
    pastQualifications: {
      admissionYear: "2021",
      ssc: {
        board: "Maharashtra State Board",
        passingYear: "2018",
        schoolName: "Modern High School",
        city: "Mumbai",
        district: "Mumbai",
        state: "Maharashtra",
        percentage: "92.5",
      },
      hsc: {
        board: "Maharashtra State Board",
        passingYear: "2020",
        collegeName: "Science College",
        city: "Mumbai",
        district: "Mumbai",
        state: "Maharashtra",
        percentage: "88.2",
      },
    },
    academicDetails: {
      courseName: "B.Tech Computer Engineering",
      yearOfCompletion: "2025",
      collegeName: "Engineering College",
      branch: "Computer Engineering",
      universityRegNo: "UC2021001",
      honours: "None",
      rollNo: "21CE001",
      division: "First Class with Distinction",
      feSem1: { sgpa: "8.5" },
      feSem2: { sgpa: "8.7" },
      seSem1: { sgpa: "9.0" },
      seSem2: { sgpa: "9.2" },
      teSem1: { sgpa: "9.1" },
      teSem2: { sgpa: "9.3" },
      beSem1: { sgpa: "9.4" },
      beSem2: { sgpa: "-" },
      liveBacklogs: "0",
      deadBacklogs: "0",
      yearsDown: "0",
    },
    otherInfo: {
      certificates: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
        { name: "Google Cloud Professional", issuer: "Google", year: "2024" },
        { name: "Oracle Java SE Certification", issuer: "Oracle", year: "2023" },
      ],
      projects: [
        { title: "E-Commerce Platform", description: "Built a full-stack e-commerce platform using MERN stack with payment integration", technologies: "React, Node.js, MongoDB, Stripe" },
        { title: "AI Chatbot", description: "Developed an intelligent chatbot using NLP and machine learning", technologies: "Python, TensorFlow, Flask" },
        { title: "Social Media Analytics", description: "Created a dashboard for analyzing social media trends and engagement", technologies: "React, D3.js, Firebase" },
      ],
      internships: [
        { company: "Tech Corp", role: "Software Development Intern", duration: "May 2023 - July 2023", description: "Worked on backend APIs and database optimization" },
        { company: "StartupXYZ", role: "Full Stack Intern", duration: "Dec 2023 - Feb 2024", description: "Developed features for customer portal using React and Node.js" },
      ],
      technicalAchievements: "Winner of Smart India Hackathon 2023, Published research paper on AI/ML",
      nonTechnicalAchievements: "College Cultural Secretary, Winner of Inter-college debate competition",
      codingPlatforms: {
        leetcode: { profile: "rahul_sharma", rating: "1850" },
        codechef: { profile: "rahul_codes", rating: "5 Star" },
        github: { profile: "rahulsharma-dev", rating: "200+ repos" },
        codeforces: { profile: "rahul_cf", rating: "Expert" },
        hackerrank: { profile: "rahul_hr", rating: "Gold Badge" },
        gfg: { profile: "rahul_gfg", rating: "Institute Rank 1" },
      },
    },
    profileImage: null,
  },
  {
    prn: "PRN2021002",
    personalInfo: {
      firstName: "Priya",
      middleName: "Anil",
      lastName: "Patel",
      gender: "Female",
      dateOfBirth: "2002-08-22",
      studentMobNo: "+91 9876543220",
      parentMobNo: "+91 9876543221",
      studentEmail: "priya.patel@college.edu",
      personalEmail: "priya.patel@gmail.com",
      parentEmail: "parent.patel@gmail.com",
      linkedin: "linkedin.com/in/priyapatel",
      aadharNo: "2345 6789 0123",
      panNo: "BCDEF2345G",
      temporaryAddress: "Room 205, Hostel B, College Campus",
      permanentAddress: "456 Station Road, Pune",
      homeTown: "Pune",
      homeDistrict: "Pune",
      homeState: "Maharashtra",
      professionOfFather: "Engineer",
      designationOfFather: "Senior Manager",
      organizationOfWorking: "Tech Solutions Pvt Ltd",
    },
    pastQualifications: {
      admissionYear: "2021",
      ssc: {
        board: "CBSE",
        passingYear: "2018",
        schoolName: "Delhi Public School",
        city: "Pune",
        district: "Pune",
        state: "Maharashtra",
        percentage: "95.0",
      },
      hsc: {
        board: "CBSE",
        passingYear: "2020",
        collegeName: "Junior Science College",
        city: "Pune",
        district: "Pune",
        state: "Maharashtra",
        percentage: "91.5",
      },
    },
    academicDetails: {
      courseName: "B.Tech Computer Engineering",
      yearOfCompletion: "2025",
      collegeName: "Engineering College",
      branch: "Computer Engineering",
      universityRegNo: "UC2021002",
      honours: "Machine Learning",
      rollNo: "21CE002",
      division: "First Class with Distinction",
      feSem1: { sgpa: "9.2" },
      feSem2: { sgpa: "9.5" },
      seSem1: { sgpa: "9.6" },
      seSem2: { sgpa: "9.7" },
      teSem1: { sgpa: "9.8" },
      teSem2: { sgpa: "9.9" },
      beSem1: { sgpa: "10.0" },
      beSem2: { sgpa: "-" },
      liveBacklogs: "0",
      deadBacklogs: "0",
      yearsDown: "0",
    },
    otherInfo: {
      certificates: [
        { name: "Microsoft Azure AI Engineer", issuer: "Microsoft", year: "2023" },
        { name: "Deep Learning Specialization", issuer: "Coursera - Andrew Ng", year: "2023" },
        { name: "Kubernetes Administrator", issuer: "Linux Foundation", year: "2024" },
        { name: "Ethical Hacking", issuer: "EC-Council", year: "2023" },
      ],
      projects: [
        { title: "ML-based Recommendation System", description: "Built a collaborative filtering recommendation engine for e-learning platform", technologies: "Python, TensorFlow, Scikit-learn" },
        { title: "Real-time Chat Application", description: "Developed scalable chat app with WebSocket support", technologies: "Node.js, Socket.io, Redis, React" },
        { title: "Computer Vision App", description: "Created object detection system for inventory management", technologies: "Python, OpenCV, YOLO, FastAPI" },
        { title: "Blockchain Voting System", description: "Implemented secure voting platform using blockchain technology", technologies: "Solidity, Ethereum, Web3.js" },
      ],
      internships: [
        { company: "Google", role: "Software Engineering Intern", duration: "May 2023 - Aug 2023", description: "Worked on Google Cloud ML infrastructure and optimization" },
        { company: "Microsoft", role: "Research Intern", duration: "Dec 2023 - Mar 2024", description: "Contributed to Azure AI research projects focusing on NLP" },
        { company: "Amazon", role: "SDE Intern", duration: "June 2024 - Aug 2024", description: "Developed features for AWS Lambda serverless computing" },
      ],
      technicalAchievements: "Google Summer of Code 2023, ACM ICPC Regionalist, 3 Research Publications",
      nonTechnicalAchievements: "National Level Kathak Dancer, TEDx Speaker",
      codingPlatforms: {
        leetcode: { profile: "priya_codes", rating: "2100" },
        codechef: { profile: "priya_chef", rating: "6 Star" },
        github: { profile: "priyapatel-dev", rating: "500+ contributions" },
        codeforces: { profile: "priya_cf", rating: "Candidate Master" },
        hackerrank: { profile: "priya_hr", rating: "Platinum Badge" },
        gfg: { profile: "priya_gfg", rating: "Top Contributor" },
      },
    },
    profileImage: null,
  },
  {
    prn: "PRN2021003",
    personalInfo: {
      firstName: "Arjun",
      middleName: "Singh",
      lastName: "Rathore",
      gender: "Male",
      dateOfBirth: "2003-01-10",
      studentMobNo: "+91 9876543230",
      parentMobNo: "+91 9876543231",
      studentEmail: "arjun.rathore@college.edu",
      personalEmail: "arjun.rathore@gmail.com",
      parentEmail: "parent.rathore@gmail.com",
      linkedin: "linkedin.com/in/arjunrathore",
      aadharNo: "3456 7890 1234",
      panNo: "CDEFG3456H",
      temporaryAddress: "Room 401, Hostel C, College Campus",
      permanentAddress: "789 Lake View, Nagpur",
      homeTown: "Nagpur",
      homeDistrict: "Nagpur",
      homeState: "Maharashtra",
      professionOfFather: "Government Service",
      designationOfFather: "IAS Officer",
      organizationOfWorking: "State Government",
    },
    pastQualifications: {
      admissionYear: "2021",
      ssc: {
        board: "CBSE",
        passingYear: "2018",
        schoolName: "Kendriya Vidyalaya",
        city: "Nagpur",
        district: "Nagpur",
        state: "Maharashtra",
        percentage: "93.8",
      },
      hsc: {
        board: "CBSE",
        passingYear: "2020",
        collegeName: "Central Academy",
        city: "Nagpur",
        district: "Nagpur",
        state: "Maharashtra",
        percentage: "89.6",
      },
    },
    academicDetails: {
      courseName: "B.Tech Computer Engineering",
      yearOfCompletion: "2025",
      collegeName: "Engineering College",
      branch: "Computer Engineering",
      universityRegNo: "UC2021003",
      honours: "Cybersecurity",
      rollNo: "21CE003",
      division: "First Class",
      feSem1: { sgpa: "8.2" },
      feSem2: { sgpa: "8.4" },
      seSem1: { sgpa: "8.6" },
      seSem2: { sgpa: "8.8" },
      teSem1: { sgpa: "8.9" },
      teSem2: { sgpa: "9.0" },
      beSem1: { sgpa: "9.1" },
      beSem2: { sgpa: "-" },
      liveBacklogs: "0",
      deadBacklogs: "1",
      yearsDown: "0",
    },
    otherInfo: {
      certificates: [
        { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", year: "2023" },
        { name: "CompTIA Security+", issuer: "CompTIA", year: "2023" },
        { name: "Offensive Security OSCP", issuer: "Offensive Security", year: "2024" },
      ],
      projects: [
        { title: "Network Security Scanner", description: "Built a comprehensive network vulnerability scanner", technologies: "Python, Nmap, Scapy" },
        { title: "Penetration Testing Framework", description: "Developed automated pentesting tool for web applications", technologies: "Python, Burp Suite API, SQLMap" },
        { title: "Secure Cloud Storage", description: "Created encrypted cloud storage solution with zero-knowledge architecture", technologies: "Node.js, AES-256, AWS S3" },
      ],
      internships: [
        { company: "CyberSec Solutions", role: "Security Analyst Intern", duration: "May 2023 - July 2023", description: "Conducted security audits and vulnerability assessments" },
        { company: "InfoTech Security", role: "Penetration Testing Intern", duration: "Jan 2024 - Mar 2024", description: "Performed ethical hacking and security testing for clients" },
      ],
      technicalAchievements: "Cybersecurity CTF Winner, Bug Bounty Hunter on HackerOne",
      nonTechnicalAchievements: "Basketball Team Captain, State Level Chess Player",
      codingPlatforms: {
        leetcode: { profile: "arjun_sec", rating: "1650" },
        codechef: { profile: "arjun_chef", rating: "4 Star" },
        github: { profile: "arjunrathore-sec", rating: "150+ repos" },
        codeforces: { profile: "arjun_cf", rating: "Specialist" },
        hackerrank: { profile: "arjun_hr", rating: "Silver Badge" },
        gfg: { profile: "arjun_gfg", rating: "Active Contributor" },
      },
    },
    profileImage: null,
  },
];

// ── Helper Component ──────────────────────────────────────────────────────────
const InfoItem = ({ icon, label, value, isDark }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      {icon && <span className={isDark ? "text-slate-500" : "text-slate-400"}>{icon}</span>}
      <label className={`text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{label}</label>
    </div>
    <p className={`text-sm sm:text-base font-medium ${isDark ? "text-slate-50" : "text-slate-900"} break-words`}>
      {value || "Not provided"}
    </p>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const TrackAndPlacement = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Verification state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({}); // { [prn]: "verified" | "rejected" }
  const [verifyChecks, setVerifyChecks] = useState({
    ssc: false, hsc: false, feMarksheet: false, seMarksheet: false,
    teMarksheet: false, beMarksheet: false,
  });

  const VERIFY_DOCS = (student) => [
    { key: "ssc", label: "10th Marksheet (SSC)", detail: `${student.pastQualifications.ssc.percentage}% — ${student.pastQualifications.ssc.board}` },
    { key: "hsc", label: "12th / Diploma Marksheet", detail: `${student.pastQualifications.hsc.percentage}% — ${student.pastQualifications.hsc.board}` },
    { key: "feMarksheet", label: "First Year (FE) Marksheet", detail: `Sem 1: ${student.academicDetails.feSem1.sgpa} | Sem 2: ${student.academicDetails.feSem2.sgpa}` },
    { key: "seMarksheet", label: "Second Year (SE) Marksheet", detail: `Sem 1: ${student.academicDetails.seSem1.sgpa} | Sem 2: ${student.academicDetails.seSem2.sgpa}` },
    { key: "teMarksheet", label: "Third Year (TE) Marksheet", detail: `Sem 1: ${student.academicDetails.teSem1.sgpa} | Sem 2: ${student.academicDetails.teSem2.sgpa}` },
    { key: "beMarksheet", label: "Fourth Year (BE) Marksheet", detail: `Sem 1: ${student.academicDetails.beSem1.sgpa} | Sem 2: ${student.academicDetails.beSem2.sgpa}` },
  ];

  const TOTAL_DOCS = 6;

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return STUDENTS_DATA.filter(
      (student) =>
        student.prn.toLowerCase().includes(query) ||
        `${student.personalInfo.firstName} ${student.personalInfo.lastName}`
          .toLowerCase()
          .includes(query)
    );
  }, [searchQuery]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const calculateCGPA = (academicDetails) => {
    const semKeys = Object.keys(academicDetails).filter((k) => k.includes("Sem"));
    const sgpas = semKeys
      .map((k) => parseFloat(academicDetails[k]?.sgpa))
      .filter((v) => !isNaN(v));
    if (sgpas.length === 0) return "N/A";
    return (sgpas.reduce((a, b) => a + b, 0) / sgpas.length).toFixed(2);
  };

  const checkedCount = Object.values(verifyChecks).filter(Boolean).length;
  const allChecked = checkedCount === TOTAL_DOCS;

  const handleSelectAll = (checked) => {
    setVerifyChecks({
      ssc: checked, hsc: checked, feMarksheet: checked,
      seMarksheet: checked, teMarksheet: checked, beMarksheet: checked,
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen ${isDarkTheme
        ? "bg-gradient-to-br from-slate-950 to-slate-900"
        : "bg-gradient-to-br from-slate-50 to-slate-100"
        } p-3 sm:p-6`}
    >
      <style>{`
        .scrollbar-custom::-webkit-scrollbar { width: 8px; height: 8px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: ${isDarkTheme ? "#1e293b" : "#f1f5f9"}; border-radius: 4px; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: ${isDarkTheme ? "#475569" : "#cbd5e1"}; border-radius: 4px; }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover { background: ${isDarkTheme ? "#64748b" : "#94a3b8"}; }
      `}</style>

      {/* ── Header ── */}
      <div className={`${isDarkTheme ? "bg-slate-900/80" : "bg-white/80"} backdrop-blur-sm border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"} sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className={`text-xl sm:text-3xl font-bold ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                Track & Placement Portal
              </h1>
              <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-600"} mt-1`}>
                Search and view student placement records
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by PRN or name..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              className={`w-full pl-10 sm:pl-12 pr-4 h-12 sm:h-14 text-base sm:text-lg rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none ${isDarkTheme
                ? "bg-slate-950 border-slate-600 text-slate-50"
                : "bg-white border-slate-300 text-slate-900"
                }`}
            />
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && showDropdown && filteredStudents.length > 0 && (
            <div className={`absolute mt-2 left-3 right-3 sm:left-6 sm:right-6 max-w-7xl ${isDarkTheme ? "bg-slate-900" : "bg-white"} rounded-xl shadow-2xl border-2 ${isDarkTheme ? "border-slate-700" : "border-slate-200"} overflow-hidden z-50`}>
              {filteredStudents.map((student) => (
                <button
                  key={student.prn}
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 ${isDarkTheme ? "hover:bg-slate-800" : "hover:bg-slate-50"} transition-colors text-left border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"} last:border-0`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 ${isDarkTheme ? "bg-blue-900/30" : "bg-blue-100"} rounded-lg`}>
                      <User className={`w-4 h-4 sm:w-6 sm:h-6 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm sm:text-base ${isDarkTheme ? "text-slate-50" : "text-slate-900"} truncate`}>
                        {student.personalInfo.firstName} {student.personalInfo.lastName}
                      </p>
                      <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-600"} truncate`}>
                        {student.prn} • {student.academicDetails.branch}
                      </p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${isDarkTheme ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                      CGPA: {calculateCGPA(student.academicDetails)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {searchQuery && showDropdown && filteredStudents.length === 0 && (
            <div className={`absolute mt-2 left-3 right-3 sm:left-6 sm:right-6 max-w-7xl ${isDarkTheme ? "bg-slate-900" : "bg-white"} rounded-xl shadow-xl border-2 ${isDarkTheme ? "border-slate-700" : "border-slate-200"} p-4 sm:p-6 text-center z-50`}>
              <p className={isDarkTheme ? "text-slate-400" : "text-slate-600"}>
                No students found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Student Details ── */}
      {selectedStudent ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => { setSelectedStudent(null); setSearchQuery(""); setShowDropdown(false); }}
              className={`font-medium text-sm sm:text-base transition-colors ${isDarkTheme
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
                }`}
            >
              ← Back to search
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">

            {/* ── Profile Header Card ── */}
            <div className={`rounded-xl border-2 ${isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} shadow-lg`}>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>

                  {/* Name / info */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h2 className={`text-xl sm:text-2xl font-bold ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                      {selectedStudent.personalInfo.firstName} {selectedStudent.personalInfo.middleName} {selectedStudent.personalInfo.lastName}
                    </h2>
                    <p className={`text-sm sm:text-base ${isDarkTheme ? "text-slate-400" : "text-slate-600"} mt-1`}>
                      {selectedStudent.academicDetails.branch}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkTheme ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                        {selectedStudent.prn}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkTheme ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"}`}>
                        CGPA: {calculateCGPA(selectedStudent.academicDetails)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkTheme ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                        {selectedStudent.academicDetails.division}
                      </span>
                    </div>
                  </div>

                  {/* Verify button + status — top-right */}
                  <div className="flex items-center gap-2 shrink-0">
                    {verificationStatus[selectedStudent.prn] && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold ${verificationStatus[selectedStudent.prn] === "verified"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        }`}>
                        {verificationStatus[selectedStudent.prn] === "verified" ? "✓ Verified" : "✗ Not Verified"}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setVerifyChecks({ ssc: false, hsc: false, feMarksheet: false, seMarksheet: false, teMarksheet: false, beMarksheet: false });
                        setShowVerifyModal(true);
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-all border ${isDarkTheme
                          ? "bg-slate-700 hover:bg-slate-600 text-slate-100 border-slate-600"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm"
                        }`}
                    >
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Verify Documents
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Personal Information ── */}
            <div className={`rounded-xl border-2 ${isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} shadow-lg overflow-hidden`}>
              <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`}>
                <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                  <User className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                  Personal Information
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <InfoItem icon={<Mail className="w-4 h-4" />} label="Student Email" value={selectedStudent.personalInfo.studentEmail} isDark={isDarkTheme} />
                  <InfoItem icon={<Mail className="w-4 h-4" />} label="Personal Email" value={selectedStudent.personalInfo.personalEmail} isDark={isDarkTheme} />
                  <InfoItem icon={<Phone className="w-4 h-4" />} label="Student Mobile" value={selectedStudent.personalInfo.studentMobNo} isDark={isDarkTheme} />
                  <InfoItem icon={<Phone className="w-4 h-4" />} label="Parent Mobile" value={selectedStudent.personalInfo.parentMobNo} isDark={isDarkTheme} />
                  <InfoItem icon={<MapPin className="w-4 h-4" />} label="Home Town" value={selectedStudent.personalInfo.homeTown} isDark={isDarkTheme} />
                  <InfoItem label="Date of Birth" value={selectedStudent.personalInfo.dateOfBirth} isDark={isDarkTheme} />
                  <InfoItem label="Gender" value={selectedStudent.personalInfo.gender} isDark={isDarkTheme} />
                  <InfoItem label="Aadhar No" value={selectedStudent.personalInfo.aadharNo} isDark={isDarkTheme} />
                  <InfoItem label="LinkedIn" value={selectedStudent.personalInfo.linkedin} isDark={isDarkTheme} />
                </div>
              </div>
            </div>

            {/* ── Academic Details ── */}
            <div className={`rounded-xl border-2 ${isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} shadow-lg overflow-hidden`}>
              <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`}>
                <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                  <GraduationCap className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                  Academic Details
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <InfoItem label="Course" value={selectedStudent.academicDetails.courseName} isDark={isDarkTheme} />
                  <InfoItem label="Branch" value={selectedStudent.academicDetails.branch} isDark={isDarkTheme} />
                  <InfoItem label="Roll No" value={selectedStudent.academicDetails.rollNo} isDark={isDarkTheme} />
                  <InfoItem label="University Reg No" value={selectedStudent.academicDetails.universityRegNo} isDark={isDarkTheme} />
                  <InfoItem label="Year of Completion" value={selectedStudent.academicDetails.yearOfCompletion} isDark={isDarkTheme} />
                  <InfoItem label="Honours" value={selectedStudent.academicDetails.honours || "None"} isDark={isDarkTheme} />
                  <InfoItem label="Live Backlogs" value={selectedStudent.academicDetails.liveBacklogs} isDark={isDarkTheme} />
                  <InfoItem label="Dead Backlogs" value={selectedStudent.academicDetails.deadBacklogs} isDark={isDarkTheme} />
                  <InfoItem label="Years Down" value={selectedStudent.academicDetails.yearsDown} isDark={isDarkTheme} />
                </div>
                <h4 className={`font-semibold text-base sm:text-lg mb-3 sm:mb-4 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                  Semester-wise SGPA
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                  {Object.entries(selectedStudent.academicDetails)
                    .filter(([key]) => key.includes("Sem"))
                    .map(([key, value]) => (
                      <div key={key} className={`${isDarkTheme ? "bg-slate-800" : "bg-slate-50"} rounded-lg p-3 sm:p-4 text-center`}>
                        <p className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-600"} mb-1`}>
                          {key.replace("Sem", " Sem ").toUpperCase()}
                        </p>
                        <p className={`text-lg sm:text-xl font-bold ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>
                          {value.sgpa || "-"}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* ── Past Qualifications ── */}
            <div className={`rounded-xl border-2 ${isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} shadow-lg overflow-hidden`}>
              <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`}>
                <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                  <Award className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                  Past Qualifications
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 sm:mb-4 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>SSC Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <InfoItem label="Board" value={selectedStudent.pastQualifications.ssc.board} isDark={isDarkTheme} />
                    <InfoItem label="School Name" value={selectedStudent.pastQualifications.ssc.schoolName} isDark={isDarkTheme} />
                    <InfoItem label="Passing Year" value={selectedStudent.pastQualifications.ssc.passingYear} isDark={isDarkTheme} />
                    <InfoItem label="Percentage" value={`${selectedStudent.pastQualifications.ssc.percentage}%`} isDark={isDarkTheme} />
                    <InfoItem label="City" value={selectedStudent.pastQualifications.ssc.city} isDark={isDarkTheme} />
                    <InfoItem label="State" value={selectedStudent.pastQualifications.ssc.state} isDark={isDarkTheme} />
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 sm:mb-4 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>HSC Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <InfoItem label="Board" value={selectedStudent.pastQualifications.hsc.board} isDark={isDarkTheme} />
                    <InfoItem label="College Name" value={selectedStudent.pastQualifications.hsc.collegeName} isDark={isDarkTheme} />
                    <InfoItem label="Passing Year" value={selectedStudent.pastQualifications.hsc.passingYear} isDark={isDarkTheme} />
                    <InfoItem label="Percentage" value={`${selectedStudent.pastQualifications.hsc.percentage}%`} isDark={isDarkTheme} />
                    <InfoItem label="City" value={selectedStudent.pastQualifications.hsc.city} isDark={isDarkTheme} />
                    <InfoItem label="State" value={selectedStudent.pastQualifications.hsc.state} isDark={isDarkTheme} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Achievements & Coding Platforms ── */}
            <div className={`rounded-xl border-2 ${isDarkTheme ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} shadow-lg overflow-hidden`}>
              <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`}>
                <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                  <Code className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                  Achievements & Coding Profiles
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-6">

                {/* Certificates */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Certificates</h4>
                  {selectedStudent.otherInfo.certificates?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {selectedStudent.otherInfo.certificates.map((cert, index) => (
                        <div key={index} className={`${isDarkTheme ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"} p-4 rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow`}>
                          <p className={`font-semibold text-sm sm:text-base ${isDarkTheme ? "text-slate-50" : "text-slate-900"} mb-1`}>{cert.name}</p>
                          <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-700"}`}>{cert.issuer}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${isDarkTheme ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                            {cert.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm p-4 rounded-lg ${isDarkTheme ? "text-slate-400 bg-slate-800" : "text-slate-600 bg-slate-50"}`}>Not provided</p>
                  )}
                </div>

                {/* Projects */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Projects</h4>
                  {selectedStudent.otherInfo.projects?.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {selectedStudent.otherInfo.projects.map((project, index) => (
                        <div key={index} className={`${isDarkTheme ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"} p-4 rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow`}>
                          <p className={`font-semibold text-sm sm:text-base ${isDarkTheme ? "text-slate-50" : "text-slate-900"} mb-2`}>{project.title}</p>
                          <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-700"} mb-2`}>{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.split(",").map((tech, i) => (
                              <span key={i} className={`px-2 py-1 rounded text-xs font-medium ${isDarkTheme ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"}`}>
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm p-4 rounded-lg ${isDarkTheme ? "text-slate-400 bg-slate-800" : "text-slate-600 bg-slate-50"}`}>Not provided</p>
                  )}
                </div>

                {/* Internships */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Internships</h4>
                  {selectedStudent.otherInfo.internships?.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {selectedStudent.otherInfo.internships.map((internship, index) => (
                        <div key={index} className={`${isDarkTheme ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"} p-4 rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow`}>
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <p className={`font-semibold text-sm sm:text-base ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>{internship.role}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${isDarkTheme ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"}`}>
                              {internship.duration}
                            </span>
                          </div>
                          <p className={`text-sm font-medium mb-2 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`}>{internship.company}</p>
                          <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-700"}`}>{internship.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm p-4 rounded-lg ${isDarkTheme ? "text-slate-400 bg-slate-800" : "text-slate-600 bg-slate-50"}`}>Not provided</p>
                  )}
                </div>

                {/* Technical Achievements */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Technical Achievements</h4>
                  <p className={`text-xs sm:text-sm p-4 rounded-lg ${isDarkTheme ? "text-slate-400 bg-slate-800" : "text-slate-700 bg-slate-50"}`}>
                    {selectedStudent.otherInfo.technicalAchievements || "Not provided"}
                  </p>
                </div>

                {/* Non-Technical Achievements */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Non-Technical Achievements</h4>
                  <p className={`text-xs sm:text-sm p-4 rounded-lg ${isDarkTheme ? "text-slate-400 bg-slate-800" : "text-slate-700 bg-slate-50"}`}>
                    {selectedStudent.otherInfo.nonTechnicalAchievements || "Not provided"}
                  </p>
                </div>

                {/* Coding Platforms */}
                <div>
                  <h4 className={`font-semibold text-base sm:text-lg mb-3 sm:mb-4 ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>Coding Platforms</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {Object.entries(selectedStudent.otherInfo.codingPlatforms).map(([platform, data]) =>
                      data.profile && (
                        <div key={platform} className={`${isDarkTheme ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"} p-4 rounded-lg border-2 shadow-sm`}>
                          <p className={`text-xs font-semibold uppercase mb-1 ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>{platform}</p>
                          <p className={`text-xs sm:text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-700"} mb-1 break-all`}>{data.profile}</p>
                          {data.rating && (
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${isDarkTheme ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                              {data.rating}
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <div className={`inline-flex p-4 sm:p-6 ${isDarkTheme ? "bg-blue-900/30" : "bg-blue-100"} rounded-full mb-4 sm:mb-6`}>
              <Search className={`w-12 h-12 sm:w-16 sm:h-16 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold ${isDarkTheme ? "text-slate-50" : "text-slate-900"} mb-2 sm:mb-3`}>
              Search for a Student
            </h2>
            <p className={`text-sm ${isDarkTheme ? "text-slate-400" : "text-slate-600"} max-w-md mx-auto px-4`}>
              Enter a PRN number or student name in the search box above to view detailed placement records and academic information.
            </p>
          </div>
        </div>
      )}

      {/* ── Document Verification Modal ── */}
      {showVerifyModal && selectedStudent && (
        <div className={`fixed inset-0 ${isDarkTheme ? "bg-black/80" : "bg-black/60"} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
          <div className={`w-full max-w-lg rounded-xl shadow-2xl border ${isDarkTheme ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}>

            {/* Modal Header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between ${isDarkTheme ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"} rounded-t-xl`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${isDarkTheme ? "bg-blue-900/30" : "bg-blue-100"}`}>
                  <Award className={`w-5 h-5 ${isDarkTheme ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDarkTheme ? "text-slate-50" : "text-slate-900"}`}>
                    Document Verification
                  </h3>
                  <p className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                    {selectedStudent.personalInfo.firstName} {selectedStudent.personalInfo.lastName} • {selectedStudent.prn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className={`p-1.5 rounded transition-colors ${isDarkTheme ? "hover:bg-slate-700 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Checklist */}
            <div className="p-5 space-y-1.5 max-h-[60vh] overflow-y-auto scrollbar-custom">
              <p className={`text-xs font-medium mb-3 ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                Check all documents that have been verified:
              </p>

              {/* Select All row */}
              <label className={`flex items-center gap-3 px-4 py-3 border-b cursor-pointer transition-colors ${isDarkTheme ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"
                }`}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => { if (el) el.indeterminate = checkedCount > 0 && !allChecked; }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 accent-green-500 cursor-pointer"
                />
                <span className={`text-sm font-semibold ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
                  Select All
                </span>
                <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded ${allChecked
                    ? "bg-green-100 text-green-700"
                    : isDarkTheme ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}>
                  {checkedCount}/{TOTAL_DOCS}
                </span>
              </label>

              {/* Individual document rows */}
              {VERIFY_DOCS(selectedStudent).map(({ key, label, detail }, idx) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4 ${verifyChecks[key]
                      ? isDarkTheme
                        ? "border-l-green-500 bg-green-900/10"
                        : "border-l-green-500 bg-green-50"
                      : isDarkTheme
                        ? "border-l-transparent hover:bg-slate-800"
                        : "border-l-transparent hover:bg-slate-50"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={verifyChecks[key]}
                    onChange={(e) => setVerifyChecks(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 accent-green-500 cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isDarkTheme ? "text-slate-100" : "text-slate-800"}`}>
                      {label}
                    </p>
                    <p className={`text-xs mt-0.5 ${isDarkTheme ? "text-slate-500" : "text-slate-400"}`}>
                      {detail}
                    </p>
                  </div>
                  {verifyChecks[key] && (
                    <span className="text-green-500 text-sm font-bold shrink-0">✓</span>
                  )}
                </label>
              ))}

              {/* Progress Bar */}
              <div className={`pt-3 border-t ${isDarkTheme ? "border-slate-700" : "border-slate-200"}`}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={isDarkTheme ? "text-slate-400" : "text-slate-500"}>
                    {checkedCount} of {TOTAL_DOCS} documents verified
                  </span>
                  <span className={`font-semibold ${allChecked ? "text-green-500" : isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                    {Math.round((checkedCount / TOTAL_DOCS) * 100)}%
                  </span>
                </div>
                <div className={`w-full h-1.5 rounded-full ${isDarkTheme ? "bg-slate-700" : "bg-slate-200"}`}>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${allChecked ? "bg-green-500" : "bg-blue-500"}`}
                    style={{ width: `${(checkedCount / TOTAL_DOCS) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`px-5 py-4 border-t flex gap-3 rounded-b-xl ${isDarkTheme ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
              <button
                onClick={() => setShowVerifyModal(false)}
                className={`flex-1 px-4 py-2.5 rounded border font-semibold text-sm transition-all ${isDarkTheme
                    ? "border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-200"
                    : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setVerificationStatus(prev => ({
                    ...prev,
                    [selectedStudent.prn]: allChecked ? "verified" : "rejected",
                  }));
                  setShowVerifyModal(false);
                }}
                className={`flex-1 px-4 py-2.5 rounded font-semibold text-sm transition-all text-white ${allChecked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {allChecked ? "✓ Mark as Verified" : "✗ Mark as Not Verified"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackAndPlacement;