import React, { useState, useMemo } from "react";
import {
  Building2,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Award,
  FileText,
  X,
  ChevronDown,
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

const ResultsPageVolunteer = () => {
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
    buttonSuccess: "bg-green-600 hover:bg-green-700 text-white",
    badgeSelected: "bg-green-100 text-green-700 border-green-200",
    badgeRejected: "bg-red-100 text-red-700 border-red-200",
    badgeWaiting: "bg-amber-100 text-amber-700 border-amber-200",
    divider: "border-slate-200",
    iconBlue: "text-blue-600",
    iconGreen: "text-green-600",
    iconRed: "text-red-600",
    iconAmber: "text-amber-600",
    tableHeader: "bg-slate-100",
    tableRow: "hover:bg-slate-50",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard4Gradient: "from-white to-amber-50",
    statCard3Gradient: "from-white to-purple-50",
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
    inputBg: "bg-slate-950",
    inputBorder: "border-slate-600",
    inputFocus: "focus:border-blue-400 focus:ring-2 focus:ring-blue-900/30",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    buttonSuccess: "bg-green-600 hover:bg-green-700 text-white",
    badgeSelected: "bg-green-900/30 text-green-400 border-green-900/20",
    badgeRejected: "bg-red-900/30 text-red-400 border-red-900/20",
    badgeWaiting: "bg-amber-900/30 text-amber-400 border-amber-900/20",
    divider: "border-slate-700",
    iconBlue: "text-blue-400",
    iconGreen: "text-green-400",
    iconRed: "text-red-400",
    iconAmber: "text-amber-400",
    tableHeader: "bg-slate-800",
    tableRow: "hover:bg-slate-800/50",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard4Gradient: "from-slate-800 to-amber-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    filterBadge: "bg-blue-900/30 text-blue-400 border-blue-900/20",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // Sample drives data
  const drives = [
    { id: 1, name: "TCS – Jan 2025", company: "TCS", date: "Jan 2025" },
    { id: 2, name: "Infosys – Feb 2025", company: "Infosys", date: "Feb 2025" },
    { id: 3, name: "Wipro – Dec 2024", company: "Wipro", date: "Dec 2024" },
    { id: 4, name: "Accenture – Jan 2025", company: "Accenture", date: "Jan 2025" },
    { id: 5, name: "Cognizant – Feb 2025", company: "Cognizant", date: "Feb 2025" },
  ];

  // Sample results data
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
      result: "Waiting",
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
      result: "Waiting",
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

  const [selectedDrive, setSelectedDrive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filtered results
  const filteredResults = useMemo(() => {
    return resultsData.filter(result => {
      const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = filterCompany === "all" || result.company === filterCompany;
      const matchesResult = filterResult === "all" || result.result === filterResult;
      const matchesDrive = !selectedDrive || result.company === drives.find(d => d.id === parseInt(selectedDrive))?.company;
      return matchesSearch && matchesCompany && matchesResult && matchesDrive;
    });
  }, [resultsData, searchTerm, filterCompany, filterResult, selectedDrive]);

  // Statistics
  const stats = useMemo(() => {
    const data = selectedDrive ? filteredResults : resultsData;
    const selected = data.filter(r => r.result === "Selected").length;
    const rejected = data.filter(r => r.result === "Rejected").length;
    const waiting = data.filter(r => r.result === "Waiting").length;
    const total = data.length;

    // Branch-wise selections
    const branchWise = data
      .filter(r => r.result === "Selected")
      .reduce((acc, r) => {
        acc[r.branch] = (acc[r.branch] || 0) + 1;
        return acc;
      }, {});

    // Year-wise selections
    const yearWise = data
      .filter(r => r.result === "Selected")
      .reduce((acc, r) => {
        acc[r.year] = (acc[r.year] || 0) + 1;
        return acc;
      }, {});

    return { selected, rejected, waiting, total, branchWise, yearWise };
  }, [resultsData, filteredResults, selectedDrive]);

  const getResultBadge = (result) => {
    const styles = {
      Selected: { bg: themeStyles.badgeSelected, icon: CheckCircle2 },
      Rejected: { bg: themeStyles.badgeRejected, icon: XCircle },
      Waiting: { bg: themeStyles.badgeWaiting, icon: Clock },
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
    const message = type === "selected"
      ? "Downloading selected students list..."
      : "Downloading full results...";
    alert(message);
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

        {/* Drive Selection */}
        <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow} mb-6`}>
          <label className={`block text-sm font-medium ${themeStyles.textSecondary} mb-3`}>
            Select Company Drive
          </label>
          <div className="relative">
            <Building2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary}`} size={20} />
            <select
              value={selectedDrive}
              onChange={(e) => setSelectedDrive(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} ${themeStyles.inputFocus} rounded-lg ${themeStyles.textPrimary} outline-none appearance-none cursor-pointer font-medium`}
            >
              <option value="">All Drives</option>
              {drives.map((drive) => (
                <option key={drive.id} value={drive.id}>
                  {drive.name}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeStyles.textTertiary} pointer-events-none`} size={20} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: CheckCircle2, label: "Selected", value: stats.selected, color: themeStyles.iconGreen, percentage: `${((stats.selected / stats.total) * 100).toFixed(1)}%`, gradient: themeStyles.statCard1Gradient },
            { icon: XCircle, label: "Rejected", value: stats.rejected, color: themeStyles.iconRed, percentage: `${((stats.rejected / stats.total) * 100).toFixed(1)}%`, gradient: themeStyles.statCard2Gradient },
            { icon: Clock, label: "Waiting", value: stats.waiting, color: themeStyles.iconAmber, percentage: `${((stats.waiting / stats.total) * 100).toFixed(1)}%`, gradient: themeStyles.statCard3Gradient },
            { icon: Users, label: "Total", value: stats.total, color: themeStyles.iconBlue, percentage: "100%", gradient: themeStyles.statCard4Gradient },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${themeStyles.cardBorder} p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.gradient}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-12 w-12 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                  {stat.percentage}
                </span>
              </div>
              <p className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                {stat.label}
              </p>
              <h3 className={`text-3xl font-bold ${themeStyles.textPrimary} mt-1`}>
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Branch & Year-wise Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Branch-wise */}
          <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow}`}>
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className={themeStyles.iconBlue} />
              <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                Branch-wise Selections
              </h3>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.branchWise).map(([branch, count]) => (
                <div key={branch} className="flex items-center justify-between">
                  <span className={`font-medium ${themeStyles.textSecondary}`}>
                    {branch}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-24 ${themeStyles.inputBg} rounded-full overflow-hidden`}>
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(count / stats.selected) * 100}%` }}
                      />
                    </div>
                    <span className={`font-bold ${themeStyles.textPrimary} w-8 text-right`}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year-wise */}
          <div className={`${themeStyles.cardBg} border ${themeStyles.cardBorder} rounded-2xl p-6 ${themeStyles.cardShadow}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className={themeStyles.iconGreen} />
              <h3 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
                Year-wise Selections
              </h3>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.yearWise).map(([year, count]) => (
                <div key={year} className="flex items-center justify-between">
                  <span className={`font-medium ${themeStyles.textSecondary}`}>
                    Batch {year}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-24 ${themeStyles.inputBg} rounded-full overflow-hidden`}>
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(count / stats.selected) * 100}%` }}
                      />
                    </div>
                    <span className={`font-bold ${themeStyles.textPrimary} w-8 text-right`}>
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload("selected")}
                className={`flex items-center gap-2 px-4 py-2.5 ${themeStyles.buttonSuccess} rounded-lg transition-all font-medium`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Selected</span>
              </button>
              <button
                onClick={() => handleDownload("full")}
                className={`flex items-center gap-2 px-4 py-2.5 ${themeStyles.buttonPrimary} rounded-lg transition-all font-medium`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Full Results</span>
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
                    <option value="Waiting">Waiting</option>
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
                <span className="font-medium">{stats.rejected}</span> Rejected •{" "}
                <span className="font-medium">{stats.waiting}</span> Waiting
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPageVolunteer;