import React, { useState, useMemo } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Edit2,
  Eye,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  X,
  Plus,
  TrendingUp,
  Users,
  UserCheck,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";
//add student list for volunteer

const StudentListVolunteer = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Theme Functions
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
    inputDisabled: "disabled:bg-slate-100",
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-slate-100",
    emptyStateIcon: "text-slate-400",
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
    badgeEligible: "bg-green-500",
    badgeNotEligible: "bg-red-500",
    badgePending: "bg-amber-500",
    badgeApproved: "bg-green-500",
    badgeRejected: "bg-red-500",
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
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
    modalHeader: "bg-slate-800",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-800",
    emptyStateIcon: "text-slate-500",
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
    badgeEligible: "bg-green-600",
    badgeNotEligible: "bg-red-600",
    badgePending: "bg-amber-600",
    badgeApproved: "bg-green-600",
    badgeRejected: "bg-red-600",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      prn: "2021BCS001",
      branch: "Computer Science",
      year: "3rd Year",
      email: "aarav.sharma@college.edu",
      phone: "+91 98765 43210",
      resume: "aarav_resume.pdf",
      eligible: true,
    },
    {
      id: 2,
      name: "Diya Patel",
      prn: "2021BCS002",
      branch: "Computer Science",
      year: "3rd Year",
      email: "diya.patel@college.edu",
      phone: "+91 98765 43211",
      resume: "diya_resume.pdf",
      eligible: true,
    },
    {
      id: 3,
      name: "Rohan Verma",
      prn: "2021BEC001",
      branch: "Electronics",
      year: "3rd Year",
      email: "rohan.verma@college.edu",
      phone: "+91 98765 43212",
      resume: "rohan_resume.pdf",
      eligible: false,
    },
    {
      id: 4,
      name: "Ananya Singh",
      prn: "2021BME001",
      branch: "Mechanical",
      year: "3rd Year",
      email: "ananya.singh@college.edu",
      phone: "+91 98765 43213",
      resume: "ananya_resume.pdf",
      eligible: true,
    },
    {
      id: 5,
      name: "Arjun Reddy",
      prn: "2021BCS003",
      branch: "Computer Science",
      year: "4th Year",
      email: "arjun.reddy@college.edu",
      phone: "+91 98765 43214",
      resume: "arjun_resume.pdf",
      eligible: true,
    },
    {
      id: 6,
      name: "Priya Deshmukh",
      prn: "2021BCS004",
      branch: "Computer Science",
      year: "4th Year",
      email: "priya.d@college.edu",
      phone: "+91 98765 43215",
      resume: null,
      eligible: false,
    },
  ]);

  // Edit requests state
  const [editRequests, setEditRequests] = useState({});
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedEditType, setSelectedEditType] = useState("");

  // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterEligibility, setFilterEligibility] = useState("all");

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBranch =
        filterBranch === "all" || student.branch === filterBranch;
      const matchesYear = filterYear === "all" || student.year === filterYear;
      const matchesEligibility =
        filterEligibility === "all" ||
        (filterEligibility === "eligible" && student.eligible) ||
        (filterEligibility === "not-eligible" && !student.eligible);

      return matchesSearch && matchesBranch && matchesYear && matchesEligibility;
    });
  }, [students, searchQuery, filterBranch, filterYear, filterEligibility]);

  // Get unique branches and years
  const branches = [...new Set(students.map((s) => s.branch))];
  const years = [...new Set(students.map((s) => s.year))];

  // Stats calculation
  const stats = useMemo(() => {
    const total = students.length;
    const eligible = students.filter((s) => s.eligible).length;
    const pending = Object.values(editRequests).filter((r) => r.status === "pending").length;
    const approved = Object.values(editRequests).filter((r) => r.status === "approved").length;

    return { total, eligible, pending, approved };
  }, [students, editRequests]);

  // Handle edit request
  const handleRequestEdit = (student) => {
    setSelectedStudent(student);
    setShowRequestModal(true);
  };

  const sendEditRequest = () => {
    if (!selectedEditType) {
      alert("Please select what you want to edit");
      return;
    }

    const request = {
      status: "pending",
      editType: selectedEditType,
      requestedAt: new Date().toISOString(),
    };

    setEditRequests({
      ...editRequests,
      [selectedStudent.id]: request,
    });

    setShowRequestModal(false);
    setSelectedStudent(null);
    setSelectedEditType("");
  };

  // Get request status for a student
  const getRequestStatus = (studentId) => {
    return editRequests[studentId] || null;
  };

  // Render edit button based on request status
  const renderEditButton = (student) => {
    const request = getRequestStatus(student.id);

    if (!request) {
      return (
        <button
          onClick={() => handleRequestEdit(student)}
          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Request Edit
        </button>
      );
    }

    if (request.status === "pending") {
      return (
        <button
          disabled
          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} opacity-50 cursor-not-allowed ${themeStyles.textPrimary}`}
        >
          <Clock className="mr-2 h-4 w-4" />
          Pending
        </button>
      );
    }

    if (request.status === "approved") {
      return (
        <button
          onClick={() => alert("Edit functionality would open here")}
          className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Now
        </button>
      );
    }

    if (request.status === "rejected") {
      return (
        <button
          onClick={() => handleRequestEdit(student)}
          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Retry
        </button>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className={`min-h-screen ${themeStyles.background}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      <div className="max-w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Student Directory
            </h1>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    Total Students
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.total}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-full flex items-center justify-center`}
                >
                  <Users className={`h-6 w-6 ${themeStyles.statIcon1Text}`} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    Eligible
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.eligible}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-full flex items-center justify-center`}
                >
                  <UserCheck className={`h-6 w-6 ${themeStyles.statIcon2Text}`} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    Pending Requests
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.pending}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon3Bg} rounded-full flex items-center justify-center`}
                >
                  <Clock className={`h-6 w-6 ${themeStyles.statIcon3Text}`} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    Approved Access
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stats.approved}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon4Bg} rounded-full flex items-center justify-center`}
                >
                  <CheckCircle className={`h-6 w-6 ${themeStyles.statIcon4Text}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} p-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary}`}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, PRN, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                />
              </div>
            </div>

            {/* Branch Filter */}
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className={`px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} transition-all`}
            >
              <option value="all">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className={`px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} transition-all`}
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Eligibility Filter Pills */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterEligibility("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterEligibility === "all"
                ? "bg-blue-600 text-white"
                : `border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover}`
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterEligibility("eligible")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterEligibility === "eligible"
                ? "bg-blue-600 text-white"
                : `border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover}`
                }`}
            >
              Eligible
            </button>
            <button
              onClick={() => setFilterEligibility("not-eligible")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterEligibility === "not-eligible"
                ? "bg-blue-600 text-white"
                : `border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover}`
                }`}
            >
              Not Eligible
            </button>
          </div>
        </div>

        {/* Student Cards */}
        <div>
          <h2 className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}>
            Student Profiles
          </h2>
          {filteredStudents.length === 0 ? (
            <div
              className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-sm`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <Users className={`h-12 w-12 ${themeStyles.emptyStateIcon}`} />
                </div>
                <h3 className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}>
                  No Students Found
                </h3>
                <p className={`${themeStyles.textSecondary}`}>
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => {
                const request = getRequestStatus(student.id);
                return (
                  <div
                    key={student.id}
                    className={`rounded-xl border overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${student.eligible ? 'from-green-600 to-green-400' : 'from-red-600 to-red-400'}`} />

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold ${themeStyles.textPrimary}`}>
                              {student.name}
                            </h3>
                            <p className={`text-sm ${themeStyles.textSecondary}`}>
                              {student.prn}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${student.eligible ? themeStyles.badgeEligible : themeStyles.badgeNotEligible
                            }`}
                        >
                          {student.eligible ? "Eligible" : "Not Eligible"}
                        </span>
                      </div>

                      {/* Request Status Badge */}
                      {request && (
                        <div className="mb-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white ${request.status === "pending"
                              ? themeStyles.badgePending
                              : request.status === "approved"
                                ? themeStyles.badgeApproved
                                : themeStyles.badgeRejected
                              }`}
                          >
                            {request.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                            {request.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {request.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                            {request.status === "pending" && "Pending Approval"}
                            {request.status === "approved" && "Approved - Edit Access"}
                            {request.status === "rejected" && "Request Rejected"}
                          </span>
                        </div>
                      )}

                      <div className="space-y-3 mb-6">
                        <div className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}>
                          <span className={`text-sm ${themeStyles.textSecondary}`}>
                            Branch
                          </span>
                          <span className={`font-semibold ${themeStyles.textPrimary}`}>
                            {student.branch}
                          </span>
                        </div>

                        <div className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}>
                          <span className={`text-sm ${themeStyles.textSecondary}`}>
                            Year
                          </span>
                          <span className={`font-semibold ${themeStyles.textPrimary}`}>
                            {student.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm pt-2">
                          <Mail className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                          <span className={`${themeStyles.textSecondary} truncate`}>
                            {student.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone className={`h-4 w-4 ${themeStyles.textSecondary}`} />
                          <span className={`${themeStyles.textSecondary}`}>
                            {student.phone}
                          </span>
                        </div>

                        {student.resume ? (
                          <div className="flex items-center gap-2 text-sm pt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-green-600 font-medium">
                              Resume attached
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm pt-2">
                            <div className={`h-2 w-2 rounded-full ${themeStyles.emptyStateBg}`} />
                            <span className={themeStyles.textTertiary}>
                              No resume
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Viewing full profile of ${student.name}`)}
                          className={`flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </button>
                        {renderEditButton(student)}
                        <button
                          onClick={() => alert(`Opening message to coordinator about ${student.name}`)}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Request Edit Modal */}
        {showRequestModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              <div
                className={`sticky top-0 ${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  Request Edit Permission
                </h2>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setSelectedStudent(null);
                    setSelectedEditType("");
                  }}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
                >
                  <X className={`h-5 w-5 ${themeStyles.textPrimary}`} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Student Info */}
                <div className={`p-4 rounded-lg border ${themeStyles.cardBorder} ${themeStyles.emptyStateBg}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedStudent?.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${themeStyles.textPrimary}`}>
                        {selectedStudent?.name}
                      </h3>
                      <p className={`text-sm ${themeStyles.textSecondary}`}>
                        {selectedStudent?.prn} • {selectedStudent?.branch}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Alert */}
                <div className={`p-4 rounded-lg border ${themeStyles.cardBorder} ${themeStyles.emptyStateBg}`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`h-5 w-5 ${themeStyles.textSecondary} mt-0.5`} />
                    <p className={`text-sm ${themeStyles.textSecondary}`}>
                      You need approval from the Co-ordinator to edit this student's details.
                      Please select what you'd like to edit and submit your request.
                    </p>
                  </div>
                </div>

                {/* Edit Type Selection */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${themeStyles.textPrimary}`}>
                    What would you like to edit? <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={selectedEditType}
                    onChange={(e) => setSelectedEditType(e.target.value)}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  >
                    <option value="">Select edit type...</option>
                    <option value="contact">Contact Information (Email/Phone)</option>
                    <option value="resume">Resume/Documents</option>
                    <option value="academic">Academic Details (Branch/Year)</option>
                    <option value="profile">General Profile Information</option>
                    <option value="eligibility">Eligibility Status</option>
                    <option value="other">Other Information</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowRequestModal(false);
                      setSelectedStudent(null);
                      setSelectedEditType("");
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendEditRequest}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentListVolunteer;