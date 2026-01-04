import React, { useState, useMemo } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Edit,
  Eye,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

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
    headerBg: "bg-white",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-200 hover:bg-slate-300 text-slate-700",
    buttonDanger: "bg-red-600 hover:bg-red-700 text-white",
    inputBg: "bg-white",
    inputBorder: "border-slate-300",
    inputFocus: "focus:border-blue-500 focus:ring-blue-500",
    badgeEligible: "bg-green-100 text-green-600 border-green-200",
    badgeNotEligible: "bg-red-100 text-red-600 border-red-200",
    badgePending: "bg-amber-100 text-amber-600 border-amber-200",
    badgeApproved: "bg-green-100 text-green-600 border-green-200",
    badgeRejected: "bg-red-100 text-red-600 border-red-200",
    modalBg: "bg-white",
    modalOverlay: "bg-black/50",
    divider: "border-slate-200",
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
    headerBg: "bg-slate-950",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    buttonDanger: "bg-red-600 hover:bg-red-700 text-white",
    inputBg: "bg-slate-800",
    inputBorder: "border-slate-700",
    inputFocus: "focus:border-blue-500 focus:ring-blue-500",
    badgeEligible: "bg-green-900/30 text-green-400 border-green-900/20",
    badgeNotEligible: "bg-red-900/30 text-red-400 border-red-900/20",
    badgePending: "bg-amber-900/30 text-amber-400 border-amber-900/20",
    badgeApproved: "bg-green-900/30 text-green-400 border-green-900/20",
    badgeRejected: "bg-red-900/30 text-red-400 border-red-900/20",
    modalBg: "bg-slate-800",
    modalOverlay: "bg-black/70",
    divider: "border-slate-700",
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
      expiresAt: null,
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonSecondary} transition-all text-sm font-medium`}
        >
          <Edit size={16} />
          Request Edit
        </button>
      );
    }

    if (request.status === "pending") {
      return (
        <button
          disabled
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonSecondary} opacity-50 cursor-not-allowed text-sm font-medium`}
        >
          <Clock size={16} />
          Request Sent
        </button>
      );
    }

    if (request.status === "approved") {
      return (
        <button
          onClick={() => alert("Edit functionality would open here")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonPrimary} transition-all text-sm font-medium`}
        >
          <Edit size={16} />
          Edit Now
        </button>
      );
    }

    if (request.status === "rejected") {
      return (
        <button
          onClick={() => handleRequestEdit(student)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonSecondary} transition-all text-sm font-medium`}
        >
          <Edit size={16} />
          Request Again
        </button>
      );
    }
  };

  // Render status badge
  const renderStatusBadge = (student) => {
    const request = getRequestStatus(student.id);

    if (!request) return null;

    const badges = {
      pending: {
        text: "Pending Approval",
        icon: Clock,
        style: themeStyles.badgePending,
      },
      approved: {
        text: "Approved - Edit Access",
        icon: CheckCircle,
        style: themeStyles.badgeApproved,
      },
      rejected: {
        text: "Request Rejected",
        icon: XCircle,
        style: themeStyles.badgeRejected,
      },
    };

    const badge = badges[request.status];
    const Icon = badge.icon;

    return (
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.style}`}
      >
        <Icon size={12} />
        {badge.text}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Student Directory
            </h1>
            <p className={`mt-2 ${themeStyles.textSecondary}`}>
              View student profiles and request edit permissions
            </p>
          </div>
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardShadow}`}
          >
            <p className={`text-sm ${themeStyles.textSecondary} mb-1`}>
              Total Students
            </p>
            <p className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
              {students.length}
            </p>
          </div>
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardShadow}`}
          >
            <p className={`text-sm ${themeStyles.textSecondary} mb-1`}>
              Eligible
            </p>
            <p className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
              {students.filter((s) => s.eligible).length}
            </p>
          </div>
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardShadow}`}
          >
            <p className={`text-sm ${themeStyles.textSecondary} mb-1`}>
              Pending Requests
            </p>
            <p className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
              {
                Object.values(editRequests).filter((r) => r.status === "pending")
                  .length
              }
            </p>
          </div>
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-5 ${themeStyles.cardShadow}`}
          >
            <p className={`text-sm ${themeStyles.textSecondary} mb-1`}>
              Approved Access
            </p>
            <p className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
              {
                Object.values(editRequests).filter(
                  (r) => r.status === "approved"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-6 mb-6 ${themeStyles.cardShadow}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
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
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.textPrimary} ${themeStyles.inputFocus} focus:ring-2 focus:ring-offset-0 transition-all`}
                />
              </div>
            </div>

            {/* Branch Filter */}
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.textPrimary} ${themeStyles.inputFocus} focus:ring-2 focus:ring-offset-0 transition-all`}
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
              className={`px-4 py-2.5 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.textPrimary} ${themeStyles.inputFocus} focus:ring-2 focus:ring-offset-0 transition-all`}
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Eligibility Filter */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setFilterEligibility("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterEligibility === "all"
                  ? themeStyles.buttonPrimary
                  : themeStyles.buttonSecondary
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterEligibility("eligible")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterEligibility === "eligible"
                  ? themeStyles.buttonPrimary
                  : themeStyles.buttonSecondary
              }`}
            >
              Eligible
            </button>
            <button
              onClick={() => setFilterEligibility("not-eligible")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterEligibility === "not-eligible"
                  ? themeStyles.buttonPrimary
                  : themeStyles.buttonSecondary
              }`}
            >
              Not Eligible
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-lg ${themeStyles.textPrimary}`}
                    >
                      {student.name}
                    </h3>
                    <p className={`text-sm ${themeStyles.textSecondary}`}>
                      {student.prn}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    student.eligible
                      ? themeStyles.badgeEligible
                      : themeStyles.badgeNotEligible
                  }`}
                >
                  {student.eligible ? "✓ Eligible" : "Not Eligible"}
                </span>
              </div>

              {/* Status Badge */}
              {renderStatusBadge(student)}

              {/* Details */}
              <div className="space-y-3 my-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 ${themeStyles.buttonSecondary} rounded-lg flex items-center justify-center`}
                  >
                    <User size={16} />
                  </div>
                  <div>
                    <p className={`text-xs ${themeStyles.textTertiary}`}>
                      Branch & Year
                    </p>
                    <p
                      className={`text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      {student.branch} • {student.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 ${themeStyles.buttonSecondary} rounded-lg flex items-center justify-center`}
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className={`text-xs ${themeStyles.textTertiary}`}>
                      Email
                    </p>
                    <p
                      className={`text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 ${themeStyles.buttonSecondary} rounded-lg flex items-center justify-center`}
                  >
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className={`text-xs ${themeStyles.textTertiary}`}>
                      Phone
                    </p>
                    <p
                      className={`text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      {student.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 ${themeStyles.buttonSecondary} rounded-lg flex items-center justify-center`}
                  >
                    <FileText size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs ${themeStyles.textTertiary}`}>
                      Resume
                    </p>
                    {student.resume ? (
                      <button
                        className={`text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1`}
                      >
                        {student.resume}
                        <Download size={14} />
                      </button>
                    ) : (
                      <p
                        className={`text-sm font-medium ${themeStyles.textTertiary}`}
                      >
                        Not uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                className={`flex gap-3 pt-4 border-t ${themeStyles.divider}`}
              >
                <button
                  onClick={() =>
                    alert(`Viewing full profile of ${student.name}`)
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonPrimary} transition-all text-sm font-medium`}
                >
                  <Eye size={16} />
                  View Profile
                </button>
                {renderEditButton(student)}
                <button
                  onClick={() =>
                    alert(`Opening message to coordinator about ${student.name}`)
                  }
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${themeStyles.buttonSecondary} transition-all text-sm font-medium`}
                  title="Message Coordinator"
                >
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div
            className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-xl p-12 text-center ${themeStyles.cardShadow}`}
          >
            <AlertCircle
              size={48}
              className={`mx-auto mb-4 ${themeStyles.textTertiary}`}
            />
            <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
              No students found
            </h3>
            <p className={`mt-2 ${themeStyles.textSecondary}`}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Request Edit Modal */}
      {showRequestModal && (
        <div
          className={`fixed inset-0 ${themeStyles.modalOverlay} flex items-center justify-center p-4 z-50`}
          onClick={() => setShowRequestModal(false)}
        >
          <div
            className={`${themeStyles.modalBg} rounded-2xl p-6 max-w-md w-full ${themeStyles.cardShadow}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Edit size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                  Request Edit Permission
                </h3>
                <p className={`text-sm ${themeStyles.textSecondary}`}>
                  {selectedStudent?.name}
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${themeStyles.cardBg} border ${themeStyles.cardBorder} mb-4`}
            >
              <div className="flex items-start gap-2">
                <AlertCircle
                  size={20}
                  className={`${themeStyles.textSecondary} mt-0.5`}
                />
                <p className={`text-sm ${themeStyles.textSecondary}`}>
                  You need approval from the Co-ordinator to edit this student's
                  details. Please select what you'd like to edit.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label
                className={`block text-sm font-medium ${themeStyles.textPrimary} mb-2`}
              >
                What would you like to edit?
              </label>
              <select
                value={selectedEditType}
                onChange={(e) => setSelectedEditType(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border ${themeStyles.inputBorder} ${themeStyles.inputBg} ${themeStyles.textPrimary} ${themeStyles.inputFocus} focus:ring-2`}
              >
                <option value="">Select edit type...</option>
                <option value="contact">Contact Information (Email/Phone)</option>
                <option value="resume">Resume/Documents</option>
                <option value="address">Address Details</option>
                <option value="profile">General Profile Information</option>
                <option value="other">Other Information</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className={`flex-1 px-4 py-2.5 rounded-lg ${themeStyles.buttonSecondary} transition-all font-medium`}
              >
                Cancel
              </button>
              <button
                onClick={sendEditRequest}
                className={`flex-1 px-4 py-2.5 rounded-lg ${themeStyles.buttonPrimary} transition-all font-medium`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListVolunteer;