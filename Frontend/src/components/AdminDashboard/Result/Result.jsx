import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Search,
  Filter,
  X,
  Moon,
  Sun,
  Building2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PlacementResultsManager = () => {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedCollegeStudents, setSelectedCollegeStudents] = useState([]);
  const [selectedCollegeName, setSelectedCollegeName] = useState("");
  const [filters, setFilters] = useState({
    packageRange: "all",
    company: "all",
    college: "all",
    department: "all",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 15;

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      college: "Engineering College",
      department: "CS",
      company: "Google",
      package: 2500000,
    },
    {
      id: 2,
      name: "Priya Patel",
      college: "Engineering College",
      department: "IT",
      company: "Microsoft",
      package: 2200000,
    },
    {
      id: 3,
      name: "Amit Kumar",
      college: "Arts & Science College",
      department: "CS",
      company: "Amazon",
      package: 1800000,
    },
    {
      id: 4,
      name: "Sneha Desai",
      college: "Engineering College",
      department: "ENTC",
      company: "Infosys",
      package: 800000,
    },
    {
      id: 5,
      name: "Rohan Mehta",
      college: "Commerce College",
      department: "IT",
      company: "TCS",
      package: 600000,
    },
    {
      id: 6,
      name: "Anjali Singh",
      college: "Engineering College",
      department: "Mech",
      company: "L&T",
      package: 700000,
    },
    {
      id: 7,
      name: "Vikram Joshi",
      college: "Arts & Science College",
      department: "Civil",
      company: "Wipro",
      package: 550000,
    },
    {
      id: 8,
      name: "Kavita Reddy",
      college: "Engineering College",
      department: "CS",
      company: "Meta",
      package: 2800000,
    },
    {
      id: 9,
      name: "Arjun Nair",
      college: "Commerce College",
      department: "IT",
      company: "Accenture",
      package: 650000,
    },
    {
      id: 10,
      name: "Pooja Iyer",
      college: "Engineering College",
      department: "ENTC",
      company: "Cognizant",
      package: 720000,
    },
    {
      id: 11,
      name: "Karan Kapoor",
      college: "Arts & Science College",
      department: "Mech",
      company: "Tech Mahindra",
      package: 680000,
    },
    {
      id: 12,
      name: "Divya Pillai",
      college: "Engineering College",
      department: "CS",
      company: "Apple",
      package: 3200000,
    },
    {
      id: 13,
      name: "Sanjay Verma",
      college: "Engineering College",
      department: "IT",
      company: "Oracle",
      package: 1900000,
    },
    {
      id: 14,
      name: "Neha Gupta",
      college: "Commerce College",
      department: "IT",
      company: "HCL",
      package: 580000,
    },
    {
      id: 15,
      name: "Rajesh Kumar",
      college: "Arts & Science College",
      department: "CS",
      company: "IBM",
      package: 1200000,
    },
    {
      id: 16,
      name: "Meera Nair",
      college: "Engineering College",
      department: "ENTC",
      company: "Samsung",
      package: 1500000,
    },
    {
      id: 17,
      name: "Aditya Singh",
      college: "Engineering College",
      department: "Mech",
      company: "Tata Motors",
      package: 850000,
    },
    {
      id: 18,
      name: "Simran Kaur",
      college: "Commerce College",
      department: "IT",
      company: "Capgemini",
      package: 620000,
    },
    {
      id: 19,
      name: "Manish Yadav",
      college: "Arts & Science College",
      department: "Civil",
      company: "L&T Constructions",
      package: 600000,
    },
    {
      id: 20,
      name: "Riya Sharma",
      college: "Engineering College",
      department: "CS",
      company: "Adobe",
      package: 2400000,
    },
  ]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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
    statCard3Gradient: "from-white to-orange-50",
    statCard4Gradient: "from-white to-purple-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-orange-100",
    statIcon3Text: "text-orange-600",
    statIcon4Bg: "bg-purple-100",
    statIcon4Text: "text-purple-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    tableBg: "bg-white",
    tableHeaderBg: "bg-slate-100",
    tableRowHover: "hover:bg-slate-50",
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
    statCard3Gradient: "from-slate-800 to-orange-900/30",
    statCard4Gradient: "from-slate-800 to-purple-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-orange-900/30",
    statIcon3Text: "text-orange-400",
    statIcon4Bg: "bg-purple-900/30",
    statIcon4Text: "text-purple-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    tableBg: "bg-slate-900",
    tableHeaderBg: "bg-slate-800",
    tableRowHover: "hover:bg-slate-800/50",
    scrollbar: "scrollbar-dark",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const stats = useMemo(() => {
    const packages = students.map((s) => s.package);
    const total = students.length;
    const highest = Math.max(...packages);
    const lowest = Math.min(...packages);
    const average = packages.reduce((a, b) => a + b, 0) / total;
    return { total, highest, lowest, average };
  }, [students]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} LPA`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPackage =
        filters.packageRange === "all"
          ? true
          : filters.packageRange === "high"
          ? student.package >= 1500000
          : filters.packageRange === "medium"
          ? student.package >= 800000 && student.package < 1500000
          : student.package < 800000;
      const matchesCompany =
        filters.company === "all" ? true : student.company === filters.company;
      const matchesCollege =
        filters.college === "all" ? true : student.college === filters.college;
      const matchesDepartment =
        filters.department === "all"
          ? true
          : student.department === filters.department;
      return (
        matchesSearch &&
        matchesPackage &&
        matchesCompany &&
        matchesCollege &&
        matchesDepartment
      );
    });
  }, [students, searchQuery, filters]);

  const groupedByCollege = useMemo(() => {
    const groups = {};
    filteredStudents.forEach((student) => {
      if (!groups[student.college]) groups[student.college] = [];
      groups[student.college].push(student);
    });
    return groups;
  }, [filteredStudents]);

  const getCollegeStats = (students) => {
    const packages = students.map((s) => s.package);
    const highest = Math.max(...packages);
    const average = packages.reduce((a, b) => a + b, 0) / students.length;
    return { highest, average, count: students.length };
  };

  const uniqueCompanies = [...new Set(students.map((s) => s.company))];
  const uniqueColleges = [...new Set(students.map((s) => s.college))];
  const departments = ["CS", "IT", "Mech", "Civil", "ENTC"];

  const handleResetFilters = () => {
    setFilters({
      packageRange: "all",
      company: "all",
      college: "all",
      department: "all",
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all"
  ).length;

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const getPaginatedStudents = (students) => {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return {
      students: students.slice(start, end),
      totalPages: Math.ceil(students.length / ITEMS_PER_PAGE),
      currentPage,
    };
  };

  const openStudentsModal = (college, students) => {
    setSelectedCollegeName(college);
    setSelectedCollegeStudents(students);
    setShowStudentsModal(true);
    setCurrentPage(0);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <style>{`
                .scrollbar-light::-webkit-scrollbar { width: 8px; height: 8px; }
                .scrollbar-light::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
                .scrollbar-light::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .scrollbar-light::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                .scrollbar-dark::-webkit-scrollbar { width: 8px; height: 8px; }
                .scrollbar-dark::-webkit-scrollbar-track { background: #1e293b; border-radius: 4px; }
                .scrollbar-dark::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
                .scrollbar-dark::-webkit-scrollbar-thumb:hover { background: #64748b; }
            `}</style>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Placement Results
            </h1>
            <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
              View and analyze student placement data across all colleges
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center p-2.5 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border-2 ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
            >
              {isDarkTheme ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: Users,
              label: "Total Students Placed",
              value: stats.total,
              subtitle: "students secured jobs",
              bgColor: themeStyles.statCard1Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: TrendingUp,
              label: "Highest Package",
              value: formatCurrency(stats.highest),
              subtitle: "top offer received",
              bgColor: themeStyles.statCard2Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: TrendingDown,
              label: "Lowest Package",
              value: formatCurrency(stats.lowest),
              subtitle: "minimum offer",
              bgColor: themeStyles.statCard3Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: DollarSign,
              label: "Average Package",
              value: formatCurrency(stats.average),
              subtitle: "mean compensation",
              bgColor: themeStyles.statCard4Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${stat.borderColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    {stat.label}
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${themeStyles.textTertiary} mt-1`}>
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 ${stat.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${themeStyles.textTertiary}`}
              />
              <input
                type="text"
                placeholder="Search by name, college, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.textPrimary} placeholder:${themeStyles.textTertiary} transition-all`}
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all relative`}
            >
              <Filter className="mr-2 h-5 w-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
          {activeFilterCount > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className={`text-sm ${themeStyles.textSecondary}`}>
                Active filters:
              </span>
              {filters.packageRange !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
                  Package: {filters.packageRange}
                </span>
              )}
              {filters.company !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
                  Company: {filters.company}
                </span>
              )}
              {filters.college !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm">
                  College: {filters.college}
                </span>
              )}
              {filters.department !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm">
                  Department: {filters.department}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* College Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.keys(groupedByCollege).length === 0 ? (
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.tableBg} p-12 text-center sm:col-span-3`}
            >
              <div className={`text-lg ${themeStyles.textSecondary}`}>
                No students found matching your criteria
              </div>
            </div>
          ) : (
            Object.entries(groupedByCollege).map(
              ([college, collegeStudents]) => {
                const collegeStats = getCollegeStats(collegeStudents);
                return (
                  <div
                    key={college}
                    className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg} transition-all duration-300 flex flex-col`}
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start gap-3 mb-6">
                        <div
                          className={`h-10 w-10 ${themeStyles.statIcon1Bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <Building2
                            className={`h-5 w-5 ${themeStyles.statIcon1Text}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h2
                            className={`text-lg font-bold ${themeStyles.textPrimary} leading-tight`}
                          >
                            {college}
                          </h2>
                          <p
                            className={`text-xs ${themeStyles.textTertiary} mt-1`}
                          >
                            Placement Statistics
                          </p>
                        </div>
                      </div>

                      <div
                        className={`space-y-4 mb-6 flex-1 py-4 border-y ${themeStyles.dividerBorder}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users
                              className={`h-4 w-4 ${themeStyles.textTertiary}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Placed
                            </span>
                          </div>
                          <span
                            className={`text-base font-bold ${themeStyles.textPrimary}`}
                          >
                            {collegeStats.count}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp
                              className={`h-4 w-4 ${themeStyles.textTertiary}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Highest
                            </span>
                          </div>
                          <span
                            className={`text-base font-bold ${themeStyles.textPrimary}`}
                          >
                            {formatCurrency(collegeStats.highest)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign
                              className={`h-4 w-4 ${themeStyles.textTertiary}`}
                            />
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Average
                            </span>
                          </div>
                          <span
                            className={`text-base font-bold ${themeStyles.textPrimary}`}
                          >
                            {formatCurrency(collegeStats.average)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          openStudentsModal(college, collegeStudents)
                        }
                        className={`w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2`}
                      >
                        View Students
                      </button>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>

        {/* Students Modal */}
        {showStudentsModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBorder} ${themeStyles.modalBg} max-h-[80vh] flex flex-col`}
            >
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <div>
                  <h2
                    className={`text-xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Students from {selectedCollegeName}
                  </h2>
                </div>
                <button
                  onClick={() => setShowStudentsModal(false)}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div
                className={`p-4 overflow-auto ${themeStyles.scrollbar} flex-1`}
              >
                <table className="w-full">
                  <thead
                    className={`${themeStyles.tableHeaderBg} sticky top-0 z-10`}
                  >
                    <tr>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder}`}
                      >
                        Sr No
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder}`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder}`}
                      >
                        Department
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder}`}
                      >
                        Company
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder}`}
                      >
                        Package
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedStudents(selectedCollegeStudents).students.map(
                      (student, index) => (
                        <tr
                          key={student.id}
                          className={`${themeStyles.tableRowHover} border-b ${themeStyles.dividerBorder} transition-colors`}
                        >
                          <td
                            className={`px-4 py-3 text-sm ${themeStyles.textPrimary}`}
                          >
                            {currentPage * ITEMS_PER_PAGE + index + 1}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm font-medium ${themeStyles.textPrimary}`}
                          >
                            {student.name}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm ${themeStyles.textPrimary}`}
                          >
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white text-xs font-medium">
                              {student.department}
                            </span>
                          </td>
                          <td
                            className={`px-4 py-3 text-sm ${themeStyles.textSecondary}`}
                          >
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {student.company}
                            </div>
                          </td>
                          <td
                            className={`px-4 py-3 text-sm font-bold ${themeStyles.textPrimary}`}
                          >
                            {formatCurrency(student.package)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-t px-6 py-3 flex justify-between items-center`}
              >
                <p className={`text-sm ${themeStyles.textSecondary}`}>
                  Showing{" "}
                  <span className={`font-semibold ${themeStyles.textPrimary}`}>
                    {currentPage * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className={`font-semibold ${themeStyles.textPrimary}`}>
                    {Math.min(
                      (currentPage + 1) * ITEMS_PER_PAGE,
                      selectedCollegeStudents.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className={`font-semibold ${themeStyles.textPrimary}`}>
                    {selectedCollegeStudents.length}
                  </span>{" "}
                  students
                </p>
                {getPaginatedStudents(selectedCollegeStudents).totalPages >
                  1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className={`text-sm ${themeStyles.textSecondary}`}>
                      Page {currentPage + 1} of{" "}
                      {getPaginatedStudents(selectedCollegeStudents).totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage ===
                        getPaginatedStudents(selectedCollegeStudents)
                          .totalPages -
                          1
                      }
                      className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBorder} ${themeStyles.modalBg}`}
            >
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <div>
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Filter Results
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
                    Apply filters to narrow down the placement results
                  </p>
                </div>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Package Range
                  </label>
                  <select
                    value={filters.packageRange}
                    onChange={(e) =>
                      setFilters({ ...filters, packageRange: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.textPrimary} transition-all`}
                  >
                    <option value="all">All Packages</option>
                    <option value="high">High (15+ LPA)</option>
                    <option value="medium">Medium (8-15 LPA)</option>
                    <option value="low">Low (Below 8 LPA)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Company
                  </label>
                  <select
                    value={filters.company}
                    onChange={(e) =>
                      setFilters({ ...filters, company: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.textPrimary} transition-all`}
                  >
                    <option value="all">All Companies</option>
                    {uniqueCompanies.map((company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    College
                  </label>
                  <select
                    value={filters.college}
                    onChange={(e) =>
                      setFilters({ ...filters, college: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.textPrimary} transition-all`}
                  >
                    <option value="all">All Colleges</option>
                    {uniqueColleges.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) =>
                      setFilters({ ...filters, department: e.target.value })
                    }
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.textPrimary} transition-all`}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-t px-6 py-4 flex justify-end gap-3`}
              >
                <button
                  onClick={handleResetFilters}
                  className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementResultsManager;
