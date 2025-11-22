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
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Badge } from "./badge";
import { Button } from "./button";
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
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          year: "2023",
        },
        { name: "Google Cloud Professional", issuer: "Google", year: "2024" },
        {
          name: "Oracle Java SE Certification",
          issuer: "Oracle",
          year: "2023",
        },
      ],
      projects: [
        {
          title: "E-Commerce Platform",
          description:
            "Built a full-stack e-commerce platform using MERN stack with payment integration",
          technologies: "React, Node.js, MongoDB, Stripe",
        },
        {
          title: "AI Chatbot",
          description:
            "Developed an intelligent chatbot using NLP and machine learning",
          technologies: "Python, TensorFlow, Flask",
        },
        {
          title: "Social Media Analytics",
          description:
            "Created a dashboard for analyzing social media trends and engagement",
          technologies: "React, D3.js, Firebase",
        },
      ],
      internships: [
        {
          company: "Tech Corp",
          role: "Software Development Intern",
          duration: "May 2023 - July 2023",
          description: "Worked on backend APIs and database optimization",
        },
        {
          company: "StartupXYZ",
          role: "Full Stack Intern",
          duration: "Dec 2023 - Feb 2024",
          description:
            "Developed features for customer portal using React and Node.js",
        },
      ],
      technicalAchievements:
        "Winner of Smart India Hackathon 2023, Published research paper on AI/ML",
      nonTechnicalAchievements:
        "College Cultural Secretary, Winner of Inter-college debate competition",
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
        {
          name: "Microsoft Azure AI Engineer",
          issuer: "Microsoft",
          year: "2023",
        },
        {
          name: "Deep Learning Specialization",
          issuer: "Coursera - Andrew Ng",
          year: "2023",
        },
        {
          name: "Kubernetes Administrator",
          issuer: "Linux Foundation",
          year: "2024",
        },
        { name: "Ethical Hacking", issuer: "EC-Council", year: "2023" },
      ],
      projects: [
        {
          title: "ML-based Recommendation System",
          description:
            "Built a collaborative filtering recommendation engine for e-learning platform",
          technologies: "Python, TensorFlow, Scikit-learn",
        },
        {
          title: "Real-time Chat Application",
          description: "Developed scalable chat app with WebSocket support",
          technologies: "Node.js, Socket.io, Redis, React",
        },
        {
          title: "Computer Vision App",
          description:
            "Created object detection system for inventory management",
          technologies: "Python, OpenCV, YOLO, FastAPI",
        },
        {
          title: "Blockchain Voting System",
          description:
            "Implemented secure voting platform using blockchain technology",
          technologies: "Solidity, Ethereum, Web3.js",
        },
      ],
      internships: [
        {
          company: "Google",
          role: "Software Engineering Intern",
          duration: "May 2023 - Aug 2023",
          description:
            "Worked on Google Cloud ML infrastructure and optimization",
        },
        {
          company: "Microsoft",
          role: "Research Intern",
          duration: "Dec 2023 - Mar 2024",
          description:
            "Contributed to Azure AI research projects focusing on NLP",
        },
        {
          company: "Amazon",
          role: "SDE Intern",
          duration: "June 2024 - Aug 2024",
          description: "Developed features for AWS Lambda serverless computing",
        },
      ],
      technicalAchievements:
        "Google Summer of Code 2023, ACM ICPC Regionalist, 3 Research Publications",
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
        {
          name: "Certified Ethical Hacker (CEH)",
          issuer: "EC-Council",
          year: "2023",
        },
        { name: "CompTIA Security+", issuer: "CompTIA", year: "2023" },
        {
          name: "Offensive Security OSCP",
          issuer: "Offensive Security",
          year: "2024",
        },
      ],
      projects: [
        {
          title: "Network Security Scanner",
          description: "Built a comprehensive network vulnerability scanner",
          technologies: "Python, Nmap, Scapy",
        },
        {
          title: "Penetration Testing Framework",
          description:
            "Developed automated pentesting tool for web applications",
          technologies: "Python, Burp Suite API, SQLMap",
        },
        {
          title: "Secure Cloud Storage",
          description:
            "Created encrypted cloud storage solution with zero-knowledge architecture",
          technologies: "Node.js, AES-256, AWS S3",
        },
      ],
      internships: [
        {
          company: "CyberSec Solutions",
          role: "Security Analyst Intern",
          duration: "May 2023 - July 2023",
          description:
            "Conducted security audits and vulnerability assessments",
        },
        {
          company: "InfoTech Security",
          role: "Penetration Testing Intern",
          duration: "Jan 2024 - Mar 2024",
          description:
            "Performed ethical hacking and security testing for clients",
        },
      ],
      technicalAchievements:
        "Cybersecurity CTF Winner, Bug Bounty Hunter on HackerOne",
      nonTechnicalAchievements:
        "Basketball Team Captain, State Level Chess Player",
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

