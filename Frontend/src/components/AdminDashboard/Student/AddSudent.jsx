import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Users,
  Building2,
  UserCheck,
  UserX,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  Search,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const StudentDetailsManager = () => {
  const [theme] = useState("light"); // You can connect this to your ThemeContext
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCollegeView, setShowCollegeView] = useState(false);
  const [showDepartmentView, setShowDepartmentView] = useState(false);
  const [showYearView, setShowYearView] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    prnNumber: "",
    name: "",
    email: "",
    department: "",
    year: "3",
    collegeName: "",
    phoneNumber: "",
    status: "Active",
  });

  const isDarkTheme = theme === "dark";

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
    emptyStateBg: "bg-white",
    emptyStateIcon: "text-slate-400",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-emerald-50",
    statCard4Gradient: "from-white to-red-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-emerald-100",
    statIcon3Text: "text-emerald-600",
    statIcon4Bg: "bg-red-100",
    statIcon4Text: "text-red-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    tableBorder: "border-slate-200",
    tableHeader: "bg-slate-50",
    tableRow: "hover:bg-slate-50",
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
    emptyStateBg: "bg-slate-900",
    emptyStateIcon: "text-slate-500",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-emerald-900/30",
    statCard4Gradient: "from-slate-800 to-red-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-emerald-900/30",
    statIcon3Text: "text-emerald-400",
    statIcon4Bg: "bg-red-900/30",
    statIcon4Text: "text-red-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    tableBorder: "border-slate-700",
    tableHeader: "bg-slate-800",
    tableRow: "hover:bg-slate-800",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const stats = useMemo(() => {
    const uniqueColleges = new Set(students.map((s) => s.collegeName)).size;
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === "Active").length;
    const inactiveStudents = students.filter(
      (s) => s.status === "Inactive"
    ).length;
    return { uniqueColleges, totalStudents, activeStudents, inactiveStudents };
  }, [students]);

  const collegeGroups = useMemo(() => {
    const groups = {};
    students.forEach((student) => {
      if (!groups[student.collegeName]) {
        groups[student.collegeName] = {};
      }
      if (!groups[student.collegeName][student.department]) {
        groups[student.collegeName][student.department] = {};
      }
      if (!groups[student.collegeName][student.department][student.year]) {
        groups[student.collegeName][student.department][student.year] = [];
      }
      groups[student.collegeName][student.department][student.year].push(
        student
      );
    });
    return groups;
  }, [students]);

  const resetForm = () => {
    setFormData({
      prnNumber: "",
      name: "",
      email: "",
      department: "",
      year: "3",
      collegeName: "",
      phoneNumber: "",
      status: "Active",
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? { ...formData, id: editingId } : student
        )
      );
    } else {
      const newStudent = {
        ...formData,
        id: Date.now(),
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (student) => {
    setFormData({
      prnNumber: student.prnNumber,
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      collegeName: student.collegeName,
      phoneNumber: student.phoneNumber,
      status: student.status,
    });
    setEditingId(student.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (student) => {
    setFormData({
      prnNumber: student.prnNumber,
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      collegeName: student.collegeName,
      phoneNumber: student.phoneNumber,
      status: student.status,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setStudents((prev) => prev.filter((student) => student.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleCollegeClick = (collegeName) => {
    setSelectedCollege(collegeName);
    setShowCollegeView(true);
    setShowDepartmentView(false);
    setShowYearView(false);
    setSearchQuery("");
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setShowDepartmentView(true);
    setShowYearView(false);
    setSearchQuery("");
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setShowYearView(true);
    setSearchQuery("");
  };

  const handleBackToColleges = () => {
    setShowCollegeView(false);
    setShowDepartmentView(false);
    setShowYearView(false);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
    setSearchQuery("");
  };

  const handleBackToDepartments = () => {
    setShowDepartmentView(false);
    setShowYearView(false);
    setSelectedDepartment(null);
    setSelectedYear(null);
    setSearchQuery("");
  };

  const handleBackToYears = () => {
    setShowYearView(false);
    setSelectedYear(null);
    setSearchQuery("");
  };

  const filteredStudents =
    selectedCollege && selectedDepartment && selectedYear
      ? collegeGroups[selectedCollege][selectedDepartment][selectedYear].filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.prnNumber
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            student.phoneNumber.includes(searchQuery)
        )
      : [];

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto">
        {/* Main View - Colleges */}
        {!showCollegeView && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  Student Details
                </h1>
                <p className={`${themeStyles.textSecondary} mt-1`}>
                  Manage your college students
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </button>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  icon: Building2,
                  label: "Total Colleges",
                  value: stats.uniqueColleges,
                  subtitle: "unique institutions",
                  bgColor: themeStyles.statCard1Gradient,
                  borderColor: themeStyles.dividerBorder,
                  iconBg: themeStyles.statIcon1Bg,
                  iconColor: themeStyles.statIcon1Text,
                },
                {
                  icon: Users,
                  label: "Total Students",
                  value: stats.totalStudents,
                  subtitle: "enrolled students",
                  bgColor: themeStyles.statCard2Gradient,
                  borderColor: themeStyles.dividerBorder,
                  iconBg: themeStyles.statIcon2Bg,
                  iconColor: themeStyles.statIcon2Text,
                },
                {
                  icon: UserCheck,
                  label: "Active Students",
                  value: stats.activeStudents,
                  subtitle: "currently active",
                  bgColor: themeStyles.statCard3Gradient,
                  borderColor: themeStyles.dividerBorder,
                  iconBg: themeStyles.statIcon3Bg,
                  iconColor: themeStyles.statIcon3Text,
                },
                {
                  icon: UserX,
                  label: "Inactive Students",
                  value: stats.inactiveStudents,
                  subtitle: "currently inactive",
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

            {/* College Cards */}
            <div>
              <h2
                className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
              >
                Colleges
              </h2>

              {Object.keys(collegeGroups).length === 0 ? (
                <div
                  className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.emptyStateBg}`}
                >
                  <div className="p-12 text-center">
                    <div
                      className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                    >
                      <GraduationCap
                        className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      No Students Added Yet
                    </h3>
                    <p className={`${themeStyles.textSecondary} mb-6`}>
                      Start by adding your first student
                    </p>
                    <button
                      onClick={() => {
                        resetForm();
                        setShowModal(true);
                      }}
                      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Student
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(collegeGroups).map(
                    ([collegeName, departments]) => {
                      const totalStudents = Object.values(departments).reduce(
                        (sum, years) =>
                          sum +
                          Object.values(years).reduce(
                            (yearSum, students) => yearSum + students.length,
                            0
                          ),
                        0
                      );
                      const activeStudents = Object.values(departments).reduce(
                        (sum, years) =>
                          sum +
                          Object.values(years).reduce(
                            (yearSum, students) =>
                              yearSum +
                              students.filter((s) => s.status === "Active")
                                .length,
                            0
                          ),
                        0
                      );

                      return (
                        <div
                          key={collegeName}
                          className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                        >
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3
                                    className={`text-xl font-bold ${themeStyles.textPrimary} line-clamp-2`}
                                  >
                                    {collegeName}
                                  </h3>
                                  <p
                                    className={`text-sm ${themeStyles.textSecondary} mt-1`}
                                  >
                                    {totalStudents} student
                                    {totalStudents !== 1 ? "s" : ""}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 mb-6">
                              <div
                                className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                              >
                                <span
                                  className={`text-sm ${themeStyles.textSecondary}`}
                                >
                                  Departments
                                </span>
                                <span
                                  className={`font-semibold text-blue-600 dark:text-blue-400`}
                                >
                                  {Object.keys(departments).length}
                                </span>
                              </div>
                              <div
                                className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                              >
                                <span
                                  className={`text-sm ${themeStyles.textSecondary}`}
                                >
                                  Active Students
                                </span>
                                <span
                                  className={`font-semibold text-emerald-600 dark:text-emerald-400`}
                                >
                                  {activeStudents}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleCollegeClick(collegeName)}
                              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                            >
                              View Departments
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Department View */}
        {showCollegeView && !showDepartmentView && selectedCollege && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleBackToColleges}
                className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  {selectedCollege}
                </h1>
                <p className={`${themeStyles.textSecondary} mt-1`}>
                  {Object.keys(collegeGroups[selectedCollege]).length}{" "}
                  department
                  {Object.keys(collegeGroups[selectedCollege]).length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(collegeGroups[selectedCollege]).map(
                ([department, years]) => {
                  const totalStudents = Object.values(years).reduce(
                    (sum, students) => sum + students.length,
                    0
                  );

                  return (
                    <div
                      key={department}
                      className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                    >
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600" />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h3
                                className={`text-xl font-bold ${themeStyles.textPrimary}`}
                              >
                                {department}
                              </h3>
                              <p
                                className={`text-sm ${themeStyles.textSecondary} mt-1`}
                              >
                                {totalStudents} student
                                {totalStudents !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div
                            className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                          >
                            <span
                              className={`text-sm ${themeStyles.textSecondary}`}
                            >
                              Years
                            </span>
                            <span
                              className={`font-semibold text-purple-600 dark:text-purple-400`}
                            >
                              {Object.keys(years).length}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDepartmentClick(department)}
                          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 font-medium transition-all"
                        >
                          View Years
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Year View */}
        {showDepartmentView && !showYearView && selectedDepartment && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleBackToDepartments}
                className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  {selectedDepartment}
                </h1>
                <p className={`${themeStyles.textSecondary} mt-1`}>
                  {selectedCollege}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(
                collegeGroups[selectedCollege][selectedDepartment]
              ).map(([year, students]) => (
                <div
                  key={year}
                  className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                >
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-bold ${themeStyles.textPrimary}`}
                          >
                            Year {year}
                          </h3>
                          <p
                            className={`text-sm ${themeStyles.textSecondary} mt-1`}
                          >
                            {students.length} student
                            {students.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Active Students
                        </span>
                        <span
                          className={`font-semibold text-emerald-600 dark:text-emerald-400`}
                        >
                          {students.filter((s) => s.status === "Active").length}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                      >
                        <span
                          className={`text-sm ${themeStyles.textSecondary}`}
                        >
                          Inactive Students
                        </span>
                        <span
                          className={`font-semibold text-red-600 dark:text-red-400`}
                        >
                          {
                            students.filter((s) => s.status === "Inactive")
                              .length
                          }
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleYearClick(year)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 font-medium transition-all"
                    >
                      View Students
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Table View */}
        {showYearView && selectedYear && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToYears}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1
                    className={`text-3xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Year {selectedYear} - {selectedDepartment}
                  </h1>
                  <p className={`${themeStyles.textSecondary} mt-1`}>
                    {selectedCollege}
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, PRN, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Student Table */}
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${themeStyles.tableHeader}`}>
                    <tr>
                      {[
                        "Sr No",
                        "PRN Number",
                        "Name",
                        "Email",
                        "Phone",
                        "Status",
                      ].map((header, index) => (
                        <th
                          key={index}
                          className={`px-6 py-4 text-left text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                        >
                          {header}
                        </th>
                      ))}
                      <th
                        className={`px-6 py-4 text-right text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${themeStyles.dividerBorder}`}>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <div className={`${themeStyles.textSecondary}`}>
                            {searchQuery
                              ? "No students found matching your search"
                              : "No students in this year"}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, index) => (
                        <tr
                          key={student.id}
                          className={`${themeStyles.tableRow} transition-colors`}
                        >
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textPrimary}`}
                          >
                            {index + 1}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                          >
                            {student.prnNumber}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                          >
                            {student.name}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {student.email}
                            </div>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {student.phoneNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                student.status === "Active"
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleView(student)}
                                className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(student)}
                                className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                                title="Edit"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit/View Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              {/* Modal Header */}
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  {viewMode
                    ? "Student Details"
                    : editingId
                    ? "Edit Student"
                    : "Add New Student"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* PRN Number */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    PRN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prnNumber"
                    value={formData.prnNumber}
                    onChange={handleInputChange}
                    placeholder="Enter PRN number"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter student name"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* College Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    placeholder="Enter college name"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter department"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                  >
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Action Buttons */}
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      {editingId ? "Update Student" : "Add Student"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  Confirm Deletion
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={`${themeStyles.textSecondary} mb-6`}>
                Are you sure you want to delete this student? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsManager;
