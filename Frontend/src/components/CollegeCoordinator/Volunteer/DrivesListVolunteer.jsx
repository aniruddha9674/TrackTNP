import React, { useState, useMemo } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Download,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Globe,
  FileText,
  ChevronDown,
  X,
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

const DrivesListVolunteer = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Theme styles
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
    inputFocus: "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-200 hover:bg-slate-300 text-slate-700",
    badgeUpcoming: "bg-blue-100 text-blue-700 border-blue-200",
    badgeOngoing: "bg-green-100 text-green-700 border-green-200",
    badgeCompleted: "bg-gray-100 text-gray-700 border-gray-200",
    divider: "border-slate-200",
    iconBlue: "text-blue-600",
    iconGreen: "text-green-600",
    iconPurple: "text-purple-600",
    iconAmber: "text-amber-600",
    modalOverlay: "bg-black/50",
    statCard: "from-white to-blue-50",
    filterBadge: "bg-blue-100 text-blue-700 border-blue-200",
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
    inputBg: "bg-slate-800",
    inputBorder: "border-slate-600",
    inputFocus: "focus:border-blue-400 focus:ring-2 focus:ring-blue-900/30",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    badgeUpcoming: "bg-blue-900/30 text-blue-400 border-blue-900/20",
    badgeOngoing: "bg-green-900/30 text-green-400 border-green-900/20",
    badgeCompleted: "bg-gray-700 text-gray-400 border-gray-600",
    divider: "border-slate-700",
    iconBlue: "text-blue-400",
    iconGreen: "text-green-400",
    iconPurple: "text-purple-400",
    iconAmber: "text-amber-400",
    modalOverlay: "bg-black/70",
    statCard: "from-slate-800 to-blue-900/30",
    filterBadge: "bg-blue-900/30 text-blue-400 border-blue-900/20",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Sample data
  const [drives] = useState([
    {
      id: 1,
      companyName: "Tech Corp Solutions",
      jobRole: "Software Engineer",
      package: "12",
      driveDate: "2024-12-05",
      venue: "Online",
      mode: "Online",
      eligibleBranches: ["CS", "IT", "ECE"],
      yearEligibility: ["2025"],
      totalRegistered: 145,
      status: "upcoming",
      coordinatorNotes: "Please ensure all students have stable internet connection. Interview will be conducted via Microsoft Teams.",
    },
    {
      id: 2,
      companyName: "Innovation Labs",
      jobRole: "Full Stack Developer",
      package: "15",
      driveDate: "2024-11-28",
      venue: "Auditorium Block A",
      mode: "Offline",
      eligibleBranches: ["CS", "IT"],
      yearEligibility: ["2025"],
      totalRegistered: 89,
      status: "ongoing",
      coordinatorNotes: "Arrangement for seating has been done. Please check attendance at entry.",
    },
    {
      id: 3,
      companyName: "Digital Solutions Inc",
      jobRole: "Data Analyst",
      package: "10",
      driveDate: "2024-11-15",
      venue: "Lab 301",
      mode: "Offline",
      eligibleBranches: ["CS", "IT", "MECH", "ECE"],
      yearEligibility: ["2025", "2026"],
      totalRegistered: 203,
      status: "completed",
      coordinatorNotes: "Drive completed successfully. All results have been uploaded.",
    },
    {
      id: 4,
      companyName: "Cloud Systems",
      jobRole: "DevOps Engineer",
      package: "14",
      driveDate: "2024-12-10",
      venue: "Online",
      mode: "Online",
      eligibleBranches: ["CS", "IT"],
      yearEligibility: ["2025"],
      totalRegistered: 67,
      status: "upcoming",
      coordinatorNotes: "Technical round will be followed by HR round on the same day.",
    },
    {
      id: 5,
      companyName: "Finance Tech",
      jobRole: "Software Developer",
      package: "11",
      driveDate: "2024-11-29",
      venue: "Conference Hall",
      mode: "Offline",
      eligibleBranches: ["CS", "IT", "ECE", "EEE"],
      yearEligibility: ["2025"],
      totalRegistered: 178,
      status: "upcoming",
      coordinatorNotes: "Company representatives will arrive at 9 AM. Please ensure registration desk is ready by 8:30 AM.",
    },
  ]);

  const [selectedDrive, setSelectedDrive] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  // Statistics
  const stats = useMemo(() => {
    const upcoming = drives.filter(d => d.status === "upcoming").length;
    const ongoing = drives.filter(d => d.status === "ongoing").length;
    const completed = drives.filter(d => d.status === "completed").length;
    const totalStudents = drives.reduce((sum, d) => sum + d.totalRegistered, 0);
    return { upcoming, ongoing, completed, totalStudents };
  }, [drives]);

  // Filtered drives
  const filteredDrives = useMemo(() => {
    return drives.filter(drive => {
      const matchesSearch = drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drive.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || drive.status === filterStatus;
      const matchesDate = !dateFilter || drive.driveDate === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [drives, searchTerm, filterStatus, dateFilter]);

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: { bg: themeStyles.badgeUpcoming, icon: Clock },
      ongoing: { bg: themeStyles.badgeOngoing, icon: AlertCircle },
      completed: { bg: themeStyles.badgeCompleted, icon: CheckCircle2 },
    };
    const { bg, icon: Icon } = styles[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${bg}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleDownloadList = (drive) => {
    alert(`Downloading student list for ${drive.companyName}`);
  };

  const handleViewStudents = (drive) => {
    setSelectedDrive(drive);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setDateFilter("");
  };

  const activeFiltersCount = [
    searchTerm,
    filterStatus !== "all" && filterStatus,
    dateFilter
  ].filter(Boolean).length;

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
            Placement Drives
          </h1>
          <p className={`mt-2 ${themeStyles.textSecondary}`}>
            View and manage placement drive information
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Clock, label: "Upcoming", value: stats.upcoming, color: themeStyles.iconBlue },
            { icon: AlertCircle, label: "Ongoing", value: stats.ongoing, color: themeStyles.iconGreen },
            { icon: CheckCircle2, label: "Completed", value: stats.completed, color: themeStyles.iconPurple },
            { icon: Users, label: "Total Students", value: stats.totalStudents, color: themeStyles.iconAmber },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${themeStyles.cardBorder} p-6 ${themeStyles.cardShadow} hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${themeStyles.statCard}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    {stat.label}
                  </p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>
                    {stat.value}
                  </h3>
                </div>
                <div className={`h-12 w-12 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} mb-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary}`} size={20} />
              <input
                type="text"
                placeholder="Search by company name or job role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none transition-all`}
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 ${themeStyles.buttonSecondary} rounded-lg transition-all font-medium`}
            >
              <Filter size={18} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${themeStyles.filterBadge}`}>
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className={`mt-4 pt-4 border-t ${themeStyles.divider}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full px-3 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none`}
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                    Drive Date
                  </label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className={`w-full px-3 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none`}
                  />
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className={`w-full px-4 py-2 ${themeStyles.buttonSecondary} rounded-lg transition-all font-medium flex items-center justify-center gap-2`}
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drives List */}
        <div className="space-y-4">
          {filteredDrives.length === 0 ? (
            <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-12 text-center ${themeStyles.cardShadow}`}>
              <Building2 className={`mx-auto h-16 w-16 ${themeStyles.textTertiary} mb-4`} />
              <h3 className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}>
                No drives found
              </h3>
              <p className={`${themeStyles.textSecondary}`}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredDrives.map((drive) => (
              <div
                key={drive.id}
                className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all`}
              >
                {/* Drive Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`h-12 w-12 bg-opacity-10 ${themeStyles.iconBlue} bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Building2 size={24} className={themeStyles.iconBlue} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                          {drive.companyName}
                        </h3>
                        <p className={`${themeStyles.textSecondary} font-medium mt-1`}>
                          {drive.jobRole}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(drive.status)}
                  </div>
                </div>

                {/* Drive Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className={themeStyles.iconBlue} />
                    <div>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>Package</p>
                      <p className={`font-semibold ${themeStyles.textPrimary}`}>
                        ₹{drive.package} LPA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className={themeStyles.iconGreen} />
                    <div>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>Drive Date</p>
                      <p className={`font-semibold ${themeStyles.textPrimary}`}>
                        {new Date(drive.driveDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {drive.mode === "Online" ? (
                      <Globe size={18} className={themeStyles.iconPurple} />
                    ) : (
                      <MapPin size={18} className={themeStyles.iconPurple} />
                    )}
                    <div>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>Venue</p>
                      <p className={`font-semibold ${themeStyles.textPrimary}`}>
                        {drive.venue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users size={18} className={themeStyles.iconAmber} />
                    <div>
                      <p className={`text-xs ${themeStyles.textTertiary}`}>Registered</p>
                      <p className={`font-semibold ${themeStyles.textPrimary}`}>
                        {drive.totalRegistered} Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Info */}
                <div className={`border-t ${themeStyles.divider} pt-4 mb-4`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                        Eligible Branches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {drive.eligibleBranches.map((branch, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${themeStyles.cardBorder} ${themeStyles.textSecondary}`}
                          >
                            {branch}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                        Year Eligibility
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {drive.yearEligibility.map((year, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${themeStyles.cardBorder} ${themeStyles.textSecondary}`}
                          >
                            Batch {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coordinator Notes */}
                {drive.coordinatorNotes && (
                  <div className={`border-t ${themeStyles.divider} pt-4 mb-4`}>
                    <div className="flex items-start gap-2">
                      <FileText size={18} className={`${themeStyles.iconBlue} mt-0.5`} />
                      <div>
                        <p className={`text-sm font-medium ${themeStyles.textSecondary} mb-1`}>
                          Coordinator Notes
                        </p>
                        <p className={`text-sm ${themeStyles.textPrimary}`}>
                          {drive.coordinatorNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className={`border-t ${themeStyles.divider} pt-4`}>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleViewStudents(drive)}
                      className={`px-4 py-2 ${themeStyles.buttonPrimary} rounded-lg transition-all font-medium flex items-center gap-2`}
                    >
                      <Users size={18} />
                      View Student List
                    </button>
                    {drive.mode === "Offline" && (
                      <button
                        onClick={() => handleDownloadList(drive)}
                        className={`px-4 py-2 ${themeStyles.buttonSecondary} rounded-lg transition-all font-medium flex items-center gap-2`}
                      >
                        <Download size={18} />
                        Download List
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Student List Modal */}
      {selectedDrive && (
        <div className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
          <div className={`${themeStyles.cardBg} rounded-2xl ${themeStyles.cardShadow} max-w-2xl w-full max-h-[80vh] overflow-hidden`}>
            <div className={`p-6 border-b ${themeStyles.divider}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                    Registered Students
                  </h3>
                  <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
                    {selectedDrive.companyName} - {selectedDrive.jobRole}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDrive(null)}
                  className={`p-2 ${themeStyles.buttonSecondary} rounded-lg transition-all`}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className={`text-center ${themeStyles.textSecondary} py-8`}>
                Student list functionality would be implemented here with actual student data
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivesListVolunteer;
