import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Users,
  TrendingUp,
  FileText,
  X,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

// Add Urbanist font and custom animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
    * {
      font-family: 'Urbanist', sans-serif;
    }
    @keyframes progress-indeterminate {
        0% { transform: translateX(-100%) scaleX(0.2); }
        50% { transform: translateX(0%) scaleX(0.5); }
        100% { transform: translateX(100%) scaleX(0.2); }
    }
    .animate-progress-indeterminate {
        animation: progress-indeterminate 2s infinite linear;
    }
  `;
  document.head.appendChild(style);
}

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children, themeStyles }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`}>
      <div
        className={`w-full max-w-md transform overflow-hidden rounded-2xl ${themeStyles.cardBg} border ${themeStyles.cardBorder} p-6 text-left align-middle shadow-2xl transition-all`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold leading-6 ${themeStyles.textPrimary}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className={`rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
          >
            <X className={`h-5 w-5 ${themeStyles.textSecondary}`} />
          </button>
        </div>
        <div className="mt-2 text-sm">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all shadow-lg hover:shadow-blue-500/20"
            onClick={onClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultsPageVolunteer = () => {
  const { theme } = useTheme();
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
    buttonSuccess: "bg-green-600 hover:bg-green-700 text-white",
    badgeSelected: "bg-green-100 text-green-700 border-green-200",
    badgeRejected: "bg-red-100 text-red-700 border-red-200",
    divider: "border-slate-200",
    tableHeader: "bg-slate-100",
    tableRow: "hover:bg-slate-50",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50",
    statCard4Gradient: "from-white to-amber-50",
    filterBadge: "bg-blue-100 text-blue-700 border-blue-200",
    // Icon background + color tokens
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100",
    statIcon3Text: "text-purple-600",
    statIcon4Bg: "bg-amber-100",
    statIcon4Text: "text-amber-600",
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
    inputFocus: "focus:border-blue-400 focus:ring-2 focus:ring-blue-900/30",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    buttonSuccess: "bg-green-600 hover:bg-green-700 text-white",
    badgeSelected: "bg-green-900/30 text-green-400 border-green-900/20",
    badgeRejected: "bg-red-900/30 text-red-400 border-red-900/20",
    divider: "border-slate-700",
    tableHeader: "bg-slate-800",
    tableRow: "hover:bg-slate-800/50",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    statCard4Gradient: "from-slate-800 to-amber-900/30",
    filterBadge: "bg-blue-900/30 text-blue-400 border-blue-900/20",
    // Icon background + color tokens
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30",
    statIcon4Text: "text-amber-400",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Sample results data (removed Waiting status)
  const [resultsData] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      branch: "CS",
      year: "2025",
      company: "TCS",
      result: "Selected",
      offerLocation: "Mumbai",
      package: "7.5",
    },
    {
      id: 2,
      studentName: "Priya Patel",
      branch: "IT",
      year: "2025",
      company: "TCS",
      result: "Selected",
      offerLocation: "Bangalore",
      package: "7.5",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      branch: "ECE",
      year: "2025",
      company: "TCS",
      result: "Rejected",
      offerLocation: "-",
      package: "-",
    },
    {
      id: 4,
      studentName: "Sneha Reddy",
      branch: "CS",
      year: "2025",
      company: "TCS",
      result: "Rejected",
      offerLocation: "-",
      package: "-",
    },
    {
      id: 5,
      studentName: "Vikram Singh",
      branch: "IT",
      year: "2025",
      company: "Infosys",
      result: "Selected",
      offerLocation: "Pune",
      package: "8.0",
    },
    {
      id: 6,
      studentName: "Anjali Mehta",
      branch: "CS",
      year: "2025",
      company: "Infosys",
      result: "Selected",
      offerLocation: "Hyderabad",
      package: "8.0",
    },
    {
      id: 7,
      studentName: "Arjun Nair",
      branch: "MECH",
      year: "2026",
      company: "Wipro",
      result: "Rejected",
      offerLocation: "-",
      package: "-",
    },
    {
      id: 8,
      studentName: "Kavya Iyer",
      branch: "ECE",
      year: "2025",
      company: "Wipro",
      result: "Rejected",
      offerLocation: "-",
      package: "-",
    },
    {
      id: 9,
      studentName: "Rohan Verma",
      branch: "CS",
      year: "2025",
      company: "Accenture",
      result: "Selected",
      offerLocation: "Chennai",
      package: "6.5",
    },
    {
      id: 10,
      studentName: "Pooja Das",
      branch: "IT",
      year: "2025",
      company: "Cognizant",
      result: "Selected",
      offerLocation: "Kolkata",
      package: "6.0",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [downloadModal, setDownloadModal] = useState({ isOpen: false, reportType: "" });

  // Filtered results
  const filteredResults = useMemo(() => {
    return resultsData.filter(result => {
      const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = filterCompany === "all" || result.company === filterCompany;
      const matchesResult = filterResult === "all" || result.result === filterResult;
      return matchesSearch && matchesCompany && matchesResult;
    });
  }, [resultsData, searchTerm, filterCompany, filterResult]);

  // Statistics
  const stats = useMemo(() => {
    const selected = resultsData.filter(r => r.result === "Selected").length;
    const rejected = resultsData.filter(r => r.result === "Rejected").length;
    const total = resultsData.length;

    // Calculate average package
    const selectedStudents = resultsData.filter(r => r.result === "Selected" && r.package !== "-");
    const totalPackage = selectedStudents.reduce((sum, r) => sum + parseFloat(r.package), 0);
    const avgPackage = selectedStudents.length > 0 ? (totalPackage / selectedStudents.length).toFixed(2) : "0.00";

    return { selected, rejected, total, avgPackage };
  }, [resultsData]);

  const getResultBadge = (result) => {
    const styles = {
      Selected: { bg: themeStyles.badgeSelected, icon: CheckCircle2 },
      Rejected: { bg: themeStyles.badgeRejected, icon: XCircle },
    };
    const { bg, icon: Icon } = styles[result];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${bg}`}>
        <Icon size={12} />
        {result}
      </span>
    );
  };

  const handleDownload = (type) => {
    setDownloadModal({ isOpen: true, reportType: type });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCompany("all");
    setFilterResult("all");
  };

  const activeFiltersCount = [
    searchTerm,
    filterCompany !== "all" && filterCompany,
    filterResult !== "all" && filterResult
  ].filter(Boolean).length;

  const uniqueCompanies = [...new Set(resultsData.map(r => r.company))];

  // Stat card definitions — layout mirrors OfferLetterManager
  const statCards = [
    {
      label: "Total Students",
      value: stats.total,
      Icon: Users,
      gradient: themeStyles.statCard1Gradient,
      iconBg: themeStyles.statIcon1Bg,
      iconColor: themeStyles.statIcon1Text,
    },
    {
      label: "Selected",
      value: stats.selected,
      Icon: CheckCircle2,
      gradient: themeStyles.statCard2Gradient,
      iconBg: themeStyles.statIcon2Bg,
      iconColor: themeStyles.statIcon2Text,
    },
    {
      label: "Rejected",
      value: stats.rejected,
      Icon: XCircle,
      gradient: themeStyles.statCard3Gradient,
      iconBg: themeStyles.statIcon3Bg,
      iconColor: themeStyles.statIcon3Text,
    },
    {
      label: "Average Package",
      value: (
        <>
          ₹{stats.avgPackage}
          <span className={`text-lg ${themeStyles.textSecondary} ml-1`}>LPA</span>
        </>
      ),
      Icon: TrendingUp,
      gradient: themeStyles.statCard4Gradient,
      iconBg: themeStyles.statIcon4Bg,
      iconColor: themeStyles.statIcon4Text,
    },
  ];

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Placement Results
            </h1>
            <p className={`mt-2 ${themeStyles.textSecondary}`}>
              View placement drive results and student outcomes
            </p>
          </div>
        </div>

        {/* Stats Grid — layout matches OfferLetterManager */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, Icon, gradient, iconBg, iconColor }) => (
            <div
              key={label}
              className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${gradient} transition-all`}
            >
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>{label}</p>
                  <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}>{value}</h3>
                </div>
                <div className={`h-12 w-12 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
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
                placeholder="Search student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none transition-all`}
              />
            </div>

            {/* Filter Toggle */}
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

            {/* Download Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleDownload("selected")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 ${themeStyles.buttonSuccess} rounded-lg transition-all font-medium text-sm sm:text-base`}
              >
                <Download size={18} />
                <span className="inline">Selected</span>
              </button>
              <button
                onClick={() => handleDownload("full")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 ${themeStyles.buttonPrimary} rounded-lg transition-all font-medium text-sm sm:text-base`}
              >
                <Download size={18} />
                <span className="inline">Full Results</span>
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className={`mt-4 pt-4 border-t ${themeStyles.divider}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Company Filter */}
                <div>
                  <label className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                    Company
                  </label>
                  <select
                    value={filterCompany}
                    onChange={(e) => setFilterCompany(e.target.value)}
                    className={`w-full px-3 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none`}
                  >
                    <option value="all">All Companies</option>
                    {uniqueCompanies.map((company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Result Filter */}
                <div>
                  <label className={`block text-sm font-medium ${themeStyles.textSecondary} mb-2`}>
                    Result Status
                  </label>
                  <select
                    value={filterResult}
                    onChange={(e) => setFilterResult(e.target.value)}
                    className={`w-full px-3 py-2 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none`}
                  >
                    <option value="all">All Results</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
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

        {/* Results Table */}
        <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl ${themeStyles.cardShadow} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={themeStyles.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Student Name
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Branch
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Year
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Company
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Result
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Location
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textSecondary} uppercase tracking-wider`}>
                    Package
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${themeStyles.divider}`}>
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <FileText className={`mx-auto h-12 w-12 ${themeStyles.textTertiary} mb-3`} />
                      <p className={`${themeStyles.textSecondary} font-medium`}>
                        No results found
                      </p>
                      <p className={`${themeStyles.textTertiary} text-sm mt-1`}>
                        Try adjusting your search or filter criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result) => (
                    <tr key={result.id} className={`${themeStyles.tableRow} transition-colors`}>
                      <td className={`px-6 py-4 whitespace-nowrap font-medium ${themeStyles.textPrimary}`}>
                        {result.studentName}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${themeStyles.cardBorder} ${themeStyles.textSecondary}`}>
                          {result.branch}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${themeStyles.textSecondary}`}>
                        {result.year}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap font-medium ${themeStyles.textPrimary}`}>
                        {result.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getResultBadge(result.result)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${themeStyles.textSecondary}`}>
                        {result.offerLocation}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap font-semibold ${themeStyles.textPrimary}`}>
                        {result.package !== "-" ? `₹${result.package} LPA` : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredResults.length > 0 && (
            <div className={`px-6 py-4 border-t ${themeStyles.divider} flex items-center justify-between`}>
              <p className={`text-sm ${themeStyles.textSecondary}`}>
                Showing <span className="font-medium">{filteredResults.length}</span> of{" "}
                <span className="font-medium">{resultsData.length}</span> results
              </p>
              <div className={`text-sm ${themeStyles.textSecondary}`}>
                <span className="font-medium">{stats.selected}</span> Selected •{" "}
                <span className="font-medium">{stats.rejected}</span> Rejected
              </div>
            </div>
          )}
        </div>

        {/* Download Modal */}
        <Modal
          isOpen={downloadModal.isOpen}
          onClose={() => setDownloadModal({ ...downloadModal, isOpen: false })}
          title="Exporting Report"
          themeStyles={themeStyles}
        >
          <div className="flex flex-col items-center py-4">
            <div className={`h-16 w-16 ${themeStyles.statIcon2Bg} rounded-full flex items-center justify-center mb-4`}>
              <Download className={`h-8 w-8 ${themeStyles.statIcon2Text}`} />
            </div>
            <p className={`text-base font-semibold ${themeStyles.textPrimary} text-center`}>
              Generating {downloadModal.reportType === "selected" ? "Selected Students" : "Full Placement"} Report
            </p>
            <p className={`text-sm ${themeStyles.textSecondary} text-center mt-2 px-4`}>
              Your data is being processed and formatted for export. The download will begin momentarily.
            </p>
            <div className="w-full mt-6 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-green-600 h-full rounded-full animate-progress-indeterminate w-full origin-left"></div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ResultsPageVolunteer;