const getLightTheme = () => ({
  background: "bg-gradient-to-br from-slate-50 to-slate-100",
  cardBg: "bg-white",
  cardBorder: "border-slate-200",
  cardShadow: "shadow-md",
  cardHoverShadow: "hover:shadow-xl",
  textPrimary: "text-slate-900",
  textSecondary: "text-slate-600",
  textTertiary: "text-slate-400",
  inputBg: "bg-white",
  inputBorder: "border-slate-300",
  modalOverlay: "bg-black/60",
  modalBg: "bg-slate-50",
  modalHeader: "bg-white",
  modalHeaderBorder: "border-slate-200",
  statCard1Gradient: "from-white to-blue-50",
  statCard2Gradient: "from-white to-green-50",
  statCard3Gradient: "from-white to-purple-50",
  statCard4Gradient: "from-white to-amber-50",
  statIcon1Bg: "bg-blue-100",
  statIcon1Text: "text-blue-600",
  statIcon2Bg: "bg-green-100",
  statIcon2Text: "text-green-600",
  statIcon3Bg: "bg-purple-100",
  statIcon3Text: "text-purple-600",
  statIcon4Bg: "bg-amber-100",
  statIcon4Text: "text-amber-600",
  dividerBorder: "border-slate-200",
  buttonBg: "bg-white",
  buttonBorder: "border-slate-300",
  buttonHover: "hover:bg-slate-50",
  tableBg: "bg-white",
  tableHeaderBg: "bg-slate-100",
  tableRowHover: "hover:bg-slate-50",
  checkboxBorder: "border-slate-300",
  scrollbar: "scrollbar-light",
});

const getDarkTheme = () => ({
  background: "bg-gradient-to-br from-slate-950 to-slate-900",
  cardBg: "bg-slate-900",
  cardBorder: "border-slate-700",
  cardShadow: "shadow-lg shadow-black/20",
  cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
  textPrimary: "text-slate-50",
  textSecondary: "text-slate-400",
  textTertiary: "text-slate-500",
  inputBg: "bg-slate-950",
  inputBorder: "border-slate-600",
  modalOverlay: "bg-black/80",
  modalBg: "bg-slate-950",
  modalHeader: "bg-slate-900",
  modalHeaderBorder: "border-slate-700",
  statCard1Gradient: "from-slate-800 to-blue-900/30",
  statCard2Gradient: "from-slate-800 to-green-900/30",
  statCard3Gradient: "from-slate-800 to-purple-900/30",
  statCard4Gradient: "from-slate-800 to-amber-900/30",
  statIcon1Bg: "bg-blue-900/30",
  statIcon1Text: "text-blue-400",
  statIcon2Bg: "bg-green-900/30",
  statIcon2Text: "text-green-400",
  statIcon3Bg: "bg-purple-900/30",
  statIcon3Text: "text-purple-400",
  statIcon4Bg: "bg-amber-900/30",
  statIcon4Text: "text-amber-400",
  dividerBorder: "border-slate-700",
  buttonBg: "bg-slate-700",
  buttonBorder: "border-slate-600",
  buttonHover: "hover:bg-slate-600",
  tableBg: "bg-slate-900",
  tableHeaderBg: "bg-slate-800",
  tableRowHover: "hover:bg-slate-800/50",
  checkboxBorder: "border-slate-600",
  scrollbar: "scrollbar-dark",
});

