import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Send,
  Calendar,
  IndianRupee,
  Briefcase,
  X,
  ArrowLeft,
  Search,
  Filter,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors shadow-sm";

  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

const CompanyRegistration = () => {
  const { theme } = useTheme();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'confirm' | 'success' | null

  // Sample companies data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Google",
      package: "45 LPA",
      role: "Software Engineer",
      deadline: "2024-01-20",
      eligibilityCriteria: [
        "Minimum CGPA: 7.5",
        "No active backlogs",
        "B.Tech in Computer Science or related field",
        "Strong problem-solving skills",
        "Good communication skills",
      ],
      jobDescription:
        "Google is hiring for Software Engineering roles. Work on cutting-edge technology and solve complex problems at scale.",
      rounds: [
        "Online Test",
        "Technical Interview 1",
        "Technical Interview 2",
        "HR Interview",
      ],
      isEligible: true,
      hasApplied: false,
    },
    {
      id: 2,
      name: "Microsoft",
      package: "42 LPA",
      role: "SDE-1",
      deadline: "2024-01-25",
      eligibilityCriteria: [
        "Minimum CGPA: 7.0",
        "No active backlogs",
        "B.Tech/B.E. in any discipline",
        "Knowledge of data structures and algorithms",
        "Previous internship experience (preferred)",
      ],
      jobDescription:
        "Join Microsoft to work on cloud technologies and innovative solutions that impact millions of users worldwide.",
      rounds: [
        "Coding Assessment",
        "Technical Round 1",
        "Technical Round 2",
        "Managerial Round",
      ],
      isEligible: true,
      hasApplied: true,
    },
    {
      id: 3,
      name: "Amazon",
      package: "38 LPA",
      role: "Software Development Engineer",
      deadline: "2024-02-05",
      eligibilityCriteria: [
        "Minimum CGPA: 6.5",
        "Maximum 1 backlog allowed",
        "All engineering branches eligible",
        "Strong analytical skills",
        "Leadership qualities",
      ],
      jobDescription:
        "Amazon is looking for talented engineers to join their product development teams and build scalable solutions.",
      rounds: [
        "Online Assessment",
        "Technical Interview",
        "Bar Raiser Round",
        "HR Discussion",
      ],
      isEligible: false,
      hasApplied: false,
    },
    {
      id: 4,
      name: "Goldman Sachs",
      package: "35 LPA",
      role: "Analyst",
      deadline: "2024-02-15",
      eligibilityCriteria: [
        "Minimum CGPA: 8.0",
        "No backlogs throughout the program",
        "Strong mathematical aptitude",
        "Interest in finance and technology",
        "Team player with good work ethic",
      ],
      jobDescription:
        "Work with one of the leading investment banks in technology and financial services.",
      rounds: [
        "HireVue Assessment",
        "Technical Interview",
        "Case Study",
        "Final Interview",
      ],
      isEligible: false,
      hasApplied: false,
    },
    {
      id: 5,
      name: "Adobe",
      package: "40 LPA",
      role: "Software Engineer",
      deadline: "2024-01-30",
      eligibilityCriteria: [
        "Minimum CGPA: 7.5",
        "No backlogs",
        "Computer Science or IT background",
        "Creative problem-solving abilities",
        "Portfolio of projects (bonus)",
      ],
      jobDescription:
        "Adobe seeks creative problem solvers to build next-generation digital experiences.",
      rounds: [
        "Online Coding Test",
        "Technical Interview 1",
        "Technical Interview 2",
        "HR Round",
      ],
      isEligible: true,
      hasApplied: true,
    },
    {
      id: 6,
      name: "Flipkart",
      package: "28 LPA",
      role: "SDE-1",
      deadline: "2024-01-22",
      eligibilityCriteria: [
        "Minimum CGPA: 6.0",
        "Maximum 2 backlogs allowed",
        "All branches eligible",
        "Good coding skills",
        "Fast learner",
      ],
      jobDescription:
        "Be part of India's leading e-commerce platform and work on scalable systems.",
      rounds: [
        "Machine Coding Round",
        "Technical Interview",
        "Hiring Manager Round",
      ],
      isEligible: true,
      hasApplied: false,
    },
  ]);

  // Light Theme Function
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
    statCard3Gradient: "from-white to-red-50",
    statCard4Gradient: "from-white to-purple-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-red-100",
    statIcon3Text: "text-red-600",
    statIcon4Bg: "bg-purple-100",
    statIcon4Text: "text-purple-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    companyCardBg: "bg-white",
    companyCardBorder: "border-gray-100",
    companyCardHover: "hover:border-gray-200",
    iconGradient: "from-blue-50 to-blue-100",
    badgeBg: "bg-green-50",
    detailsCardBg: "bg-gray-50",
    criteriaCardBg: "bg-white",
    criteriaCardBorder: "border-gray-100",
    roundCardBg: "from-blue-50 to-indigo-50",
    roundCardBorder: "border-blue-100",
    roundNumberBg: "bg-white",
    roundNumberBorder: "border-blue-200",
    warningBg: "bg-red-50",
    warningBorder: "border-red-200",
    warningText: "text-red-700",
  });

  // Dark Theme Function
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
    statCard3Gradient: "from-slate-800 to-amber-900/30",
    statCard4Gradient: "from-slate-800 to-purple-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-red-900/30",
    statIcon3Text: "text-red-400",
    statIcon4Bg: "bg-purple-900/30",
    statIcon4Text: "text-purple-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    companyCardBg: "bg-slate-800",
    companyCardBorder: "border-slate-700",
    companyCardHover: "hover:border-slate-600",
    iconGradient: "from-blue-900/30 to-blue-800/30",
    badgeBg: "bg-green-900/30",
    detailsCardBg: "bg-slate-800",
    criteriaCardBg: "bg-slate-800",
    criteriaCardBorder: "border-slate-700",
    roundCardBg: "from-blue-900/30 to-indigo-900/30",
    roundCardBorder: "border-blue-800",
    roundNumberBg: "bg-slate-700",
    roundNumberBorder: "border-blue-700",
    warningBg: "bg-red-900/20",
    warningBorder: "border-red-800",
    warningText: "text-red-400",
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const eligible = companies.filter((c) => c.isEligible).length;
    const notEligible = companies.filter((c) => !c.isEligible).length;
    const applied = companies.filter((c) => c.hasApplied).length;

    return { totalCompanies, eligible, notEligible, applied };
  }, [companies]);

  // Filter companies based on search and filters
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.role.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (filterStatus === "eligible") {
        matchesFilter = company.isEligible && !company.hasApplied;
      } else if (filterStatus === "notEligible") {
        matchesFilter = !company.isEligible;
      } else if (filterStatus === "applied") {
        matchesFilter = company.hasApplied;
      }

      return matchesSearch && matchesFilter;
    });
  }, [companies, searchQuery, filterStatus]);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handleApply = () => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === selectedCompany.id ? { ...c, hasApplied: true } : c
      )
    );
    setModalMode("success");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      {!showDetailsModal ? (
        <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1
                className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}
              >
                Company Registration
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}
              >
                Browse and apply to placement opportunities from top companies
              </p>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div
              className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                    >
                      Total Companies
                    </p>
                    <h3
                      className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                    >
                      {stats.totalCompanies}
                    </h3>
                  </div>
                  <div
                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center`}
                  >
                    <Building2
                      className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                    >
                      Eligible
                    </p>
                    <h3
                      className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                    >
                      {stats.eligible}
                    </h3>
                  </div>
                  <div
                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon2Text}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                    >
                      Not Eligible
                    </p>
                    <h3
                      className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                    >
                      {stats.notEligible}
                    </h3>
                  </div>
                  <div
                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}
                  >
                    <XCircle
                      className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon3Text}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient} transition-all`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-semibold ${themeStyles.textSecondary} uppercase tracking-wide`}
                    >
                      Applied
                    </p>
                    <h3
                      className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                    >
                      {stats.applied}
                    </h3>
                  </div>
                  <div
                    className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon4Bg} rounded-xl flex items-center justify-center`}
                  >
                    <Send
                      className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon4Text}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div
            className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
          >
            <div className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`}
                  />
                  <input
                    type="text"
                    placeholder="Search companies or roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="sm:hidden">
                    <button
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} flex items-center gap-2`}
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                  <div className="hidden sm:block">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                    >
                      <option value="all">All Companies</option>
                      <option value="eligible">Eligible</option>
                      <option value="notEligible">Not Eligible</option>
                      <option value="applied">Applied</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="mt-4 sm:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "all"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus("eligible")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "eligible"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Eligible
                    </button>
                    <button
                      onClick={() => setFilterStatus("notEligible")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "notEligible"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Not Eligible
                    </button>
                    <button
                      onClick={() => setFilterStatus("applied")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "applied"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Applied
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company List */}
          <div
            className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2
                  className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary}`}
                >
                  Available Opportunities
                </h2>
                <span className={`text-sm ${themeStyles.textSecondary}`}>
                  {filteredCompanies.length} companies found
                </span>
              </div>

              <div className="space-y-4">
                {filteredCompanies.map((company) => {
                  const daysLeft = getDaysLeft(company.deadline);
                  return (
                    <div
                      key={company.id}
                      className={`border ${themeStyles.companyCardBorder} rounded-2xl p-4 sm:p-6 ${themeStyles.cardHoverShadow} transition-all duration-200 ${themeStyles.companyCardBg} ${themeStyles.companyCardHover}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 sm:gap-4 mb-3">
                            <div
                              className={`h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br ${themeStyles.iconGradient} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
                            >
                              <Building2
                                className={`h-5 w-5 sm:h-6 sm:w-6 ${themeStyles.statIcon1Text}`}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3
                                className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} truncate`}
                              >
                                {company.name}
                              </h3>
                              <p
                                className={`${themeStyles.textSecondary} truncate`}
                              >
                                {company.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {company.hasApplied && (
                              <Badge
                                variant="purple"
                                className="shadow-sm text-xs"
                              >
                                ✓ Applied
                              </Badge>
                            )}
                            <Badge
                              variant={company.isEligible ? "success" : "error"}
                              className="shadow-sm text-xs"
                            >
                              {company.isEligible
                                ? "✓ Eligible"
                                : "✗ Not Eligible"}
                            </Badge>
                            {daysLeft <= 7 && daysLeft > 0 && (
                              <Badge
                                variant="warning"
                                className="shadow-sm text-xs"
                              >
                                ⏰ {daysLeft}d left
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-8 w-8 ${themeStyles.badgeBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                <IndianRupee
                                  className={`h-4 w-4 ${themeStyles.statIcon2Text}`}
                                />
                              </div>
                              <div className="min-w-0">
                                <span
                                  className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}
                                >
                                  Package
                                </span>
                                <p
                                  className={`font-bold ${themeStyles.textPrimary} text-base sm:text-lg truncate`}
                                >
                                  {company.package}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div
                                className={`h-8 w-8 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                <Calendar
                                  className={`h-4 w-4 ${themeStyles.statIcon1Text}`}
                                />
                              </div>
                              <div className="min-w-0">
                                <span
                                  className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}
                                >
                                  Deadline
                                </span>
                                <p
                                  className={`font-semibold ${themeStyles.textPrimary} truncate`}
                                >
                                  {formatDate(company.deadline)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="sm:ml-6 flex sm:flex-col gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleViewDetails(company)}
                            disabled={company.hasApplied}
                            className={`flex-1 sm:min-w-[120px] px-4 sm:px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                              company.hasApplied
                                ? `${themeStyles.emptyStateBg} ${themeStyles.textTertiary} cursor-not-allowed`
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {company.hasApplied ? "Applied ✓" : "View Details"}
                          </button>
                          {company.hasApplied && (
                            <span
                              className={`text-xs ${themeStyles.statIcon2Text} font-semibold text-center block sm:hidden`}
                            >
                              Application Submitted
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredCompanies.length === 0 && (
                <div
                  className={`text-center py-12 ${themeStyles.emptyStateBg} rounded-2xl`}
                >
                  <Search
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon} mx-auto mb-4`}
                  />
                  <h3
                    className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}
                  >
                    No companies found
                  </h3>
                  <p className={themeStyles.textSecondary}>
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Details Modal */
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedCompany(null);
              }}
              className={`p-2 rounded-lg ${themeStyles.buttonBg} border ${themeStyles.buttonBorder} ${themeStyles.buttonHover} transition-colors flex-shrink-0`}
            >
              <ArrowLeft className={`h-5 w-5 ${themeStyles.textPrimary}`} />
            </button>
            <div className="min-w-0 flex-1">
              <h1
                className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} truncate`}
              >
                {selectedCompany?.name} - Application Details
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary} truncate`}
              >
                Review position details and submit your application
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
          >
            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
              {/* Company Info */}
              <div
                className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pb-6 sm:pb-8 border-b ${themeStyles.dividerBorder}`}
              >
                <div
                  className={`h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br ${themeStyles.iconGradient} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}
                >
                  <Building2
                    className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.statIcon1Text}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary} mb-4`}
                  >
                    {selectedCompany?.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.emptyStateBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Briefcase
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${themeStyles.textSecondary}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`${themeStyles.textSecondary} text-sm font-semibold block`}
                        >
                          Role
                        </span>
                        <p
                          className={`font-semibold ${themeStyles.textPrimary} truncate`}
                        >
                          {selectedCompany?.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.badgeBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <IndianRupee
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${themeStyles.statIcon2Text}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`${themeStyles.textSecondary} text-sm font-semibold block`}
                        >
                          Package
                        </span>
                        <p
                          className={`font-bold ${themeStyles.textPrimary} text-lg truncate`}
                        >
                          {selectedCompany?.package}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Calendar
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${themeStyles.statIcon1Text}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`${themeStyles.textSecondary} text-sm font-semibold block`}
                        >
                          Deadline
                        </span>
                        <p
                          className={`font-semibold ${themeStyles.textPrimary} truncate`}
                        >
                          {formatDate(selectedCompany?.deadline)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.emptyStateBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Badge
                          variant={
                            selectedCompany?.isEligible ? "success" : "error"
                          }
                          className="text-xs sm:text-sm"
                        >
                          {selectedCompany?.isEligible
                            ? "✓ Eligible"
                            : "✗ Not Eligible"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h4
                  className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <div className="h-6 w-1 bg-blue-600 rounded-full flex-shrink-0"></div>
                  Job Description
                </h4>
                <div
                  className={`${themeStyles.detailsCardBg} rounded-2xl p-4 sm:p-6`}
                >
                  <p
                    className={`${themeStyles.textSecondary} leading-relaxed text-sm sm:text-base`}
                  >
                    {selectedCompany?.jobDescription}
                  </p>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h4
                  className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <div className="h-6 w-1 bg-green-500 rounded-full flex-shrink-0"></div>
                  Eligibility Criteria
                </h4>
                <div className="grid gap-3">
                  {selectedCompany?.eligibilityCriteria.map(
                    (criteria, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 ${themeStyles.criteriaCardBg} border ${themeStyles.criteriaCardBorder} rounded-xl hover:shadow-sm transition-shadow`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${themeStyles.statIcon2Text} flex-shrink-0 mt-0.5`}
                        />
                        <span
                          className={`${themeStyles.textSecondary} text-sm sm:text-base`}
                        >
                          {criteria}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Interview Rounds */}
              <div>
                <h4
                  className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} mb-4 flex items-center gap-2`}
                >
                  <div className="h-6 w-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Interview Process
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {selectedCompany?.rounds.map((round, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r ${themeStyles.roundCardBg} rounded-xl border ${themeStyles.roundCardBorder}`}
                    >
                      <div
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${themeStyles.roundNumberBg} rounded-xl flex items-center justify-center shadow-sm border ${themeStyles.roundNumberBorder} flex-shrink-0`}
                      >
                        <span
                          className={`text-sm font-bold ${themeStyles.statIcon1Text}`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <span
                        className={`font-semibold ${themeStyles.textPrimary} text-sm sm:text-base`}
                      >
                        {round}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedCompany(null);
                  }}
                  className={`flex-1 px-4 sm:px-6 py-3 rounded-2xl border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} font-semibold transition-all shadow-sm hover:shadow-md text-sm sm:text-base`}
                >
                  Back to List
                </button>
                <button
                  onClick={() => setModalMode("confirm")}
                  disabled={
                    !selectedCompany?.isEligible || selectedCompany?.hasApplied
                  }
                  className={`flex-1 px-4 sm:px-6 py-3 rounded-2xl font-semibold transition-all shadow-sm hover:shadow-md text-sm sm:text-base ${
                    selectedCompany?.isEligible && !selectedCompany?.hasApplied
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : `${themeStyles.emptyStateBg} ${themeStyles.textTertiary} cursor-not-allowed`
                  }`}
                >
                  {selectedCompany?.hasApplied
                    ? "Already Applied ✓"
                    : selectedCompany?.isEligible
                    ? "Apply Now"
                    : "Not Eligible to Apply"}
                </button>
              </div>

              {!selectedCompany?.isEligible && (
                <div
                  className={`${themeStyles.warningBg} border ${themeStyles.warningBorder} rounded-2xl p-4 sm:p-6`}
                >
                  <div className="flex items-start gap-3">
                    <XCircle
                      className={`h-5 w-5 ${themeStyles.warningText} flex-shrink-0 mt-0.5`}
                    />
                    <p
                      className={`${themeStyles.warningText} font-medium text-sm sm:text-base`}
                    >
                      <strong>Note:</strong> You don't meet the eligibility
                      criteria for this role. Please check the requirements
                      above before applying.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation & Success Modal Overlay */}
      {modalMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className={`absolute inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm transition-opacity duration-300`}
            onClick={() => (modalMode === "success" ? setModalMode(null) : null)}
          />
          <div
            className={`relative w-full max-w-md ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300`}
          >
            <div className="p-8 text-center">
              {modalMode === "confirm" ? (
                <>
                  <div
                    className={`h-20 w-20 ${themeStyles.statIcon1Bg} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <Send
                      className={`h-10 w-10 ${themeStyles.statIcon1Text}`}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${themeStyles.textPrimary} mb-2`}
                  >
                    Confirm Application
                  </h3>
                  <p className={`${themeStyles.textSecondary} mb-8`}>
                    Are you sure you want to apply to{" "}
                    <strong>{selectedCompany?.name}</strong> for the{" "}
                    <strong>{selectedCompany?.role}</strong> position?
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setModalMode(null)}
                      className={`flex-1 px-6 py-3 rounded-2xl border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} font-semibold transition-all`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApply}
                      className="flex-1 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/30"
                    >
                      Apply Now
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}
                  >
                    <CheckCircle2
                      className={`h-10 w-10 text-green-600 dark:text-green-400`}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${themeStyles.textPrimary} mb-2`}
                  >
                    Success!
                  </h3>
                  <p className={`${themeStyles.textSecondary} mb-8`}>
                    Your application for{" "}
                    <strong>{selectedCompany?.name}</strong> has been submitted
                    successfully.
                  </p>
                  <button
                    onClick={() => {
                      setModalMode(null);
                      setShowDetailsModal(false);
                      setSelectedCompany(null);
                    }}
                    className="w-full px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg shadow-green-500/30"
                  >
                    Great!
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyRegistration;
