import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Search,
  Filter,
  MapPin,
  TrendingUp,
  UserCheck,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors shadow-sm";

  const variants = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
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

const DepartmentCoordinatorDrives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { theme } = useTheme();

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
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
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
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    companyCardBg: "bg-white",
    companyCardBorder: "border-gray-100",
    companyCardHover: "hover:border-gray-200",
    iconGradient: "from-blue-50 to-blue-100",
    statsBg: "bg-slate-50",
    statsBorder: "border-slate-200",
    deptBadgeBg: "bg-blue-50",
    deptBadgeText: "text-blue-700",
    deptBadgeBorder: "border-blue-200",
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
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
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
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    companyCardBg: "bg-slate-800",
    companyCardBorder: "border-slate-700",
    companyCardHover: "hover:border-slate-600",
    iconGradient: "from-blue-900/30 to-blue-800/30",
    statsBg: "bg-slate-800",
    statsBorder: "border-slate-700",
    deptBadgeBg: "bg-blue-900/30",
    deptBadgeText: "text-blue-400",
    deptBadgeBorder: "border-blue-800",
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  const [companyDrives] = useState([
    {
      id: 1,
      companyName: "Google",
      package: "45 LPA",
      role: "Software Engineer",
      driveDate: "2024-02-15",
      deadline: "2024-02-10",
      status: "upcoming",
      location: "Main Auditorium",
      department: "Computer Science",
      totalApplicants: 89,
      eligible: 76,
      shortlisted: 18,
      selected: 0,
    },
    {
      id: 2,
      companyName: "Microsoft",
      package: "42 LPA",
      role: "SDE-1",
      driveDate: "2024-01-28",
      deadline: "2024-01-20",
      status: "ongoing",
      location: "Building A, Room 301",
      department: "Computer Science",
      totalApplicants: 95,
      eligible: 82,
      shortlisted: 24,
      selected: 5,
    },
    {
      id: 3,
      companyName: "Amazon",
      package: "38 LPA",
      role: "Software Development Engineer",
      driveDate: "2024-01-10",
      deadline: "2024-01-05",
      status: "completed",
      location: "Engineering Block",
      department: "Computer Science",
      totalApplicants: 102,
      eligible: 87,
      shortlisted: 21,
      selected: 8,
    },
    {
      id: 4,
      companyName: "Texas Instruments",
      package: "32 LPA",
      role: "Analog Design Engineer",
      driveDate: "2024-02-18",
      deadline: "2024-02-12",
      status: "upcoming",
      location: "Electronics Lab",
      department: "Electronics",
      totalApplicants: 67,
      eligible: 58,
      shortlisted: 0,
      selected: 0,
    },
    {
      id: 5,
      companyName: "Intel",
      package: "36 LPA",
      role: "Hardware Engineer",
      driveDate: "2024-01-22",
      deadline: "2024-01-15",
      status: "ongoing",
      location: "Seminar Hall",
      department: "Electronics",
      totalApplicants: 71,
      eligible: 64,
      shortlisted: 19,
      selected: 3,
    },
    {
      id: 6,
      companyName: "Qualcomm",
      package: "40 LPA",
      role: "Chip Design Engineer",
      driveDate: "2024-01-08",
      deadline: "2024-01-02",
      status: "completed",
      location: "Innovation Center",
      department: "Electronics",
      totalApplicants: 78,
      eligible: 69,
      shortlisted: 17,
      selected: 6,
    },
    {
      id: 7,
      companyName: "Schlumberger",
      package: "28 LPA",
      role: "Field Engineer",
      driveDate: "2024-02-25",
      deadline: "2024-02-18",
      status: "upcoming",
      location: "Mechanical Block",
      department: "Mechanical",
      totalApplicants: 54,
      eligible: 48,
      shortlisted: 0,
      selected: 0,
    },
    {
      id: 8,
      companyName: "Tata Motors",
      package: "12 LPA",
      role: "Design Engineer",
      driveDate: "2024-01-18",
      deadline: "2024-01-12",
      status: "completed",
      location: "Workshop Hall",
      department: "Mechanical",
      totalApplicants: 89,
      eligible: 81,
      shortlisted: 28,
      selected: 12,
    },
    {
      id: 9,
      companyName: "L&T Construction",
      package: "10 LPA",
      role: "Site Engineer",
      driveDate: "2024-02-08",
      deadline: "2024-02-01",
      status: "upcoming",
      location: "Civil Engineering Block",
      department: "Civil",
      totalApplicants: 76,
      eligible: 68,
      shortlisted: 0,
      selected: 0,
    },
    {
      id: 10,
      companyName: "Larsen & Toubro",
      package: "9 LPA",
      role: "Project Engineer",
      driveDate: "2024-01-14",
      deadline: "2024-01-07",
      status: "completed",
      location: "Main Auditorium",
      department: "Civil",
      totalApplicants: 92,
      eligible: 84,
      shortlisted: 34,
      selected: 15,
    },
    {
      id: 11,
      companyName: "Adobe",
      package: "40 LPA",
      role: "Software Engineer",
      driveDate: "2024-01-15",
      deadline: "2024-01-08",
      status: "completed",
      location: "Computer Lab 1",
      department: "Computer Science",
      totalApplicants: 78,
      eligible: 68,
      shortlisted: 16,
      selected: 7,
    },
    {
      id: 12,
      companyName: "Bosch",
      package: "14 LPA",
      role: "Embedded Systems Engineer",
      driveDate: "2024-02-05",
      deadline: "2024-01-30",
      status: "upcoming",
      location: "Electronics Lab",
      department: "Electronics",
      totalApplicants: 65,
      eligible: 59,
      shortlisted: 0,
      selected: 0,
    },
  ]);

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
  ];

  const stats = useMemo(() => {
    const totalDrives = companyDrives.length;
    const upcoming = companyDrives.filter(
      (d) => d.status === "upcoming"
    ).length;
    const ongoing = companyDrives.filter((d) => d.status === "ongoing").length;
    const completed = companyDrives.filter(
      (d) => d.status === "completed"
    ).length;
    const totalApplicants = companyDrives.reduce(
      (sum, d) => sum + d.totalApplicants,
      0
    );
    const totalSelected = companyDrives.reduce((sum, d) => sum + d.selected, 0);

    // Department-wise stats
    const deptStats = {};
    departments.forEach((dept) => {
      const deptDrives = companyDrives.filter((d) => d.department === dept);
      deptStats[dept] = {
        drives: deptDrives.length,
        applicants: deptDrives.reduce((sum, d) => sum + d.totalApplicants, 0),
        selected: deptDrives.reduce((sum, d) => sum + d.selected, 0),
      };
    });

    return {
      totalDrives,
      upcoming,
      ongoing,
      completed,
      totalApplicants,
      totalSelected,
      deptStats,
    };
  }, [companyDrives]);

  const filteredDrives = useMemo(() => {
    return companyDrives.filter((drive) => {
      const matchesSearch =
        drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.department.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatusFilter = true;
      if (filterStatus !== "all") {
        matchesStatusFilter = drive.status === filterStatus;
      }

      let matchesDeptFilter = true;
      if (filterDepartment !== "all") {
        matchesDeptFilter = drive.department === filterDepartment;
      }

      return matchesSearch && matchesStatusFilter && matchesDeptFilter;
    });
  }, [companyDrives, searchQuery, filterStatus, filterDepartment]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "ongoing":
        return "warning";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getDepartmentColor = (department) => {
    const colors = {
      "Computer Science":
        "bg-white text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      Electronics:
        "bg-white text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
      Mechanical:
        "bg-white text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
      Civil:
        "bg-white text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    };
    return colors[department] || colors["Computer Science"];
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1
              className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}
            >
              Department-Wise Placement Drives
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base ${themeStyles.textSecondary}`}
            >
              Monitor campus recruitment activities across departments
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
                    Total Drives
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.totalDrives}
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
                    Departments
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {departments.length}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon2Bg} rounded-xl flex items-center justify-center`}
                >
                  <GraduationCap
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
                    Applicants
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.totalApplicants}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon3Bg} rounded-xl flex items-center justify-center`}
                >
                  <Users
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
                    Selected
                  </p>
                  <h3
                    className={`text-xl sm:text-3xl font-bold ${themeStyles.textPrimary} mt-1 sm:mt-2`}
                  >
                    {stats.totalSelected}
                  </h3>
                </div>
                <div
                  className={`h-8 w-8 sm:h-12 sm:w-12 ${themeStyles.statIcon4Bg} rounded-xl flex items-center justify-center`}
                >
                  <Award
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${themeStyles.statIcon4Text}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Statistics */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-4 sm:p-6">
            <h2
              className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary} mb-4`}
            >
              Department Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept}
                  className={`border ${themeStyles.cardBorder} rounded-xl p-4 ${themeStyles.companyCardBg} transition-all ${themeStyles.cardHoverShadow}`}
                >
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-semibold mb-3 ${getDepartmentColor(
                      dept
                    )}`}
                  >
                    {dept}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Drives
                      </span>
                      <span className={`font-bold ${themeStyles.textPrimary}`}>
                        {stats.deptStats[dept]?.drives || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Applicants
                      </span>
                      <span className={`font-bold ${themeStyles.textPrimary}`}>
                        {stats.deptStats[dept]?.applicants || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Selected
                      </span>
                      <span
                        className={`font-bold ${themeStyles.statIcon2Text}`}
                      >
                        {stats.deptStats[dept]?.selected || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} h-4 w-4`}
                />
                <input
                  type="text"
                  placeholder="Search companies, roles, or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="sm:hidden">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className={`w-full px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} flex items-center justify-center gap-2`}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
                <div className="hidden sm:flex gap-2 flex-wrap">
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-4 py-2.5 border ${themeStyles.inputBorder} rounded-xl ${themeStyles.inputBg} ${themeStyles.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm sm:text-base`}
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="mt-4 sm:hidden space-y-3">
                <div>
                  <label
                    className={`text-sm font-semibold ${themeStyles.textPrimary} mb-2 block`}
                  >
                    Department
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFilterDepartment("all")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterDepartment === "all"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      All
                    </button>
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setFilterDepartment(dept)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          filterDepartment === dept
                            ? "bg-blue-600 text-white"
                            : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                        }`}
                      >
                        {dept.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className={`text-sm font-semibold ${themeStyles.textPrimary} mb-2 block`}
                  >
                    Status
                  </label>
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
                      onClick={() => setFilterStatus("upcoming")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "upcoming"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Upcoming
                    </button>
                    <button
                      onClick={() => setFilterStatus("ongoing")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "ongoing"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Ongoing
                    </button>
                    <button
                      onClick={() => setFilterStatus("completed")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        filterStatus === "completed"
                          ? "bg-blue-600 text-white"
                          : `${themeStyles.buttonBg} ${themeStyles.textPrimary} border ${themeStyles.buttonBorder}`
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Drives List */}
        <div
          className={`rounded-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow}`}
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2
                className={`text-lg sm:text-xl font-bold ${themeStyles.textPrimary}`}
              >
                Campus Drives by Department
              </h2>
              <span className={`text-sm ${themeStyles.textSecondary}`}>
                {filteredDrives.length} drives found
              </span>
            </div>

            <div className="space-y-4">
              {filteredDrives.map((drive) => (
                <div
                  key={drive.id}
                  className={`border ${themeStyles.companyCardBorder} rounded-2xl p-4 sm:p-6 ${themeStyles.cardHoverShadow} transition-all duration-200 ${themeStyles.companyCardBg} ${themeStyles.companyCardHover}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
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
                            {drive.companyName}
                          </h3>
                          <p
                            className={`${themeStyles.textSecondary} truncate`}
                          >
                            {drive.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-semibold ${getDepartmentColor(
                            drive.department
                          )}`}
                        >
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {drive.department}
                        </div>
                        <Badge
                          variant={getStatusColor(drive.status)}
                          className="shadow-sm text-xs"
                        >
                          {getStatusText(drive.status)}
                        </Badge>
                        {drive.status === "completed" && drive.selected > 0 && (
                          <Badge
                            variant="success"
                            className="shadow-sm text-xs"
                          >
                            {drive.selected} Selected
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 ${themeStyles.statIcon2Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
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
                              {drive.package}
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
                              Drive Date
                            </span>
                            <p
                              className={`font-semibold ${themeStyles.textPrimary} truncate`}
                            >
                              {formatDate(drive.driveDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 ${themeStyles.statIcon3Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <MapPin
                              className={`h-4 w-4 ${themeStyles.statIcon3Text}`}
                            />
                          </div>
                          <div className="min-w-0">
                            <span
                              className={`${themeStyles.textSecondary} text-xs font-semibold uppercase tracking-wide block`}
                            >
                              Location
                            </span>
                            <p
                              className={`font-semibold ${themeStyles.textPrimary} truncate`}
                            >
                              {drive.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Statistics Panel */}
                    <div
                      className={`lg:ml-6 ${themeStyles.statsBg} rounded-xl p-4 lg:min-w-[280px] border ${themeStyles.statsBorder}`}
                    >
                      <h4
                        className={`text-sm font-bold ${themeStyles.textPrimary} mb-3`}
                      >
                        Application Statistics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users
                              className={`h-4 w-4 ${themeStyles.textSecondary}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Total Applicants
                            </span>
                          </div>
                          <span
                            className={`font-bold ${themeStyles.textPrimary}`}
                          >
                            {drive.totalApplicants}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              className={`h-4 w-4 ${themeStyles.statIcon2Text}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Eligible
                            </span>
                          </div>
                          <span
                            className={`font-bold ${themeStyles.statIcon2Text}`}
                          >
                            {drive.eligible}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserCheck
                              className={`h-4 w-4 ${themeStyles.statIcon1Text}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Shortlisted
                            </span>
                          </div>
                          <span
                            className={`font-bold ${themeStyles.statIcon1Text}`}
                          >
                            {drive.shortlisted}
                          </span>
                        </div>
                        {drive.status === "completed" && (
                          <div
                            className={`flex items-center justify-between pt-2 border-t ${themeStyles.statsBorder}`}
                          >
                            <div className="flex items-center gap-2">
                              <TrendingUp
                                className={`h-4 w-4 ${themeStyles.statIcon3Text}`}
                              />
                              <span
                                className={`text-sm font-semibold ${themeStyles.textPrimary}`}
                              >
                                Selected
                              </span>
                            </div>
                            <span
                              className={`font-bold ${themeStyles.statIcon3Text} text-lg`}
                            >
                              {drive.selected}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDrives.length === 0 && (
              <div
                className={`text-center py-12 ${themeStyles.emptyStateBg} rounded-2xl`}
              >
                <Search
                  className={`h-12 w-12 ${themeStyles.emptyStateIcon} mx-auto mb-4`}
                />
                <h3
                  className={`text-lg font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No drives found
                </h3>
                <p className={themeStyles.textSecondary}>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCoordinatorDrives;