const TrackAndPlacement = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

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

  const calculateCGPA = (semesters) => {
    const sgpas = Object.values(semesters)
      .map((sem) => parseFloat(sem.sgpa))
      .filter((sgpa) => !isNaN(sgpa));
    if (sgpas.length === 0) return "N/A";
    const sum = sgpas.reduce((acc, val) => acc + val, 0);
    return (sum / sgpas.length).toFixed(2);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <style>{`
        .scrollbar-light::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-light::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .scrollbar-light::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .scrollbar-dark::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-dark::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
      {/* Header */}
      <div
        className={`${themeStyles.cardBg}/80 backdrop-blur-sm border-b ${themeStyles.cardBorder} sticky top-0 z-10`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  Track & Placement Portal
                </h1>
                <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
                  Search and view student placement records
                </p>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by PRN number or student name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className={`pl-12 h-14 text-lg ${themeStyles.inputBg} ${themeStyles.inputBorder} focus:ring-2 focus:ring-blue-500 transition-all`}
            />
          </div>
          {/* Search Results Dropdown */}
          {searchQuery && showDropdown && filteredStudents.length > 0 && (
            <div
              className={`absolute mt-2 w-full max-w-3xl ${themeStyles.cardBg} rounded-xl shadow-2xl ${themeStyles.cardBorder} overflow-hidden z-50`}
            >
              {filteredStudents.map((student) => (
                <button
                  key={student.prn}
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left border-b ${themeStyles.dividerBorder} last:border-0`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${themeStyles.textPrimary}`}>
                        {student.personalInfo.firstName}{" "}
                        {student.personalInfo.lastName}
                      </p>
                      <p className={`text-sm ${themeStyles.textSecondary}`}>
                        {student.prn} • {student.academicDetails.branch}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      CGPA: {calculateCGPA(student.academicDetails)}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}
          {searchQuery && showDropdown && filteredStudents.length === 0 && (
            <div
              className={`absolute mt-2 w-full max-w-3xl ${themeStyles.cardBg} rounded-xl shadow-xl ${themeStyles.cardBorder} p-6 text-center z-50`}
            >
              <p className={themeStyles.textSecondary}>
                No students found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Student Details */}
      {selectedStudent ? (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <button
              onClick={() => {
                setSelectedStudent(null);
                setSearchQuery("");
                setShowDropdown(false);
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4"
            >
              ← Back to search
            </button>
          </div>
          <div className="space-y-6">
            {/* Profile Header Card */}
            <Card
              className={`overflow-hidden ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
              <CardContent className="pt-0 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                  <div className="p-1 bg-white dark:bg-slate-900 rounded-full">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <h2
                      className={`text-3xl font-bold ${themeStyles.textPrimary}`}
                    >
                      {selectedStudent.personalInfo.firstName}{" "}
                      {selectedStudent.personalInfo.middleName}{" "}
                      {selectedStudent.personalInfo.lastName}
                    </h2>
                    <p className={`text-lg ${themeStyles.textSecondary} mt-1`}>
                      {selectedStudent.academicDetails.branch}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                        {selectedStudent.prn}
                      </Badge>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0">
                        CGPA: {calculateCGPA(selectedStudent.academicDetails)}
                      </Badge>
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0">
                        {selectedStudent.academicDetails.division}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Personal Information */}
            <Card
              className={`${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <CardHeader className={`border-b ${themeStyles.dividerBorder}`}>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className={themeStyles.textPrimary}>
                    Personal Information
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoItem
                    icon={<Mail />}
                    label="Student Email"
                    value={selectedStudent.personalInfo.studentEmail}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    icon={<Mail />}
                    label="Personal Email"
                    value={selectedStudent.personalInfo.personalEmail}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    icon={<Phone />}
                    label="Student Mobile"
                    value={selectedStudent.personalInfo.studentMobNo}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    icon={<Phone />}
                    label="Parent Mobile"
                    value={selectedStudent.personalInfo.parentMobNo}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    icon={<MapPin />}
                    label="Home Town"
                    value={selectedStudent.personalInfo.homeTown}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Date of Birth"
                    value={selectedStudent.personalInfo.dateOfBirth}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Gender"
                    value={selectedStudent.personalInfo.gender}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Aadhar No"
                    value={selectedStudent.personalInfo.aadharNo}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="LinkedIn"
                    value={selectedStudent.personalInfo.linkedin}
                    themeStyles={themeStyles}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Academic Details */}
            <Card
              className={`${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <CardHeader className={`border-b ${themeStyles.dividerBorder}`}>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className={themeStyles.textPrimary}>
                    Academic Details
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <InfoItem
                    label="Course"
                    value={selectedStudent.academicDetails.courseName}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Branch"
                    value={selectedStudent.academicDetails.branch}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Roll No"
                    value={selectedStudent.academicDetails.rollNo}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="University Reg No"
                    value={selectedStudent.academicDetails.universityRegNo}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Year of Completion"
                    value={selectedStudent.academicDetails.yearOfCompletion}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Honours"
                    value={selectedStudent.academicDetails.honours || "None"}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Live Backlogs"
                    value={selectedStudent.academicDetails.liveBacklogs}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Dead Backlogs"
                    value={selectedStudent.academicDetails.deadBacklogs}
                    themeStyles={themeStyles}
                  />
                  <InfoItem
                    label="Years Down"
                    value={selectedStudent.academicDetails.yearsDown}
                    themeStyles={themeStyles}
                  />
                </div>
                <h4
                  className={`font-semibold text-lg mb-4 ${themeStyles.textPrimary}`}
                >
                  Semester-wise SGPA
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                  {Object.entries(selectedStudent.academicDetails)
                    .filter(([key]) => key.includes("Sem"))
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center"
                      >
                        <p
                          className={`text-xs ${themeStyles.textSecondary} mb-1`}
                        >
                          {key.replace("Sem", " Sem ").toUpperCase()}
                        </p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {value.sgpa || "-"}
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            {/* Past Qualifications */}
            <Card
              className={`${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <CardHeader className={`border-b ${themeStyles.dividerBorder}`}>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className={themeStyles.textPrimary}>
                    Past Qualifications
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-4 ${themeStyles.textPrimary}`}
                    >
                      SSC Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <InfoItem
                        label="Board"
                        value={selectedStudent.pastQualifications.ssc.board}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="School Name"
                        value={
                          selectedStudent.pastQualifications.ssc.schoolName
                        }
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="Passing Year"
                        value={
                          selectedStudent.pastQualifications.ssc.passingYear
                        }
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="Percentage"
                        value={`${selectedStudent.pastQualifications.ssc.percentage}%`}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="City"
                        value={selectedStudent.pastQualifications.ssc.city}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="State"
                        value={selectedStudent.pastQualifications.ssc.state}
                        themeStyles={themeStyles}
                      />
                    </div>
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-4 ${themeStyles.textPrimary}`}
                    >
                      HSC Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <InfoItem
                        label="Board"
                        value={selectedStudent.pastQualifications.hsc.board}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="College Name"
                        value={
                          selectedStudent.pastQualifications.hsc.collegeName
                        }
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="Passing Year"
                        value={
                          selectedStudent.pastQualifications.hsc.passingYear
                        }
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="Percentage"
                        value={`${selectedStudent.pastQualifications.hsc.percentage}%`}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="City"
                        value={selectedStudent.pastQualifications.hsc.city}
                        themeStyles={themeStyles}
                      />
                      <InfoItem
                        label="State"
                        value={selectedStudent.pastQualifications.hsc.state}
                        themeStyles={themeStyles}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Achievements & Coding Platforms */}
            <Card
              className={`${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
            >
              <CardHeader className={`border-b ${themeStyles.dividerBorder}`}>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <span className={themeStyles.textPrimary}>
                    Achievements & Coding Profiles
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Certificates */}
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-3 ${themeStyles.textPrimary}`}
                    >
                      Certificates
                    </h4>
                    {selectedStudent.otherInfo.certificates &&
                    selectedStudent.otherInfo.certificates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedStudent.otherInfo.certificates.map(
                          (cert, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                            >
                              <p
                                className={`font-semibold ${themeStyles.textPrimary} mb-1`}
                              >
                                {cert.name}
                              </p>
                              <p
                                className={`text-sm ${themeStyles.textSecondary}`}
                              >
                                {cert.issuer}
                              </p>
                              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0 text-xs mt-2">
                                {cert.year}
                              </Badge>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p
                        className={`text-sm ${themeStyles.textSecondary} bg-slate-50 dark:bg-slate-800 p-4 rounded-lg`}
                      >
                        Not provided
                      </p>
                    )}
                  </div>
                  {/* Projects */}
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-3 ${themeStyles.textPrimary}`}
                    >
                      Projects
                    </h4>
                    {selectedStudent.otherInfo.projects &&
                    selectedStudent.otherInfo.projects.length > 0 ? (
                      <div className="space-y-4">
                        {selectedStudent.otherInfo.projects.map(
                          (project, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                            >
                              <p
                                className={`font-semibold ${themeStyles.textPrimary} mb-2`}
                              >
                                {project.title}
                              </p>
                              <p
                                className={`text-sm ${themeStyles.textSecondary} mb-2`}
                              >
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies
                                  .split(",")
                                  .map((tech, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tech.trim()}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p
                        className={`text-sm ${themeStyles.textSecondary} bg-slate-50 dark:bg-slate-800 p-4 rounded-lg`}
                      >
                        Not provided
                      </p>
                    )}
                  </div>
                  {/* Internships */}
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-3 ${themeStyles.textPrimary}`}
                    >
                      Internships
                    </h4>
                    {selectedStudent.otherInfo.internships &&
                    selectedStudent.otherInfo.internships.length > 0 ? (
                      <div className="space-y-4">
                        {selectedStudent.otherInfo.internships.map(
                          (internship, index) => (
                            <div
                              key={index}
                              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p
                                  className={`font-semibold ${themeStyles.textPrimary}`}
                                >
                                  {internship.role}
                                </p>
                                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0 text-xs">
                                  {internship.duration}
                                </Badge>
                              </div>
                              <p
                                className={`text-sm font-medium text-blue-600 dark:text-blue-400 mb-2`}
                              >
                                {internship.company}
                              </p>
                              <p
                                className={`text-sm ${themeStyles.textSecondary}`}
                              >
                                {internship.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p
                        className={`text-sm ${themeStyles.textSecondary} bg-slate-50 dark:bg-slate-800 p-4 rounded-lg`}
                      >
                        Not provided
                      </p>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-3 ${themeStyles.textPrimary}`}
                    >
                      Technical Achievements
                    </h4>
                    <p
                      className={`text-sm ${themeStyles.textSecondary} bg-slate-50 dark:bg-slate-800 p-4 rounded-lg`}
                    >
                      {selectedStudent.otherInfo.technicalAchievements ||
                        "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-3 ${themeStyles.textPrimary}`}
                    >
                      Non-Technical Achievements
                    </h4>
                    <p
                      className={`text-sm ${themeStyles.textSecondary} bg-slate-50 dark:bg-slate-800 p-4 rounded-lg`}
                    >
                      {selectedStudent.otherInfo.nonTechnicalAchievements ||
                        "Not provided"}
                    </p>
                  </div>
                  <div>
                    <h4
                      className={`font-semibold text-lg mb-4 ${themeStyles.textPrimary}`}
                    >
                      Coding Platforms
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(
                        selectedStudent.otherInfo.codingPlatforms
                      ).map(
                        ([platform, data]) =>
                          data.profile && (
                            <div
                              key={platform}
                              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                            >
                              <p
                                className={`text-xs font-semibold ${themeStyles.textTertiary} uppercase mb-1`}
                              >
                                {platform}
                              </p>
                              <p
                                className={`text-sm ${themeStyles.textSecondary} mb-1`}
                              >
                                {data.profile}
                              </p>
                              {data.rating && (
                                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0 text-xs">
                                  {data.rating}
                                </Badge>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex p-6 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <Search className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h2
              className={`text-2xl font-bold ${themeStyles.textPrimary} mb-3`}
            >
              Search for a Student
            </h2>
            <p
              className={`text-sm ${themeStyles.textSecondary} max-w-md mx-auto`}
            >
              Enter a PRN number or student name in the search box above to view
              detailed placement records and academic information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for displaying information
const InfoItem = ({ icon, label, value, themeStyles }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      {icon && <span className="text-slate-400 w-4 h-4">{icon}</span>}
      <label className={`text-sm ${themeStyles.textSecondary}`}>{label}</label>
    </div>
    <p className={`text-base font-medium ${themeStyles.textPrimary}`}>
      {value || "Not provided"}
    </p>
  </div>
);

export default TrackAndPlacement;
