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
  Download,
  Upload,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const StudentDetailsManager = () => {
  const { theme } = useTheme();
  const [students, setStudents] = useState([
    {
      id: 1,
      prnNumber: "ST2024001",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      collegeName: "ABC Engineering College",
      department: "Computer Science",
      year: "3",
      phoneNumber: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      prnNumber: "ST2024002",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      collegeName: "ABC Engineering College",
      department: "Computer Science",
      year: "3",
      phoneNumber: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      prnNumber: "ST2024003",
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      collegeName: "ABC Engineering College",
      department: "Information Technology",
      year: "4",
      phoneNumber: "9876543212",
      status: "Active",
    },
    {
      id: 4,
      prnNumber: "ST2024004",
      name: "Sneha Desai",
      email: "sneha.desai@example.com",
      collegeName: "XYZ Institute of Technology",
      department: "Electronics & Telecommunication",
      year: "3",
      phoneNumber: "9876543213",
      status: "Active",
    },
    {
      id: 5,
      prnNumber: "ST2024005",
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      collegeName: "XYZ Institute of Technology",
      department: "Computer Science",
      year: "4",
      phoneNumber: "9876543214",
      status: "Active",
    },
    {
      id: 6,
      prnNumber: "ST2024006",
      name: "Anjali Singh",
      email: "anjali.singh@example.com",
      collegeName: "PQR College of Engineering",
      department: "Mechanical",
      year: "3",
      phoneNumber: "9876543215",
      status: "Active",
    },
    {
      id: 7,
      prnNumber: "ST2024007",
      name: "Vikram Joshi",
      email: "vikram.joshi@example.com",
      collegeName: "PQR College of Engineering",
      department: "Civil",
      year: "4",
      phoneNumber: "9876543216",
      status: "Inactive",
    },
    {
      id: 8,
      prnNumber: "ST2024008",
      name: "Pooja Reddy",
      email: "pooja.reddy@example.com",
      collegeName: "ABC Engineering College",
      department: "Computer Science",
      year: "4",
      phoneNumber: "9876543217",
      status: "Active",
    },
    {
      id: 9,
      prnNumber: "ST2024009",
      name: "Karthik Iyer",
      email: "karthik.iyer@example.com",
      collegeName: "LMN Technical Campus",
      department: "Information Technology",
      year: "3",
      phoneNumber: "9876543218",
      status: "Active",
    },
    {
      id: 10,
      prnNumber: "ST2024010",
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      collegeName: "LMN Technical Campus",
      department: "Computer Science",
      year: "4",
      phoneNumber: "9876543219",
      status: "Active",
    },
    {
      id: 11,
      prnNumber: "ST2024011",
      name: "Arjun Nair",
      email: "arjun.nair@example.com",
      collegeName: "ABC Engineering College",
      department: "Electronics & Telecommunication",
      year: "3",
      phoneNumber: "9876543220",
      status: "Active",
    },
    {
      id: 12,
      prnNumber: "ST2024012",
      name: "Divya Kapoor",
      email: "divya.kapoor@example.com",
      collegeName: "XYZ Institute of Technology",
      department: "Mechanical",
      year: "4",
      phoneNumber: "9876543221",
      status: "Active",
    },
    {
      id: 13,
      prnNumber: "ST2024013",
      name: "Siddharth Roy",
      email: "siddharth.roy@example.com",
      collegeName: "PQR College of Engineering",
      department: "Computer Science",
      year: "3",
      phoneNumber: "9876543222",
      status: "Active",
    },
    {
      id: 14,
      prnNumber: "ST2024014",
      name: "Meera Shah",
      email: "meera.shah@example.com",
      collegeName: "ABC Engineering College",
      department: "Information Technology",
      year: "3",
      phoneNumber: "9876543223",
      status: "Inactive",
    },
    {
      id: 15,
      prnNumber: "ST2024015",
      name: "Aditya Varma",
      email: "aditya.varma@example.com",
      collegeName: "LMN Technical Campus",
      department: "Civil",
      year: "4",
      phoneNumber: "9876543224",
      status: "Active",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStep, setFilterStep] = useState(1);
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
    modalBg: "bg-white",
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
    hoverBg: "hover:bg-slate-50",
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
    modalBg: "bg-slate-900",
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
    hoverBg: "hover:bg-slate-800",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  // All departments - always show these 5 in order
  const allDepartments = [
    { id: 1, name: "Computer Science", short: "Computer" },
    { id: 2, name: "Information Technology", short: "IT" },
    { id: 3, name: "Electronics & Telecommunication", short: "ENTC" },
    { id: 4, name: "Mechanical", short: "Mechanical" },
    { id: 5, name: "Civil", short: "Civil" },
  ];

  // Get unique colleges
  const colleges = useMemo(() => {
    const collegeSet = new Set(students.map((s) => s.collegeName));
    return Array.from(collegeSet).map((name, index) => ({ id: index + 1, name }));
  }, [students]);

  // Always return all 5 departments regardless of whether students exist
  const departments = useMemo(() => {
    if (!selectedCollege) return [];
    return allDepartments;
  }, [selectedCollege]);

  const years = useMemo(() => {
    return [
      { id: 1, name: "Third Year", value: "3" },
      { id: 2, name: "Fourth Year", value: "4" },
    ];
  }, []);

  const stats = useMemo(() => {
    const uniqueColleges = new Set(students.map((s) => s.collegeName)).size;
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.status === "Active").length;
    const inactiveStudents = students.filter(
      (s) => s.status === "Inactive"
    ).length;
    return { uniqueColleges, totalStudents, activeStudents, inactiveStudents };
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!selectedCollege || !selectedDepartment || !selectedYear) return [];

    return students.filter(
      (s) =>
        s.collegeName === selectedCollege.name &&
        s.department === selectedDepartment.name &&
        s.year === selectedYear.value &&
        (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.prnNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [students, selectedCollege, selectedDepartment, selectedYear, searchQuery]);

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

  const handleViewStudents = () => {
    setShowFilterModal(true);
    setFilterStep(1);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
    setSearchQuery("");
  };

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setFilterStep(2);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setFilterStep(3);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowFilterModal(false);
  };

  const handleCloseModal = () => {
    setShowFilterModal(false);
    setFilterStep(1);
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
  };

  const handleBackToMain = () => {
    setSelectedCollege(null);
    setSelectedDepartment(null);
    setSelectedYear(null);
    setSearchQuery("");
  };

  const handleImportExcel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls,.csv";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Importing students from ${file.name}...`);
        // Here you would implement actual Excel parsing logic
        // For now, just showing a placeholder
      }
    };
    input.click();
  };

  const handleDownloadExcel = () => {
    if (filteredStudents.length === 0) {
      alert("No students to download!");
      return;
    }

    // Create CSV content
    const headers = ["Sr No", "PRN Number", "Name", "Email", "Phone", "Status", "College", "Department", "Year"];
    const csvContent = [
      headers.join(","),
      ...filteredStudents.map((student, index) =>
        [
          index + 1,
          student.prnNumber,
          student.name,
          student.email,
          student.phoneNumber,
          student.status,
          student.collegeName,
          student.department,
          student.year,
        ].join(",")
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students_${selectedCollege?.name}_${selectedDepartment?.name}_Year${selectedYear?.value}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto">
        {/* Main View - Stats and Actions */}
        {!selectedCollege && !selectedDepartment && !selectedYear && (
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
                  onClick={handleImportExcel}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all shadow-lg"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import Excel
                </button>
                <button
                  onClick={handleViewStudents}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Students
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

            {/* Empty State or Info */}
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardBg}`}
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
                  Student Management System
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Import students from Excel or view existing students by college, department, and year
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleImportExcel}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Import Students
                  </button>
                  <button
                    onClick={handleViewStudents}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Students
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${themeStyles.modalOverlay}`}
          >
            <div
              className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto ${themeStyles.modalBg}`}
            >
              <div
                className={`p-6 border-b ${themeStyles.modalHeaderBorder} flex items-center justify-between sticky top-0 z-10 ${themeStyles.modalBg}`}
              >
                <div>
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Filter Students
                  </h2>
                  <p
                    className={`text-sm mt-1 ${themeStyles.textSecondary}`}
                  >
                    Step {filterStep} of 3: Select{" "}
                    {filterStep === 1
                      ? "College"
                      : filterStep === 2
                        ? "Department"
                        : "Year"}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-all`}
                >
                  <X size={24} className={themeStyles.textPrimary} />
                </button>
              </div>

              <div className="p-6">
                {filterStep === 1 && (
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-4 ${themeStyles.textPrimary}`}
                    >
                      Select College
                    </h3>
                    {colleges.length === 0 ? (
                      <div className="text-center py-8">
                        <p className={themeStyles.textSecondary}>
                          No colleges found. Please import students first.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {colleges.map((college) => (
                          <div
                            key={college.id}
                            onClick={() => handleCollegeSelect(college)}
                            className={`p-6 rounded-xl border cursor-pointer ${themeStyles.cardBorder} ${themeStyles.buttonHover} transition-all hover:scale-105`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4
                                  className={`font-semibold text-lg ${themeStyles.textPrimary}`}
                                >
                                  {college.name}
                                </h4>
                                <p
                                  className={`text-sm mt-1 ${themeStyles.textSecondary}`}
                                >
                                  Click to select
                                </p>
                              </div>
                              <ChevronRight size={24} className="text-blue-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {filterStep === 2 && (
                  <div>
                    <button
                      onClick={() => setFilterStep(1)}
                      className="mb-4 text-sm font-semibold flex items-center gap-2 text-blue-600"
                    >
                      ← Back to Colleges
                    </button>
                    <h3
                      className={`text-lg font-semibold mb-4 ${themeStyles.textPrimary}`}
                    >
                      Select Department
                    </h3>
                    {departments.length === 0 ? (
                      <div className="text-center py-8">
                        <p className={themeStyles.textSecondary}>
                          No departments found for this college.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {departments.map((dept) => (
                          <div
                            key={dept.id}
                            onClick={() => handleDepartmentSelect(dept)}
                            className={`p-6 rounded-xl border cursor-pointer ${themeStyles.cardBorder} ${themeStyles.buttonHover} transition-all hover:scale-105`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4
                                  className={`font-semibold text-lg ${themeStyles.textPrimary}`}
                                >
                                  {dept.short}
                                </h4>
                                <p
                                  className={`text-sm mt-1 ${themeStyles.textSecondary}`}
                                >
                                  {dept.name}
                                </p>
                              </div>
                              <ChevronRight size={24} className="text-blue-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {filterStep === 3 && (
                  <div>
                    <button
                      onClick={() => setFilterStep(2)}
                      className="mb-4 text-sm font-semibold flex items-center gap-2 text-blue-600"
                    >
                      ← Back to Departments
                    </button>
                    <h3
                      className={`text-lg font-semibold mb-4 ${themeStyles.textPrimary}`}
                    >
                      Select Year
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {years.map((year) => (
                        <div
                          key={year.id}
                          onClick={() => handleYearSelect(year)}
                          className={`p-8 rounded-xl border cursor-pointer ${themeStyles.cardBorder} ${themeStyles.buttonHover} transition-all hover:scale-105`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4
                                className={`font-semibold text-2xl ${themeStyles.textPrimary}`}
                              >
                                {year.name}
                              </h4>
                              <p
                                className={`text-sm mt-1 ${themeStyles.textSecondary}`}
                              >
                                Click to view students
                              </p>
                            </div>
                            <ChevronRight size={28} className="text-blue-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Student Table View */}
        {selectedCollege && selectedDepartment && selectedYear && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToMain}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1
                    className={`text-3xl font-bold ${themeStyles.textPrimary}`}
                  >
                    Students - Year {selectedYear.value}
                  </h1>
                  <p className={`${themeStyles.textSecondary} mt-1`}>
                    {selectedCollege.name} - {selectedDepartment.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadExcel}
                disabled={filteredStudents.length === 0}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Excel
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or PRN number..."
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
                              : "No students found for this selection"}
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
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${student.status === "Active"
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